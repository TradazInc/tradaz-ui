"use client";
import { useState, useEffect } from "react";
import { Box, Container, VStack, Flex, Text, Progress } from "@chakra-ui/react";
import { BusinessInfoForm } from "../ui/onboarding/business-info-form";
import { CategorySelection } from "../ui/onboarding/category-selection"; // Import new component
import { BrandingForm } from "../ui/onboarding/branding-form";

const STORAGE_KEY = "tradaz_onboarding_data";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // Added 'category' to the state
  const [formData, setFormData] = useState({
    businessName: "",
    subDomain: "",
    about: "",
    address: "",
    phone: "",
    category: "",
    primaryColor: "#5cac7d",
    secondaryColor: "#2d3748",
    tertiaryColor: "#e2e8f0",
    logo: null,
  });

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData, isMounted]);

  const updateData = (newData: any) =>
    setFormData((prev) => ({ ...prev, ...newData }));

  // Simple Progress Calculation: 1->33%, 2->66%, 3->100%
  const progressValue = (step / 3) * 100;

  if (!isMounted) return null;

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" py={10}>
      <Container maxW="md">
        <VStack gap={6} w="full">
          {/* Header Text Changes Dynamicallly */}
          <VStack gap={1} align="center">
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              color="gray.500"
              textTransform="uppercase"
            >
              Account Setup
            </Text>
            <Text fontSize="lg" fontWeight="medium" color="#5cac7d">
              {step === 1 && "Tell us about your business"}
              {step === 2 && "Choose your industry"}
              {step === 3 && "Customize your store"}
            </Text>
          </VStack>

          <Box
            w="full"
            bg="white"
            p={8}
            borderRadius="2xl"
            shadow="lg"
            border="1px solid"
            borderColor="gray.100"
          >
            {/* Progress Bar */}
            <Box w="full" mb={8}>
              <Progress.Root
                value={progressValue}
                size="xs"
                colorPalette="green"
              >
                <Progress.Track bg="gray.100">
                  <Progress.Range bg="#5cac7d" />
                </Progress.Track>
              </Progress.Root>
              <Text fontSize="xs" color="gray.400" mt={2} textAlign="right">
                Step {step} of 3
              </Text>
            </Box>

            {/* Step Switcher */}
            {step === 1 && (
              <BusinessInfoForm
                data={formData}
                update={updateData}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <CategorySelection
                data={formData}
                update={updateData}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <BrandingForm
                data={formData}
                update={updateData}
                onBack={() => setStep(2)}
              />
            )}
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
}
