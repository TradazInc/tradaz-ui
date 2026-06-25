"use client";

import { Text, TextProps } from "@chakra-ui/react";
import Link from "next/link";

interface LogoProps extends TextProps {
  href?: string;
}

export const Logo = ({ href = "/", ...props }: LogoProps) => {
  const logoText = (
    <Text
      fontSize="xl"
      fontWeight="extrabold"
      color="white"
      letterSpacing="tight"
      userSelect="none"
      {...props}
    >
      Tradaz
      <Text as="span" color="#888888">
        .
      </Text>
    </Text>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        {logoText}
      </Link>
    );
  }

  return logoText;
};
