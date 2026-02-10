import { VStack } from "@chakra-ui/react";
import Container from "../ui/signin/Container";
import NetworkHeader from "../ui/signin/NetworkHeader";
import SignInForm from "../ui/signin/SignInForm";
import SignInHeader from "../ui/signin/SignInHeader";

const SigninPage = () => {
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
        <SignInHeader />
        <SignInForm />
      </VStack>
    </Container>
  );
};

export default SigninPage;
