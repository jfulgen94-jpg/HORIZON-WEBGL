import Accordion from "./Accordion";
import ExtensionList from "./ExtensionList";

export default function IDECard({ ide }) {
  return (
    <Accordion
      title={ide.name}
      badge={ide.badge}
      badgeColor={ide.badgeColor}
    >
      <div className="pt-4 space-y-5">
        {/* Descripción */}
        <p className="text-sm text-[#9BA3B8] leading-relaxed">{ide.desc}</p>

        {/* Planes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Plan Gratuito */}
          <div className="p-4 rounded-lg bg-[#0A0C10]/60 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#F3F4F8]">{ide.freePlan.name}</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                {ide.freePlan.price}
              </span>
            </div>
            <ul className="space-y-1.5">
              {ide.freePlan.features.map((f) => (
                <li key={f} className="flex gap-2 text-xs text-[#9BA3B8]">
                  <span className="text-emerald-500/60 shrink-0 mt-0.5">+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan de Pago */}
          <div className="p-4 rounded-lg bg-[#3B6FD4]/[0.04] border border-[#3B6FD4]/15">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#F3F4F8]">{ide.paidPlan.name}</span>
              <span className="text-[10px] font-mono text-[#3B6FD4] bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 px-2 py-0.5 rounded-full">
                {ide.paidPlan.price}
              </span>
            </div>
            <ul className="space-y-1.5">
              {ide.paidPlan.features.map((f) => (
                <li key={f} className="flex gap-2 text-xs text-[#9BA3B8]">
                  <span className="text-[#3B6FD4]/60 shrink-0 mt-0.5">+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modelos IA recomendados */}
        <div>
          <div className="text-[10px] text-[#525A70] uppercase tracking-widest mb-2">
            Modelos IA recomendados
          </div>
          <div className="flex flex-wrap gap-2">
            {ide.models.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A0C10]/50 border border-white/[0.06]"
              >
                <span className="text-xs text-[#F3F4F8] font-medium">{m.name}</span>
                <span className="text-[9px] text-[#525A70]">·</span>
                <span className="text-[10px] text-[#9BA3B8]">{m.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mejor para */}
        <div className="p-3 rounded-lg bg-[#3B6FD4]/[0.04] border-l-2 border-[#3B6FD4]/40">
          <span className="text-[10px] text-[#525A70] uppercase tracking-widest">Mejor para</span>
          <p className="text-sm text-[#9BA3B8] mt-1">{ide.bestFor}</p>
        </div>

        {/* Extensiones */}
        <ExtensionList extensions={ide.extensions} />
      </div>
    </Accordion>
  );
}
