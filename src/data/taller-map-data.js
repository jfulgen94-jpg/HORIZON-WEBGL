export const MAP_NODES = [
  // ── Hubs principales ──
  { id: "inicio", label: "Inicio", type: "hero", section: "/", color: "#3B6FD4", scale: 1.5, pos: [0, 0, 0] },
  { id: "herramientas", label: "Herramientas", type: "hub", section: "/herramientas", color: "#F3F4F8", scale: 1.0, pos: [-4, 0, -2] },
  { id: "taller", label: "Taller", type: "hub", section: "/taller", color: "#F3F4F8", scale: 1.0, pos: [0, 0, -3] },
  { id: "biblioteca", label: "Biblioteca", type: "hub", section: "/biblioteca", color: "#F3F4F8", scale: 1.0, pos: [4, 0, -2] },
  { id: "comunidad", label: "Comunidad", type: "hub", section: "/comunidad", color: "#F3F4F8", scale: 0.8, pos: [6, 0, -4] },

  // ── 8 Laboratorios ──
  { id: "finanzas", label: "Finanzas", type: "lab", section: "/lab/finanzas", color: "#3B6FD4", scale: 0.7, pos: [-3, 0, -6] },
  { id: "medicina", label: "Medicina", type: "lab", section: "/lab/medicina", color: "#0D9488", scale: 0.7, pos: [-1.5, 0, -7] },
  { id: "contabilidad", label: "Contabilidad", type: "lab", section: "/lab/contabilidad", color: "#10B981", scale: 0.7, pos: [0, 0, -7.5] },
  { id: "matematicas", label: "Matemáticas", type: "lab", section: "/lab/matematicas", color: "#6366F1", scale: 0.7, pos: [1.5, 0, -7] },
  { id: "ingenieria", label: "Ingeniería", type: "lab", section: "/lab/ingenieria", color: "#F97316", scale: 0.7, pos: [3, 0, -6] },
  { id: "derecho", label: "Derecho", type: "lab", section: "/lab/derecho", color: "#B91C1C", scale: 0.7, pos: [-2, 0, -9] },
  { id: "diseno", label: "Diseño", type: "lab", section: "/lab/diseno", color: "#EC4899", scale: 0.7, pos: [0, 0, -9.5] },
  { id: "psicologia", label: "Psicología", type: "lab", section: "/lab/psicologia", color: "#D97706", scale: 0.7, pos: [2, 0, -9] },

  // ── Herramientas (hijos de Herramientas) ──
  { id: "ides", label: "IDEs", type: "tool", section: "/herramientas#ides", color: "#525A70", scale: 0.35, pos: [-5.5, 0, -3.5] },
  { id: "llms", label: "LLMs", type: "tool", section: "/herramientas#llms", color: "#525A70", scale: 0.35, pos: [-6, 0, -2] },
  { id: "saas", label: "SaaS", type: "tool", section: "/herramientas#saas", color: "#525A70", scale: 0.35, pos: [-5, 0, -1] },
  { id: "libs", label: "Librerías", type: "tool", section: "/herramientas#libs", color: "#525A70", scale: 0.35, pos: [-3.5, 0, -0.5] },
];

export const MAP_EDGES = [
  // Inicio → Hubs
  { source: "inicio", target: "herramientas" },
  { source: "inicio", target: "taller" },
  { source: "inicio", target: "biblioteca" },
  { source: "inicio", target: "comunidad" },

  // Herramientas → Tools
  { source: "herramientas", target: "ides" },
  { source: "herramientas", target: "llms" },
  { source: "herramientas", target: "saas" },
  { source: "herramientas", target: "libs" },

  // Taller → Labs
  { source: "taller", target: "finanzas" },
  { source: "taller", target: "medicina" },
  { source: "taller", target: "contabilidad" },
  { source: "taller", target: "matematicas" },
  { source: "taller", target: "ingenieria" },
  { source: "taller", target: "derecho" },
  { source: "taller", target: "diseno" },
  { source: "taller", target: "psicologia" },

  // Biblioteca → Comunidad (conexión lateral)
  { source: "biblioteca", target: "comunidad" },
];

// Colores por tipo de nodo
export const NODE_COLORS = {
  hero: "#3B6FD4",
  hub: "#F3F4F8",
  lab: null, // usa color del nodo
  tool: "#525A70",
};

// Configuración de la escena
export const SCENE_CONFIG = {
  camera: { fov: 50, near: 0.1, far: 100, position: [0, 8, 12] },
  ambient: { color: "#ffffff", intensity: 0.3 },
  directional: { color: "#ffffff", intensity: 0.8, position: [10, 15, 10] },
  background: "#0A0C10",
  fog: { color: "#0A0C10", near: 15, far: 35 },
};
