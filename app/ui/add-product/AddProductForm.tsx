"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, Textarea } from "@chakra-ui/react";
import { 
    LuCloudUpload, LuImage, LuCircleCheck, LuCircle, LuFolder, 
    LuTag, LuList, LuDollarSign, LuLayers, LuPlus, LuCheck 
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

export const AddProductForm = () => {
    //  STATE TRACKING
    const [hasMedia, setHasMedia] = useState(false); 
    const [basicInfo, setBasicInfo] = useState({ name: "", brand: "" });
    const [categories, setCategories] = useState<string[]>([]);
    const [details, setDetails] = useState({ description: "" });
    const [pricing, setPricing] = useState({ price: "" });
    const [hasVariations, setHasVariations] = useState(false);

    
    const steps = [
        { name: "Media", icon: LuImage, isComplete: hasMedia },
        { name: "Basic Info", icon: LuFolder, isComplete: basicInfo.name.length > 0 && basicInfo.brand.length > 0 },
        { name: "Categories", icon: LuTag, isComplete: categories.length > 0 },
        { name: "Details", icon: LuList, isComplete: details.description.length > 0 },
        { name: "Pricing", icon: LuDollarSign, isComplete: pricing.price.length > 0 },
        { name: "Variations", icon: LuLayers, isComplete: hasVariations },
    ];

    const missingSteps = steps.filter(step => !step.isComplete).map(step => step.name);
    const incompleteSteps = missingSteps.length;

    const handleCategoryToggle = (cat: string) => {
        setCategories(prev => 
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    return (
        <Box w="full" pb={10} position="relative">
            
            {/* Page Header */}
            <Box mb={6}>
                <Text color="white" fontWeight="bold" fontSize="2xl">Add New Product</Text>
                <Text color="gray.400" fontSize="sm">Fill in the details below to list a new product in your store.</Text>
            </Box>

            {/* ---  STICKY FORM COMPLETION GUIDE --- */}
            <Box 
                position="sticky" 
                
                top={{ base: "70px", md: "85px" }} 
                
                zIndex={90} 
                bg="rgba(11, 13, 20, 0.85)" 
                backdropFilter="blur(12px)"
                pt={2}
                pb={4}
                mb={8}
                mx={-2} px={2} 
            >
                
                <Box bg="#1A1C23" rounded="2xl" p={5} border="1px solid" borderColor={incompleteSteps === 0 ? "#5cac7d" : "whiteAlpha.100"} shadow="0 15px 35px -10px rgba(0,0,0,0.6)">
                    <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
                        {steps.map((step, idx) => (
                            <Flex key={idx} align="center" gap={2}>
                                <Icon 
                                    as={step.isComplete ? LuCircleCheck : LuCircle} 
                                    color={step.isComplete ? "#5cac7d" : "gray.500"} 
                                    boxSize="20px"
                                    transition="color 0.3s ease"
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
                <Text color="white" fontWeight="bold" mb={4}>1. Product Media</Text>
                
                <Flex 
                    direction="column" align="center" justify="center" py={12} px={6} 
                    border="2px dashed" borderColor={hasMedia ? "#5cac7d" : "whiteAlpha.200"} rounded="xl" bg="#121214"
                    _hover={{ borderColor: "#5cac7d", bg: "whiteAlpha.50" }} transition="all 0.2s" cursor="pointer"
                    onClick={() => setHasMedia(!hasMedia)}
                >
                    <Flex justify="center" align="center" boxSize="64px" bg={hasMedia ? "rgba(92,172,125,0.1)" : "whiteAlpha.100"} rounded="full" mb={4}>
                        <Icon as={LuCloudUpload} boxSize="32px" color={hasMedia ? "#5cac7d" : "gray.400"} />
                    </Flex>
                    <Text color="white" fontWeight="medium" mb={1}>
                        {hasMedia ? "Media successfully attached! (Click to toggle)" : "Click to upload or drag and drop images/videos"}
                    </Text>
                    <Text color="gray.500" fontSize="sm" mb={6}>PNG, JPG, GIF, MP4, MOV up to 10MB each</Text>
                </Flex>
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

                    <Box>
                        <FormLabel>Vendor (Optional)</FormLabel>
                        <Box as="select" h="48px" w="full" px={4} {...inputStyles} cursor="pointer">
                            <option value="none" style={{ background: "#1A1C23" }}>No vendor (Admin product)</option>
                            <option value="vendor1" style={{ background: "#1A1C23" }}>Vendor A</option>
                        </Box>
                    </Box>

                    <Box>
                        <FormLabel required>Product Type</FormLabel>
                        <Box as="select" h="48px" w="full" px={4} {...inputStyles} cursor="pointer">
                            <option value="physical" style={{ background: "#1A1C23" }}>Physical Product</option>
                            <option value="digital" style={{ background: "#1A1C23" }}>Digital Product</option>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Box>

            {/* ---  CATEGORIES --- */}
            <Box bg="#1A1C23" rounded="2xl" p={6} mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Text color="white" fontWeight="bold" mb={6}>3. Categories <Text as="span" color="red.400">*</Text></Text>
                <Box bg="#121214" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.200" maxH="200px" overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.2)' } }}>
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={5}>
                        {["Shirts", "Foot Wears", "Sleep Wears", "Jackets", "Bottoms", "Bags", "Under Wears", "Tops", "Sport Wears", "Accessories", "Ethnic Wears", "Dress"].map((cat) => (
                            <Flex 
                                key={cat} 
                                align="center" 
                                gap={3} 
                                cursor="pointer" 
                                onClick={() => handleCategoryToggle(cat)}
                                role="group"
                            >
                                <Flex 
                                    justify="center" 
                                    align="center" 
                                    boxSize="18px" 
                                    border="2px solid" 
                                    borderColor={categories.includes(cat) ? "#5cac7d" : "whiteAlpha.400"} 
                                    bg={categories.includes(cat) ? "#5cac7d" : "transparent"} 
                                    rounded="md"
                                    transition="all 0.2s"
                                    _groupHover={{ borderColor: categories.includes(cat) ? "#5cac7d" : "whiteAlpha.600" }}
                                >
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
                
                <Box mb={6}>
                    <FormLabel>Additional Information</FormLabel>
                    <Textarea placeholder="Material, care instructions, etc." {...inputStyles} minH="80px" py={3} />
                </Box>

                <Box>
                    <FormLabel>Shipping Information</FormLabel>
                    <Textarea placeholder="Weight, dimensions, delivery expectations..." {...inputStyles} minH="80px" py={3} />
                </Box>
            </Box>

            {/* --- PRICING --- */}
            <Box bg="#1A1C23" rounded="2xl" p={6} mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Text color="white" fontWeight="bold" mb={6}>5. Pricing & Inventory</Text>
                
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                    <Box>
                        <FormLabel required>Price (₦)</FormLabel>
                        <Input h="48px" type="number" placeholder="0.00" {...inputStyles} value={pricing.price} onChange={(e) => setPricing({price: e.target.value})} />
                    </Box>
                    <Box>
                        <FormLabel>Compare at Price (₦)</FormLabel>
                        <Input h="48px" type="number" placeholder="0.00" {...inputStyles} />
                    </Box>
                    <Box>
                        <FormLabel>Initial Quantity</FormLabel>
                        <Input h="48px" type="number" placeholder="0" {...inputStyles} />
                    </Box>
                </SimpleGrid>
            </Box>

            {/* ---VARIATIONS --- */}
            <Box bg="#1A1C23" rounded="2xl" p={6} mb={8} border="1px solid" borderColor="whiteAlpha.100">
                <Flex justify="space-between" align="center" mb={6}>
                    <Text color="white" fontWeight="bold">6. Product Variations</Text>
                    <Button 
                        size="sm" bg="blue.500" color="white" _hover={{ bg: "blue.400" }} border="none"
                        onClick={() => setHasVariations(!hasVariations)} 
                    >
                        <Icon as={LuPlus} mr={2} /> Add Variation
                    </Button>
                </Flex>

                <Flex 
                    direction="column" align="center" justify="center" py={10} px={6} 
                    border="1px dashed" borderColor="whiteAlpha.200" rounded="xl" bg="#121214"
                >
                    <Text color={hasVariations ? "#5cac7d" : "gray.500"} fontSize="sm" fontWeight={hasVariations ? "bold" : "normal"}>
                        {hasVariations ? "Variation rules active!" : "No variations added yet. Click 'Add Variation' to create your first variation."}
                    </Text>
                </Flex>
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