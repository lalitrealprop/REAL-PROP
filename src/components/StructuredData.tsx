import { useEffect } from 'react';

const SITE_URL = 'https://realprop.online';
const PROJECT_URL = `${SITE_URL}/projects/svg-central-square`;
const DESCRIPTION = 'Explore SVG Central Square, Greater Noida — pre-leased retail shops with floor-wise pricing, rental guarantee, payment plans and investment options. Enquire with REAL PROP for latest availability.';

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'REAL PROP',
    url: SITE_URL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'REAL PROP',
    url: SITE_URL,
    publisher: { '@type': 'Organization', name: 'REAL PROP', url: SITE_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
      { '@type': 'ListItem', position: 3, name: 'SVG Central Square', item: PROJECT_URL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'SVG Central Square Greater Noida',
    url: PROJECT_URL,
    description: DESCRIPTION,
    about: {
      '@type': 'Place',
      name: 'SVG Central Square',
      description: 'Pre-leased retail investment opportunity in Greater Noida presented by REAL PROP.',
    },
  },
];

export default function StructuredData() {
  useEffect(() => {
    const id = 'real-prop-svg-central-square-schema';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemas);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  return null;
}
