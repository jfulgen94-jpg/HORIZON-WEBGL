import { useState } from "react";
import { TOOLS, FAMILY_CRITERIA, ALL_LABS } from "../data/tools-data";
import { useSEO } from "../hooks/useSEO";

const FAMILIES = ["Todos", "IDEs y Extensiones", "LLMs", "SaaS y Agentes", "Librerías y Datos"];
const FAMILY_COLORS = {
  "IDEs y Extensiones": { bg: "bg-violet-500/10", text: "text-violet-300", border: "border-violet-500/20" },
  "LLMs": { bg: "bg-blue-500/10", text: "text-blue-300", border: "border-blue-500/20" },
  "SaaS y Agentes": { bg: "bg-emerald-500/10", text: "text-emerald-300", border: "border-emerald-500/20" },
  "Librerías y Datos": { bg: "bg-amber-500/10", text: "text-amber-300", border: "border-amber-500/20" },
};

function FamilyBadge({ family }) {
  const c = FAMILY_COLORS[family] || { bg: "bg-white/8", text: "text-white/60", border: "border-white/15" };
  return <span className={`inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border}`}>{family}</span>;
}

function ToolSheet({ tool, onClose }) {
  const criteria = FAMILY_CRITERIA[tool.family] || [];
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-end" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#161C27] border-l border-white/10 h-full w-full max-w-xl overflow-y-auto animate-slide-down">
        <div className="sticky top-0 bg-[#161C27]/95 border-b border-white/[0.08] px-6 py-4 flex items-center gap-3 z-10" style={{ backdropFilter: "blur(8px)" }}>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl text-white truncate">{tool.name}</h2>
            <FamilyBadge family={tool.family} />
          </div>
          {tool.free && <span className="shrink-0 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">100% gratis</span>}
        </div>
        <div className="px-6 py-6 space-y-7">
          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Laboratorios</div>
            <div className="flex flex-wrap gap-1.5">
              {tool.labs.map(l => <span key={l} className="text-[11px] bg-[#3B6FD4]/8 text-[#3B6FD4]/70 border border-[#3B6FD4]/15 px-2 py-0.5 rounded-full">{l}</span>)}
            </div>
          </div>
          <div><p className="text-white/80 text-sm leading-relaxed">{tool.desc}</p></div>
          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Qué hace</div>
            <p className="text-white/60 text-sm leading-relaxed">{tool.what}</p>
          </div>
          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Características principales</div>
            <ul className="space-y-2">
              {tool.features.map(f => <li key={f} className="flex gap-2 text-sm text-white/65"><span className="text-[#3B6FD4]/60 shrink-0 mt-0.5">—</span><span>{f}</span></li>)}
            </ul>
          </div>
          <div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Diferenciación con Horizon</div>
            <p className="text-white/55 text-sm leading-relaxed italic border-l-2 border-[#3B6FD4]/30 pl-3">{tool.horizon}</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
            <a href={tool.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#3B6FD4] hover:bg-[#2D5AB8] text-white text-xs font-medium px-4 py-2 rounded-sm transition-colors">
              {tool.free ? "Acceder gratis" : "Ver herramienta"}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
            </a>
            {tool.github && (
              <a href={tool.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#232B3D] border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-xs font-medium px-4 py-2 rounded-sm transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Herramientas() {
  useSEO({
    title: "Herramientas",
    description: "Catálogo de 120+ herramientas de IA organizadas por familias: IDEs, LLMs, SaaS y librerías para cada sector.",
    path: "/herramientas",
  });

  const [family, setFamily] = useState("Todos");
  const [lab, setLab] = useState("Todos");
  const [query, setQuery] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = TOOLS.filter(t => {
    if (family !== "Todos" && t.family !== family) return false;
    if (lab !== "Todos" && !t.labs.includes(lab)) return false;
    if (freeOnly && !t.free) return false;
    if (query && !t.name.toLowerCase().includes(query.toLowerCase()) && !t.desc.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const grouped = {};
  filtered.forEach(t => { if (!grouped[t.family]) grouped[t.family] = []; grouped[t.family].push(t); });

  return (
    <div className="relative min-h-full pt-28 pb-24 px-6">
      {selected && <ToolSheet tool={selected} onClose={() => setSelected(null)} />}
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-[#3B6FD4] text-xs font-medium tracking-widest uppercase mb-3 block">Herramientas & Extensiones</span>
          <h1 className="font-display text-4xl sm:text-5xl text-white mb-3">{TOOLS.length} herramientas.<br />Sin ruido.</h1>
          <p className="text-white/50 text-base max-w-2xl leading-relaxed">Fichas canónicas por familia, valoradas por la comunidad Horizon en los criterios que importan en cada sector.</p>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          <div className="flex flex-wrap gap-2 items-center">
            <input type="text" placeholder="Buscar herramienta..." value={query} onChange={e => setQuery(e.target.value)}
              className="bg-[#161C27] border border-white/10 text-white text-sm rounded-sm px-3 py-2 w-56 placeholder:text-white/25 focus:outline-none focus:border-[#3B6FD4]/40" />
            <label className="flex items-center gap-1.5 text-xs text-white/55 cursor-pointer select-none">
              <input type="checkbox" checked={freeOnly} onChange={e => setFreeOnly(e.target.checked)} className="accent-[#3B6FD4]" />
              Solo 100% gratis
            </label>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FAMILIES.map(f => (
              <button key={f} onClick={() => setFamily(f)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-colors ${family === f ? "bg-[#3B6FD4] text-white" : "bg-[#161C27] border border-white/10 text-white/55 hover:text-white hover:border-white/20"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Todos", ...ALL_LABS].map(l => (
              <button key={l} onClick={() => setLab(l)}
                className={`px-2.5 py-1 rounded-sm text-[11px] font-medium transition-colors ${lab === l ? "bg-[#3B6FD4]/20 text-[#3B6FD4] border border-[#3B6FD4]/30" : "bg-[#161C27] border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/15"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <p className="text-white/25 text-xs mb-6">{filtered.length} herramientas</p>

        {Object.entries(grouped).map(([fam, tools]) => {
          const fc = FAMILY_COLORS[fam] || { text: "text-white/60" };
          return (
            <section key={fam} className="mb-12">
              <h2 className={`font-display text-2xl mb-4 ${fc.text}`}>{fam}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tools.map((tool, i) => (
                  <button key={tool.id} onClick={() => setSelected(tool)}
                    className={`bg-[#161C27] border border-white/[0.08] rounded-2xl p-5 text-left flex flex-col justify-between group hover:border-white/[0.18] transition-all ${i === 0 ? "sm:col-span-2" : ""}`}>
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <FamilyBadge family={tool.family} />
                        {tool.free && <span className="text-[10px] bg-emerald-500/8 text-emerald-400/80 border border-emerald-500/15 px-1.5 py-0.5 rounded-full">Gratis</span>}
                      </div>
                      <h3 className={`font-display text-white group-hover:text-[#6B95E8] transition-colors mb-1.5 ${i === 0 ? "text-xl" : "text-lg"}`}>{tool.name}</h3>
                      <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{tool.desc}</p>
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {tool.labs.slice(0, 3).map(l => <span key={l} className="text-[10px] bg-[#3B6FD4]/8 text-[#3B6FD4]/55 px-1.5 py-0.5 rounded-full">{l}</span>)}
                        {tool.labs.length > 3 && <span className="text-[10px] text-white/25">+{tool.labs.length - 3}</span>}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-[#3B6FD4] group-hover:translate-x-0.5 transition-transform">Ver ficha →</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center text-white/30 py-16">
            <p className="text-lg mb-2">Sin resultados</p>
            <p className="text-sm">Prueba con otros filtros o términos de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
