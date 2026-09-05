import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { MAP_NODES } from "../data/taller-map-data";
import { useSEO } from "../hooks/useSEO";

const TallerMap = lazy(() => import("../components/webgl/TallerMap"));

const LABS = MAP_NODES.filter((n) => n.type === "lab");
const HUBS = MAP_NODES.filter((n) => n.type === "hub" || n.type === "hero");

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="w-8 h-8 border-2 border-[#3B6FD4]/30 border-t-[#3B6FD4] rounded-full animate-spin" />
    </div>
  );
}

function AccessibleFallback() {
  return (
    <nav aria-label="Mapa del Taller - Versión accesible" className="space-y-6">
      <section>
        <h3 className="font-display text-lg text-[#F3F4F8] mb-3">Secciones principales</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {HUBS.map((node) => (
            <Link
              key={node.id}
              to={node.section}
              className="block px-4 py-3 rounded-xl bg-[#10141D] border border-white/[0.08] text-[#F3F4F8] text-sm font-medium hover:border-[#3B6FD4]/40 hover:bg-[#3B6FD4]/5 transition-all"
            >
              {node.label}
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h3 className="font-display text-lg text-[#F3F4F8] mb-3">Laboratorios</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LABS.map((node) => (
            <Link
              key={node.id}
              to={node.section}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#10141D] border border-white/[0.08] hover:border-white/[0.18] transition-all"
            >
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: node.color }} />
              <span className="text-[#F3F4F8] text-sm font-medium">{node.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </nav>
  );
}

export default function TallerMapPage() {
  useSEO({
    title: "Mapa del Taller",
    description: "Mapa visual interactivo del Taller. Explora nodos de laboratorios y áreas en un lienzo WebGL accesible.",
    path: "/taller/mapa",
  });

  const [webglFailed, setWebglFailed] = useState(false);

  const handleNodeClick = (section) => {
    window.location.href = section;
  };

  return (
    <div className="relative min-h-full pb-20 pt-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#6B95E8] border border-[#3B6FD4]/20 bg-[#3B6FD4]/5 px-3 py-1 rounded-full mb-4">
            Plano Vivo
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F3F4F8] mb-3">Mapa del Taller</h1>
          <p className="text-sm text-[#9BA3B8] max-w-2xl leading-relaxed">
            Explora la estructura de Horizon en 3D. Arrastra para rotar, scroll para zoom, haz clic en un nodo para navegar.
          </p>
        </div>

        {webglFailed ? (
          <AccessibleFallback />
        ) : (
          <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
            <Suspense fallback={<Loading />}>
              <TallerMap onNodeClick={handleNodeClick} onError={() => setWebglFailed(true)} />
            </Suspense>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/taller"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#525A70] hover:text-[#3B6FD4] transition-colors"
          >
            ← Volver al Taller
          </Link>
        </div>
      </div>
    </div>
  );
}
