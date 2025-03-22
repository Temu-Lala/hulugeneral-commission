"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext"; // Import the language context
import { useState, useEffect } from "react";

interface CaseStudy {
  title: string;
  description: string;
  content: string;
  image: string;
  link: string;
}

export default function CaseStudiesPage() {
  const { language } = useLanguage(); // Get the current language
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isClient, setIsClient] = useState(false); // State to check if we're on the client-side

  useEffect(() => {
    setIsClient(true); // Set to true when the component is mounted on the client
  }, []);

  useEffect(() => {
    fetch(`/content/${language}/case-studies.json`)
      .then((res) => res.json())
      .then((data) => setCaseStudies(data.caseStudies))
      .catch(() => setCaseStudies([])); // Fallback if loading fails
  }, [language]); // Re-fetch when language changes

  if (!isClient) {
    return null; // Return null until the component is mounted on the client side
  }

  if (!caseStudies.length) {
    return <div>Loading...</div>; // Render a loading state if caseStudies is not set yet
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {language === "en" ? "Case Studies" : "ጉዳዮች ጥናቶች"}
              </h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl">
                {language === "en"
                  ? "Explore how we've helped businesses overcome challenges and achieve their goals."
                  : "ንግዶች ተግዳሮቶችን እንዴት እንደተሻገሩ እና ግቦቻቸውን እንዴት እንደተሳካላቸው ይመልከቱ።"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:gap-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                {/* Image */}
                <div className={`relative overflow-hidden rounded-lg ${index % 2 === 1 ? "lg:order-last" : ""}`}>
                  <Image
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{study.title}</h2>
                    <p className="text-gray-500 font-medium">{study.description}</p>
                    <p className="text-gray-500">{study.content}</p>
                  </div>
                  <div>
                    <Button asChild>
                      <Link href={study.link}>
                        {language === "en" ? "Read Full Case Study" : "ሙሉ ጉዳይ ጥናት ያንብቡ"} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}