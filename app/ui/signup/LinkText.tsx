import { Text } from "@chakra-ui/react";

import Link from "next/link";

interface Props {
  children: string;
  textAlign?: "right";
}

const LinkText = ({ children, textAlign }: Props) => {
  return (
    <Text
      
      color={"#1C86FF"}
      textDecoration={"underline"}
      textAlign={textAlign}
      fontWeight={"400"}
      fontSize={"16px"}
      lineHeight={"24px"}
      letterSpacing={"-0.1px"}
      textDecorationThickness={"0%"}
    >
      <Link href={"/signin"}>{children}</Link>
    </Text>
  );
};

export default LinkText;
