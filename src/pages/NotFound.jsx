import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-6xl text-white mb-4">404</h1>
        <p className="text-white/50 text-lg mb-8">Esta página no existe o fue movida.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-[#3B6FD4] text-white px-6 py-3 rounded-xl font-mono text-[11px] uppercase tracking-wider hover:bg-[#2D5AB8] transition-colors">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
