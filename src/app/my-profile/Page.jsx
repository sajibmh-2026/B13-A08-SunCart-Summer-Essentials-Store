"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import ProfileCard from "@/components/profile/ProfileCard";
import Loading from "@/components/shared/loading/Loading";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const session = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session?.isPending && !session?.data?.user) {
      toast.error("Please login to view your profile");
      router.push("/login?redirect=/my-profile");
    }
  }, [session, router]);

  if (session?.isPending) {
    return <Loading />;
  }

  if (!session?.data?.user) {
    return null;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 px-4 py-12">
      <ProfileCard />
    </div>
  );
}
