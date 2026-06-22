"use client";

import Link from "next/link";
import { FiStar, FiShoppingCart } from "react-icons/fi";

export default function ProductCard({ product }) {
  const { id, name, brand, price, rating, image, category } = product;

  return (
    <div className="card bg-white shadow-md card-hover rounded-2xl overflow-hidden border border-gray-100">
      <figure className="relative h-52 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden group">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x300/f59e0b/white?text=${encodeURIComponent(name)}`;
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="badge badge-sm bg-amber-500 text-white border-none">
            {category}
          </span>
        </div>
      </figure>
      <div className="card-body p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider">
          {brand}
        </p>
        <h3 className="card-title text-base text-gray-800 line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <FiStar className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-gray-600">{rating}</span>
          </div>
          <span className="text-lg font-bold text-amber-600">${price}</span>
        </div>
        <div className="card-actions mt-3">
          <Link
            href={`/products/${id}`}
            className="btn btn-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none w-full gap-1"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
