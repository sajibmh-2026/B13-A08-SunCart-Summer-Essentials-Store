"use client";

import {
  FiDroplet,
  FiSun,
  FiHeart,
  FiShield,
} from "react-icons/fi";

const tips = [
  {
    icon: <FiSun className="text-3xl" />,
    title: "Sunscreen is a Must",
    description:
      "Apply SPF 30+ sunscreen every 2 hours, even on cloudy days. UV rays can penetrate clouds and cause skin damage.",
    color: "bg-amber-100 text-amber-600",
    border: "border-amber-200",
  },
  {
    icon: <FiDroplet className="text-3xl" />,
    title: "Stay Hydrated",
    description:
      "Drink at least 8 glasses of water daily. Carry a reusable water bottle and add fruits for natural flavor.",
    color: "bg-blue-100 text-blue-600",
    border: "border-blue-200",
  },
  {
    icon: <FiHeart className="text-3xl" />,
    title: "Light & Breathable Clothing",
    description:
      "Choose loose-fitting, light-colored clothes made from natural fabrics like cotton and linen.",
    color: "bg-rose-100 text-rose-600",
    border: "border-rose-200",
  },
  {
    icon: <FiShield className="text-3xl" />,
    title: "Protect Your Eyes",
    description:
      "Wear UV-blocking sunglasses to protect your eyes from harmful rays and reduce the risk of cataracts.",
    color: "bg-teal-100 text-teal-600",
    border: "border-teal-200",
  },
];

export default function SummerTips() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-3">
            💡 Stay Safe This Summer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Summer Care Tips
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Essential tips to keep you healthy, happy, and protected during the
            sunny season
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className={`card bg-white border ${tip.border} card-hover rounded-2xl p-6 text-center`}
            >
              <div
                className={`w-16 h-16 ${tip.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                {tip.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
