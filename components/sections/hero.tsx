"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/context/LanguageContext"; // Import the context
import { useState, useEffect } from "react";

export default function Hero() {
  const { language } = useLanguage(); // Use context here
  const [content, setContent] = useState<{ [key: string]: string } | null>(null);

  useEffect(() => {
    fetch(`/content/${language}/index.json`)
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({})); // Fallback in case of an error
  }, [language]);

  // Fallback content to prevent layout shifts
  const fallbackContent = {
    title: "Loading...",
    subtitle: "Loading...",
    description: "Loading...",
    buttonText: "Loading...",
  };

  const displayContent = content || fallbackContent;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Left Side - Text */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              {displayContent.title}{" "}
              <span className="opacity-50 blur-sm">{displayContent.subtitle}</span>
            </h1>
            <p className="max-w-[600px] text-gray-600 opacity-50 md:text-lg">
              {displayContent.description}
            </p>
            <div>
              <Button asChild size="lg">
                <Link href="/contact">{displayContent.buttonText}</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[600px] aspect-video overflow-hidden rounded-xl shadow-lg">
              <Image
                src="https://img.freepik.com/free-vector/flat-hand-drawn-people-analyzing-growth-chart-illustration_23-2148859389.jpg?t=st=1742025304~exp=1742028904~hmac=f0c43f99b984b8a269bf988c17111efcac2f52e787a6be2e614e3e2fb1702c51&w=1380"
                alt="Business team working together"
                width={800}
                height={600}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}