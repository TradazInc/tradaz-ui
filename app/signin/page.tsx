"use client";
import { Flex, VStack} from "@chakra-ui/react";

import NetworkHeader from "../ui/signin/NetworkHeader";
import SignInForm from "../ui/signin/SignInForm";
import SignInHeader from "../ui/signin/SignInHeader";
import SigninSidePanel from "../ui/signin/SigninSidePanel";
import BackToHome from "../ui/component/BackToHome";

const SigninPage = () => {
  return (
    
    <Flex minH="100vh" w="full" bg="#0B0D14" align="center" justify="center" p={4} position="relative">

     <BackToHome/>

      
      <Flex
        w="full"
        maxW="1000px" 
        h={{ base: "auto", lg: "700px" }} 
        bg="#0B0D14"
        rounded="2xl"
        overflow="hidden"
        boxShadow="0 25px 50px -12px rgba(0,0,0,0.5)"
        border="1px solid"
        borderColor="whiteAlpha.100"
        direction={{ base: "column", lg: "row" }}
      >
        
        {/* LEFT SIDE (Reversed): The Branded Background Panel */}
        <SigninSidePanel />

        {/* RIGHT SIDE: Your Sign In Form */}
        <Flex flex={1} align="center" justify="center" p={{ base: 6, md: 10 }}>
          <VStack w="full" maxW="400px" gap="24px" marginX="auto">
            <NetworkHeader />
            <SignInHeader />
            <SignInForm />
          </VStack>
        </Flex>

      </Flex>
    </Flex>
  );
};

export default SigninPage;