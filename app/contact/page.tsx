"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext"; // Import the context
import { useForm, ValidationError } from "@formspree/react"; // Import Formspree

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const { language } = useLanguage(); // Use context here
  const [content, setContent] = useState<{ [key: string]: string } | null>(null);

  // Formspree integration
  const [state, handleSubmit] = useForm("mrbpzkjz");

  useEffect(() => {
    fetch(`/content/${language}/contact.json`)
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({})); // Fallback in case of an error
  }, [language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Clear form fields after successful submission
  useEffect(() => {
    if (state.succeeded) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  }, [state.succeeded]);

  // Fallback content to prevent layout shifts
  const fallbackContent = {
    title: "Loading...",
    description: "Loading...",
    formTitle: "Loading...",
    formDescription: "Loading...",
    nameLabel: "Loading...",
    emailLabel: "Loading...",
    phoneLabel: "Loading...",
    subjectLabel: "Loading...",
    messageLabel: "Loading...",
    sendButton: "Loading...",
    emailInfo: "Loading...",
    phoneInfo: "Loading...",
    addressInfo: "Loading...",
    address: "Loading...",
  };

  const displayContent = content || fallbackContent;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl whitespace-nowrap">
                {displayContent.title}
              </h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl whitespace-pre-line">
                {displayContent.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            {/* Left Side: Contact Form */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold whitespace-nowrap">{displayContent.formTitle}</h2>
                <p className="text-gray-500 whitespace-pre-line">{displayContent.formDescription}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="whitespace-nowrap">
                    {displayContent.nameLabel}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={displayContent.nameLabel}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="min-w-[300px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="whitespace-nowrap">
                    {displayContent.emailLabel}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={displayContent.emailLabel}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="min-w-[300px]"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="whitespace-nowrap">
                    {displayContent.phoneLabel}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder={displayContent.phoneLabel}
                    value={formData.phone}
                    onChange={handleChange}
                    className="min-w-[300px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject" className="whitespace-nowrap">
                    {displayContent.subjectLabel}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder={displayContent.subjectLabel}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="min-w-[300px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message" className="whitespace-nowrap">
                    {displayContent.messageLabel}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={displayContent.messageLabel}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="min-h-[150px] min-w-[300px]"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                <Button type="submit" disabled={state.submitting} className="bg-blue-900 w-full whitespace-nowrap">
                  {state.submitting ? "Submitting..." : displayContent.sendButton}
                </Button>
                {state.succeeded && <p className="text-green-500">Thank you for your message. We'll get back to you soon!</p>}
              </form>
            </div>

            {/* Right Side: Map Section */}
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden">
              {/* Blue-Black Background */}
              <div className="absolute inset-y-0 right-0 w-1/2 h-full bg-blue-900"></div>

              {/* Map */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <div className="w-[90%] h-[90%] rounded-lg overflow-hidden shadow-lg">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d508.63436295546313!2d38.75416929021368!3d9.011631550932997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1644d37fd47124b5%3A0x2fed8c249a529ccc!2sBoost%20Software%20Development%20PLC!5e0!3m2!1sen!2set!4v1741350406074!5m2!1sen!2set" width="100%"
                    height="100%"
                    style={{ border: 0 }} 
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                 > </iframe>
              
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold whitespace-nowrap">{displayContent.emailInfo}</h3>
                <p className="text-gray-500">hulugeneralcommission@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold whitespace-nowrap">{displayContent.phoneInfo}</h3>
                <p className="text-gray-500">0960380000</p>
                <p className="text-gray-500">0967336700</p>

              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold whitespace-nowrap">{displayContent.addressInfo}</h3>
                <p className="text-gray-500 whitespace-pre-line">{displayContent.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}