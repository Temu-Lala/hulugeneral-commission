import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from  "@/app/context/LanguageContext"; 
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingChat from "@/components/layout/floating-chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hulu Generall Commission",
  description: "Professional business solutions for your company",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingChat />
        </LanguageProvider>
      </body>
    </html>
  );
}
