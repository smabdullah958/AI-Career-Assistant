// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const secret = new TextEncoder().encode(process.env.SecretKey);

// async function verifyToken(token) {
//   try {
//     const { payload } = await jwtVerify(token, secret);
//     // console.log("this is paylod : ", payload);
//     return payload;
//   } catch (error) {
//     console.log("error in verify token : ", error);
//     return null;
//   }
// }

// export async function proxy(request) {
//   const token = request.cookies.get("token")?.value;

//   // No token → send user to login
//   if (!token) {
//     console.log("token is required");
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   const payload = await verifyToken(token);

//   // Invalid / expired token
//   if (!payload) {
//     console.log("❌ Invalid token");

//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Check admin role
//   if (payload.Role !== "Admin" && payload.Role !== "SuperAdmin") {
//     console.log("role is not admin or a super admin");
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   console.log("✅ Admin middleware passed");

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/AdminDashboard/:path*"],
// };

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
  const token = request.cookies.get("token")?.value;

  // No token → send user to login
  if (!token) {
    console.log("Token is required");

    return NextResponse.redirect(new URL("/", request.url));
  }

  const payload = await verifyToken(token);

  // Invalid / expired token
  if (!payload) {
    console.log("❌ Invalid token");

    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check admin role
  if (payload.Role !== "Admin" && payload.Role !== "SuperAdmin") {
    console.log("Role is not Admin or SuperAdmin");

    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("✅ Admin proxy passed");

  return NextResponse.next();
}

export const config = {
  matcher: ["/AdminDashboard/:path*"],
};
