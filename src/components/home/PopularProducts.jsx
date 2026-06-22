"use client";

import products from "@/data/products.json";
import ProductCard from "@/components/cards/ProductCard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function PopularProducts() {
  const popular = products.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-3">
            🔥 Trending Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Popular Products
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our best-selling summer essentials loved by customers worldwide
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none gap-2"
          >
            View All Products <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
