"use client";

import { SessionProvider as NextAuthProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600"></div>
    </div>
  );
}

export default function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <NextAuthProvider>
      <AuthLoader>{children}</AuthLoader>
    </NextAuthProvider>
  );
}

function AuthLoader({ children }: { children: ReactNode }) {
  const { status } = useSession();

  if (status === "loading") return <LoadingScreen />;
  return <>{children}</>;
}
