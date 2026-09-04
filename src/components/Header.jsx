import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const NAV_ITEMS = [
  { path: "/", label: "Inicio" },
  { path: "/manifiesto", label: "Manifiesto" },
  { path: "/areas", label: "Laboratorios" },
  { path: "/herramientas", label: "Herramientas" },
  { path: "/taller", label: "Taller" },
  { path: "/comunidad", label: "Comunidad" },
  { path: "/biblioteca", label: "Biblioteca" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#F5F1E8]/95 backdrop-blur-sm">
      <div className="h-[1px] w-full header-shimmer" />
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" data-od-id="nav-logo">
          <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
            <path d="M16 4L4 26" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
            <path d="M16 4L28 26" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
            <path d="M4 26H28" stroke="#3B6FD4" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="font-['DM_Serif_Display'] text-[#111111] text-xl tracking-tight">
            Horizon
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" data-od-id="nav-desktop">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "font-mono text-[11px] uppercase tracking-widest transition-colors pb-0.5",
                location.pathname === item.path
                  ? "text-[#3B6FD4] nav-active-dot"
                  : "text-[#111111]/60 hover:text-[#111111]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4" data-od-id="nav-cta">
          <Link
            to="/manifiesto"
            className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#111111]/60 hover:text-[#111111] transition-colors"
          >
            Manifiesto
          </Link>
          <Link
            to="/areas"
            className="hidden md:inline-flex items-center gap-2 bg-[#3B6FD4] text-white px-4 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider hover:bg-[#2D5AB8] transition-colors"
          >
            Explorar
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={clsx("w-5 h-0.5 bg-[#111111] transition-all", menuOpen && "rotate-45 translate-y-2")} />
          <span className={clsx("w-5 h-0.5 bg-[#111111] transition-opacity", menuOpen && "opacity-0")} />
          <span className={clsx("w-5 h-0.5 bg-[#111111] transition-all", menuOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#111111]/10 bg-[#F5F1E8] px-6 py-6 animate-slide-down">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  "font-mono text-[11px] uppercase tracking-widest",
                  location.pathname === item.path
                    ? "text-[#3B6FD4]"
                    : "text-[#111111]/60"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-4 border-t border-[#111111]/10">
              <Link
                to="/manifiesto"
                onClick={() => setMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-widest text-[#111111]/60"
              >
                Manifiesto
              </Link>
              <Link
                to="/areas"
                onClick={() => setMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center bg-[#3B6FD4] text-white px-4 py-2 rounded-lg font-mono text-[11px] uppercase tracking-wider"
              >
                Explorar
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
