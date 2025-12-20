"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { appwriteAuth } from "@/lib/appwrite";

interface AuthRedirectProps {
  redirectTo?: string;
  redirectCondition?: "authenticated" | "unauthenticated";
  children: React.ReactNode;
}

export default function AuthRedirect({
  redirectTo = "/dashboard",
  redirectCondition = "authenticated",
  children,
}: AuthRedirectProps) {
  const router = useRouter();
  const [hasDeterminedAuth, setHasDeterminedAuth] = useState(false);
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const sessionCheck = await appwriteAuth.checkSession();
        console.log("Session Check:", sessionCheck);
        if (redirectCondition === "authenticated" && sessionCheck.isLoggedIn) {
          router.push(redirectTo);
        } else if (
          redirectCondition === "unauthenticated" &&
          !sessionCheck.isLoggedIn
        ) {
          router.push(redirectTo);
        }
        setHasDeterminedAuth(true);
      } catch (error) {
        console.error("Auth check error:", error);
        setHasDeterminedAuth(true);
      }
    };

    checkAuthAndRedirect();
  }, [router, redirectTo, redirectCondition]);

  console.log("Has Determined Auth:", hasDeterminedAuth);
  if (!hasDeterminedAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-800 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/80">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
