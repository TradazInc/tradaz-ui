"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Button, VStack, SimpleGrid, Input, IconButton, Image as ChakraImage, Badge } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuImage, LuPlus, LuLink, LuPower, LuPowerOff, LuSquare, LuTrash2, LuImagePlus, LuX, LuArrowRight
} from "react-icons/lu";


interface PromoBanner {
    id: string;
    name: string; 
    position: "Top Announcement Bar" | "Hero Slider" | "Checkout Warning";
    message: string; 
    ctaText: string;
    ctaLink: string;
    bgColor: string;
    textColor: string;
    image?: string; 
    status: "Active" | "Draft";
}

// --- REUSABLE STYLES ---
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const colorPickerStyle: React.CSSProperties = { width: "100%", height: "44px", padding: "2px", backgroundColor: "#000000", border: "1px solid #333333", cursor: "pointer" };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };
const brandColor = "#5cac7d";

// --- CREATE / EDIT HERO SLIDE MODAL ---
interface CreateHeroModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (banner: PromoBanner) => void;
    editData?: PromoBanner | null; 
}

const CreateHeroModal = ({ isOpen, onClose, onSave, editData }: CreateHeroModalProps) => {
    const defaultData = {
        name: "", message: "", ctaText: "", ctaLink: "/", bgColor: "#111111", textColor: "#ffffff", image: "" 
    };

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(editData ? { ...editData, image: editData.image || "" } : defaultData);
    
    // Track previous props to update state safely during render
    const [prevEditData, setPrevEditData] = useState(editData);
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

    if (editData !== prevEditData || isOpen !== prevIsOpen) {
        setPrevEditData(editData);
        setPrevIsOpen(isOpen);
        
        if (editData) {
            setFormData({
                name: editData.name,
                message: editData.message,
                ctaText: editData.ctaText,
                ctaLink: editData.ctaLink,
                bgColor: editData.bgColor,
                textColor: editData.textColor,
                image: editData.image || ""
            });
        } else {
            setFormData(defaultData);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newBanner: PromoBanner = {
               
                id: editData ? editData.id : `HERO-${Math.floor(Math.random() * 90000) + 10000}`,
                name: formData.name,
                position: "Hero Slider", 
                message: formData.message,
                ctaText: formData.ctaText,
                ctaLink: formData.ctaLink,
                bgColor: formData.bgColor,
                textColor: formData.textColor,
                image: formData.image,
                status: editData ? editData.status : "Draft" 
            };
            onSave(newBanner);
            setIsLoading(false);
            onClose();
        }, 600);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />

                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "450px", md: "500px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>
                                            Visual Builder
                                        </Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">
                                            {editData ? "Edit Hero Slide" : "Create Hero Slide"}
                                        </Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        
                                        {/* --- HERO PREVIEW --- */}
                                        <Box position="relative" w="full" h="220px" rounded="xl" overflow="hidden" shadow="xl" border="1px solid #333">
                                            {formData.image ? (
                                                <>
                                                    <Box position="absolute" inset={0} bgGradient="linear(to-t, #0A0A0B 0%, transparent 80%)" zIndex={1} />
                                                    <ChakraImage src={formData.image} w="full" h="full" objectFit="cover" />
                                                </>
                                            ) : (
                                                <Box position="absolute" inset={0} bg={formData.bgColor} zIndex={0} />
                                            )}
                                            
                                            <Flex position="absolute" bottom={0} left={0} zIndex={2} p={4} direction="column" align="flex-start" w="90%">
                                                <Badge bg={brandColor} color="white" px={2} py={0.5} rounded="full" mb={2} fontSize="8px" fontWeight="bold" textTransform="uppercase">
                                                    Preview
                                                </Badge>
                                                <Text fontSize="2xl" fontWeight="black" color={formData.textColor} lineHeight="1.1" mb={1} lineClamp={1}>
                                                    {formData.name || "Headline Goes Here"}
                                                </Text>
                                                <Text fontSize="xs" color={formData.textColor} opacity={0.9} mb={3} lineClamp={2}>
                                                    {formData.message || "This is where your subheadline will appear."}
                                                </Text>
                                                {formData.ctaText && (
                                                    <Button size="xs" display="flex" alignItems="center" gap={2} bg={brandColor} color="white" px={4} rounded="full" fontWeight="bold">
                                                        <Text>{formData.ctaText}</Text>
                                                        <Icon as={LuArrowRight} boxSize="10px" />
                                                    </Button>
                                                )}
                                            </Flex>
                                        </Box>

                                        {/* --- FORM FIELDS --- */}
                                        <Box>
                                            <Text as="label" {...labelStyles}>Background Image URL</Text>
                                            <Input name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" {...inputStyles} />
                                            <Text fontSize="10px" color="gray.500" mt={1}>Leave blank to use a solid color background.</Text>
                                        </Box>

                                        <Box>
                                            <Text as="label" {...labelStyles}>Headline Text <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Summer Collection 2026" {...inputStyles} />
                                        </Box>

                                        <Box>
                                            <Text as="label" {...labelStyles}>Subheadline Text <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="message" value={formData.message} onChange={handleChange} placeholder="e.g. Discover the latest trends in streetwear." {...inputStyles} />
                                        </Box>

                                        <SimpleGrid columns={2} gap={4}>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Button Text</Text>
                                                <Input name="ctaText" value={formData.ctaText} onChange={handleChange} placeholder="e.g. Shop Now" {...inputStyles} />
                                            </Box>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Button Link</Text>
                                                <Input name="ctaLink" value={formData.ctaLink} onChange={handleChange} placeholder="e.g. /shop" {...inputStyles} />
                                            </Box>
                                        </SimpleGrid>

                                        <SimpleGrid columns={2} gap={4} pt={4} borderTop="1px dashed" borderColor="#1A1A1A">
                                            <Box>
                                                <Text as="label" {...labelStyles}>Fallback Bg Color</Text>
                                                <input type="color" name="bgColor" value={formData.bgColor} onChange={handleChange} style={colorPickerStyle} />
                                            </Box>
                                            <Box>
                                                <Text as="label" {...labelStyles}>Text Color</Text>
                                                <input type="color" name="textColor" value={formData.textColor} onChange={handleChange} style={colorPickerStyle} />
                                            </Box>
                                        </SimpleGrid>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} 
                                        disabled={!formData.name || !formData.message}
                                        _hover={{ bg: "#E5E5E5" }} 
                                        _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "#333333", color: "#888888" }} 
                                        transition="all 0.2s ease"
                                    >
                                        {isLoading ? "Saving..." : (editData ? "Update Slide" : "Publish Slide")}
                                    </Button>
                                </Flex>

                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};


