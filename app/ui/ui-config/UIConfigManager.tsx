"use client";
import React, { useState } from "react";
// ✅ FIX 1: Removed unused IconButton
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, SimpleGrid } from "@chakra-ui/react";
// ✅ FIX 2: Swapped LuLayout to LuLayoutTemplate to match the latest Lucide updates
import { 
    LuPalette, LuType, LuImage, LuMousePointerClick, 
    LuCloudUpload, LuCheck, LuClock, LuLayoutTemplate, LuShoppingBag
} from "react-icons/lu";

export const UIConfigManager = () => {
    // --- TENANT UI CONFIG STATE ---
    const [storeName, setStoreName] = useState("My Awesome Store");
    const [brandColor, setBrandColor] = useState("#5cac7d");
    const [fontFamily, setFontFamily] = useState("Inter, sans-serif");
    const [buttonRadius, setButtonRadius] = useState("8px"); // 0px, 8px, 9999px
    const [heroLayout, setHeroLayout] = useState("center"); // center, left
    
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
        backgroundColor: "#121214", color: "white", height: "40px", padding: "0 12px",
        borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.16)", cursor: "pointer", outline: "none", fontSize: "14px", width: "100%"
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- STICKY HEADER --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} borderBottom="1px solid" borderColor="whiteAlpha.100"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuPalette} /> Storefront Appearance
                        </Text>
                        <Text color="gray.400" fontSize="sm">Customize your colors, fonts, and layout to match your brand identity.</Text>
                    </Box>
                    
                    <HStack gap={3}>
                        <VStack align="flex-end" gap={0} display={{ base: "none", sm: "flex" }} mr={2}>
                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Last Published</Text>
                            <Flex align="center" gap={1} color={lastPublished === "Never" ? "orange.400" : "gray.300"}>
                                <Icon as={lastPublished === "Never" ? LuClock : LuCheck} boxSize="12px" />
                                <Text fontSize="sm" fontWeight="bold">{lastPublished}</Text>
                            </Flex>
                        </VStack>
                        <Button 
                            bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="44px" px={6} 
                            onClick={handlePublish} loading={isPublishing} loadingText="Publishing..."
                        >
                            <Icon as={LuCloudUpload} mr={2} /> Publish Live
                        </Button>
                    </HStack>
                </Flex>
            </Box>

            {/* --- MAIN WORKSPACE (Split Pane) --- */}
            <SimpleGrid columns={{ base: 1, xl: 12 }} gap={8} alignItems="start">
                
                {/* LEFT PANE: CONTROLS */}
                <Box gridColumn={{ base: "span 1", xl: "span 4" }} display="flex" flexDirection="column" gap={6}>
                    
                    {/* Brand Identity */}
                    <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex align="center" gap={2} mb={4} color="white">
                            <Icon as={LuImage} color="#5cac7d" />
                            <Text fontWeight="bold">Brand Identity</Text>
                        </Flex>
                        <VStack align="stretch" gap={4}>
                            <Box>
                                <Text color="gray.400" fontSize="xs" fontWeight="bold" mb={1} textTransform="uppercase">Store Name</Text>
                                <Input 
                                    value={storeName} onChange={(e) => setStoreName(e.target.value)}
                                    bg="#121214" border="1px solid" borderColor="whiteAlpha.200" color="white" _focus={{ borderColor: "#5cac7d" }}
                                />
                            </Box>
                            <Box>
                                <Text color="gray.400" fontSize="xs" fontWeight="bold" mb={1} textTransform="uppercase">Primary Color</Text>
                                <Flex gap={2}>
                                    <Input 
                                        type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)}
                                        w="50px" h="40px" p={1} bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="md" cursor="pointer"
                                    />
                                    <Input 
                                        value={brandColor} onChange={(e) => setBrandColor(e.target.value)}
                                        bg="#121214" border="1px solid" borderColor="whiteAlpha.200" color="white" _focus={{ borderColor: "#5cac7d" }}
                                        fontFamily="monospace" textTransform="uppercase"
                                    />
                                </Flex>
                            </Box>
                        </VStack>
                    </Box>

                    {/* Typography & Layout */}
                    <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex align="center" gap={2} mb={4} color="white">
                            <Icon as={LuType} color="#5cac7d" />
                            <Text fontWeight="bold">Typography & Layout</Text>
                        </Flex>
                        <VStack align="stretch" gap={4}>
                            <Box>
                                <Text color="gray.400" fontSize="xs" fontWeight="bold" mb={1} textTransform="uppercase">Heading Font</Text>
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
                                <Text color="gray.400" fontSize="xs" fontWeight="bold" mb={1} textTransform="uppercase">Hero Alignment</Text>
                                <HStack gap={2}>
                                    <Button flex={1} variant={heroLayout === "left" ? "solid" : "outline"} bg={heroLayout === "left" ? "whiteAlpha.200" : "transparent"} color="white" borderColor="whiteAlpha.200" onClick={() => setHeroLayout("left")}>Left</Button>
                                    <Button flex={1} variant={heroLayout === "center" ? "solid" : "outline"} bg={heroLayout === "center" ? "whiteAlpha.200" : "transparent"} color="white" borderColor="whiteAlpha.200" onClick={() => setHeroLayout("center")}>Center</Button>
                                </HStack>
                            </Box>
                        </VStack>
                    </Box>

                    {/* UI Elements */}
                    <Box bg="#1A1C23" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex align="center" gap={2} mb={4} color="white">
                            <Icon as={LuMousePointerClick} color="#5cac7d" />
                            <Text fontWeight="bold">Buttons & Cards</Text>
                        </Flex>
                        <VStack align="stretch" gap={4}>
                            <Box>
                                <Text color="gray.400" fontSize="xs" fontWeight="bold" mb={1} textTransform="uppercase">Button Roundness</Text>
                                <HStack gap={2}>
                                    <Button flex={1} rounded="0px" variant={buttonRadius === "0px" ? "solid" : "outline"} bg={buttonRadius === "0px" ? "whiteAlpha.200" : "transparent"} color="white" borderColor="whiteAlpha.200" onClick={() => setButtonRadius("0px")}>Square</Button>
                                    <Button flex={1} rounded="8px" variant={buttonRadius === "8px" ? "solid" : "outline"} bg={buttonRadius === "8px" ? "whiteAlpha.200" : "transparent"} color="white" borderColor="whiteAlpha.200" onClick={() => setButtonRadius("8px")}>Rounded</Button>
                                    <Button flex={1} rounded="9999px" variant={buttonRadius === "9999px" ? "solid" : "outline"} bg={buttonRadius === "9999px" ? "whiteAlpha.200" : "transparent"} color="white" borderColor="whiteAlpha.200" onClick={() => setButtonRadius("9999px")}>Pill</Button>
                                </HStack>
                            </Box>
                        </VStack>
                    </Box>

                </Box>

                {/* RIGHT PANE: LIVE PREVIEW */}
                <Box gridColumn={{ base: "span 1", xl: "span 8" }} position={{ xl: "sticky" }} top="100px">
                    <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" mb={3} display="flex" alignItems="center" gap={2}>
                        {/* ✅ FIX 2: Updated Icon here */}
                        <Icon as={LuLayoutTemplate} /> Live Storefront Preview
                    </Text>

                    {/* Mini Browser Window */}
                    <Box bg="#f8f9fa" rounded="xl" border="1px solid" borderColor="whiteAlpha.200" overflow="hidden" boxShadow="2xl">
                        {/* Browser Header */}
                        <Flex bg="#e9ecef" px={4} py={2} align="center" gap={2} borderBottom="1px solid #dee2e6">
                            <Box boxSize="10px" rounded="full" bg="red.400" />
                            <Box boxSize="10px" rounded="full" bg="orange.400" />
                            <Box boxSize="10px" rounded="full" bg="green.400" />
                            <Flex flex={1} justify="center">
                                <Box bg="white" px={8} py={0.5} rounded="md" fontSize="10px" color="gray.500" shadow="sm">
                                    https://{storeName.toLowerCase().replace(/\s+/g, '')}.tradaz.com
                                </Box>
                            </Flex>
                        </Flex>

                        {/* ========================================= */}
                        {/* ACTUAL MOCK STOREFRONT (Injected via State) */}
                        {/* ========================================= */}
                        <Box fontFamily={fontFamily} color="gray.800" minH="500px">
                            
                            {/* Mock Navbar */}
                            <Flex justify="space-between" align="center" px={8} py={4} borderBottom="1px solid #eaeaea">
                                <Text fontWeight="black" fontSize="xl" color={brandColor}>{storeName}</Text>
                                <HStack gap={6} display={{ base: "none", md: "flex" }}>
                                    <Text fontSize="sm" fontWeight="medium" cursor="pointer">Shop</Text>
                                    <Text fontSize="sm" fontWeight="medium" cursor="pointer">Categories</Text>
                                    <Text fontSize="sm" fontWeight="medium" cursor="pointer">About</Text>
                                    <Icon as={LuShoppingBag} boxSize="20px" />
                                </HStack>
                            </Flex>

                            {/* Mock Hero Section */}
                            <Box bg="gray.50" px={8} py={16} textAlign={heroLayout === "center" ? "center" : "left"}>
                                <Text fontSize="4xl" fontWeight="bold" mb={4} lineHeight="shorter">
                                    Upgrade your lifestyle <br />with our premium collection.
                                </Text>
                                <Text color="gray.600" fontSize="md" mb={8} maxW={heroLayout === "center" ? "600px" : "500px"} mx={heroLayout === "center" ? "auto" : "0"}>
                                    Discover the latest trends and exclusive drops. Shop now and experience quality like never before.
                                </Text>
                                <Button 
                                    bg={brandColor} color="white" px={8} h="48px" 
                                    rounded={buttonRadius} _hover={{ opacity: 0.9 }}
                                    boxShadow={`0 4px 14px ${brandColor}40`} border="none"
                                >
                                    Shop Collection
                                </Button>
                            </Box>

                            {/* Mock Product Grid */}
                            <Box px={8} py={12}>
                                <Text fontSize="xl" fontWeight="bold" mb={6}>Trending Now</Text>
                                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                                    {[1, 2, 3].map((item) => (
                                        <Box key={item} bg="white" border="1px solid #eaeaea" rounded="lg" overflow="hidden" transition="transform 0.2s" _hover={{ transform: "translateY(-4px)", shadow: "md" }}>
                                            <Box h="180px" bg="gray.100" />
                                            <Box p={4}>
                                                <Text fontWeight="bold" mb={1}>Premium Product {item}</Text>
                                                <Text color="gray.500" fontSize="sm" mb={3}>₦45,000</Text>
                                                <Button w="full" variant="outline" borderColor={brandColor} color={brandColor} rounded={buttonRadius} size="sm" _hover={{ bg: `${brandColor}10` }}>
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