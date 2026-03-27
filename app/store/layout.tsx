"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import { CustomerSidebar } from "@/app/ui/store/navigation/CustomerSidebar";
import { MobileBottomNav } from "@/app/ui/store/navigation/MobileBottomNav";
import { Header } from "@/app/ui/store/header/Header";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const tenantConfig = { storeName: "OGDior", brandColor: "#5cac7d" };

    return (
        <Flex minH="100vh" bg="#0A0A0B">
            
            
            <Box display={{ base: "block", lg: "none" }}>
                <CustomerSidebar 
                    activePath={pathname}
                    brandColor={tenantConfig.brandColor}
                    storeName={tenantConfig.storeName}
                />
            </Box>

            <Flex direction="column" flex={1} minW={0}>
                
                <Header 
                    onOpenSidebar={() => console.log("Mobile Nav Used")} 
                    brandColor={tenantConfig.brandColor}
                    storeName={tenantConfig.storeName}
                />

                <Box 
                    flex={1} 
                    pb={{ base: "80px", lg: 0 }} 
                    transition="all 0.3s ease"
                >
                    {children}
                </Box>

            </Flex>

           
            <MobileBottomNav brandColor={tenantConfig.brandColor} />

        </Flex>
    );
}