import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { GLOSSARY } from "../data/glossary-data";

const TABS = ["FAQ", "Biblioteca", "Prompts", "Glosario", "Guías base", "Recursos"];

const FAQ_GROUPS = [
  { group: "General", items: [
    { q: "¿Qué es Horizon?", a: "Horizon es un centro interactivo en español para aprender a construir aplicaciones con inteligencia artificial. Está organizado en laboratorios temáticos por sector profesional, con benchmarks reales, herramientas probadas y una comunidad de proyectos." },
    { q: "¿Es gratuito?", a: "Sí. El acceso a contenidos, laboratorios, tutoriales y el foro es completamente gratuito." },
    { q: "¿En qué se diferencia Horizon de otros recursos de IA?", a: "Horizon no es un blog genérico de IA ni un directorio de herramientas. Es un espacio donde convergen benchmarks verificables, aprendizaje guiado por sector y comunidad de proyectos reales — todo en español." },
  ]},
  { group: "Laboratorios", items: [
    { q: "¿Qué incluye cada laboratorio?", a: "Cada laboratorio contiene: benchmarks del sector con datos concretos, fichas de herramientas recomendadas, casos prácticos de creación de apps con prompts incluidos, y aplicaciones ya existentes en el mercado." },
    { q: "¿Puedo contribuir con contenido a un laboratorio?", a: "Próximamente abriremos un proceso de contribución. Por ahora puedes publicar tu proyecto en el Foro de Proyectos y enlazar el laboratorio correspondiente." },
  ]},
  { group: "Herramientas", items: [
    { q: "¿Las fichas de herramientas son objetivas?", a: "Intentamos serlo. Las fichas incluyen explícitamente tanto lo que hace bien como sus limitaciones." },
    { q: "¿Cómo elegís qué herramientas incluir?", a: "Incluimos herramientas que tienen casos de uso documentados en al menos uno de los 8 laboratorios, con benchmarks o evidencia de uso real." },
  ]},
  { group: "Foro", items: [
    { q: "¿Qué tipo de proyectos puedo publicar?", a: "Cualquier proyecto que use IA de forma práctica y esté relacionado con uno de los 8 laboratorios." },
    { q: "¿Es necesario tener el código en GitHub?", a: "No es obligatorio, pero es muy recomendable. Un repositorio público hace que tu proyecto sea más útil para la comunidad." },
  ]},
  { group: "Taller", items: [
    { q: "¿Los prompts maestros funcionan con cualquier modelo?", a: "Están optimizados para GPT-4 y Claude 3.5 Sonnet. Con modelos más pequeños pueden necesitar ajustes." },
    { q: "¿Puedo adaptar los casos guiados a mi sector?", a: "Absolutamente — es el objetivo. Cada caso guiado está diseñado para ser un punto de partida que puedas adaptar a tu contexto real." },
  ]},
];

