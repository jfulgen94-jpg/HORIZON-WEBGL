import { Link } from "react-router-dom";
import { requestOpenPreferences } from "../utils/consent";

export default function Footer() {
  return (
    <footer className="bg-[#F5F1E8] border-t border-[#111111]/10" data-od-id="footer">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                <path d="M16 4L4 26" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
                <path d="M16 4L28 26" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
                <path d="M4 26H28" stroke="#3B6FD4" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="font-['DM_Serif_Display'] text-[#111111] text-xl tracking-tight">
                Horizon
              </span>
            </Link>
            <p className="text-[#111111]/50 text-sm leading-relaxed max-w-xs">
              Centro Interactivo de IA Aplicada. Laboratorios sectoriales con ciencia verificable.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/40 mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Laboratorios", to: "/areas" },
                { label: "Herramientas", to: "/herramientas" },
                { label: "Taller", to: "/taller" },
                { label: "Comunidad", to: "/comunidad" },
                { label: "Biblioteca", to: "/biblioteca" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[#111111]/60 hover:text-[#3B6FD4] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/40 mb-4">
              Recursos
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Manifiesto", to: "/manifiesto" },
                { label: "Biblioteca de Prompts", to: "/biblioteca/prompts" },
                { label: "Biblioteca de Dirección", to: "/biblioteca/direccion" },
                { label: "Mapa del Taller", to: "/taller/mapa" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[#111111]/60 hover:text-[#3B6FD4] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/40 mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Privacidad", to: "/privacidad" },
                { label: "Términos", to: "/terminos" },
                { label: "Cookies", to: "/cookies" },
                { label: "Aviso Legal", to: "/aviso-legal" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[#111111]/60 hover:text-[#3B6FD4] text-sm transition-colors rounded focus-visible:outline-2 focus-visible:outline-[#3B6FD4] focus-visible:outline-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={requestOpenPreferences}
                  className="text-[#111111]/60 hover:text-[#3B6FD4] text-sm transition-colors rounded focus-visible:outline-2 focus-visible:outline-[#3B6FD4] focus-visible:outline-offset-2"
                >
                  Preferencias de cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#111111]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/30">
            &copy; 2026 Horizon. Ciencia verificable, no promesas.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/30">
              Hecho con rigor
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
