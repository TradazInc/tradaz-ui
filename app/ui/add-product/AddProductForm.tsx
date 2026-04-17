"use client";
import React, { useState, useRef } from "react";
import { 
    Box, Flex, Text, SimpleGrid, Icon, Input, Button, Textarea, IconButton, Image, CloseButton, VStack 
} from "@chakra-ui/react";
import { 
    LuCloudUpload, LuImage, LuCircleCheck, LuCircle, LuFolder, 
    LuTag, LuList, LuDollarSign, LuLayers, LuPlus, LuCheck, LuTrash2
} from "react-icons/lu";

const inputStyles = {
    bg: "#121214",
    border: "1px solid",
    borderColor: "whiteAlpha.200",
    color: "white",
    rounded: "lg",
    _focus: { borderColor: "#5cac7d", outline: "none", boxShadow: "0 0 0 1px #5cac7d" },
    _hover: { borderColor: "whiteAlpha.300" }
};

const FormLabel = ({ children, required }: { children: React.ReactNode, required?: boolean }) => (
    <Text color="gray.300" fontSize="sm" fontWeight="medium" mb={2}>
        {children} {required && <Text as="span" color="red.400">*</Text>}
    </Text>
);

// Types for our new dynamic states
interface MediaFile {
    file: File;
    preview: string;
}

interface Variation {
    id: number;
    size: string;
    color: string;
    price: string;
}

