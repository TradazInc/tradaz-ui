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
    bg: "#0A0A0A",
    border: "1px solid",
    borderColor: "#1A1A1A",
    color: "white",
    rounded: "none",
    _focus: { borderColor: "white", outline: "none", boxShadow: "0 0 0 1px white" },
    _hover: { borderColor: "#333333" }
};

const FormLabel = ({ children, required }: { children: React.ReactNode, required?: boolean }) => (
    <Text color="gray.400" fontSize="sm" fontWeight="medium" mb={2}>
        {children} {required && <Text as="span" color="white">*</Text>}
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
        <Box w="full" pb={10} position="relative" bg="#000000">
            
            {/* Page Header */}
            <Box mb={6}>
                <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">Add New Product</Text>
                <Text color="gray.500" fontSize="sm">Fill in the details below to list a new product in your store.</Text>
            </Box>

            {/* --- FORM COMPLETION GUIDE --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }}
        mx={{ base: "-16px", md: "-32px" }}
        px={{ base: "16px", md: "32px" }} zIndex={90} 
                bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" pt={2} pb={4} mb={8}  
            >
                <Box bg="#0A0A0A" rounded="none" p={5} border="1px solid" borderColor={incompleteSteps === 0 ? "white" : "#1A1A1A"}>
                    <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                        {steps.map((step, idx) => (
                            <Flex key={idx} align="center" gap={2}>
                                <Icon 
                                    as={step.isComplete ? LuCircleCheck : LuCircle} 
                                    color={step.isComplete ? "white" : "#333333"} 
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
                        <Flex mt={5} bg="#111111" border="1px solid" borderColor="#1A1A1A" rounded="none" p={3} direction="column" gap={2}>
                            <Flex align="center" gap={3}>
                                <Flex justify="center" align="center" bg="white" color="black" rounded="none" boxSize="22px" fontSize="xs" fontWeight="bold">
                                    {incompleteSteps}
                                </Flex>
                                <Text color="white" fontSize="sm" fontWeight="bold">Sections need attention</Text>
                            </Flex>
                            <Text color="gray.400" fontSize="sm" pl={8} display={{ base: "none", md: "block" }}>
                                Please complete the following required sections: 
                                <Text as="span" color="white" fontWeight="bold"> {missingSteps.join(", ")}</Text>
                            </Text>
                        </Flex>
                    ) : (
                        <Flex mt={5} bg="#111111" border="1px solid" borderColor="white" rounded="none" p={4} align="center" gap={3}>
                            <Icon as={LuCircleCheck} color="white" boxSize="22px" />
                            <Text color="white" fontSize="sm" fontWeight="bold">All set! You can now publish your product.</Text>
                        </Flex>
                    )}
                </Box>
            </Box>

            {/* --- MEDIA --- */}
            <Box bg="#0A0A0A" rounded="none" p={6} mb={8} border="1px solid #1A1A1A">
                <Text color="white" fontWeight="bold" mb={4}>1. Product Media <Text as="span" color="white">*</Text></Text>
                
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
                    border="1px dashed" borderColor={mediaFiles.length > 0 ? "white" : "#333333"} rounded="none" bg="#111111"
                    _hover={{ borderColor: "white", bg: "#1A1A1A" }} transition="all 0.2s"
                >
                    {mediaFiles.length === 0 ? (
                        <Flex 
                            direction="column" align="center" justify="center" py={12} px={6} cursor="pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Flex justify="center" align="center" boxSize="64px" bg="#1A1A1A" rounded="none" mb={4}>
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
                                    <Box key={idx} position="relative" rounded="none" overflow="hidden" border="1px solid #333333" aspectRatio="1">
                                        <Image src={media.preview} alt="Upload preview" objectFit="cover" w="full" h="full" />
                                        <CloseButton 
                                            position="absolute" top={1} right={1} size="sm" bg="#0A0A0A" color="white" _hover={{ bg: "#333333" }} rounded="none" border="1px solid #333333"
                                            onClick={(e) => { e.stopPropagation(); removeMedia(idx); }}
                                        />
                                    </Box>
                                ))}
                                {/* Add More Button inside grid */}
                                <Flex 
                                    direction="column" align="center" justify="center" bg="#0A0A0A" border="1px dashed #333333" rounded="none" aspectRatio="1" cursor="pointer" _hover={{ bg: "#111111", borderColor: "white" }}
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
            <Box bg="#0A0A0A" rounded="none" p={6} mb={8} border="1px solid #1A1A1A">
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
            <Box bg="#0A0A0A" rounded="none" p={6} mb={8} border="1px solid #1A1A1A">
                <Text color="white" fontWeight="bold" mb={6}>3. Categories <Text as="span" color="white">*</Text></Text>
                <Box bg="#111111" p={5} rounded="none" border="1px solid #1A1A1A" maxH="200px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#333333' } }}>
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={5}>
                        {["Shirts", "Foot Wears", "Sleep Wears", "Jackets", "Bottoms", "Bags", "Under Wears", "Tops", "Sport Wears", "Accessories", "Ethnic Wears", "Dress"].map((cat) => (
                            <Flex key={cat} align="center" gap={3} cursor="pointer" onClick={() => handleCategoryToggle(cat)} role="group">
                                <Flex justify="center" align="center" boxSize="18px" border="1px solid" borderColor={categories.includes(cat) ? "white" : "#333333"} bg={categories.includes(cat) ? "white" : "transparent"} rounded="none" transition="all 0.2s" _groupHover={{ borderColor: "white" }}>
                                    {categories.includes(cat) && <Icon as={LuCheck} color="black" boxSize="12px" fontWeight="bold" />}
                                </Flex>
                                <Text fontSize="sm" color={categories.includes(cat) ? "white" : "gray.400"} transition="color 0.2s">{cat}</Text>
                            </Flex>
                        ))}
                    </SimpleGrid>
                </Box>
            </Box>

            {/* --- PRODUCT DETAILS --- */}
            <Box bg="#0A0A0A" rounded="none" p={6} mb={8} border="1px solid #1A1A1A">
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
            <Box bg="#0A0A0A" rounded="none" p={6} mb={8} border="1px solid #1A1A1A">
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
            <Box bg="#0A0A0A" rounded="none" p={6} mb={8} border="1px solid #1A1A1A">
                <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
                    <Text color="white" fontWeight="bold">6. Product Variations <Text as="span" color="white">*</Text></Text>
                    <Button size="sm" bg="white" color="black" rounded="none" _hover={{ bg: "gray.200" }} border="none" onClick={addVariation}>
                        <Icon as={LuPlus} mr={2} /> Add Variation
                    </Button>
                </Flex>

                {variations.length === 0 ? (
                    <Flex direction="column" align="center" justify="center" py={10} px={6} border="1px dashed #333333" rounded="none" bg="#111111">
                        <Text color="gray.500" fontSize="sm">No variations added yet. Click &apos;Add Variation&apos; to create sizes, colors, and prices.</Text>
                    </Flex>
                ) : (
                    <VStack gap={4} align="stretch">
                        {variations.map((variation) => (
                            <Flex key={variation.id} align={{ base: "flex-start", md: "center" }} gap={4} bg="#111111" p={4} rounded="none" border="1px solid #1A1A1A" direction={{ base: "column", md: "row" }}>
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
                                <IconButton aria-label="Remove Variation" bg="transparent" color="gray.500" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }} alignSelf={{ base: "flex-end", md: "flex-end" }} mt={{ base: 0, md: "20px" }} onClick={() => removeVariation(variation.id)}>
                                    <LuTrash2 />
                                </IconButton>
                            </Flex>
                        ))}
                    </VStack>
                )}
            </Box>

            {/* Action Footer */}
            <Flex justify="flex-end" align="center" gap={4} pt={6} borderTop="1px solid #1A1A1A">
                <Button variant="outline" rounded="none" borderColor="#1A1A1A" color="white" _hover={{ bg: "#111111" }} h="48px" px={8} bg="#0A0A0A">
                    Save Draft
                </Button>
                <Button bg="white" color="black" rounded="none" _hover={{ bg: "gray.200" }} border="none" disabled={incompleteSteps > 0} h="48px" px={8}>
                    Create Product
                </Button>
            </Flex>

        </Box>
    );
};