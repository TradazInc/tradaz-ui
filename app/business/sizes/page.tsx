"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Button, Input, VStack, IconButton, Textarea, Badge
} from "@chakra-ui/react";
import { 
    LuRuler, LuPlus, LuSearch, LuTrash, LuPen, LuLayers, LuX
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };

// --- MOCK DATA ---
const INITIAL_SIZE_TYPES = [
    { id: "1", name: "Apparel (Letter)", sizes: ["S", "M", "L", "XL", "XXL"], description: "Standard international letter sizing for tops and jackets.", created: "May 10, 2026" },
    { id: "2", name: "Shoes (EU)", sizes: ["38", "39", "40", "41", "42", "43", "44", "45"], description: "European numerical shoe sizing.", created: "May 08, 2026" },
    { id: "3", name: "Pants (Waist)", sizes: ["28", "30", "32", "34", "36", "38", "40"], description: "Waist measurements in inches.", created: "Apr 22, 2026" },
    { id: "4", name: "Shoes (US Women)", sizes: ["5", "6", "7", "8", "9", "10", "11"], description: "US women's numerical shoe sizing.", created: "Apr 15, 2026" },
    { id: "5", name: "One Size", sizes: ["OS"], description: "For items that do not have multiple size variations like bags or hats.", created: "Mar 30, 2026" }
];

type SizeType = typeof INITIAL_SIZE_TYPES[0];

