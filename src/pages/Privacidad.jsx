import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";

const SECTIONS = [
  { id: "responsable", label: "1. Responsable" },
  { id: "datos", label: "2. Datos que se recogen" },
  { id: "finalidades", label: "3. Finalidades y base jurídica" },
  { id: "destinatarios", label: "4. Destinatarios" },
  { id: "transferencias", label: "5. Transferencias internacionales" },
  { id: "conservacion", label: "6. Conservación" },
  { id: "derechos", label: "7. Derechos del usuario" },
  { id: "seguridad", label: "8. Medidas de seguridad" },
  { id: "formularios", label: "9. Formularios" },
  { id: "comunidad", label: "10. Comunidad y foros" },
  { id: "menores", label: "11. Menores de edad" },
  { id: "cambios", label: "12. Cambios" },
];

export default function Privacidad() {
  return (
    <div className="relative min-h-screen pb-24" data-od-id="privacidad-page">
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
            <ShieldCheck size={14} />
            Borrador pendiente de revisión jurídica profesional
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F3F4F8] leading-tight mb-4 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="text-lg text-[#9BA3B8] font-light max-w-3xl leading-relaxed">
            Cómo tratamos tus datos en Horizon – El Taller del Código. Este texto es un
            borrador editorial: no afirma cumplimiento legal definitivo.
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
              <nav aria-label="Índice de la política de privacidad" className="space-y-1.5 font-mono text-xs">
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
            <section id="responsable" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">1. Responsable del tratamiento</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li><strong className="text-white">Denominación:</strong> Horizon – El Taller del Código</li>
                <li><strong className="text-white">Responsable:</strong> Jose Fulgencio Molina Garcia</li>
                <li><strong className="text-white">NIF:</strong> 48646521-A</li>
                <li><strong className="text-white">Email de contacto:</strong> [DATOS DEL RESPONSABLE PENDIENTES — introducir email de contacto]</li>
                <li><strong className="text-white">Delegado de Protección de Datos (DPO):</strong> No aplica</li>
              </ul>
            </section>

            <section id="datos" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-4 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">2. Datos que se recogen</h2>
              <h3 className="font-display text-lg text-white">2.1 Datos proporcionados directamente por el usuario</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-white/[0.08] rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-white/[0.04] font-mono text-xs uppercase tracking-wider text-white/60">
                      <th className="text-left p-3">Categoría</th>
                      <th className="text-left p-3">Campos</th>
                      <th className="text-left p-3">Finalidad</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr]:border-t [&>tr]:border-white/[0.06]">
                    <tr>
                      <td className="p-3">Formulario de generación</td>
                      <td className="p-3">Nombre, email, teléfono, empresa, descripción, sector, ubicación, presupuesto, timeline, equipo, riesgos, métricas, stakeholders, compliance y otros campos del formulario</td>
                      <td className="p-3">Generación del resumen ejecutivo mediante IA</td>
                    </tr>
                    <tr>
                      <td className="p-3">Notas del taller</td>
                      <td className="p-3">Texto libre introducido por el usuario</td>
                      <td className="p-3">Anotaciones del taller</td>
                    </tr>
                    <tr>
                      <td className="p-3">Registro mock</td>
                      <td className="p-3">Email, nombre, plan</td>
                      <td className="p-3">Autenticación simulada (sin backend real)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h3 className="font-display text-lg text-white">2.2 Datos recogidos automáticamente</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li><strong className="text-white">Almacenamiento local:</strong> borrador del formulario, progreso del taller, último resultado, preferencia de tema.</li>
                <li><strong className="text-white">Registros del servidor:</strong> dirección IP, timestamp y resultado de la operación (logs de seguridad de la función serverless).</li>
              </ul>
              <h3 className="font-display text-lg text-white">2.3 Datos que NO se recogen</h3>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>Cookies de seguimiento, analítica con cookies o publicidad</li>
                <li>Perfiles de navegación</li>
                <li>Datos de geolocalización</li>
                <li>Información de dispositivos</li>
                <li>Datos de terceros</li>
              </ul>
              <h3 className="font-display text-lg text-white">2.4 Medición de visitas (Vercel Analytics)</h3>
              <p className="text-sm sm:text-base">El Sitio cuenta visitas y páginas vistas con Vercel Analytics, que según el proveedor no utiliza cookies y se procesa en la infraestructura de Vercel Inc. (EE.UU.).</p>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE REVISIÓN JURÍDICA PROFESIONAL] — Base jurídica e información de esta medición pendientes de validar.</p>
            </section>

            <section id="finalidades" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-4 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">3. Finalidades y base jurídica</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-white/[0.08] rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-white/[0.04] font-mono text-xs uppercase tracking-wider text-white/60">
                      <th className="text-left p-3">Finalidad</th>
                      <th className="text-left p-3">Base jurídica (RGPD Art. 6)</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr]:border-t [&>tr]:border-white/[0.06]">
                    <tr><td className="p-3">Generación de resúmenes ejecutivos</td><td className="p-3">Consentimiento (Art. 6.1.a) — el usuario solicita expresamente el servicio</td></tr>
                    <tr><td className="p-3">Funcionamiento del taller</td><td className="p-3">Ejecución de contrato / Consentimiento</td></tr>
                    <tr><td className="p-3">Almacenamiento de borradores</td><td className="p-3">Consentimiento</td></tr>
                    <tr><td className="p-3">Logs de seguridad</td><td className="p-3">Interés legítimo (Art. 6.1.f)</td></tr>
                    <tr><td className="p-3">Comunidad y foros</td><td className="p-3">Consentimiento</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE REVISIÓN JURÍDICA PROFESIONAL] — Bases jurídicas a validar.</p>
            </section>

            <section id="destinatarios" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-4 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">4. Destinatarios de los datos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-white/[0.08] rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-white/[0.04] font-mono text-xs uppercase tracking-wider text-white/60">
                      <th className="text-left p-3">Destinatario</th>
                      <th className="text-left p-3">Datos</th>
                      <th className="text-left p-3">Finalidad</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr]:border-t [&>tr]:border-white/[0.06]">
                    <tr><td className="p-3">Google (Gemini)</td><td className="p-3">Contenido del formulario (sin email/nombre directos)</td><td className="p-3">Generación de contenido IA</td></tr>
                    <tr><td className="p-3">Mistral AI</td><td className="p-3">Contenido del formulario (sin email/nombre directos)</td><td className="p-3">Generación de contenido IA (fallback)</td></tr>
                    <tr><td className="p-3">Together AI</td><td className="p-3">Contenido del formulario (sin email/nombre directos)</td><td className="p-3">Generación de contenido IA (fallback)</td></tr>
                    <tr><td className="p-3">Vercel Inc.</td><td className="p-3">Datos del servidor (logs, registros)</td><td className="p-3">Alojamiento del sitio web</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm">[DATOS DEL RESPONSABLE PENDIENTES] — Verificar la existencia de Acuerdos de Tratamiento de Datos (DPA) con cada proveedor.</p>
            </section>

            <section id="transferencias" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">5. Transferencias internacionales</h2>
              <p className="text-sm sm:text-base">Los datos pueden transferirse a terceros países (EE.UU.) con las siguientes garantías previstas: Cláusulas Contractuales Tipo (SCCs) de la Comisión Europea para Google, Mistral AI, Together AI y Vercel.</p>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE ASESORAMIENTO JURÍDICO] — Verificar la vigencia de las garantías específicas con cada proveedor.</p>
            </section>

            <section id="conservacion" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">6. Conservación de los datos</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li><strong className="text-white">Borrador del formulario, último resultado, progreso y notas del taller:</strong> mientras el usuario los mantenga en su navegador.</li>
                <li><strong className="text-white">Datos enviados a IA:</strong> no se almacenan en nuestros servidores; tratamiento efímero durante la petición.</li>
                <li><strong className="text-white">Logs del servidor:</strong> [DATOS DEL RESPONSABLE PENDIENTES — plazo sugerido: 30 días].</li>
                <li><strong className="text-white">Registro mock:</strong> mientras el usuario no elimine su “cuenta” local.</li>
              </ul>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE ASESORAMIENTO JURÍDICO] — El almacenamiento local persistente sin expiración podría ser incompatible con el principio de limitación del plazo (Art. 5.1.e GDPR).</p>
            </section>

            <section id="derechos" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">7. Derechos del usuario</h2>
              <p className="text-sm sm:text-base">Conforme al RGPD, el usuario tiene derecho a acceso (Art. 15), rectificación (Art. 16), supresión (Art. 17), limitación (Art. 18), portabilidad (Art. 20), oposición (Art. 21) y a revocar su consentimiento (Art. 7.3) en cualquier momento.</p>
              <p className="text-sm sm:text-base">Para ejercer estos derechos, envía una solicitud identificada a: [DATOS DEL RESPONSABLE PENDIENTES — email de contacto]. También puedes reclamar ante la Agencia Española de Protección de Datos (AEPD).</p>
            </section>

            <section id="seguridad" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">8. Medidas de seguridad</h2>
              <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
                <li>Comunicación cifrada (HTTPS/TLS)</li>
                <li>Variables de entorno privadas (sin exposición al navegador)</li>
                <li>Validación estricta de entradas</li>
                <li>Timeouts y límites de ejecución</li>
                <li>Ausencia de persistencia de datos sensibles en servidor</li>
              </ul>
            </section>

            <section id="formularios" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">9. Tratamiento de formularios</h2>
              <p className="text-sm sm:text-base">Los datos del Generador de Resúmenes Ejecutivos se envían únicamente al servicio de generación solicitado, no se almacenan en nuestros servidores, no se comparten con terceros distintos a los proveedores de IA y se procesan de forma efímera. Puedes solicitar su eliminación en cualquier momento.</p>
            </section>

            <section id="comunidad" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">10. Comunidad y foros</h2>
              <p className="text-sm sm:text-base">Los mensajes publicados son visibles por defecto y su autor es responsable de su contenido. El titular podrá moderar o eliminar contenido. Los mensajes pueden contener datos personales del autor.</p>
            </section>

            <section id="menores" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">11. Menores de edad</h2>
              <p className="text-sm sm:text-base">El Sitio no está dirigido a menores de 14 años. Si se detectase el tratamiento de datos de un menor, se procedería a su eliminación inmediata.</p>
            </section>

            <section id="cambios" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 space-y-3 scroll-mt-28">
              <h2 className="font-display text-2xl text-white">12. Cambios en esta política</h2>
              <p className="text-sm sm:text-base">El titular podrá modificar esta Política de Privacidad y notificará los cambios significativos mediante aviso en el Sitio. El uso continuado tras las modificaciones implicará su aceptación.</p>
              <p className="font-mono text-xs text-amber-300/80">[REQUIERE REVISIÓN JURÍDICA PROFESIONAL] — Este borrador no constituye asesoramiento jurídico.</p>
              <Link to="/cookies" className="inline-block font-mono text-xs text-[#3B6FD4] hover:underline">
                Ver Política de Cookies →
              </Link>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
