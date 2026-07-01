import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import VenueSection from "@/components/sections/VenueSection";
import PackagesSection from "@/components/sections/PackagesSection";
import CalendarPreview from "@/components/sections/CalendarPreview";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030305]">
      <Navbar />
      <Hero />
      <VenueSection />
      <PackagesSection />
      <CalendarPreview />
      <Footer />
    </main>
  );
}
