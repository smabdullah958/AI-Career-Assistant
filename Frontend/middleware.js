import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SecretKey);

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    // console.log("this is paylod : ", payload);
    return payload;
  } catch (error) {
    console.log("error in verify token : ", error);
    return null;
  }
}

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // No token → send user to login
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const payload = await verifyToken(token);

  // Invalid / expired token
  if (!payload) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check admin role
  if (payload.Role !== "Admin" && payload.Role !== "SuperAdmin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/AdminDashboard/:path*", "/Notification/:path*"],
};
