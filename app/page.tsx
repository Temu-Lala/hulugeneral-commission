import Hero from "@/components/sections/hero"
import TrustedCompanies from "@/components/sections/trusted-companies"
import AboutPreview from "@/components/sections/about-preview"
import ServicesPreview from "@/components/sections/services-preview"
import CaseStudies from "@/components/sections/case-studies"
import Testimonials from "@/components/sections/testimonials"
import FaqPreview from "@/components/sections/faq-preview"
import ContactCta from "@/components/sections/contact-cta"
import Trusted from "@/components/sections/trusted"
import ContactPage from "./contact/page"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Trusted />
      <AboutPreview />
      <ServicesPreview />
      <CaseStudies />
      <ContactCta />
      <Testimonials />
      <FaqPreview />
      <ContactPage/>
    </main>
  )
}

