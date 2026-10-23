#!/usr/bin/env bash
# Runs Lighthouse (mobile or desktop) on every page of the built site and saves reports to /reports.
# Usage: bash scripts/lighthouse-all.sh <mobile|desktop> [base-url]
# Needs a server with the production headers: `npm run build && node scripts/serve-dist.mjs 4323`.
# Set CHROME_PATH to a Chrome/Chromium binary if Lighthouse cannot find one.
set -u
MODE="${1:-mobile}"
BASE="${2:-http://localhost:4323}"
PAGES=(
  "home:/"
  "servizi:/servizi-dentali/"
  "sbiancamento:/servizi-dentali/sbiancamento-dentale-a-novara/"
  "conservativa:/servizi-dentali/conservativa-odontoiatria-novara/"
  "endodonzia:/servizi-dentali/endodonzia-novara/"
  "impianti:/servizi-dentali/impianti-dentali-novara/"
  "ortodonzia:/servizi-dentali/ortodonzia-novara/"
  "diagnosi:/servizi-dentali/diagnosi-esami-radiografici-novara/"
  "casi-clinici:/servizi-dentali/casi-clinici/"
  "gallery-studio:/gallery-studio/"
  "recensioni:/recensioni/"
  "contatti:/contatti/"
)
PRESET=()
[ "$MODE" = "desktop" ] && PRESET=(--preset=desktop)
mkdir -p reports
for entry in "${PAGES[@]}"; do
  name="${entry%%:*}"; path="${entry#*:}"
  MSYS_NO_PATHCONV=1 npx -y lighthouse@13.5.0 "$BASE$path" "${PRESET[@]}" \
    --chrome-flags="--headless=new --no-sandbox" \
    --output=json --output=html --output-path="reports/$name-$MODE" --quiet >/dev/null 2>&1
  node scripts/lh-summary.mjs "reports/$name-$MODE.report.json" | awk -v n="$name" 'NR==1{next} /performance|accessibility|best-practices|seo|agentic|FCP|✗/ {printf "%s | %s\n", n, $0}'
done
