import { getCollection } from 'astro:content';

/** All services in display order. The entry id is the URL slug. */
export async function getServices() {
  const all = await getCollection('services');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const servicePath = (id: string) => `/servizi-dentali/${id}/`;
