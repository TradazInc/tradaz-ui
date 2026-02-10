import { Button } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  type?: "submit";
}

const SignInButton = ({ children, type }: Props) => {
  return (
    <Button
      type={type}
      w={"full"}
      maxH={"50px"}
      bg={"#272729"}
      borderRadius={"7px"}
      paddingY={"12.93px"}
      paddingX={"19.4px"}
      gap={"6.47px"}
      fontWeight={"700"}
      fontStyle={"bold"}
      fontSize={"16px"}
      lineHeight={"23.71px"}
      letterSpacing={"0px"}
      color={"white"}
    >
      {children}
    </Button>
  );
};

export default SignInButton;
