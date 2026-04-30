"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
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
