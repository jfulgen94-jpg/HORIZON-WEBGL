import { Link } from "react-router-dom";
import { Cookie, ArrowLeft } from "lucide-react";
import { requestOpenPreferences } from "../utils/consent";

const SECTIONS = [
  { id: "que-son", label: "1. Qué son las cookies" },
  { id: "tecnologias", label: "2. Tecnologías que utiliza el sitio" },
  { id: "terceros", label: "3. Servicios de terceros" },
  { id: "consentimiento", label: "4. Gestionar el consentimiento" },
  { id: "retirar", label: "5. Retirar el consentimiento" },
  { id: "consecuencias", label: "6. Consecuencias de no aceptar" },
  { id: "actualizaciones", label: "7. Actualizaciones" },
];

export default function Cookies() {
  return (
    <div className="relative min-h-screen pb-24" data-od-id="cookies-page">
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
            <Cookie size={14} />
            Borrador pendiente de revisión jurídica profesional
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F3F4F8] leading-tight mb-4 tracking-tight">
            Política de Cookies y tecnologías similares
          </h1>
          <p className="text-lg text-[#9BA3B8] font-light max-w-3xl leading-relaxed">
            Qué almacenamiento utiliza Horizon en tu navegador y cómo gestionarlo.
            Este texto es un borrador editorial.
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
              <nav aria-label="Índice de la política de cookies" className="space-y-1.5 font-mono text-xs">
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
            <section id="que-son" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">1. ¿Qué son las cookies?</h2>
              <p className="text-sm sm:text-base">Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo al visitar un sitio web. Sirven para recordar preferencias, mejorar la experiencia y recoger información de uso. Además existen tecnologías similares como <code className="font-mono text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">localStorage</code>, <code className="font-mono text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">sessionStorage</code> e <code className="font-mono text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">indexedDB</code>, que almacenan información en el navegador.</p>
            </section>

            <section id="tecnologias" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-4 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">2. ¿Qué tecnologías utiliza este sitio?</h2>
              <h3 className="font-display text-lg text-white">2.1 Almacenamiento local (localStorage)</h3>
              <p className="text-sm sm:text-base">El Sitio utiliza <code className="font-mono text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">localStorage</code> para almacenar datos en tu dispositivo. No utiliza cookies, pero cumple una función similar de persistencia.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-white/[0.08] rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-white/[0.04] font-mono text-xs uppercase tracking-wider text-white/60">
                      <th className="text-left p-3">Clave</th>
                      <th className="text-left p-3">Contenido</th>
                      <th className="text-left p-3">Finalidad</th>
                      <th className="text-left p-3">Esencial</th>
                      <th className="text-left p-3">Caducidad</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr]:border-t [&>tr]:border-white/[0.06]">
                    <tr><td className="p-3 font-mono text-xs">horizon_executive_form_data</td><td className="p-3">Borrador del formulario (20 campos)</td><td className="p-3">Evitar pérdida de trabajo</td><td className="p-3">Sí</td><td className="p-3">Persistente</td></tr>
                    <tr><td className="p-3 font-mono text-xs">horizon_executive_last_result</td><td className="p-3">Último resumen generado</td><td className="p-3">Consultar el último resultado</td><td className="p-3">No</td><td className="p-3">Persistente</td></tr>
                    <tr><td className="p-3 font-mono text-xs">horizon_taller_progress</td><td className="p-3">Progreso del taller</td><td className="p-3">Mantener tu avance</td><td className="p-3">Sí</td><td className="p-3">Persistente</td></tr>
                    <tr><td className="p-3 font-mono text-xs">horizon_taller_notes</td><td className="p-3">Notas personales del taller</td><td className="p-3">Anotaciones</td><td className="p-3">Sí</td><td className="p-3">Persistente</td></tr>
                    <tr><td className="p-3 font-mono text-xs">horizon_user_auth</td><td className="p-3">Autenticación simulada (email, nombre)</td><td className="p-3">Mock de inicio de sesión</td><td className="p-3">No</td><td className="p-3">Persistente</td></tr>
                    <tr><td className="p-3 font-mono text-xs">horizon_rate_limit</td><td className="p-3">Contador de uso del generador</td><td className="p-3">Control de uso (mock)</td><td className="p-3">No</td><td className="p-3">30 días</td></tr>
                  </tbody>
                </table>
              </div>
              <h3 className="font-display text-lg text-white">2.2 Cookies</h3>
              <p className="text-sm sm:text-base">El Sitio <strong className="text-white">NO utiliza cookies</strong> de ningún tipo: ni de seguimiento, ni analíticas, ni de publicidad, ni de terceros.</p>
              <h3 className="font-display text-lg text-white">2.2.bis Medición sin cookies (Vercel Analytics)</h3>
              <p className="text-sm sm:text-base">El Sitio mide visitas y páginas vistas con Vercel Analytics, que según el proveedor no utiliza cookies. Esta medición no se desactiva desde el panel porque no guarda nada en tu navegador.</p>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE REVISIÓN JURÍDICA PROFESIONAL] — Pendiente de validar si esta medición requiere información reforzada.</p>
              <h3 className="font-display text-lg text-white">2.3 Otras tecnologías</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>No se utiliza <code className="font-mono text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">indexedDB</code>, <code className="font-mono text-xs bg-white/[0.06] px-1.5 py-0.5 rounded">sessionStorage</code>, Service Worker ni Cache API.</li>
                <li>No se utilizan píxeles de rastreo.</li>
              </ul>
            </section>

            <section id="terceros" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">3. Servicios de terceros: Google Fonts</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li><strong className="text-white">Proveedor:</strong> Google LLC — Google Fonts (fonts.googleapis.com, fonts.gstatic.com).</li>
                <li><strong className="text-white">Datos transferidos:</strong> dirección IP y cadena de User-Agent.</li>
                <li><strong className="text-white">Finalidad:</strong> mostrar las tipografías DM Sans, DM Mono y DM Serif Display.</li>
              </ul>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE ASESORAMIENTO JURÍDICO] — Opciones en estudio: self-host de fuentes (WOFF2 en /public/fonts/), carga condicional tras aceptación o legitimación como necesario (discutible).</p>
            </section>

            <section id="consentimiento" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">4. Cómo gestionar el consentimiento</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-white/[0.08] rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-white/[0.04] font-mono text-xs uppercase tracking-wider text-white/60">
                      <th className="text-left p-3">Categoría</th>
                      <th className="text-left p-3">Descripción</th>
                      <th className="text-left p-3">Por defecto</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr]:border-t [&>tr]:border-white/[0.06]">
                    <tr><td className="p-3">Estrictamente necesario</td><td className="p-3">Borrador del formulario, progreso y notas del taller, seguridad</td><td className="p-3">Siempre activo</td></tr>
                    <tr><td className="p-3">Funcional</td><td className="p-3">Último resultado, control de uso, autenticación simulada</td><td className="p-3">Requiere aceptación</td></tr>
                    <tr><td className="p-3">Terceros</td><td className="p-3">Google Fonts</td><td className="p-3">Requiere aceptación</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm sm:text-base">Podrás gestionar tus preferencias desde el enlace “Privacidad” del pie de página cuando el panel de preferencias esté disponible (tarea S1-12).</p>
              <button
                type="button"
                onClick={requestOpenPreferences}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#3B6FD4] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#2D5AB8] transition-colors min-h-[44px]"
              >
                Abrir preferencias de almacenamiento
              </button>
            </section>

            <section id="retirar" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">5. Cómo retirar el consentimiento</h2>
              <ol className="list-decimal pl-6 space-y-1 text-sm sm:text-base">
                <li>Haz clic en “Privacidad” en el pie de página.</li>
                <li>Desactiva las categorías deseadas.</li>
                <li>Los datos almacenados correspondientes serán eliminados.</li>
              </ol>
            </section>

            <section id="consecuencias" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">6. Consecuencias de no aceptar</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li><strong className="text-white">Funcional:</strong> no se guardará el último resultado ni el mock de autenticación; la funcionalidad principal no se ve afectada.</li>
                <li><strong className="text-white">Terceros:</strong> se usarán fuentes del sistema; el diseño puede variar ligeramente.</li>
              </ul>
            </section>

            <section id="actualizaciones" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">7. Actualizaciones de esta política</h2>
              <p className="text-sm sm:text-base">Esta política puede actualizarse para reflejar cambios en las tecnologías utilizadas o en la normativa aplicable. Te notificaremos los cambios significativos.</p>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE REVISIÓN JURÍDICA PROFESIONAL] — Este borrador no constituye asesoramiento jurídico.</p>
              <Link to="/privacidad" className="inline-block font-mono text-xs text-[#3B6FD4] hover:underline">
                Ver Política de Privacidad →
              </Link>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
