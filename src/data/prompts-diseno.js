/**
 * PROMPTS-DISENO.JS — Biblioteca de Prompts Especializados en Diseño & UX/UI
 * Área: Diseño & UX/UI
 * Tareas: Genéricos, DS1.1 a DS1.6 y Tareas Secundarias
 */

export const DISENO_CATEGORIES = [
  {
    id: "genericos",
    name: "Genéricos por App Type",
    prompts: [
      {
        id: "dis-001",
        title: "Especificación de Diseño de Producto Digital y Product Design Document (PDD)",
        desc: "Define principios rectores de diseño, objetivos de experiencia, métricas de éxito y modelo mental del usuario.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Principal Product Designer y Director de Experiencia de Usuario (Head of UX).
[COPIA AQUI TU IDEA]

Redacta el Product Design Document (PDD) formal y marco estrategico de diseno para el producto digital:
1. Declaracion de proposito de experiencia: definicion del modelo mental del usuario y propuesta de valor tangible en la interaccion.
2. Principios rectores de diseno inquebrantables (ej: 'Claridad sobre densidad', 'Velocidad perceptual sobre ornamentacion', 'Accesibilidad por defecto').
3. Identificacion de Arquetipos de Usuario y Jobs-to-be-Done (JTBD): tareas nucleares que el usuario busca resolver, dolores criticos actuales (Pains) y beneficios esperados (Gains).
4. Metricas clave de exito de UX cuantificables: Task Success Rate (TSR > 92%), Time on Task (reduccion del 40%), System Usability Scale (SUS > 82) y Net Promoter Score (NPS).
5. Alcance de plataformas y restricciones de contexto: navegadores soportados, condiciones de uso bajo baja conectividad o pantallas de alta resolucion Retina/HiDPI.

Restricciones:
- No utilices declaraciones genericas o de marketing vacio; cada principio debe traducirse en directrices directas de interfaz.

Formato de salida: Documento PDD estructurado en Markdown con tablas de casos de uso y matriz de objetivos vs metricas.`,
        tags: ["pdd", "product-design", "jtbd", "estrategia-ux", "métricas"]
      },
      {
        id: "dis-002",
        title: "Arquitectura de Design System y Jerarquía de Componentes",
        desc: "Estructura la taxonomía bajo Atomic Design (Átomos, Moléculas, Organismos) y gobernanza de tokens.",
        model: "DeepSeek V4",
        prompt: `Eres un Arquitecto de Sistemas de Diseno (Design System Lead) y Especialista en Componentes Frontend.
[COPIA AQUI TU IDEA]

Disena la arquitectura jerarquica del Design System corporativo siguiendo la metodologia Atomic Design:
1. Nivel 0 - Design Tokens: valores primitivos (colores, curvas de animacion, escala tipografica, elevaciones, espaciado).
2. Nivel 1 - Atomos: elementos indivisibles (botones, inputs de formulario, badges, avatares, iconos, spinners de carga).
3. Nivel 2 - Moleculas: agrupaciones de atomos funcionales (barra de busqueda con boton integrado, campo de formulario con etiqueta y mensaje de validacion, tarjetas de resumen simples).
4. Nivel 3 - Organismos: secciones complejas de interfaz (encabezado global, tabla de datos con filtros interactivos, modal de confirmacion con pasos, panel lateral de navegacion).
5. Nivel 4 - Plantillas y Paginas: layouts estructurales y vistas reales con datos inyectados.
6. Modelo de gobernanza del sistema: protocolo para proponer, evaluar, versionar y publicar nuevos componentes mediante control de versiones semantico (SemVer).

Restricciones:
- Garantiza que cada componente cumpla con encapsulacion de estilos y no dependa de contexto global no parametrizado.

Formato de salida: Taxonomia completa del sistema en Markdown con arbol jerarquico de componentes y reglas de contribucion.`,
        tags: ["design-system", "atomic-design", "arquitectura-ui", "componentes", "gobernanza"]
      },
      {
        id: "dis-003",
        title: "Selección de Tech Stack de Diseño, CSS y Prototipado Interactivo",
        desc: "Evalúa herramientas de diseño en código (Vanilla CSS vs Tailwind v4, Style Dictionary, Storybook).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Lead Frontend & Design Systems Engineer evaluando la infraestructura tecnologica de diseno.
[COPIA AQUI TU IDEA]

Justifica la seleccion del stack tecnologico de diseno y estilizacion para el proyecto:
1. Paradigma de estilos CSS: Vanilla CSS con Variables Nativas y Container Queries vs Tailwind CSS v4 vs CSS Modules / Styled Components (analisis de rendimiento en tiempo de ejecucion, tamano de bundle y mantenibilidad).
2. Motor de transformacion de Design Tokens: evaluacion de Style Dictionary para compilar tokens universales JSON a CSS, SCSS, Swift (iOS), Kotlin (Android) y variables de Figma.
3. Entorno de documentacion viva e interactiva: configuracion de Storybook 8 con addons de accesibilidad (axe-core), viewport responsivo y controles interactivos.
4. Framework de animaciones e interaccion: CSS Animations nativas + Web Animations API vs Framer Motion para orquestaciones declarativas.
5. Estrategia de distribucion y consumo: paquete NPM privado con TypeScript, definicion de tipos estricta y tree-shaking garantizado.

Restricciones:
- Prioriza soluciones que minimicen el coste de computacion de CSS en tiempo de renderizado y aseguren 0 dependencia de frameworks obsoletos.

Formato de salida: Matriz comparativa de tecnologias en Markdown con justificacion de la suite elegida y mapa de dependencias.`,
        tags: ["tech-stack-css", "style-dictionary", "storybook", "tokens", "rendimiento-frontend"]
      },
      {
        id: "dis-004",
        title: "Diseño de Interfaz con Canvas, Árbol de Tokens y Vista Previa en Vivo",
        desc: "Diseña un explorador interactivo de design tokens con edición en vivo, testeo de contraste y exportación.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador de Herramientas de Desarrollo (DevTools) y Especialista en UI de Sistemas de Diseno.
[COPIA AQUI TU IDEA]

Disena la experiencia de interfaz para un visor y editor interactivo de Design Tokens:
1. Panel izquierdo de exploracion: arbol jerarquico de tokens categorizado por Dominio (Color, Tipografia, Espaciado, Sombras, Radios de borde, Animaciones).
2. Area central de previsualizacion en vivo (Canvas): componentes reales renderizandose reactivamente ante cualquier cambio de valor del token en caliente.
3. Panel de inspeccion de accesibilidad en tiempo real: calculo instantaneo de ratio de contraste APCA y WCAG 2.2 al modificar colores de fondo o texto, emitiendo alertas visuales.
4. Conmutador de modo: alternancia instantanea entre Modo Claro, Modo Oscuro y Modo de Alto Contraste para comprobar la persistencia semantica de las variables.
5. Barra de exportacion rapida: boton de copia en un clic a formato CSS (:root variables), JSON W3C y configuracion Tailwind.

Restricciones:
- Rendimiento ultra-fluido: actualizacion del canvas en < 16 ms al deslizar selectores de color o escalas tipograficas.

Formato de salida: Guia de arquitectura de la interfaz en React con especificaciones de layout flexbox/grid y componentes visuales.`,
        tags: ["ui-canvas", "token-editor", "previsualización", "devtools", "ergonomía"]
      },
      {
        id: "dis-005",
        title: "Documentación y Guía de Estilo Visual Viva (Living Style Guide)",
        desc: "Estructura la documentación pública del sistema de diseño con directrices de uso (Do's and Don'ts).",
        model: "GPT-4o",
        prompt: `Eres un Documentador Tecnico y Redactor de Guias de Estilo de Sistemas de Diseno (estilo Material Design o Polaris).
[COPIA AQUI TU IDEA]

Redacta la documentacion exhaustiva de un componente central del sistema de diseno:
1. Descripcion funcional y anatomia visual: diagrama etiquetado con las partes constitutivas (contenedor, icono lider, texto de etiqueta, indicador de estado, accion final).
2. Estados interactivos obligatorios documentados con ejemplos visuales: Reposo (Default), Al pasar el raton (Hover), Foco de teclado visible (Focus-Visible), Presionado (Active), Deshabilitado (Disabled) y Estado de carga (Loading).
3. Buenas y Malas Practicas (Do's and Don'ts): pares comparativos de directrices claras indicando que hacer y que evitar categoricamente en la composicion de layouts.
4. Consideraciones de accesibilidad (a11y): comportamiento con lectores de pantalla, roles WAI-ARIA asignados y combinaciones de teclas admitidas.
5. Snippets de codigo fuente limpios y listos para copiar en React, HTML/CSS y Vue.

Restricciones:
- Tono pedagogico, riguroso, claro y orientado tanto a disenadores de producto como a desarrolladores frontend.

Formato de salida: Pagina de documentacion completa en formato Markdown estructurada con bloques 'Do/Don't' y ejemplos de codigo.`,
        tags: ["guía-estilo", "documentación-ui", "dos-and-donts", "anatomía-componentes", "a11y"]
      },
      {
        id: "dis-037",
        title: "Arquitectura de Design Systems Escalables en Multi-Marca y Multi-Plataforma",
        desc: "Estructura tokens globales, de alias y de componente para soportar múltiples marcas con un único core UI.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Design System Lead y Arquitecto Frontend de Sistemas de Diseño Multi-Marca.
[COPIA AQUI TU IDEA]

Disena la arquitectura jerarquica de tokens y componentes para un sistema de diseno corporativo que da soporte a 3 marcas distintas en Web, iOS y Android:
1. Capa de Tokens Globales (Core Tokens): definicion de escalas matematicas de color en OKLCH, familias tipograficas, radios de curvatura y cuadricula base de 4px/8px.
2. Capa de Tokens Semanticos o de Alias: mapeo conceptual contextualizado (ej: 'color-surface-brand-primary', 'color-feedback-danger-subtle') independiente de la marca.
3. Capa de Tokens de Componente: ligaduras a nivel de elemento (ej: 'button-primary-padding-horizontal', 'card-elevation-hover').
4. Estrategia de Themepacks multimarca: conmutacion dinamica en tiempo de ejecucion mediante atributos CSS Data ('data-brand="brand-a"') y CSS Custom Properties.
5. Canal de distribucion y versionado semantico (SemVer): publicacion de paquetes npm aislados para tokens, iconos y componentes React/Tailwind.

Restricciones:
- No utilices valores hardcodeados en los componentes; todo estilo visual debe emanar estrictamente de un token de diseno semantico.

Formato de salida: Documento de especificacion de arquitectura en Markdown con grafo de herencia de tokens en Mermaid y estructura de carpetas de repositorio.`,
        tags: ["design-systems", "tokens", "multi-marca", "oklch", "arquitectura-ui", "escalabilidad"]
      },
      {
        id: "dis-038",
        title: "Pipeline de Sincronización Bidireccional Figma Tokens (Tokens Studio) y Repositorios Git",
        desc: "Automatiza la exportación de variables de Figma a repositorios de código mediante GitHub Actions y Style Dictionary.",
        model: "DeepSeek V4",
        prompt: `Eres un Design Technologist e Ingeniero de Herramientas de Automatización de Diseño.
[COPIA AQUI TU IDEA]

Construye el pipeline de CI/CD para sincronizar tokens de diseno desde Figma hacia repositorios frontend de forma desatendida:
1. Configuracion del conector de Figma Variables / Tokens Studio exportando ficheros JSON estructurados hacia una rama de Git ('tokens/update').
2. Diseno del flujo de trabajo en GitHub Actions disparado ante cada Pull Request de tokens:
   - Validacion de esquema JSON conforme a la especificacion del W3C Design Tokens Community Group (DTCG).
   - Deteccion de 'Breaking Changes' (eliminacion de tokens o cambios drásticos de valores que puedan romper interfaces existentes).
3. Transformacion automatizada con Style Dictionary v4: generacion de artefactos finales para CSS (variables custom), SCSS, TypeScript (tipos e interfaces const) y Android XML / iOS Swift.
4. Generacion de visualizaciones de diff visual para que los desarrolladores inspeccionen los cambios de color y espaciado antes del merge.
5. Publicacion automatica de la version candidata en npm registry.

Restricciones:
- Garantiza que ningun token nuevo contenga nombres con espacios o caracteres no compatibles con variables CSS estandar.

Formato de salida: Archivos de configuracion completos: workflow de GitHub Actions (.yml) y fichero de configuracion 'config.js' de Style Dictionary.`,
        tags: ["figma", "tokens-studio", "style-dictionary", "ci-cd", "github-actions", "dtcg"]
      }
    ]
  },
  {
    id: "design-tokens",
    name: "Generador de Design Tokens y Paletas / Prism (DS1.1)",
    prompts: [
      {
        id: "dis-006",
        title: "Generación de Sistema de Tokens bajo el Estándar de la W3C (DTCG)",
        desc: "Construye tokens estructurados en JSON según la especificación formal del Design Tokens Community Group.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Arquitectura de Tokens de Diseno alineado con el Design Tokens Community Group (DTCG) de la W3C.
[COPIA AQUI TU IDEA]

Genera el archivo maestro de design tokens estructurado segun la especificacion formal DTCG:
1. Jerarquia en tres niveles:
   - Tokens Globales / Primitivos: valores fisicos puros (ej: color-blue-500: #3B82F6, font-size-16: 1rem).
   - Tokens Semanticos / Alias: intencion de uso (ej: color-background-primary -> {color.slate.900}, color-text-danger -> {color.red.600}).
   - Tokens de Componente: valores vinculados a un elemento especifico (ej: button-primary-bg -> {color.interactive.accent}).
2. Uso de metadatos estandar W3C: '$type' (color, dimension, duration, cubicBezier, fontWeight), '$value' y '$description'.
3. Resolucion automatica de referencias mediante sintaxis de llaves '{categoria.token}'.
4. Inclusion de tokens para elevaciones (box-shadow compuesto) y radios de redondeo escalonados (sm, md, lg, full).
5. Estructura modular dividida en archivos independientes: 'globals.json', 'semantics.json' y 'components.json'.

Restricciones:
- El archivo debe ser JSON estricto y validar sin errores contra el esquema oficial del W3C Design Tokens Spec.

Formato de salida: Archivo JSON estructurado completo acompanado de script en Node.js para validar la integridad de referencias cruzadas.`,
        tags: ["w3c", "dtcg", "design-tokens", "json-schema", "semántica"]
      },
      {
        id: "dis-007",
        title: "Generación de Paletas de Color Accesibles WCAG AAA en Espacio OKLCH",
        desc: "Calcula rampas cromáticas matemáticamente uniformes con luminosidad perceptual garantizando contrastes 7:1.",
        model: "DeepSeek V4",
        prompt: `Eres un Cientifico del Color y Especialista en Espacios de Color Perceptualmente Uniformes (OKLCH).
[COPIA AQUI TU IDEA]

Genera la rampa de color completa para la marca utilizando el espacio de color OKLCH (Lightness, Chroma, Hue):
1. Seleccion del matiz de marca (Hue H en grados de 0 a 360) y croma base (Chroma C).
2. Generacion de 10 escalas tonales armonicas (de 50 a 950): modulacion matematica de la luminosidad perceptual L desde el 98% (tonos ultra-claros) hasta el 12% (tonos ultra-oscuros).
3. Correccion de croma para evitar colores fuera de gama (Gamut Mapping al espacio sRGB y Display P3) manteniendo la saturacion perceptual constante sin bandas ni saltos.
4. Verificacion de contraste para cada pareja de colores de la escala: garantizar cumplimiento estricto de WCAG 2.2 Nivel AAA (ratio >= 7:1 para texto normal) y Nivel AA (ratio >= 4.5:1).
5. Verificacion complementaria con el algoritmo moderno APCA (Advanced Perceptual Contrast Algorithm): valor Lc superior a 75 para lectura de cuerpo de texto.

Restricciones:
- No utilices modelos HSL convencionales debido a su falta de uniformidad perceptual en luminosidad.

Formato de salida: Tabla de valores en Markdown con valores en formato 'oklch(L C H)', hex equivalente y matriz de ratios de contraste.`,
        tags: ["oklch", "paletas", "color-perceptual", "wcag-aaa", "apca"]
      },
      {
        id: "dis-008",
        title: "Escalas Tipográficas Armónicas y Modulares con Ratios Clásicos",
        desc: "Modela la escala de tamaños y espaciados de línea basada en proporciones musicales (Mayor Tercera, Razón Áurea).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Tipografo Digital y Especialista en Microtipografia de Pantalla.
[COPIA AQUI TU IDEA]

Disena la escala tipografica modular y jerarquica para la aplicacion digital:
1. Seleccion del tamano base (Base Body Size = 1rem / 16px) y ratio de progresion modular: Mayor Tercera (1.250), Cuarta Justa (1.333) o Razon Aurea (1.618).
2. Generacion de la escala de 8 niveles: caption, body-sm, body, h5, h4, h3, h2, h1 y display con valores exactos en 'rem' y 'px'.
3. Calculo armonico del interlineado (line-height): proporcionalmente inverso al tamano de la fuente (1.5 - 1.6 para textos de lectura continua, 1.15 - 1.25 para grandes titulares).
4. Parametrizacion del espaciado entre caracteres (letter-spacing / tracking): valores negativos sutiles en titulares (-0.02em) y ligeramente positivos en texto en mayusculas o cuerpos pequenos (+0.03em).
5. Jerarquia de pesos tipograficos (Font Weights): Regular (400), Medium (500), SemiBold (600) y Bold (700) con emparejamiento semantico.

Restricciones:
- Todos los valores calculados deben redondearse a multiplos limpios en el sistema de cuadricula de 4px / 8px.

Formato de salida: Variables CSS completas y tabla comparativa de niveles tipograficos con ejemplos de uso recomendado.`,
        tags: ["tipografía", "escala-modular", "line-height", "tracking", "jerarquía"]
      },
      {
        id: "dis-009",
        title: "Exportación Automatizada de Tokens a CSS, Tailwind v4 y Figma Tokens",
        desc: "Compila tokens W3C a Custom Properties nativas, configuración de Tailwind y formato JSON para Tokens Studio.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Automatizacion de Sistemas de Diseno y Pipeline de Tokens.
[COPIA AQUI TU IDEA]

Desarrolla el script de compilacion y exportacion multiformato para el archivo de tokens:
1. Exportacion a CSS Custom Properties: generacion de ':root { --color-primary: ...; --font-size-base: ...; }' ordenado semantica y alfabeticamente.
2. Exportacion a Tailwind CSS v4: integracion en el nuevo bloque de configuracion '@theme' en CSS nativo con variables predefinidas.
3. Exportacion para Figma (Tokens Studio / DTCG format): archivo JSON compatible con sincronizacion bidireccional a variables de Figma.
4. Exportacion de tipos TypeScript: generacion automatica de definiciones 'tokens.d.ts' con tipado estricto de claves para autocompletado en IDEs.
5. Script de transformacion en Node.js utilizando Style Dictionary o transformador TypeScript nativo.

Restricciones:
- No hardcodees valores; todas las exportaciones deben derivar deterministicamente de la fuente unica de verdad (Source of Truth).

Formato de salida: Codigo completo del script transformador y ejemplos de los archivos generados para cada destino.`,
        tags: ["exportación-tokens", "tailwind-v4", "figma", "typescript", "style-dictionary"]
      },
      {
        id: "dis-010",
        title: "Arquitectura de Modo Oscuro Semántico sin Inversión Directa",
        desc: "Diseña un tema oscuro sofisticado modulando elevaciones tonales en grises ricos y evitando negro puro #000000.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Director de Arte Digital y Especialista en Diseno de Interfaces Oscuras (Dark Mode Ergonomics).
[COPIA AQUI TU IDEA]

Disena la estrategia y arquitectura de variables semanticas para el Modo Oscuro de la plataforma:
1. Principio fundamental: no invertir colores de forma automatica; los elementos elevados reciben mayor luminosidad tonal, no sombras tradicionales.
2. Paleta de superficies por capas de elevacion (Elevation Surfaces):
   - Nivel 0 (Fondo base): gris oscuro enriquecido con matiz frio (#0B0F19 o #0D1117), jamas negro puro (#000000) para evitar contraste cegador y fatiga visual.
   - Nivel 1 (Tarjetas/Contenedores): 5% mas luminoso que el fondo.
   - Nivel 2 (Modales/Popovers): 10% mas luminoso con borde sutil de 1px semitransparente (rgba(255,255,255,0.08)).
3. Adaptacion de colores de acento: desaturacion ligera (10-15% menos croma) para evitar vibracion cromatica en fondos oscuros.
4. Jerarquia de textos semanticos: Texto Principal (87% opacidad de blanco), Secundario (60%), Deshabilitado (38%).
5. Soporte para preferencia del sistema operativo via media query '@media (prefers-color-scheme: dark)' con sobrescritura manual por clase.

Restricciones:
- Cumple rigurosamente el estandar WCAG para texto sobre cualquiera de las capas de elevacion oscura.

Formato de salida: Bloque de CSS con variables semanticas de tema claro y tema oscuro emparejadas biunivocamente.`,
        tags: ["dark-mode", "modo-oscuro", "elevaciones", "fatiga-visual", "variables-css"]
      },
      {
        id: "dis-039",
        title: "Modelado de Tokens de Elevación, Sombras y Profundidad en Espacio OKLCH",
        desc: "Crea un sistema perceptualmente uniforme de sombras ambientales y directas con tinte cromático natural.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Director de Arte Digital y Especialista en Colorimetría y Espacios Perceptuales OKLCH.
[COPIA AQUI TU IDEA]

Desarrolla el sistema de tokens de elevacion y profundidad visual basado en luz natural y el espacio de color uniforme OKLCH:
1. Descomposicion de la sombra fisica en dos capas superpuestas:
   - Sombra difusa ambiental (Ambient Shadow): gran difuminado, baja opacidad, simula la dispersion atmosferica.
   - Sombra directa dirigida (Key Light Shadow): menor difuminado, mayor densidad, define la distancia al plano de apoyo.
2. Eliminacion de sombras negras neutras ('rgba(0,0,0,x)'): aplicacion de tinte cromatico armonico tintando las sombras con el tono complementario de la superficie de fondo.
3. Escala formal de 5 niveles de elevacion:
   - Level 0 (Flat): tarjetas al nivel de la superficie.
   - Level 1 (Resting): componentes interactivos en reposo (+2px blur, 1px offset).
   - Level 2 (Hover/Focus): elevacion sutil en interaccion (+8px blur, 4px offset).
   - Level 3 (Dropdown/Popover): menus emergentes (+16px blur, 8px offset).
   - Level 4 (Modal/Dialog): ventanas flotantes criticas (+32px blur, 16px offset).
4. Generacion de variables CSS nativas utilizando la sintaxis de color CSS Color Module Level 4: 'box-shadow: 0 4px 12px oklch(0.2 0.04 250 / 0.12)'.
5. Adaptacion automatica de la escala de elevacion al modo oscuro (Dark Mode), donde la elevacion se expresa principalmente por luminosidad superficial y no solo por sombra.

Restricciones:
- Valida que la saturacion cromatica no produzca aberraciones en monitores sRGB estandar.

Formato de salida: Diccionario de tokens JSON conforme a W3C DTCG y bloque de variables CSS listas para produccion.`,
        tags: ["sombras", "elevación", "oklch", "profundidad", "dark-mode", "tokens-dtcg"]
      },
      {
        id: "dis-040",
        title: "Tokens de Tipografía Fluida con Funciones CSS Clamp() y Escalas Modulares",
        desc: "Implementa escalado tipográfico adaptativo continuo sin saltos bruscos entre breakpoints utilizando clamp().",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero Frontend Especialista en Tipografía Web Fluida y Responsive Design.
[COPIA AQUI TU IDEA]

Crea el sistema de tokens para tipografia fluida continua basado en funciones matematicas CSS 'clamp()':
1. Definicion de la escala modular de ratios tipograficos: Minor Third (1.200) para pantallas moviles pequenas y Major Third (1.250) o Perfect Fourth (1.333) para pantallas de escritorio grandes.
2. Definicion de los limites de pantalla: Viewport minimo (360px) y Viewport maximo (1440px).
3. Formulacion matematica analitica de la pendiente de transicion continua para cada nivel jerarquico (H1, H2, H3, Body, Small):
   - Formula: 'clamp(V_min, V_base + (V_max - V_min) / (VP_max - VP_min) * 100vw, V_max)'.
4. Escalado coordinado del interlineado (Line-Height) e interletreado (Letter-Spacing): reduccion proporcional del line-height relativo en fuentes display gigantes.
5. Exportacion de tokens de tipografia fluida integrables como variables nativas CSS y como utilidades de Tailwind CSS.

Restricciones:
- No utilices unidades fijas de pixeles en el resultado final; expresa los valores minimos y maximos en 'rem' para respetar la accesibilidad del zoom del navegador del usuario.

Formato de salida: Generador en Python o script JS de la formula 'clamp()' y bloque CSS exportable con la escala completa.`,
        tags: ["tipografía-fluida", "clamp", "escala-modular", "responsive", "css", "rem"]
      },
      {
        id: "dis-041",
        title: "Generador de Temas de Alto Contraste para Accesibilidad Extrema (Modo Solar / Modo Nocturno)",
        desc: "Crea paletas de colores accesibles que garantizan ratios de contraste superiores a 7:1 (WCAG AAA) en cualquier entorno.",
        model: "GPT-4o",
        prompt: `Eres un Especialista en Accesibilidad Visual (A11y) y Diseñador de Sistemas de Color Adaptativos.
[COPIA AQUI TU IDEA]

Construye el generador automatizado de temas de color para accesibilidad de alto contraste (High Contrast Themes):
1. Cumplimiento estricto del criterio de conformidad WCAG 2.2 Nivel AAA: ratio de contraste de luminancia relativa minimo de 7:1 para texto normal y 4.5:1 para texto grande (> 18pt o > 14pt negrita) y componentes UI esenciales.
2. Creacion de dos variantes especializadas:
   - Modo Solar (High Contrast Light): optimizado para visualizacion en exteriores bajo luz solar directa, maximizando la pureza del blanco de fondo y densidad del negro de texto.
   - Modo Nocturno Profundo (High Contrast Dark): fondos negros puros (OLED 0% luminancia) con textos de alta reflectancia y bordes luminosos de 2px en campos interactivos.
3. Deteccion automatica mediante media queries CSS: '@media (forced-colors: active)' y '@media (prefers-contrast: more)'.
4. Diseno de estados interactivos (Hover, Active, Focus, Disabled) que no dependan exclusivamente del cambio de color, incorporando subrayados, contornos punteados o iconos auxiliares.
5. Calculadora de contraste automatica incorporada que valide cada par color de texto / color de fondo.

Restricciones:
- Prohibe terminantemente combinaciones de colores criticos que resulten indistinguibles para usuarios con daltonismo (Deuteranopia, Protanopia, Tritanopia).

Formato de salida: Especificacion formal de tokens en JSON y archivo CSS con las variables de sobreescritura de alto contraste.`,
        tags: ["alto-contraste", "wcag-aaa", "accesibilidad", "forced-colors", "a11y", "daltonismo"]
      }
    ]
  },
  {
    id: "auditor-heuristico",
    name: "Auditor Heurístico de Interfaces / Argos (DS1.2)",
    prompts: [
      {
        id: "dis-011",
        title: "Evaluación Heurística Integral de Interfaces basada en las 10 Heurísticas de Nielsen",
        desc: "Audita pantallas de producto identificando violaciones de usabilidad con severidad de 0 a 4.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Auditor Senior de Usabilidad y Evaluador Heuristico certificado por el Nielsen Norman Group (NN/g).
[COPIA AQUI TU IDEA]

Audita la interfaz o flujo de interaccion aportado contrastandolo contra las 10 Heuristicas de Jakob Nielsen:
1. Visibilidad del estado del sistema: ¿el usuario sabe en todo momento que esta ocurriendo mediante feedback adecuado?
2. Coincidencia entre el sistema y el mundo real: ¿se utiliza el lenguaje natural del usuario o jerga tecnica interna incomprensible?
3. Control y libertad del usuario: ¿existen salidas de emergencia evidentes (deshacer, cancelar, volver atras facilmente)?
4. Consistencia y estandares: ¿los mismos terminos y elementos visuales significan lo mismo en toda la aplicacion?
5. Prevencion de errores: ¿el diseno previene activamente que ocurran errores en lugar de limitarse a mostrar alertas?
6. Reconocimiento antes que recuerdo: ¿los elementos y opciones estan visibles para no sobrecargar la memoria de trabajo?
7. Flexibilidad y eficiencia de uso: ¿hay atajos para usuarios expertos y caminos guiados para noveles?
8. Diseno estetico y minimalista: ¿la pantalla contiene informacion irrelevante o distractora?
9. Ayuda a los usuarios a reconocer, diagnosticar y recuperarse de errores: ¿los mensajes de error son constructivos?
10. Ayuda y documentacion: ¿es facil encontrar explicaciones contextuales?

Restricciones:
- Asigna a cada hallazgo una clasificacion de severidad de Nielsen (0: No es problema, 1: Cosmetico, 2: Menor, 3: Mayor, 4: Catastrofe de usabilidad).

Formato de salida: Informe de auditoria heuristica en tabla Markdown con columnas [Heuristica Violada, Descripcion del Problema, Severidad, Propuesta de Rediseno].`,
        tags: ["nielsen", "evaluación-heurística", "usabilidad", "severidad", "nng"]
      },
      {
        id: "dis-012",
        title: "Auditoría de Accesibilidad Web Exhaustiva según WCAG 2.2 Niveles AA y AAA",
        desc: "Verifica contraste, navegación por teclado, foco visible, atributos WAI-ARIA y tamaño de objetivos táctiles.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor de Accesibilidad Web Certificado (CPACC / WAS) por la IAAP evaluando conformidad con WCAG 2.2.
[COPIA AQUI TU IDEA]

Audita el componente o pagina web verificando el cumplimiento de los 4 principios POUR de accesibilidad:
1. Perceptible:
   - Contraste de texto (Criterio 1.4.3 Nivel AA 4.5:1 y Criterio 1.4.6 Nivel AAA 7:1) y contraste no textual de iconos/bordes (1.4.11 3:1).
   - Textos alternativos pertinentes ('alt') en imagenes informativas y ocultacion de decorativas ('aria-hidden="true"').
2. Operable:
   - Navegacion por teclado completa (2.1.1): ningun elemento atrapa el foco y todos los controles interactivos son alcanzables con Tab.
   - Indicador de foco visible y de alto contraste (2.4.7 y 2.4.11) con al menos 2px de contorno distinguible.
   - Tamano minimo de objetivos tactiles (Criterio 2.5.8 WCAG 2.2: minimo 24x24 px con espaciado, preferible 44x44 px).
3. Comprensible:
   - Mensajes de error claros e identificacion accesible mediante 'aria-describedby' y 'aria-invalid="true"'.
4. Robusto:
   - Uso correcto de roles semanticos WAI-ARIA ('role="dialog"', 'aria-expanded', 'aria-haspopup') sin redundancias sobre HTML5 nativo.

Restricciones:
- Cita el numero exacto de criterio de exito de WCAG 2.2 para cada infraccion detectada.

Formato de salida: Dictamen pericial de accesibilidad en Markdown con matriz de hallazgos y correcciones tecnicas de codigo.`,
        tags: ["wcag-2-2", "accesibilidad", "a11y", "wai-aria", "teclado", "iaap"]
      },
      {
        id: "dis-013",
        title: "Evaluación de Carga Cognitiva y Aplicación de Leyes de Psicología UX",
        desc: "Aplica Ley de Hick, Ley de Fitts, Ley de Miller y Ley de Prägnanz para simplificar pantallas complejas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Psicologo Cognitivo e Investigador de Factores Humanos aplicado al diseno de software.
[COPIA AQUI TU IDEA]

Evalua la carga cognitiva y ergonomia psicologica de la pantalla analizada:
1. Aplicacion de la Ley de Hick: tiempo de toma de decision en funcion del numero de opciones log2(n+1). ¿Se puede simplificar la decision mediante descomposicion progresiva o valores recomendados por defecto?
2. Aplicacion de la Ley de Fitts: tiempo para alcanzar un objetivo en funcion de su distancia y tamano D/S. ¿Los botones de accion primaria estan ubicados en zonas de facil alcance y con area clicable suficiente?
3. Aplicacion de la Ley de Miller y Capacidad de la Memoria de Trabajo (7 +- 2 elementos): ¿la informacion densa esta agrupada en bloques logicos digeribles (Chunking)?
4. Aplicacion de Leyes de la Gestalt (Proximidad, Semejanza, Continuidad, Cierre y Region Comun): ¿el espaciado visual comunica claramente que elementos pertenecen al mismo grupo conceptual?
5. Evaluacion de la Carga Cognitiva Extrana (Extraneous Cognitive Load): eliminacion de elementos visuales superfluos que no aportan a la consecucion de la tarea.

Restricciones:
- Justifica cada recomendacion en base a modelos empiricos de percepcion visual humana.

Formato de salida: Diagnostico de psicologia de interfaz en Markdown con diagramas conceptuales de agrupacion y propuestas de optimizacion.`,
        tags: ["psicología-ux", "carga-cognitiva", "ley-hick", "ley-fitts", "gestalt", "chunking"]
      },
      {
        id: "dis-014",
        title: "Análisis de Flujos de Usuario (User Flows) y Detección de Fricción",
        desc: "Mapea pasos, puntos de decisión y drop-offs identificando pasos redundantes y cuellos de botella en la navegación.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Disenador de Servicios y Experto en Optimizacion de Flujos de Conversion (Funnel Optimization).
[COPIA AQUI TU IDEA]

Analiza el flujo de usuario de extremo a extremo (End-to-End User Flow) identificando puntos de friccion:
1. Mapeo cronologico de pasos: desde el punto de entrada (Trigger inicial) hasta el estado de exito final de la tarea.
2. Identificacion de bifurcaciones y decisiones complejas impuestas al usuario en cada paso.
3. Deteccion de 'Dead Ends' (pantallas sin salida clara) y retrocesos innecesarios (bucles donde el usuario debe volver atras para consultar un dato).
4. Calculo del indice de friccion: numero de clics requeridos, campos de formulario obligatorios y tiempo estimado de completado.
5. Propuesta de optimizacion de camino critico: reduccion de pasos eliminando pantallas intermedias superfluas mediante precarga inteligente de datos o pasos diferidos.

Restricciones:
- Cada punto de friccion identificado debe ir acompanado de su hipotesis de solucion y metrica de validacion.

Formato de salida: Diagrama de flujo en sintaxis Mermaid y tabla de friccion con evaluacion de abandono potencial.`,
        tags: ["user-flows", "fricción", "conversión", "funnel", "mermaid"]
      },
      {
        id: "dis-015",
        title: "Informe Ejecutivo de Usabilidad Priorizado con Matriz de Impacto vs Esfuerzo",
        desc: "Compila hallazgos de auditoría en un informe accionable para equipos de desarrollo y product managers.",
        model: "GPT-4o",
        prompt: `Eres un Consultor Principal de Experiencia de Usuario preparando el informe final de auditoria para Direccion.
[COPIA AQUI TU IDEA]

Elabora el informe ejecutivo de usabilidad priorizado para el equipo de producto:
1. Resumen ejecutivo de diagnostico: estado general de la experiencia, puntuacion de madurez de diseno y principales riesgos de negocio derivados de la UX actual.
2. Cuadro de mando de hallazgos clasificados por Severidad (Criticos, Mayores, Menores, Sugerencias).
3. Matriz de Priorizacion 2x2 (Impacto en la experiencia de usuario vs Esfuerzo tecnico de implementacion):
   - 'Quick Wins' (Alto Impacto / Bajo Esfuerzo): mejoras inmediatas para el proximo sprint.
   - 'Grandes Proyectos' (Alto Impacto / Alto Esfuerzo): refactorizaciones estructurales de layout o arquitectura.
   - 'Tareas de Relleno' (Bajo Impacto / Bajo Esfuerzo): ajustes cosmeticos menores.
   - 'Descartables' (Bajo Impacto / Alto Esfuerzo).
4. Hoja de ruta de implementacion por fases (Fase 1: Resolucion de bloqueos criticos, Fase 2: Optimizacion de conversion, Fase 3: Pulido visual).

Restricciones:
- Tono ejecutivo orientado a la toma de decisiones agiles y balanceado entre negocio y diseno centrado en las personas.

Formato de salida: Documento formal de informe de usabilidad en Markdown con tablas de priorizacion y calendario de acciones.`,
        tags: ["informe-usabilidad", "priorización", "impacto-esfuerzo", "quick-wins", "roadmap"]
      },
      {
        id: "dis-042",
        title: "Auditoría Heurística de Carga Cognitiva y Ley de Hicks en Flujos de Checkout Complejos",
        desc: "Evalúa el tiempo de decisión y puntos de fricción en formularios extensos, proponiendo partición en pasos progresivos.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Psicólogo Cognitivo y Consultor Senior de Investigación UX (UX Research).
[COPIA AQUI TU IDEA]

Realiza la auditoria heuristica de carga cognitiva y friccion en un flujo critico transaccional (ej: contratacion de producto financiero o checkout B2B):
1. Evaluacion segun las 10 Heuristicas de Usabilidad de Jakob Nielsen, con especial foco en: Correspondencia entre el sistema y el mundo real, Prevencion de errores y Flexibilidad de uso.
2. Aplicacion de la Ley de Hick-Hyman: T = b * log2(n + 1). Cuantificacion del tiempo de decision del usuario en funcion del numero de campos y opciones presentadas simultaneamente.
3. Analisis de la Carga Cognitiva segun Sweller: descomposicion en Carga Intrinseca (dificultad inherente a la tarea), Carga Germana (procesamiento productivo de informacion) y Carga Extrana (ruido visual, terminologia ambigua o pasos redundantes).
4. Redisenio del flujo mediante Divulgacion Progresiva (Progressive Disclosure): descomposicion del formulario monolitico en un asistente paso a paso (Wizard) de 3 a 4 etapas con guardado automatico de borrador.
5. Metricas de impacto esperadas: reduccion de la tasa de abandono de formulario, reduccion del tiempo medio de cumplimentacion y eliminacion de errores de validacion.

Restricciones:
- Cada hallazgo negativo de la auditoria debe estar catalogado con su nivel de severidad (0: No es problema, 1: Cosmetico, 2: Menor, 3: Mayor, 4: Catastrofe de usabilidad).

Formato de salida: Informe formal de Auditoria Heuristica en Markdown con capturas conceptuales en Mermaid y recomendaciones accionables de rediseno.`,
        tags: ["heurísticas-nielsen", "ley-de-hick", "carga-cognitiva", "ux-research", "formularios", "usabilidad"]
      },
      {
        id: "dis-043",
        title: "Evaluación de Accesibilidad WCAG 2.2 Nivel AAA: Foco Visible, Objetos de Destino y Dragging",
        desc: "Audita criterios novedosos de las pautas WCAG 2.2: Focus Not Obscured, Target Size (Minimum 24x24px) y Dragging Movements.",
        model: "DeepSeek V4",
        prompt: `Eres un Auditor de Accesibilidad Web Certificado (IAAP CPACC / WAS) y Desarrollador Frontend A11y.
[COPIA AQUI TU IDEA]

Crea el protocolo de auditoria tecnica de conformidad con las nuevas directrices de accesibilidad WCAG 2.2:
1. Criterio 2.4.11 / 2.4.12 - Focus Not Obscured (Minimum / Enhanced): verificar que ningun elemento interactivo que reciba el foco del teclado quede oculto total o parcialmente tras banners de cookies flotantes, cabeceras fijas (sticky headers) o modales.
2. Criterio 2.5.8 - Target Size (Minimum): comprobar que todos los objetos de destino interactivos (botones, enlaces, iconos clicables) tengan un tamano minimo de 24x24 pixeles CSS o un espaciado suficiente que impida toques accidentales.
3. Criterio 2.5.7 - Dragging Movements: garantizar que cualquier funcionalidad que requiera arrastrar y soltar (ej: reordenacion de listas kanban o sliders) cuente con una alternativa accesible mediante clics sencillos de raton o pulsaciones de teclado.
4. Criterio 3.3.7 - Redundant Entry: verificacion de que la informacion ya introducida por el usuario en pasos anteriores no se vuelva a solicitar, siendo autocompletada o seleccionable.
5. Criterio 3.3.8 - Accessible Authentication: comprobacion de que los procesos de inicio de sesion no dependan de pruebas de funcion cognitiva (recordar contrasenas complejas o resolver puzzles/captchas visuales) sin alternativas asistidas.

Restricciones:
- Proporciona las reglas de CSS necesarias para solventar de inmediato cualquier no conformidad detectada.

Formato de salida: Matriz de auditoria WCAG 2.2 en tabla Markdown con codigo de criterio, nivel (A, AA, AAA), estado y snippets de correccion en CSS/HTML.`,
        tags: ["wcag-2-2", "accesibilidad", "a11y", "target-size", "focus-visible", "dragging-movements"]
      },
      {
        id: "dis-044",
        title: "Auditoría de Patrones Oscuros (Dark Patterns) y Diseño Ético de Consentimiento",
        desc: "Detecta trucos de diseño engañosos: confirmshaming, costes ocultos, trampas de cancelación y preselección forzada.",
        model: "GPT-4o",
        prompt: `Eres un Auditor de Diseño Ético y Experto en la Ley de Servicios Digitales (DSA) y Patrones Engañosos.
[COPIA AQUI TU IDEA]

Audita la interfaz de usuario para identificar y erradicar patrones de diseno manipuladores (Dark Patterns / Deceptive Design):
1. Confirmshaming: deteccion de copys en botones de rechazo que buscan culpabilizar o avergonzar emocionalmente al usuario (ej: 'No, gracias, prefiero pagar de mas').
2. Preselections & Misdirection: casillas de aceptacion de newsletters o servicios adicionales pre-marcadas por defecto o enlaces de cancelacion disimulados con contraste intencionadamente bajo.
3. Roach Motel / Obstacle Course: evaluacion de si el procedimiento para darse de baja o cancelar un servicio requiere significativamente mas pasos, llamadas telefonicas o friccion que el proceso de alta.
4. Sneak into Basket: agregacion automatica de seguros no solicitados o productos suplementarios durante el proceso de pago.
5. Diseno de consentimiento etico conforme al RGPD y la DSA europea: interfaces donde las opciones 'Aceptar todo' y 'Rechazar todo' tengan exactamente el mismo peso visual, contraste y accesibilidad con un solo clic.

Restricciones:
- Clasifica cada patron detectado segun la taxonomia del Deceptive Design Working Group e indica su riesgo de infraccion legal.

Formato de salida: Informe de auditoria de etica en el diseno con inventario de patrones identificados y propuestas de rediseño honesto.`,
        tags: ["dark-patterns", "diseño-ético", "dsa", "rgpd", "confirmshaming", "consentimiento"]
      }
    ]
  },
  {
    id: "motor-animaciones",
    name: "Motor de Animaciones CSS/Framer / Kinetic (DS1.3)",
    prompts: [
      {
        id: "dis-016",
        title: "Coreografías de Micro-interacciones con Curvas Bézier y Física de Resortes",
        desc: "Diseña animaciones de entrada, salida y retroalimentación táctil utilizando springs y curvas cubic-bezier personalizadas.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Animacion de Interfaces (Motion Designer) y Desarrollador Frontend Creativo.
[COPIA AQUI TU IDEA]

Disena la coreografia de micro-interacciones para los elementos interactivos del sistema:
1. Definicion de curvas de velocidad (Easing Curves):
   - Entrada a pantalla: desaceleracion energetica ('cubic-bezier(0.16, 1, 0.3, 1)').
   - Salida de pantalla: aceleracion limpia ('cubic-bezier(0.7, 0, 0.84, 0)').
   - Movimientos organicos: fisica de resortes (Spring Physics) parametrizada con rigidez (Stiffness: 300), amortiguacion (Damping: 25) y masa (Mass: 1).
2. Tiempos de duracion de animacion calibrados segun dimension del objeto: micro-interacciones de botones (100-150 ms), modales y paneles desplegables (250-350 ms), transiciones de pagina (400 ms).
3. Efectos de escalonamiento temporal (Staggering): retardo secuencial de 30-50 ms entre elementos hijos en listas y cuadriculas para guiar la atencion visual de forma ordenada.
4. Optimizacion estricta para GPU: animar exclusivamente las propiedades 'transform' y 'opacity' para evitar repintados (Repaint) y reflujos (Reflow) del motor de renderizado.
5. Inyeccion de la propiedad CSS 'will-change' de forma dinamica durante la interaccion para no saturar memoria de video.

Restricciones:
- Todas las animaciones deben mantener 60/120 FPS sin un solo cuadro caido (Jank-free).

Formato de salida: Codigo en CSS puro o componentes en Framer Motion (React) con variables de animacion listas para reutilizar.`,
        tags: ["animaciones", "motion-design", "cubic-bezier", "springs", "framer-motion", "gpu"]
      },
      {
        id: "dis-017",
        title: "Transiciones de Estado Complejas y Elementos Compartidos (Técnica FLIP)",
        desc: "Implementa transiciones fluidas donde un elemento viaja y cambia de forma entre dos estados distintos (First, Last, Invert, Play).",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Tecnicas Avanzadas de Renderizado Web e Interacciones Fluidas.
[COPIA AQUI TU IDEA]

Implementa una transicion compleja de layout compartido entre elementos utilizando la tecnica FLIP (First, Last, Invert, Play):
1. Paso F (First): medicion de la posicion y dimensiones iniciales del elemento ('element.getBoundingClientRect()').
2. Paso L (Last): aplicacion del cambio de estado en el DOM y medicion inmediata de la posicion final del elemento.
3. Paso I (Invert): calculo de las diferencias DeltaX, DeltaY, ScaleX, ScaleY e inversion visual instantanea mediante 'transform: translate(deltaX, deltaY) scale(scaleX, scaleY)' sin transicion.
4. Paso P (Play): activacion de la transicion suave hacia 'transform: none' para que el elemento viaje organica y fluidamente hasta su nuevo contenedor.
5. Extension a la moderna View Transitions API nativa de los navegadores ('document.startViewTransition()') para transiciones de pagina completas.

Restricciones:
- No realices animaciones sobre propiedades geometricas directas como 'width', 'height', 'top' o 'left'.

Formato de salida: Implementacion funcional en JavaScript moderno (ES6+) o hook personalizado en React 'useFlipAnimation'.`,
        tags: ["flip", "view-transitions", "layout-animation", "transform", "rendimiento"]
      },
      {
        id: "dis-018",
        title: "Animaciones Accesibles y Soporte Estricto de Prefers-Reduced-Motion",
        desc: "Garantiza que usuarios sensibles al movimiento o con trastornos vestibulares disfruten de una experiencia estática o sutil.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Consultor de Accesibilidad Web y Diseno Inclusivo para Condiciones Vestibulares.
[COPIA AQUI TU IDEA]

Implementa el protocolo de accesibilidad para animaciones respetando las preferencias del sistema operativo:
1. Deteccion de la preferencia del usuario mediante la media query CSS '@media (prefers-reduced-motion: reduce)'.
2. Sustitucion de movimientos espaciales amplios (desplazamientos de pantalla completa, zooms pronunciados, paralajes) por desvanecimientos suaves de opacidad (fade-in de 100 ms) o cambios instantaneos.
3. Desactivacion total de animaciones continuas o bucles infinitos (spinners rotatorios violentos, parpadeos > 3 veces por segundo para evitar convulsiones fotosensibles segun criterio 2.3.1 de WCAG).
4. Configuracion de un conmutador manual en la interfaz ('Ajustes de Accesibilidad: Reducir animaciones') que guarde la preferencia en LocalStorage y sobrescriba el media query.
5. Configuracion global defensiva en CSS para resetear transiciones si el usuario lo solicita.

Restricciones:
- La reduccion de movimiento no debe mermar en ningun caso la comprension del cambio de estado o la funcionalidad de la aplicacion.

Formato de salida: Bloque de CSS y modulo de React con el hook 'usePrefersReducedMotion()' y ejemplos de aplicacion segura.`,
        tags: ["prefers-reduced-motion", "accesibilidad-vestibular", "a11y", "wcag-2-3-1", "inclusividad"]
      },
      {
        id: "dis-019",
        title: "Esqueletos de Carga Dinámicos (Skeleton Screens) y Shimmer Effects",
        desc: "Construye placeholders de carga con degradados luminosos en movimiento que reducen el tiempo percibido de espera.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Ingeniero Frontend especializado en Rendimiento Perceptual y Feedback de Carga.
[COPIA AQUI TU IDEA]

Disena e implementa esqueletos de carga animados (Skeleton Screens) para mitigar la sensacion de espera en llamadas de red:
1. Anatomia del esqueleto: replicar exactamente la silueta geometrica del componente final (avatar circular, linea de titulo al 70% de ancho, bloques de parrafo y boton contenedor).
2. Animacion de brillo (Shimmer Effect): degradado lineal continuo de izquierda a derecha ('linear-gradient(90deg, base 0%, highlight 50%, base 100%)') con ciclo infinito suave de 1.5 segundos.
3. Paleta de colores adaptable: uso de variables semanticas para integrarse de forma natural tanto en tema claro (#E2E8F0 -> #F1F5F9) como en tema oscuro (#1E293B -> #334155).
4. Transicion fluida al recibir los datos: desvanecimiento cruzado (Cross-fade) de 200 ms entre el skeleton y el componente con contenido real para evitar parpadeos bruscos.
5. Gestion accesible: marcar el contenedor del esqueleto con 'aria-busy="true"' y 'aria-live="polite"' notificando al lector de pantalla que el contenido se esta cargando.

Restricciones:
- Evita que los esqueletos de carga alteren la altura final del bloque para prevenir saltos de diseno acumulados (CLS - Cumulative Layout Shift = 0).

Formato de salida: Componente React reutilizable 'Skeleton.jsx' acompanado de sus estilos CSS optimizados.`,
        tags: ["skeleton-screens", "shimmer", "rendimiento-perceptual", "cls", "loading-states"]
      },
      {
        id: "dis-045",
        title: "Microinteracciones Hápticas y Coreografía de Transiciones de Estado con Framer Motion",
        desc: "Construye transiciones fluidas de layout (Shared Layout Animations) y curvas de aceleración física de resorte (Springs).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Interacción y Desarrollador de Animaciones UI Avanzadas con React y Framer Motion.
[COPIA AQUI TU IDEA]

Desarrolla la coreografia de animaciones y microinteracciones de estado para un componente interactivo complejo:
1. Modelado de dinamica fisica de resorte (Spring Physics) en lugar de curvas bezier temporales rigidas: parametros de rigidez ('stiffness'), amortiguamiento ('damping') y masa ('mass') para lograr movimientos naturales y organicos.
2. Animacion de transicion compartida (Shared Element Transition / 'layoutId'): transformacion suave de una tarjeta compacta a un modal expandido a pantalla completa sin parpadeos de DOM.
3. Microinteraccion de pulsacion (Tap / Hover feedback): escala sutil al pulsar ('whileTap={{ scale: 0.97 }}') y elevacion en reposo ('whileHover={{ y: -2 }}').
4. Orquestacion de elementos hijos (Staggered Children): aparicion escalonada de elementos de una lista con desfase temporal de 40 milisegundos ('staggerChildren: 0.04').
5. Activacion de vibracion haptica en navegadores moviles compatibles mediante la API 'navigator.vibrate([15])' al completar con exito acciones criticas.

Restricciones:
- Optimiza las propiedades animadas animando exclusivamente 'transform' y 'opacity' para asegurar que el navegador trabaje en capas de composicion GPU a 60/120 FPS sin disparar Reflow ni Repaint.

Formato de salida: Componente funcional en React con TypeScript y Framer Motion con constantes fisicas configurables.`,
        tags: ["framer-motion", "microinteracciones", "animaciones", "spring-physics", "layout-id", "gpu"]
      },
      {
        id: "dis-046",
        title: "Respeto Estricto de Preferencias de Movimiento Reducido (prefers-reduced-motion)",
        desc: "Adapta sistemáticamente todas las animaciones y transiciones de la UI para prevenir mareos y problemas vestibulares.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Especialista en Accesibilidad Motriz y Trastornos Vestibulares en Interfaces Digitales.
[COPIA AQUI TU IDEA]

Implementa la arquitectura global de gestion de movimiento reducido en el sistema de componentes:
1. Deteccion de la preferencia del sistema operativo mediante la media query CSS '@media (prefers-reduced-motion: reduce)' y el hook de React 'useReducedMotion()'.
2. Estrategia de degradacion elegante para componentes animados:
   - Sustituir animaciones de deslizamiento lateral o zoom invasivo por transiciones suaves de desvanecimiento de opacidad (Crossfade puro).
   - Supresion de fondos con parallax scrolling, rotaciones continuas o efectos de rebote oscilatorio.
   - Detencion automatica de carruseles de reproduccion automatica o banners con movimiento ciclico.
3. Implementacion de un conmutador manual accesible en los ajustes de la aplicacion que permita al usuario forzar el modo de movimiento reducido con independencia del sistema operativo.
4. Regla global CSS de fallback de emergencia para navegadores que bloquea animaciones desmedidas.
5. Comprobacion de que la ausencia de movimiento no reste funcionalidad ni oculte informacion esencial al usuario.

Restricciones:
- Nunca elimines completamente las transiciones de foco o cambio de estado de golpe; utiliza una duracion minima imperceptible de 0.01s o transicion instantanea limpia.

Formato de salida: Hook en React 'useSafeAnimation' y hoja de estilos CSS de reseteo accesible para movimiento reducido.`,
        tags: ["prefers-reduced-motion", "accesibilidad", "vestibular", "animaciones-accesibles", "css-a11y"]
      }
    ]
  },
  {
    id: "simulador-responsive",
    name: "Simulador de Responsive y Breakpoints / Viewport (DS1.4)",
    prompts: [
      {
        id: "dis-020",
        title: "Estrategias de Diseño Basadas en Contenedores con CSS Container Queries",
        desc: "Implementa componentes auto-responsivos que reaccionan al ancho de su elemento padre (@container) y no al viewport.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de CSS Moderno y Especialista en Componentes Autonomos Modulares.
[COPIA AQUI TU IDEA]

Desarrolla el componente responsivo utilizando CSS Container Queries nativas:
1. Definicion del contexto de contencion en el elemento contenedor padre: 'container-type: inline-size;' y 'container-name: cardContainer;'.
2. Adaptacion del componente hijo basada en '@container cardContainer (min-width: ...)' en lugar de media queries globales:
   - Contenedor estrecho (< 350px): disposicion vertical en una sola columna, imagen apilada sobre texto, boton en ancho completo.
   - Contenedor mediano (350px - 600px): disposicion horizontal en dos columnas (imagen izquierda, contenido derecha).
   - Contenedor amplio (> 600px): disposicion extendida con datos analiticos adicionales y acciones secundarias visibles.
3. Uso de unidades de contenedor relativas ('cqw' y 'cqh') para modular tamano de textos y rellenos en funcion del espacio disponible.
4. Estrategia de degradacion elegante para navegadores que no soporten container queries.

Restricciones:
- El componente debe poder insertarse en una barra lateral estrecha o en el centro de la pantalla manteniendo un aspecto impecable sin configurar clases extras.

Formato de salida: Codigo completo en HTML y CSS puro con contenedor responsivo y estilos de variacion visual.`,
        tags: ["container-queries", "cqw", "css-moderno", "modularidad", "responsive"]
      },
      {
        id: "dis-021",
        title: "Tipografía y Espaciado Fluidos basados en la Función Matemática clamp()",
        desc: "Elimina breakpoints rígidos logrando escalado continuo entre dispositivos móviles (320px) y pantallas ultra-anchas (1920px).",
        model: "DeepSeek V4",
        prompt: `Eres un Desarrollador Frontend Matematico especializado en Diseno Fluido y Escalas Continuas.
[COPIA AQUI TU IDEA]

Calcula e implementa las formulas fluidas de tipografia y espaciado utilizando 'clamp(min, preferred, max)':
1. Definicion de los limites del viewport: Viewport Minimo (V_min = 320px / 20rem) y Viewport Maximo (V_max = 1440px / 90rem).
2. Para cada nivel tipografico, definir el Tamano Minimo en movil (T_min) y Tamano Maximo en escritorio (T_max).
3. Derivacion matematica formal de la funcion lineal:
   - Pendiente (Slope): m = (T_max - T_min) / (V_max - V_min).
   - Interseccion (Y-Intercept): b = T_min - m * V_min.
   - Expresion resultante: 'clamp(T_min, calc(b + m * 100vw), T_max)'.
4. Extension de la misma metodologia para el espaciado entre secciones (paddings y gaps fluidos) para que la interfaz respire naturalmente sin saltos bruscos.
5. Proteccion de accesibilidad: verificar que el usuario puede aplicar zoom de texto al 200% en el navegador sin romper la disposicion (criterio 1.4.4 de WCAG).

Restricciones:
- Todos los valores base deben expresarse en unidades relativas 'rem' para respetar la configuracion de fuente del usuario.

Formato de salida: Hoja de estilos CSS con las variables fluidas generadas y calculadora explicativa en Python para reproducir las formulas.`,
        tags: ["clamp", "diseño-fluido", "tipografía-fluida", "cálculo-responsive", "rem"]
      },
      {
        id: "dis-022",
        title: "Pruebas de Estrés de Viewport y Detección de Desbordamientos Horizontales",
        desc: "Detecta causas de scroll horizontal no deseado, textos cortados y colapso de flexbox/grid en viewports extremos.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Calidad de Layout Frontend y Depurador de CSS.
[COPIA AQUI TU IDEA]

Disena la suite de diagnostico y resolucion de problemas de layout y desbordamiento horizontal:
1. Script de deteccion de scroll horizontal involuntario: algoritmo en JavaScript que recorra todos los nodos del DOM identificando elementos donde 'element.scrollWidth > document.documentElement.clientWidth'.
2. Causas comunes diagnosticadas y corregidas:
   - Elementos con 'width: 100vw' que no descuentan el grosor de la barra de desplazamiento (sustituir por 'width: 100%').
   - Palabras o URLs largas que no quiebran linea (aplicar 'overflow-wrap: break-word' y 'hyphens: auto').
   - Contenedores Flexbox donde los hijos se niegan a encogerse (aplicar 'min-width: 0' a los items de flex).
   - Tablas de datos que rompen el ancho de pantalla (implementar contenedor con scroll horizontal interno o transformacion a tarjetas en movil).
3. Verificacion en viewports extremos: pantallas ultra-estrechas (280px tipo Galaxy Fold cerrado) y monitores ultra-anchos (3440px Ultrawide) asegurando contencion con 'max-width'.

Restricciones:
- No apliques el antipatron 'overflow-x: hidden' en el elemento 'body' como parche ciego; soluciona la causa raiz en el elemento desbordante.

Formato de salida: Script de depuracion en consola del navegador y reglas de CSS defensivo para prevenir desbordamientos.`,
        tags: ["overflow", "scroll-horizontal", "css-defensivo", "depuración-ui", "flexbox-fix"]
      },
      {
        id: "dis-023",
        title: "Estrategias de Adaptación para Interfaces Táctiles vs Ratón/Puntero",
        desc: "Adapta la densidad de controles y eventos según la capacidad táctil primaria del dispositivo (@media hover/pointer).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Ergonomia de Dispositivos e Interaccion Multimodal (Touch vs Cursor).
[COPIA AQUI TU IDEA]

Disena la adaptacion de la interfaz en funcion de los perifericos reales mediante Interaction Media Features:
1. '@media (hover: hover) and (pointer: fine)': usuario con raton de precision.
   - Densidad de informacion mas compacta, menus contextuales al pasar el raton (hover), tooltips explicativos y barras de desplazamiento sutiles.
2. '@media (hover: none) and (pointer: coarse)': usuario con pantalla tactil (smartphone o tablet).
   - Aumento automatico del area de contacto de botones e inputs a minimo 44x44 px.
   - Eliminacion de dependencias de eventos hover para revelar acciones clave; sustitucion por botones explicitos permanentes o gestos deslizables (Swipe Actions).
   - Desactivacion de tooltips basados en raton y sustitucion por modales inferiores (Bottom Sheets).
3. Espaciado comodo en zonas de alcance natural del pulgar (Thumb Zone) en dispositivos moviles (acciones principales fijadas en la barra inferior).

Restricciones:
- No utilices unicamente el ancho de pantalla para asumir que el dispositivo es tactil (las laptops modernas tienen pantallas tactiles de 15 pulgadas).

Formato de salida: Codigo CSS modular utilizando media queries de interaccion y guia de adaptacion de componentes.`,
        tags: ["touch-vs-pointer", "ergonomía-móvil", "thumb-zone", "media-queries-interacción", "hover"]
      },
      {
        id: "dis-047",
        title: "Sistemas de Layout Adaptables mediante CSS Subgrid y Container Queries Avanzadas",
        desc: "Construye componentes que responden dinámicamente al ancho de su contenedor padre (@container) y no solo al viewport.",
        model: "DeepSeek V4",
        prompt: `Eres un Arquitecto CSS y Especialista en Maquetación Moderna y Diseño Modular.
[COPIA AQUI TU IDEA]

Desarrolla el layout de componentes reutilizables utilizando Container Queries ('@container') y CSS Subgrid:
1. Declaracion de contextos de contenedor en elementos padre: 'container-type: inline-size; container-name: card-container;'.
2. Adaptacion autonoma del componente hijo segun el ancho disponible en su contenedor (independientemente de si se monta en una barra lateral estrecha de 300px o en un area principal de 800px):
   - Contenedor < 400px: disposicion vertical apilada, imagen superior, botones de accion en ancho completo.
   - Contenedor entre 400px y 700px: disposicion horizontal de dos columnas con alineacion lateral.
   - Contenedor > 700px: disposicion extendida tipo dashboard con metadatos y graficos secundarios desplegados.
3. Alineacion de filas internas heterogeneas mediante CSS 'grid-template-rows: subgrid': garantizar que las cabeceras, parrafos de descripcion y botones de tarjetas adyacentes queden perfectamente alineados verticalmente entre si sin importar la variacion de lineas de texto.
4. Reduccion radical de la dependencia de media queries globales de pantalla en favor de componentes 100% autocontenidos.
5. Estrategia de polyfill o soporte progresivo para entornos sin soporte nativo de subgrid.

Restricciones:
- Asegura que el contenedor mantenga un rendimiento optimo de renderizado evitando loops de resize.

Formato de salida: Componente maquetado en HTML semantico y CSS moderno con reglas '@container' y 'subgrid' comentadas.`,
        tags: ["container-queries", "subgrid", "css-moderno", "modular", "layouts", "responsive"]
      },
      {
        id: "dis-048",
        title: "Diseño de Interfaces para Dispositivos Plegables (Foldables) con CSS Viewport Segments",
        desc: "Adapta layouts a dispositivos con doble pantalla o bisagra física utilizando las CSS Foldable Media Features.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Diseñador de Interfaces Móviles Avanzadas y Dispositivos de Factor de Forma Plegable (Foldables).
[COPIA AQUI TU IDEA]

Crea la interfaz responsiva adaptada a dispositivos plegables (Samsung Galaxy Fold, Google Pixel Fold, Surface Duo):
1. Deteccion de la bisagra fisica o pliegue mediante la media feature oficial: '@media (horizontal-viewport-segments: 2)' y '@media (vertical-viewport-segments: 2)'.
2. Uso de las variables de entorno de pantalla de la especificacion CSS: 'env(viewport-segment-width 0 0)', 'env(viewport-segment-top 0 1)' para posicionar contenidos en cada mitad fisica sin que el pliegue corte elementos de texto o botones.
3. Diseno de vistas complementarias (Dual-Screen Modes):
   - Modo Libro (Book Mode): panel de navegacion/lista en la pantalla izquierda y panel de detalle extendido en la pantalla derecha.
   - Modo Portatil (Tent / Tabletop Mode): pantalla superior como visor de contenido o reproductor de video y pantalla inferior como teclado virtual o panel de controles tactiles.
4. Adaptacion ergonomica de zonas tactiles: ubicacion de acciones primarias en los cuadrantes inferiores al alcance natural de los pulgares.
5. Transicion continua de estado (App Continuity): comportamiento de la aplicacion al desplegarse o cerrarse la pantalla sin perdida de estado de navegacion ni recarga de la pagina.

Restricciones:
- Ningun elemento interactivo ni campo de entrada de texto debe quedar situado sobre la franja central de la bisagra.

Formato de salida: Hoja de estilos CSS con media features de segmentos de viewport y maqueta de componente React adaptable.`,
        tags: ["foldables", "pantallas-plegables", "viewport-segments", "mobile-ux", "responsive", "css-env"]
      },
      {
        id: "dis-049",
        title: "Patrones UI Accesibles para Visualización de Datos Masivos y Gráficos SVG con Soporte Screen Reader",
        desc: "Diseña gráficos interactivos que ofrecen representación textual alternativa completa, navegación por teclado y patrones de textura.",
        model: "GPT-4o",
        prompt: `Eres un Ingeniero de Visualización de Datos Accesible y Consultor de Información Inclusiva.
[COPIA AQUI TU IDEA]

Construye el sistema de componentes para graficos estadisticos interactivos (lineas, barras, dispersion) plenamente accesibles:
1. Accesibilidad para lectores de pantalla en elementos SVG:
   - Estructura formal de etiquetas '<title>' y '<desc>' proporcionando el resumen ejecutivo del hallazgo principal del grafico (no solo listar numeros).
   - Roles ARIA adecuados: 'role="graphics-document"', 'role="graphics-symbol"'.
2. Navegacion secuencial completa por teclado: capacidad de recorrer cada punto de datos o barra individual mediante las teclas de flecha (ArrowLeft/ArrowRight) anunciando valor numerico, fecha y porcentaje relativo.
3. Alternativa tabular sincronizada: boton accesible para conmutar entre visualizacion grafica y tabla HTML nativa accesible ('<table>', '<th>', 'scope="col"').
4. No dependencia exclusiva del color para usuarios daltonicos: aplicacion combinada de paletas de color accesibles junto con patrones de relleno geometrico (rayas diagonales, puntos, tramas) y formas distintivas de puntos (circulo, triangulo, cuadrado).
5. Sonificacion de datos (Data Sonification): generacion opcional de tonos sonoros con variacion de frecuencia proporcional al valor del dato para explorar tendencias mediante sonido.

Restricciones:
- Garantiza que las etiquetas emergentes (Tooltips) sean accesibles por foco de teclado y que no desaparezcan al posar el cursor sobre ellas (WCAG 1.4.13 Content on Hover or Focus).

Formato de salida: Componente de grafico en React con D3.js / SVG accesible y tabla alternativa sincronizada en tiempo real.`,
        tags: ["dataviz", "svg-accesible", "a11y", "screen-reader", "sonificación", "gráficos-inclusivos"]
      }
    ]
  },
  {
    id: "generador-microcopy",
    name: "Generador de Microcopy y UX Writing / Echo (DS1.5)",
    prompts: [
      {
        id: "dis-024",
        title: "Matriz de Microcopy para Mensajes de Error Constructivos y Empáticos",
        desc: "Transforma errores técnicos crípticos en mensajes claros que explican qué ocurrió y cómo resolverlo en un clic.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un UX Writer Senior y Especialista en Arquitectura de Contenidos de Producto.
[COPIA AQUI TU IDEA]

Crea la matriz de microcopy para la gestion de errores y excepciones del sistema:
1. Estructura obligatoria en 3 partes de cada mensaje de error:
   - Que ocurrio (claridad sin culpar al usuario ni usar codigos tecnicos crudos como 'Error 500' o 'NullPointerException').
   - Por que ocurrio (contexto breve y comprensible).
   - Como resolverlo de inmediato (accion directa con verbo en imperativo o boton de reintento/solucion).
2. Tono de voz: empatico, profesional, sereno y orientado a la resolucion; prohíbete el uso de sarcasmos, mayusculas sostenidas o signos de exclamacion excesivos que transmitan alarma.
3. Cobertura de errores criticos comunes: fallo de conexion a internet, sesion expirada con formulario a medio rellenar, tarjeta de credito rechazada, archivo adjunto demasiado pesado y formato de entrada no valido.
4. Ubicacion del mensaje: validacion en linea inmediata (Inline Validation) bajo el campo afectado, no acumulada al final de la pagina.

Restricciones:
- Cada mensaje de error debe incluir el texto exacto del boton de llamada a la accion (CTA) de recuperacion.

Formato de salida: Matriz de UX Writing en tabla Markdown con columnas [Codigo Interno, Contexto, Mensaje Visible al Usuario, Texto del CTA, Accion Tecnica Asociada].`,
        tags: ["ux-writing", "microcopy", "mensajes-error", "empatía", "resolución"]
      },
      {
        id: "dis-025",
        title: "Diseño de Estados Vacíos (Empty States) Atractivos y Proactivos",
        desc: "Convierte pantallas sin datos en oportunidades educativas que guían al usuario hacia su primera acción de éxito.",
        model: "Gemini 2.5 Flash",
        prompt: `Eres un Estratega de Producto y Disenador de Activacion de Usuarios (Onboarding UX).
[COPIA AQUI TU IDEA]

Disena el estado vacio (Empty State) para la seccion de la aplicacion que aun no tiene datos creados:
1. Tipologia del estado vacio: Primera vez (First Use), Resultado de busqueda sin coincidencias o Tarea completada con exito (Zero Inbox).
2. Ilustracion o elemento visual metaforico: concepto grafico sobrio y alineado con la marca que refuerce el estado sin infantilizar la herramienta.
3. Titular conciso: comunicacion clara de que el espacio esta listo para recibir informacion (ej: 'Aun no hay proyectos creados').
4. Texto explicativo: parrafo de 2 lineas explicando el beneficio que obtendra el usuario al crear su primer elemento.
5. Boton de llamada a la accion principal (Primary Action CTA): accion directa y sin rodeos (ej: 'Crear mi primer proyecto') con atajo de teclado destacado.
6. Enlace secundario a plantilla o guia rapida de inicio para usuarios indecisos.

Restricciones:
- Evita dejar pantallas en blanco que hagan dudar al usuario de si la aplicacion sufrio un error de carga de red.

Formato de salida: Especificacion de contenido y wireframe conceptual en Markdown con textos finales listos para implementacion.`,
        tags: ["empty-states", "onboarding", "activación", "microcopy", "cta"]
      },
      {
        id: "dis-026",
        title: "Diseño de Flujo de Onboarding Conversacional y Progresivo",
        desc: "Estructura la bienvenida interactiva reduciendo el tiempo hasta el primer momento Eureka (Time-to-Value).",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Disenador de Experiencia de Producto enfocado en Retencion de Usuarios y Product-Led Growth (PLG).
[COPIA AQUI TU IDEA]

Disena la experiencia de incorporacion (Onboarding Flow) para un nuevo usuario de la aplicacion:
1. Estrategia de Divulgacion Progresiva (Progressive Disclosure): no abrumar al usuario con un tutorial estatico de 10 pantallas que todos saltan; ensenar haciendo dentro del contexto real de trabajo.
2. Secuencia de bienvenida guiada: maximo 3 pasos orientados a que el usuario alcance su primer resultado de valor tangible (Aha! Moment) en menos de 90 segundos.
3. Microcopy conversacional: tono cercano, acogedor y motivador que reconozca los logros del usuario en cada paso completado.
4. Indicador de progreso visual: barra o pasos numerados (ej: 'Paso 2 de 3: Configura tu primera regla') que reduzcan la ansiedad y muestren la cercania del final.
5. Opcion permanente y visible para saltar el onboarding ('Configurar mas tarde') respetando la autonomia del usuario avanzado.

Restricciones:
- Minimizacion de campos obligatorios: solicitar unicamente la informacion estrictamente indispensable para comenzar.

Formato de salida: Guion interactivo paso a paso en Markdown con textos de pantallas, disparadores de evento y criterios de exito.`,
        tags: ["onboarding", "time-to-value", "plg", "retención", "divulgación-progresiva"]
      },
      {
        id: "dis-027",
        title: "Glosario de Términos y Consistencia de Lenguaje en la Interfaz (UI Terminology)",
        desc: "Unifica la terminología técnica del producto evitando sinónimos ambiguos (Crear vs Añadir vs Nuevo).",
        model: "GPT-4o",
        prompt: `Eres un Arquitecto de Informacion y Responsable de Terminologia Corporativa de Software.
[COPIA AQUI TU IDEA]

Crea el Glosario de Terminologia de Interfaz para garantizar una coherencia verbal absoluta en todo el producto:
1. Unificacion de verbos de accion nuclear: definir y fijar el uso exclusivo de un unico termino por accion (ej: elegir entre 'Guardar' vs 'Salvar', 'Eliminar' vs 'Borrar', 'Anadir' vs 'Crear').
2. Nomenclatura de entidades maestras de datos: como se denominan los objetos centrales de la aplicacion en singular, plural y estado posesivo.
3. Tratamiento de usuario y registro gramatical: definicion rigurosa del tono de tratamiento en espanol (uso coherente de tuteo 'tu perfil' vs formal 'su cuenta' o infinitivo neutro).
4. Capitalizacion de textos: estandar de uso de Title Case vs Sentence Case en botones, pestanas, encabezados y opciones de menu.
5. Tabla de antipatrones verbales: lista de expresiones prohibidas por causar confusion o sonar excesivamente roboticas.

Restricciones:
- Las directrices deben ser de aplicacion universal tanto en la aplicacion web, aplicacion movil como en las comunicaciones por email.

Formato de salida: Glosario normativo de UI en Markdown con tablas de definicion de terminos, contexto de uso y ejemplos de implementacion.`,
        tags: ["glosario-ui", "consistencia-verbal", "terminología", "ux-writing", "estilo"]
      },
      {
        id: "dis-050",
        title: "Estrategia de Contenido y Mensajería de Error Asistida con Prevención de Culpa del Usuario",
        desc: "Redacta microcopy empático que explica claramente el problema técnico, la causa y la solución en un solo clic.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Diseñador de Contenido (UX Writer) y Estratega de Microcopy para Interfaces Críticas.
[COPIA AQUI TU IDEA]

Elabora la guia de microcopy y el sistema de redaccion de mensajes de error y advertencia de la aplicacion:
1. Principios cardinales de redaccion: lenguaje claro y desprovisto de codigos tecnicos ininteligibles (prohibido mostrar 'Error 0x80004005' o 'NullPointerException' al usuario final).
2. Estructura trifasica obligatoria de todo mensaje de error:
   - Que ha ocurrido (en lenguaje humano, directo y transparente).
   - Por que ha ocurrido (sin atribuir nunca la culpa al usuario).
   - Que puede hacer el usuario para solucionarlo ahora mismo (con boton de accion directa o llamada a reintento).
3. Matriz de microcopy para los 10 errores mas frecuentes: error de conexion, sesion caducada, archivo demasiado pesado, formato no soportado, pago rechazado, conflicto de concurrencia.
4. Redaccion de estados vacios (Empty States): mensajes motivadores que guian hacia la primera accion util en lugar de mostrar una pantalla en blanco.
5. Tono de voz contextual: equilibrado, sereno y resolutivo en transacciones financieras o legales; amigable y cercano en tareas cotidianas.

Restricciones:
- No utilices lenguaje pasivo-agresivo ni exclamaciones de alarma ('Error!', 'Atencion!') que incrementen la ansiedad del usuario.

Formato de salida: Guia de UX Writing en Markdown con tabla de antes/despues para 15 mensajes criticos y catalogo de microcopy.`,
        tags: ["ux-writing", "microcopy", "mensajes-error", "empty-states", "empatía", "contenido-ui"]
      },
      {
        id: "dis-051",
        title: "Diseño de Microcopy Contextual para Permisos Sensibles (Geolocalización, Cámara, Notificaciones)",
        desc: "Crea diálogos previos explicativos (Pre-Permission Prompts) que maximizan la tasa de aceptación de permisos del sistema.",
        model: "GPT-4o",
        prompt: `Eres un Consultor de Conversión Móvil y Diseñador de Experiencias de Incorporación (Onboarding UX).
[COPIA AQUI TU IDEA]

Disena la estrategia de microcopy y dialogos previos explicativos (Pre-Permission Dialogs) para la solicitud de permisos de navegador y sistema:
1. Principio del momento adecuado (Just-in-Time Permission): nunca solicitar permisos criticos (geolocalizacion, microfono, notificaciones push) nada mas abrir la aplicacion por primera vez.
2. Pantalla previa explicativa propia (Pre-Prompt): antes de disparar el dialogo nativo irreversible del navegador/sistema operativo, mostrar una modal interna de diseno donde se explique el beneficio directo tangible para el usuario.
3. Propuesta de valor explicita: responder a la pregunta del usuario '¿Que gano yo autorizando este permiso?' (ej: en lugar de 'Necesitamos tu ubicacion', usar 'Para mostrarte los centros medicos mas cercanos a menos de 5 minutos de ti').
4. Gestion del rechazo con gracia: si el usuario rechaza en la modal previa, mantener intacta la posibilidad de pedirlo mas adelante sin que quede bloqueado a nivel de sistema.
5. Guiado paso a paso de recuperacion si el permiso ya fue denegado en el navegador (instrucciones claras con capturas graficas de como reactivarlo en los ajustes del candado de la URL).

Restricciones:
- Cumple con las directrices de privacidad y directivas de tiendas de aplicaciones (App Store Review Guidelines y Google Play Policy).

Formato de salida: Flujo de microcopy completo en Markdown con textos exactos para modales previas de Ubicacion, Notificaciones y Archivos.`,
        tags: ["permisos", "pre-prompts", "onboarding", "ux-writing", "notificaciones", "conversión"]
      }
    ]
  },
  {
    id: "validador-consistencia",
    name: "Validador de Consistencia Visual / Pixel (DS1.6)",
    prompts: [
      {
        id: "dis-028",
        title: "Detección de Inconsistencias de Espaciado y Rupturas de Cuadrícula (8pt Grid)",
        desc: "Audita archivos CSS identificando márgenes, paddings y gaps arbitrarios que no respetan múltiplos de 4px u 8px.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Calidad Visual Frontend y Especialista en Sistemas de Reticula de 8 Puntos (8pt Grid System).
[COPIA AQUI TU IDEA]

Desarrolla el script y reglas de linting para auditar y corregir inconsistencias de espaciado en la interfaz:
1. Principio rector de espaciado: todos los valores de 'margin', 'padding' y 'gap' deben ser estrictamente multiplos de 8px (o 4px para micro-espacios internos): 4, 8, 12, 16, 24, 32, 48, 64px.
2. Deteccion automatica de 'valores magicos' o arbitrarios en el codigo CSS (ej: 'margin-top: 13px;', 'padding: 7px 11px;').
3. Mapeo de reemplazo automatico: asociar cada valor arbitrario detectado con el token de espaciado semantico mas cercano (ej: 13px -> 'var(--space-md)' que vale 16px).
4. Verificacion de ritmo vertical: asegurar que la distancia entre parrafos, titulos y contenedores mantiene proporciones armonicas constantes.
5. Configuracion de reglas personalizadas para Stylelint que bloqueen en la integracion continua (CI) cualquier commit con espaciados fuera de norma.

Restricciones:
- Proporciona un margen de tolerancia explicable antes de sugerir la correccion.

Formato de salida: Script de analisis en Python/Node.js y archivo de configuracion '.stylelintrc.json' con reglas de validacion estricta.`,
        tags: ["grid-8pt", "espaciado", "stylelint", "consistencia-visual", "linting"]
      },
      {
        id: "dis-029",
        title: "Auditoría de Componentes Duplicados y Reducción de Deuda Visual",
        desc: "Detecta botones, modales y tarjetas redundantes creadas ad-hoc consolidándolas en componentes del Design System.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Arquitecto de Sistemas de Diseno especializado en Refactorizacion y Limpieza de Deuda Visual.
[COPIA AQUI TU IDEA]

Audita la base de codigo del frontend para identificar y consolidar componentes duplicados o divergentes:
1. Barrido de componentes: localizar todas las variantes de botones o tarjetas implementadas en diferentes carpetas del proyecto.
2. Matriz de divergencias: registrar que variantes son identicas en funcionalidad pero difieren en padding, color de borde o sombra debido a estilos ad-hoc.
3. Diseno del componente maestro unificado: crear un unico componente canonico configurable mediante propiedades (Props) tipadas: 'variant' (primary, secondary, ghost), 'size' (sm, md, lg) y 'intent' (danger, success, info).
4. Plan de migracion y deprecacion: marcar los componentes duplicados antiguos con advertencias en consola ('@deprecated') e instrucciones para migrar al nuevo componente central.
5. Cuantificacion del ahorro: estimar la reduccion de lineas de codigo CSS y tamano del paquete final tras la consolidacion.

Restricciones:
- No elimines variantes visuales que respondan a una necesidad legitima de diseno; unificalas formalmente en el sistema.

Formato de salida: Informe de consolidacion de componentes en Markdown y codigo TypeScript/React del nuevo componente maestro.`,
        tags: ["componentes-duplicados", "deuda-visual", "refactorización", "props", "unificación"]
      },
      {
        id: "dis-030",
        title: "Validación de Jerarquía Visual y Puntos Focales mediante Mapas de Atención",
        desc: "Audita la distribución del peso visual garantizando que el ojo del usuario viaja naturalmente hacia el CTA principal.",
        model: "DeepSeek V4",
        prompt: `Eres un Investigador de Atencion Visual y Ergonomia de Pantalla.
[COPIA AQUI TU IDEA]

Analiza la jerarquia visual y la distribucion del peso optico de la pantalla aportada:
1. Identificacion del Punto Focal Primario: ¿hacia donde se dirige involuntariamente la mirada del usuario en los primeros 500 milisegundos?
2. Patron de escaneo dominante: comprobar si la pagina favorece el patron de lectura en F (para paginas de texto denso) o patron en Z (para paginas de aterrizaje orientadas a conversion).
3. Evaluacion del Peso Visual Relativo: contraste de escala, color, peso tipografico y aislamiento por espacio blanco de los elementos interactivos.
4. Deteccion de competencia visual destructiva: identificar cuando dos elementos compiten por la misma atencion visual (ej: dos botones primarios gigantes en la misma seccion).
5. Ajustes de rebalanceo: recomendaciones precisas para atenuar elementos secundarios y reforzar la prominencia del boton de accion principal.

Restricciones:
- Apoya el diagnostico en los principios de procesamiento visual preatentivo (color, intensidad, orientacion y tamano).

Formato de salida: Analisis de jerarquia visual en Markdown con evaluacion cuantitativa de pesos y propuesta de rediseño.`,
        tags: ["jerarquía-visual", "atención", "patrón-f", "patrón-z", "puntos-focales"]
      },
      {
        id: "dis-031",
        title: "Alineación y Sincronización entre Figma y Código Fuente (Figma-to-Code Parity)",
        desc: "Audita discrepancias entre el archivo de diseño en Figma y la interfaz en producción identificando desviaciones.",
        model: "GPT-4o",
        prompt: `Eres un Lead Design Technologist y Puente entre los Equipos de Diseno UI y Desarrollo Frontend.
[COPIA AQUI TU IDEA]

Ejecuta la auditoria de paridad entre los componentes disenados en Figma y los componentes implementados en produccion:
1. Cotejo visual y dimensional: discrepancias en radios de borde (ej: 8px en Figma vs 6px en CSS), sombras y opacidades.
2. Cotejo de tipografia: verificacion de que el interlineado, tamano de fuente y grosor coinciden pixel a pixel con las especificaciones de diseno.
3. Cobertura de estados: verificar si los desarrolladores implementaron todos los estados contemplados en Figma (Hover, Active, Focus, Loading, Empty, Error).
4. Nomenclatura compartida: asegurar que los nombres de las propiedades en Figma ('size=medium', 'state=disabled') coinciden exactamente con los Props de React/Vue.
5. Propuesta de automatizacion: flujo de trabajo para detectar desalineaciones visuales en los Pull Requests antes de pasar a produccion.

Restricciones:
- Clasifica cada discrepancia segun su visibilidad para el usuario final y su impacto en la calidad del producto.

Formato de salida: Tabla de discrepancias Figma vs Codigo en Markdown con capturas de medicion y correcciones de CSS exactas.`,
        tags: ["figma-to-code", "paridad", "design-technologist", "handoff", "auditoría-pixel"]
      },
      {
        id: "dis-052",
        title: "Auditoría de Componentes Huérfanos y Deriva Estilística (Style Drift) en Código Frontend",
        desc: "Analiza repositorios React/Vue para detectar clases CSS hardcodeadas, componentes duplicados y desvíos del Design System.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Calidad de Código UI y Auditor de Deuda Técnica en Sistemas de Diseño.
[COPIA AQUI TU IDEA]

Crea el script de analisis estatico y auditoria de deriva estilistica (Style Drift) sobre una base de codigo frontend:
1. Deteccion y conteo de valores de estilo arbitrarios hardcodeados (ej: colores hexadecimales '#1a2b3c', paddings arbitrarios 'p-[13px]', z-index dispersos).
2. Identificacion de componentes huerfanos o clones no oficiales (ej: tres implementaciones distintas de un boton 'CustomButton.jsx', 'NewBtn.jsx', 'ActionButton.jsx' conviviendo en el mismo repositorio).
3. Medicion del indice de adopcion del sistema de diseno: porcentaje de componentes en produccion que importan directamente componentes oficiales del paquete '@design-system/core'.
4. Deteccion de violaciones de accesibilidad estaticas en plantillas JSX mediante reglas ESLint A11y (imagenes sin atributo 'alt', botones sin texto accesible, inputs sin etiqueta 'label').
5. Generacion de un informe de deuda visual con asignacion de severidad y propuesta de refactorizacion paso a paso.

Restricciones:
- Optimiza el escaneo para repositorios con miles de ficheros ejecutando el analisis en menos de 10 segundos.

Formato de salida: Script en Node.js o Python con salida en terminal formateada y generacion de reporte ejecutivo en Markdown.`,
        tags: ["deuda-técnica", "style-drift", "auditoría-código", "componentes-huérfanos", "eslint-a11y", "refactoring"]
      },
      {
        id: "dis-053",
        title: "Testing Visual Automatizado de Regresión con Playwright y Pixelmatch",
        desc: "Compara capturas de componentes en múltiples navegadores y resoluciones detectando diferencias a nivel de píxel.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Ingeniero de Automatización de Pruebas Frontend (QA Automation) Especialista en Visual Regression Testing.
[COPIA AQUI TU IDEA]

Implementa el conjunto de pruebas de regresion visual automatizada utilizando Playwright y la biblioteca 'pixelmatch':
1. Configuracion de la suite de pruebas para capturar instantaneas de componentes en multiples resoluciones: Movil (375x667), Tablet (768x1024) y Escritorio (1440x900).
2. Pruebas cruzadas en multiples motores de navegacion: Chromium, Firefox y WebKit (Safari).
3. Aislamiento del entorno para prevenir falsos positivos por parpadeo:
   - Desactivacion de animaciones y transiciones CSS antes de la captura.
   - Enmascaramiento de elementos con datos dinamicos (relojes, marcas temporales, avatares aleatorios).
   - Espera explicita a la carga completa de fuentes tipograficas e imagenes ('document.fonts.ready').
4. Umbral de tolerancia configurable (Threshold de mismatch < 0.05%) con generacion de imagenes compuestas de diff resaltando los pixeles alterados en color magenta.
5. Integracion en el flujo de CI/CD para bloquear automaticamente el merge de Pull Requests que alteren involuntariamente el aspecto visual de componentes clave.

Restricciones:
- Asegura que las pruebas se ejecuten en contenedores Docker estandarizados para que las diferencias de renderizado de fuentes entre sistemas operativos (Linux vs macOS vs Windows) no generen diferencias espurias.

Formato de salida: Script de prueba en TypeScript con Playwright Test y archivo de configuracion 'playwright.config.ts'.`,
        tags: ["testing-visual", "playwright", "pixelmatch", "regresión", "qa-automation", "ci-cd"]
      }
    ]
  },
  {
    id: "secundarios",
    name: "Tareas Secundarias (Design Systems, Accesibilidad y Handoff)",
    prompts: [
      {
        id: "dis-032",
        title: "Exportación de Historias Interactivas a Storybook con Controles Dinámicos",
        desc: "Genera archivos Component.stories.jsx completos con controles interactivos (ArgTypes) y addons de a11y.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Especialista en Storybook y Desarrollo de Componentes Aislados en Frontend.
[COPIA AQUI TU IDEA]

Escribe el archivo de historias interactivo para Storybook 8 siguiendo el estandar Component Story Format (CSF 3):
1. Configuracion de metadatos (Meta): titulo jerarquico ('Design System/Components/Button'), componente referenciado y etiquetas para autodocumentacion.
2. Definicion de controles interactivos dinamicos ('argTypes') que permitan variar props en tiempo real (selectores para variantes, toggles booleanos para estados, inputs de texto).
3. Historias individuales para cada estado y variante clave: historia Default, Primary, Secondary, Outline, Disabled, Con Icono y Estado de Carga.
4. Integracion de pruebas de accesibilidad: ejecucion automatica del addon '@storybook/addon-a11y' en cada historia para certificar 0 violaciones de contraste o marcado.
5. Parametrizacion de pruebas de interaccion mediante la funcion 'play' simulando clics de usuario y foco de teclado con '@storybook/test'.

Restricciones:
- Codigo limpio, modular, completamente tipado y listo para copiar en el repositorio de frontend.

Formato de salida: Archivo de codigo completo 'Component.stories.jsx' listo para ser ejecutado por el servidor de Storybook.`,
        tags: ["storybook", "csf3", "historias", "argtypes", "pruebas-interacción"]
      },
      {
        id: "dis-033",
        title: "Automatización de Pruebas de Regresión Visual con Playwright y Pixelmatch",
        desc: "Configura tests visuales que comparan capturas de pantalla de componentes contra imágenes de referencia aprobadas.",
        model: "DeepSeek V4",
        prompt: `Eres un Ingeniero de Automatizacion de Calidad Visual (Visual Regression Testing).
[COPIA AQUI TU IDEA]

Configura la suite automatizada de pruebas de regresion visual utilizando Playwright:
1. Configuracion de la prueba: captura de pantalla completa o a nivel de componente aislado bajo viewports movil (375x667) y escritorio (1280x720).
2. Comparativa contra imagen de referencia aprobada (Golden Master Image): uso de 'toHaveScreenshot()' con umbral de tolerancia estricto (maxDiffPixels: 50, threshold: 0.2).
3. Enmascaramiento de elementos dinamicos: ocultacion automatica de fechas, avatares aleatorios o datos cambiantes que puedan provocar falsos positivos.
4. Soporte para temas: ejecucion de la suite tanto en tema claro como en tema oscuro.
5. Flujo de actualizacion de capturas: comando y protocolo para aprobar intencionadamente un nuevo diseno ('playwright test --update-snapshots').

Restricciones:
- Congela todas las animaciones y fuentes web antes de tomar la captura para asegurar determinismo absoluto en entornos CI/CD (Docker).

Formato de salida: Script de prueba en TypeScript 'component.visual.spec.ts' y archivo de configuracion 'playwright.config.ts'.`,
        tags: ["regresión-visual", "playwright", "pixelmatch", "capturas", "ci-cd"]
      },
      {
        id: "dis-034",
        title: "Checklist Exhaustivo de Pre-Lanzamiento de Interfaz de Usuario (Pre-Flight UI)",
        desc: "Lista de control pericial de 25 puntos críticos antes de autorizar el despliegue de una nueva pantalla a producción.",
        model: "GPT-4o",
        prompt: `Eres un Quality Assurance Lead y Guardian de la Experiencia de Usuario previo al lanzamiento.
[COPIA AQUI TU IDEA]

Elabora el checklist pericial de control de calidad visual y funcional antes de aprobar el paso a produccion:
1. Verificacion de Estados: comprobar estado vacio, estado de carga con skeleton, estado de error y estado de exito en todas las acciones.
2. Verificacion de Responsividad: probar en viewports de 320px, 375px, 768px, 1024px y 1440px sin scroll horizontal involuntario.
3. Verificacion de Accesibilidad: contraste de color validado, navegacion con teclado fluida y foco visible en todos los botones.
4. Verificacion Tipografica y de Textos: ortografia y gramatica revisadas, ningun texto cortado y soporte para cadenas de texto largas traducidas.
5. Verificacion de Rendimiento: tiempos de animacion estables a 60 FPS, imagenes optimizadas en WebP/AVIF con atributos de ancho/alto para evitar saltos CLS.

Restricciones:
- Cada punto debe tener un criterio de aceptacion binario (Pasa / Falla) y el metodo concreto de comprobacion.

Formato de salida: Lista de verificacion estructurada en Markdown con casillas de verificacion interactiva y categorizada por disciplinas.`,
        tags: ["checklist", "pre-lanzamiento", "qa-visual", "calidad-ui", "inspección"]
      },
      {
        id: "dis-035",
        title: "Especificación y Protocolo de Entrega de Diseño a Desarrollo (Design Handoff)",
        desc: "Documenta el paquete de entrega con medidas exactas, comportamientos de componentes y recursos listos para programar.",
        model: "Claude 3.7 Sonnet",
        prompt: `Eres un Lead Product Designer coordinando el traspaso formal de pantallas a los ingenieros frontend.
[COPIA AQUI TU IDEA]

Elabora el documento de especificacion tecnica para el traspaso de diseno a desarrollo (Handoff Pack):
1. Especificaciones de layout: distribucion en Flexbox / CSS Grid, paddings internos, gaps y alineaciones en cada breakpoint.
2. Especificacion de componentes utilizados: referencias directas a los identificadores del Design System evitando estilos ad-hoc.
3. Especificacion de interacciones y micro-animaciones: duraciones, curvas de aceleracion, estados interactivos y comportamiento de teclado.
4. Matriz de datos dinamicos: longitud maxima permitida de textos, comportamiento ante nombres extremadamente largos (truncado con puntos suspensivos vs salto de linea).
5. Recursos graficos exportables: lista de iconos SVG optimizados con SVGO, imagenes comprimidas e instrucciones de accesibilidad asociadas.

Restricciones:
- Cero ambiguedad; un desarrollador debe poder implementar la interfaz sin tener que consultar dudas al disenador.

Formato de salida: Guia de Handoff en Markdown estructurada por secciones y acompanada de especificaciones tecnicas directas.`,
        tags: ["handoff", "diseño-desarrollo", "especificación-ui", "coordinación", "svg"]
      },
      {
        id: "dis-036",
        title: "Auditoría de Accesibilidad Cognitiva y Diseño para la Neurodiversidad",
        desc: "Adapta la interfaz para personas con TDAH, dislexia, espectro autista o sobrecarga sensorial.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Accesibilidad Cognitiva, Neurodiversidad y Diseno Inclusivo.
[COPIA AQUI TU IDEA]

Audita y adapta la interfaz para garantizar la inclusion de usuarios neurodivergentes (TDAH, dislexia, autismo, ansiedad):
1. Prevencion de sobrecarga sensorial: permitir desactivar animaciones no esenciales, eliminar banners parpadeantes y reducir el ruido visual.
2. Legibilidad para personas con dislexia: evitar texto justificado a ambos lados (que crea rios de espacios en blanco confusos), interlineado generoso (1.5x) y parrafos cortos de maximo 3-4 lineas.
3. Soporte para deficit de atencion (TDAH): navegacion clara sin distracciones perifericas, tareas secuenciales guiadas paso a paso y estados claros de avance.
4. Claridad comunicativa para el espectro autista: lenguaje directo, instrucciones literales sin metaforas ambiguas o dobles sentidos y predictibilidad absoluta en los botones.
5. Gestion de la ansiedad: evitar temporizadores regresivos agresivos que generen estres innecesario; permitir guardar borradores y reanudar tareas mas tarde.

Restricciones:
- Alineate con las directrices del grupo de trabajo de accesibilidad cognitiva de la W3C (COGA - Cognitive and Learning Disabilities Accessibility Task Force).

Formato de salida: Dictamen de adaptacion cognitiva en Markdown con recomendaciones concretas de diseno y ejemplos comparativos.`,
        tags: ["neurodiversidad", "accesibilidad-cognitiva", "coga", "tdah", "dislexia", "inclusividad"]
      },
      {
        id: "dis-054",
        title: "Generador de Guías de Estilo y Documentación Interactiva en Storybook 8",
        desc: "Configura historias CSF3 con controles tipados, documentación autodocumentada con JSDoc y addons de accesibilidad a11y.",
        model: "DeepSeek V4",
        prompt: `Eres un Especialista en Documentación de Sistemas de Diseño y Storybook Lead.
[COPIA AQUI TU IDEA]

Crea la infraestructura de documentacion viva de componentes utilizando Storybook version 8 con formato Component Story Format 3 (CSF3):
1. Estructuracion de la historia con tipado de TypeScript ('Meta<typeof Component>' y 'StoryObj<typeof Component>').
2. Configuracion de controles interactivos (ArgTypes): definicion de controles ergonomicos para variantes (selectores de color, interruptores booleanos para estados de carga, campos de texto para children).
3. Documentacion automatica de propiedades a partir de comentarios JSDoc e interfaces TypeScript mediante '@storybook/addon-docs'.
4. Integracion del Addon de Accesibilidad ('@storybook/addon-a11y') para auditoria automatica en tiempo real de violaciones de contraste y jerarquia ARIA dentro del canvas.
5. Configuracion del conector de Figma para incrustar el marco de diseno original junto al componente de codigo interactivo.

Restricciones:
- Cada componente documentado debe contar al menos con 4 variantes de historia: Estado por Defecto, Estado Hover/Focus, Estado de Carga (Loading) y Estado Deshabilitado (Disabled).

Formato de salida: Archivos de historia en TypeScript 'Component.stories.tsx' y configuracion global '.storybook/main.ts'.`,
        tags: ["storybook-8", "csf3", "documentación", "a11y-addon", "typescript", "design-systems"]
      },
      {
        id: "dis-055",
        title: "Exportador de Iconos SVG Optimizados con Limpieza de Metadatos y Accesibilidad ARIA",
        desc: "Limpia paths redundantes, elimina ids duplicados y genera componentes React SVG tree-shakeable con currentColor.",
        model: "GPT-4o",
        prompt: `Eres un Desarrollador de Herramientas Gráficas Web y Optimización de Activos Vectoriales SVG.
[COPIA AQUI TU IDEA]

Construye el optimizador y convertidor de iconos SVG crudos procedentes de software de diseno (Figma, Illustrator) hacia componentes React optimizados:
1. Pipeline de limpieza con SVGO:
   - Eliminacion de metadatos inutiles (namespaces de Adobe, comentarios de editor, guias y capas ocultas).
   - Simplificacion y union de trazados vectoriales (Merge Paths) manteniendo precision visual con 2 decimales.
   - Eliminacion de atributos fijos de color ('fill="#123456"') sustituyendolos por 'fill="currentColor"' o 'stroke="currentColor"' para herencia directa de color tipografico.
2. Accesibilidad ARIA estricta:
   - Si el icono es decorativo: anadir automaticamente 'aria-hidden="true"' y 'focusable="false"'.
   - Si el icono es interactivo/informativo: anadir 'role="img"', etiqueta '<title>' y 'aria-label'.
3. Conversion a componentes React / TypeScript listos para 'Tree-Shaking' individual sin sobrecargar el bundle final.
4. Generacion de un visor interactivo de catalogo de iconos con filtro de busqueda por nombre y copia directa de codigo.

Restricciones:
- Asegura que el 'viewBox="0 0 24 24"' este unificado en todos los iconos del conjunto para garantizar consistencia dimensional.

Formato de salida: Script en Node.js utilizando 'svgo' y '@svgr/core' con transformacion por lotes y catalogo exportable.`,
        tags: ["svg", "svgo", "svgr", "iconos", "árbol-de-iconos", "optimización-web", "currentcolor"]
      }
    ]
  }
];

/**
 * Lista aplanada de todos los prompts de Diseño & UX/UI
 */
export const DISENO_PROMPTS = DISENO_CATEGORIES.flatMap(cat => 
  cat.prompts.map(p => ({
    ...p,
    areaId: "diseno",
    areaName: "Diseño & UX/UI",
    areaColor: "#EC4899",
    categoryId: cat.id,
    categoryName: cat.name,
  }))
);
