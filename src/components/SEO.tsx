import { useEffect } from 'react';

const TITLE = 'SVG Central Square Greater Noida | Pre-Leased Commercial Shops | REAL PROP';
const DESCRIPTION = 'Explore SVG Central Square, Greater Noida — pre-leased retail shops with floor-wise pricing, rental guarantee, payment plans and investment options. Enquire with REAL PROP for latest availability.';
const CANONICAL = 'https://realprop.online/projects/svg-central-square';
const OG_IMAGE = 'https://realprop.online/svg-central-square/svg-01.jpeg';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO() {
  useEffect(() => {
    document.title = TITLE;
    upsertMeta('name', 'description', DESCRIPTION);
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('name', 'theme-color', '#08090c');

    upsertMeta('property', 'og:title', TITLE);
    upsertMeta('property', 'og:description', DESCRIPTION);
    upsertMeta('property', 'og:url', CANONICAL);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:image', OG_IMAGE);
    upsertMeta('property', 'og:image:alt', 'SVG Central Square Greater Noida');
    upsertMeta('property', 'og:site_name', 'REAL PROP');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', TITLE);
    upsertMeta('name', 'twitter:description', DESCRIPTION);
    upsertMeta('name', 'twitter:image', OG_IMAGE);

    upsertLink('canonical', CANONICAL);
  }, []);

  return null;
}
