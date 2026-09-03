import { Link } from "react-router-dom";

export default function ForoAplicaciones() {
  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/comunidad" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver a Comunidad
        </Link>
        <h1 className="font-display text-4xl text-white mb-4">Aplicaciones y Proyectos</h1>
        <p className="text-white/50 max-w-2xl mb-12">Publica tu app, agente de IA, librería o herramienta. Comparte el código, el demo y el stack.</p>
        <div className="border border-white/[0.08] rounded-2xl p-8 text-center">
          <p className="text-white/30 text-lg mb-2">Próximamente</p>
          <p className="text-white/20 text-sm">El foro de aplicaciones se abrirá cuando la comunidad esté lista.</p>
        </div>
      </div>
    </div>
  );
}
