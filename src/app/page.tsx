import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Trust from "@/components/landing/Trust";
import ProblemSolution from "@/components/landing/ProblemSolution";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import IndustrySolutions from "@/components/landing/IndustrySolutions";
import DashboardShowcase from "@/components/landing/DashboardShowcase";
import Analytics from "@/components/landing/Analytics";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-surface-bg text-white font-sans min-h-screen relative selection:bg-primary selection:text-white">
      <Header />
      <Hero />
      <Trust />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <IndustrySolutions />
      <DashboardShowcase />
      <Analytics />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
