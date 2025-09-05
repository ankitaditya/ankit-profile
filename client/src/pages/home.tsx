import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ResumeSection from "@/components/resume-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Navigation />
      <HeroSection />
      <ResumeSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