const LIBRARY_LABS = [
  { slug: "finanzas", label: "Finanzas", resources: ["Bloomberg GPT Paper (2023)", "FinBERT: Financial Sentiment Analysis", "OpenBB Terminal Docs", "CFA Institute — AI in Investment Management"] },
  { slug: "medicina", label: "Medicina", resources: ["Med-PaLM 2 Technical Report (Google)", "BioGPT: Generative Pre-trained Transformer", "Guidance on AI Medical Devices (FDA)", "Elicit — Systematic Reviews with LLMs"] },
  { slug: "derecho", label: "Derecho", resources: ["Harvey AI — Legal LLM Overview", "AI Act (texto completo — EUR-Lex)", "Luminance — Due Diligence AI", "Contratación pública y IA (Ministerio)"] },
  { slug: "diseno", label: "Diseño & UX", resources: ["Figma AI — Release Notes", "Attention Insight — Whitepaper", "WCAG 2.2 Guidelines", "Nielsen Norman Group — AI in UX Research"] },
  { slug: "contabilidad", label: "Contabilidad & ERP", resources: ["KPMG — IA en Auditoría y Contabilidad", "Sage AI Assistant Docs", "Fisco Digital — Automatización Tributaria", "ICAC — Marco normativo IA en auditoría"] },
  { slug: "ingenieria", label: "Ingeniería & Arquitectura", resources: ["Autodesk AI Research Papers", "ArchiCAD + AI Plugins Overview", "BuildingSmarter — IFC & BIM Standards", "McKinsey — IA en Construcción"] },
  { slug: "matematicas", label: "Matemáticas & Complejidad", resources: ["Wolfram Alpha API Docs", "SciPy Reference Guide", "MIT OpenCourseWare — Computational Science", "Lean Theorem Prover Documentation"] },
  { slug: "psicologia", label: "Psicología & Creatividad", resources: ["APA — Ethical Use of AI in Psychology", "Midjourney Research Blog", "Creative AI Lab — Oxford", "Journal of Creativity & AI Applications"] },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.08] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
        <span className="text-sm text-white/80">{item.q}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 text-white/30 transition-transform ${open ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6"/></svg>
      </button>
      {open && <div className="px-5 pb-5 border-t border-white/[0.06] pt-4"><p className="text-sm text-white/50 leading-relaxed">{item.a}</p></div>}
    </div>
  );
}

