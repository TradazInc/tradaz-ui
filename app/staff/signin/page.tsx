import SignInForm from "@/components/shared/SignInForm";
import TradazLogo from "@/components/shared/TradazLogo";
import { Center, Heading, VStack } from "@chakra-ui/react";

const StaffSigninPage = () => {
  return (
    <Center h={"dvh"} w={"full"}>
      <VStack gap={8} w={"lg"}>
        <TradazLogo />
        <Heading size={"lg"}>Staff Sign In</Heading>
        <SignInForm redirectTo={"/staff"} />
      </VStack>
    </Center>
  );
};

export default StaffSigninPage;
