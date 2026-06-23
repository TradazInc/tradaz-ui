"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid } from "@chakra-ui/react";

import { 
    LuPalette, LuType, LuImage, LuMousePointerClick, 
    LuCloudUpload, LuCheck, LuClock, LuLayoutTemplate, LuShoppingBag
} from "react-icons/lu";

export const UIConfigManager = () => {
    // --- TENANT UI CONFIG STATE ---
    const [storeName, setStoreName] = useState("My Awesome Store");
    const [brandColor, setBrandColor] = useState("#5cac7d");
    const [fontFamily, setFontFamily] = useState("Inter, sans-serif");
    const [buttonRadius, setButtonRadius] = useState("0px"); 
    const [heroLayout, setHeroLayout] = useState("center"); 
    
    const [lastPublished, setLastPublished] = useState<string>("Never");
    const [isPublishing, setIsPublishing] = useState(false);

    // --- ACTIONS ---
    const handlePublish = () => {
        setIsPublishing(true);
        setTimeout(() => {
            setIsPublishing(false);
            const now = new Date();
            setLastPublished(now.toLocaleDateString() + " at " + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
            alert("UI Configuration successfully published to your live storefront!");
        }, 1500);
    };

    const selectStyles = {
        backgroundColor: "#0A0A0A", color: "white", height: "44px", padding: "0 12px",
        borderRadius: "0px", border: "1px solid #333333", cursor: "pointer", outline: "none", fontSize: "14px", width: "100%"
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* --- STICKY HEADER --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }}
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                            <Icon as={LuPalette} color="#5cac7d" strokeWidth="2.5" /> Storefront Appearance
                        </Text>
                        <Text color="#888888" fontSize="sm">Customize your colors, fonts, and layout to match your brand identity.</Text>
                    </Box>
                    
                    <HStack gap={4}>
                        <VStack align="flex-end" gap={0} display={{ base: "none", sm: "flex" }}>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Last Published</Text>
                            <Flex align="center" gap={1.5} mt={0.5}>
                                <Icon 
                                    as={lastPublished === "Never" ? LuClock : LuCheck} 
                                    color={lastPublished === "Never" ? "orange.400" : "#5cac7d"} 
                                    boxSize="14px" strokeWidth="2.5" 
                                />
                                <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{lastPublished}</Text>
                            </Flex>
                        </VStack>
                        <Button
                            bg="white" color="black" rounded="none" border="none" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} fontWeight="bold"
                            onClick={handlePublish} loading={isPublishing} loadingText="Publishing..."
                        >
                            <Icon as={LuCloudUpload} color="#5cac7d" mr={2} strokeWidth="2.5" /> Publish Live
                        </Button>
                    </HStack>
                </Flex>
            </Box>

            {/* --- MAIN WORKSPACE --- */}
            <SimpleGrid columns={{ base: 1, xl: 12 }} gap={8} alignItems="start">
                
                {/* LEFT PANE: CONTROLS */}
                <Box gridColumn={{ base: "span 1", xl: "span 4" }} display="flex" flexDirection="column" gap={6}>
                    
                    {/* Brand Identity */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex align="center" gap={2} mb={5} color="white">
                            <Icon as={LuImage} color="#5cac7d" strokeWidth="2.5" />
                            <Text fontWeight="bold" letterSpacing="tight">Brand Identity</Text>
                        </Flex>
                        <VStack align="stretch" gap={5}>
                            <Box>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Store Name</Text>
                                <Input 
                                    value={storeName} onChange={(e) => setStoreName(e.target.value)}
                                    bg="#111111" border="1px solid" borderColor="#333333" color="white" rounded="none" h="44px" _focus={{ borderColor: "white" }}
                                />
                            </Box>
                            <Box>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Primary Color</Text>
                                <Flex gap={3}>
                                    <Input 
                                        type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)}
                                        w="50px" h="44px" p={1} bg="#111111" border="1px solid" borderColor="#333333" rounded="none" cursor="pointer"
                                    />
                                    <Input 
                                        value={brandColor} onChange={(e) => setBrandColor(e.target.value)}
                                        bg="#111111" border="1px solid" borderColor="#333333" color="white" rounded="none" h="44px" _focus={{ borderColor: "white" }}
                                        fontFamily="monospace" textTransform="uppercase" fontWeight="bold"
                                    />
                                </Flex>
                            </Box>
                        </VStack>
                    </Box>

                    {/* Typography & Layout */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex align="center" gap={2} mb={5} color="white">
                            <Icon as={LuType} color="#5cac7d" strokeWidth="2.5" />
                            <Text fontWeight="bold" letterSpacing="tight">Typography & Layout</Text>
                        </Flex>
                        <VStack align="stretch" gap={5}>
                            <Box>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Heading Font Family</Text>
                                <select 
                                    style={{ ...selectStyles, fontFamily: fontFamily }} 
                                    value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}
                                >
                                    <option value="Inter, sans-serif">Inter (Modern)</option>
                                    <option value="Georgia, serif">Georgia (Classic Serif)</option>
                                    <option value="'Courier New', monospace">Courier (Monospace)</option>
                                    <option value="'Trebuchet MS', serif">Trebuchet (Elegant)</option>
                                </select>
                            </Box>
                            <Box>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Hero Text Alignment</Text>
                                <HStack gap={2}>
                                    <Button flex={1} rounded="none" variant="outline" h="40px" fontSize="sm" bg={heroLayout === "left" ? "#1A1A1A" : "transparent"} color="white" borderColor={heroLayout === "left" ? "white" : "#333333"} onClick={() => setHeroLayout("left")}>Left</Button>
                                    <Button flex={1} rounded="none" variant="outline" h="40px" fontSize="sm" bg={heroLayout === "center" ? "#1A1A1A" : "transparent"} color="white" borderColor={heroLayout === "center" ? "white" : "#333333"} onClick={() => setHeroLayout("center")}>Center</Button>
                                </HStack>
                            </Box>
                        </VStack>
                    </Box>

                    {/* UI Elements */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex align="center" gap={2} mb={5} color="white">
                            <Icon as={LuMousePointerClick} color="#5cac7d" strokeWidth="2.5" />
                            <Text fontWeight="bold" letterSpacing="tight">Buttons & Cards</Text>
                        </Flex>
                        <VStack align="stretch" gap={4}>
                            <Box>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Global Corner Radius</Text>
                                <HStack gap={2}>
                                    <Button flex={1} rounded="none" h="40px" fontSize="xs" fontWeight="bold" variant="outline" bg={buttonRadius === "0px" ? "#1A1A1A" : "transparent"} color="white" borderColor={buttonRadius === "0px" ? "white" : "#333333"} onClick={() => setButtonRadius("0px")}>SQUARE</Button>
                                    <Button flex={1} rounded="none" h="40px" fontSize="xs" fontWeight="bold" variant="outline" bg={buttonRadius === "8px" ? "#1A1A1A" : "transparent"} color="white" borderColor={buttonRadius === "8px" ? "white" : "#333333"} onClick={() => setButtonRadius("8px")}>SOFT</Button>
                                    <Button flex={1} rounded="none" h="40px" fontSize="xs" fontWeight="bold" variant="outline" bg={buttonRadius === "9999px" ? "#1A1A1A" : "transparent"} color="white" borderColor={buttonRadius === "9999px" ? "white" : "#333333"} onClick={() => setButtonRadius("9999px")}>PILL</Button>
                                </HStack>
                            </Box>
                        </VStack>
                    </Box>

                </Box>

                {/* RIGHT PANE: LIVE PREVIEW */}
                <Box gridColumn={{ base: "span 1", xl: "span 8" }} position={{ xl: "sticky" }} top="100px">
                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={4} display="flex" alignItems="center" gap={2}>
                        <Icon as={LuLayoutTemplate} color="white" strokeWidth="2.5" /> Live Storefront Preview
                    </Text>

                    {/* Mini Browser Window */}
                    <Box bg="#FFFFFF" rounded="none" border="2px solid" borderColor="#1A1A1A" overflow="hidden">
                        {/* Browser Header */}
                        <Flex bg="#0A0A0A" px={4} py={3} align="center" gap={3} borderBottom="1px solid #1A1A1A">
                            <HStack gap={1.5}>
                                <Box boxSize="8px" rounded="none" bg="#333333" />
                                <Box boxSize="8px" rounded="none" bg="#333333" />
                                <Box boxSize="8px" rounded="none" bg="#333333" />
                            </HStack>
                            <Flex flex={1} justify="center">
                                <Box bg="#111111" border="1px solid #333333" px={6} py={1} rounded="none" fontSize="11px" color="#888888" fontWeight="bold">
                                    https://{storeName.toLowerCase().replace(/\s+/g, '')}.tradaz.com
                                </Box>
                            </Flex>
                        </Flex>

                        {/* ACTUAL MOCK STOREFRONT */}
                        <Box fontFamily={fontFamily} color="#1A1A1A" minH="500px">
                            {/* Mock Navbar */}
                            <Flex justify="space-between" align="center" px={8} py={5} borderBottom="1px solid #EAEAEA">
                                <Text fontWeight="black" fontSize="2xl" letterSpacing="tighter" color={brandColor}>{storeName}</Text>
                                <HStack gap={8} display={{ base: "none", md: "flex" }}>
                                    <Text fontSize="xs" fontWeight="black" textTransform="uppercase" letterSpacing="widest" cursor="pointer">Shop</Text>
                                    <Text fontSize="xs" fontWeight="black" textTransform="uppercase" letterSpacing="widest" cursor="pointer">Categories</Text>
                                    <Icon as={LuShoppingBag} boxSize="20px" strokeWidth="2.5" />
                                </HStack>
                            </Flex>

                            {/* Mock Hero Section */}
                            <Box bg="#F9F9F9" px={8} py={20} textAlign={heroLayout === "center" ? "center" : "left"}>
                                <Text fontSize="4xl" fontWeight="black" mb={5} lineHeight="1" letterSpacing="tighter">
                                    UPGRADE YOUR LIFESTYLE <br />WITH OUR PREMIUM COLLECTION.
                                </Text>
                                <Text color="#555555" fontSize="md" mb={10} maxW={heroLayout === "center" ? "600px" : "500px"} mx={heroLayout === "center" ? "auto" : "0"} fontWeight="medium" lineHeight="tall">
                                    Discover the latest trends and exclusive drops. Shop now and experience quality like never before.
                                </Text>
                                <Button 
                                    bg={brandColor} color="white" px={10} h="54px" fontSize="xs" fontWeight="black" textTransform="uppercase" letterSpacing="widest"
                                    rounded={buttonRadius} _hover={{ opacity: 0.9 }} border="none"
                                >
                                    Shop Collection
                                </Button>
                            </Box>

                            {/* Mock Product Grid */}
                            <Box px={8} py={16}>
                                <Text fontSize="xs" fontWeight="black" textTransform="uppercase" letterSpacing="widest" mb={8}>Trending Now</Text>
                                <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
                                    {[1, 2, 3].map((item) => (
                                        <Box key={item} bg="white" border="1px solid #EAEAEA" rounded="none" overflow="hidden" transition="transform 0.2s" _hover={{ transform: "translateY(-4px)" }}>
                                            <Box h="200px" bg="#F1F1F1" />
                                            <Box p={5}>
                                                <Text fontWeight="black" fontSize="sm" mb={1} letterSpacing="tight">PREMIUM PRODUCT {item}</Text>
                                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={4}>₦45,000</Text>
                                                <Button w="full" variant="outline" borderColor={brandColor} color={brandColor} rounded={buttonRadius} size="sm" fontSize="10px" fontWeight="black" textTransform="uppercase" letterSpacing="wider">
                                                    Add to Cart
                                                </Button>
                                            </Box>
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};