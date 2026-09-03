import { useState } from "react";
import { Sparkles, Copy, Check, RefreshCw, Wand2, ArrowRight } from "lucide-react";

const AVAILABLE_TOOLS = [
  "Python",
  "DuckDB",
  "Pandas",
  "React",
  "Tailwind CSS",
  "FastAPI",
  "Pydantic v2",
  "SQLite",
  "Docker",
  "NumPy",
  "Flet",
];

export default function Personalizer({
  prompt,
  onCustomizedPromptGenerated,
  areaColor = "#3B6FD4",
}) {
  const [idea, setIdea] = useState("");
  const [experience, setExperience] = useState("intermedio");
  const [selectedTools, setSelectedTools] = useState(["Python", "DuckDB"]);
  const [extraContext, setExtraContext] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [personalizedPrompt, setPersonalizedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleTool = (tool) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    // Sintesis de prompt enriquecido
    setTimeout(() => {
      let base = prompt.prompt;

      // 1. Reemplazo del placeholder canonico
      const userIdeaText = idea.trim()
        ? `[CONTEXTO Y ESPECIFICACION DEL PROYECTO]:\n"${idea.trim()}"`
        : `[CONTEXTO DEL PROYECTO]: Idea preliminar para ${prompt.title}`;

      base = base.replace(/\[COPIA AQUI TU IDEA\]/g, userIdeaText);

      // 2. Inyeccion de directrices de nivel de experiencia y stack tecnologico
      const personalizationBlock = `\n\n[DIRECTRICES DE PERSONALIZACION APLICADA]:
- Nivel de experiencia del desarrollador: ${experience.toUpperCase()} (ajusta la profundidad tecnica y explica asunciones clave).
- Stack y herramientas activas del proyecto: ${selectedTools.join(", ") || "General"}.
${extraContext.trim() ? `- Restricciones o contexto adicional del usuario: ${extraContext.trim()}\n` : ""}- Prohibicion de usar emojis y obligacion de redactar las salidas en espanol riguroso.`;

      const finalPrompt = base + personalizationBlock;
      setPersonalizedPrompt(finalPrompt);
      setIsGenerating(false);

      if (onCustomizedPromptGenerated) {
        onCustomizedPromptGenerated(finalPrompt);
      }
    }, 300);
  };

  const handleCopy = () => {
    if (!personalizedPrompt) return;
    navigator.clipboard.writeText(personalizedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl bg-[#161C27] border border-white/[0.08] space-y-6">
      <div className="border-b border-white/[0.06] pb-3">
        <span
          className="font-mono text-[10px] uppercase tracking-widest block mb-1"
          style={{ color: areaColor }}
        >
          Taller de Personalizacion
        </span>
        <h3 className="font-display text-lg text-white font-medium">
          Adapta este prompt a tu proyecto
        </h3>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        {/* Campo 1: Tu idea o proyecto */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
            Tu idea o proyecto *
          </label>
          <textarea
            rows={3}
            required
            placeholder="Describe que quieres que haga tu app (reemplazara [COPIA AQUI TU IDEA])..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#3B6FD4] resize-none leading-relaxed"
          />
        </div>

        {/* Campo 2: Nivel de experiencia */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
            Tu nivel de experiencia
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full bg-[#1A2232] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3B6FD4]"
          >
            <option value="principiante">Principiante (explicaciones guiadas paso a paso)</option>
            <option value="intermedio">Intermedio (balance entre codigo y arquitectura)</option>
            <option value="avanzado">Avanzado (maxima concision, esquemas y codigo directo)</option>
          </select>
        </div>

        {/* Campo 3: Herramientas que usas */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
            Herramientas que usas en tu stack
          </label>
          <div className="flex flex-wrap gap-1.5">
            {AVAILABLE_TOOLS.map((tool) => {
              const isSelected = selectedTools.includes(tool);
              return (
                <button
                  type="button"
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                    isSelected
                      ? "bg-white/10 text-white border-white/20 font-medium"
                      : "bg-white/[0.02] text-white/40 border-white/[0.05] hover:text-white/70"
                  }`}
                  style={isSelected ? { borderColor: `${areaColor}50`, color: "#ffffff" } : {}}
                >
                  {tool}
                </button>
              );
            })}
          </div>
        </div>

        {/* Campo 4: Contexto adicional */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
            Contexto adicional o restricciones
          </label>
          <textarea
            rows={2}
            placeholder="Ej: Quiero que funcione 100% offline con DuckDB, sin dependencias de cloud..."
            value={extraContext}
            onChange={(e) => setExtraContext(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-[#3B6FD4] resize-none leading-relaxed"
          />
        </div>

        {/* Boton generar */}
        <button
          type="submit"
          disabled={!idea.trim() || isGenerating}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3B6FD4] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#4A7DE0] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-md"
          style={{ backgroundColor: areaColor }}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={14} className="animate-spin" /> Personalizando...
            </>
          ) : (
            <>
              <Wand2 size={14} /> Generar Prompt Personalizado
            </>
          )}
        </button>
      </form>

      {/* Resultado Personalizado */}
      {personalizedPrompt && (
        <div className="pt-4 border-t border-white/[0.08] space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-medium">
              Prompt Personalizado Listo
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.08] transition-colors"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-white/[0.05] text-xs font-mono text-white/80 max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {personalizedPrompt}
          </div>
        </div>
      )}
    </div>
  );
}
