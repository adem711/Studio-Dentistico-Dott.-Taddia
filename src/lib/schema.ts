import studio from '../data/studio.json';

export const SITE = 'https://dentistanovarataddia.it';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Dentist / LocalBusiness JSON-LD, built from src/data/studio.json so hours and contacts live in one place. */
export function dentistSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${SITE}/#dentist`,
    name: studio.name,
    url: `${SITE}/`,
    logo: `${SITE}/icon-512.png`,
    image: `${SITE}/og-default.jpg`,
    telephone: studio.phone.replace(/\s/g, ''),
    medicalSpecialty: 'Dentistry',
    address: {
      '@type': 'PostalAddress',
      streetAddress: studio.address.street,
      postalCode: studio.address.postalCode,
      addressLocality: studio.address.city,
      addressRegion: studio.address.province,
      addressCountry: studio.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: studio.geo.latitude,
      longitude: studio.geo.longitude,
    },
    areaServed: { '@type': 'City', name: studio.address.city },
    openingHoursSpecification: studio.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => DAY_NAMES[d]),
      opens: h.open,
      closes: h.close,
    })),
    hasMap: studio.mapsUrl,
    sameAs: [studio.facebook],
  };
}
