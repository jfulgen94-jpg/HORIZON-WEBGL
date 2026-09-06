import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Copy } from "lucide-react";
import { Check } from "lucide-react";

// ─── Approved palette (Sprint 3, S3-03 Option A) ─────────────────────────────
// Light "paper" subtheme — deliberate design decision, not a bug.
// The 8 /ruta/* pages are reading/working surfaces; this light family matches
// the beige chrome (#F5F1E8 header/footer). The dark tokens (--surface-base,
// --text-primary, etc.) belong to the showcase pages (Home, Labs, Taller...).
// Do NOT realign this palette to the dark system; use these tokens when building
// new surfaces for /ruta/* and /wizard/*.
export const C = {
  bg:      "#F9F6EF",
  dark:    "#111111",
  beige:   "#F5F1E8",
  accent:  "#3B6FD4",
  emerald: "#059669",
  amber:   "#D97706",
  red:     "#DC2626",
};

// ─── Copy button ────────────────────────────────────────────────────────────—€
export function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handle}
      className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-sm border transition-colors"
      style={{
        borderColor: copied ? C.emerald : "rgba(17,17,17,0.15)",
        color: copied ? C.emerald : "rgba(17,17,17,0.45)",
        background: copied ? "rgba(5,150,105,0.06)" : "transparent",
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}

// ─── Prompt block ────────────────────────────────────────────────────────────—€
export function PromptBlock({ label, children }) {
  const text = children || "Copia aquí el texto del prompt";
  const isEmpty = !children;
  return (
    <div className="mt-4 rounded-xl border overflow-hidden"
      style={{ borderColor: "rgba(59,111,212,0.18)", background: "rgba(59,111,212,0.03)" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: "rgba(59,111,212,0.12)", background: "rgba(59,111,212,0.06)" }}>
        <span className="text-[11px] font-semibold tracking-wider uppercase"
          style={{ color: C.accent }}>{label || "Prompt"}</span>
        <CopyBtn text={text} />
      </div>
      <pre className="px-4 py-4 text-[13px] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto"
        style={{ color: isEmpty ? "rgba(17,17,17,0.32)" : C.dark, fontFamily: "'DM Mono','Fira Code',monospace" }}>
        {text}
      </pre>
    </div>
  );
}

// ─── Accordion step ─────────────────────────────────────────────────────────—€
export function Step({ num, title, goal, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl overflow-hidden mb-3"
      style={{ borderColor: "rgba(17,17,17,0.10)" }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-black/[0.02]"
        style={{ background: open ? "rgba(59,111,212,0.04)" : "white" }}>
        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold"
          style={{ background: open ? C.accent : "rgba(17,17,17,0.08)", color: open ? "white" : C.dark }}>
          {num}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[14px]" style={{ color: C.dark }}>{title}</div>
          {goal && <div className="text-[12px] mt-0.5" style={{ color: "rgba(17,17,17,0.45)" }}>{goal}</div>}
        </div>
        <ChevronDown size={16} className="shrink-0 transition-transform"
          style={{ color: "rgba(17,17,17,0.35)", transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t" style={{ borderColor: "rgba(17,17,17,0.06)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Phase header ────────────────────────────────────────────────────────────—€
export function PhaseHeader({ icon: Icon, label, color, title, desc }) {
  return (
    <div className="flex items-start gap-4 mb-6 mt-10">
      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: color + "18" }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div className="text-[11px] font-semibold tracking-widest uppercase mb-1"
          style={{ color }}>{label}</div>
        <h2 className="font-display text-xl" style={{ color: C.dark }}>{title}</h2>
        {desc && <p className="text-sm mt-1" style={{ color: "rgba(17,17,17,0.5)" }}>{desc}</p>}
      </div>
    </div>
  );
}

// ─── Back link ───────────────────────────────────────────────────────────────—€
export function BackLink() {
  return (
    <Link to="/taller"
      className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-60"
      style={{ color: "rgba(17,17,17,0.45)" }}>
      <ArrowLeft size={14} /> Volver al Taller
    </Link>
  );
}

// ─── HUMAN VALIDATION WARNING ────────────────────────────────────────────────—€
// This component is mandatory in every route page.
export function HumanValidationWarning() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-10 rounded-2xl overflow-hidden border"
      style={{ borderColor: "rgba(217,119,6,0.30)", background: "rgba(217,119,6,0.06)" }}>

      {/* Header — always visible */}
      <div className="flex items-start gap-4 px-6 py-5">
        <div className="shrink-0 mt-0.5 w-9 h-9 rounded-full flex items-center justify-center text-lg"
          style={{ background: "rgba(217,119,6,0.15)" }}>
          → ️
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[15px] mb-1" style={{ color: "#92400E" }}>
            La validación humana es parte del proceso
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(146,64,14,0.75)" }}>
            Ningún agente de IA construye una aplicación perfecta desde el primer intento. Esta ruta está diseñada para trabajar <em>con</em> esa realidad, no contra ella.
          </p>
        </div>
        <button
          onClick={() => setOpen(v => !v)}
          className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          style={{ background: "rgba(217,119,6,0.15)", color: "#92400E" }}>
          {open ? "Ocultar" : "Leer más"}
        </button>
      </div>

      {/* Expandable detail */}
      {open && (
        <div className="px-6 pb-6 border-t" style={{ borderColor: "rgba(217,119,6,0.15)" }}>
          <div className="pt-5 space-y-5">

            <div>
              <h4 className="font-semibold text-sm mb-2" style={{ color: "#92400E" }}>
                ¿Por qué ocurre esto?
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(146,64,14,0.8)" }}>
                Los modelos de IA generan código funcional en la mayoría de los casos, pero cometen errores predecibles: asumen dependencias que no están instaladas, generan rutas de archivo que no existen, usan APIs de una versión incorrecta, o producen lógica que pasa los tests pero falla en producción con datos reales. Esto no es un defecto puntual — es el estado actual de la tecnología.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2" style={{ color: "#92400E" }}>
                Qué significa en la práctica
              </h4>
              <ul className="text-sm leading-relaxed space-y-2" style={{ color: "rgba(146,64,14,0.8)" }}>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0" style={{ color: C.amber }}>â†’</span>
                  <span><strong>Cada bloque de código que generes necesita revisión.</strong> Ejecuta siempre el código antes de continuar al siguiente paso. Un error no detectado se multiplica hacia abajo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0" style={{ color: C.amber }}>â†’</span>
                  <span><strong>Los prompts son un punto de partida, no una respuesta definitiva.</strong> Adapta los resultados a tu entorno, a tu versión de las librerías y a tus datos reales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0" style={{ color: C.amber }}>â†’</span>
                  <span><strong>Los pasos de prueba (Capa 6) no son opcionales.</strong> Son el momento en que tú, como desarrollador, validas que lo construido funciona. Sin ellos, no hay app terminada.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0" style={{ color: C.amber }}>â†’</span>
                  <span><strong>El foro existe para esto.</strong> Cuando un paso no funcione como esperas, publicar tu versión con el problema concreto es la forma más rápida de avanzar.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl p-4" style={{ background: "rgba(217,119,6,0.10)", borderLeft: "3px solid " + C.amber }}>
              <p className="text-sm font-medium" style={{ color: "#92400E" }}>
                Una aplicación funcional creada con IA y revisada por un humano vale más que diez apps generadas y nunca probadas. El valor de esta ruta está en que tú la ejecutas, no en que alguien la ejecute por ti.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── VERSION EXTENSIONS (v2, v3 ideas) ───────────────────────────────────────
export function VersionExtensions({ versions }) {
  // versions: [{ tag, title, area, desc, changes: [str], badge }]
  const [open, setOpen] = useState(null);
  return (
    <div className="mt-14 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px flex-1" style={{ background: "rgba(17,17,17,0.08)" }} />
        <span className="text-[11px] font-semibold tracking-widest uppercase px-2"
          style={{ color: "rgba(17,17,17,0.35)" }}>Versiones y extensiones del proyecto</span>
        <div className="h-px flex-1" style={{ background: "rgba(17,17,17,0.08)" }} />
      </div>
      <p className="text-sm text-center mb-8" style={{ color: "rgba(17,17,17,0.45)" }}>
        Misma esencia, aplicada a otros contextos del área. šsalas como punto de partida para una segunda ronda.
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {versions.map((v, i) => (
          <div key={i} className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "rgba(17,17,17,0.10)", background: "white" }}>
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                  style={{ background: v.badgeBg || "rgba(59,111,212,0.10)", color: v.badgeColor || C.accent }}>
                  {v.tag}
                </span>
                <span className="text-[11px]" style={{ color: "rgba(17,17,17,0.40)" }}>{v.area}</span>
              </div>
              <h3 className="font-display text-[17px] mb-2" style={{ color: C.dark }}>{v.title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(17,17,17,0.55)" }}>{v.desc}</p>
            </div>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-3 border-t text-sm font-medium transition-colors hover:bg-black/[0.02]"
              style={{ borderColor: "rgba(17,17,17,0.08)", color: "rgba(17,17,17,0.5)" }}>
              {open === i ? "Ocultar cambios clave" : "Ver qué cambia"}
              <ChevronDown size={14} style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            {open === i && (
              <div className="px-5 pb-5 border-t" style={{ borderColor: "rgba(17,17,17,0.06)" }}>
                <ul className="mt-4 space-y-2">
                  {v.changes.map((c, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px]" style={{ color: "rgba(17,17,17,0.65)" }}>
                      <span className="shrink-0 mt-0.5" style={{ color: C.accent }}>·</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

