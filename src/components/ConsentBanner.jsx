import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import {
  OPEN_CONSENT_EVENT,
  applyConsentSideEffects,
  getConsent,
  hasChosen,
  saveConsent,
} from "../utils/consent";

/**
 * CONSENTBANNER — Primera capa + panel de preferencias (S1-12).
 * Categorías aprobadas: necesarias (siempre activas), funcional y terceros.
 * Vercel Analytics (D3) es medición sin cookies y solo se informa, no se
 * pide ni se bloquea aquí. No afirma cumplimiento RGPD.
 * [REQUIERE REVISIÓN JURÍDICA PROFESIONAL]
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [thirdParty, setThirdParty] = useState(false);
  const bannerRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    applyConsentSideEffects(getConsent());
    if (!hasChosen()) setVisible(true);
    const open = () => {
      const c = getConsent();
      setFunctional(c ? c.functional === true : false);
      setThirdParty(c ? c.thirdParty === true : false);
      lastFocus.current = document.activeElement;
      setPanelOpen(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  useEffect(() => {
    if (panelOpen && panelRef.current) {
      const first = panelRef.current.querySelector("button");
      if (first) first.focus();
    }
  }, [panelOpen]);

  const close = useCallback((restoreFocus = true) => {
    setPanelOpen(false);
    if (hasChosen()) setVisible(false);
    if (restoreFocus && lastFocus.current && lastFocus.current.focus) {
      lastFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panelOpen, close]);

  const acceptAll = () => {
    saveConsent({ functional: true, thirdParty: true });
    setVisible(false);
    setPanelOpen(false);
  };

  const rejectNonEssential = () => {
    saveConsent({ functional: false, thirdParty: false });
    setVisible(false);
    setPanelOpen(false);
  };

  const openPanel = () => {
    const c = getConsent();
    setFunctional(c ? c.functional === true : false);
    setThirdParty(c ? c.thirdParty === true : false);
    lastFocus.current = document.activeElement;
    setPanelOpen(true);
  };

  const savePreferences = () => {
    saveConsent({ functional, thirdParty });
    setVisible(false);
    setPanelOpen(false);
    if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
  };

  if (!visible) return null;

  const btnBase =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors min-h-[44px] flex-1 sm:flex-none";

  return (
    <>
      {!panelOpen && (
        <div
          ref={bannerRef}
          role="region"
          aria-label="Aviso de almacenamiento y privacidad"
          className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-4xl bg-[#161C27] border border-white/[0.12] rounded-2xl p-5 sm:p-6 shadow-2xl">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#3B6FD4] mb-2">
              <Cookie size={14} aria-hidden="true" />
              Tu privacidad
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-1">
              Usamos almacenamiento local para tu borrador y tu progreso, y conectamos
              con IA solo cuando generas un informe. La medición de visitas es con
              Vercel Analytics, sin cookies.
            </p>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Elige cómo continuar. Detalles en la{" "}
              <Link to="/cookies" className="text-[#3B6FD4] hover:underline">
                política de cookies
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button type="button" onClick={acceptAll} className={`${btnBase} bg-[#3B6FD4] text-white hover:bg-[#2D5AB8]`}>
                Aceptar todo
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className={`${btnBase} bg-white/[0.05] border border-white/[0.12] text-white hover:bg-white/[0.1]`}
              >
                Solo necesario
              </button>
              <button
                type="button"
                onClick={openPanel}
                className={`${btnBase} bg-white/[0.05] border border-white/[0.12] text-white hover:bg-white/[0.1]`}
              >
                Configurar
              </button>
            </div>
          </div>
        </div>
      )}

      {panelOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 motion-safe:animate-none"
            onClick={() => close(true)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-panel-title"
            className="relative w-full max-w-lg bg-[#161C27] border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 id="consent-panel-title" className="font-display text-xl text-white mb-1">
              Preferencias de almacenamiento
            </h2>
            <p className="text-sm text-white/60 mb-6">
              Activa solo lo que necesites. Puedes cambiarlo cuando quieras desde el
              pie de página.
            </p>

            <ul className="space-y-4 mb-6">
              <li className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div>
                  <p className="text-sm text-white font-medium">Estrictamente necesario</p>
                  <p className="text-xs text-white/60 mt-1">
                    Borrador en memoria, generación del informe que solicitas y
                    seguridad. Sin almacenamiento persistente.
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#2BDE73] shrink-0 mt-1">
                  Siempre activo
                </span>
              </li>
              <li className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div>
                  <p className="text-sm text-white font-medium">Funcional</p>
                  <p className="text-xs text-white/60 mt-1">
                    Sesión simulada, perfil anónimo y cuotas guardadas en tu
                    navegador. Sin esto, la app funciona pero no recuerda nada.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={functional}
                  aria-label="Almacenamiento funcional"
                  onClick={() => setFunctional((v) => !v)}
                  className={`relative w-12 h-7 rounded-full shrink-0 mt-1 transition-colors ${
                    functional ? "bg-[#3B6FD4]" : "bg-white/[0.12]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all motion-reduce:transition-none ${
                      functional ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </li>
              <li className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div>
                  <p className="text-sm text-white font-medium">Terceros: Google Fonts</p>
                  <p className="text-xs text-white/60 mt-1">
                    Carga tipografías desde Google (envía tu IP a Google). Sin esto
                    se usan las fuentes del sistema.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={thirdParty}
                  aria-label="Fuentes de Google"
                  onClick={() => setThirdParty((v) => !v)}
                  className={`relative w-12 h-7 rounded-full shrink-0 mt-1 transition-colors ${
                    thirdParty ? "bg-[#3B6FD4]" : "bg-white/[0.12]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all motion-reduce:transition-none ${
                      thirdParty ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </li>
            </ul>

            <p className="font-mono text-[11px] text-white/40 leading-relaxed mb-6">
              Nota: la medición de visitas usa Vercel Analytics, sin cookies
              [REQUIERE REVISIÓN JURÍDICA]. Más información en la{" "}
              <Link to="/cookies" className="text-[#3B6FD4] hover:underline">
                política de cookies
              </Link>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={savePreferences}
                className={`${btnBase} bg-[#3B6FD4] text-white hover:bg-[#2D5AB8]`}
              >
                Guardar preferencias
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className={`${btnBase} bg-white/[0.05] border border-white/[0.12] text-white hover:bg-white/[0.1]`}
              >
                Aceptar todo
              </button>
              <button
                type="button"
                onClick={() => close(true)}
                className={`${btnBase} bg-transparent text-white/60 hover:text-white`}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
