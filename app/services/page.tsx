"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("web-development");
  const { language } = useLanguage();
  const [content, setContent] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    fetch(`/content/${language}/servicedetail.json`)
      .then((res) => res.json())
      .then((data) => setContent(data || {}))
      .catch(() => setContent({ services: [] }));
  }, [language]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {content.title || "Our Services"}
          </h1>
          <p className="max-w-[900px] text-gray-500 md:text-xl">
            {content.description || "Discover the best services we offer!"}
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="web-development" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-2">
                  {content.services?.length > 0 ? (
                    content.services.map((service: any) => (
                      <TabsTrigger key={service.id} value={service.id}>
                        <h3 className="font-semibold">{service.title}</h3>
                      </TabsTrigger>
                    ))
                  ) : (
                    <p>Loading services...</p>
                  )}
                </TabsList>
              </div>
              <div className="md:w-2/3">
                {content.services?.map((service: any) => (
                  <TabsContent key={service.id} value={service.id}>
                    <Image src="/placeholder.svg" alt={service.title} width={600} height={400} />
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
