"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import products from "@/data/products.json";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/loading/Loading";
import toast from "react-hot-toast";
import {
  FiStar,
  FiShoppingCart,
  FiArrowLeft,
  FiPackage,
  FiTruck,
  FiShield,
} from "react-icons/fi";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const session = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const id = parseInt(params?.id);
    const found = products.find((p) => p.id === id);

    if (found) {
      setProduct(found);
    }
    setLoading(false);
  }, [params]);

  // Protected route - redirect if not logged in
  useEffect(() => {
    if (!loading && !session?.data?.user) {
      toast.error("Please login to view product details");
      router.push(`/login?redirect=/products/${params?.id}`);
    }
  }, [session, loading, router, params]);

  if (loading || session?.isPending) {
    return <Loading />;
  }

  if (!session?.data?.user) {
    return null;
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h2>
        <Link
          href="/products"
          className="btn bg-amber-500 hover:bg-amber-600 text-white border-none"
        >
          <FiArrowLeft /> Back to Products
        </Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(
          <FiStar key={i} className="text-amber-400 fill-amber-400" />
        );
      } else if (i === full && hasHalf) {
        stars.push(
          <FiStar key={i} className="text-amber-400 fill-amber-200" />
        );
      } else {
        stars.push(<FiStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-gray-50 min-h-screen animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-amber-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-amber-500 transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
            <div className="relative aspect-square bg-gradient-to-br from-amber-50 to-orange-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://placehold.co/600x600/f59e0b/white?text=${encodeURIComponent(product.name)}`;
                }}
              />
              <div className="absolute top-4 left-4">
                <span className="badge bg-amber-500 text-white border-none text-sm px-3 py-1">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-sm text-amber-600 uppercase tracking-wider font-medium mb-2">
              {product.brand}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">{renderStars(product.rating)}</div>
              <span className="text-sm text-gray-500">
                ({product.rating} / 5)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className={`w-3 h-3 rounded-full ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm text-gray-600">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              className="btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none gap-2 text-lg py-3 mb-6"
              onClick={() =>
                toast.success(`${product.name} added to cart!`)
              }
              disabled={product.stock === 0}
            >
              <FiShoppingCart /> Add to Cart
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl">
                <FiPackage className="text-amber-500" />
                <span className="text-xs text-gray-600">Free Packaging</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                <FiTruck className="text-blue-500" />
                <span className="text-xs text-gray-600">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                <FiShield className="text-green-500" />
                <span className="text-xs text-gray-600">Quality Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
