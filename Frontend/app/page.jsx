import CTA from "@/Component/CTA";
import Features from "@/Component/Features";
import HeaderWrapper from "@/Component/HeaderWrapper";
import HowWorks from "@/Component/FromIdeaToInterview";
import WhyChoose from "@/Component/WhyLoveUs";
import HeroSection from "@/Component/HeroSection";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
      {/* Login/Logout button — only on mobile, top right */}
      <div className="flex justify-end px-6 py-3 md:hidden">
        <HeaderWrapper />
      </div>
      <HeroSection />
      <Features />
      <HowWorks />
      <WhyChoose />
      <CTA />
    </div>
  );
}
