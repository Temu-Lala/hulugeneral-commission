"use client";

import { useLanguage } from "@/app/context/LanguageContext"; // Import the language context
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons for expand/collapse

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const { language } = useLanguage(); // Get the current language
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null); // Track the active FAQ ID

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch(`/content/${language}/faqdetail.json`); // Fetch FAQ data based on language
        const data = await response.json();
        setFaqs(data.faqs);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    }

    fetchFAQs();
  }, [language]); // Re-fetch when language changes

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id); // Toggle the active FAQ
  };

  if (!faqs.length) return <p>Loading...</p>;

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8">
        {language === "en" ? "Frequently Asked Questions" : "በተደጋጋሚ የሚጠየቁ ጥያቄዎች"}
      </h1>

      <div className="w-full max-w-4xl">
        {faqs.map((faq) => (
          <div key={faq.id} className="mb-4 border-b pb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(faq.id)} // Toggle FAQ on click
            >
              <h2 className="text-xl font-semibold">{faq.question}</h2>
              {activeId === faq.id ? (
                <ChevronUp className="h-6 w-6 text-gray-600" /> // Show up arrow if expanded
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-600" /> // Show down arrow if collapsed
              )}
            </div>
            {activeId === faq.id && ( // Show answer if FAQ is active
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}