"use client";

import { useLanguage } from "@/app/context/LanguageContext"; // Import the context
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage(); // Use context here
  const [navLinks, setNavLinks] = useState<{ [key: string]: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch(`/content/${language}/navbar.json`)
      .then((res) => res.json())
      .then((data) => setNavLinks(data.links))
      .catch(() => setNavLinks({})); // Fallback in case of an error
  }, [language]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all ${
        isScrolled ? "bg-[#0A192F] text-white shadow-lg" : "bg-white"
      }`}
    >
      {/* Top Bar with Email, Phone, and Language Switcher */}
      <div className="container flex h-10 items-center justify-between px-4 md:px-6">
        {/* Empty div to balance the layout */}
        <div className="flex-1"></div>

        {/* Email and Phone on the Right Side */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <span>0960380000</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <span>hulugeneralcommission@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex-1">
        Hulu General Commission
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 flex-1 justify-center">
          {navLinks &&
            Object.entries(navLinks).map(([key, value]) => (
              <Link
                key={key}
                href={`/${key}`}
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                {value}
              </Link>
            ))}
          {/* Case Studies Link */}
         
        </nav>

        {/* Contact Button and Language Switcher */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4 text-primary" />
            <span>{language === "en" ? "አማ" : "EN"}</span>
          </button>

          {/* Contact Button */}
          <Link href={"/contact"}>
              <Button className="bg-blue-600">
               Contact Us
              </Button></Link>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              {navLinks &&
                Object.entries(navLinks).map(([key, value]) => (
                  <Link key={key} href={`/${key}`} className="hover:underline">
                    {value}
                  </Link>
                ))}
              {/* Case Studies Link in Mobile Menu */}
              <Link href={"/contact"}>
              <Button className="bg-blue-600">
               
              </Button></Link>
             
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}