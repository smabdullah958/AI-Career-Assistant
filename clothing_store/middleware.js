// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   console.log("Middleware token:", token);

//   if (!token) return NextResponse.redirect(new URL("/", req.url));

//   try {
//     const { payload } = await jwtVerify(
//       token,
//       new TextEncoder().encode(process.env.SecretKey),
//     );
//     console.log("Middleware payload:", payload);

//     if (payload.Role !== "Admin") {
//       console.log("Not admin → redirect");
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     console.log("Admin → allow access");
//     return NextResponse.next();
//   } catch (err) {
//     console.log("JWT verify error:", err);
//     return NextResponse.redirect(new URL("/", req.url));
//   }
// }

// export const config = {
//   matcher: ["/AdminDashboard/:path*"],
// };

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("Middleware token:", token);

  if (!token) return NextResponse.redirect(new URL("/", req.url));

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SecretKey),
    );
    console.log("Middleware payload:", payload);

    if (payload.Role !== "Admin") {
      console.log("Not admin → redirect");
      return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("Admin → allow access");
    return NextResponse.next();
  } catch (err) {
    console.log("JWT verify error:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/AdminDashboard/:path*"],
};
