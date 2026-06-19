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
import { getContent } from "@/lib/content";

// Content is editable from the admin panel, so always render fresh data.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ business, categories, gallery, testimonials, services }, content] = await Promise.all([
    getSiteData(),
    getContent(),
  ]);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar business={business} />
      <main>
        <Hero hero={content.hero} />
        <BrandMarquee title={content.brandsTitle} brands={content.brands} />
        <About content={content.about} />
        <Categories categories={categories} heading={content.products} />
        <WhyChooseUs content={content.why} />
        <Gallery gallery={gallery} heading={content.gallery} />
        <Testimonials testimonials={testimonials} heading={content.testimonials} />
        <Services services={services} heading={content.services} />
        <Contact business={business} heading={content.contact} />
      </main>
      <Footer business={business} categories={categories} />
      <WhatsAppFloat business={business} />
      <LeadPopup business={business} />
    </>
  );
}
