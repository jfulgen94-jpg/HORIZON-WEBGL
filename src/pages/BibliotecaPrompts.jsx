import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import {
  ArrowLeft,
  Copy,
  Check,
  Search as SearchIcon,
  Sparkles,
  TrendingUp,
  HeartPulse,
  Scale,
  Calculator,
  Sigma,
  Cpu,
  Palette,
  Brain,
  Lightbulb,
  Search,
  Layout,
  Code,
  CheckCircle2,
  Rocket,
  ChevronRight,
  Filter,
  Tag
} from "lucide-react";
import {
  PROMPT_AREAS,
  PROJECT_PHASES,
  TOTAL_PROMPTS,
  loadAreaPrompts,
  loadAllPrompts,
  getPromptsByArea,
  searchPrompts
} from "../data/prompts-data";

// Mapa de iconos de areas
const AREA_ICONS = {
  finanzas: TrendingUp,
  medicina: HeartPulse,
  derecho: Scale,
  contabilidad: Calculator,
  matematicas: Sigma,
  ingenieria: Cpu,
  diseno: Palette,
  psicologia: Brain,
};

// Mapa de iconos de fases
const PHASE_ICONS = {
  "idea-y-planificacion": Lightbulb,
  investigacion: Search,
  diseno: Layout,
  desarrollo: Code,
  pruebas: CheckCircle2,
  lanzamiento: Rocket,
};

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handle}
      className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all"
      style={{
        borderColor: copied ? "#10B981" : "rgba(255,255,255,0.12)",
        backgroundColor: copied ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.03)",
        color: copied ? "#10B981" : "rgba(255,255,255,0.7)",
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copiado" : "Copiar Prompt"}
    </button>
  );
}

