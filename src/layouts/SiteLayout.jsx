import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ConsentBanner from "../components/ConsentBanner";

export default function SiteLayout() {
  return (
    <div className="grain relative min-h-screen flex flex-col bg-[#0F1117] text-[#E8EAF0]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  );
}
