import { NextRequest, NextResponse } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_BASE_API_URL ??
  "http://localhost:5000/api/v1";

function rewriteSetCookieForRequest(cookie: string, reqUrl: URL) {
  const isLocalhost =
    reqUrl.hostname === "localhost" ||
    reqUrl.hostname === "127.0.0.1" ||
    reqUrl.hostname === "0.0.0.0";

  let updated = cookie;

  // If upstream sets a Domain, it can prevent the browser from storing the cookie
  // for localhost / dev origins.
  if (isLocalhost) {
    updated = updated.replace(/;\s*Domain=[^;]*/i, "");
  }

  // Cookies with SameSite=None must also be Secure, which won't work on http://localhost.
  // For local dev over http, drop Secure and fall back to SameSite=Lax.
  if (reqUrl.protocol === "http:") {
    updated = updated.replace(/;\s*Secure/gi, "");
    updated = updated.replace(/;\s*SameSite=None/gi, "; SameSite=Lax");
  }

  return updated;
}

async function handler(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const url = new URL(req.url);
  const upstreamUrl = `${API_BASE}/${path.join("/")}${url.search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const body = hasBody ? Buffer.from(await req.arrayBuffer()) : undefined;

  const upstreamRes = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body,
    redirect: "manual",
    cache: "no-store",
  });

  const resHeaders = new Headers(upstreamRes.headers);
  resHeaders.delete("content-encoding");
  resHeaders.delete("content-length");

  const nextRes = new NextResponse(upstreamRes.body, {
    status: upstreamRes.status,
    headers: resHeaders,
  });

  const getSetCookie = (upstreamRes.headers as unknown as { getSetCookie?: () => string[] }).getSetCookie;
  const setCookies = typeof getSetCookie === "function" ? getSetCookie.call(upstreamRes.headers) : [];
  for (const cookie of setCookies) {
    nextRes.headers.append("set-cookie", rewriteSetCookieForRequest(cookie, url));
  }

  return nextRes;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
