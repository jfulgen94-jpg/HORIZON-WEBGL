import { Link } from "react-router-dom";

const STEPS = [
  {
    num: "01",
    title: "Descarga tu IDE",
    desc: "Elige VS Code, Cursor, Cline, Windsurf o Sourcegraph Cody.",
    color: "#3B6FD4",
  },
  {
    num: "02",
    title: "Instala Python",
    desc: "Necesario para los laboratorios. Python 3.10+ recomendado.",
    color: "#10B981",
  },
  {
    num: "03",
    title: "Configura extensiones",
    desc: "Instala las extensiones IA recomendadas para tu IDE.",
    color: "#6366F1",
  },
  {
    num: "04",
    title: "Conecta con Horizon",
    desc: "Elige un laboratorio y empieza a construir con prompts de la biblioteca.",
    color: "#F97316",
  },
];

export default function QuickStartGuide() {
  return (
    <div className="p-6 rounded-2xl bg-[#10141D] border border-white/[0.08] backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B6FD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <h3 className="font-display text-xl text-[#F3F4F8]">Cómo empezar</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((step, i) => (
          <div key={step.num} className="relative">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="font-mono text-2xl font-bold"
                style={{ color: step.color, opacity: 0.3 }}
              >
                {step.num}
              </span>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-4 left-10 w-full h-px bg-white/[0.06]" />
              )}
            </div>
            <h4 className="text-sm font-medium text-[#F3F4F8] mb-1">{step.title}</h4>
            <p className="text-xs text-[#9BA3B8] leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/[0.06]">
        <Link
          to="/herramientas"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#3B6FD4] hover:text-[#6B95E8] transition-colors"
        >
          Ver catálogo de herramientas
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
