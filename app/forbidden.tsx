"use client";

import StatusPage from "@/components/shared/StatusPage";
import { sectionOf } from "@/utilities/section";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiLockKeyDuotone } from "react-icons/pi";

export default function Forbidden() {
  // Back to the home of the section the user is in (merchant, staff, overwatch)
  const section = sectionOf(usePathname());

  return (
    <StatusPage
      icon={<PiLockKeyDuotone />}
      code="403"
      colorPalette="orange"
      title="Access denied"
      description="Your account doesn't have permission to view this page. If you think this is a mistake, contact the owner of the business."
    >
      {section && (
        <Button asChild w={{ base: "full", sm: "auto" }}>
          <Link href={section}>Back to dashboard</Link>
        </Button>
      )}
      <Button asChild variant="outline" w={{ base: "full", sm: "auto" }}>
        <Link href="/">Go home</Link>
      </Button>
    </StatusPage>
  );
}
