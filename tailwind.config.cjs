/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"DM Mono"', "Consolas", "monospace"],
      },
      colors: {
        // ── Fondos (DESIGN.md tokens) ──
        bg: "#0F1117",
        surface: "#161C27",
        "surface-2": "#1C2333",
        "surface-3": "#232B3D",

        // ── Texto ──
        fg: "#E8EAF0",
        muted: "rgba(232,234,240,0.55)",
        "muted-low": "rgba(232,234,240,0.35)",

        // ── Bordes ──
        border: "rgba(255,255,255,0.06)",
        "border-strong": "rgba(255,255,255,0.12)",

        // ── Acento primario Horizon ──
        accent: "#3B6FD4",
        "accent-hover": "#2D5AB8",
        "accent-light": "#6B95E8",
        "accent-dim": "rgba(59,111,212,0.12)",

        // ── Beige (header/footer) ──
        beige: "#F5F1E8",
        "beige-mid": "#EDE8DC",
        "beige-dark": "#E0D9CA",

        // ── Laboratorios (8 colores temáticos) ──
        lab: {
          finanzas: "#3B6FD4",
          medicina: "#0D9488",
          contabilidad: "#10B981",
          matematicas: "#6366F1",
          ingenieria: "#F97316",
          derecho: "#991B1B",
          diseno: "#EC4899",
          psicologia: "#D97706",
        },
      },
      boxShadow: {
        "accent-glow": "0 0 20px rgba(59,111,212,0.25)",
        card: "0 2px 12px rgba(0,0,0,0.35)",
        "card-hover":
          "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        drawer: "0 8px 48px rgba(0,0,0,0.6)",
        modal: "0 16px 64px rgba(0,0,0,0.7)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both",
        "fade-up-1":
          "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.08s both",
        "fade-up-2":
          "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.16s both",
        "fade-up-3":
          "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.24s both",
        "fade-up-4":
          "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.32s both",
        "fade-up-5":
          "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.40s both",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-down": "slide-down 0.25s ease-out both",
        "scale-in":
          "scale-in 0.3s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
