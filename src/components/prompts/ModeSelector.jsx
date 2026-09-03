import { Layers, GitBranch, Wrench } from "lucide-react";

export const PROMPT_MODES = [
  {
    id: "type",
    label: "Por Tipo de App",
    shortLabel: "Tipo de App",
    icon: Layers,
    desc: "Agrupa prompts segun que solucion o producto quieres construir.",
  },
  {
    id: "phase",
    label: "Por Fase del Proyecto",
    shortLabel: "Fase",
    icon: GitBranch,
    desc: "Organiza prompts segun en que momento de desarrollo te encuentras.",
  },
  {
    id: "tool",
    label: "Por Herramienta o Tarea",
    shortLabel: "Herramienta",
    icon: Wrench,
    desc: "Enfoca prompts en librerias, APIs o utilidades tecnicas especificas.",
  },
];

export default function ModeSelector({ activeMode, onModeChange, areaColor = "#3B6FD4" }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2">
      <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/50">
        <span>Modo de clasificacion:</span>
      </div>

      <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] gap-1">
        {PROMPT_MODES.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-white/10 text-white shadow-sm border border-white/10"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04]"
              }`}
              style={isActive ? { borderColor: `${areaColor}40`, color: "#ffffff" } : {}}
              title={mode.desc}
            >
              <Icon size={14} style={isActive ? { color: areaColor } : {}} />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
