const CATEGORY_COLORS = {
  IA: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  Lenguaje: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  Git: "text-amber-300 bg-amber-500/10 border-amber-500/20",
  Calidad: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
  Frontend: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
  Config: "text-white/50 bg-white/5 border-white/10",
  DevOps: "text-orange-300 bg-orange-500/10 border-orange-500/20",
  Búsqueda: "text-pink-300 bg-pink-500/10 border-pink-500/20",
};

export default function ExtensionList({ extensions }) {
  if (!extensions || extensions.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="text-[10px] text-[#525A70] uppercase tracking-widest mb-3">
        Extensiones recomendadas
      </div>
      <div className="space-y-2">
        {extensions.map((ext) => (
          <div
            key={ext.name}
            className="flex items-start gap-3 p-3 rounded-lg bg-[#0A0C10]/50 border border-white/[0.04] hover:border-white/[0.08] transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm text-[#F3F4F8] font-medium">{ext.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${CATEGORY_COLORS[ext.category] || CATEGORY_COLORS.IA}`}>
                  {ext.category}
                </span>
              </div>
              <p className="text-xs text-[#9BA3B8] leading-relaxed">{ext.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
