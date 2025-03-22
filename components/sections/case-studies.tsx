"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

// Define the CaseStudy type
type CaseStudy = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
};

export default function CaseStudyCarousel() {
  const { language } = useLanguage(); // Get current language from context
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch case studies based on language (Amharic or English)
    fetch(`/content/${language}/casestudies.json`)
      .then((res) => res.json())
      .then((data) => setCaseStudies(data))
      .catch((error) => console.error("Error fetching case studies:", error));
  }, [language]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % caseStudies.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? caseStudies.length - 1 : prevIndex - 1
    );
  };

  // Get the current case study
  const currentCaseStudy = caseStudies[currentIndex];

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-black to-transparent bg-clip-text text-transparent sm:text-4xl text-center mb-8">
          {currentCaseStudy?.description}
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Left Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-[400px] h-[300px] md:w-[500px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={currentCaseStudy?.imageSrc}
                alt={currentCaseStudy?.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Side: Text Description */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* Title with Gradient Opacity */}
            <h3 className="text-2xl font-bold bg-gradient-to-r from-black to-transparent bg-clip-text text-transparent">
              {currentCaseStudy?.title}
            </h3>
            <p className="text-gray-600">{currentCaseStudy?.description}</p>
          </div>
        </div>

        {/* Navigation Buttons with Arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrevious}
            className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            <span className="mr-2">←</span>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
