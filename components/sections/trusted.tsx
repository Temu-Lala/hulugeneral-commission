"use client";

import Image from "next/image";

export default function Trusted() {
  const logos = [
    "https://th.bing.com/th/id/R.4bcc28ee68316e2af08146b6f22a8434?rik=RmgWjM4lveddLg&riu=http%3a%2f%2fallrewards.com.ph%2fimages%2flogo-allday.png&ehk=4%2fVpk0P21CfxjkYNj65yJlmkUROLAKONqLh2boDnSyo%3d&risl=&pid=ImgRaw&r=0",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/d7/db/16/getfam-hotel.jpg?w=600&h=-1&s=1",
    "https://th.bing.com/th/id/OIP.p4U-1TMqW3kb14suyE_-eQHaHZ?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.cBK38BUyFiS1KZcrRpKCBwHaHa?rs=1&pid=ImgDetMain",
    "https://perfora-expo.com/wp-content/uploads/2022/09/logo_ethiopian-skylight-hotel.png",
    "https://th.bing.com/th/id/R.1c6ba5f126fab8198bfac586231030d6?rik=bJ7mJ%2fnekxsfsg&pid=ImgRaw&r=0",
  ];

  return (
    <section className="relative w-full py-12 md:py-24 bg-gray-100">
      {/* Blurred Background */}
      <div className="absolute inset-0">
        <Image
          src="/blurred-bg.jpg"
          alt="Blurred Background"
          layout="fill"
          objectFit="cover"
          className="blur-lg opacity-30"
        />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Trusted by Leading Companies
        </h2>

        {/* Auto-Scrolling Logo Section */}
        <div className="mt-8 overflow-hidden">
          <div className="flex gap-8 px-4 md:px-8 lg:px-12 animate-scroll">
            {[...logos, ...logos].map((logo, index) => ( // Duplicate for infinite scrolling effect
              <div
                key={index}
                className="min-w-[150px] md:min-w-[200px] grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100"
              >
                <Image
                  src={logo}
                  alt={`Company ${index + 1}`}
                  width={200}
                  height={100}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll 20s linear infinite;
          white-space: nowrap;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}
