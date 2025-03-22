"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function TrustedCompanies() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marqueeContent = marqueeRef.current?.querySelector(".marquee-content")
    if (marqueeContent) {
      const clone = marqueeContent.cloneNode(true)
      marqueeRef.current?.appendChild(clone)
    }
  }, [])

  const companies = [
    { name: "Company 1", logo: "https://th.bing.com/th/id/OIP.2nuMCIaS4LwuK0J3cCCixgHaF7?rs=1&pid=ImgDetMain" },
    { name: "Company 2", logo: "https://th.bing.com/th/id/OIP.2nuMCIaS4LwuK0J3cCCixgHaF7?rs=1&pid=ImgDetMain" },
    { name: "Company 3", logo: "https://th.bing.com/th/id/OIP.2nuMCIaS4LwuK0J3cCCixgHaF7?rs=1&pid=ImgDetMain" },
    { name: "Company 4", logo: "https://th.bing.com/th/id/OIP.2nuMCIaS4LwuK0J3cCCixgHaF7?rs=1&pid=ImgDetMain" },
    { name: "Company 5", logo: "https://th.bing.com/th/id/OIP.2nuMCIaS4LwuK0J3cCCixgHaF7?rs=1&pid=ImgDetMain" },
    { name: "Company 6", logo: "https://th.bing.com/th/id/OIP.2nuMCIaS4LwuK0J3cCCixgHaF7?rs=1&pid=ImgDetMain" },
    { name: "Company 7", logo: "https://th.bing.com/th/id/OIP.2nuMCIaS4LwuK0J3cCCixgHaF7?rs=1&pid=ImgDetMain" },
    { name: "Company 8", logo: "https://th.bing.com/th/id/OIP.2nuMCIaS4LwuK0J3cCCixgHaF7?rs=1&pid=ImgDetMain" },
  ]

  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Trusted by Leading Companies</h2>
        <div className="marquee overflow-hidden" ref={marqueeRef}>
          <div className="marquee-content flex items-center gap-12 py-4">
            {companies.map((company, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

