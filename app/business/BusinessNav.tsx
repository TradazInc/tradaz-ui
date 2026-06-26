"use client";

import React, { useState } from "react";
import { Breadcrumb, HStack, Icon } from "@chakra-ui/react";
import { LuBuilding2, LuStore, LuChevronDown } from "react-icons/lu";

import NavContainer from "../components/NavContainer";
import { LogoContainer } from "../components/LogoContainer";

import { OnboardingModal } from "@/app/business/onboarding/OnboardingModal";
import { AddStoreModal } from "@/app/business/onboarding/AddStoreModal";

export const BusinessNav = () => {
  const [isBusinessDrawerOpen, setIsBusinessDrawerOpen] = useState(false);
  const [isStoreDrawerOpen, setIsStoreDrawerOpen] = useState(false);

  const currentBusiness = "Tradaz Fashion";
  const currentStore = "Lagos HQ";

  return (
    <>
      <NavContainer>
        <HStack gap={{ base: 4, md: 6 }}>
          <LogoContainer>Tradaz</LogoContainer>

          <Breadcrumb.Root>
            <Breadcrumb.List gap="4">
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  as="button"
                  onClick={() => setIsBusinessDrawerOpen(true)}
                  color="gray.400"
                  _hover={{ color: "white", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  <HStack gap="2">
                    <Icon as={LuBuilding2} boxSize="16px" />
                    {currentBusiness}
                    <Icon as={LuChevronDown} boxSize="14px" />
                  </HStack>
                </Breadcrumb.Link>
              </Breadcrumb.Item>

              <Breadcrumb.Separator color="gray.600" />

              <Breadcrumb.Item>
                <Breadcrumb.Link
                  as="button"
                  onClick={() => setIsStoreDrawerOpen(true)}
                  color="gray.400"
                  _hover={{ color: "white", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  <HStack gap="2">
                    <Icon as={LuStore} boxSize="16px" />
                    {currentStore}
                    <Icon as={LuChevronDown} boxSize="14px" />
                  </HStack>
                </Breadcrumb.Link>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </HStack>
      </NavContainer>

      <OnboardingModal
        isOpen={isBusinessDrawerOpen}
        onClose={() => setIsBusinessDrawerOpen(false)}
      />
      <AddStoreModal
        isOpen={isStoreDrawerOpen}
        onClose={() => setIsStoreDrawerOpen(false)}
      />
    </>
  );
};
