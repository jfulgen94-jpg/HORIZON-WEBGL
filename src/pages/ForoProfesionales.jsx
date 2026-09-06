import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

export default function ForoProfesionales() {
  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/comunidad" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver a Comunidad
        </Link>
        <h1 className="font-display text-4xl text-white mb-4">Profesionales y Colaboraciones</h1>
        <p className="text-white/50 max-w-2xl mb-12">Portal de expertos en programación, datos e IA. Publica tu perfil o busca colaboradores.</p>
        <EmptyState
          eyebrow="Comunidad"
          title="Red de profesionales de IA"
          description="Un directorio donde los profesionales que usan IA en su trabajo diario pueden conectar, compartir experiencias y encontrar colaboradores por sector y especialidad."
          expectation="La red se activará cuando se implemente el sistema de perfiles."
        />
      </div>
    </div>
  );
}
