import { extractSubdomain } from "@/utilities/extractSubdomain";
import { sectionOf } from "@/utilities/section";
import { NextRequest, NextResponse } from "next/server";
import { protocol, rootDomain } from "../ini/configs";

export function subdomainRedirect(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    // Overwatch and merchant live on the root domain only (eg shop.root.com/merchant → root.com/merchant)
    if (sectionOf(pathname))
      return NextResponse.redirect(
        `${protocol}://${rootDomain}${pathname}${search}`,
      );

    // Omit the root slash so the storefront root becomes /storefront/{subdomain}, while nested paths are preserved.
    const path = pathname === "/" ? "" : pathname;

    return NextResponse.rewrite(
      new URL(`/storefront/${subdomain}${path}${search}`, request.url),
    );
  }
}