export default function SizesPage() {
    const brandColor = "#5cac7d";
    
    // --- STATE ---
    const [searchQuery, setSearchQuery] = useState("");
    const [sizeTypes, setSizeTypes] = useState(INITIAL_SIZE_TYPES);
    
    // Add Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newSizeType, setNewSizeType] = useState({ name: "", description: "", sizes: [] as string[] });
    const [currentSizeInput, setCurrentSizeInput] = useState("");

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSizeType, setEditingSizeType] = useState<SizeType | null>(null);
    const [editSizeInput, setEditSizeInput] = useState("");

    // --- LOGIC: ADD MODAL ---
    const handleAddSizeTrigger = () => {
        const input = currentSizeInput.trim();
        if (!input) return;

        // Split by comma, remove whitespace, filter out empty strings
        const splitSizes = input.split(',').map(s => s.trim()).filter(s => s !== "");
        
        // Merge with existing sizes and remove duplicates using Set
        const uniqueSizes = Array.from(new Set([...newSizeType.sizes, ...splitSizes]));

        setNewSizeType({ ...newSizeType, sizes: uniqueSizes });
        setCurrentSizeInput("");
    };

    const handleRemoveSizeTrigger = (sizeToRemove: string) => {
        setNewSizeType({ ...newSizeType, sizes: newSizeType.sizes.filter(s => s !== sizeToRemove) });
    };

    const handleCreateSizeType = () => {
        if (!newSizeType.name.trim() || newSizeType.sizes.length === 0) return;

        const typeToAdd = {
            id: Date.now().toString(),
            name: newSizeType.name,
            sizes: newSizeType.sizes,
            description: newSizeType.description || "No description provided.",
            created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        };

        setSizeTypes([typeToAdd, ...sizeTypes]);
        setIsAddModalOpen(false);
        setNewSizeType({ name: "", description: "", sizes: [] }); 
        setCurrentSizeInput("");
    };

    // --- LOGIC: EDIT MODAL ---
    const openEditModal = (sizeType: SizeType) => {
        setEditingSizeType({ ...sizeType, sizes: [...sizeType.sizes] }); // Deep copy
        setIsEditModalOpen(true);
    };

    const handleEditAddSizeTrigger = () => {
        const input = editSizeInput.trim();
        if (!input || !editingSizeType) return;

        // Split by comma, remove whitespace, filter out empty strings
        const splitSizes = input.split(',').map(s => s.trim()).filter(s => s !== "");
        
        // Merge with existing sizes and remove duplicates using Set
        const uniqueSizes = Array.from(new Set([...editingSizeType.sizes, ...splitSizes]));

        setEditingSizeType({ ...editingSizeType, sizes: uniqueSizes });
        setEditSizeInput("");
    };

    const handleEditRemoveSizeTrigger = (sizeToRemove: string) => {
        if (editingSizeType) {
            setEditingSizeType({ ...editingSizeType, sizes: editingSizeType.sizes.filter(s => s !== sizeToRemove) });
        }
    };

    const handleUpdateSizeType = () => {
        if (!editingSizeType || !editingSizeType.name.trim() || editingSizeType.sizes.length === 0) return;

        setSizeTypes(sizeTypes.map(st => 
            st.id === editingSizeType.id ? editingSizeType : st
        ));
        
        setIsEditModalOpen(false);
        setEditingSizeType(null);
        setEditSizeInput("");
    };

    const handleDelete = (id: string) => {
        setSizeTypes(sizeTypes.filter(st => st.id !== id));
    };

    // Filter
    const filteredSizeTypes = sizeTypes.filter(st => 
        st.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1600px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- ADD SIZE TYPE MODAL --- */}
            {isAddModalOpen && (
                <Box position="fixed" inset={0} zIndex={9999} bg="blackAlpha.800" backdropFilter="blur(4px)" display="flex" alignItems="center" justifyContent="center" p={4}>
                    <Box bg="#0A0A0A" border="1px solid #333333" rounded="none" w="full" maxW="500px" p={6} shadow="2xl">
                        <Text fontSize="xl" fontWeight="black" color="white" mb={6} letterSpacing="tight">Add New Size Type</Text>
                        
                        <VStack gap={5} align="stretch">
                            <Box>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Size Type Name *</Text>
                                <Input 
                                    value={newSizeType.name} 
                                    onChange={(e) => setNewSizeType({...newSizeType, name: e.target.value})} 
                                    bg="#111111" border="1px solid #333333" color="white" rounded="none" 
                                    _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }} 
                                    placeholder="e.g., Men's Shoes (US)" 
                                />
                            </Box>
                            <Box>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Description</Text>
                                <Textarea 
                                    value={newSizeType.description} 
                                    onChange={(e) => setNewSizeType({...newSizeType, description: e.target.value})} 
                                    bg="#111111" border="1px solid #333333" color="white" rounded="none" 
                                    _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }} 
                                    placeholder="Brief description of this sizing standard..." 
                                    rows={2}
                                    resize="none"
                                />
                            </Box>
                            <Box borderTop="1px solid #1A1A1A" pt={4}>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Sizes *</Text>
                                <Flex gap={2} mb={4}>
                                    <Input 
                                        value={currentSizeInput} 
                                        onChange={(e) => setCurrentSizeInput(e.target.value)} 
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddSizeTrigger()}
                                        bg="#111111" border="1px solid #333333" color="white" rounded="none" 
                                        _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }} 
                                        placeholder="e.g., S, M, L, XL" 
                                    />
                                    <Button onClick={handleAddSizeTrigger} bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} px={6}>
                                        Add
                                    </Button>
                                </Flex>

                                <Box bg="#111111" border="1px solid #1A1A1A" p={4} minH="80px">
                                    {newSizeType.sizes.length === 0 ? (
                                        <Flex justify="center" align="center" h="full" color="#555555">
                                            <Text fontSize="sm">No sizes added yet</Text>
                                        </Flex>
                                    ) : (
                                        <Flex wrap="wrap" gap={2}>
                                            {newSizeType.sizes.map((size, idx) => (
                                                <Badge key={idx} bg="#1A1A1A" color="white" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="xs" display="flex" alignItems="center" gap={2}>
                                                    {size}
                                                    <Icon as={LuX} cursor="pointer" color="red.400" _hover={{ color: "red.300" }} onClick={() => handleRemoveSizeTrigger(size)} />
                                                </Badge>
                                            ))}
                                        </Flex>
                                    )}
                                </Box>
                            </Box>
                        </VStack>

                        <Flex justify="flex-end" gap={3} mt={8}>
                            <Button onClick={() => setIsAddModalOpen(false)} variant="ghost" color="#888888" _hover={{ color: "white", bg: "#111111" }} rounded="none">Cancel</Button>
                            <Button onClick={handleCreateSizeType} bg="white" color="black" rounded="none" _hover={{ bg: "#e0e0e0" }}>Create Size Type</Button>
                        </Flex>
                    </Box>
                </Box>
            )}

            {/* --- EDIT SIZE TYPE MODAL --- */}
            {isEditModalOpen && editingSizeType && (
                <Box position="fixed" inset={0} zIndex={9999} bg="blackAlpha.800" backdropFilter="blur(4px)" display="flex" alignItems="center" justifyContent="center" p={4}>
                    <Box bg="#0A0A0A" border="1px solid #333333" rounded="none" w="full" maxW="500px" p={6} shadow="2xl">
                        <Text fontSize="xl" fontWeight="black" color="white" mb={6} letterSpacing="tight">Edit Size Type</Text>
                        
                        <VStack gap={5} align="stretch">
                            <Box>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Size Type Name *</Text>
                                <Input 
                                    value={editingSizeType.name} 
                                    onChange={(e) => setEditingSizeType({...editingSizeType, name: e.target.value})} 
                                    bg="#111111" border="1px solid #333333" color="white" rounded="none" 
                                    _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }} 
                                />
                            </Box>
                            <Box>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Description</Text>
                                <Textarea 
                                    value={editingSizeType.description} 
                                    onChange={(e) => setEditingSizeType({...editingSizeType, description: e.target.value})} 
                                    bg="#111111" border="1px solid #333333" color="white" rounded="none" 
                                    _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }} 
                                    rows={2}
                                    resize="none"
                                />
                            </Box>
                            <Box borderTop="1px solid #1A1A1A" pt={4}>
                                <Text color="#888888" fontSize="xs" fontWeight="bold" mb={2} textTransform="uppercase" letterSpacing="wider">Sizes *</Text>
                                <Flex gap={2} mb={4}>
                                    <Input 
                                        value={editSizeInput} 
                                        onChange={(e) => setEditSizeInput(e.target.value)} 
                                        onKeyPress={(e) => e.key === 'Enter' && handleEditAddSizeTrigger()}
                                        bg="#111111" border="1px solid #333333" color="white" rounded="none" 
                                        _focus={{ borderColor: "white", outline: "none", boxShadow: "none" }} 
                                        placeholder="e.g., 38, 39, 40" 
                                    />
                                    <Button onClick={handleEditAddSizeTrigger} bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} px={6}>
                                        Add
                                    </Button>
                                </Flex>

                                <Box bg="#111111" border="1px solid #1A1A1A" p={4} minH="80px">
                                    {editingSizeType.sizes.length === 0 ? (
                                        <Flex justify="center" align="center" h="full" color="#555555">
                                            <Text fontSize="sm">No sizes added yet</Text>
                                        </Flex>
                                    ) : (
                                        <Flex wrap="wrap" gap={2}>
                                            {editingSizeType.sizes.map((size, idx) => (
                                                <Badge key={idx} bg="#1A1A1A" color="white" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="xs" display="flex" alignItems="center" gap={2}>
                                                    {size}
                                                    <Icon as={LuX} cursor="pointer" color="red.400" _hover={{ color: "red.300" }} onClick={() => handleEditRemoveSizeTrigger(size)} />
                                                </Badge>
                                            ))}
                                        </Flex>
                                    )}
                                </Box>
                            </Box>
                        </VStack>

                        <Flex justify="flex-end" gap={3} mt={8}>
                            <Button onClick={() => setIsEditModalOpen(false)} variant="ghost" color="#888888" _hover={{ color: "white", bg: "#111111" }} rounded="none">Cancel</Button>
                            <Button onClick={handleUpdateSizeType} bg="white" color="black" rounded="none" _hover={{ bg: "#e0e0e0" }}>Update Size Type</Button>
                        </Flex>
                    </Box>
                </Box>
            )}

            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Flex align="center" gap={3} mb={1}>
                        <Icon as={LuRuler} color={brandColor} boxSize="24px" strokeWidth="2.5" />
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                            Size Guides
                        </Text>
                    </Flex>
                    <Text color="#888888" fontSize="sm">Define standardized sizing structures for different product types.</Text>
                </Box>
                
                <Button onClick={() => setIsAddModalOpen(true)} bg="#111111" border="1px solid #333333" color="white" h="44px" px={6} rounded="none" _hover={{ bg: "#1A1A1A" }} display="flex" gap={2}>
                    <Icon as={LuPlus} color={brandColor} strokeWidth="2.5" /> Add Size Type
                </Button>
            </Flex>

            {/* --- KPI SECTION --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex justify="space-between" align="start" mb={4}>
                        <Flex boxSize="40px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center">
                            <Icon as={LuLayers} color={brandColor} boxSize="20px" strokeWidth="2.5" />
                        </Flex>
                    </Flex>
                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Total Sizing Standards</Text>
                    <Flex align="baseline" gap={3}>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{sizeTypes.length}</Text>
                    </Flex>
                </Box>
            </SimpleGrid>

            {/* --- SEARCH CONTROL --- */}
            <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6} justify="space-between">
                <Flex flex={1} maxW="500px" align="center" {...controlStyles} bg="#0A0A0A">
                    <Icon as={LuSearch} color={brandColor} mr={2} strokeWidth="2.5" />
                    <Input 
                        placeholder="Search size types by name..." 
                        border="none" color="white" h="full" px={0} 
                        _focus={{ boxShadow: "none", outline: "none" }} 
                        value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                </Flex>
            </Flex>

            {/* --- SIZES TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" overflowX="auto">
                <Box minW="1000px">
                    {/* Table Header */}
                    <Grid templateColumns="1.5fr 3fr 2.5fr 1fr 0.5fr" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Name</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Sizes Included</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Description</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Created</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="center">Actions</Text>
                    </Grid>

                    {/* Table Body */}
                    <VStack align="stretch" gap={0}>
                        {filteredSizeTypes.length > 0 ? (
                            filteredSizeTypes.map((st) => (
                                <Grid 
                                    key={st.id} templateColumns="1.5fr 3fr 2.5fr 1fr 0.5fr" gap={4} px={6} py={4} 
                                    borderBottom="1px solid #1A1A1A" alignItems="center" 
                                    _hover={{ bg: "#111111" }} transition="background 0.2s"
                                >
                                    <Text color="white" fontSize="sm" fontWeight="bold">{st.name}</Text>
                                    
                                    <Flex wrap="wrap" gap={1.5}>
                                        {st.sizes.slice(0, 6).map((size, idx) => (
                                            <Badge key={idx} bg="#111111" color="white" border="1px solid #333333" rounded="none" px={2} py={0.5} fontSize="10px" fontWeight="bold" fontFamily="monospace">
                                                {size}
                                            </Badge>
                                        ))}
                                        {st.sizes.length > 6 && (
                                            <Badge bg="transparent" color="#888888" border="1px dashed #333333" rounded="none" px={2} py={0.5} fontSize="10px" fontWeight="bold">
                                                +{st.sizes.length - 6} more
                                            </Badge>
                                        )}
                                    </Flex>

                                    <Text color="#888888" fontSize="sm"  title={st.description}>
                                        {st.description}
                                    </Text>
                                    
                                    <Text color="white" fontSize="xs" fontWeight="medium">{st.created}</Text>
                                    
                                    <Flex justify="center" gap={1}>
                                        <IconButton 
                                            aria-label="Edit" variant="ghost" size="sm" rounded="none" 
                                            _hover={{ bg: "#1A1A1A" }}
                                            onClick={() => openEditModal(st)}
                                        >
                                            <Icon as={LuPen} boxSize="14px" color={brandColor} />
                                        </IconButton>
                                        <IconButton 
                                            aria-label="Delete" variant="ghost" size="sm" rounded="none" 
                                            _hover={{ bg: "rgba(229, 62, 62, 0.1)" }}
                                            onClick={() => handleDelete(st.id)}
                                        >
                                            <Icon as={LuTrash} boxSize="14px" color="red.400" />
                                        </IconButton>
                                    </Flex>
                                </Grid>
                            ))
                        ) : (
                            <Flex justify="center" align="center" py={12} direction="column" gap={3}>
                                <Icon as={LuSearch} color="#333333" boxSize="32px" />
                                <Text color="#888888" fontSize="sm">No size types found matching your criteria.</Text>
                            </Flex>
                        )}
                    </VStack>
                </Box>
            </Box>

        </Box>
    );
}