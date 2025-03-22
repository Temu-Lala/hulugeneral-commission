"use client";

import { useLanguage } from "@/app/context/LanguageContext"; // Import the context
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { language } = useLanguage(); // Use language context
  const [testimonialsData, setTestimonialsData] = useState<any>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch(`/content/${language}/testimonials.json`)
      .then((res) => res.json())
      .then((data) => setTestimonialsData(data))
      .catch(() => setTestimonialsData(null)); // Fallback in case of an error
  }, [language]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let animationFrameId: number;

    const scrollMarquee = () => {
      if (marquee && !isHovered) {
        // Scroll the content to the left
        marquee.scrollLeft += 1;
        // If the content has scrolled to the end, reset scroll to the beginning
        if (marquee.scrollLeft >= marquee.scrollWidth - marquee.offsetWidth) {
          marquee.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollMarquee);
    };

    animationFrameId = requestAnimationFrame(scrollMarquee);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  if (!testimonialsData) return null; // Wait for data to load

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            {testimonialsData.testimonialHeading}
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-lg">
            {testimonialsData.testimonialSubheading}
          </p>
        </div>
        <div
          className="mt-16 overflow-hidden whitespace-nowrap"
          ref={marqueeRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="inline-flex gap-6 py-4">
            {[...testimonialsData.testimonials, ...testimonialsData.testimonials].map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-[300px] md:w-[400px]">
                <div className="h-full rounded-lg border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src={testimonial.avatar} alt={testimonial.name} width={80} height={80} className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
