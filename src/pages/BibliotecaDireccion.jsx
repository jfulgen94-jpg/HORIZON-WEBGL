import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ClipboardList,
  Copy,
  Download,
  FileText,
  Flag,
  ListChecks,
  Sparkles,
} from "lucide-react";
import {
  FICHA_SECTIONS,
  LECTURA_RESULTADO,
  PROMPT_MAESTRO_TEXTO,
  PROMPTS,
  RELACION_FICHA,
  buildFichaWord,
  buildPromptText,
} from "../data/biblioteca-direccion-data";

const STORAGE_KEY = "horizon_biblioteca_direccion_progreso";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function CopyBtn({ text, label = "Copiar prompt" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.12] bg-white/[0.03] text-xs font-mono text-white/70 hover:border-[#3B6FD4]/50 hover:text-white transition-all"
    >
      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
      {copied ? "Copiado" : label}
    </button>
  );
}

function PromptCard({ p, done, onToggle }) {
  const [open, setOpen] = useState(false);
  const text = useMemo(() => buildPromptText(p), [p]);
  return (
    <article
      data-od-id={`direccion-prompt-${p.id}`}
      className={`rounded-2xl border bg-[#161C27] transition-colors ${
        done ? "border-emerald-500/30" : "border-white/[0.08]"
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] text-[#3B6FD4] mb-1">
              {p.num} — Análisis independiente
            </p>
            <h3 className="font-display text-xl text-white">{p.title}</h3>
            <p className="mt-1 text-sm text-white/70 italic">“{p.pregunta}”</p>
          </div>
          {done && (
            <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
              <Check size={11} /> Ficha actualizada
            </span>
          )}
        </div>

        <div className="mt-4 space-y-3 text-sm leading-relaxed">
          <p className="text-white/60">
            <span className="text-white/90 font-medium">Qué resuelve: </span>
            {p.resuelve}
          </p>
          {p.hereda && (
            <p className="text-white/60">
              <span className="text-white/90 font-medium">Entrada (hereda): </span>
              {p.hereda}
            </p>
          )}
          <p className="text-white/60">
            <span className="text-white/90 font-medium">Te llevas: </span>
            {p.llevas}
          </p>
          <p className="text-white/60">
            <span className="text-white/90 font-medium">Actualiza en la ficha: </span>
            {p.actualiza.join("; ")}.
          </p>
          <p className="text-xs font-mono text-white/40">{p.siguiente}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B6FD4] text-white text-xs font-mono hover:bg-[#4A7DE0] transition-colors"
          >
            <FileText size={12} />
            {open ? "Ocultar texto del prompt" : "Ver texto del prompt"}
          </button>
          <CopyBtn text={text} />
          <button
            type="button"
            onClick={onToggle}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              done
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-white/[0.12] bg-white/[0.03] text-white/70 hover:border-emerald-500/40 hover:text-emerald-300"
            }`}
          >
            <ListChecks size={12} />
            {done ? "Marcado en la ficha" : "Marcar como volcado a la ficha"}
          </button>
        </div>

        {open && (
          <pre className="mt-4 p-4 rounded-xl bg-[#0D1117] border border-white/[0.06] text-xs font-mono text-white/70 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {text}
          </pre>
        )}
      </div>
    </article>
  );
}

