import SignInForm from "@/components/shared/SignInForm";
import SignUpForm from "@/components/shared/SignUpForm";
import TradazLogo from "@/components/shared/TradazLogo";
import { Center, Tabs, VStack } from "@chakra-ui/react";
import { IoIosLogIn } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";

const BusinessSigninPage = () => {
  return (
    <Center h={"dvh"} w={"full"}>
      <VStack gap={8}>
        <TradazLogo />
        <Tabs.Root
          w={"lg"}
          fitted
          defaultValue={"signin"}
          variant={"plain"}
          css={{
            "--tabs-indicator-bg": "colors.gray.subtle",
            "--tabs-indicator-shadow": "shadows.xs",
            "--tabs-trigger-radius": "radii.full",
          }}
        >
          <Tabs.List>
            <Tabs.Trigger value="signin">
              <IoIosLogIn />
              Sign In
            </Tabs.Trigger>
            <Tabs.Trigger value="signup">
              <IoCreateOutline />
              Sign Up
            </Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>

          <Tabs.Content value="signin">
            <SignInForm redirectTo={"/merchant"} />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignUpForm redirectTo={"/merchant?signup=true"} />
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Center>
  );
};

export default BusinessSigninPage;
