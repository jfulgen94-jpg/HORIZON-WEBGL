import { useEffect } from 'react';

const SITE = 'Horizon — Centro Interactivo de IA Aplicada';
const BASE = 'https://horizon-webgl.vercel.app';

function setMeta(property, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSEO({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : SITE;
    document.title = fullTitle;

    if (description) {
      setMeta('description', description);
      setMeta('og:title', title || SITE, 'property');
      setMeta('og:description', description, 'property');
      setMeta('og:url', `${BASE}${path}`, 'property');
      setMeta('twitter:title', title || SITE);
      setMeta('twitter:description', description);
    }

    setCanonical(`${BASE}${path}`);
  }, [title, description, path]);
}
