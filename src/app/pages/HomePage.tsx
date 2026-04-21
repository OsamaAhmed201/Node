import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { WhoWeAre } from "../components/WhoWeAre";
import { VisionMission } from "../components/VisionMission";
import { StrategicObjectives } from "../components/StrategicObjectives";
import { VisualDivider } from "../components/VisualDivider";
import { BusinessTracks } from "../components/BusinessTracks";
import { Products } from "../components/Products";
import { WhyAlAgents } from "../components/WhyAlAgents";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Rubik', 'IBM Plex Sans Arabic', sans-serif",
        backgroundColor: "#0A0F15",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main>
        <Hero />
        <WhoWeAre />
        <VisionMission />
        <StrategicObjectives />
        <VisualDivider />
        <BusinessTracks />
        <Products />
        <WhyAlAgents />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
