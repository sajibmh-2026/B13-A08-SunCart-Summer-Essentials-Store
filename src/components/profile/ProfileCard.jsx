"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { FiEdit3, FiMail, FiUser, FiCamera } from "react-icons/fi";

export default function ProfileCard() {
  const session = useAuth();
  const user = session?.data?.user;

  if (!user) return null;

  return (
    <div className="card bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-lg mx-auto animate-fade-in-up">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-28 h-28 rounded-full border-4 border-amber-400 shadow-lg object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {user.name || "User"}
        </h2>
        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <FiMail className="text-amber-500" />
          <span className="text-sm">{user.email}</span>
        </div>

        {/* Info Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <FiUser className="text-amber-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400">Full Name</p>
              <p className="text-sm font-medium text-gray-800">
                {user.name || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiMail className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-800 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <Link
          href="/update-profile"
          className="btn bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none gap-2 w-full"
        >
          <FiEdit3 /> Update Profile
        </Link>
      </div>
    </div>
  );
}
