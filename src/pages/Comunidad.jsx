import { Link } from "react-router-dom";

const FOROS = [
  {
    to: "/comunidad/aplicaciones",
    color: "#3B6FD4",
    label: "01",
    title: "Aplicaciones y Proyectos",
    desc: "Publica tu app, agente de IA, librería o herramienta. Comparte el código, el demo y el stack. La comunidad Horizon te da feedback real.",
    salas: ["Nuevas aplicaciones", "Actualizaciones de proyectos", "Feedback y mejora"],
    cta: "Ver proyectos",
  },
  {
    to: "/comunidad/profesionales",
    color: "#22c55e",
    label: "02",
    title: "Profesionales y Colaboraciones",
    desc: "Portal de expertos en programación, datos e IA. Publica tu perfil o busca colaboradores. El directorio filtra por habilidades, área y tarifa.",
    salas: ["Ofertas de servicios", "Búsqueda de colaboradores", "Presentaciones de perfil"],
    cta: "Ver perfiles",
  },
  {
    to: "/comunidad/debate",
    color: "#f59e0b",
    label: "03",
    title: "Foro General de Debate",
    desc: "Preguntas, reflexiones y debate abierto sobre IA, programación y datos. Sin jerarquías — solo ideas y conversaciones que avanzan.",
    salas: ["Preguntas sobre IA y programación", "Herramientas y benchmarks", "Debate y reflexiones"],
    cta: "Entrar al debate",
  },
];

export default function Comunidad() {
  useSEO({
    title: "Comunidad",
    description: "El lugar donde la IA se construye entre todos. Foros de proyectos, colaboraciones y debate abierto.",
    path: "/comunidad",
  });

  return (
    <div className="relative min-h-full pt-28 px-6">
      <div className="max-w-7xl mx-auto py-14 sm:py-20">
        <div className="mb-16 max-w-3xl">
          <span className="text-[#3B6FD4] text-xs font-medium tracking-widest uppercase mb-4 block">Comunidad · Horizon</span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-5">
            El lugar donde<br /><span className="text-[#6B95E8]">la IA se construye</span><br />entre todos.
          </h1>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl leading-relaxed">
            Tres espacios diferenciados para publicar proyectos, conectar con profesionales y debatir sobre el presente y futuro de la inteligencia artificial aplicada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {FOROS.map((foro) => (
            <Link key={foro.to} to={foro.to}
              className="group relative flex flex-col rounded-2xl border p-7 sm:p-8 transition-all duration-300 hover:scale-[1.01]"
              style={{ background: "rgba(22,28,39,0.85)", borderColor: foro.color + "30" }}>
              <span className="font-display text-7xl sm:text-8xl absolute top-5 right-6 leading-none pointer-events-none select-none" style={{ color: foro.color, opacity: 0.07 }}>
                {foro.label}
              </span>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 shrink-0" style={{ background: foro.color + "18" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={foro.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {foro.label === "01" && <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>}
                  {foro.label === "02" && <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>}
                  {foro.label === "03" && <><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/></>}
                </svg>
              </div>
              <h2 className="font-display text-2xl text-white mb-3 leading-tight group-hover:text-white transition-colors">{foro.title}</h2>
              <p className="text-white/45 text-sm leading-relaxed mb-6">{foro.desc}</p>
              <div className="flex flex-col gap-1.5 mb-7">
                {foro.salas.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-xs text-white/40">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: foro.color, opacity: 0.6 }} />
                    {s}
                  </div>
                ))}
              </div>
              <div className="mt-auto inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group-hover:gap-3" style={{ color: foro.color }}>
                {foro.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between border-t border-white/[0.08] pt-10">
          <p className="text-white/30 text-sm">La comunidad empieza vacía — cada publicación es tuya y de quienes vengan después.</p>
          <p className="text-white/20 text-xs font-mono">Horizon · Comunidad abierta</p>
        </div>
      </div>
    </div>
  );
}
