import { Text, VStack } from "@chakra-ui/react";

const SignUpHeader = () => {
  return (
    <VStack w="full" textAlign="center">
      <Text
        fontWeight={"700"}
        fontSize={"40px"}
        lineHeight="47.42px"
        letterSpacing="-2%"
      >
        Sign Up
      </Text>
      <Text fontWeight={"400"} fontSize="14px" color="#8E9BAE">
        Enter your credentials to create your account.
      </Text>
    </VStack>
  );
};

export default SignUpHeader;
