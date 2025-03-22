"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext"; // Import the language context

interface AboutData {
  title: string;
  description: string[];
  mission: string;
  values: { title: string; description: string }[];
  team: string;
}

export default function AboutPage() {
  const { language } = useLanguage(); // Use the language context
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const response = await fetch(`/content/${language}/aboutdetaile.json`); // Fetch based on the current language
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      }
    }

    fetchAboutData();
  }, [language]); // Re-fetch data when the language changes

  if (!aboutData) return <p>Loading...</p>;

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src="/images/team.jpg"
                alt="Our Team"
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-4 left-4 flex space-x-3">
                <Link href="#" className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
                  <Facebook className="h-5 w-5 text-primary" />
                </Link>
                <Link href="#" className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100">
                  <Mail className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{aboutData.title}</h1>
              {aboutData.description.map((paragraph, index) => (
                <p key={index} className="text-gray-500 md:text-lg">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-12 md:py-24  bg-blue-950  text-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl">Our Mission</h2>
          <p className="max-w-[900px] mx-auto text-gray-500 md:text-lg">{aboutData.mission}</p>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
            {aboutData.values.map((value, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm">
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{aboutData.team}</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Image
                  src={`/images/team${i}.jpg`}
                  alt={`Team Member ${i}`}
                  width={160}
                  height={160}
                  className="rounded-full"
                />
                <h3 className="text-lg font-bold">Team Member {i}</h3>
                <p className="text-sm text-gray-500">Position Title</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}