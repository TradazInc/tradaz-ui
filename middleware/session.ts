import { sectionOf } from "@/utilities/section";
import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export function verifySession(request: NextRequest) {
  // Optimistic cookie check (Fast & non-blocking)
  const { pathname, search } = request.nextUrl;

  const section = sectionOf(pathname);
  const signin = `${section}/signin`;

  // Sign-in pages are public, otherwise they'd redirect to themselves
  if (section && pathname !== signin && !getSessionCookie(request)) {
    const url = new URL(signin, request.url);

    // save user webpage for redirect after signin
    url.searchParams.set("next", pathname + search);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
