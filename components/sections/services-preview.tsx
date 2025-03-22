"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ServicesPage() {
  const { language } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [hovered, setHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetch(`/content/${language}/service.json`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services);
        // Removed the line that automatically selects the first service
        // if (data.services.length > 0) {
        //   setSelectedService(data.services[0]);
        // }
      })
      .catch(() => setServices([]));
  }, [language]);

  if (!isClient) {
    return null;
  }

  if (!selectedService && services.length > 0) {
    return (
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{services[0]?.sectionTitle || "Our Services"}</h2>
            <p className="max-w-[900px] mx-auto text-gray-500 md:text-lg">
              {services[0]?.sectionDescription || "We offer a comprehensive range of services to help your business thrive in the digital age."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* Services List */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedService(service)}
                  className={`relative cursor-pointer p-6 rounded-lg shadow-lg transition-all transform hover:bg-blue-900 hover:text-white ${
                    selectedService?.title === service.title
                      ? "bg-blue-900 text-white border-2 border-blue-600"
                      : "bg-white hover:bg-gray-200"
                  }`}
                >
                  <h3 className="text-xl font-bold flex items-center"> {/* Added flex items-center */}
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full border-2 mr-2 ${ // Styled span for number
                      selectedService?.title === service.title ? 'border-white bg-blue-600' : 'border-gray-400 text-gray-700 bg-gray-100'
                    }`}>
                      {index + 1}
                    </span>
                    {service.title}
                  </h3>
                  <p className="text-gray-500">{service.description}</p>
                </div>
              ))}
            </div>

            {/* Right Section - Placeholder when no service is selected yet */}
            <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center bg-gray-100 rounded-lg shadow-lg">
              <div className="text-center px-4">
                <h3 className="text-xl font-bold text-gray-600">Select a service to see details</h3>
                <p className="text-gray-500 mt-2">Click on a service from the list to view its description and image.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/services" className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                {services[0]?.viewAllText || "View All Services"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (!selectedService) {
    return (
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Loading Services...</h2>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{services[0]?.sectionTitle || "Our Services"}</h2>
          <p className="max-w-[900px] mx-auto text-gray-500 md:text-lg">
            {services[0]?.sectionDescription || "We offer a comprehensive range of services to help your business thrive in the digital age."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Services List */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(service)}
                className={`relative cursor-pointer p-6 rounded-lg shadow-lg transition-all transform hover:bg-blue-900 hover:text-white ${
                  selectedService?.title === service.title
                    ? "bg-blue-900 text-white border-2 border-blue-600"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                <h3 className="text-xl font-bold flex items-center"> {/* Added flex items-center */}
                    <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full border-2 mr-2 ${ // Styled span for number
                      selectedService?.title === service.title ? 'border-white bg-blue-600' : 'border-gray-400 text-gray-700 bg-gray-100'
                    }`}>
                      {index + 1}
                    </span>
                    {service.title}
                  </h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Right Section with Split Background */}
          <div className="relative w-full h-[600px] md:h-[800px]">
            {/* Split Background */}
            <div className="absolute inset-0 flex w-full h-full">
              <div className="w-1/2 h-full bg-white" />
              <div className="w-1/2 h-full bg-blue-900" />
            </div>

            {/* Image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={hovered ? selectedService.hoverImageSrc : selectedService.imageSrc}
                alt={selectedService.title}
                width={600}
                height={600}
                className="object-contain w-[500px] h-[500px] rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/services" className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
              {services[0]?.viewAllText || "View All Services"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}