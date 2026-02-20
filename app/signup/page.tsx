"use client";
import { Flex, VStack } from "@chakra-ui/react";
import NetworkHeader from "../ui/signin/NetworkHeader";
import SignUpForm from "../ui/signup/SignUpForm";
import SignUpHeader from "../ui/signup/SignUpHeader";
import SignupSidePanel from "../ui/signup/SignUpSidePanel";
import BackToHome from "../ui/component/BackToHome";

const SignupPage = () => {
  return (
    <Flex minH="100vh" w="full" bg="#0B0D14" align="center" justify="center" p={4}>
      
      <VStack w="full" maxW="1000px" align="flex-start" gap={6}>
        
       
        <BackToHome />

        {/* The Main Split Card */}
        <Flex
          w="full"
          h={{ base: "auto", lg: "750px" }} 
          bg="#0B0D14" 
          rounded="2xl"
          overflow="hidden"
          boxShadow="0 25px 50px -12px rgba(0,0,0,0.5)"
          border="1px solid"
          borderColor="whiteAlpha.100" 
          direction={{ base: "column", lg: "row" }}
        >
          
          {/* LEFT SIDE: Your Form */}
          <Flex flex={1} align="center" justify="center" p={{ base: 6, md: 10 }}>
            <VStack w="full" maxW="400px" gap="24px" marginX="auto">
              <NetworkHeader />
              <SignUpHeader />
              <SignUpForm />
            </VStack>
          </Flex>

          {/* RIGHT SIDE: The Branded Background Panel */}
          <SignupSidePanel/>

        </Flex>
      </VStack>

    </Flex>
  );
};

export default SignupPage;