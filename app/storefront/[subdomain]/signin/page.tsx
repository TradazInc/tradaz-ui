import SignInForm from "@/components/shared/SignInForm";
import SignUpForm from "@/components/shared/SignUpForm";
import { Center, Heading, Tabs, VStack } from "@chakra-ui/react";
import { IoIosLogIn } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";

// Customers sign in on the storefront host (shop.root.com/signin → /storefront/shop/signin),
// so "/" is the storefront home on that same host.
const CustomerSigninPage = async ({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) => {
  const { subdomain } = await params;

  return (
    <Center minH={"dvh"} w={"full"}>
      <VStack gap={8}>
        <Heading size={"2xl"}>{subdomain}</Heading>
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
            <SignInForm redirectTo={"/"} />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignUpForm redirectTo={"/"} />
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Center>
  );
};

export default CustomerSigninPage;
