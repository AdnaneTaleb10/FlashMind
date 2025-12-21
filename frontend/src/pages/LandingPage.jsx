import Navbar from "../components/Landing Page/navbar/Navbar";
import HeroIntro from "../components/Landing Page/hero intro/HeroIntro";
import FeaturesSection from "../components/Landing Page/features section/FeaturesSection";
import Footer from "../components/Landing Page/footer/Footer";


export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroIntro />
      <FeaturesSection />
      <Footer />
    </>
  );
}
