import { Link } from "react-router-dom";
import { Scale, ArrowLeft } from "lucide-react";

const SECTIONS = [
  { id: "aceptacion", label: "1. Aceptación" },
  { id: "descripcion", label: "2. Descripción del servicio" },
  { id: "naturaleza", label: "3. Naturaleza del servicio" },
  { id: "conducta", label: "4. Conducta del usuario" },
  { id: "contenido-usuarios", label: "5. Contenido de usuarios" },
  { id: "moderacion", label: "6. Moderación" },
  { id: "propiedad", label: "7. Propiedad intelectual" },
  { id: "enlaces", label: "8. Enlaces a terceros" },
  { id: "uso-ia", label: "9. Uso indebido de IA" },
  { id: "limitaciones", label: "10. Limitaciones" },
  { id: "disponibilidad", label: "11. Disponibilidad" },
  { id: "modificaciones", label: "12. Modificaciones" },
  { id: "legislacion", label: "13. Legislación aplicable" },
  { id: "contacto", label: "14. Contacto" },
];

function Card({ id, children }) {
  return (
    <section id={id} className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
      {children}
    </section>
  );
}

export default function Terminos() {
  useSEO({
    title: "Términos de Servicio",
    description: "Condiciones de uso del sitio: conducta del usuario, propiedad intelectual, moderación y limitaciones.",
    path: "/terminos",
  });

  return (
    <div className="relative min-h-screen pb-24" data-od-id="terminos-page">
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
            <Scale size={14} />
            Borrador pendiente de revisión jurídica profesional
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F3F4F8] leading-tight mb-4 tracking-tight">
            Términos de Uso
          </h1>
          <p className="text-lg text-[#9BA3B8] font-light max-w-3xl leading-relaxed">
            Condiciones de uso de Horizon – El Taller del Código. Plataforma educativa y
            divulgativa, gratuita y de acceso público. Este texto es un borrador editorial.
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
              <nav aria-label="Índice de los términos de uso" className="space-y-1.5 font-mono text-xs">
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
            <Card id="aceptacion">
              <h2 className="font-display text-2xl text-white">1. Aceptación</h2>
              <p className="text-sm sm:text-base">Al acceder y utilizar este sitio web, declaras haber leído, entender y aceptar íntegramente los presentes Términos de Uso. Si no estás de acuerdo con ellos, debes abstenerte de utilizar el Sitio.</p>
            </Card>

            <Card id="descripcion">
              <h2 className="font-display text-2xl text-white">2. Descripción del servicio</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li><strong className="text-white">Laboratorios sectoriales:</strong> contenido educativo sobre IA aplicada a ocho sectores.</li>
                <li><strong className="text-white">Herramientas:</strong> referencias, comparativas y recursos sobre herramientas de IA.</li>
                <li><strong className="text-white">Biblioteca de prompts:</strong> catálogo organizado por sector y fase.</li>
                <li><strong className="text-white">Taller:</strong> entorno interactivo para aprender sobre IA.</li>
                <li><strong className="text-white">Generador de resúmenes:</strong> herramienta de IA que genera resúmenes ejecutivos a partir de datos del usuario.</li>
                <li><strong className="text-white">Comunidad:</strong> espacio de debate, proyectos y colaboración.</li>
              </ul>
              <p className="text-sm sm:text-base">El servicio es <strong className="text-white">gratuito</strong> y de acceso público.</p>
            </Card>

            <Card id="naturaleza">
              <h2 className="font-display text-2xl text-white">3. Naturaleza del servicio</h2>
              <p className="text-sm sm:text-base">El Sitio tiene carácter <strong className="text-white">meramente educativo y divulgativo</strong>. En ningún caso constituye asesoramiento profesional (financiero, legal, médico, contable, psicológico o de otro tipo), sustitución de un profesional habilitado, garantía de exactitud de los resultados de IA ni contrato de prestación de servicios con disponibilidad garantizada.</p>
            </Card>

            <Card id="conducta">
              <h2 className="font-display text-2xl text-white">4. Conducta del usuario</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>Utilizar el Sitio conforme a la ley, la moral y las buenas costumbres.</li>
                <li>No realizar actividades ilícitas, fraudulentas o contrarias a estos Términos.</li>
                <li>No intentar acceder sin autorización a áreas restringidas.</li>
                <li>No interferir con el funcionamiento del Sitio.</li>
                <li>No suplantar la identidad de terceros.</li>
                <li>No enviar spam, publicidad no solicitada o contenido malicioso.</li>
                <li>Respetar a otros usuarios en la comunidad.</li>
              </ul>
            </Card>

            <Card id="contenido-usuarios">
              <h2 className="font-display text-2xl text-white">5. Contenido generado por usuarios</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>El usuario es el <strong className="text-white">único responsable</strong> del contenido que publica en la comunidad.</li>
                <li>El titular no responde de las opiniones manifestadas por los usuarios.</li>
                <li>El titular podrá moderar, editar o eliminar contenido que incumpla estos Términos.</li>
                <li>El contenido debe respetar la propiedad intelectual de terceros y no incluir datos personales sensibles de terceros.</li>
              </ul>
            </Card>

            <Card id="moderacion">
              <h2 className="font-display text-2xl text-white">6. Moderación</h2>
              <p className="text-sm sm:text-base">El titular podrá, a su sola discreción y sin previo aviso: eliminar contenido que incumpla estos Términos, suspender o bloquear el acceso de usuarios reincidentes y colaborar con las autoridades competentes ante actividad ilícita.</p>
            </Card>

            <Card id="propiedad">
              <h2 className="font-display text-2xl text-white">7. Propiedad intelectual</h2>
              <p className="text-sm sm:text-base">Todo el contenido del Sitio —textos, imágenes, gráficos, logos, código, diseño y selección del mismo— es propiedad del titular o de terceros que han autorizado su uso, y está protegido por la legislación de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa, salvo que la ley establezca lo contrario.</p>
            </Card>

            <Card id="enlaces">
              <h2 className="font-display text-2xl text-white">8. Enlaces a terceros</h2>
              <p className="text-sm sm:text-base">El Sitio puede contener enlaces a sitios web de terceros. El titular no controla dichos sitios ni asume responsabilidad por su contenido, políticas de privacidad o prácticas.</p>
            </Card>

            <Card id="uso-ia">
              <h2 className="font-display text-2xl text-white">9. Uso indebido de herramientas de IA</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>No generar contenido que vulnere derechos de terceros.</li>
                <li>No suplantar la identidad de personas o empresas.</li>
                <li>No presentar contenidos generados por IA como asesoramiento profesional.</li>
                <li>No utilizar el servicio para actividades fraudulentas o ilícitas.</li>
                <li>No intentar explotar vulnerabilidades del sistema.</li>
              </ul>
            </Card>

            <Card id="limitaciones">
              <h2 className="font-display text-2xl text-white">10. Limitaciones de responsabilidad</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>No se garantiza la disponibilidad continua del servicio.</li>
                <li>No se garantiza la exactitud de los resultados generados por IA.</li>
                <li>El titular no responde de decisiones tomadas basándose en la información del Sitio.</li>
                <li>El titular no responde de daños directos o indirectos derivados del uso del Sitio.</li>
                <li>El titular no responde del contenido publicado por usuarios ni del uso indebido de las herramientas de IA.</li>
              </ul>
              <p className="text-sm sm:text-base">El servicio se proporciona <strong className="text-white">“tal cual”</strong>, sin garantías de ningún tipo.</p>
            </Card>

            <Card id="disponibilidad">
              <h2 className="font-display text-2xl text-white">11. Disponibilidad</h2>
              <p className="text-sm sm:text-base">El titular podrá modificar, suspender o discontinuar el servicio en cualquier momento, total o parcialmente, sin previo aviso ni responsabilidad.</p>
            </Card>

            <Card id="modificaciones">
              <h2 className="font-display text-2xl text-white">12. Modificaciones</h2>
              <p className="text-sm sm:text-base">El titular podrá modificar estos Términos de Uso en cualquier momento. Las modificaciones serán efectivas desde su publicación. El uso continuado del Sitio implicará su aceptación.</p>
            </Card>

            <Card id="legislacion">
              <h2 className="font-display text-2xl text-white">13. Legislación aplicable</h2>
              <p className="text-sm sm:text-base">Estos Términos de Uso se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de [DATOS DEL RESPONSABLE PENDIENTES — ciudad del titular], con renuncia expresa a cualquier otro fuero.</p>
            </Card>

            <Card id="contacto">
              <h2 className="font-display text-2xl text-white">14. Contacto</h2>
              <p className="text-sm sm:text-base">Para cualquier consulta sobre estos Términos de Uso: [DATOS DEL RESPONSABLE PENDIENTES — email de contacto].</p>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE REVISIÓN JURÍDICA PROFESIONAL] — Este borrador no constituye asesoramiento jurídico.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/privacidad" className="font-mono text-xs text-[#3B6FD4] hover:underline">Ver Privacidad →</Link>
                <Link to="/aviso-legal" className="font-mono text-xs text-[#3B6FD4] hover:underline">Ver Aviso Legal →</Link>
              </div>
            </Card>
          </article>
        </div>
      </div>
    </div>
  );
}
