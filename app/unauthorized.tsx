"use client";

import StatusPage from "@/components/shared/StatusPage";
import { sectionOf } from "@/utilities/section";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiUserCircleDashedDuotone } from "react-icons/pi";

export default function Unauthorized() {
  const pathname = usePathname();

  // Each section has its own sign-in page
  const signin = new URLSearchParams({ next: pathname });
  const href = `${sectionOf(pathname) ?? ""}/signin?${signin}`;

  return (
    <StatusPage
      icon={<PiUserCircleDashedDuotone />}
      code="401"
      colorPalette="green"
      title="You're not signed in"
      description="Your session has expired or you haven't signed in yet. Sign in to continue where you left off."
    >
      <Button asChild w={{ base: "full", sm: "auto" }}>
        <Link href={href}>Go to sign in</Link>
      </Button>
      <Button asChild variant="outline" w={{ base: "full", sm: "auto" }}>
        <Link href="/">Go home</Link>
      </Button>
    </StatusPage>
  );
}
