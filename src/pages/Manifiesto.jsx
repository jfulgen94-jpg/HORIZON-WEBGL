import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Cpu,
  FileText,
  Copy,
  Check,
  Download,
  ArrowRight,
  BookOpen,
  Sparkles,
  AlertTriangle,
  Scale,
  Activity,
  Layers,
  Search,
} from "lucide-react";

export default function Manifiesto() {
  const [copiedPrompt, setCopiedPrompt] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(key);
    setTimeout(() => setCopiedPrompt(null), 2500);
  };

  const PROMPT_MAESTRO = `Eres [NOMBRE_DEL_ASISTENTE], un agente de IA diseñado para [PROPÓSITO].

REGLAS OPERATIVAS (en orden de prioridad):
1. SIEMPRE cita tus fuentes. Si no tienes fuente, di [SIN FUENTE VERIFICADA].
2. SIEMPRE di "no sé" cuando no tengas información suficiente. Es mejor reconocer un límite que inventar una respuesta.
3. NUNCA inventes datos, cifras, estadísticas o referencias bibliográficas.
4. NUNCA emitas juicios de valor sobre personas o grupos. Describe hechos, no opiniones.
5. Cuando una pregunta pueda tener consecuencias legales, médicas o financieras, advierte explícitamente: "Consulta con un profesional antes de actuar".
6. Estructura tus respuestas así:
   - Resumen en 1-2 oraciones
   - Detalle con puntos clave
   - Limitaciones y advertencias
   - Fuentes (si las hay)

CONTEXTO DEL USUARIO:
- Nivel: [principiante/intermedio/avanzado]
- Área: [finanzas/medicina/derecho/etc.]
- Objetivo: [construir app para X]

NO ASUMAS conocimiento previo. Explica términos técnicos la primera vez que los uses.`;

  const downloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([PROMPT_MAESTRO], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "system_prompt_maestro_horizon.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const SECTIONS = [
    { id: "parte-1", label: "1. El Proceso Perfecto" },
    { id: "parte-2", label: "2. Razonamiento Aplicado" },
    { id: "parte-3", label: "3. Moral Operativa" },
    { id: "parte-4", label: "4. Eficiencia de No Alucinar" },
    { id: "parte-5", label: "5. Configuración Práctica" },
    { id: "parte-6", label: "6. El Framework Horizon" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0F1117] text-[#E8EAF0] pb-24" data-od-id="manifiesto-page">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#3B6FD4]/15 via-[#3B6FD4]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3B6FD4]/10 border border-[#3B6FD4]/30 text-[#3B6FD4] font-mono text-[11px] uppercase tracking-widest mb-6">
            <ShieldCheck size={14} />
            Pilar Filosófico y Técnico de Horizon
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F3F4F8] leading-[1.15] mb-6 font-medium tracking-tight">
            IA Responsable: Que No Alucine y Haga el Bien
          </h1>
          <p className="text-xl sm:text-2xl text-[#9BA3B8] font-light max-w-3xl mx-auto mb-6 leading-snug">
            Guia Filosofica y Tecnica para Construir con Inteligencia Artificial
          </p>
          <p className="font-mono text-xs text-[#3B6FD4] tracking-wider uppercase mb-8">
            Razonamiento aplicado, moral operativa y eficiencia real — una guía para quien construye con IA
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-white/50 font-mono">
            <span className="flex items-center gap-1.5">
              <FileText size={14} className="text-[#3B6FD4]" />
              2.850 palabras
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Activity size={14} className="text-[#3B6FD4]" />
              Lectura: 12 min
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Layers size={14} className="text-[#3B6FD4]" />
              Rigor Técnico Garantizado
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-24 bg-[#161C27]/80 backdrop-blur border border-white/[0.08] rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center gap-2 text-white font-display text-sm">
                <BookOpen size={16} className="text-[#3B6FD4]" />
                <span>Índice del Artículo</span>
              </div>
              <nav className="space-y-1.5 font-mono text-xs">
                {SECTIONS.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <span className="block font-mono text-[10px] text-white/40 uppercase tracking-widest">
                  Acciones Rápidas
                </span>
                <button
                  onClick={downloadMarkdown}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-white/80 hover:bg-white/[0.1] transition-colors"
                >
                  <Download size={14} />
                  Descargar Prompt Maestro
                </button>
                <Link
                  to="/biblioteca/prompts"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#3B6FD4]/20 border border-[#3B6FD4]/40 text-xs font-mono text-[#3B6FD4] hover:bg-[#3B6FD4]/30 transition-colors"
                >
                  <Sparkles size={14} />
                  Biblioteca de Prompts
                </Link>
              </div>
            </div>
          </aside>

          {/* Article Main Body */}
          <main className="lg:col-span-9 space-y-16">
            {/* PARTE 1 */}
            <article id="parte-1" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="inline-block font-mono text-[11px] text-[#3B6FD4] uppercase tracking-widest bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 px-3 py-1 rounded-md">
                Parte 1
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white">
                La Perfeccion del Proceso, No del Resultado
              </h2>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
                La inteligencia artificial generativa ha transformado la forma en que construimos software, pero tambien ha traido consigo una confusion peligrosa: creer que los modelos de lenguaje son oraculos infalibles que pueden reemplazar el juicio humano en cualquier dominio. La realidad es otra. Los LLMs son herramientas computacionales extraordinarias para procesar informacion, pero sufren una debilidad inherente a su arquitectura: pueden generar contenido que suena convincente pero es completamente falso. Este articulo establece las bases para construir sistemas de IA que funcionen de forma fiable, transparente y responsable en el mundo real.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-6 rounded-xl bg-[#0F1117] border border-white/[0.06] space-y-3">
                  <h3 className="font-display text-lg text-white font-medium flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#3B6FD4]" />
                    ¿Qué significa &quot;IA perfecta&quot;?
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    La perfección no radica en el resultado numérico estático, sino en la solidez del método. Un sistema de IA es perfecto cuando su proceso es <strong>transparente, verificable y corregible</strong>. Si un agente comete un error pero expone la fuente, la lógica causal y permite corregirlo en segundos, el proceso es perfecto.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#0F1117] border border-white/[0.06] space-y-3">
                  <h3 className="font-display text-lg text-white font-medium flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-400" />
                    La realidad de los LLMs
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Los modelos de lenguaje son herramientas computacionales con fortalezas extremas (procesamiento veloz de millones de tokens) y debilidades severas (nulo sentido comun biologico y tendencia a alucinar informacion falsa). No son "mejores" ni "peores" que los humanos: son diferentes, con capacidades especificas que debemos aprovechar con responsabilidad.
                  </p>
                </div>
              </div>

              {/* Analogía del cirujano */}
              <div className="border-l-2 border-[#3B6FD4] pl-6 py-2 bg-[#3B6FD4]/5 rounded-r-xl">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#3B6FD4] mb-2">
                  Analogía Concreta: El Procedimiento Quirúrgico
                </h4>
                <p className="text-sm text-white/70 leading-relaxed italic">
                  &quot;Un ser humano perfecto no existe. Un cirujano se fatiga o tiene días difíciles, pero los quirófanos salvan vidas gracias a procedimientos estandarizados e inviolables: recuento doble de gasas, pulsioximetría continua y comprobación cruzada de identidad. El cirujano es falible; el procedimiento es perfecto. La IA debe construirse exactamente igual.&quot;
                </p>
              </div>

              {/* Diagrama de flujo */}
              <div className="bg-[#0A0C10] p-6 rounded-xl border border-white/[0.08] font-mono text-xs text-white/80 overflow-x-auto">
                <div className="text-[11px] text-white/40 uppercase tracking-widest mb-3">
                  Arquitectura de Perfección Procesal
                </div>
                <pre className="text-[#3B6FD4]">
{`[Usuario] ──► [Descomposición Lógica] ──► [Búsqueda RAG Verificada]
                     │
                     ▼
       [Razonamiento con Citas] ──► [Guardrails de Seguridad]
                     │
                     ▼
  [Salida Estructurada / Declaración Explícita de Desconocimiento]`}
                </pre>
              </div>

              {/* 4 Pilares del Proceso */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  { title: "Trazabilidad", desc: "Cada decisión tiene un por qué rastreable en un registro de auditoría." },
                  { title: "Verificabilidad", desc: "Cada afirmación se coteja contra fuentes primarias o bases de datos." },
                  { title: "Corregibilidad", desc: "Cualquier fallo se subsana a nivel de reglas de forma determinista." },
                  { title: "Transparencia", desc: "Cero cajas negras; el usuario conoce las fuentes y límites exactos." },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-lg bg-[#0F1117]/60 border border-white/[0.04]">
                    <span className="font-mono text-xs font-semibold text-white block mb-1">{item.title}</span>
                    <span className="text-xs text-white/50 leading-snug block">{item.desc}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* PARTE 2 */}
            <article id="parte-2" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="inline-block font-mono text-[11px] text-[#3B6FD4] uppercase tracking-widest bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 px-3 py-1 rounded-md">
                Parte 2
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white">
                Razonamiento Aplicado — No Razonamiento Abstracto
              </h2>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
                Cuando se afirma que un modelo de lenguaje &quot;razona&quot;, se suele confundir el término con la introspección humana. Un LLM no tiene vida interior: calcula la probabilidad condicionada de secuencias lingüísticas. El <strong>razonamiento aplicado</strong> sustituye la divagación abstracta por una cadena formal de pasos documentados donde cada premisa se apoya en evidencia verificable.
              </p>

              {/* 3 Pilares */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-[#0F1117] border border-white/[0.06] space-y-2">
                  <span className="font-mono text-[10px] text-[#3B6FD4] uppercase tracking-widest">Pilar 1</span>
                  <h3 className="font-display text-lg text-white">Evidencia</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Ninguna aseveración se sostiene sin un dato empírico o textual que la respalde. Sin datos de apoyo, la afirmación se descarta.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#0F1117] border border-white/[0.06] space-y-2">
                  <span className="font-mono text-[10px] text-[#3B6FD4] uppercase tracking-widest">Pilar 2</span>
                  <h3 className="font-display text-lg text-white">Contexto</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    El agente comprende quién consulta, para qué propósito y bajo qué marco regulatorio o técnico opera el sector.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#0F1117] border border-white/[0.06] space-y-2">
                  <span className="font-mono text-[10px] text-[#3B6FD4] uppercase tracking-widest">Pilar 3</span>
                  <h3 className="font-display text-lg text-white">Límites</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    El sistema sabe lo que NO sabe y lo declara sin rodeos. Admitir la falta de datos es un signo de madurez técnica.
                  </p>
                </div>
              </div>

              {/* Comparativa de Prompts */}
              <div className="space-y-4 pt-4">
                <h3 className="font-display text-xl text-white">Contraste Práctico de Prompts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Prompt Malo */}
                  <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/20 space-y-3">
                    <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest">
                      Prompt Deficiente (Peligroso)
                    </span>
                    <pre className="font-mono text-xs text-red-200/90 whitespace-pre-wrap bg-black/30 p-4 rounded-lg">
                      &quot;Resúmeme este artículo médico sobre el asma y dime si este paciente puede usar este broncodilatador.&quot;
                    </pre>
                    <p className="text-xs text-red-300/70 leading-relaxed">
                      Falla porque asume rol prescriptor, no exige distinción entre evidencia y opinión del autor, y provoca alucinaciones sobre contraindicaciones.
                    </p>
                  </div>

                  {/* Prompt Bueno */}
                  <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                    <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">
                      Prompt de Razonamiento Aplicado
                    </span>
                    <pre className="font-mono text-xs text-emerald-200/90 whitespace-pre-wrap bg-black/30 p-4 rounded-lg">
{`"Actúa como asistente documental para medicina general. Resume ciñéndote al texto:
1. Separa evidencia clínica directa de conjeturas del autor.
2. Si no puedes verificar una afirmación, márcala como [NO VERIFICADO].
3. Si faltan contraindicaciones para el caso, indica [SIN DATOS EN EL DOCUMENTO].
4. Prohibido emitir recomendaciones terapéuticas prescriptivas."`}
                    </pre>
                    <p className="text-xs text-emerald-300/70 leading-relaxed">
                      Transforma al modelo en un filtro analítico estricto con límites explícitos y trazabilidad directa.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* PARTE 3 */}
            <article id="parte-3" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="inline-block font-mono text-[11px] text-[#3B6FD4] uppercase tracking-widest bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 px-3 py-1 rounded-md">
                Parte 3
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white">
                Moral Operativa — Hacer el Bien sin Juzgar
              </h2>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
                Una red neuronal no tiene conciencia ni virtudes morales. En ingeniería de software, la moral no es un rasgo ontológico del modelo, sino un conjunto riguroso de reglas operativas programadas para impedir que el sistema cause daño.
              </p>

              {/* 5 Reglas Operativas */}
              <div className="space-y-3">
                {[
                  { num: "01", title: "No alucinar", desc: "Si no sabes, di que no sabes. Jamas inventes datos, cifras, fechas o fuentes para aparentar competencia. Las alucinaciones son la mayor amenaza de los LLMs." },
                  { num: "02", title: "No juzgar", desc: "No emitas juicios de valor moral sobre personas o colectivos. Describe hechos objetivos y consecuencias causales." },
                  { num: "03", title: "Buscar lo mejor para el usuario", desc: "Prioriza información útil y prudente para la toma informada de decisiones, no halagos complacientes." },
                  { num: "04", title: "Transparencia radical", desc: "Declara de inmediato cualquier limitación técnica o fuente dudosa; expón con honestidad las incertidumbres." },
                  { num: "05", title: "No harm (No causar daño)", desc: "Ante riesgos físicos, legales o financieros, advierte de forma explícita y deriva siempre al profesional colegiado." },
                ].map((rule) => (
                  <div key={rule.num} className="flex items-start gap-4 p-4 rounded-xl bg-[#0F1117] border border-white/[0.06]">
                    <span className="font-mono text-sm text-[#3B6FD4] font-bold mt-0.5">{rule.num}</span>
                    <div>
                      <h4 className="font-mono text-sm text-white font-medium mb-1">{rule.title}</h4>
                      <p className="text-xs text-white/60 leading-relaxed">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Caso clínico */}
              <div className="p-6 rounded-xl bg-[#0F1117] border border-[#3B6FD4]/20 space-y-3">
                <h4 className="font-display text-base text-white flex items-center gap-2">
                  <Scale size={18} className="text-[#3B6FD4]" />
                  El caso del asistente médico: Responsabilidad frente a imprudencia
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Ante un usuario con dolor retroesternal y sudoración fría, un chatbot sin moral operativa podría divagar sobre reflujo gástrico y recetar un antiácido, retrasando una atención de infarto crucial. Un agente con moral operativa silencia explicaciones accesorias y ordena con firmeza acudir de inmediato a urgencias o llamar al 112. <strong>Decir &quot;consulta a tu médico&quot; no es cobardía: es el estándar supremo de responsabilidad profesional.</strong>
                </p>
              </div>
            </article>

            {/* PARTE 4 */}
            <article id="parte-4" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="inline-block font-mono text-[11px] text-[#3B6FD4] uppercase tracking-widest bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 px-3 py-1 rounded-md">
                Parte 4
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white">
                La Eficiencia de No Alucinar
              </h2>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
                Una alucinación ocurre cuando el modelo genera información convincente pero falsa. No es un bug que un parche solucione: es el principio operativo sobre el que funciona la arquitectura Transformer al predecir la siguiente palabra más probable lingüísticamente.
              </p>

              {/* 7 Estrategias */}
              <div className="space-y-4">
                <h3 className="font-display text-xl text-white">Las 7 Estrategias Anti-Alucinación</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "1. Retrieval-Augmented Generation (RAG)", desc: "Inyectar documentos reales y actualizados en el contexto antes de pedir el análisis." },
                    { title: "2. Citations obligatorias", desc: "Forzar a que cada afirmación señale el párrafo o documento concreto de donde proviene." },
                    { title: "3. Temperature baja (0.0 - 0.2)", desc: "Reducir la entropía estocástica para maximizar el determinismo en tareas factuales." },
                    { title: "4. Validación cruzada", desc: "Un segundo modelo o proceso evalúa si la conclusión se desprende lógicamente de las fuentes." },
                    { title: "5. Chain-of-thought", desc: "Obligar a mostrar el razonamiento deductivo intermedio paso a paso." },
                    { title: "6. Guardrails de dominio", desc: "Filtros basados en reglas de negocio, esquemas Pydantic y rangos admisibles." },
                    { title: "7. Human-in-the-loop", desc: "Revisión humana obligatoria en puntos críticos de decisión médica, legal o financiera." },
                  ].map((strat) => (
                    <div key={strat.title} className="p-4 rounded-lg bg-[#0F1117] border border-white/[0.06] space-y-1">
                      <h4 className="font-mono text-xs text-[#3B6FD4] font-medium">{strat.title}</h4>
                      <p className="text-xs text-white/60 leading-relaxed">{strat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmarks */}
              <div className="p-6 rounded-xl bg-[#0F1117] border border-white/[0.08] space-y-4">
                <h4 className="font-mono text-xs text-white uppercase tracking-widest">
                  Benchmarks Realistas de Alucinación en la Industria
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                    <span className="font-mono text-2xl text-white font-bold block mb-1">~3-5%</span>
                    <span className="text-xs text-[#3B6FD4] font-mono block">GPT-4</span>
                    <span className="text-[11px] text-white/40 block mt-1">En tareas factuales directas</span>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                    <span className="font-mono text-2xl text-emerald-400 font-bold block mb-1">~2-4%</span>
                    <span className="text-xs text-emerald-400 font-mono block">Claude 3.7</span>
                    <span className="text-[11px] text-white/40 block mt-1">Con arquitectura RAG</span>
                  </div>
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-center">
                    <span className="font-mono text-2xl text-amber-400 font-bold block mb-1">~4-6%</span>
                    <span className="text-xs text-amber-400 font-mono block">Gemini 2.5 Flash</span>
                    <span className="text-[11px] text-white/40 block mt-1">En tareas abiertas sin RAG</span>
                  </div>
                </div>
              </div>
            </article>

            {/* PARTE 5 */}
            <article id="parte-5" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="inline-block font-mono text-[11px] text-[#3B6FD4] uppercase tracking-widest bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 px-3 py-1 rounded-md">
                Parte 5
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white">
                Cómo Configurar un Agente de IA con Actitud Efectiva
              </h2>

              <p className="text-white/70 text-base leading-relaxed font-light">
                La teoría se vuelve tangible cuando se traduce en plantillas de sistema listas para copiar, validar e integrar en tu aplicación:
              </p>

              {/* Prompt 1: Maestro */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-white">1. System Prompt Maestro para un Agente Efectivo</h3>
                  <button
                    onClick={() => copyToClipboard(PROMPT_MAESTRO, "maestro")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B6FD4]/20 border border-[#3B6FD4]/40 text-xs font-mono text-[#3B6FD4] hover:bg-[#3B6FD4]/30 transition-colors"
                  >
                    {copiedPrompt === "maestro" ? <Check size={14} /> : <Copy size={14} />}
                    {copiedPrompt === "maestro" ? "¡Copiado!" : "Copiar Prompt"}
                  </button>
                </div>
                <pre className="font-mono text-xs text-white/80 bg-[#0A0C10] p-6 rounded-xl border border-white/[0.08] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {PROMPT_MAESTRO}
                </pre>
              </div>
            </article>

            {/* PARTE 6 */}
            <article id="parte-6" className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8">
              <div className="inline-block font-mono text-[11px] text-[#3B6FD4] uppercase tracking-widest bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 px-3 py-1 rounded-md">
                Parte 6
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white">
                El Framework Horizon
              </h2>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-light">
                El proyecto Horizon nació para democratizar la construcción de aplicaciones con IA en el ecosistema hispanohablante bajo un compromiso innegociable con el rigor científico, la soberanía de datos y la transparencia procesal.
              </p>

              {/* 3 Pilares Horizon */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/biblioteca/prompts"
                  className="group p-6 rounded-xl bg-[#0F1117] border border-white/[0.06] hover:border-[#3B6FD4]/40 transition-all space-y-3"
                >
                  <span className="font-mono text-[10px] text-[#3B6FD4] uppercase tracking-widest">Pilar 1</span>
                  <h3 className="font-display text-lg text-white group-hover:text-[#3B6FD4] transition-colors flex items-center justify-between">
                    Biblioteca de Prompts
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Más de 360 prompts verificados en 8 áreas con modelos recomendados y personalizador dinámico.
                  </p>
                </Link>

                <Link
                  to="/areas"
                  className="group p-6 rounded-xl bg-[#0F1117] border border-white/[0.06] hover:border-[#3B6FD4]/40 transition-all space-y-3"
                >
                  <span className="font-mono text-[10px] text-[#3B6FD4] uppercase tracking-widest">Pilar 2</span>
                  <h3 className="font-display text-lg text-white group-hover:text-[#3B6FD4] transition-colors flex items-center justify-between">
                    Wizards de Área
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Configuradores paso a paso que generan especificaciones formales de software (PRD) y estimaciones de horas.
                  </p>
                </Link>

                <Link
                  to="/taller"
                  className="group p-6 rounded-xl bg-[#0F1117] border border-white/[0.06] hover:border-[#3B6FD4]/40 transition-all space-y-3"
                >
                  <span className="font-mono text-[10px] text-[#3B6FD4] uppercase tracking-widest">Pilar 3</span>
                  <h3 className="font-display text-lg text-white group-hover:text-[#3B6FD4] transition-colors flex items-center justify-between">
                    Rutas de Aprendizaje
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Caminos guiados para dominar RAG, soberanía de datos y cero alucinaciones en proyectos reales.
                  </p>
                </Link>
              </div>

              {/* Cierre / Cita Final */}
              <div className="pt-8 border-t border-white/[0.08] text-center">
                <blockquote className="font-display text-2xl sm:text-3xl text-white/90 leading-relaxed max-w-3xl mx-auto italic mb-8">
                  &quot;La IA perfecta no es la que nunca se equivoca. Es la que siempre te dice cuándo se equivocó, por qué se equivocó, y cómo puedes verificarlo tú mismo.&quot;
                </blockquote>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/areas"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#3B6FD4] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#2D5AB8] transition-all shadow-lg shadow-[#3B6FD4]/20"
                  >
                    Explorar los 8 Laboratorios
                  </Link>
                  <Link
                    to="/resumen-ejecutivo"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-mono text-xs uppercase tracking-wider hover:bg-white/[0.1] transition-all"
                  >
                    Crear Resumen Ejecutivo
                  </Link>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
