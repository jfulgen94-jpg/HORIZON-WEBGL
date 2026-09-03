import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import Areas from "./pages/Areas";
import Herramientas from "./pages/Herramientas";
import Biblioteca from "./pages/Biblioteca";
import Taller from "./pages/Taller";
import Comunidad from "./pages/Comunidad";
import ForoAplicaciones from "./pages/ForoAplicaciones";
import ForoProfesionales from "./pages/ForoProfesionales";
import ForoDebate from "./pages/ForoDebate";
import NotFound from "./pages/NotFound";

const FinanzasLab = lazy(() => import("./pages/FinanzasLab"));
const MedicinaLab = lazy(() => import("./pages/MedicinaLab"));
const ContabilidadLab = lazy(() => import("./pages/ContabilidadLab"));
const MatematicasLab = lazy(() => import("./pages/MatematicasLab"));
const IngenieriaLab = lazy(() => import("./pages/IngenieriaLab"));
const DerechoLab = lazy(() => import("./pages/DerechoLab"));
const DisenoLab = lazy(() => import("./pages/DisenoLab"));
const PsicologiaLab = lazy(() => import("./pages/PsicologiaLab"));

const WizardFinanzas = lazy(() => import("./pages/wizards/WizardFinanzas"));
const WizardMedicina = lazy(() => import("./pages/wizards/WizardMedicina"));
const WizardContabilidad = lazy(() => import("./pages/wizards/WizardContabilidad"));
const WizardMatematicas = lazy(() => import("./pages/wizards/WizardMatematicas"));
const WizardIngenieria = lazy(() => import("./pages/wizards/WizardIngenieria"));
const WizardDerecho = lazy(() => import("./pages/wizards/WizardDerecho"));
const WizardDiseno = lazy(() => import("./pages/wizards/WizardDiseno"));
const WizardPsicologia = lazy(() => import("./pages/wizards/WizardPsicologia"));

const RutaFinanzas = lazy(() => import("./pages/rutas/RutaFinanzas"));
const RutaContabilidad = lazy(() => import("./pages/rutas/RutaContabilidad"));
const RutaMedicina = lazy(() => import("./pages/rutas/RutaMedicina"));
const RutaMatematicas = lazy(() => import("./pages/rutas/RutaMatematicas"));
const RutaIngenieria = lazy(() => import("./pages/rutas/RutaIngenieria"));
const RutaDerecho = lazy(() => import("./pages/rutas/RutaDerecho"));
const RutaDiseno = lazy(() => import("./pages/rutas/RutaDiseno"));
const RutaPsicologia = lazy(() => import("./pages/rutas/RutaPsicologia"));

const GenericLab = lazy(() => import("./pages/GenericLab"));
const GenericWizard = lazy(() => import("./pages/GenericWizard"));
const GenericRuta = lazy(() => import("./pages/GenericRuta"));
const TallerMapPage = lazy(() => import("./pages/TallerMapPage"));
const PreTutorial = lazy(() => import("./pages/PreTutorial"));
const ExecutiveSummaryPage = lazy(() => import("./pages/ExecutiveSummaryPage"));
const BibliotecaPrompts = lazy(() => import("./pages/BibliotecaPrompts"));
const Manifiesto = lazy(() => import("./pages/Manifiesto"));
const MarketingPlan = lazy(() => import("./pages/MarketingPlan"));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-[#3B6FD4]/30 border-t-[#3B6FD4] rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="manifiesto" element={<Manifiesto />} />
            <Route path="areas" element={<Areas />} />
            <Route path="areas/:slug" element={<PreTutorial />} />
            <Route path="herramientas" element={<Herramientas />} />
            <Route path="biblioteca" element={<Biblioteca />} />
            <Route path="biblioteca/prompts" element={<BibliotecaPrompts />} />
            <Route path="resumen-ejecutivo" element={<ExecutiveSummaryPage />} />
            <Route path="taller" element={<Taller />} />
            <Route path="taller/mapa" element={<TallerMapPage />} />
            <Route path="comunidad" element={<Comunidad />} />
            <Route path="comunidad/aplicaciones" element={<ForoAplicaciones />} />
            <Route path="comunidad/profesionales" element={<ForoProfesionales />} />
            <Route path="comunidad/debate" element={<ForoDebate />} />
            <Route path="foro" element={<ForoDebate />} />
            <Route path="marketing/:slug" element={<MarketingPlan />} />

            <Route path="lab/finanzas" element={<FinanzasLab />} />
            <Route path="lab/medicina" element={<MedicinaLab />} />
            <Route path="lab/contabilidad" element={<ContabilidadLab />} />
            <Route path="lab/matematicas" element={<MatematicasLab />} />
            <Route path="lab/ingenieria" element={<IngenieriaLab />} />
            <Route path="lab/derecho" element={<DerechoLab />} />
            <Route path="lab/diseno" element={<DisenoLab />} />
            <Route path="lab/psicologia" element={<PsicologiaLab />} />
            <Route path="lab/:slug" element={<GenericLab />} />

            <Route path="wizard/finanzas" element={<WizardFinanzas />} />
            <Route path="wizard/medicina" element={<WizardMedicina />} />
            <Route path="wizard/contabilidad" element={<WizardContabilidad />} />
            <Route path="wizard/matematicas" element={<WizardMatematicas />} />
            <Route path="wizard/ingenieria" element={<WizardIngenieria />} />
            <Route path="wizard/derecho" element={<WizardDerecho />} />
            <Route path="wizard/diseno" element={<WizardDiseno />} />
            <Route path="wizard/psicologia" element={<WizardPsicologia />} />
            <Route path="wizard/:slug" element={<GenericWizard />} />

            <Route path="ruta/finanzas" element={<RutaFinanzas />} />
            <Route path="ruta/contabilidad" element={<RutaContabilidad />} />
            <Route path="ruta/medicina" element={<RutaMedicina />} />
            <Route path="ruta/matematicas" element={<RutaMatematicas />} />
            <Route path="ruta/ingenieria" element={<RutaIngenieria />} />
            <Route path="ruta/derecho" element={<RutaDerecho />} />
            <Route path="ruta/diseno" element={<RutaDiseno />} />
            <Route path="ruta/psicologia" element={<RutaPsicologia />} />
            <Route path="ruta/:slug" element={<GenericRuta />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
