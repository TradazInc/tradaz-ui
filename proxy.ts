import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  // Optimistic cookie check (Fast & non-blocking)
  const sessionCookie = getSessionCookie(request);

  // if (!sessionCookie)
  //   return NextResponse.redirect(new URL("/signin", request.url));

  return NextResponse.next();
}

// Only run the proxy on protected route groups
export const config = {
  matcher: ["/overwatch/:path*", "/business/:path*", "/vendor/:path*"],
};
