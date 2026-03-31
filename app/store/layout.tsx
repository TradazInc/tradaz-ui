"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import { MobileBottomNav } from "@/app/ui/store/navigation/MobileBottomNav";
import { Header } from "@/app/ui/store/header/Header";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
    const tenantConfig = { storeName: "OGDior", brandColor: "#5cac7d" };

    return (
        <Flex minH="100vh" bg="#0A0A0B" direction="column">
            
            {/* Header spans full width and contains the desktop dropdown menu */}
            <Header 
                onOpenSidebar={() => console.log("Mobile Nav Used")} 
                brandColor={tenantConfig.brandColor}
                storeName={tenantConfig.storeName}
            />

            {/* Main Content Area */}
            <Box 
                flex={1} 
                pb={{ base: "80px", lg: 0 }} // Prevents content from hiding behind the bottom nav on mobile
                transition="all 0.3s ease"
            >
                {children}
            </Box>

            {/* Mobile Bottom Navigation (Visible only on mobile devices) */}
            <MobileBottomNav brandColor={tenantConfig.brandColor} />

        </Flex>
    );
}