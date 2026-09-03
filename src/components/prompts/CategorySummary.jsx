import { Sparkles, Cpu, Layers, HelpCircle, CheckCircle } from "lucide-react";

export default function CategorySummary({
  title,
  desc,
  purpose,
  needs,
  promptCount = 0,
  recommendedModel = "Claude 3.7 Sonnet",
  areaColor = "#3B6FD4",
  mode = "type",
}) {
  if (!title) return null;

  return (
    <div
      className="p-6 rounded-2xl bg-[#161C27] border relative overflow-hidden transition-all shadow-lg"
      style={{ borderColor: `${areaColor}30` }}
    >
      {/* Decorative ambient glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none blur-3xl -mr-20 -mt-20"
        style={{ backgroundColor: areaColor }}
      />

      <div className="relative z-10 space-y-4">
        {/* Header with Title & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <span
              className="font-mono text-[10px] uppercase tracking-widest block mb-1"
              style={{ color: areaColor }}
            >
              {mode === "type"
                ? "Resumen de Categoria / Tipo de App"
                : mode === "phase"
                ? "Objetivo de la Fase"
                : "Especificacion de Herramienta o Tarea"}
            </span>
            <h3 className="font-display text-lg sm:text-xl text-white font-medium">
              {title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/70">
              {promptCount} {promptCount === 1 ? "prompt" : "prompts"}
            </span>
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-md border flex items-center gap-1.5"
              style={{
                backgroundColor: `${areaColor}15`,
                borderColor: `${areaColor}35`,
                color: "#ffffff",
              }}
            >
              <Cpu size={12} style={{ color: areaColor }} />
              <span>{recommendedModel}</span>
            </span>
          </div>
        </div>

        {/* 2-line Description */}
        <p className="text-sm text-white/80 leading-relaxed">
          {desc}
        </p>

        {/* 2 Columns: Para qué sirve / Necesitas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {purpose && (
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                Para que sirve
              </span>
              <p className="text-xs text-white/70 leading-relaxed">
                {purpose}
              </p>
            </div>
          )}

          {needs && (
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                Que necesitas
              </span>
              <p className="text-xs text-white/70 leading-relaxed">
                {needs}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