export default function BibliotecaPrompts() {
  useSEO({
    title: "Prompts Ejecutivos",
    description: "440+ prompts técnicos verificados por área profesional. Busca, filtra y copia prompts listos para usar.",
    path: "/biblioteca/prompts",
  });

  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentArea = useMemo(() => {
    return PROMPT_AREAS.find((a) => a.id === selectedAreaId) || null;
  }, [selectedAreaId]);

  const currentCategory = useMemo(() => {
    if (!currentArea || !selectedCategoryId) return null;
    return currentArea.categories.find((c) => c.id === selectedCategoryId) || null;
  }, [currentArea, selectedCategoryId]);

  // Estado de carga perezosa de los datos de prompts (S1-08)
  const [loadingPrompts, setLoadingPrompts] = useState(false);
  const loadedAreasRef = useRef(new Set());
  const catalogLoadedRef = useRef(false);

  useEffect(() => {
    const needArea = currentArea && !loadedAreasRef.current.has(currentArea.id);
    const needAll =
      !currentArea && (searchQuery.trim() || selectedPhase) && !catalogLoadedRef.current;
    if (!needArea && !needAll) return;
    let cancelled = false;
    setLoadingPrompts(true);
    (async () => {
      try {
        if (needArea) {
          await loadAreaPrompts(currentArea.id);
          if (!cancelled) loadedAreasRef.current.add(currentArea.id);
        }
        if (needAll) {
          await loadAllPrompts();
          if (!cancelled) catalogLoadedRef.current = true;
        }
      } finally {
        if (!cancelled) setLoadingPrompts(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentArea, searchQuery, selectedPhase]);

  // Prompts a mostrar según la vista actual
  const displayedPrompts = useMemo(() => {
    if (loadingPrompts) return [];
    if (!currentArea) {
      if (!searchQuery.trim() && !selectedPhase) return [];
      return searchPrompts(searchQuery, { phase: selectedPhase });
    }

    let areaPrompts = getPromptsByArea(currentArea.id);

    if (selectedCategoryId) {
      areaPrompts = areaPrompts.filter((p) => p.categoryId === selectedCategoryId);
    }

    if (selectedPhase) {
      areaPrompts = areaPrompts.filter((p) => p.phase === selectedPhase);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      areaPrompts = areaPrompts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.prompt.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return areaPrompts;
  }, [currentArea, selectedCategoryId, selectedPhase, searchQuery, loadingPrompts]);

  const allPromptsTotal = TOTAL_PROMPTS;

  return (
    <div className="pt-28 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Navegación y Cabecera */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/biblioteca"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 hover:text-[#3B6FD4] transition-colors"
          >
            <ArrowLeft size={14} /> Volver a Biblioteca
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 text-[#3B6FD4] text-xs font-mono">
            <Sparkles size={12} />
            <span>{allPromptsTotal} Prompts Verificados</span>
          </div>
        </div>

        <span className="text-[#3B6FD4] text-xs font-medium tracking-widest uppercase mb-2 block">
          Catálogo Técnico Oficial
        </span>
        <h1 className="font-display text-3xl sm:text-4xl text-white mb-3">
          Biblioteca Modular de Prompts
        </h1>
        <p className="text-white/60 text-sm mb-8 max-w-2xl leading-relaxed">
          Prompts profesionales calibrados para Gemini 2.5 Flash, Claude 3.7 Sonnet, GPT-4o, Llama 3.3 y DeepSeek V4.
          Optimizados para las 6 fases del ciclo de desarrollo de software.
        </p>

        {/* Barra de Búsqueda y Selector de Fases */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <SearchIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              placeholder="Buscar por tecnología, técnica, ratio, modelo o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161C27] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#3B6FD4] transition-colors"
            />
          </div>

          {/* Filtro de Fases (0 Emojis, Iconos Lucide) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
              <Filter size={12} /> Fase:
            </span>
            <button
              onClick={() => setSelectedPhase(null)}
              className={`shrink-0 text-xs px-3.5 py-1.5 rounded-lg border font-mono transition-colors ${
                selectedPhase === null
                  ? "border-[#3B6FD4] text-[#3B6FD4] bg-[#3B6FD4]/10"
                  : "border-white/[0.08] text-white/50 hover:border-white/20"
              }`}
            >
              Todas las fases
            </button>
            {PROJECT_PHASES.map((p) => {
              const PhaseIcon = PHASE_ICONS[p.id] || Sparkles;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPhase(selectedPhase === p.id ? null : p.id)}
                  className={`shrink-0 text-xs px-3.5 py-1.5 rounded-lg border font-mono flex items-center gap-2 transition-colors ${
                    selectedPhase === p.id
                      ? "border-[#3B6FD4] text-[#3B6FD4] bg-[#3B6FD4]/10"
                      : "border-white/[0.08] text-white/50 hover:border-white/20"
                  }`}
                >
                  <PhaseIcon size={12} />
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vista 1: Selector de Áreas Temáticas (si no hay área seleccionada y no se busca globalmente) */}
        {!selectedAreaId && !searchQuery.trim() && !selectedPhase && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROMPT_AREAS.map((area) => {
              const AreaIcon = AREA_ICONS[area.id] || Sparkles;
              const promptCount = area.promptCount;
              return (
                <button
                  key={area.id}
                  onClick={() => setSelectedAreaId(area.id)}
                  className="text-left p-5 rounded-2xl border border-white/[0.08] bg-[#161C27] hover:border-[#3B6FD4]/40 hover:bg-[#1A2230] transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${area.color}15`, color: area.color }}
                    >
                      <AreaIcon size={20} />
                    </div>
                    <h3 className="text-base text-white font-medium mb-1">{area.name}</h3>
                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mb-4">
                      {area.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs font-mono text-white/40">
                    <span>{promptCount} prompts</span>
                    <span className="text-[#3B6FD4] group-hover:translate-x-1 transition-transform">
                      Ver área →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Vista 2: Navegación dentro de un Área Temática */}
        {selectedAreaId && currentArea && (
          <div className="space-y-6">
            {/* Breadcrumb del Área */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#161C27] border border-white/[0.08]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedAreaId(null);
                    setSelectedCategoryId(null);
                  }}
                  className="text-xs font-mono text-white/50 hover:text-white transition-colors"
                >
                  ← Todas las áreas
                </button>
                <span className="text-white/20">/</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                    style={{ backgroundColor: `${currentArea.color}20`, color: currentArea.color }}
                  >
                    {(() => {
                      const Icon = AREA_ICONS[currentArea.id] || Sparkles;
                      return <Icon size={14} />;
                    })()}
                  </div>
                  <span className="text-sm font-medium text-white">{currentArea.name}</span>
                </div>
                {currentCategory && (
                  <>
                    <span className="text-white/20">/</span>
                    <span className="text-sm text-white/70">{currentCategory.name}</span>
                  </>
                )}
              </div>
              <span className="text-xs font-mono text-white/40">
                {displayedPrompts.length} prompts encontrados
              </span>
            </div>

            {/* Categorías como Pestañas de Filtro Rápido */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`shrink-0 text-xs px-3.5 py-2 rounded-xl border font-mono transition-colors ${
                  selectedCategoryId === null
                    ? "border-[#3B6FD4] text-[#3B6FD4] bg-[#3B6FD4]/10"
                    : "border-white/[0.08] text-white/60 hover:border-white/20"
                }`}
              >
                Todas las categorías ({getPromptsByArea(currentArea.id).length})
              </button>
              {currentArea.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategoryId(selectedCategoryId === cat.id ? null : cat.id)
                  }
                  className={`shrink-0 text-xs px-3.5 py-2 rounded-xl border font-mono transition-colors ${
                    selectedCategoryId === cat.id
                      ? "border-[#3B6FD4] text-[#3B6FD4] bg-[#3B6FD4]/10"
                      : "border-white/[0.08] text-white/60 hover:border-white/20"
                  }`}
                >
                  {cat.name} ({cat.prompts.length})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Listado de Prompts Reales */}
        {(selectedAreaId || searchQuery.trim() || selectedPhase) && (
          <div className="mt-8 space-y-4">
            {loadingPrompts ? (
              <div className="p-12 text-center rounded-2xl bg-[#161C27] border border-white/[0.08] space-y-3">
                <Sparkles size={32} className="mx-auto text-[#3B6FD4] animate-pulse" />
                <h3 className="text-base text-white font-medium">Cargando prompts…</h3>
                <p className="text-xs text-white/50 max-w-md mx-auto">
                  Los prompts de esta área se descargan bajo demanda para mantener ligera la
                  biblioteca.
                </p>
              </div>
            ) : displayedPrompts.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#161C27] border border-white/[0.08] space-y-3">
                <Search size={32} className="mx-auto text-white/30" />
                <h3 className="text-base text-white font-medium">No se encontraron prompts</h3>
                <p className="text-xs text-white/50 max-w-md mx-auto">
                  Prueba a ajustar los términos de búsqueda, la categoría o la fase seleccionada.
                </p>
              </div>
            ) : (
              displayedPrompts.map((item) => {
                const PhaseIcon = PHASE_ICONS[item.phase] || Sparkles;
                return (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl border border-white/[0.08] bg-[#161C27] hover:border-white/[0.16] transition-all space-y-4"
                  >
                    {/* Fila Superior: Metadatos y Botón de Copiado */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#3B6FD4]/15 text-[#3B6FD4]">
                          {item.id}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.05] text-white/70">
                          {item.model || "Claude 3.7 Sonnet"}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.05] text-white/50 flex items-center gap-1">
                          <PhaseIcon size={11} />
                          {item.phase || "desarrollo"}
                        </span>
                        {item.categoryName && (
                          <span className="text-xs text-white/40 hidden md:inline">
                            · {item.categoryName}
                          </span>
                        )}
                      </div>
                      <CopyBtn text={item.prompt} />
                    </div>

                    {/* Título y Descripción */}
                    <div>
                      <h3 className="text-base font-medium text-white mb-1.5">{item.title}</h3>
                      <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Cuerpo del Prompt */}
                    <div className="bg-[#0D1117] border border-white/[0.06] rounded-xl p-4 text-xs font-mono text-white/80 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                      {item.prompt}
                    </div>

                    {/* Etiquetas */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <Tag size={11} className="text-white/30 mr-1" />
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-white/50"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
