import { useParams, Link } from "react-router-dom";
import { getLabBySlug } from "../data/labs-data";

export default function GenericWizard() {
  const { slug } = useParams();
  const lab = getLabBySlug(slug);

  if (!lab) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="font-display text-3xl text-white mb-4">Wizard no encontrado</h1>
        <Link to="/areas" className="text-[#3B6FD4] font-mono text-sm">Volver a Áreas</Link>
      </div>
    );
  }

  return (
    <div className="min-h-full pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to={lab.route} className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver al Laboratorio
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: lab.colorDim, border: `1px solid ${lab.color}30`, color: lab.color }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-white/30">Wizard</span>
            <h1 className="font-display text-3xl text-white">{lab.name}</h1>
          </div>
        </div>

        <div className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 mb-8">
          <h2 className="font-display text-xl text-white mb-4">Asistente de Creación</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Este wizard te guiará paso a paso para crear una aplicación en el sector de {lab.name}. 
            Cada paso incluye prompts optimizados, arquitectura recomendada y validación de seguridad.
          </p>
          <div className="space-y-4">
            {["Definición del problema", "Diseño de arquitectura", "Selección de modelos", "Desarrollo iterativo", "Testing y validación", "Despliegue"].map((step, i) => (
              <div key={step} className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: i === 0 ? lab.color : "rgba(255,255,255,0.08)", color: i === 0 ? "white" : "rgba(255,255,255,0.4)" }}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{step}</h3>
                  <p className="text-xs text-white/35">Paso {i + 1} de 6</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-yellow-400/20 bg-yellow-400/5 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-lg shrink-0">⚠️</span>
            <div>
              <h3 className="font-medium text-sm text-yellow-300 mb-1">Próximamente</h3>
              <p className="text-xs text-yellow-300/60 leading-relaxed">
                El wizard interactivo está en desarrollo. Cada laboratorio tendrá su propio asistente personalizado con prompts específicos para el sector.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
