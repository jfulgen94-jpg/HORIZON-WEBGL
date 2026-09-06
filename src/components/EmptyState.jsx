import { Link } from "react-router-dom";

/**
 * EmptyState — estado vacío honesto y reutilizable (S3-06).
 * Sin CTA por defecto: la CTA solo se renderiza si recibe
 * ctaTo (ruta interna declarada) + ctaLabel aprobados.
 * Sin animación decorativa (respeta prefers-reduced-motion).
 */
export default function EmptyState({
  eyebrow,
  title,
  description,
  expectation,
  ctaTo,
  ctaLabel,
  icon,
  labelledBy,
}) {
  const showCta =
    typeof ctaTo === "string" &&
    ctaTo.startsWith("/") &&
    typeof ctaLabel === "string" &&
    ctaLabel.trim().length > 0;
  const titleId = labelledBy || undefined;

  return (
    <div
      className="border border-white/[0.08] rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto"
      {...(titleId ? { "aria-labelledby": titleId } : { role: "status" })}
    >
      {icon ? (
        <div aria-hidden="true" className="flex justify-center mb-5 text-white/25">
          {icon}
        </div>
      ) : null}
      {eyebrow ? (
        <p className="text-[#3B6FD4] text-xs font-medium tracking-widest uppercase mb-3">
          {eyebrow}
        </p>
      ) : null}
      <h2
        {...(titleId ? { id: titleId } : {})}
        className="font-display text-2xl text-white mb-3"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-sm text-white/50 leading-relaxed max-w-xl mx-auto mb-4">
          {description}
        </p>
      ) : null}
      {expectation ? (
        <p className="text-xs text-white/30 leading-relaxed max-w-xl mx-auto">
          {expectation}
        </p>
      ) : null}
      {showCta ? (
        <div className="pt-6">
          <Link
            to={ctaTo}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#3B6FD4] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#4A7DE0] transition-colors shadow-lg shadow-[#3B6FD4]/20"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
