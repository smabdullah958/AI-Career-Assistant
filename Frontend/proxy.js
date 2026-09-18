import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SecretKey);

async function verifyToken(token) {
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
