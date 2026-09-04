import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";

const SECTIONS = [
  { id: "titular", label: "1. Datos del titular" },
  { id: "objeto", label: "2. Objeto del sitio" },
  { id: "propiedad", label: "3. Propiedad intelectual" },
  { id: "uso", label: "4. Uso permitido" },
  { id: "enlaces", label: "5. Enlaces a terceros" },
  { id: "responsabilidad", label: "6. Responsabilidad" },
  { id: "legislacion", label: "7. Legislación aplicable" },
  { id: "modificaciones", label: "8. Modificaciones" },
];

export default function AvisoLegal() {
  return (
    <div className="relative min-h-screen pb-24" data-od-id="aviso-legal-page">
      <section className="pt-32 pb-12 px-6 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-white/50 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Volver al inicio
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3B6FD4]/10 border border-[#3B6FD4]/30 text-[#3B6FD4] font-mono text-[11px] uppercase tracking-widest mb-6">
            <FileText size={14} />
            Borrador pendiente de revisión jurídica profesional
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F3F4F8] leading-tight mb-4 tracking-tight">
            Aviso Legal
          </h1>
          <p className="text-lg text-[#9BA3B8] font-light max-w-3xl leading-relaxed">
            Identidad del titular y condiciones generales del sitio. Este texto es un
            borrador editorial.
          </p>
          <p className="font-mono text-xs text-white/40 mt-4">
            Fecha de última actualización: [FECHA PENDIENTE]
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 bg-[#161C27]/80 backdrop-blur border border-white/[0.08] rounded-2xl p-6 space-y-2">
              <span className="block font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">
                Índice
              </span>
              <nav aria-label="Índice del aviso legal" className="space-y-1.5 font-mono text-xs">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="lg:col-span-9 space-y-8 text-white/70 leading-relaxed">
            <section id="titular" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">1. Datos del titular</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li><strong className="text-white">Denominación:</strong> Horizon – El Taller del Código</li>
                <li><strong className="text-white">Titular:</strong> Jose Fulgencio Molina Garcia</li>
                <li><strong className="text-white">NIF:</strong> 48646521-A</li>
                <li><strong className="text-white">Email de contacto:</strong> [DATOS DEL RESPONSABLE PENDIENTES — introducir email de contacto]</li>
              </ul>
            </section>

            <section id="objeto" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">2. Objeto del sitio</h2>
              <p className="text-sm sm:text-base">Este sitio web tiene por objeto proporcionar acceso público a contenido educativo y divulgativo sobre inteligencia artificial, incluyendo:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>Ocho laboratorios sectoriales temáticos</li>
                <li>Herramientas de exploración y referencia</li>
                <li>Biblioteca de prompts organizados por sector</li>
                <li>Taller de codificación interactivo</li>
                <li>Generador de resúmenes ejecutivos mediante inteligencia artificial</li>
                <li>Sección de comunidad con foros de debate y proyectos</li>
              </ul>
              <p className="text-sm sm:text-base">El Sitio tiene carácter meramente informativo y divulgativo. No constituye asesoramiento profesional de ningún tipo.</p>
            </section>

            <section id="propiedad" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">3. Propiedad intelectual</h2>
              <p className="text-sm sm:text-base">El contenido del Sitio —textos, imágenes, gráficos, logos, iconos, código fuente, diseño, estructura y selección de los mismos— está protegido por la legislación española e internacional sobre propiedad intelectual e industrial.</p>
              <p className="text-sm sm:text-base">Queda prohibida su reproducción, distribución, comunicación pública, transformación o cualquier otro uso sin autorización expresa del titular, salvo que la ley establezca lo contrario.</p>
              <p className="text-sm sm:text-base">Podrás enlazar páginas del Sitio siempre que no alteres el contenido original, atribuyas claramente la autoría y no infieras relación, patrocinio o respaldo inexistente.</p>
            </section>

            <section id="uso" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">4. Uso permitido</h2>
              <p className="text-sm sm:text-base">Te comprometes a utilizar el Sitio conforme a la ley, la moral, las buenas costumbres y el presente Aviso Legal. Queda expresamente prohibido:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>Utilizar el Sitio con fines ilícitos, lesivos o contrarios a la buena fe.</li>
                <li>Introducir virus, malware o cualquier código dañino.</li>
                <li>Intentar acceder sin autorización a áreas restringidas, servidores o bases de datos.</li>
                <li>Utilizar robots, scrapers o sistemas automatizados de extracción de contenido.</li>
                <li>Suplantar la identidad de terceros.</li>
                <li>Realizar actividades publicitarias o de spam.</li>
              </ul>
            </section>

            <section id="enlaces" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">5. Enlaces a terceros</h2>
              <p className="text-sm sm:text-base">El Sitio puede contener enlaces a páginas web de terceros. El titular no ejerce control sobre su contenido, políticas de privacidad o prácticas, y no asume responsabilidad por ellos. Su existencia no implica aprobación, patrocinio ni relación con sus titulares.</p>
            </section>

            <section id="responsabilidad" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">6. Responsabilidad</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>No se garantiza la exactitud, completitud ni actualidad de la información.</li>
                <li>El titular no responde de daños directos o indirectos derivados del uso del Sitio.</li>
                <li>El titular no responde de decisiones tomadas basándose en la información del Sitio.</li>
                <li>El servicio de generación de resúmenes mediante IA proporciona resultados orientativos; no sustituye tu criterio profesional.</li>
              </ul>
              <p className="text-sm sm:text-base">El Sitio se proporciona “tal cual”, sin garantías de ningún tipo, expresas o implícitas.</p>
            </section>

            <section id="legislacion" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">7. Legislación aplicable</h2>
              <p className="text-sm sm:text-base">El presente Aviso Legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de [DATOS DEL RESPONSABLE PENDIENTES — ciudad del titular], con renuncia expresa a cualquier otro fuero que pudiera corresponder.</p>
            </section>

            <section id="modificaciones" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">8. Modificaciones</h2>
              <p className="text-sm sm:text-base">El titular podrá modificar el presente Aviso Legal en cualquier momento. Se recomienda revisarlo periódicamente. El uso continuado del Sitio tras las modificaciones implicará su aceptación.</p>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE REVISIÓN JURÍDICA PROFESIONAL] — Este borrador no constituye asesoramiento jurídico.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/terminos" className="font-mono text-xs text-[#3B6FD4] hover:underline">Ver Términos de Uso →</Link>
                <Link to="/privacidad" className="font-mono text-xs text-[#3B6FD4] hover:underline">Ver Privacidad →</Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
