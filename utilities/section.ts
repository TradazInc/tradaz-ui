// Root-domain sections that have their own sign-in page
export const SECTIONS = ["/overwatch", "/staff", "/merchant"] as const;

export type Section = (typeof SECTIONS)[number];

// "/staff" for "/staff" or "/staff/...", but not "/staffx"
export function sectionOf(pathname: string): Section | undefined {
  return SECTIONS.find((s) => pathname === s || pathname.startsWith(`${s}/`));
}