export const AddProductForm = () => {
    // --- STATE TRACKING ---
    const [basicInfo, setBasicInfo] = useState({ name: "", brand: "" });
    const [categories, setCategories] = useState<string[]>([]);
    const [details, setDetails] = useState({ description: "" });
    const [pricing, setPricing] = useState({ price: "" });

    // New Media State & Ref
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // New Variations State
    const [variations, setVariations] = useState<Variation[]>([]);

    // --- HANDLERS ---
    const handleCategoryToggle = (cat: string) => {
        setCategories(prev => 
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    // Media Handlers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const newMedia = filesArray.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            setMediaFiles(prev => [...prev, ...newMedia]);
        }
    };

    const removeMedia = (indexToRemove: number) => {
        setMediaFiles(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[indexToRemove].preview); // Clean up memory
            updated.splice(indexToRemove, 1);
            return updated;
        });
    };

    // Variation Handlers
    const addVariation = () => {
        setVariations(prev => [
            ...prev, 
            { id: Date.now(), size: "", color: "", price: "" }
        ]);
    };

    const updateVariation = (id: number, field: keyof Variation, value: string) => {
        setVariations(prev => prev.map(v => 
            v.id === id ? { ...v, [field]: value } : v
        ));
    };

    const removeVariation = (id: number) => {
        setVariations(prev => prev.filter(v => v.id !== id));
    };

    // --- STEP TRACKING ---
    const steps = [
        { name: "Media", icon: LuImage, isComplete: mediaFiles.length > 0 },
        { name: "Basic Info", icon: LuFolder, isComplete: basicInfo.name.length > 0 && basicInfo.brand.length > 0 },
        { name: "Categories", icon: LuTag, isComplete: categories.length > 0 },
        { name: "Details", icon: LuList, isComplete: details.description.length > 0 },
        { name: "Pricing", icon: LuDollarSign, isComplete: pricing.price.length > 0 },
        { name: "Variations", icon: LuLayers, isComplete: variations.length > 0 },
    ];

    const missingSteps = steps.filter(step => !step.isComplete).map(step => step.name);
    const incompleteSteps = missingSteps.length;

    return (
        <Box w="full" pb={10} position="relative">
            
            {/* Page Header */}
            <Box mb={6}>
                <Text color="white" fontWeight="bold" fontSize="2xl">Add New Product</Text>
                <Text color="gray.400" fontSize="sm">Fill in the details below to list a new product in your store.</Text>
            </Box>

            {/* --- STICKY FORM COMPLETION GUIDE --- */}
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={90} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" pt={2} pb={4} mb={8} mx={-2} px={2} 
            >
                <Box bg="#1A1C23" rounded="2xl" p={5} border="1px solid" borderColor={incompleteSteps === 0 ? "#5cac7d" : "whiteAlpha.100"} shadow="0 15px 35px -10px rgba(0,0,0,0.6)">
                    <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                        {steps.map((step, idx) => (
                            <Flex key={idx} align="center" gap={2}>
                                <Icon 
                                    as={step.isComplete ? LuCircleCheck : LuCircle} 
                                    color={step.isComplete ? "#5cac7d" : "gray.500"} 
                                    boxSize="20px" transition="color 0.3s ease"
                                />
                                <Text fontSize="sm" color={step.isComplete ? "white" : "gray.500"} fontWeight="medium" transition="color 0.3s ease">
                                    {step.name}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>

                    {/* Dynamic Status Banner */}
                    {incompleteSteps > 0 ? (
                        <Flex mt={5} bg="rgba(245, 101, 101, 0.05)" border="1px solid" borderColor="red.400" rounded="lg" p={3} direction="column" gap={2}>
                            <Flex align="center" gap={3}>
                                <Flex justify="center" align="center" bg="red.400" color="white" rounded="full" boxSize="22px" fontSize="xs" fontWeight="bold">
                                    {incompleteSteps}
                                </Flex>
                                <Text color="red.400" fontSize="sm" fontWeight="bold">Sections need attention</Text>
                            </Flex>
                            <Text color="red.300" fontSize="sm" pl={8} display={{ base: "none", md: "block" }}>
                                Please complete the following required sections: 
                                <Text as="span" fontWeight="bold"> {missingSteps.join(", ")}</Text>
                            </Text>
                        </Flex>
                    ) : (
                        <Flex mt={5} bg="rgba(92, 172, 125, 0.1)" border="1px solid" borderColor="#5cac7d" rounded="lg" p={4} align="center" gap={3}>
                            <Icon as={LuCircleCheck} color="#5cac7d" boxSize="22px" />
                            <Text color="#5cac7d" fontSize="sm" fontWeight="bold">All set! You can now publish your product.</Text>
                        </Flex>
                    )}
                </Box>
            </Box>

            {/* --- MEDIA --- */}
            <Box bg="#1A1C23" rounded="2xl" p={6} mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Text color="white" fontWeight="bold" mb={4}>1. Product Media <Text as="span" color="red.400">*</Text></Text>
                
                {/* Hidden File Input */}
                <input 
                    type="file" 
                    multiple 
                    accept="image/*,video/mp4,video/quicktime" 
                    ref={fileInputRef} 
                    style={{ display: "none" }} 
                    onChange={handleFileChange} 
                />

                <Box 
                    border="2px dashed" borderColor={mediaFiles.length > 0 ? "#5cac7d" : "whiteAlpha.200"} rounded="xl" bg="#121214"
                    _hover={{ borderColor: "#5cac7d", bg: "whiteAlpha.50" }} transition="all 0.2s"
                >
                    {mediaFiles.length === 0 ? (
                        <Flex 
                            direction="column" align="center" justify="center" py={12} px={6} cursor="pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Flex justify="center" align="center" boxSize="64px" bg="whiteAlpha.100" rounded="full" mb={4}>
                                <Icon as={LuCloudUpload} boxSize="32px" color="gray.400" />
                            </Flex>
                            <Text color="white" fontWeight="medium" mb={1}>
                                Click to upload or drag and drop images/videos
                            </Text>
                            <Text color="gray.500" fontSize="sm" mb={6}>PNG, JPG, GIF, MP4, MOV up to 10MB each</Text>
                        </Flex>
                    ) : (
                        <Box p={6}>
                            <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} gap={4} mb={6}>
                                {mediaFiles.map((media, idx) => (
                                    <Box key={idx} position="relative" rounded="lg" overflow="hidden" border="1px solid" borderColor="whiteAlpha.200" aspectRatio="1">
                                        <Image src={media.preview} alt="Upload preview" objectFit="cover" w="full" h="full" />
                                        <CloseButton 
                                            position="absolute" top={1} right={1} size="sm" bg="blackAlpha.700" color="white" _hover={{ bg: "red.500" }} rounded="full"
                                            onClick={(e) => { e.stopPropagation(); removeMedia(idx); }}
                                        />
                                    </Box>
                                ))}
                                {/* Add More Button inside grid */}
                                <Flex 
                                    direction="column" align="center" justify="center" bg="whiteAlpha.50" border="1px dashed" borderColor="whiteAlpha.300" rounded="lg" aspectRatio="1" cursor="pointer" _hover={{ bg: "whiteAlpha.100", borderColor: "whiteAlpha.500" }}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Icon as={LuPlus} boxSize="24px" color="gray.400" mb={2} />
                                    <Text fontSize="xs" color="gray.400" fontWeight="medium">Add More</Text>
                                </Flex>
                            </SimpleGrid>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* --- BASIC INFO --- */}
            <Box bg="#1A1C23" rounded="2xl" p={6} mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Text color="white" fontWeight="bold" mb={6}>2. Basic Information</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Box>
                        <FormLabel required>Product Name</FormLabel>
                        <Input h="48px" placeholder="Enter product name" {...inputStyles} value={basicInfo.name} onChange={(e) => setBasicInfo({...basicInfo, name: e.target.value})} />
                    </Box>
                    <Box>
                        <FormLabel required>Brand</FormLabel>
                        <Input h="48px" placeholder="Enter brand name" {...inputStyles} value={basicInfo.brand} onChange={(e) => setBasicInfo({...basicInfo, brand: e.target.value})} />
                    </Box>
                </SimpleGrid>
            </Box>

            {/* --- CATEGORIES --- */}
            <Box bg="#1A1C23" rounded="2xl" p={6} mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Text color="white" fontWeight="bold" mb={6}>3. Categories <Text as="span" color="red.400">*</Text></Text>
                <Box bg="#121214" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.200" maxH="200px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.2)' } }}>
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={5}>
                        {["Shirts", "Foot Wears", "Sleep Wears", "Jackets", "Bottoms", "Bags", "Under Wears", "Tops", "Sport Wears", "Accessories", "Ethnic Wears", "Dress"].map((cat) => (
                            <Flex key={cat} align="center" gap={3} cursor="pointer" onClick={() => handleCategoryToggle(cat)} role="group">
                                <Flex justify="center" align="center" boxSize="18px" border="2px solid" borderColor={categories.includes(cat) ? "#5cac7d" : "whiteAlpha.400"} bg={categories.includes(cat) ? "#5cac7d" : "transparent"} rounded="md" transition="all 0.2s" _groupHover={{ borderColor: categories.includes(cat) ? "#5cac7d" : "whiteAlpha.600" }}>
                                    {categories.includes(cat) && <Icon as={LuCheck} color="white" boxSize="12px" fontWeight="bold" />}
                                </Flex>
                                <Text fontSize="sm" color={categories.includes(cat) ? "white" : "gray.400"} transition="color 0.2s">{cat}</Text>
                            </Flex>
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>

            {/* --- PRODUCT DETAILS --- */}
            <Box bg="#1A1C23" rounded="2xl" p={6} mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Text color="white" fontWeight="bold" mb={6}>4. Product Details</Text>
                <Box mb={6}>
                    <FormLabel required>Description</FormLabel>
                    <Textarea 
                        placeholder="Enter comprehensive product description..." 
                        {...inputStyles} minH="120px" py={3}
                        value={details.description}
                        onChange={(e) => setDetails({description: e.target.value})}
                    />
                </Box>
            </Box>

            {/* --- PRICING --- */}
            <Box bg="#1A1C23" rounded="2xl" p={6} mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Text color="white" fontWeight="bold" mb={6}>5. Pricing & Inventory</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Box>
                        <FormLabel required>Base Price (₦)</FormLabel>
                        <Input h="48px" type="number" placeholder="0.00" {...inputStyles} value={pricing.price} onChange={(e) => setPricing({price: e.target.value})} />
                    </Box>
                    <Box>
                        <FormLabel>Initial Quantity</FormLabel>
                        <Input h="48px" type="number" placeholder="0" {...inputStyles} />
                    </Box>
                </SimpleGrid>
            </Box>

            {/* --- VARIATIONS --- */}
            <Box bg="#1A1C23" rounded="2xl" p={6} mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
                    <Text color="white" fontWeight="bold">6. Product Variations <Text as="span" color="red.400">*</Text></Text>
                    <Button size="sm" bg="blue.500" color="white" _hover={{ bg: "blue.400" }} border="none" onClick={addVariation}>
                        <Icon as={LuPlus} mr={2} /> Add Variation
                    </Button>
                </Flex>

                {variations.length === 0 ? (
                    <Flex direction="column" align="center" justify="center" py={10} px={6} border="1px dashed" borderColor="whiteAlpha.200" rounded="xl" bg="#121214">
                        <Text color="gray.500" fontSize="sm">No variations added yet. Click &apos;Add Variation&apos; to create sizes, colors, and prices.</Text>
                    </Flex>
                ) : (
                    <VStack gap={4} align="stretch">
                        {variations.map((variation) => (
                            <Flex key={variation.id} align={{ base: "flex-start", md: "center" }} gap={4} bg="#121214" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.200" direction={{ base: "column", md: "row" }}>
                                <Box flex={1} w="full">
                                    <Text fontSize="xs" color="gray.400" mb={1} fontWeight="bold">Size</Text>
                                    <Input h="40px" placeholder="e.g. XL, 42, One Size" {...inputStyles} value={variation.size} onChange={(e) => updateVariation(variation.id, "size", e.target.value)} />
                                </Box>
                                <Box flex={1} w="full">
                                    <Text fontSize="xs" color="gray.400" mb={1} fontWeight="bold">Color</Text>
                                    <Input h="40px" placeholder="e.g. Red, Matte Black" {...inputStyles} value={variation.color} onChange={(e) => updateVariation(variation.id, "color", e.target.value)} />
                                </Box>
                                <Box flex={1} w="full">
                                    <Text fontSize="xs" color="gray.400" mb={1} fontWeight="bold">Specific Price (₦)</Text>
                                    <Input h="40px" type="number" placeholder="Override base price" {...inputStyles} value={variation.price} onChange={(e) => updateVariation(variation.id, "price", e.target.value)} />
                                </Box>
                                <IconButton aria-label="Remove Variation" bg="transparent" color="red.400" _hover={{ bg: "red.900", color: "white" }} alignSelf={{ base: "flex-end", md: "flex-end" }} mt={{ base: 0, md: "20px" }} onClick={() => removeVariation(variation.id)}>
                                    <LuTrash2 />
                                </IconButton>
                            </Flex>
                        ))}
                    </VStack>
                )}
            </Box>

            {/* Action Footer */}
            <Flex justify="flex-end" align="center" gap={4} pt={6} borderTop="1px solid" borderColor="whiteAlpha.100">
                <Button variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="48px" px={8}>
                    Save Draft
                </Button>
                <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} border="none" disabled={incompleteSteps > 0} h="48px" px={8}>
                    Create Product
                </Button>
            </Flex>

        </Box>
    );
};