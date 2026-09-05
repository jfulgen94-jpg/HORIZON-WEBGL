import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  User,
  LogOut,
  LogIn,
  Package,
  Users,
  Cpu,
  Coins,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
  Database,
  Globe,
} from "lucide-react";

import {
  SUMMARY_SECTIONS,
  INITIAL_FORM_DATA,
} from "../data/executive-summary-config";
import { generateExecutiveSummaryWithFallback } from "../utils/generateExecutiveSummary";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
  checkCurrentUserRateLimit,
  consumeCurrentUserReportQuota,
} from "../utils/userAuth";

const SECTION_ICONS = {
  Package,
  Users,
  Cpu,
  Coins,
};

export default function ExecutiveSummaryPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [researchData, setResearchData] = useState(null);

  // Estado de usuario y autenticación
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState(null);

  // Cuotas de rate limiting
  const quota = useMemo(() => {
    return checkCurrentUserRateLimit();
  }, [currentUser]);

  // Manejo de cambios en el formulario
  const handleFieldChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Manejo específico para checkboxes (array)
  const handleCheckboxChange = (key, optionValue, checked) => {
    setFormData((prev) => {
      const current = prev[key] || [];
      if (checked) {
        return { ...prev, [key]: [...current, optionValue] };
      } else {
        return { ...prev, [key]: current.filter((v) => v !== optionValue) };
      }
    });
  };

  const currentSection = SUMMARY_SECTIONS[activeSectionIndex];
  const CurrentSectionIcon = SECTION_ICONS[currentSection?.iconName] || FileText;

  // Validación de sección actual
  const isCurrentSectionValid = useMemo(() => {
    if (!currentSection) return false;
    for (const q of currentSection.questions) {
      if (q.required) {
        const value = formData[q.id];
        if (q.type === "checkbox") {
          if (!value || value.length === 0) return false;
        } else if (!value?.toString().trim()) {
          return false;
        }
      }
    }
    return true;
  }, [currentSection, formData]);

  // Ejecución de generación de resumen
  const handleGenerate = async () => {
    // 1. Validar cuota antes de llamar a APIs
    const quotaCheck = checkCurrentUserRateLimit();
    if (!quotaCheck.allowed) {
      setError(quotaCheck.reason);
      return;
    }

    setLoading(true);
    setError(null);
    setResearchData(null);

    try {
      const summaryResult = await generateExecutiveSummaryWithFallback(formData);
      
      // Consumir cuota de usuario
      const updatedUser = consumeCurrentUserReportQuota();
      setCurrentUser(updatedUser);

      setResult(summaryResult);
      if (summaryResult.researchData) {
        setResearchData(summaryResult.researchData);
      }
    } catch (err) {
      setError(err.message || "Error inesperado al generar el resumen ejecutivo.");
    } finally {
      setLoading(false);
    }
  };

  // Copiar al portapapeles
  const handleCopy = () => {
    if (!result?.markdown) return;
    navigator.clipboard.writeText(result.markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Descargar archivo .md
  const handleDownload = () => {
    if (!result?.markdown) return;
    const blob = new Blob([result.markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const cleanName = (formData.nombre_proyecto || "resumen-ejecutivo")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    link.href = url;
    link.download = `${cleanName}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Autenticación rápida
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError(null);

    try {
      let user;
      if (authMode === "register") {
        user = registerUser(authName, authEmail, authPassword);
      } else {
        user = loginUser(authEmail, authPassword);
      }
      setCurrentUser(user);
      setShowAuthModal(false);
      setAuthName("");
      setAuthEmail("");
      setAuthPassword("");
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    const anon = logoutUser();
    setCurrentUser(anon);
  };

  // Componente para renderizar investigación (opcional, colapsable)
  const ResearchPanel = () => {
    if (!researchData) return null;
    return (
      <details className="mb-6 p-4 rounded-2xl bg-[#0D1117] border border-white/[0.05]">
        <summary className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[#3B6FD4] select-none">
          <Database size={14} />
          <span>Ver datos de investigación (competidores, mercado, tendencias)</span>
        </summary>
        <div className="mt-4 p-4 rounded-xl bg-[#161C27] border border-white/[0.05] overflow-x-auto text-xs font-mono text-white/70">
          <pre className="whitespace-pre-wrap">{JSON.stringify(researchData, null, 2)}</pre>
        </div>
      </details>
    );
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 min-h-screen text-[#F3F4F8]">
      <div className="max-w-5xl mx-auto">
        {/* Cabecera y Navegación Superior */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Link
            to="/biblioteca"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 hover:text-[#3B6FD4] transition-colors"
          >
            <ArrowLeft size={14} /> Volver a Biblioteca
          </Link>

          {/* Barra de Usuario y Cuotas */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161C27] border border-white/[0.08] text-xs font-mono">
              <Clock size={12} className="text-[#3B6FD4]" />
              <span className="text-white/60">Hoy:</span>
              <span className={quota.remainingToday > 0 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {quota.remainingToday}/2
              </span>
              <span className="text-white/20">|</span>
              <span className="text-white/60">Mes:</span>
              <span className="text-white/80 font-bold">{quota.remainingThisMonth}/10</span>
            </div>

            {currentUser.isAnonymous ? (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.1] hover:border-[#3B6FD4]/50 bg-[#161C27] text-xs font-mono text-white/80 hover:text-white transition-all"
              >
                <LogIn size={12} />
                <span>Identificarse</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161C27] border border-white/[0.08] text-xs font-mono">
                <User size={12} className="text-[#3B6FD4]" />
                <span className="text-white/80 font-medium truncate max-w-[120px]">{currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  className="text-white/40 hover:text-rose-400 transition-colors ml-1"
                >
                  <LogOut size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal de Autenticación */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#161C27] border border-white/[0.1] rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg text-white">
                  {authMode === "login" ? "Iniciar Sesión" : "Crear Perfil de Usuario"}
                </h3>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-white/40 hover:text-white text-xs font-mono"
                >
                  Cerrar
                </button>
              </div>

              <p className="text-xs text-white/60 mb-4 leading-relaxed">
                Vincula tus informes ejecutivos a tu cuenta para asegurar el seguimiento de cuota y guardar tus análisis de mercado.
              </p>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-3">
                {authMode === "register" && (
                  <div>
                    <label className="block text-xs font-mono text-white/60 mb-1">Nombre o Empresa</label>
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="Tu nombre o marca"
                      className="w-full bg-[#0D1117] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3B6FD4]"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="ejemplo@empresa.com"
                    className="w-full bg-[#0D1117] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3B6FD4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1">Contraseña (opcional)</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Contraseña de acceso"
                    className="w-full bg-[#0D1117] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3B6FD4]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 rounded-xl bg-[#3B6FD4] hover:bg-[#3B6FD4]/90 text-white text-xs font-medium transition-all"
                >
                  {authMode === "login" ? "Entrar al Sistema" : "Registrar Cuenta"}
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-white/[0.06] text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === "login" ? "register" : "login");
                    setAuthError(null);
                  }}
                  className="text-xs font-mono text-[#3B6FD4] hover:underline"
                >
                  {authMode === "login"
                    ? "¿No tienes cuenta? Regístrate aquí"
                    : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Título y Presentación */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B6FD4]/10 border border-[#3B6FD4]/20 text-[#3B6FD4] text-xs font-mono mb-3">
            <Sparkles size={12} />
            <span>Executive AI v3.3 — Investigación + Redacción</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-white mb-2">
            {formData.tipo_informe === "auditoria"
              ? "Auditoría Integral de Proyecto"
              : "Resumen Ejecutivo de Marketing y Negocio"}
          </h1>
          <p className="text-white/60 text-sm max-w-2xl leading-relaxed">
            Completa los 4 bloques del formulario (15 preguntas) para compilar un dossier exhaustivo de 8 secciones
            con investigación de mercado real, análisis competitivo, unit economics y roadmap.
          </p>

          {/* Selector de Modo de Informe */}
          <div className="mt-4 inline-flex items-center gap-1 p-1 rounded-xl bg-[#0D1117] border border-white/[0.08]">
            <button
              type="button"
              onClick={() => handleFieldChange("tipo_informe", "marketing")}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                formData.tipo_informe !== "auditoria"
                  ? "bg-[#3B6FD4] text-white shadow-lg shadow-[#3B6FD4]/20"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Resumen Ejecutivo
            </button>
            <button
              type="button"
              onClick={() => handleFieldChange("tipo_informe", "auditoria")}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                formData.tipo_informe === "auditoria"
                  ? "bg-[#3B6FD4] text-white shadow-lg shadow-[#3B6FD4]/20"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              Auditoría Integral
            </button>
          </div>
          <p className="mt-2 text-[11px] font-mono text-white/40">
            {formData.tipo_informe === "auditoria"
              ? "Informe crítico de 8 secciones (1500-1800 palabras) en tono analista frío: riesgos, incoherencias y palancas."
              : "Informe comercial de 8 secciones (1350-1500 palabras): propuesta de valor, competitivo, unit economics y roadmap."}
          </p>
        </div>

        {/* VISTA 1: Formulario Guiado por Secciones */}
        {!result && (
          <div className="space-y-6">
            {/* Navegador de Pasos (4 Bloques) */}
            <div className="grid grid-cols-4 gap-2 p-2 rounded-2xl bg-[#161C27] border border-white/[0.08]">
              {SUMMARY_SECTIONS.map((sec, idx) => {
                const Icon = SECTION_ICONS[sec.iconName] || FileText;
                const isActive = idx === activeSectionIndex;
                const isPast = idx < activeSectionIndex;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionIndex(idx)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-center transition-all ${
                      isActive
                        ? "bg-[#3B6FD4] text-white shadow-lg shadow-[#3B6FD4]/20"
                        : isPast
                        ? "bg-white/[0.04] text-white/80 hover:bg-white/[0.08]"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.02]"
                    }`}
                  >
                    <Icon size={16} className="mb-1" />
                    <span className="text-[10px] font-mono leading-tight truncate w-full">
                      {sec.number}. {sec.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tarjeta de la Sección Activa */}
            <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#161C27] space-y-6">
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#3B6FD4]/10 text-[#3B6FD4] flex items-center justify-center">
                  <CurrentSectionIcon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#3B6FD4] font-semibold">
                      Bloque {currentSection.number} de 4
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-xs font-mono text-white/40">
                      {currentSection.questions.length} preguntas
                    </span>
                  </div>
                  <h2 className="font-display text-xl text-white">{currentSection.title}</h2>
                  <p className="text-xs text-white/50">{currentSection.subtitle}</p>
                </div>
              </div>

              {/* Preguntas de la Sección */}
              <div className="space-y-5">
                {currentSection.questions.map((q) => (
                  <div key={q.id} className="space-y-1.5">
                    <label className="block text-xs font-medium text-white/90">
                      {q.label}
                      {q.required && <span className="text-[#3B6FD4] ml-1">*</span>}
                    </label>

                    {q.type === "text" && (
                      <input
                        type="text"
                        maxLength={q.max_length}
                        value={formData[q.id] || ""}
                        onChange={(e) => handleFieldChange(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        className="w-full bg-[#0D1117] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#3B6FD4] transition-colors"
                      />
                    )}

                    {q.type === "textarea" && (
                      <textarea
                        rows={q.id === "solucion_tecnica" ? 5 : 3}
                        maxLength={q.max_length}
                        value={formData[q.id] || ""}
                        onChange={(e) => handleFieldChange(q.id, e.target.value)}
                        placeholder={q.placeholder}
                        className="w-full bg-[#0D1117] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#3B6FD4] transition-colors resize-y leading-relaxed"
                      />
                    )}

                    {q.type === "select" && (
                      <select
                        value={formData[q.id] || ""}
                        onChange={(e) => handleFieldChange(q.id, e.target.value)}
                        className="w-full bg-[#0D1117] border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#3B6FD4] transition-colors"
                      >
                        {q.options.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#161C27] text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {q.type === "checkbox" && (
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt) => (
                          <label
                            key={opt.value}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-[#0D1117] text-xs text-white/80 hover:border-[#3B6FD4]/50 hover:bg-white/[0.02] cursor-pointer transition-all"
                          >
                            <input
                              type="checkbox"
                              value={opt.value}
                              checked={(formData[q.id] || []).includes(opt.value)}
                              onChange={(e) => handleCheckboxChange(q.id, opt.value, e.target.checked)}
                              className="w-4 h-4 accent-[#3B6FD4] border-white/[0.2] bg-[#0D1117] focus:ring-[#3B6FD4]"
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {q.hint && (
                      <p className="text-[11px] font-mono text-white/40 leading-relaxed">
                        {q.hint}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Botones de Navegación de Sección */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  disabled={activeSectionIndex === 0}
                  onClick={() => setActiveSectionIndex((prev) => Math.max(0, prev - 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-[#0D1117] text-xs font-mono text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ArrowLeft size={13} />
                  <span>Anterior</span>
                </button>

                {activeSectionIndex < SUMMARY_SECTIONS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveSectionIndex((prev) => Math.min(SUMMARY_SECTIONS.length - 1, prev + 1))}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#3B6FD4] hover:bg-[#3B6FD4]/90 text-white text-xs font-medium transition-all"
                  >
                    <span>Siguiente Bloque</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={loading || !quota.allowed}
                    onClick={handleGenerate}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#3B6FD4] to-indigo-600 hover:opacity-95 text-white text-xs font-semibold shadow-lg shadow-[#3B6FD4]/20 disabled:opacity-50 disabled:pointer-events-none transition-all"
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Investigando y Redactando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Generar Informe Completo</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Mensaje de Error */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
                <AlertCircle size={16} className="shrink-0" />
                <div className="leading-relaxed">{error}</div>
              </div>
            )}
          </div>
        )}

        {/* VISTA 2: Informe Ejecutivo Compilado */}
        {result && (
          <div className="space-y-6">
            <ResearchPanel />

            {/* Metadatos y Barra de Acciones */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#161C27] border border-white/[0.08]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                    <ShieldCheck size={12} />
                    {result.provider}
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    · {result.wordCount} palabras
                  </span>
                </div>
                <p className="text-xs text-white/50">
                  {formData.tipo_informe === "auditoria"
                    ? "Informe de auditoría de 8 secciones (1500-1800 palabras) en tono analista frío, con riesgos y prioridades de mejora."
                    : "Dossier completo de 8 secciones (1350-1500 palabras) con investigación real, listo para comités de inversión."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.1] bg-[#0D1117] hover:border-white/20 text-xs font-mono text-white/80 transition-all"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? "Copiado" : "Copiar"}</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.1] bg-[#0D1117] hover:border-white/20 text-xs font-mono text-white/80 transition-all"
                >
                  <Download size={13} />
                  <span>Descargar .md</span>
                </button>

                <button
                  onClick={() => setResult(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#3B6FD4] hover:bg-[#3B6FD4]/90 text-white text-xs font-mono font-medium transition-all"
                >
                  <span>Editar Datos</span>
                </button>
              </div>
            </div>

            {/* Contenedor del Documento Markdown */}
            <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#161C27] overflow-hidden">
              <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4 font-sans text-white/90">
                <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 border-0 text-white/85 leading-relaxed overflow-x-auto selection:bg-[#3B6FD4]/30">
                  {result.markdown}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}