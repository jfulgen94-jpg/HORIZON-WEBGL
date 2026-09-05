/**
 * CONSENT.JS — Almacén mínimo de consentimiento (S1-12).
 *
 * Decisiones aprobadas que implementa:
 *  D1 Necesarias: nada persistente + memoria de sesión.
 *  D2 Opcionales: funcional (claves horizon_*) y terceros (Google Fonts).
 *  D3 Analítica: SÍ, Vercel Analytics (sin cookies; solo informativa aquí).
 *  D4 Afiliación con tracking: NO.
 *  D5 Antes de elegir: solo se permite guardar la propia elección.
 *  D6 Ruta de la política: /cookies. Reapertura vía evento "horizon:open-consent".
 *  D7 Persistencia: una sola clave "horizon_consent" sin datos personales.
 *
 * No afirma cumplimiento RGPD. [REQUIERE REVISIÓN JURÍDICA PROFESIONAL]
 */

export const CONSENT_KEY = "horizon_consent";
export const CONSENT_VERSION = 1;
export const OPEN_CONSENT_EVENT = "horizon:open-consent";

// Claves funcionales verificadas en código.
export const FUNCTIONAL_KEYS = [];

// Respaldo en memoria para funcionar sin persistir cuando no hay consentimiento.
const memoryFallback = Object.create(null);

function readRaw() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

/** Devuelve el objeto de consentimiento guardado o null si no hay elección. */
export function getConsent() {
  const raw = readRaw();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.v === CONSENT_VERSION) return parsed;
    return null;
  } catch {
    return null;
  }
}

/** ¿El usuario ya eligió (cualquier opción)? */
export function hasChosen() {
  return getConsent() !== null;
}

/** Puerta funcional: ¿puede usarse localStorage persistente opcional? */
export function canUseFunctional() {
  const c = getConsent();
  return c !== null && c.functional === true;
}

/** Puerta de terceros: ¿puede cargarse Google Fonts? */
export function canUseThirdParty() {
  const c = getConsent();
  return c !== null && c.thirdParty === true;
}

/**
 * Guarda la elección. Es la única escritura permitida antes de elegir (D5).
 * @param {{ functional: boolean, thirdParty: boolean }} opts
 */
export function saveConsent({ functional, thirdParty }) {
  const value = {
    v: CONSENT_VERSION,
    necessary: true,
    functional: Boolean(functional),
    thirdParty: Boolean(thirdParty),
    timestamp: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* almacenamiento no disponible: la elección vive solo en memoria */
  }
  applyConsentSideEffects(value);
  return value;
}

/** Borra los datos funcionales persistidos (al revocar la categoría). */
export function clearFunctionalData() {
  for (const key of FUNCTIONAL_KEYS) {
    delete memoryFallback[key];
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignorar */
    }
  }
}

/** Carga Google Fonts solo con consentimiento de terceros (D2 + D5). */
let fontsInjected = false;
export function ensureThirdParty() {
  if (!canUseThirdParty() || fontsInjected) return;
  if (typeof document === "undefined") return;
  fontsInjected = true;
  const pre1 = document.createElement("link");
  pre1.rel = "preconnect";
  pre1.href = "https://fonts.googleapis.com";
  const pre2 = document.createElement("link");
  pre2.rel = "preconnect";
  pre2.href = "https://fonts.gstatic.com";
  pre2.crossOrigin = "anonymous";
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href =
    "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap";
  document.head.append(pre1, pre2, css);
}

/** Aplica efectos laterales de la elección actual (fuentes / limpieza). */
export function applyConsentSideEffects(consent) {
  if (!consent) return;
  if (consent.thirdParty) ensureThirdParty();
  if (!consent.functional) clearFunctionalData();
}

/** Pide a la app que abra el panel de preferencias (Footer / /cookies). */
export function requestOpenPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

/** Lectura con respaldo en memoria (usada cuando no hay puerta de consentimiento). */
export function gatedGet(key) {
  if (!canUseFunctional()) {
    return Object.prototype.hasOwnProperty.call(memoryFallback, key)
      ? memoryFallback[key]
      : null;
  }
  try {
    const v = localStorage.getItem(key);
    return v;
  } catch {
    return Object.prototype.hasOwnProperty.call(memoryFallback, key)
      ? memoryFallback[key]
      : null;
  }
}

/** Escritura con respaldo en memoria (usada cuando no hay puerta de consentimiento). */
export function gatedSet(key, value) {
  if (!canUseFunctional()) {
    memoryFallback[key] = value;
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch {
    memoryFallback[key] = value;
  }
}

/** Borrado con respaldo en memoria (usado cuando no hay puerta de consentimiento). */
export function gatedRemove(key) {
  delete memoryFallback[key];
  if (!canUseFunctional()) return;
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignorar */
  }
}
