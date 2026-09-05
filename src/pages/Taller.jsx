import { useState } from "react";
import { Link } from "react-router-dom";
import { IDES } from "../data/ide-data";
import IDECard from "../components/IDECard";
import QuickStartGuide from "../components/QuickStartGuide";
import { useSEO } from "../hooks/useSEO";

const ROUTES = [
  { slug: "finanzas", title: "FinAudit", lab: "Finanzas", color: "#3B6FD4", difficulty: "Avanzado", stack: "Python, DuckDB, FinBERT, Flet", desc: "Motor de análisis fundamental, cálculo de ratios Sharpe/Sortino/MDD y sentimiento financiero.", path: "/lab/finanzas" },
  { slug: "medicina", title: "Mente Médica", lab: "Medicina", color: "#0D9488", difficulty: "Avanzado", stack: "PubMed API, FHIR R4, Pydantic, Flet", desc: "Asistente clínico con CoT médico, consulta PubMed y guardrails bioéticos Do-No-Harm.", path: "/lab/medicina" },
  { slug: "contabilidad", title: "Balance Inteligente", lab: "Contabilidad", color: "#10B981", difficulty: "Intermedio", stack: "Norma 43, Pandas, Flet, SQLite", desc: "Conciliación bancaria determinista 1-a-1, validación Pydantic y principio de No Auto-Asiento.", path: "/lab/contabilidad" },
  { slug: "matematicas", title: "Prisma Matemático", lab: "Matemáticas", color: "#6366F1", difficulty: "Avanzado", stack: "SymPy, SciPy, MILP, Flet", desc: "Sandbox algebraico formal, resolución paso a paso y optimización lineal/estocástica.", path: "/lab/matematicas" },
  { slug: "ingenieria", title: "CodeAudit", lab: "Ingeniería", color: "#F97316", difficulty: "Intermedio", stack: "AST, Subprocess Sandbox, Flet", desc: "Auditoría de código, métricas de complejidad ciclomática y sandbox de ejecución segura.", path: "/lab/ingenieria" },
  { slug: "derecho", title: "Lex Analyst", lab: "Derecho", color: "#B91C1C", difficulty: "Intermedio", stack: "LegalBench, CUAD, QuoteVerifier", desc: "Revisión contractual con verificación estricta de citas y almacenamiento Zero-PII.", path: "/lab/derecho" },
  { slug: "diseno", title: "Prism UX", lab: "Diseño & UX", color: "#EC4899", difficulty: "Iniciación", stack: "Nielsen Rúbricas, LLM-as-Judge", desc: "Evaluación heurística de interfaces, contraste WCAG y generación de microcopy.", path: "/lab/diseno" },
  { slug: "psicologia", title: "Psique Lab", lab: "Psicología", color: "#D97706", difficulty: "Iniciación", stack: "ToM-Bench, DAT Score, Flet", desc: "Evaluación de distancia semántica, detección de 4 sesgos y protocolo de derivación.", path: "/lab/psicologia" },
];

const Icon = ({ name, size = 20 }) => {
  const icons = {
    activity: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    "heart-pulse": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/></svg>,
    "file-text": <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
    binary: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4M14 10h4M6 10v10M14 4v10"/></svg>,
    cpu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/></svg>,
    scale: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L2 7h20L12 3z"/><path d="M2 7v6c0 5.5 4.5 10 10 10s10-4.5 10-10V7"/></svg>,
    palette: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
    brain: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 2.5 1.5 4.5 3.5 5.5v3a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-3c2-1 3.5-3 3.5-5.5A5.5 5.5 0 0 0 14.5 2h-5z"/><path d="M10 18h4"/></svg>,
  };
  const map = { finanzas: "activity", medicina: "heart-pulse", contabilidad: "file-text", matematicas: "binary", ingenieria: "cpu", derecho: "scale", diseno: "palette", psicologia: "brain" };
  return icons[map[name] || name] || icons.cpu;
};

const ArrowRight = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;

export default function Taller() {
  useSEO({
    title: "El Taller",
    description: "8 rutas guiadas paso a paso para construir tu primera app con IA. Desde Iniciación hasta Avanzado.",
    path: "/taller",
  });

  const [filter, setFilter] = useState("Todos");
  const displayed = filter === "Todos" ? ROUTES : ROUTES.filter((r) => r.difficulty === filter);

  return (
    <div className="relative min-h-full pb-20 pt-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#6B95E8] border border-[#3B6FD4]/20 bg-[#3B6FD4]/5 px-3 py-1 rounded-full mb-4">
            Taller Interactivo
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F3F4F8] mb-3">El Banco de Trabajo de la IA Aplicada</h1>
          <p className="text-sm sm:text-base text-[#9BA3B8] max-w-2xl leading-relaxed">
            Aprende a construir aplicaciones profesionales con Inteligencia Artificial. Elige tu IDE, configura las extensiones y empieza a construir.
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="mb-12">
          <QuickStartGuide />
        </div>

        {/* Plano Vivo Link */}
        <div className="mb-12">
          <Link
            to="/taller/mapa"
            className="group flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-[#3B6FD4]/10 to-transparent border border-[#3B6FD4]/20 hover:border-[#3B6FD4]/40 transition-all"
          >
            <div>
              <h3 className="font-display text-xl text-[#F3F4F8] mb-1 group-hover:text-[#6B95E8] transition-colors">
                Plano Vivo del Taller
              </h3>
              <p className="text-sm text-[#9BA3B8]">
                Explora la estructura de Horizon en un mapa 3D interactivo con Three.js.
              </p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 ml-4 group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* IDEs Section */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#3B6FD4] mb-2">
                Entornos de Desarrollo
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#F3F4F8]">5 IDEs comparados</h2>
            </div>
            <span className="font-mono text-xs text-[#525A70]">{IDES.length} opciones</span>
          </div>
          <div className="space-y-3">
            {IDES.map((ide) => (
              <IDECard key={ide.id} ide={ide} />
            ))}
          </div>
        </div>

        {/* Labs Routes */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#3B6FD4] mb-2">
                Laboratorios
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#F3F4F8]">8 sectores, un estándar</h2>
            </div>
            <Link
              to="/areas"
              className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#525A70] hover:text-[#3B6FD4] transition-colors"
            >
              Ver todos
              <ArrowRight />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {["Todos", "Iniciación", "Intermedio", "Avanzado"].map((lvl) => (
              <button key={lvl} onClick={() => setFilter(lvl)}
                className={`font-mono text-xs px-4 py-2 rounded-md border transition-all ${filter === lvl ? "bg-[#3B6FD4] border-[#3B6FD4] text-white" : "bg-[#10141D] border-white/10 text-[#9BA3B8] hover:text-[#F3F4F8]"}`}>
                {lvl}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayed.map((r) => (
              <div key={r.slug} className="bg-[#10141D] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between hover:border-white/[0.18] transition-all backdrop-blur-sm">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-white/[0.04]" style={{ color: r.color }}>
                      <Icon name={r.slug} />
                    </div>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-white/5 text-[#525A70]">{r.difficulty}</span>
                  </div>
                  <h3 className="font-display text-xl text-[#F3F4F8] mb-1">{r.title}</h3>
                  <div className="font-mono text-[11px] text-[#6B95E8] mb-2">{r.lab}</div>
                  <p className="text-xs text-[#9BA3B8] leading-relaxed mb-4">{r.desc}</p>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[#525A70] mb-4">{r.stack}</div>
                  <Link to={r.path} className="font-mono text-xs uppercase text-[#6B95E8] hover:text-[#3B6FD4] inline-flex items-center gap-1 transition-colors">
                    Entrar a la ruta <ArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
