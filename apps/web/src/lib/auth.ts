import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

interface JWTPayload {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  iat?: number;
  exp?: number;
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    console.log(
      "Verifying token with secret:",
      process.env.JWT_ACCESS_TOKEN_SECRET ? "Secret exists" : "No secret"
    );
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET!
    ) as JWTPayload;
    console.log("Token verified successfully:", decoded);
    return decoded;
  } catch (error) {
    console.log("Token verification failed:", error);
    return null;
  }
}

export function extractTokenFromRequest(req: NextRequest): string | null {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  console.log(
    "Extracted tokens - Access:",
    accessToken ? "exists" : "none",
    "Refresh:",
    refreshToken ? "exists" : "none"
  );
  return accessToken || refreshToken || null;
}

export function getUserRole(req: NextRequest): "USER" | "ADMIN" | null {
  const token = extractTokenFromRequest(req);
  if (!token) return null;

  const payload = verifyToken(token);
  return payload?.role || null;
}

export function isAuthenticated(req: NextRequest): boolean {
  const token = extractTokenFromRequest(req);
  if (!token) return false;

  return verifyToken(token) !== null;
}

export function isAdmin(req: NextRequest): boolean {
  return getUserRole(req) === "ADMIN";
}
