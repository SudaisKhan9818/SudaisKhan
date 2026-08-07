import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import PortalTransition from "@/components/sections/PortalTransition";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Cursor from "@/components/ui/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      {/* Hide top Navbar on desktop since we have the Sidebar now, or keep both? The user said "Design a modern portfolio website with a vertical sticky sidebar navigation.", so I'll hide Navbar on desktop */}
      <div className="lg:hidden">
        <Navbar />
      </div>
      <Sidebar />
      {/* Sidebar overlays on the left, so we need padding to push content right */}
      <main className="flex min-h-screen w-full flex-col overflow-x-hidden px-4 pb-[80px] sm:px-6 lg:pl-[168px] lg:pr-6 lg:pb-0">
        <HeroSection />
        <PortalTransition />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
