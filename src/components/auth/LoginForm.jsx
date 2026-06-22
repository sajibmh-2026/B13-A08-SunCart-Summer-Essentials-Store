"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: redirect,
      });

      if (result?.error) {
        toast.error(result.error.message || "Login failed. Please try again.");
      } else {
        toast.success("Welcome back! 🌞");
        router.push(redirect);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: redirect,
      });
    } catch (err) {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="card bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FiLogIn className="text-3xl text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">
          Sign in to continue shopping
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="your@email.com"
              className="input input-bordered w-full pl-10 bg-gray-50 focus:bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="label text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full pl-10 bg-gray-50 focus:bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none w-full gap-2 ${
            loading ? "loading" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <FiLogIn /> Login
            </>
          )}
        </button>
      </form>

      <div className="divider text-sm text-gray-400">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full gap-2 border-gray-300 hover:bg-gray-50"
      >
        <FcGoogle className="text-xl" /> Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-amber-600 hover:text-amber-700 font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
