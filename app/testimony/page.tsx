"use client";

import { useLanguage } from "@/app/context/LanguageContext"; // Import the language context
import { useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  image: string;
}

export default function TestimonyPage() {
  const { language } = useLanguage(); // Get the current language
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch(`/content/${language}/testimony.json`); // Fetch testimonial data based on language
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    }

    fetchTestimonials();
  }, [language]); // Re-fetch when language changes

  if (!testimonials.length) return <p>Loading...</p>;

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8">
        {language === "en" ? "What Our Clients Say" : "ደንበኞቻችን ምን ይላሉ?"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold">{testimonial.name}</h2>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-600">{testimonial.comment}</p>
          </div>
        ))}
      </div>
    </main>
  );
}