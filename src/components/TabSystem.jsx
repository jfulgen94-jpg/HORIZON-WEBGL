import { useState } from "react";
import clsx from "clsx";

/**
 * TabSystem — Sistema de pestañas reutilizable.
 *
 * Props:
 *   tabs     — Array de { id, label } (obligatorio)
 *   children — Contenido JSX, cada hijo debe tener data-tab-id={tab.id}
 *   accent   — Color hex del acento (opcional, default: var(--accent))
 *   variant  — "underline" (default) | "pills"
 *
 * Uso:
 *   <TabSystem tabs={[{ id: "proyectos", label: "Proyectos" }, ...]}>
 *     <div data-tab-id="proyectos">...</div>
 *     <div data-tab-id="benchmarks">...</div>
 *   </TabSystem>
 */

export default function TabSystem({
  tabs,
  children,
  accent = "var(--accent)",
  variant = "underline",
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div data-od-id="tab-system">
      {/* Tab navigation */}
      <div
        className={clsx(
          "flex gap-0.5 mb-8 overflow-x-auto",
          variant === "underline" && "border-b border-white/[0.08]"
        )}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-150",
              variant === "underline" && [
                "px-5 py-3.5 border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-current"
                  : "border-transparent text-white/40 hover:text-white/70",
              ],
              variant === "pills" && [
                "px-4 py-2 rounded-lg",
                activeTab === tab.id
                  ? "bg-accent-dim text-accent-light"
                  : "text-white/40 hover:text-white/70 hover:bg-[#232B3D]",
              ]
            )}
            style={
              activeTab === tab.id
                ? { color: accent, borderColor: accent }
                : undefined
            }
            data-od-id={`tab-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div role="tabpanel">
        {Array.isArray(children)
          ? children.map((child) => {
              if (!child?.props?.["data-tab-id"]) return null;
              return (
                <div
                  key={child.props["data-tab-id"]}
                  className={clsx(
                    "transition-all duration-200",
                    child.props["data-tab-id"] === activeTab
                      ? "block animate-fade-in"
                      : "hidden"
                  )}
                >
                  {child}
                </div>
              );
            })
          : children}
      </div>
    </div>
  );
}
