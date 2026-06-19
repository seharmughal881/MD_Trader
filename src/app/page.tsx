import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandMarquee from "@/components/BrandMarquee";
import About from "@/components/About";
import Categories from "@/components/Categories";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LeadPopup from "@/components/LeadPopup";
import { getSiteData } from "@/lib/queries";

// Content is editable from the admin panel, so always render fresh data.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { business, categories, gallery, testimonials, services } = await getSiteData();

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar business={business} />
      <main>
        <Hero />
        <BrandMarquee />
        <About />
        <Categories categories={categories} />
        <WhyChooseUs />
        <Gallery gallery={gallery} />
        <Testimonials testimonials={testimonials} />
        <Services services={services} />
        <Contact business={business} />
      </main>
      <Footer business={business} categories={categories} />
      <WhatsAppFloat business={business} />
      <LeadPopup business={business} />
    </>
  );
}