export default function Biblioteca() {
  const [activeTab, setActiveTab] = useState("FAQ");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGlossary = GLOSSARY.filter(g =>
    g.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.def.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <span className="text-[#3B6FD4] text-xs font-medium tracking-widest uppercase mb-3 block">Biblioteca</span>
        <h1 className="font-display text-4xl sm:text-5xl text-white mb-4">Recursos y Referencia</h1>
        <p className="text-white/50 max-w-2xl mb-8">FAQ, glosario técnico, bibliografía por laboratorio y guías de referencia.</p>

        {/* Banner Generador de Resumen Ejecutivo */}
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-[#3B6FD4]/10 via-[#3B6FD4]/05 to-white/[0.02] border border-[#3B6FD4]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#3B6FD4]/20 text-[#3B6FD4] font-medium">
                Herramienta de Negocio
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Gratuito con Gemini</span>
            </div>
            <h3 className="font-display text-base text-white font-medium">Generador de Resumen Ejecutivo con IA</h3>
            <p className="text-xs text-white/50 mt-0.5 max-w-xl">
              Responde a 10 preguntas y genera en segundos un memo estructurado de 500 palabras listo para presentar a inversores o socios.
            </p>
          </div>
          <Link
            to="/resumen-ejecutivo"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl bg-[#3B6FD4] text-white hover:bg-[#4A7DE0] transition-colors shrink-0 shadow-lg shadow-[#3B6FD4]/20"
          >
            Crear Resumen →
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 border-b border-white/[0.08] mb-8 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`font-mono text-xs uppercase tracking-wider px-5 py-3.5 border-b-2 -mb-px whitespace-nowrap transition-all ${activeTab === tab ? "border-[#3B6FD4] text-[#3B6FD4]" : "border-transparent text-white/40 hover:text-white/70"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ */}
        {activeTab === "FAQ" && (
          <div className="space-y-8">
            {FAQ_GROUPS.map(group => (
              <div key={group.group}>
                <h3 className="font-display text-xl text-white mb-4">{group.group}</h3>
                <div className="space-y-2">{group.items.map(item => <FaqItem key={item.q} item={item} />)}</div>
              </div>
            ))}
          </div>
        )}

        {/* Biblioteca */}
        {activeTab === "Biblioteca" && (
          <div className="space-y-8">
            {LIBRARY_LABS.map(lab => (
              <div key={lab.slug}>
                <h3 className="font-display text-xl text-white mb-3">{lab.label}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lab.resources.map(r => (
                    <div key={r} className="flex items-center gap-2 text-sm text-white/60 bg-[#161C27] border border-white/[0.08] rounded-lg px-4 py-3">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3B6FD4] shrink-0"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Prompts */}
        {activeTab === "Prompts" && (
          <div className="p-10 rounded-2xl bg-[#161C27] border border-white/[0.08] space-y-6 text-center max-w-2xl mx-auto shadow-2xl">
            <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center bg-[#3B6FD4]/10 text-[#3B6FD4] border border-[#3B6FD4]/30 shadow-lg">
              <Sparkles size={26} />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl text-white font-medium">Biblioteca Central de Prompts</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-lg mx-auto">
                Explora más de 220 prompts clasificados por Área Profesional, Tipo de App, Fase del Proyecto y Herramienta, con panel interactivo de personalización.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/biblioteca/prompts"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3B6FD4] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#4A7DE0] transition-colors shadow-lg shadow-[#3B6FD4]/20"
              >
                Abrir Biblioteca de Prompts →
              </Link>
            </div>
          </div>
        )}

        {/* Glosario */}
        {activeTab === "Glosario" && (
          <div>
            <div className="mb-6">
              <input type="text" placeholder="Buscar término..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="bg-[#161C27] border border-white/10 text-white text-sm rounded-sm px-4 py-2.5 w-full max-w-md placeholder:text-white/25 focus:outline-none focus:border-[#3B6FD4]/40" />
              <p className="text-white/25 text-xs mt-2">{filteredGlossary.length} términos</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredGlossary.map(g => (
                <div key={g.num} className="bg-[#161C27] border border-white/[0.08] rounded-xl p-5 hover:border-white/[0.15] transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] text-white/20 mt-0.5 shrink-0">{String(g.num).padStart(3, "0")}</span>
                    <div>
                      <h4 className="font-display text-base text-white mb-1">{g.term}</h4>
                      <p className="text-xs text-white/50 leading-relaxed mb-2">{g.def}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] bg-[#3B6FD4]/8 text-[#3B6FD4]/70 px-2 py-0.5 rounded">Ej: {g.example}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guías base */}
        {activeTab === "Guías base" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-[#161C27] border border-[#3B6FD4]/30 space-y-4 shadow-xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B6FD4]/10 text-[#3B6FD4] font-mono text-[10px] uppercase tracking-wider">
                Pilar Filosófico y Técnico
              </div>
              <h3 className="font-display text-2xl text-white">IA Responsable: Que No Alucine y Haga el Bien</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Guia filosofica y tecnica para construir con inteligencia artificial. Razonamiento aplicado, moral operativa, las 7 estrategias anti-alucinacion y los prompts maestros probados.
              </p>
              <div className="pt-2">
                <Link
                  to="/manifiesto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B6FD4] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#4A7DE0] transition-colors shadow-lg shadow-[#3B6FD4]/20"
                >
                  Leer Manifiesto Completo →
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#161C27] border border-white/[0.08] space-y-4 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] text-white/60 font-mono text-[10px] uppercase tracking-wider">
                Metodología de Desarrollo
              </div>
              <h3 className="font-display text-2xl text-white">Ciclo de Especificación PRD</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Aprende el flujo de 4 fases de Horizon (Alcance, Datos, Compliance y Entregables) con generadores automatizados de requerimientos técnicos y cálculo de esfuerzo.
              </p>
              <div className="pt-2">
                <Link
                  to="/resumen-ejecutivo"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-mono text-xs uppercase tracking-wider hover:bg-white/[0.1] transition-colors"
                >
                  Generar Resumen Ejecutivo →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recursos */}
        {activeTab === "Recursos" && (
          <div className="border border-white/[0.08] rounded-2xl p-8 text-center">
            <p className="text-white/30 text-lg mb-2">Próximamente</p>
            <p className="text-white/20 text-sm">Enlaces y recursos externos organizados por categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}
