"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { FiUser, FiMail, FiImage, FiSave, FiArrowLeft } from "react-icons/fi";

export default function UpdateProfileForm() {
  const session = useAuth();
  const router = useRouter();
  const user = session?.data?.user;

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateUser({
        name,
        image: image || undefined,
      });

      if (result?.error) {
        toast.error(result.error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully! ✨");
        router.push("/my-profile");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="card bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-auto animate-fade-in-up">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FiUser className="text-3xl text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Update Profile</h2>
        <p className="text-gray-500 text-sm mt-1">Edit your information</p>
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
            Email{" "}
            <span className="text-gray-400 font-normal">(read-only)</span>
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              className="input input-bordered w-full pl-10 bg-gray-100 cursor-not-allowed"
              value={user.email}
              readOnly
              disabled
            />
          </div>
        </div>

        <div>
          <label className="label text-sm font-medium text-gray-700">
            Photo URL
          </label>
          <div className="relative">
            <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full pl-10 bg-gray-50 focus:bg-white"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>

        {/* Preview */}
        {image && (
          <div className="flex justify-center">
            <img
              src={image}
              alt="Preview"
              className="w-20 h-20 rounded-full border-2 border-amber-400 object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="flex gap-3">
          <Link
            href="/my-profile"
            className="btn btn-outline flex-1 gap-2 border-gray-300"
          >
            <FiArrowLeft /> Cancel
          </Link>
          <button
            type="submit"
            className={`btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none flex-1 gap-2 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <FiSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
