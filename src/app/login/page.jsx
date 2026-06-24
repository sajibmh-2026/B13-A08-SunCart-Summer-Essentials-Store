import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

function LoginContent() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 px-4 py-12">
      <LoginForm />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-amber-500" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
