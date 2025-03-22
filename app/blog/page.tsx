"use client";

import { useLanguage } from "@/app/context/LanguageContext"; // Import the language context
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  author: string;
}

export default function BlogPage() {
  const { language } = useLanguage(); // Get the current language
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch(`/content/${language}/blog.json`); // Fetch blog data based on language
        const data = await response.json();
        setBlogPosts(data.posts);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      }
    }

    fetchBlogPosts();
  }, [language]); // Re-fetch when language changes

  if (!blogPosts.length) return <p>Loading...</p>;

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8">
        {language === "en" ? "Our Blog" : "የእኛ ጦማር"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.date}</span>
                <span className="text-sm text-gray-500">{post.author}</span>
              </div>
              <Link
                href={`/blog/${post.id}`}
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                {language === "en" ? "Read More" : "ተጨማሪ አንብብ"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}