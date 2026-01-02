"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/src/components/layout/AuthLayout";
import SignInForm from "@/src/components/auth/authContainer";
import { isTokenValid } from "@/src/utils/auth";

export default function LandingPage() {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isTokenValid()) {
      router.push("/todolist");
    } else {
      setIsChecking(false);
    }
  }, [router]);


  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}
