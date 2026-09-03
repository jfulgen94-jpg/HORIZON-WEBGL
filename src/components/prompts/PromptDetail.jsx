import { useState } from "react";
import { Copy, Check, Cpu, X, Tag, Star, ArrowLeft } from "lucide-react";
import Personalizer from "./Personalizer";

export default function PromptDetail({
  prompt,
  onClose,
  areaColor = "#3B6FD4",
  onTagClick,
}) {
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const handleCopyBase = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Divide el texto para resaltar visualmente el placeholder canonico
  const parts = prompt.prompt.split("[COPIA AQUI TU IDEA]");

  return (
    <div className="space-y-6 animate-fade-in" data-od-id="prompt-detail-view">
      {/* Barra superior con volver y cerrar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Volver a la lista de prompts
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
          title="Cerrar detalle"
        >
          <X size={15} />
        </button>
      </div>

      {/* Grid 60% / 40% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* PANEL IZQUIERDO (60% -> 7 columnas) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#161C27] border border-white/[0.08] space-y-5">
          {/* Cabecera */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                {prompt.id}
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: `${areaColor}15`,
                  borderColor: `${areaColor}35`,
                  color: "#ffffff",
                }}
              >
                {prompt.categoryName || prompt.categoryId}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-white/60 border border-white/[0.08]">
                {prompt.phase}
              </span>
            </div>

            <h2 className="font-display text-2xl text-white font-medium mb-3">
              {prompt.title}
            </h2>

            <p className="text-sm text-white/60 leading-relaxed">
              {prompt.desc}
            </p>
          </div>

          {/* Modelo recomendado & Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.04]">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-white/40">Modelo recomendado:</span>
              <span
                className="px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-medium text-white"
                style={{
                  backgroundColor: `${areaColor}15`,
                  borderColor: `${areaColor}40`,
                }}
              >
                <Cpu size={13} style={{ color: areaColor }} />
                {prompt.model}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {prompt.tags?.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => onTagClick && onTagClick(t)}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.06] text-white/50 hover:text-white hover:border-white/20 transition-colors"
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>

          {/* Texto Completo del Prompt */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-white/60">
                Texto del Prompt Base
              </span>
              <button
                type="button"
                onClick={handleCopyBase}
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.08] transition-colors"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                {copied ? "Copiado" : "Copiar Prompt"}
              </button>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/[0.06] text-xs sm:text-sm font-mono text-white/80 leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {parts[0]}
              {parts.length > 1 && (
                <>
                  <span
                    className="inline-block px-2 py-0.5 mx-1 rounded border font-semibold tracking-wide"
                    style={{
                      backgroundColor: "rgba(245, 158, 11, 0.15)",
                      borderColor: "rgba(245, 158, 11, 0.4)",
                      color: "#FBBF24",
                    }}
                  >
                    [COPIA AQUI TU IDEA]
                  </span>
                  {parts.slice(1).join("[COPIA AQUI TU IDEA]")}
                </>
              )}
            </div>
          </div>
        </div>

        {/* PANEL DERECHO (40% -> 5 columnas) */}
        <div className="lg:col-span-5 sticky top-24">
          <Personalizer prompt={prompt} areaColor={areaColor} />
        </div>
      </div>
    </div>
  );
}
