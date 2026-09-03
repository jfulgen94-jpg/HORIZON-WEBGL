import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLabBySlug, LABS } from "../data/labs-data";

const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>;

function ResearchLineCard({ line }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-2xl overflow-hidden transition-all duration-300" style={{ borderColor: line.color + "30", background: line.color + "08" }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left p-5 sm:p-6 flex items-start gap-4 hover:opacity-90 transition-opacity">
        <span className="font-display text-2xl sm:text-3xl text-white/20 shrink-0 leading-none mt-0.5">{line.number}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-base sm:text-lg text-white leading-snug">{line.title}</h3>
            <ChevronDown className={`shrink-0 text-white/40 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="text-white/50 text-sm mt-1.5 leading-relaxed line-clamp-2">{line.summary}</p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs border px-2.5 py-0.5 rounded-full" style={{ background: line.color + "18", color: line.color, borderColor: line.color + "30" }}>
              Top: {line.topModel}
            </span>
            <span className="font-display text-sm font-bold" style={{ color: line.color }}>{line.score}/100</span>
          </div>
        </div>
      </button>
      {open && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/5 pt-4 space-y-4">
          <p className="text-white/60 text-sm leading-relaxed">{line.detail}</p>
        </div>
      )}
    </div>
  );
}

export default function GenericLab() {
  const { slug } = useParams();
  const lab = getLabBySlug(slug);

  if (!lab) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="font-display text-3xl text-white mb-4">Laboratorio no encontrado</h1>
        <Link to="/areas" className="text-[#3B6FD4] font-mono text-sm">Volver a Áreas</Link>
      </div>
    );
  }

  const RESEARCH_LINES = [
    { number: "01", title: `Investigación principal en ${lab.name}`, summary: lab.shortDesc, detail: lab.fullDesc, color: lab.color, topModel: "Claude 3.7 Sonnet", score: "94.41" },
    { number: "02", title: "Análisis y procesamiento de datos", summary: "Pipeline de datos sectorial con modelos optimizados para el dominio.", detail: "Cada laboratorio tiene sus propios benchmarks y datasets de referencia.", color: lab.color, topModel: "GPT-4o", score: "92.80" },
    { number: "03", title: "Herramientas y automatización", summary: "Desarrollo de herramientas específicas para el sector.", detail: "Integración de modelos de IA con flujos de trabajo profesionales.", color: lab.color, topModel: "DeepSeek-R1", score: "91.55" },
  ];

  return (
    <div className="min-h-full">
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4">
          <Link to="/areas" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Todos los laboratorios
          </Link>
        </div>
      </div>

      <div className="border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 80% 50%, ${lab.color}12 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: lab.colorDim, border: `1px solid ${lab.color}30`, color: lab.color }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs border px-3 py-0.5 rounded-full" style={{ borderColor: lab.color + "40", background: lab.color + "18", color: lab.color }}>Laboratorio verificado</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Laboratorio de <span style={{ color: lab.color }}>{lab.name}</span>
              </h1>
              <p className="text-white/50 text-lg sm:text-xl mt-3 max-w-2xl leading-relaxed">{lab.fullDesc}</p>
              <div className="flex flex-wrap gap-5 mt-8 pt-8 border-t border-white/5">
                {[{ label: "Líneas de investigación", value: "3" }, { label: "Proyectos activos", value: String(lab.metrics.projects) }, { label: "Benchmarks cubiertos", value: String(lab.metrics.benchmarks) }].map(s => (
                  <div key={s.label}><p className="font-display text-2xl text-white">{s.value}</p><p className="text-xs text-white/30 mt-0.5">{s.label}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-20">
        <section>
          <h2 className="font-display text-2xl sm:text-3xl text-white mb-8">Qué se investiga aquí</h2>
          <div className="space-y-3">{RESEARCH_LINES.map((line, i) => <ResearchLineCard key={i} line={line} />)}</div>
        </section>

        <section>
          <h2 className="font-display text-2xl sm:text-3xl text-white mb-8">Proyectos destacados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lab.projects?.map(p => (
              <div key={p.name} className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-6 hover:border-white/[0.15] transition-colors">
                <h3 className="font-display text-xl text-white mb-2">{p.name}</h3>
                <p className="text-white/40 text-sm mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">{p.stack.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded border" style={{ color: lab.color, background: lab.colorDim, borderColor: lab.color + "20" }}>{t}</span>)}</div>
              </div>
            )) || <p className="text-white/30 text-sm col-span-2">Proyectos en desarrollo. Vuelve pronto.</p>}
          </div>
        </section>

        <div className="border-t border-white/[0.06] pt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link to="/areas" className="text-[#3B6FD4] font-mono text-xs uppercase tracking-wider hover:underline">← Volver a todas las áreas</Link>
          <Link to={`${lab.route}/wizard`} className="inline-flex items-center gap-2 bg-[#3B6FD4] text-white px-6 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-wider hover:bg-[#2D5AB8] transition-colors">
            Entrar al Wizard
          </Link>
        </div>
      </div>
    </div>
  );
}
