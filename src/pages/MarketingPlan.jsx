import { useParams, Link } from "react-router-dom";
import { Megaphone, ArrowLeft, Sparkles, Target, TrendingUp, Users, BarChart3 } from "lucide-react";
import { PRE_TUTORIAL_DATA } from "../data/pre-tutorial-data";

const SECTIONS = [
  { id: "analisis", icon: BarChart3, title: "Analisis de Mercado", desc: "Tamano, crecimiento, segmentacion y tendencias del sector" },
  { id: "competencia", icon: Target, title: "Mapa Competitivo", desc: "Benchmarking, ventajas diferenciadoras y posicionamiento" },
  { id: "cliente", icon: Users, title: "Perfil del Cliente Ideal", desc: "Buyer persona, pain points, Jobs-to-be-Done" },
  { id: "producto", icon: Sparkles, title: "Propuesta de Valor", desc: "UVP, features clave, roadmap de desarrollo" },
  { id: "monetizacion", icon: TrendingUp, title: "Modelo de Negocio", desc: "Pricing, unit economics, proyecciones financieras" },
  { id: "go-to-market", icon: Megaphone, title: "Estrategia Go-to-Market", desc: "Canales, acquisition, retention, growth loops" },
];

export default function MarketingPlan() {
  const { slug } = useParams();
  const data = PRE_TUTORIAL_DATA[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h1 className="font-display text-3xl text-white">Area no encontrada</h1>
          <Link to="/pre-tutorial/finanzas" className="text-[#3B6FD4] hover:underline text-sm">
            Volver al Pre-Tutorial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0F1117] text-[#E8EAF0] pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#3B6FD4]/10 via-[#3B6FD4]/3 to-transparent blur-3xl pointer-events-none -z-10" />

      <section className="pt-32 pb-12 px-6 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <Link to={`/pre-tutorial/${slug}`} className="inline-flex items-center gap-2 text-[#525A70] hover:text-[#3B6FD4] text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Volver al Pre-Tutorial
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-4"
            style={{ borderColor: `${data.color}40`, backgroundColor: `${data.color}10`, color: data.color }}>
            <Megaphone size={12} />
            Plan de Marketing
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
            {data.marketingPlanLabel}
          </h1>
          <p className="text-[#9BA3B8] text-sm sm:text-base max-w-2xl leading-relaxed">
            Estrategia completa de go-to-market para applications de {data.name.toLowerCase()} potenciadas por Inteligencia Artificial.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div key={sec.id} className="bg-[#161C27] border border-white/[0.08] rounded-2xl p-6 space-y-3 hover:border-white/[0.15] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${data.color}15` }}>
                    <Icon size={18} style={{ color: data.color }} />
                  </div>
                  <h3 className="font-display text-lg text-white">{sec.title}</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{sec.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-[#3B6FD4]/10 to-[#2BDE73]/10 border border-white/[0.08] rounded-2xl p-8 text-center space-y-4">
          <h3 className="font-display text-xl text-white">Seccion en Construccion</h3>
          <p className="text-sm text-white/50 max-w-lg mx-auto">
            El plan de marketing detallado para <strong style={{ color: data.color }}>{data.name}</strong> estara disponible proximamente. Incluira analisis de mercado, estrategia competitiva y plan de accion completo.
          </p>
          <Link to={`/wizard/${slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: data.color }}>
            <Sparkles size={14} /> Empezar con el Wizard
          </Link>
        </div>
      </div>
    </div>
  );
}
