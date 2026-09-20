import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.SecretKey;
const secret = secretKey ? new TextEncoder().encode(secretKey) : null;
async function verifyToken(token) {
  if (!secret) {
    console.error(
      "SecretKey is missing. Add it to your .env file and restart Next.js.",
    );
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (error) {
    console.log("Error in verify token:", error);
    return null;
  }
}
export async function proxy(request) {
  console.log("================================");
  console.log("🚀 PROXY RUNNING");
  console.log("📍 PATH:", request.nextUrl.pathname);
  console.log("🔐 SECRET EXISTS:", !!process.env.SecretKey);

  const token = request.cookies.get("token")?.value;

  console.log("🍪 TOKEN EXISTS:", !!token);
  console.log(
    "🍪 COOKIE NAMES:",
    request.cookies.getAll().map((c) => c.name),
  );

  if (!token) {
    console.log("❌ TOKEN IS MISSING");

    return NextResponse.redirect(new URL("/", request.url));
  }

  const payload = await verifyToken(token);

  if (!payload) {
    console.log("❌ INVALID TOKEN");

    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("👤 ROLE:", payload.Role);

  if (payload.Role !== "Admin" && payload.Role !== "SuperAdmin") {
    console.log("❌ NOT ADMIN");

    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("✅ ADMIN PROXY PASSED");

  return NextResponse.next();
}

// Only protect admin pages. Without this matcher, the proxy also runs on `/`.
// A visitor without a token is redirected to `/`, which otherwise creates an
// endless redirect loop because `/` would immediately be processed again.
export const config = {
  matcher: ["/AdminDashboard/:path*"],
};