export default function BibliotecaDireccion() {
  const [doneIds, setDoneIds] = useState(loadProgress);
  const [maestroOpen, setMaestroOpen] = useState(false);
  const [maestroCopied, setMaestroCopied] = useState(false);

  const toggle = (id) => {
    setDoneIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* almacenamiento no disponible: el progreso queda solo en memoria */
      }
      return next;
    });
  };

  const handleDownload = () => {
    const blob = new Blob([buildFichaWord()], {
      type: "application/msword;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ficha-tecnica-horizon.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const scrollToProgress = () => {
    document
      .getElementById("direccion-progreso")
      ?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/biblioteca"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 hover:text-[#3B6FD4] transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Volver a Biblioteca
        </Link>

        {/* Cabecera */}
        <div
          data-od-id="direccion-cabecera"
          className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-6"
        >
          <div className="max-w-2xl">
            <span className="text-[#3B6FD4] text-xs font-medium tracking-widest uppercase mb-2 flex items-center gap-2">
              <BookOpen size={13} /> Biblioteca · Dirección
            </span>
            <h1 className="font-display text-3xl sm:text-5xl text-white mb-3">
              Biblioteca de Prompts Ejecutivos y de Dirección
            </h1>
            <p className="text-white/50 leading-relaxed">
              De la idea bruta a una ficha técnica de negocio: seis análisis
              independientes para definir producto, mercado, competencia,
              viabilidad y posición comercial.
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-white/35">
              6 análisis · 1 ficha técnica · 1 diagnóstico maestro
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              data-od-id="direccion-descargar-ficha"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B6FD4] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#4A7DE0] transition-colors shadow-lg shadow-[#3B6FD4]/20"
            >
              <Download size={13} /> Descargar ficha técnica (Word)
            </button>
            <button
              type="button"
              onClick={scrollToProgress}
              data-od-id="direccion-ver-progreso"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.03] text-white/75 font-mono text-xs uppercase tracking-wider hover:border-[#3B6FD4]/50 hover:text-white transition-all"
            >
              <Flag size={13} /> Ver progreso de la ficha
            </button>
          </div>
        </div>

        {/* Propósito */}
        <section
          data-od-id="direccion-proposito"
          className="p-6 sm:p-8 rounded-2xl bg-[#161C27] border border-white/[0.08] mb-6"
        >
          <h2 className="font-display text-xl text-white mb-3">
            Propósito de la biblioteca
          </h2>
          <div className="space-y-3 text-sm text-white/60 leading-relaxed">
            <p>
              Esta biblioteca convierte una idea empresarial en una secuencia
              ordenada de decisiones. No sirve para producir textos bonitos ni
              para rellenar un plan de empresa de forma automática: sirve para
              obligar al fundador a definir qué quiere construir, para quién,
              con qué recursos, contra quién compite y bajo qué condiciones
              puede sostenerse.
            </p>
            <p>
              Una idea puede ser atractiva y seguir siendo inviable. Para
              convertirla en proyecto hay que recorrer una cadena de montaje:
              definir una necesidad real, convertirla en un producto concreto,
              fijar una propuesta de valor, diseñar una vía de ingresos, medir
              costes, conocer el mercado y construir una posición defendible.
              Los seis prompts de esta biblioteca trabajan esas decisiones de
              forma independiente, pero están diseñados para alimentar una
              misma ficha técnica y terminar en un diagnóstico ejecutivo
              integrado.
            </p>
            <p>
              La biblioteca ayuda a ordenar, como mínimo, los siguientes
              conceptos:
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc pl-5 marker:text-[#3B6FD4]">
              <li>Problema o necesidad que merece resolverse y evidencia de que afecta a un público identificable.</li>
              <li>Producto o servicio específico, medible y comercializable; alcance, funcionalidades, entrega y experiencia de cliente.</li>
              <li>Perfil de cliente ideal (ICP): quién compra, quién usa, quién influye, capacidad de pago, urgencia y contexto de uso.</li>
              <li>Propuesta de valor: por qué el cliente debería elegir esta alternativa y no mantener su situación actual.</li>
              <li>Diferenciación y ventaja defendible: diseño propio, know-how, datos, distribución, comunidad, marca, coste, calidad o especialización.</li>
              <li>Modelo de negocio: venta única, suscripción, mantenimiento, consumo, licencia, comisión o combinación.</li>
              <li>Política de precio, calidad y accesibilidad: qué se cobra, a quién, con qué margen y qué promesa de servicio sostiene ese precio.</li>
              <li>Competidores directos, indirectos y sustitutos: sus productos, precios, canales, fortalezas, debilidades y espacios sin cubrir.</li>
              <li>Tamaño y evolución del mercado: TAM, SAM, SOM, tendencias, territorio, capacidad de penetración y momento de entrada.</li>
              <li>Canales de distribución y adquisición: venta directa, SEO, contenido, partners, prescriptores, marketplaces, eventos o comunidad.</li>
              <li>Costes de creación, operación, comercialización y cumplimiento: CAPEX, OPEX, CAC, margen bruto, LTV, payback y punto de equilibrio.</li>
              <li>Arquitectura, operaciones y dependencias: equipo, proveedores, datos, infraestructura, propiedad intelectual, regulación y riesgos.</li>
              <li>Marca, misión, valores y comunicación: qué representa la empresa, cómo se expresa y cómo refuerza la confianza comercial.</li>
              <li>Objetivos, hitos y criterios de validación: qué debe demostrarse antes de invertir más tiempo o capital.</li>
            </ul>
            <p className="text-xs font-mono text-white/40">
              Cada respuesta debe ir a la ficha técnica. Las respuestas
              generadas por IA no son hechos por sí mismas: las cifras,
              competidores, fuentes, costes y afirmaciones de mercado deben
              contrastarse antes de usarse ante clientes, socios o inversores.
            </p>
          </div>
        </section>

        {/* Contexto inicial */}
        <section
          data-od-id="direccion-contexto"
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          <div className="p-5 rounded-2xl bg-[#161C27] border border-white/[0.08]">
            <h3 className="font-display text-base text-white mb-2">Antes de empezar</h3>
            <p className="text-xs text-white/55 leading-relaxed">
              No necesitas tener todas las respuestas. Empieza con lo que sabes
              y distingue entre hechos, hipótesis y decisiones pendientes. La
              calidad del resultado depende de la precisión de los datos que
              aportes: un cliente genérico produce una estrategia genérica; un
              coste no estimado impide valorar viabilidad; una ventaja no
              contrastada se convierte en una promesa, no en una posición
              competitiva.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#161C27] border border-white/[0.08]">
            <h3 className="font-display text-base text-white mb-2">Cómo usar los análisis</h3>
            <ol className="text-xs text-white/55 leading-relaxed space-y-1.5 list-decimal pl-4 marker:text-[#3B6FD4]">
              <li>Descarga y completa la ficha técnica básica.</li>
              <li>Ejecuta los prompts en orden; cada uno puede usarse con Gemini, Claude, ChatGPT u otra IA que permita investigación o razonamiento.</li>
              <li>Copia las conclusiones verificables a la ficha técnica; no copies estimaciones sin marcarlas.</li>
              <li>Revisa contradicciones entre precio, cliente, coste, mercado y canal antes de avanzar.</li>
              <li>Al terminar los seis prompts, ejecuta el Prompt Maestro para obtener un diagnóstico integrado de dirección y marketing operativo.</li>
            </ol>
          </div>
          <div className="p-5 rounded-2xl bg-[#161C27] border border-white/[0.08]">
            <h3 className="font-display text-base text-white mb-2">Lectura del resultado</h3>
            <p className="text-xs text-white/55 mb-2">Cada análisis debe separar:</p>
            <ul className="text-xs text-white/55 leading-relaxed space-y-1.5">
              {LECTURA_RESULTADO.map((r) => (
                <li key={r.label}>
                  <span className="text-white/85 font-medium">{r.label}: </span>
                  {r.desc}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Los seis prompts */}
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList size={16} className="text-[#3B6FD4]" />
          <h2 className="font-display text-2xl text-white">Los seis prompts</h2>
        </div>
        <div className="space-y-4 mb-10">
          {PROMPTS.map((p) => (
            <PromptCard
              key={p.id}
              p={p}
              done={doneIds.includes(p.id)}
              onToggle={() => toggle(p.id)}
            />
          ))}
        </div>

        {/* Relación prompts ↔ ficha */}
        <section data-od-id="direccion-relacion" className="mb-10">
          <h2 className="font-display text-2xl text-white mb-1">
            Relación entre prompts y ficha técnica
          </h2>
          <p className="text-sm text-white/50 mb-4">
            La ficha técnica es el registro único de decisiones. Los prompts son
            instrumentos de análisis; no deben reemplazarla. Tras cada uso, el
            usuario incorpora a la ficha sólo conclusiones que acepta, marcando
            si son verificadas, estimadas o pendientes.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="bg-[#161C27] text-left">
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-white/45">Prompt</th>
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-white/45">Alimenta principalmente</th>
                  <th className="px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-white/45">Contrasta con</th>
                </tr>
              </thead>
              <tbody>
                {RELACION_FICHA.map((r) => (
                  <tr key={r.prompt} className="border-t border-white/[0.06] bg-white/[0.01]">
                    <td className="px-4 py-3 text-white/85 font-medium whitespace-nowrap">{r.prompt}</td>
                    <td className="px-4 py-3 text-white/60">{r.alimenta}</td>
                    <td className="px-4 py-3 text-white/60">{r.contrasta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Progreso */}
        <section
          id="direccion-progreso"
          data-od-id="direccion-progreso"
          className="p-6 rounded-2xl bg-[#161C27] border border-white/[0.08] mb-10 scroll-mt-28"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <h2 className="font-display text-xl text-white">Progreso de la ficha</h2>
            <span className="font-mono text-xs text-white/50">
              {doneIds.length}/6 análisis volcados · {FICHA_SECTIONS.length} apartados en la plantilla
            </span>
          </div>
          <div
            className="h-2 rounded-full bg-white/[0.06] overflow-hidden"
            role="progressbar"
            aria-valuenow={doneIds.length}
            aria-valuemin={0}
            aria-valuemax={6}
            aria-label="Progreso de la ficha técnica"
          >
            <div
              className="h-full bg-[#3B6FD4] transition-all"
              style={{ width: `${(doneIds.length / 6) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-white/50 leading-relaxed">
            Marca cada prompt como volcado cuando hayas copiado sus conclusiones
            aceptadas a tu ficha descargada. El progreso se guarda solo en este
            navegador. Cuando completes los seis, ejecuta el Prompt Maestro.
          </p>
        </section>

        {/* Prompt Maestro */}
        <section
          data-od-id="direccion-maestro"
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#3B6FD4]/10 to-white/[0.02] border border-[#3B6FD4]/25 mb-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[#3B6FD4]" />
            <h2 className="font-display text-2xl text-white">Prompt Maestro</h2>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Diagnóstico integrado de dirección y marketing operativo. Úsalo al
            final, con la ficha completa: consolida lo decidido y señala lo que
            sigue sin estar demostrado. No inventa nuevas premisas.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => setMaestroOpen((v) => !v)}
              aria-expanded={maestroOpen}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3B6FD4] text-white text-xs font-mono hover:bg-[#4A7DE0] transition-colors"
            >
              <FileText size={12} />
              {maestroOpen ? "Ocultar prompt maestro" : "Ver prompt maestro"}
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(PROMPT_MAESTRO_TEXTO).catch(() => {});
                setMaestroCopied(true);
                setTimeout(() => setMaestroCopied(false), 1800);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/[0.12] bg-white/[0.03] text-xs font-mono text-white/75 hover:border-[#3B6FD4]/50 hover:text-white transition-all"
            >
              {maestroCopied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {maestroCopied ? "Copiado" : "Copiar prompt maestro"}
            </button>
          </div>
          {maestroOpen && (
            <pre className="p-4 rounded-xl bg-[#0D1117] border border-white/[0.06] text-xs font-mono text-white/70 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {PROMPT_MAESTRO_TEXTO}
            </pre>
          )}
        </section>

        {/* Pie */}
        <section
          data-od-id="direccion-pie"
          className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.01]"
        >
          <h2 className="font-display text-lg text-white mb-2">
            Pie de la pestaña: por qué importan las respuestas
          </h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Una estrategia no se valida porque cada apartado sea convincente por
            separado. Se valida cuando las respuestas son compatibles entre sí:
            el cliente puede pagar el precio, el precio cubre costes, los costes
            permiten prestar la calidad prometida, el canal puede alcanzar al
            cliente, el mercado admite la cuota necesaria para llegar al punto
            de equilibrio y la marca sostiene la promesa ante ese cliente.
          </p>
        </section>
      </div>
    </div>
  );
}
