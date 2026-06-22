"use client";

const brands = [
  {
    name: "SunShade",
    tagline: "Premium UV Protection",
    color: "from-amber-400 to-orange-500",
    logo: "https://i.ibb.co/8T4qKqk/lucid-origin-Minimalist-modern-logo-design-for-a-sunglasses-brand-called-Sun-Shade-orange-to-y-0.jpg",
  },
  {
    name: "AquaSeal",
    tagline: "Waterproof Essentials",
    color: "from-cyan-400 to-blue-500",
    logo: "https://i.ibb.co/XZmKZPsX/gpt-image-2-Minimalist-modern-logo-design-for-a-waterproof-products-brand-called-Aqua-Seal-bl-0.jpg",
  },
  {
    name: "SkinGuard",
    tagline: "Dermatologist Approved",
    color: "from-rose-400 to-pink-500",
    logo: "https://i.ibb.co/Gv66HZY1/gpt-image-2-Minimalist-modern-logo-design-for-a-skincare-brand-called-Skin-Guard-pink-to-rose-0.jpg",
  },
  {
    name: "HydroFlow",
    tagline: "Stay Hydrated, Stay Active",
    color: "from-emerald-400 to-teal-500",
    logo: "https://i.ibb.co/3YQKtDWL/gpt-image-2-Minimalist-modern-logo-design-for-a-hydration-water-bottle-brand-called-Hydro-Flo-0.jpg",
  },
];

export default function TopBrands() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-3">
            🏆 Trusted Brands
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Top Brands
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We partner with the best brands to bring you quality summer products
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="card bg-white shadow-md card-hover rounded-2xl p-6 text-center"
            >
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${brand.color} p-1 shadow-lg overflow-hidden`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name + " logo"}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {brand.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{brand.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
