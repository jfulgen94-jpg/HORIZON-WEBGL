import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

export default function ForoDebate() {
  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/comunidad" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/70 transition-colors mb-8">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver a Comunidad
        </Link>
        <h1 className="font-display text-4xl text-white mb-4">Foro General de Debate</h1>
        <p className="text-white/50 max-w-2xl mb-12">Preguntas, reflexiones y debate abierto sobre IA, programación y datos.</p>
        <EmptyState
          eyebrow="Comunidad"
          title="Debate sobre IA aplicada"
          description="Un foro abierto para discutir metodologías, resolver dudas técnicas y debatir buenas prácticas en la aplicación de IA a cada profesión. Moderación basada en el Manifiesto de Horizon."
          expectation="El debate se abrirá cuando se implemente la infraestructura de publicación."
        />
      </div>
    </div>
  );
}
