"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiSun, FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Navbar() {
  const session = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = session?.data?.user;
  const isLoggedIn = !!user;

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully!");
    router.push("/");
  };

  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className="hover:text-amber-400 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/products"
          className="hover:text-amber-400 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Products
        </Link>
      </li>
      {isLoggedIn && (
        <li>
          <Link
            href="/my-profile"
            className="hover:text-amber-400 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            My Profile
          </Link>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <FiSun className="text-amber-400 text-2xl group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              SunCart
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-full border-2 border-amber-400"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-sm font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-sm text-gray-300 hidden lg:inline">
                    {user?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white border-none"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="btn btn-sm btn-ghost text-white hover:text-amber-400"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white border-none"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">
          <ul className="flex flex-col gap-1 p-4 text-sm font-medium">
            {navLinks}
          </ul>
          <div className="p-4 border-t border-slate-700">
            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-full border-2 border-amber-400"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-sm font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-sm text-gray-300">
                    {user?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                  className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white border-none w-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  className="btn btn-sm btn-outline text-white border-amber-400 hover:bg-amber-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white border-none"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
