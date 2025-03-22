// pages/about.tsx
"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const useCountUp = (start: number, end: number, duration: number): number => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    const increment = () => {
      if (!startTime) startTime = Date.now();
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(increment);
      }
    };
    requestAnimationFrame(increment);
  }, [start, end, duration]);

  return count;
};

export default function AboutPreview() {
  const { language } = useLanguage();
  const [aboutData, setAboutData] = useState<any>(null);
  const clients = useCountUp(0, 120, 150);
  const customers = useCountUp(0, 5850, 5000);
  const projects = useCountUp(0, 50, 50);
  const successRate = useCountUp(0, 98, 5000);

  useEffect(() => {
    fetch(`/content/${language}/about.json`)
      .then((res) => res.json())
      .then((data) => setAboutData(data));
  }, [language]);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-12 items-center w-full">
          {/* Left Column (Image and Team Info) */}
          <div className="relative w-full h-screen flex flex-col justify-between items-center">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-[#192657]">
              <span className="text-white underline p-9">
                {aboutData?.title || "About Us"}:
              </span>
            </div>
            <div className="relative z-10 flex justify-center mt-16">
            </div>
            <div className="relative z-10 flex justify-center items-center h-full w-full">
              <div className="relative w-[80%] flex items-center">
                <div className="absolute inset-0 flex w-full">
                  <div className="w-1/2 bg-[#192657] h-full"></div>
                  <div className="w-1/2 bg-white h-full"></div>
                </div>
                <Image
                  src="https://img.freepik.com/free-vector/international-cooperation-concept-illustration_114360-6302.jpg?t=st=1742027462~exp=1742031062~hmac=fa6008cbedcb1e655fb159a1e0a1e7f04309363731a33e38ee892b83ea565c70&w=826"
                  alt="Our team at work"
                  width={400}
                  height={250}
                  className="relative object-contain w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Right Column (About Company Info and Statistics) */}
          <div className="flex flex-col justify-center space-y-4 px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {aboutData?.title || "About ACME Corporation"}
            </h2>
            <p className="text-gray-500 md:text-lg">
              {aboutData?.description ||
                "Founded in 2010, ACME Corporation has been at the forefront of technological innovation."}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <ul className="list-disc list-inside text-gray-500">
                {aboutData?.goals?.map((goal: string, index: number) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>

              <ul className="list-disc list-inside text-gray-500">
                {aboutData?.features?.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-[#192657]">
                  {aboutData?.clients || "Clients"}
                </h3>
                <p className="text-lg text-gray-500">{clients}+</p>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-[#192657]">
                  {aboutData?.customers || "Customers"}
                </h3>
                <p className="text-lg text-gray-500">{customers}+</p>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-[#192657]">
                  {aboutData?.projects || "Projects"}
                </h3>
                <p className="text-lg text-gray-500">{projects}+</p>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-[#192657]">
                  {aboutData?.successRate || "Success Rate"}
                </h3>
                <p className="text-lg text-gray-500">{successRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