// --- MAIN HERO MANAGER ---
export const HeroManager = () => {

    const [allBanners, setAllBanners] = useState<PromoBanner[]>(() => {
        if (typeof window !== "undefined") {
            try {
                const savedBanners = localStorage.getItem('tradaz_banners');
                if (savedBanners) return JSON.parse(savedBanners);
            } catch (error) {
                console.error("Failed to load banners:", error);
            }
        }
        return []; 
    });

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null); 

    const heroSlides = allBanners.filter(b => b.position === "Hero Slider");

    // --- ACTIONS (Update the master list and save) ---
    const toggleStatus = (id: string, currentStatus: string) => {
        const updated = allBanners.map((banner): PromoBanner => 
            banner.id === id ? { ...banner, status: currentStatus === "Active" ? "Draft" : "Active" } as PromoBanner : banner
        );
        setAllBanners(updated);
        localStorage.setItem('tradaz_banners', JSON.stringify(updated));
    };

    const deleteBanner = (id: string) => {
        const updated = allBanners.filter(b => b.id !== id);
        setAllBanners(updated);
        localStorage.setItem('tradaz_banners', JSON.stringify(updated));
    };

    const handleSaveBanner = (savedBanner: PromoBanner) => {
        let updated;
        if (editingBanner) {
            // Update existing banner
            updated = allBanners.map(b => b.id === savedBanner.id ? savedBanner : b);
        } else {
            // Add new banner
            updated = [savedBanner, ...allBanners];
        }
        setAllBanners(updated);
        localStorage.setItem('tradaz_banners', JSON.stringify(updated));
        setEditingBanner(null);
    };

    const openEditModal = (banner: PromoBanner) => {
        setEditingBanner(banner);
        setIsCreateModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        setEditingBanner(null);
    };

    // --- STATS ---
    const activeCount = heroSlides.filter(b => b.status === "Active").length;

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* --- Sticky Header --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }}
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                            <Icon as={LuImagePlus} color={brandColor} strokeWidth="2.5" /> Hero Slider Manager
                        </Text>
                        <Text color="#888888" fontSize="sm">Manage your storefronts main carousel images and messaging.</Text>
                    </Box>
                    
                    <Button onClick={() => { setEditingBanner(null); setIsCreateModalOpen(true); }} bg="white" color="black" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} rounded="none" fontWeight="bold" border="none">
                        <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Add Slide
                    </Button>        
                </Flex>
            </Box>

            {/* --- STATS --- */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color={brandColor} fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Active Slides</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{activeCount} / 5</Text>
                </Box>
                <Box bg="#0A0A0A" p={5} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Carousel Status</Text>
                    <Flex align="center" gap={2}>
                        <Box boxSize="8px" rounded="full" bg={activeCount > 0 ? "blue.400" : "gray.500"} />
                        <Text color="white" fontSize="2xl" fontWeight="black" letterSpacing="tight">{activeCount > 0 ? "Live on Storefront" : "Showing Defaults"}</Text>
                    </Flex>
                </Box>
            </SimpleGrid>

            {/* --- SLIDES LIST --- */}
            <VStack gap={6} align="stretch" mb={8}>
                {heroSlides.length === 0 ? (
                    <Flex justify="center" py={12} color="#888888" bg="#0A0A0A" rounded="none" border="1px dashed" borderColor="#1A1A1A" fontWeight="bold">
                        No hero slides created yet. Add one to override the default carousel!
                    </Flex>
                ) : (
                    heroSlides.map((slide) => {
                        const isActive = slide.status === "Active";
                        const isDraft = slide.status === "Draft";

                        return (
                            <Box key={slide.id} bg="#0A0A0A" rounded="none" border="1px solid" borderColor={isActive ? "rgba(92, 172, 125, 0.5)" : "#1A1A1A"} p={4} transition="all 0.2s" opacity={isDraft ? 0.6 : 1} _hover={{ bg: "#111111" }}>
                                <Flex direction={{ base: "column", md: "row" }} gap={6} align={{ base: "stretch", md: "center" }}>
                                    
                                    {/* Mini Visual Preview */}
                                    <Box position="relative" w={{ base: "100%", md: "250px" }} h="140px" rounded="lg" overflow="hidden" border="1px solid #333" flexShrink={0}>
                                        {slide.image ? (
                                            <>
                                                <Box position="absolute" inset={0} bgGradient="linear(to-t, #0A0A0B 0%, transparent 80%)" zIndex={1} />
                                                <ChakraImage src={slide.image} w="full" h="full" objectFit="cover" />
                                            </>
                                        ) : (
                                            <Box position="absolute" inset={0} bg={slide.bgColor} zIndex={0} />
                                        )}
                                        <Flex position="absolute" bottom={0} left={0} zIndex={2} p={3} direction="column" w="full">
                                            <Text fontSize="sm" fontWeight="black" color={slide.textColor} lineClamp={1}>{slide.name}</Text>
                                        </Flex>
                                    </Box>

                                    {/* Content Info */}
                                    <VStack align="start" flex={1} gap={1} py={2}>
                                        <Flex align="center" gap={3}>
                                            <Text color="white" fontWeight="bold" fontSize="lg" letterSpacing="tight">{slide.name}</Text>
                                            <Badge colorScheme={isActive ? "green" : "gray"} variant="subtle" rounded="sm" px={2}>{slide.status}</Badge>
                                        </Flex>
                                        <Text color="#888888" fontSize="sm" lineClamp={2} mb={2}>{slide.message}</Text>
                                        
                                        <Flex gap={4} mt="auto">
                                            <Flex align="center" gap={1.5} color="#888888">
                                                <Icon as={LuLink} boxSize="12px" strokeWidth="2.5" />
                                                <Text fontSize="xs" fontWeight="bold">{slide.ctaText || "No Button"} → {slide.ctaLink}</Text>
                                            </Flex>
                                            <Flex align="center" gap={1.5} color="#888888">
                                                <Icon as={LuImage} boxSize="12px" strokeWidth="2.5" />
                                                <Text fontSize="xs" fontWeight="bold">{slide.image ? "Custom Image" : "Color Fill"}</Text>
                                            </Flex>
                                        </Flex>
                                    </VStack>

                                    {/* Actions */}
                                    <Flex direction="column" gap={2} minW="140px" justify="center">
                                        <Button size="sm" h="36px" onClick={() => openEditModal(slide)} variant="outline" borderColor="#333333" color="white" _hover={{ bg: "#111111" }} rounded="none" justifyContent="flex-start">
                                            <Icon as={LuSquare} mr={2} strokeWidth="2.5" /> Edit Slide
                                        </Button>
                                        <Button size="sm" h="36px" onClick={() => toggleStatus(slide.id, slide.status)} variant="outline" borderColor="#333333" color={isActive ? "orange.400" : brandColor} _hover={{ bg: "#111111" }} rounded="none" justifyContent="flex-start">
                                            <Icon as={isActive ? LuPowerOff : LuPower} mr={2} strokeWidth="2.5" /> {isActive ? "Deactivate" : "Activate"}
                                        </Button>
                                        <Button size="sm" h="36px" onClick={() => deleteBanner(slide.id)} variant="ghost" color="red.400" _hover={{ bg: "red.900", color: "white" }} rounded="none" justifyContent="flex-start">
                                            <Icon as={LuTrash2} mr={2} strokeWidth="2.5" /> Delete
                                        </Button>
                                    </Flex>

                                </Flex>
                            </Box>
                        );
                    })
                )}
            </VStack>

            {/* --- MOUNT MODAL --- */}
            <CreateHeroModal 
                isOpen={isCreateModalOpen} 
                onClose={handleCloseModal} 
                onSave={handleSaveBanner}
                editData={editingBanner}
            />
        </Box>
    );
};

