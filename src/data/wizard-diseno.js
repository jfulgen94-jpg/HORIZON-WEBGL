/**
 * WIZARD-DISENO.JS — Contenido y Lógica Especializada para el Asistente de Diseño & UX
 * Tareas DS1.1 a DS1.6, Design Tokens W3C, Accesibilidad WCAG 2.2, Animación FLIP, Usabilidad y QA de Diseño.
 */

/**
 * Tareas primarias expandidas de Diseño & UX con especificación de inputs, outputs y riesgos de usabilidad
 * NOTA: IDs canónicos DS1.1 a DS1.6 (prohibido DI1.x)
 */
export const DISENO_PRIMARY_TASKS = [
  {
    id: "DS1.1",
    label: "Arquitectura de Design Systems y Design Tokens W3C",
    shortDesc: "Jerarquía de tokens de 3 capas en formato DTCG JSON, compilación con Style Dictionary y componentes Atomic Design.",
    longDesc: "Infraestructura formal de sistemas de diseño que estructura tokens de diseño interoperables conforme al estándar oficial W3C DTCG (Design Tokens Community Group) en tres capas independientes: Tokens Globales/Primitivos, Tokens Semánticos/Alias y Tokens de Componente, orquestando su exportación automática mediante Style Dictionary hacia CSS Variables, Tailwind Config y TypeScript Types bajo la jerarquía de Atomic Design (Átomos, Moléculas y Organismos).",
    audience: "Design System Leads, Design Technologists, diseñadores UI y desarrolladores frontend.",
    requiredInputs: [
      "Valores de marca elementales: paleta cromática hexadecimal o en espacio OKLCH, familia tipográfica y escala base",
      "Formatos de exportación requeridos (CSS Custom Properties, SCSS, Tailwind v3/v4, JSON de Figma Tokens)",
      "Número de temas visuales a soportar simultáneamente (Light, Dark, High-Contrast)"
    ],
    generatedOutputs: [
      "Ficheros JSON de tokens normalizados con sintaxis '$value', '$type' y '$description' oficial W3C",
      "Fichero de configuración 'config.json' para el compilador de tokens Style Dictionary",
      "Mapeo de variables CSS en ':root' y selectores de tema '[data-theme=\"dark\"]' listos para producción",
      "Inventario estructurado de componentes UI bajo Atomic Design con contratos de interfaz y props"
    ],
    clinicalRisks: [
      "Hardcodear valores de color o espaciado directamente en componentes rompiendo la fuente única de verdad",
      "Crear dependencias circulares entre tokens de alias dificultando la conmutación limpia de temas",
      "Multiplicación caótica de tokens redundantes sin gobernanza provocando desalineación entre Figma y el código"
    ],
    complianceStandards: ["W3C DTCG Specification", "Atomic Design Methodology (Brad Frost)", "DesignOps Best Practices"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "DS1.2",
    label: "Auditoría e Implementación de Accesibilidad Web WCAG 2.2 (AA / AAA)",
    shortDesc: "Cálculo de contraste APCA, navegación exclusiva por teclado, foco no oscurecido y áreas táctiles (24x24 px).",
    longDesc: "Marco exhaustivo de auditoría y remediación de accesibilidad digital conforme a las Pautas de Accesibilidad para el Contenido Web (WCAG 2.2), evaluando el contraste formal (4.5:1 / 3:1) y el algoritmo perceptual APCA, garantizando la navegación completa por teclado sin trampas de foco, foco visible no oscurecido (criterio 2.4.11), tamaños de objetivo táctil mínimos de 24x24 px (criterio 2.5.8) y atributos WAI-ARIA semánticos.",
    audience: "Auditores de accesibilidad web (CPACC/WAS), diseñadores de producto inclusivo y evaluadores de conformidad legal.",
    requiredInputs: [
      "Capturas de pantalla de la interfaz, maqueta de Figma o árbol DOM en HTML/JSX",
      "Nivel de conformidad objetivo (Nivel AA para cumplimiento legal / Nivel AAA para excelencia)",
      "Pares de color texto-fondo y dimensiones físicas de los elementos interactivos"
    ],
    generatedOutputs: [
      "Matriz de contraste de color con cálculo de luminancia relativa L, ratio WCAG y valor Lc de APCA",
      "Protocolo de navegación por teclado: secuencia lógica de tabulación y estilos para ':focus-visible'",
      "Marcado HTML5 semántico con roles WAI-ARIA, 'aria-expanded', 'aria-live' y textos alternativos precisos",
      "Plan de remediación priorizado por severidad (Crítico, Serio, Moderado) con código de corrección directo"
    ],
    clinicalRisks: [
      "Uso abusivo e innecesario de atributos ARIA redundantes que interfieren negativamente con lectores de pantalla",
      "Eliminar el contorno de foco ('outline: none') sin proporcionar un sustituto visual de alto contraste",
      "Depender exclusivamente del color para transmitir estados de error o éxito excluyendo a usuarios daltónicos"
    ],
    complianceStandards: ["WCAG 2.2 (W3C Recommendation)", "EN 301 549 (Requisitos de accesibilidad TIC en Europa)", "Ley 11/2023"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "DS1.3",
    label: "Microinteracciones y Animación Frontend a 60 FPS (Física de Resortes & FLIP)",
    shortDesc: "Orquestación de aceleraciones Bézier, transiciones de layout compartido con técnica FLIP y reducción de movimiento.",
    longDesc: "Ingeniería de movimiento y microinteracciones para interfaces reactivas que transforman estados visuales estáticos en transiciones orgánicas fluidas a 60/120 FPS, parametrizando física de resortes (Spring Physics: mass, stiffness, damping), aplicando la técnica FLIP (First, Last, Invert, Play) para animar cambios de layout complejos exclusivamente mediante GPU (transform/opacity) y respetando 'prefers-reduced-motion'.",
    audience: "Ingenieros de animación frontend, diseñadores de interacción (IxD), desarrolladores UI y motion designers.",
    requiredInputs: [
      "Elemento diana a animar (modal emergente, tarjeta expandible, toggle interactivo, menú lateral)",
      "Intención del movimiento: feedback táctil inmediato (<150ms) vs transición de contexto espacial (250-400ms)",
      "Tecnología de destino (Framer Motion, CSS Animations puro o Web Animations API)"
    ],
    generatedOutputs: [
      "Constantes de aceleración con curvas 'cubic-bezier(x1, y1, x2, y2)' afinadas para desaceleración suave",
      "Componente interactivo en React / JavaScript nativo con implementación de la técnica FLIP",
      "Bloque CSS de adaptación obligatoria para la media query '@media (prefers-reduced-motion: reduce)'",
      "Plantilla de Skeleton Screen animado con efecto Shimmer continuo para reducción del tiempo percibido de carga"
    ],
    clinicalRisks: [
      "Animar propiedades geométricas pesadas ('width', 'height', 'top') provocando reflow y caídas de frames",
      "Animaciones excesivamente lentas (> 500 ms) que impacienten al usuario y ralenticen la operativa diaria",
      "Efectos cinéticos agresivos que induzcan mareo o desorientación vestibular en usuarios sensibles"
    ],
    complianceStandards: ["Criterio WCAG 2.2 2.3.3 (Animation from Interactions)", "Principio de Rendimiento RAIL de Google"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "DS1.4",
    label: "Arquitectura de Información y Flujos de Usuario (User Flows & Faceted Search)",
    shortDesc: "Diagramas de flujo en sintaxis Mermaid, validación con Tree Testing y experiencia de búsqueda facetada con URL sync.",
    longDesc: "Diseño de la estructura organizativa y navegación del producto digital que modela los caminos críticos del usuario desde el estado inicial hasta la conversión mediante diagramas Mermaid interactivos, valida la taxonomia mediante estudios de Card Sorting y Tree Testing, y define el sistema de búsqueda facetada avanzada con filtros combinados, pills activas y sincronización con parámetros URL.",
    audience: "Arquitectos de información, diseñadores UX estratégicos, investigadores de producto y product managers.",
    requiredInputs: [
      "Catálogo de contenidos, entidades de datos y volumen previsto de elementos a clasificar",
      "Tareas críticas de usuario a mapear (Onboarding, Búsqueda, Checkout, Configuración de cuenta)",
      "Dispositivos principales de interacción (Desktop con panel lateral vs Mobile con Drawer/Bottom Sheet)"
    ],
    generatedOutputs: [
      "Diagrama de flujo de usuario completo renderizable en Mermaid ('graph TD') con bifurcaciones y gestión de errores",
      "Árbol taxonómico jerárquico y facetado con inventario de etiquetas de contenido libres de jerga interna",
      "Especificación de componentes UX para filtrado múltiple, contadores dinámicos y persistencia en Query Parameters",
      "Guía de diseño para estados vacíos proactivos (Empty States) con ilustraciones contextualmente relevantes y CTAs"
    ],
    clinicalRisks: [
      "Estructurar la navegación según el organigrama interno de la empresa en lugar de los modelos mentales del usuario",
      "Filtros que no se actualizan en tiempo real o no reflejan el estado en la URL impidiendo compartir búsquedas",
      "Flujos de usuario con 'callejones sin salida' donde un error no ofrece una vía de escape o retroceso claro"
    ],
    complianceStandards: ["Metodología de Arquitectura de Información (Rosenfeld & Morville)", "Heurística 3 de Nielsen (Libertad y Control)"],
    recommendedModel: "Claude 3.7 Sonnet"
  },
  {
    id: "DS1.5",
    label: "Evaluación Heurística de Usabilidad y Medición Cuantitativa (Nielsen & SUS)",
    shortDesc: "Auditoría de las 10 Heurísticas de Nielsen con escala de severidad 0-4 y cálculo psicométrico del System Usability Scale.",
    longDesc: "Protocolo de evaluación formal de usabilidad que audita metódicamente cada pantalla del producto frente a las 10 Heurísticas de Jakob Nielsen, asignando grados de severidad objetivos de 0 a 4 a cada problema localizado, y estructurando el cuestionario psicométrico System Usability Scale (SUS) de 10 ítems para calcular la puntuación normalizada de usabilidad (0-100) y su percentil en la industria.",
    audience: "Investigadores UX (UX Researchers), evaluadores de usabilidad de producto y consultores de diseño.",
    requiredInputs: [
      "Recorrido funcional o capturas de las pantallas clave de la aplicación a auditar",
      "Datos de respuestas de usuarios a encuestas de usabilidad (matriz de respuestas en escala Likert 1 a 5)",
      "Perfil del usuario evaluador y contexto de uso del software"
    ],
    generatedOutputs: [
      "Informe de evaluación heurística en tabla Markdown [Pantalla, Heurística Violada, Severidad 0-4, Remediación]",
      "Script en Python para procesar lotes de encuestas SUS, calcular la puntuación media e intervalos de confianza",
      "Traducción de la puntuación SUS a adjetivos estandarizados (Aceptable, Bueno, Excelente) y percentil de mercado",
      "Matriz de priorización de intervenciones de diseño cruzando severidad del problema vs esfuerzo de desarrollo"
    ],
    clinicalRisks: [
      "Tratar la puntuación SUS como un porcentaje lineal en lugar de una escala percentil no lineal",
      "Realizar evaluaciones heurísticas superficiales sin conocer las tareas reales del usuario final",
      "Descartar problemas de severidad 1 o 2 que acumulados degradan significativamente la percepción de calidad"
    ],
    complianceStandards: ["10 Heurísticas de Usabilidad de Nielsen Norman Group", "Norma ISO 9241-11 (Eficacia, Eficiencia y Satisfacción)"],
    recommendedModel: "DeepSeek V4"
  },
  {
    id: "DS1.6",
    label: "Diseño Responsive y Adaptativo Moderno (CSS clamp() & Container Queries)",
    shortDesc: "Tipografía y espaciado fluidos continuos con clamp() y componentes verdaderamente modulares con @container.",
    longDesc: "Arquitectura CSS avanzada para interfaces elásticas y modulares que sustituye los saltos bruscos por media queries mediante fórmulas matemáticas continuas de interpolación con 'clamp(min, preferred, max)' para tipografía y espaciado fluidos entre 375px y 1440px, e implementa CSS Container Queries ('@container') para que los componentes adapten su layout en función del ancho de su contenedor padre.",
    audience: "Desarrolladores frontend, ingenieros CSS, diseñadores de UI responsive y arquitectos web.",
    requiredInputs: [
      "Rango de resoluciones de pantalla de diseño (viewport mínimo W_min y máximo W_max)",
      "Escala tipográfica en móvil (tamaños mínimos) y en escritorio (tamaños máximos)",
      "Componentes modulares destinados a reutilizarse en múltiples ubicaciones espaciales (Sidebar vs Main Content)"
    ],
    generatedOutputs: [
      "Escala completa de variables CSS fluidas con sintaxis matemática 'clamp()' calculada analíticamente",
      "Código CSS de componentes modulares utilizando 'container-type: inline-size' y reglas '@container'",
      "Demostración interactiva de cómo el mismo componente conmuta de diseño vertical a horizontal según su contenedor",
      "Estrategia de compatibilidad y fallbacks elegantes para entornos sin soporte nativo de container queries"
    ],
    clinicalRisks: [
      "Falta de tope superior en fórmulas fluidas provocando fuentes astronómicamente gigantescas en pantallas 4K",
      "Declarar 'container-type: size' en lugar de 'inline-size' provocando colapso de la altura del contenedor padre a cero",
      "Diseñar exclusivamente para tamaños de viewport estándar ignorando ventanas redimensionadas o modos multitarea"
    ],
    complianceStandards: ["Especificación W3C CSS Container Queries Level 3", "W3C CSS Values and Units Level 4"],
    recommendedModel: "Claude 3.7 Sonnet"
  }
];

/**
 * Preguntas de diagnóstico técnico especializadas en Diseño & UX (3 a 5 preguntas de impacto real)
 */
export const DISENO_DIAGNOSTIC_QUESTIONS = [
  {
    id: "dis_accessibility_level",
    title: "Nivel de Conformidad de Accesibilidad Web (WCAG 2.2 / EN 301 549)",
    context: "El nivel de accesibilidad define los requerimientos legales de contraste, áreas táctiles y soporte de lectores de pantalla.",
    options: [
      {
        id: "wcag_aa_legal",
        label: "Nivel AA (Estándar Legal Obligatorio en la UE - Ley 11/2023)",
        impact: "Contraste mínimo 4.5:1 (texto normal) y 3:1 (texto grande e interfaz), áreas táctiles >= 24x24 px y navegación por teclado sin trampas.",
        recommendation: "Configurar verificaciones automáticas en CI/CD con axe-core; asegurar que el anillo de foco ':focus-visible' sea nítido y de alto contraste."
      },
      {
        id: "wcag_aaa_excellence",
        label: "Nivel AAA (Excelencia Inclusiva y Baja Visión)",
        impact: "Contraste ultra-reforzado 7:1, áreas táctiles >= 44x44 px, explicación de tecnicismos y soporte reforzado de neurodiversidad.",
        recommendation: "Paletas en espacio OKLCH ajustadas manualmente; diseñar layouts holgados que soporten zoom de texto al 200% sin truncamientos."
      },
      {
        id: "apca_perceptual",
        label: "Algoritmo Perceptual Avanzado APCA (Próximo WCAG 3.0)",
        impact: "Evalúa el contraste basado en la percepción del ojo humano, peso tipográfico y luminosidad de fondo en lugar de fórmulas matemáticas planas.",
        recommendation: "Utilizar herramientas de cálculo APCA (Lc >= 60 para cuerpo de texto) para evitar penalizaciones injustas en temas oscuros."
      }
    ]
  },
  {
    id: "dis_token_architecture",
    title: "Arquitectura de Design Tokens y Gestión de Temas",
    context: "La estructura de los tokens condiciona la escalabilidad del sistema, el soporte multi-marca y la sincronización con Figma.",
    options: [
      {
        id: "dtcg_three_tier",
        label: "Tokens W3C DTCG de 3 Capas (Global -> Semántico -> Componente)",
        impact: "Permite cambiar paletas de marca o conmutar de tema claro a oscuro alterando solo la capa semántica sin tocar componentes.",
        recommendation: "Compilar con Style Dictionary hacia variables CSS en ':root' y selectores '[data-theme=\"dark\"]' tipados con TypeScript."
      },
      {
        id: "tailwind_config_vars",
        label: "Configuración Tailwind CSS con Variables CSS Nativas",
        impact: "Máxima velocidad de desarrollo frontend con clases de utilidad ('bg-surface', 'text-primary') enlazadas a variables CSS.",
        recommendation: "Definir variables CSS en HSL o OKLCH en el CSS global y mapearlas en 'tailwind.config.js' usando sintaxis de opacidad dinámica."
      },
      {
        id: "inline_component_tokens",
        label: "Variables CSS Ligeras en :root sin Herramientas de Compilación",
        impact: "Solución minimalista sin dependencias de Node ni pasos de build. Ideal para proyectos web rápidos o monolitos HTML/CSS.",
        recommendation: "Estructurar un fichero 'tokens.css' limpio con nombres BEM semánticos ('--color-brand-primary', '--space-md')."
      }
    ]
  },
  {
    id: "dis_motion_philosophy",
    title: "Ingeniería de Movimiento y Animación de Interfaz",
    context: "El movimiento debe enriquecer la comprensión espacial sin degradar los 60 FPS ni causar fatiga vestibular.",
    options: [
      {
        id: "pure_css_gpu",
        label: "Microinteracciones en CSS Puro Aceleradas por GPU (transform/opacity)",
        impact: "Cero impacto en el hilo principal de JavaScript; transiciones a 60-120 FPS con curvas cúbicas de desaceleración suave.",
        recommendation: "Usar 'transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease'; prohibir animar 'width', 'height' o 'top'."
      },
      {
        id: "spring_physics_framer",
        label: "Física de Resortes Orgánica y Layout FLIP (Framer Motion / Web Animations)",
        impact: "Animaciones naturales e interrumpibles que reaccionan con masa y amortiguación ante gestos táctiles y cambios de orden en listas.",
        recommendation: "Implementar 'layoutId' de Framer Motion para transiciones compartidas; incluir siempre media query 'prefers-reduced-motion'."
      },
      {
        id: "calm_accessible_motion",
        label: "Diseño Sosegado con Movimiento Mínimo (Calm Tech)",
        impact: "Cero distracciones visuales; solo transiciones discretas de opacidad (< 150 ms) para usuarios profesionales de alta concentración.",
        recommendation: "Configurar tiempos de transición ultrarrápidos (100-150 ms) y reemplazar animaciones cinéticas por cambios de color de borde sutiles."
      }
    ]
  },
  {
    id: "dis_component_paradigm",
    title: "Paradigma de Componentes y Diseño Responsive",
    context: "Define cómo se adaptan los componentes a diferentes anchos de pantalla y contextos de anidamiento.",
    options: [
      {
        id: "container_queries_fluid",
        label: "CSS Container Queries (@container) + Tipografía Fluida con clamp()",
        impact: "Los componentes responden al ancho de su contenedor inmediato, no al viewport de la ventana. Modularidad absoluta.",
        recommendation: "Declarar 'container-type: inline-size' en el layout y usar fórmulas 'clamp(1rem, 0.8rem + 1vw, 1.5rem)' para escalado continuo."
      },
      {
        id: "breakpoint_media_queries",
        label: "Media Queries Estándar por Viewport (@media min-width)",
        impact: "Paradigma clásico basado en puntos de corte fijos de dispositivo (Mobile 640px, Tablet 768px, Desktop 1024px).",
        recommendation: "Enfoque Mobile-First estricto con reglas de adición progresiva; evitar el uso de 'max-width' para no crear solapamientos."
      },
      {
        id: "atomic_storybook_lib",
        label: "Biblioteca de Componentes Aislados bajo Atomic Design en Storybook",
        impact: "Desarrollo y testeo de cada átomo, molécula y organismo en aislamiento antes de integrarlo en las páginas finales.",
        recommendation: "Montar Storybook con addons de accesibilidad (@storybook/addon-a11y) y conmutador interactivo de temas claro/oscuro."
      }
    ]
  }
];

/**
 * 3 Templates de proyecto completos por área (Diseño & UX)
 */
export const DISENO_PROJECT_TEMPLATES = [
  {
    id: "template-design-tokens-w3c",
    name: "Arquitectura de Design Tokens W3C y Style Dictionary Multiplataforma",
    desc: "Infraestructura completa de tokens en formato DTCG JSON con pipeline automatizado de compilación hacia CSS, SCSS y Tailwind.",
    techStack: [
      { name: "Node.js / TypeScript", role: "Entorno de compilación y orquestación de tokens" },
      { name: "Style Dictionary v4", role: "Compilador de tokens multiplataforma con transformadores personalizados" },
      { name: "Tokens Studio for Figma", role: "Sincronización bidireccional entre diseño en Figma y repositorio git" },
      { name: "Vitest", role: "Pruebas unitarias de integridad de tokens y ausencia de referencias rotas" }
    ],
    folderStructure: `design_tokens_engine/
├── tokens/
│   ├── global/              # Tokens primitivos de color (OKLCH), escala modular y tipografía
│   │   ├── color.json
│   │   └── spacing.json
│   ├── semantic/            # Tokens de alias con significado funcional (Light & Dark)
│   │   ├── light.json
│   │   └── dark.json
│   └── component/           # Tokens específicos (button, modal, input)
│       └── button.json
├── build/
│   ├── css/                 # Variables CSS generadas (:root y [data-theme])
│   └── tailwind/            # Configuración generada para tailwind.config.js
├── src/
│   └── config.js            # Configuración de Style Dictionary con transforms OKLCH
├── package.json
└── README.md`,
    dependencies: ["style-dictionary>=4.2.0", "typescript>=5.6.0", "vitest>=2.1.0"],
    envVars: ["TOKENS_SOURCE_DIR=./tokens", "BUILD_TARGET=css,tailwind", "COLOR_SPACE=OKLCH"],
    firstStep: "Instalar dependencias con 'npm install' y ejecutar 'npm run build-tokens' para compilar la jerarquía JSON en variables CSS de producción."
  },
  {
    id: "template-accessibility-auditor",
    name: "Suite de Auditoría y Remediación de Accesibilidad WCAG 2.2 (AA / AAA)",
    desc: "Plataforma de análisis estático y dinámico de accesibilidad con axe-core, pruebas de contraste APCA y navegación por teclado.",
    techStack: [
      { name: "TypeScript / Node.js", role: "Motor de análisis y aserciones" },
      { name: "@axe-core/playwright", role: "Auditoría automatizada de árbol de accesibilidad en navegadores reales" },
      { name: "Radix UI / React", role: "Componentes primitivos accesibles sin estilos (Headless UI)" },
      { name: "Storybook a11y", role: "Visualización interactiva de violaciones de accesibilidad componente a componente" }
    ],
    folderStructure: `a11y_wcag_suite/
├── tests/
│   ├── navigation.spec.ts   # Prueba de tabulación por teclado y trampas de foco
│   └── contrast.spec.ts     # Aserciones de contraste mínimo 4.5:1 / 3:1
├── src/
│   ├── evaluators/
│   │   ├── apca_calculator.ts# Algoritmo de contraste perceptual APCA
│   │   └── target_size.ts   # Medición de área táctil de pulsación (24x24 px)
│   ├── remediation/
│   │   └── focus_styles.css # Estilos accesibles universales para :focus-visible
│   └── reporter.ts          # Generador de informe ejecutivo de conformidad WCAG
├── package.json
└── playwright.config.ts`,
    dependencies: ["@axe-core/playwright>=4.10.0", "@playwright/test>=1.48.0", "typescript>=5.6.0"],
    envVars: ["WCAG_TARGET_LEVEL=AA", "MIN_TOUCH_TARGET_PX=24", "FAIL_ON_SERIOUS=true"],
    firstStep: "Ejecutar 'npx playwright test' para lanzar el escáner de accesibilidad sobre las vistas clave del producto y generar el informe de violaciones."
  },
  {
    id: "template-fluid-container-ui",
    name: "Sistema de Componentes Fluidos con Container Queries y clamp()",
    desc: "Biblioteca de componentes frontend reactivos que adaptan su layout modularmente al contenedor padre sin depender del viewport.",
    techStack: [
      { name: "HTML5 / Vanilla CSS", role: "Implementación nativa de estándares W3C modernos" },
      { name: "CSS Container Queries", role: "Modularidad espacial de componentes con @container inline-size" },
      { name: "Fórmulas clamp()", role: "Escalado matemático continuo de tipografía y espaciado" },
      { name: "Vite", role: "Entorno de desarrollo ultrarrápido con Hot Module Replacement (HMR)" }
    ],
    folderStructure: `fluid_container_ui/
├── src/
│   ├── styles/
│   │   ├── fluid_type.css   # Escala tipográfica continua calculada analíticamente
│   │   └── reset.css        # Reset moderno con box-sizing y focus-visible
│   ├── components/
│   │   ├── card/            # Tarjeta que pasa de vertical a horizontal según @container
│   │   │   ├── card.html
│   │   │   └── card.css
│   │   └── nav/
│   │       └── nav.css
│   └── index.html           # Demostración interactiva de componentes redimensionables
├── package.json
└── vite.config.js`,
    dependencies: ["vite>=6.0.0"],
    envVars: ["VIEWPORT_MIN_PX=375", "VIEWPORT_MAX_PX=1440", "BASE_FONT_PX=16"],
    firstStep: "Ejecutar 'npm run dev' para abrir la galería interactiva en el navegador y comprobar cómo las tarjetas se adaptan fluidamente al redimensionar su panel."
  }
];

/**
 * Checklist de Aseguramiento de Calidad (QA) y Pre-Despliegue Específico de Diseño & UX (12-15 puntos)
 */
export const DISENO_DEPLOYMENT_CHECKLIST = [
  {
    category: "Accesibilidad e Inclusión Legal (WCAG 2.2 / EN 301 549)",
    items: [
      "Ratio de contraste verificado: asegurar que todo texto normal cumple el ratio mínimo de 4.5:1 frente al fondo en temas claro y oscuro.",
      "Indicador de foco visible: comprobar que el anillo de foco tiene al menos 2px de grosor y contraste >= 3:1 respecto a elementos contiguos.",
      "Prueba de tamaño de objetivo táctil: verificar que todos los botones e iconos interactivos tienen al menos 24x24 px de área de pulsación.",
      "Comprobación de foco no oscurecido (WCAG 2.4.11): asegurar que modales o barras fijas inferiores no tapan el elemento que tiene el foco activo.",
      "Navegación exclusiva por teclado: comprobar que se puede completar el 100% de los flujos del producto usando solo la tecla Tab y Enter/Espacio."
    ]
  },
  {
    category: "Seguridad, Privacidad y Prevención de Patrones Oscuros",
    items: [
      "Ausencia de patrones oscuros (Dark Patterns): verificar que las opciones de rechazo tienen igual peso visual que las de aceptación (simetría de elección).",
      "Panel de gestión de cookies y consentimiento plenamente accesible por teclado y con lectura clara para screen readers.",
      "Mensajes de error empáticos y claros en formularios: indicar con precisión qué campo falló y cómo solucionarlo sin tecnicismos."
    ]
  },
  {
    category: "Rendimiento Frontend y Ergonomía Visual",
    items: [
      "Comprobación de 60 FPS en animaciones: verificar que solo se animan propiedades 'transform' y 'opacity' sin provocar reflow del layout.",
      "Prueba de movimiento reducido: comprobar que con 'prefers-reduced-motion: reduce' activado las transiciones se convierten en desvanecimientos sutiles.",
      "Prevención de FOUC: comprobar que el script de sincronización de tema en el <head> evita parpadeos de color durante la carga.",
      "Optimización de fuentes web: uso de 'font-display: swap' y precarga de fuentes críticas WOFF2 para evitar saltos de layout (CLS < 0.1)."
    ]
  },
  {
    category: "Precisión de Design Tokens y Coherencia UI",
    items: [
      "Gobernanza de tokens: comprobar ausencia total de valores de color o espaciado en píxeles hardcodeados en el código de componentes.",
      "Escalado fluido seguro: verificar que las fórmulas clamp() tienen límites máximos estrictos para no desbordar en monitores ultrawide o 4K."
    ]
  }
];

/**
 * Presets de configuración rápida para Diseño & UX (MVP, Producción, Enterprise)
 */
export const DISENO_PRESETS = [
  {
    id: "mvp",
    name: "Nivel 1: Landing Page / Prototipo UI Rápido con Tokens Esenciales",
    description: "Ideal para validación rápida de conceptos, pruebas de usuario con wireframes interactivos y MVPs de producto.",
    recommendedConfig: {
      tokenArchitecture: "Variables CSS en :root sin herramientas de build complejas",
      a11yTarget: "WCAG 2.2 Nivel AA básico (Contraste y foco)",
      motionLevel: "Transiciones CSS puras rápidas (150-200 ms)",
      uiFramework: "Tailwind CSS o CSS Modules con componentes ligeros",
      primaryModel: "DeepSeek V4 (Económico, código CSS/Tailwind limpio y reactivo)"
    },
    estimatedApiCostMonthly: "0 € - 20 € / mes",
    estimatedDevTime: "1 a 2 semanas (40 - 80 horas de diseño y frontend)"
  },
  {
    id: "produccion",
    name: "Nivel 2: Sistema de Diseño Profesional Multi-Tema (Light/Dark/A11y)",
    description: "Para productos SaaS consolidados, aplicaciones web de alta interacción y equipos con múltiples desarrolladores frontend.",
    recommendedConfig: {
      tokenArchitecture: "Tokens W3C DTCG de 3 capas compilados con Style Dictionary",
      a11yTarget: "WCAG 2.2 Nivel AA completo con suite automatizada axe-core en CI/CD",
      motionLevel: "Física de resortes interactiva y transiciones FLIP respetando accesibilidad",
      uiFramework: "React con componentes headless accesibles (Radix UI) y Storybook",
      primaryModel: "Claude 3.7 Sonnet (Máxima sensibilidad estética, ergonomía y accesibilidad)"
    },
    estimatedApiCostMonthly: "50 € - 140 € / mes",
    estimatedDevTime: "3 a 6 semanas (120 - 240 horas de ingeniería de diseño)"
  },
  {
    id: "enterprise",
    name: "Nivel 3: Design System Corporativo Global Multi-Marca (Multi-Brand)",
    description: "Para grandes organizaciones con múltiples marcas comerciales, aplicaciones nativas (iOS, Android, Web) y estricto cumplimiento legal.",
    recommendedConfig: {
      tokenArchitecture: "Pipeline distribuido de tokens sincronizado bidireccionalmente con Figma",
      a11yTarget: "WCAG 2.2 Nivel AAA en flujos críticos con certificación formal EN 301 549",
      motionLevel: "Sistema de movimiento de marca con microinteracciones auditadas y perfiles hápticos",
      uiFramework: "Design System como paquete npm versionado con catálogo Storybook público",
      primaryModel: "Modelos privados con guardrails de marca y pruebas de regresión visual automatizadas"
    },
    estimatedApiCostMonthly: "> 300 € / mes",
    estimatedDevTime: "8 a 16 semanas (320 - 640 horas de diseño y DesignOps)"
  }
];

/**
 * Tareas secundarias contextuales de Diseño & UX
 */
export const DISENO_SECONDARY_TASKS = [
  {
    id: "SEC-DIS-01",
    label: "Generador de Paletas en Espacios Perceptuales OKLCH",
    desc: "Cálculo de escalas cromáticas de 10 pasos con luminosidad constante y croma equilibrado para UI limpia."
  },
  {
    id: "SEC-DIS-02",
    label: "Matriz de UX Writing y Microcopy para Mensajes de Error",
    desc: "Redacción empática, concisa y orientada a la solución para campos de formulario, botones CTA y diálogos."
  },
  {
    id: "SEC-DIS-03",
    label: "Pista de Historial de Tokens y Decisiones de Diseño en DuckDB",
    desc: "Registro inmutable con timestamp UTC de versiones de tokens de diseño, aprobaciones de estilos y cambios de paleta."
  },
  {
    id: "SEC-DIS-04",
    label: "Persistencia Columnar Local y Modo Offline de Assets",
    desc: "Almacenamiento local optimizado de librerías de iconos SVG, especificaciones de componentes y reportes de accesibilidad."
  },
  {
    id: "SEC-DIS-05",
    label: "Exportador a Formatos Estándar (Tailwind, CSS Variables, Figma JSON)",
    desc: "Generación directa de archivos listos para importar en proyectos frontend o en Tokens Studio for Figma."
  },
  {
    id: "SEC-DIS-06",
    label: "Auditoría de Accesibilidad Cognitiva y Neurodiversidad (TDAH / Dislexia)",
    desc: "Adaptación de jerarquías, interlineados generosos y reducción de sobrecarga sensorial según directrices W3C COGA."
  },
  {
    id: "SEC-DIS-07",
    label: "Suite de Pruebas Automatizadas con axe-core y Playwright",
    desc: "Tests de regresión de accesibilidad integrables en CI/CD que fallan la compilación ante violaciones graves de WCAG."
  },
  {
    id: "SEC-DIS-08",
    label: "Biblioteca de Componentes y Tokens DEMO para Modo Offline",
    desc: "Conjunto completo de 20 componentes preconfigurados con tokens de tema claro/oscuro listos para probar sin internet."
  }
];

/**
 * Reglas de branching condicional para el Wizard de Diseño & UX
 * NOTA: IDs canónicos DS1.1 a DS1.6 (prohibido DI1.x)
 */
export const DISENO_BRANCHING_RULES = [
  {
    id: "BR-DIS-01",
    condition: (answers) => answers.primaryTask === "DS1.1",
    action: "Activar arquitectura de tokens DTCG W3C; habilitar configuración de Style Dictionary; generar tokens para modo claro y oscuro."
  },
  {
    id: "BR-DIS-02",
    condition: (answers) => answers.primaryTask === "DS1.2",
    action: "Activar motor de auditoría de contraste WCAG 2.2 / APCA; forzar comprobación de objetivos táctiles de 24x24 px."
  },
  {
    id: "BR-DIS-03",
    condition: (answers) => answers.primaryTask === "DS1.3",
    action: "Integrar física de resortes y técnica FLIP; exigir inclusión obligatoria de la media query prefers-reduced-motion."
  },
  {
    id: "BR-DIS-04",
    condition: (answers) => answers.primaryTask === "DS1.6",
    action: "Habilitar cálculo matemático de CSS clamp() para tipografía fluida; activar reglas @container para componentes modulares."
  },
  {
    id: "BR-DIS-05",
    condition: (answers) => answers.secondaryTasks?.includes("SEC-DIS-07") || answers.primaryTask === "DS1.2",
    action: "Integrar suite de testing automatizado con @axe-core/playwright; incluir aserciones contra violaciones serias o críticas."
  }
];

/**
 * Generador de PRD (Product Requirements Document) especializado en Diseño & UX
 * @param {Object} data - Datos recopilados en el Wizard
 * @returns {string} Documento PRD completo en Markdown
 */
export function generateDisenoPRD(data = {}) {
  const now = new Date().toISOString().split("T")[0];
  const primary = DISENO_PRIMARY_TASKS.find(t => t.id === data.primaryTask) || DISENO_PRIMARY_TASKS[0];

  const secondaryList = (data.secondaryTasks || [])
    .map(id => DISENO_SECONDARY_TASKS.find(s => s.id === id))
    .filter(Boolean);

  return `# ESPECIFICACIÓN TÉCNICA Y DE REQUISITOS DE DISEÑO & UX (PRD)
## Producto Digital: ${data.appName || "Horizon Design System & UI"}

**Fecha de Generación:** ${now}  
**Área Horizon:** Diseño de Interfaces, UX & Accesibilidad  
**Tarea Primaria Identificada:** ${primary.id} — ${primary.label}  
**Versión Documental:** v1.0.0 (Especificación de Grado de Diseño Profesional)  

---

### 1. Resumen Ejecutivo y Visión del Producto
- **Tarea Primaria (${primary.id}):** ${primary.label}
- **Descripción Operativa:** ${primary.longDesc}
- **Público Objetivo:** ${primary.audience}
- **Compromiso de Accesibilidad e Inclusión:** Cumplimiento de las directrices WCAG 2.2 y estándar europeo EN 301 549.

---

### 2. Entradas, Salidas y Riesgos de Usabilidad
#### Entradas Requeridas (Inputs):
${primary.requiredInputs.map(i => `- ${i}`).join("\n")}

#### Salidas Generadas (Outputs):
${primary.generatedOutputs.map(o => `- ${o}`).join("\n")}

#### Riesgos de Experiencia de Usuario Mapeados:
${primary.clinicalRisks?.map(r => `- **Riesgo:** ${r}\n  - *Mitigación:* Verificación con auditorías automáticas de accesibilidad y pruebas de usuario.`).join("\n") || "- Mitigación mediante auditorías heurísticas continuas."}

---

### 3. Tareas Secundarias de Soporte y Gobernanza de Tokens
${secondaryList.map(s => `- **${s.id} — ${s.label}:** ${s.desc}`).join("\n") || "- Operativa estándar con tokens de diseño W3C y verificación de contraste."}

---

### 4. Arquitectura Técnica y Estándares de Diseño
- **Framework de Interfaz:** ${data.uiFramework || "React / Next.js con Tailwind CSS y variables nativas"}
- **Arquitectura de Tokens:** ${data.tokenArchitecture || "Tokens W3C DTCG de 3 capas con Style Dictionary"}
- **Conformidad de Accesibilidad:** ${data.a11yTarget || "WCAG 2.2 Nivel AA"}
- **Paradigma de Movimiento:** Microinteracciones a 60 FPS con soporte estricto de prefers-reduced-motion.
- **Modo Offline:** ${data.hasDemoDataset ? "Activado con catálogo de 20 componentes y tokens DEMO precargados." : "Requiere sincronización con Figma Tokens API."}

---

### 5. Guardrails de Accesibilidad y Buenas Prácticas
1. **Contraste de Color Innegociable:** Bloqueo de combinaciones de color texto-fondo con ratio inferior a 4.5:1 (AA).
2. **Foco Visible no Negociable:** Prohibición estricta de 'outline: none' sin sustituto visual de alto contraste.
3. **Respeto a la Reducción de Movimiento:** Inclusión obligatoria de la media query prefers-reduced-motion en toda animación.
4. **Prohibición de Patrones Oscuros:** Simetría formal absoluta entre opciones de aceptación y rechazo.

---

### 6. Checklist de Validación y Aseguramiento de Calidad de Diseño (QA)
${DISENO_DEPLOYMENT_CHECKLIST.map(cat => `#### ${cat.category}:\n` + cat.items.map(i => `- [ ] ${i}`).join("\n")).join("\n\n")}

---
*Documento compilado automáticamente por el motor de especificación técnica de Horizon v3.*`;
}

/** Alias de compatibilidad para verificación QA **/
export const DISENO_QA_CHECKLIST = DISENO_DEPLOYMENT_CHECKLIST;
