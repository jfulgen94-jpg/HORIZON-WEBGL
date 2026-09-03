import { useState } from "react";
import { LABS } from "../data/labs-data";
import LabCard from "../components/LabCard";

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "formales", label: "Ciencias Formales" },
  { id: "negocios", label: "Negocios & Leyes" },
  { id: "salud", label: "Salud & Creatividad" },
];

export default function Areas() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredLabs =
    activeCategory === "all"
      ? LABS
      : LABS.filter((l) => l.category === activeCategory);

  return (
    <div className="pt-28 pb-24 px-6" data-od-id="areas-page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="block font-mono text-[10px] uppercase tracking-widest text-[#3B6FD4] mb-2">
            Laboratorios
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-white mb-4">
            Áreas de Especialización
          </h1>
          <p className="text-white/50 max-w-xl text-lg">
            Cada laboratorio tiene sus propios benchmarks, herramientas y protocolos de seguridad.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10" data-od-id="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-lg border transition-all ${
                activeCategory === cat.id
                  ? "bg-[#3B6FD4] text-white border-[#3B6FD4]"
                  : "bg-white/[0.04] text-white/50 border-white/[0.08] hover:bg-white/[0.08] hover:text-white/70"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Labs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-od-id="labs-grid">
          {filteredLabs.map((lab, i) => (
            <LabCard key={lab.id} lab={lab} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
