import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

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
        <EmptyState
          eyebrow="Comunidad"
          title="Aplicaciones construidas con IA"
          description="Un espacio para compartir proyectos reales que otros profesionales puedan explorar, aprender y replicar. Aquí se publican apps, flujos de trabajo y herramientas creadas con IA aplicada a cada sector."
          expectation="El contenido se publicará cuando se habilite la sección de proyectos."
        />
      </div>
    </div>
  );
}
