"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight, FiShoppingBag, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    title: "Summer Sale is Here!",
    subtitle: "Up to 50% Off on Summer Essentials",
    description:
      "Discover amazing deals on sunglasses, skincare, beach gear, and more.",
    image:
      "https://i.ibb.co/FktHB50D/gpt-image-2-A-vibrant-summer-sale-banner-for-an-e-commerce-website-wide-format-1920x600px-tr-0.jpg",
  },
  {
    title: "Beat the Heat",
    subtitle: "New Cooling Collection 2026",
    description:
      "Stay cool and stylish with our curated summer collection.",
    image:
      "https://i.ibb.co/DPRn6x0g/julia-kicova-tr6u-Uy-HOUJ0-unsplash.jpg",
  },
  {
    title: "Beach Ready",
    subtitle: "Everything You Need for the Perfect Beach Day",
    description:
      "From towels to waterproof gear — we've got you covered.",
    image:
      "https://i.ibb.co/wfRbrHW/emil-kalibradov-8-AZg-i19-Io-unsplash.jpg",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => setCurrent(index);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden">
      {/* Crossfade Banner Images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Readable overlay — lighter for brightness */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm text-white">
              🌞 Summer 2026 Collection
            </span>
            <h1
              key={`title-${current}`}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white animate-fade-in-up"
            >
              {slides[current].title}
            </h1>
            <p
              key={`sub-${current}`}
              className="text-xl md:text-2xl font-light mb-2 text-white/90"
            >
              {slides[current].subtitle}
            </p>
            <p
              key={`desc-${current}`}
              className="text-base md:text-lg mb-8 text-white/80 max-w-lg"
            >
              {slides[current].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="btn bg-amber-500 hover:bg-amber-600 text-white border-none gap-2"
              >
                <FiShoppingBag /> Shop Now
              </Link>
              <Link
                href="/products"
                className="btn btn-outline border-white text-white hover:bg-white/20 gap-2"
              >
                Explore <FiArrowRight />
              </Link>
            </div>

            {/* Slide indicators */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-amber-400 w-10"
                      : "bg-white/40 w-3 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" className="w-full h-auto" fill="currentColor">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" className="text-gray-50" />
        </svg>
      </div>
    </section>
  );
}
