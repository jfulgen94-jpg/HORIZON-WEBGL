import { useState } from "react";
import { Copy, Check, ChevronRight, Cpu, Star, Sparkles } from "lucide-react";

export default function PromptCard({
  prompt,
  isSelected = false,
  onSelect,
  areaColor = "#3B6FD4",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColors = {
    principiante: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    intermedio: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    avanzado: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  const difficultyLabel = {
    principiante: "Principiante",
    intermedio: "Intermedio",
    avanzado: "Avanzado",
  };

  return (
    <div
      onClick={() => onSelect && onSelect(prompt)}
      className={`p-5 rounded-2xl border transition-all cursor-pointer relative group ${
        isSelected
          ? "bg-[#1A2232] border-white/30 shadow-xl ring-1 ring-white/20"
          : "bg-[#161C27] border-white/[0.08] hover:border-white/[0.18] hover:bg-[#18202D]"
      }`}
    >
      {/* Top indicator line if selected */}
      {isSelected && (
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ backgroundColor: areaColor }}
        />
      )}

      <div className="space-y-3">
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
              {prompt.id}
            </span>
            <span
              className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                difficultyColors[prompt.difficulty] || difficultyColors.intermedio
              }`}
            >
              {difficultyLabel[prompt.difficulty] || "Intermedio"}
            </span>
            {prompt.popular && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Star size={10} className="fill-amber-400" /> Popular
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            title="Copiar prompt rapido"
            className="p-1.5 rounded-lg border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
        </div>

        {/* Title */}
        <h4 className="font-display text-base text-white font-medium group-hover:text-white transition-colors leading-snug">
          {prompt.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
          {prompt.desc}
        </p>

        {/* Footer with Model & Tags */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
          <div className="flex items-center gap-1.5 text-xs text-white/40 font-mono">
            <Cpu size={12} style={{ color: areaColor }} />
            <span className="truncate max-w-[150px]">{prompt.model}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-white/50 group-hover:text-white font-mono transition-colors">
            <span className="text-[11px] uppercase tracking-wider">Detalle</span>
            <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
