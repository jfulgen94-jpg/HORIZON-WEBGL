import { useState } from "react";

export default function Accordion({ title, children, defaultOpen = false, badge = null, badgeColor = "blue" }) {
  const [open, setOpen] = useState(defaultOpen);

  const badgeColors = {
    blue: "bg-[#3B6FD4]/10 text-[#3B6FD4] border-[#3B6FD4]/20",
    purple: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  };

  return (
    <div className="border border-white/[0.08] rounded-xl overflow-hidden bg-[#10141D] backdrop-blur-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-display text-lg text-[#F3F4F8] truncate">{title}</span>
          {badge && (
            <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full border ${badgeColors[badgeColor] || badgeColors.blue}`}>
              {badge}
            </span>
          )}
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 text-[#525A70] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 pb-5 border-t border-white/[0.06]">
          {children}
        </div>
      </div>
    </div>
  );
}
