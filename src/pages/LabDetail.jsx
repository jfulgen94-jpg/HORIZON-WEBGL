import { useParams, Link } from "react-router-dom";
import { getLabBySlug } from "../data/labs-data";
import TabSystem from "../components/TabSystem";
import clsx from "clsx";

export default function LabDetail() {
  const { slug } = useParams();
  const lab = getLabBySlug(slug);

  if (!lab) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="font-display text-3xl text-white mb-4">Laboratorio no encontrado</h1>
        <Link to="/areas" className="text-[#3B6FD4] font-mono text-sm">Volver a Áreas</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6" data-od-id={`lab-${lab.id}`}>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/30 mb-8">
          <Link to="/areas" className="hover:text-white/60 transition-colors">Laboratorios</Link>
          <span>/</span>
          <span style={{ color: lab.color }}>{lab.name}</span>
        </nav>

        {/* Hero */}
        <div className="flex items-start gap-6 mb-12" data-od-id="lab-hero">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-2xl border shrink-0"
            style={{ background: lab.colorDim, borderColor: `${lab.color}30`, color: lab.color }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1">
              Laboratorio {lab.num}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-white mb-2">{lab.name}</h1>
            <p className="text-white/40 max-w-xl">{lab.fullDesc}</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4 mb-12" data-od-id="lab-kpis">
          {[
            { label: "Proyectos", value: lab.metrics.projects },
            { label: "Benchmarks", value: lab.metrics.benchmarks },
            { label: "Herramientas", value: lab.metrics.tools },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-white/[0.06] bg-[#161C27] p-5"
            >
              <span className="block font-mono text-3xl text-white mb-1">{kpi.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">{kpi.label}</span>
            </div>
          ))}
        </div>

        {/* Tab System */}
        <TabSystem
          tabs={[
            { id: "proyectos", label: "Proyectos" },
            { id: "benchmarks", label: "Benchmarks" },
            { id: "herramientas", label: "Herramientas" },
            { id: "recursos", label: "Recursos" },
          ]}
          accent={lab.color}
        >
          <div data-tab-id="proyectos">
            <div className="grid gap-4">
              {lab.projects?.length > 0 ? (
                lab.projects.map((proj) => (
                  <div
                    key={proj.name}
                    className="rounded-xl border border-white/[0.06] bg-[#161C27] p-6 hover:border-white/[0.12] transition-colors"
                  >
                    <h3 className="font-display text-xl text-white mb-2">{proj.name}</h3>
                    <p className="text-white/40 text-sm mb-4">{proj.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border"
                          style={{ color: lab.color, background: lab.colorDim, borderColor: `${lab.color}20` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/30 text-sm py-8 text-center">
                  Proyectos en desarrollo. Vuelve pronto.
                </p>
              )}
            </div>
          </div>
          <div data-tab-id="benchmarks">
            <p className="text-white/30 text-sm py-8 text-center">
              Benchmarks del laboratorio. Próximamente con datos reales.
            </p>
          </div>
          <div data-tab-id="herramientas">
            <p className="text-white/30 text-sm py-8 text-center">
              Herramientas disponibles. Catálogo en progreso.
            </p>
          </div>
          <div data-tab-id="recursos">
            <p className="text-white/30 text-sm py-8 text-center">
              Recursos y documentación. Próximamente.
            </p>
          </div>
        </TabSystem>
      </div>
    </div>
  );
}
