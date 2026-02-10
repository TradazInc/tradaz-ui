import { Text, VStack } from "@chakra-ui/react";

const SignInHeader = () => {
  return (
    <VStack w="full" textAlign="center">
      <Text
        fontWeight={"700"}
        fontSize={"40px"}
        lineHeight="47.42px"
        letterSpacing="-2%"
      >
        Sign In
      </Text>
      <Text fontWeight={"400"} fontSize="14px" color="#8E9BAE">
        Enter your credentials to access your account.
      </Text>
    </VStack>
  );
};

export default SignInHeader;
