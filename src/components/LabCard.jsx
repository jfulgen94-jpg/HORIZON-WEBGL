import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { LABS } from "../data/labs-data";
const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const ICONS = {
  "trending-up": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  "heart-pulse": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
      <path d="M12 6l-1.5 4.5M12 6l1.5 4.5M12 6v-2" />
    </svg>
  ),
  "file-text": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  sigma: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6H6l6 6-6 6h12" />
    </svg>
  ),
  cog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L2 7h20L12 3z" />
      <path d="M2 7v6c0 5.5 4.5 10 10 10s10-4.5 10-10V7" />
      <path d="M8 14h8" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 2.5 1.5 4.5 3.5 5.5v3a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-3c2-1 3.5-3 3.5-5.5A5.5 5.5 0 0 0 14.5 2h-5z" />
      <path d="M10 18h4" />
    </svg>
  ),
};

export default function LabCard({ lab, variant = "grid", index = 0 }) {
  const isBento = variant === "bento" && index === 0;
  const Icon = ICONS[lab.icon] || ICONS["cog"];

  return (
    <div
      className={clsx(
        "group relative flex flex-col justify-between rounded-2xl border transition-all duration-200",
        "bg-[#161C27] border-white/[0.08] hover:border-white/[0.18] hover:shadow-card-hover hover:-translate-y-0.5",
        isBento
          ? "col-span-2 row-span-2 p-7 sm:p-8 min-h-[240px] lg:min-h-[320px]"
          : "p-5 sm:p-6 min-h-[180px]",
        `animate-fade-up-${Math.min(index + 1, 5)}`
      )}
      style={{ "--lab-color": lab.color }}
      data-od-id={`lab-card-${lab.id}`}
    >
      <Link
        to={lab.route}
        aria-label={`Explorar ${lab.name}`}
        className="absolute inset-0 rounded-2xl focus-visible:outline-accent"
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: lab.color }}
      />

      <div>
        {/* Icon */}
        <div
          className={clsx(
            "flex items-center justify-center rounded-xl border mb-4",
            isBento ? "w-12 h-12" : "w-10 h-10"
          )}
          style={{
            background: lab.colorDim,
            borderColor: `${lab.color}20`,
            color: lab.color,
          }}
        >
          <div className={isBento ? "w-6 h-6" : "w-5 h-5"}>{Icon}</div>
        </div>

        {/* Eyebrow */}
        <span className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1">
          Laboratorio {lab.num}
        </span>

        {/* Name */}
        <h3
          className={clsx(
            "font-display text-white group-hover:text-accent-light transition-colors leading-tight",
            isBento ? "text-2xl sm:text-3xl mb-2" : "text-lg mb-1"
          )}
        >
          {lab.name}
        </h3>

        {/* Description */}
        <p
          className={clsx(
            "text-white/40 leading-relaxed",
            isBento ? "text-sm max-w-xs" : "text-[13px]"
          )}
        >
          {isBento ? lab.fullDesc : lab.shortDesc}
        </p>
      </div>

      {/* Metrics */}
      <div className="flex gap-5 mt-4 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-col">
          <span className="font-mono text-sm text-white">{lab.metrics.projects}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Proyectos</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-sm text-white">{lab.metrics.benchmarks}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Benchmarks</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-sm text-white">{lab.metrics.tools}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Herramientas</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <span
          aria-hidden="true"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md transition-colors"
          style={{
            color: lab.color,
            background: lab.colorDim,
            border: `1px solid ${lab.color}20`,
          }}
        >
          Explorar <ArrowRight size={11} />
        </span>
        <Link
          to={lab.wizardRoute}
          className="relative inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-white/30 px-3 py-1.5 rounded-md border border-transparent hover:border-white/10 hover:text-white/50 transition-colors"
        >
          Wizard
        </Link>
      </div>
    </div>
  );
}
