"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/v1/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData?.data ?? null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return {
    user,
    loading,
    isAdmin: user?.role === "ADMIN",
    isAuthenticated: !!user,
  };
}
