import { VStack } from "@chakra-ui/react";
import Container from "../ui/signup/Container";
import NetworkHeader from "../ui/signin/NetworkHeader";
import SignUpForm from "../ui/signup/SignUpForm";
import SignUpHeader from "../ui/signup/SignUpHeader";

const SignupPage = () => {
  return (
    <Container>
      <VStack
        flex={{ base: 1, md: 0.4 }}
        maxW={{ mdToXl: "490px" }}
        maxH={{ mdToXl: "548.8px" }}
        h={{ base: "full" }}
        gap={"16px"}
        marginX={'auto'}
      >
        <NetworkHeader />
        <SignUpHeader />
        <SignUpForm />
      </VStack>
    </Container>
  );
};

export default SignupPage;
