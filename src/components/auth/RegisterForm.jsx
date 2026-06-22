"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiImage, FiUserPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        image: photoURL || undefined,
      });

      if (result?.error) {
        toast.error(
          result.error.message || "Registration failed. Please try again."
        );
      } else {
        toast.success("Account created successfully! 🎉 Please login.");
        router.push("/login");
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
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <div className="card bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FiUserPlus className="text-3xl text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-500 text-sm mt-1">
          Join SunCart for summer deals
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Your full name"
              className="input input-bordered w-full pl-10 bg-gray-50 focus:bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

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
            Photo URL{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full pl-10 bg-gray-50 focus:bg-white"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
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
              placeholder="Min 6 characters"
              className="input input-bordered w-full pl-10 bg-gray-50 focus:bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`btn bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-none w-full gap-2 ${
            loading ? "loading" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <FiUserPlus /> Register
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-teal-600 hover:text-teal-700 font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
