import { Link } from "react-router-dom";
import { LABS } from "../data/labs-data";
import LabCard from "../components/LabCard";
import HeroCanvas from "../components/webgl/HeroCanvas";
import { useSEO } from "../hooks/useSEO";

export default function Home() {
  useSEO({
    title: "Centro Interactivo de IA Aplicada",
    description: "Construye y verifica apps con IA de forma responsable. 8 laboratorios sectoriales, 440+ prompts y rutas de aprendizaje.",
    path: "/",
  });

  return (
    <div data-od-id="home">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
        {/* WebGL Aurora Background */}
        <HeroCanvas />
        {/* Fallback gradient (visible when WebGL not supported) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10] via-[#0A0C10] to-[#10141D] -z-10" />

        <div className="relative z-10 max-w-4xl mx-auto text-center" data-od-id="hero-content">
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-[#3B6FD4] mb-6">
            Centro Interactivo de construccion y verificacion de app&apos;s
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F4F8] leading-[1.05] mb-6 animate-fade-up">
            Tecnologia, desarrollo y conocimiento, todo unido hacia un futuro, potencial, ¿Quieres construirlo?
          </h1>
          <p className="text-[#9BA3B8] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up-1">
            8 laboratorios sectoriales con benchmarks reales, trazabilidad total y protocolos de seguridad. Cada proyecto tiene evidencia.
          </p>

          {/* Metrics bar */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 sm:gap-12 mb-12 animate-fade-up-2">
            {[
              { value: "8", label: "Laboratorios" },
              { value: "18", label: "Proyectos" },
              { value: "66", label: "Benchmarks" },
              { value: "120+", label: "Herramientas" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-mono text-3xl sm:text-4xl text-[#F3F4F8]">{stat.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#525A70] mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-3">
            <Link
              to="/areas"
              className="inline-flex items-center justify-center gap-2 bg-[#3B6FD4] text-white px-8 py-3 rounded-xl font-mono text-[11px] uppercase tracking-wider hover:bg-[#2D5AB8] transition-all hover:shadow-[0_4px_20px_rgba(59,111,212,0.3)]"
            >
              Explorar Laboratorios
            </Link>
            <Link
              to="/manifiesto"
              className="inline-flex items-center justify-center gap-2 bg-white/[0.05] text-white/70 px-8 py-3 rounded-xl font-mono text-[11px] uppercase tracking-wider border border-white/[0.12] hover:bg-white/[0.1] hover:text-[#F3F4F8] hover:border-white/[0.2] transition-all"
            >
              Leer el Manifiesto
            </Link>
          </div>
        </div>
      </section>

      {/* Labs Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24" data-od-id="labs-grid">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-[#3B6FD4] mb-2">
              Laboratorios
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-white">
              8 sectores, un estándar
            </h2>
          </div>
          <Link
            to="/areas"
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/40 hover:text-[#3B6FD4] transition-colors"
          >
            Ver todos
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {LABS.map((lab, i) => (
            <LabCard
              key={lab.id}
              lab={lab}
              variant={i === 0 ? "bento" : "grid"}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Manifesto preview */}
      <section className="border-t border-white/[0.06] py-24 px-6" data-od-id="manifesto-preview">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#3B6FD4] mb-4">
            Manifiesto
          </span>
          <blockquote className="font-display text-2xl sm:text-3xl text-white/80 leading-relaxed mb-8">
            "No usamos IA para generar contenido bonito. La usamos para resolver problemas reales con evidencia verificable."
          </blockquote>
          <Link
            to="/manifiesto"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/40 hover:text-[#3B6FD4] transition-colors"
          >
            Leer más
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
