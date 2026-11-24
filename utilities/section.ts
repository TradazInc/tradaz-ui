// Root-domain sections that have their own sign-in page
export const SECTIONS = ["/overwatch", "/merchant"] as const;

export type Section = (typeof SECTIONS)[number];

// "/merchant" for "/merchant" or "/merchant/...", but not "/merchantx"
export function sectionOf(pathname: string): Section | undefined {
  return SECTIONS.find((s) => pathname === s || pathname.startsWith(`${s}/`));
}
