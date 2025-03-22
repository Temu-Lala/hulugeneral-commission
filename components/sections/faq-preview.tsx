"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function FaqPreview() {
  const [showAll, setShowAll] = useState(false);
  const { language } = useLanguage();  // Use the current language from context
  const [faqData, setFaqData] = useState<any>(null);

  useEffect(() => {
    fetch(`/content/${language}/faq.json`)
      .then((res) => res.json())
      .then((data) => setFaqData(data))
      .catch(() => setFaqData({})); // Fallback in case of error
  }, [language]);

  if (!faqData) return null; // Return nothing if the data hasn't loaded yet

  const displayedFaqs = showAll ? faqData.faqs : faqData.faqs.slice(0, 5);

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{faqData.title}</h2>
            <p className="max-w-[900px] text-gray-500 md:text-lg">{faqData.description}</p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-8">
          <Accordion type="single" collapsible className="w-full">
            {displayedFaqs.map((faq: any, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex justify-center mt-8">
            {!showAll ? (
              <Button onClick={() => setShowAll(true)}>{faqData.faqs.length > 5 ? "See All FAQs" : ""}  See All Related Quastions</Button>
            ) : (
              <Button asChild>
                <Link href="/faq">{faqData.faqs.length > 5 ? "View FAQ Page" : ""} See All Related Quastions</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
