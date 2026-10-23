// Contact form: inline validation, fetch submit to Netlify Forms, success and error states.
// Works as a plain POST without JS. For WebMCP agents the submit event exposes agentInvoked / respondWith.

type AgentSubmitEvent = SubmitEvent & { agentInvoked?: boolean; respondWith?: (p: Promise<unknown>) => void };

const MESSAGES = {
  nome: 'Inserisci il tuo nome e cognome.',
  telefono: 'Inserisci un numero di telefono valido, per esempio 329 414 8444.',
  email: 'Controlla l\'indirizzo email: sembra incompleto.',
  privacy: 'Per inviare la richiesta conferma di aver letto l\'informativa sulla privacy.',
} as const;

type FieldName = keyof typeof MESSAGES;

function validate(form: HTMLFormElement): Record<FieldName, string | null> {
  const get = (n: string) => form.elements.namedItem(n) as HTMLInputElement;
  const phoneDigits = get('telefono').value.replace(/\D/g, '');
  return {
    nome: get('nome').value.trim().length >= 2 ? null : MESSAGES.nome,
    telefono: phoneDigits.length >= 6 && /^[+\d\s().-]+$/.test(get('telefono').value.trim()) ? null : MESSAGES.telefono,
    email: !get('email').value || get('email').validity.valid ? null : MESSAGES.email,
    privacy: get('privacy').checked ? null : MESSAGES.privacy,
  };
}

function showFieldState(form: HTMLFormElement, name: FieldName, error: string | null, touched: boolean) {
  const input = form.elements.namedItem(name) as HTMLInputElement;
  const wrap = input.closest<HTMLElement>('.cf__field')!;
  const err = form.querySelector<HTMLElement>(`#cf-${name}-err`)!;
  if (error && touched) {
    wrap.dataset.invalid = 'true';
    delete wrap.dataset.valid;
    input.setAttribute('aria-invalid', 'true');
    if (err.hidden || err.textContent !== error) {
      err.textContent = error;
      err.hidden = false;
    }
  } else {
    delete wrap.dataset.invalid;
    input.removeAttribute('aria-invalid');
    err.hidden = true;
    err.textContent = '';
    if (!error && touched && input.value && input.type !== 'checkbox') wrap.dataset.valid = 'true';
    else delete wrap.dataset.valid;
  }
}

document.querySelectorAll<HTMLElement>('[data-contact-form-root]').forEach((root) => {
  const form = root.querySelector<HTMLFormElement>('form')!;
  const success = root.querySelector<HTMLElement>('.cf__success')!;
  const errorBox = root.querySelector<HTMLElement>('.cf__error')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const label = button.querySelector<HTMLElement>('.cf__label')!;
  const touched = new Set<FieldName>();

  const refresh = (only?: FieldName) => {
    const result = validate(form);
    (Object.keys(result) as FieldName[]).forEach((n) => {
      if (!only || only === n) showFieldState(form, n, result[n], touched.has(n));
    });
    return result;
  };

  (Object.keys(MESSAGES) as FieldName[]).forEach((n) => {
    const el = form.elements.namedItem(n) as HTMLInputElement;
    el.addEventListener('blur', () => {
      if (el.value || el.type === 'checkbox') touched.add(n);
      refresh(n);
    });
    el.addEventListener('input', () => touched.has(n) && refresh(n));
    el.addEventListener('change', () => {
      touched.add(n);
      refresh(n);
    });
  });

  form.addEventListener('submit', async (event) => {
    const e = event as AgentSubmitEvent;
    errorBox.hidden = true;
    (Object.keys(MESSAGES) as FieldName[]).forEach((n) => touched.add(n));
    const result = refresh();
    const firstBad = (Object.keys(result) as FieldName[]).find((n) => result[n]);
    if (firstBad) {
      e.preventDefault();
      (form.elements.namedItem(firstBad) as HTMLInputElement).focus();
      if (e.agentInvoked && e.respondWith) {
        e.respondWith(Promise.resolve({ ok: false, error: result[firstBad] }));
      }
      return;
    }

    e.preventDefault();
    // The honeypot is part of the WebMCP tool schema; an agent acting for a person must never trip it.
    if (e.agentInvoked) (form.elements.namedItem('bot-field') as HTMLInputElement).value = '';
    button.disabled = true;
    label.textContent = 'Invio in corso…';

    const task = (async () => {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
      const res = await fetch(form.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
    })();

    // WebMCP: respondWith() must be called synchronously inside the submit event, so hand it the pending result now.
    if (e.agentInvoked && e.respondWith) {
      e.respondWith(
        task.then(
          () => ({ ok: true, message: 'Richiesta inviata. Lo studio richiamerà al numero indicato.' }),
          () => ({ ok: false, error: 'Invio non riuscito, riprovare più tardi.' }),
        ),
      );
    }

    try {
      await task;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch {
      errorBox.hidden = false;
      button.disabled = false;
      label.textContent = 'Invia la richiesta';
    }
  });
});
