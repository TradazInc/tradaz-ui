"use client";
import { Flex, VStack } from "@chakra-ui/react";

import SignUpForm from "../ui/signup/SignUpForm";
import SignUpHeader from "../ui/signup/SignUpHeader";
import SignupSidePanel from "../ui/signup/SignUpSidePanel";
import BackToHome from "../ui/component/BackToHome";
import TradazHeader from "../ui/TradazHeader";

const SignupPage = () => {
  return (
    <Flex minH="100vh" w="full" bg="#0B0D14" align="center" justify="center" p={4}>
      
      <VStack w="full" maxW="1000px" align="flex-start" gap={4}>
        
        <BackToHome />

        {/* The Main Split Card */}
        <Flex
          w="full"
          h={{ base: "auto", lg: "min(650px, 85vh)" }} 
          bg="#0B0D14" 
          rounded="2xl"
          overflow="hidden"
          boxShadow="0 25px 50px -12px rgba(0,0,0,0.5)"
          border="1px solid"
          borderColor="whiteAlpha.100" 
          direction={{ base: "column", lg: "row" }}
        >
          
          {/* LEFT SIDE: Your Form */}
          <Flex 
            flex={1} 
            align="center" 
            justify="center" 
            p={{ base: 6, md: 8 }} 
            overflowY="auto"
            
            css={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
          >
            <VStack w="full" maxW="400px" gap="20px" marginX="auto">
              <TradazHeader/>
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