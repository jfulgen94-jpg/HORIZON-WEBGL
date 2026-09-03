import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLabBySlug } from "../data/labs-data";

const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>;
const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-sm border transition-colors"
      style={{ borderColor: copied ? "#059669" : "rgba(255,255,255,0.15)", color: copied ? "#059669" : "rgba(255,255,255,0.45)" }}>
      {copied ? "✓ Copiado" : "Copiar"}
    </button>
  );
};

function Step({ num, title, goal, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl overflow-hidden mb-3" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
        style={{ background: open ? "rgba(59,111,212,0.04)" : "transparent" }}>
        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold"
          style={{ background: open ? "#3B6FD4" : "rgba(255,255,255,0.08)", color: open ? "white" : "rgba(255,255,255,0.6)" }}>{num}</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[14px] text-white">{title}</div>
          {goal && <div className="text-[12px] mt-0.5 text-white/45">{goal}</div>}
        </div>
        <ChevronDown className={`shrink-0 transition-transform text-white/35 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 pt-1 border-t border-white/[0.06]">{children}</div>}
    </div>
  );
}

function PromptBlock({ label, content }) {
  return (
    <div className="mt-4 rounded-xl border overflow-hidden" style={{ borderColor: "rgba(59,111,212,0.18)", background: "rgba(59,111,212,0.03)" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "rgba(59,111,212,0.12)", background: "rgba(59,111,212,0.06)" }}>
        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#3B6FD4]">{label}</span>
        <CopyBtn text={content} />
      </div>
      <pre className="px-4 py-4 text-[13px] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto text-white/70 bg-black/20">{content}</pre>
    </div>
  );
}

export default function GenericRuta() {
  const { slug } = useParams();
  const lab = getLabBySlug(slug);

  if (!lab) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="font-display text-3xl text-white mb-4">Ruta no encontrada</h1>
        <Link to="/taller" className="text-[#3B6FD4] font-mono text-sm">Volver al Taller</Link>
      </div>
    );
  }

  return (
    <div className="min-h-full pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/taller" className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/70 transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver al Taller
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: lab.colorDim, border: `1px solid ${lab.color}30`, color: lab.color }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-white/30">Ruta del Taller</span>
            <h1 className="font-display text-3xl text-white">{lab.name}</h1>
          </div>
        </div>

        {/* Human validation warning */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-yellow-400/20 bg-yellow-400/5 p-6">
          <div className="flex items-start gap-3">
            <span className="text-lg shrink-0">⚠️</span>
            <div>
              <h3 className="font-semibold text-sm text-yellow-300 mb-1">La validación humana es parte del proceso</h3>
              <p className="text-sm text-yellow-300/60 leading-relaxed">
                Ningún agente de IA construye una aplicación perfecta desde el primer intento. Cada bloque de código que generes necesita revisión.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Step num="0" title="Investigación" goal="Confirmar qué modelos lideran en este sector" defaultOpen={true}>
            <p className="text-sm text-white/60 leading-relaxed mb-4">Consulta los benchmarks del laboratorio para elegir el modelo adecuado antes de escribir código.</p>
            <Link to={lab.route} className="inline-flex items-center gap-1.5 text-sm" style={{ color: lab.color }}>Ver laboratorio →</Link>
          </Step>
          <Step num="1" title="Definición del problema" goal="Precisar qué va a hacer la app y para quién">
            <PromptBlock label="prompt_ide.txt" content={`Eres el arquitecto de ${lab.name} en Horizon.\nDefine una aplicación profesional que resuelva un problema real en el sector de ${lab.name}.\n\nIncluye:\n1. Nombre de la app\n2. Problema que resuelve\n3. Usuario objetivo\n4. Stack técnico recomendado\n5. Datos de entrada y salida\n6. Restricciones de seguridad`} />
          </Step>
          <Step num="2" title="Diseño de arquitectura" goal="Definir capas, módulos y flujo de datos">
            <PromptBlock label="prompt_architecture.txt" content={`Diseña la arquitectura de ${lab.name}.\n\nCapas:\n- Capa 2: Esquemas de datos (Pydantic)\n- Capa 3: Lógica de negocio (determinista)\n- Capa 4: Integración LLM\n- Capa 5: Interfaz de usuario\n- Capa 6: Tests`} />
          </Step>
          <Step num="3" title="Desarrollo iterativo" goal="Construir por bloques, testear cada uno">
            <p className="text-sm text-white/60 leading-relaxed">Desarrolla cada capa por separado. Ejecuta y testea antes de continuar al siguiente paso.</p>
          </Step>
          <Step num="4" title="Testing y validación" goal="Verificar con datos reales">
            <p className="text-sm text-white/60 leading-relaxed">Ejecuta la app con datos reales del sector. Valida cada resultado con un profesional del dominio.</p>
          </Step>
          <Step num="5" title="Publicación" goal="Compartir en la comunidad Horizon">
            <p className="text-sm text-white/60 leading-relaxed">Publica tu app en el Foro de Aplicaciones y comparte el código con la comunidad.</p>
          </Step>
        </div>
      </div>
    </div>
  );
}
