
"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
    Box, Flex, Text, Input, Icon, Grid, VStack, Avatar, IconButton, Button, SimpleGrid 
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuSearch, LuEllipsisVertical, LuBuilding2, LuX, LuCheck, LuClock, LuBan, LuActivity
} from "react-icons/lu";

// --- MOCK PARENT BUSINESS DATA ---
const INITIAL_BUSINESSES = [
    { id: "BIZ-901", name: "Wada Group Ltd.", owner: "Wada Gift", plan: "Enterprise", status: "active", totalGmv: "₦45,500,000", shopCount: 3 },
    { id: "BIZ-902", name: "Connor Retail Holdings", owner: "Sarah Connor", plan: "Pro Tier", status: "active", totalGmv: "₦8,200,000", shopCount: 1 },
    { id: "BIZ-903", name: "TechNova Inc.", owner: "John Doe", plan: "Basic Tier", status: "pending", totalGmv: "₦0", shopCount: 1 },
    { id: "BIZ-904", name: "Lagos Streetwear Co.", owner: "Tobi O.", plan: "Pro Tier", status: "suspended", totalGmv: "₦12,400,000", shopCount: 2 },
];

const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

// --- MANAGE BUSINESS DRAWER COMPONENT ---
const ManageBusinessDrawer = ({ 
    business, onClose, onUpdate 
}: { 
    business: typeof INITIAL_BUSINESSES[0] | null; onClose: () => void; onUpdate: (id: string, updates: Partial<typeof INITIAL_BUSINESSES[0]>) => void 
}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState(business?.status || "active");
    const [plan, setPlan] = useState(business?.plan || "Basic Tier");

    React.useEffect(() => {
        if (business) {
            setStatus(business.status);
            setPlan(business.plan);
        }
    }, [business]);

    if (!business) return null;

    const handleSaveChanges = () => {
        setIsSaving(true);
        setTimeout(() => {
            onUpdate(business.id, { status, plan });
            setIsSaving(false);
            onClose();
        }, 600); // Simulate API delay
    };

    return (
        <AnimatePresence>
            {business && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Manage Tenant</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{business.name}</Text>
                                    </Box>
                                    <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        
                                        {/* Financial Summary Info */}
                                        <SimpleGrid columns={2} gap={4}>
                                            <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Aggregated GMV</Text>
                                                <Text color="white" fontSize="md" fontWeight="black" fontFamily="monospace">{business.totalGmv}</Text>
                                            </Box>
                                            <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Active Outlets</Text>
                                                <Text color="white" fontSize="md" fontWeight="black">{business.shopCount} Shops</Text>
                                            </Box>
                                        </SimpleGrid>

                                        {/* Account Status Configuration */}
                                        <Box>
                                            <Text as="label" {...labelStyles}>Operational Status</Text>
                                            <select value={status} onChange={(e) => setStatus(e.target.value)} style={nativeSelectStyle}>
                                                <option value="active">Active</option>
                                                <option value="pending">Pending Review</option>
                                                <option value="suspended">Suspended</option>
                                            </select>
                                        </Box>

                                        {/* Subscription Plan Tier Assignment */}
                                        <Box>
                                            <Text as="label" {...labelStyles}>Master Plan Tier</Text>
                                            <select value={plan} onChange={(e) => setPlan(e.target.value)} style={nativeSelectStyle}>
                                                <option value="Basic Tier">Basic Tier</option>
                                                <option value="Pro Tier">Pro Tier</option>
                                                <option value="Enterprise">Enterprise</option>
                                            </select>
                                        </Box>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSaveChanges} loading={isSaving} loadingText="Saving..." _hover={{ bg: "#E5E5E5" }}>
                                        Save Changes
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

export default function AdminBusinessesPage() {
    const router = useRouter();
    
    // --- STATE ---
    const [businesses, setBusinesses] = useState(INITIAL_BUSINESSES);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPlan, setFilterPlan] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    // Drawer State
    const [selectedBusiness, setSelectedBusiness] = useState<typeof INITIAL_BUSINESSES[0] | null>(null);

    // --- HELPER: Parse GMV string to number for accurate sorting ---
    const parseGMV = (gmvString: string) => {
        return Number(gmvString.replace(/[^0-9.-]+/g, ""));
    };

    // --- MUTATION LOGIC ---
    const handleUpdateBusiness = (id: string, updates: Partial<typeof INITIAL_BUSINESSES[0]>) => {
        setBusinesses(prev => prev.map(biz => biz.id === id ? { ...biz, ...updates } : biz));
    };

    // --- FILTERING & SORTING LOGIC ---
    const processedBusinesses = useMemo(() => {
        return [...businesses].filter(biz => {
            const matchesSearch = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  biz.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  biz.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === "all" || biz.status === filterStatus;
            const matchesPlan = filterPlan === "all" || biz.plan === filterPlan;

            return matchesSearch && matchesStatus && matchesPlan;
        }).sort((a, b) => {
            let valA: string | number;
            let valB: string | number;

            if (sortBy === "gmv") {
                valA = parseGMV(a.totalGmv);
                valB = parseGMV(b.totalGmv);
            } else if (sortBy === "shops") {
                valA = a.shopCount;
                valB = b.shopCount;
            } else {
                valA = a.name.toLowerCase();
                valB = b.name.toLowerCase();
            }

            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [businesses, searchQuery, filterStatus, filterPlan, sortBy, sortOrder]);

    const getStatusIconProps = (status: string) => {
        switch(status) {
            case "active": return { icon: LuCheck, color: "#5cac7d" };
            case "pending": return { icon: LuClock, color: "orange.400" };
            case "suspended": return { icon: LuBan, color: "red.400" };
            default: return { icon: LuActivity, color: "#888888" };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease" position="relative" bg="#000000" minH="100vh">
            
            {/* --- STICKY HEADER --- */}
            <Box 
                position="sticky" top={{ base: "-16px", lg: "-32px" }} mx={{ base: "-16px", lg: "-32px" }} px={{ base: "16px", lg: "32px" }}
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={8} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
                    <Box>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Parent Businesses</Text>
                        <Text color="#888888" fontSize="sm">Manage master tenant accounts, their aggregated GMV, and total shops.</Text>
                    </Box>
                </Flex>
            </Box>

            {/* --- FILTERS & SEARCH TOOLBAR --- */}
            <Flex gap={3} mb={6} direction={{ base: "column", xl: "row" }} w="full">
                <Flex flex={1} align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} h="44px" _focusWithin={{ borderColor: "white" }}>
                    <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                    <Input 
                        placeholder="Search by business name, owner, or ID..." border="none" color="white" h="full" px={2}
                        _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>
                
                <Flex gap={3} w={{ base: "full", xl: "auto" }} wrap="wrap">
                    <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={nativeSelectStyle}>
                            <option value="all" style={{ background: "#0A0A0A" }}>All Statuses</option>
                            <option value="active" style={{ background: "#0A0A0A" }}>Active</option>
                            <option value="pending" style={{ background: "#0A0A0A" }}>Pending</option>
                            <option value="suspended" style={{ background: "#0A0A0A" }}>Suspended</option>
                        </select>
                    </Box>
                    <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                        <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)} style={nativeSelectStyle}>
                            <option value="all" style={{ background: "#0A0A0A" }}>All Plans</option>
                            <option value="Basic Tier" style={{ background: "#0A0A0A" }}>Basic</option>
                            <option value="Pro Tier" style={{ background: "#0A0A0A" }}>Pro</option>
                            <option value="Enterprise" style={{ background: "#0A0A0A" }}>Enterprise</option>
                        </select>
                    </Box>
                    <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={nativeSelectStyle}>
                            <option value="name" style={{ background: "#0A0A0A" }}>Sort by Name</option>
                            <option value="shops" style={{ background: "#0A0A0A" }}>Sort by Shops</option>
                            <option value="gmv" style={{ background: "#0A0A0A" }}>Sort by GMV</option>
                        </select>
                    </Box>
                    <Box flex={{ base: 1, md: "initial" }} w={{ md: "140px" }}>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={nativeSelectStyle}>
                            <option value="asc" style={{ background: "#0A0A0A" }}>Ascending</option>
                            <option value="desc" style={{ background: "#0A0A0A" }}>Descending</option>
                        </select>
                    </Box>
                </Flex>
            </Flex>

            {/* --- GLOBAL BUSINESSES GRID --- */}
            {processedBusinesses.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" bg="#0A0A0A" border="1px dashed #1A1A1A" rounded="none">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No businesses match your criteria.</Text>
                </Flex>
            ) : (
                <VStack align="stretch" gap={3}>
                    
                    {/* Desktop Table Headers */}
                    <Grid templateColumns="2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Business Entity</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Primary Owner</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active Shops</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Master Plan</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Aggregated GMV</Text>
                        <Text></Text>
                    </Grid>

                    {/* Table Rows */}
                    {processedBusinesses.map((biz) => {
                        const statusProps = getStatusIconProps(biz.status);

                        return (
                            <Grid 
                                key={biz.id} 
                                templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr", xl: "2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" }} 
                                gap={4} p={4} bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A"
                                alignItems="center" cursor="pointer" transition="all 0.2s"
                                _hover={{ bg: "#111111", borderColor: "#333333" }}
                                onClick={() => router.push(`/admin/businesses/${biz.id}`)}
                            >
                                {/* Business Info */}
                                <Flex align="center" gap={4}>
                                    <Avatar.Root size="md" rounded="full">
                                        <Avatar.Fallback name={biz.name} bg="#111111" border="1px solid #333333" color="white" rounded="full" fontWeight="bold" />
                                    </Avatar.Root>
                                    <Box overflow="hidden">
                                        <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1} letterSpacing="tight">{biz.name}</Text>
                                        <Text color="#888888" fontSize="xs" lineClamp={1} fontFamily="monospace" mt={0.5}>ID: {biz.id}</Text>
                                    </Box>
                                </Flex>

                                {/* Owner */}
                                <Text color="#888888" fontSize="sm" fontWeight="bold" display={{ base: "none", md: "block" }}>
                                    {biz.owner}
                                </Text>

                                {/* Status */}
                                <Box display={{ base: "none", md: "block" }}>
                                    <Flex align="center" gap={1.5} bg="#111111" color="white" px={2.5} py={1} border="1px solid #333333" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" display="inline-flex">
                                        <Icon as={statusProps.icon} color={statusProps.color} boxSize="12px" strokeWidth="3" />
                                        {biz.status}
                                    </Flex>
                                </Box>

                                {/* Active Shops Count */}
                                <Flex align="center" gap={2} display={{ base: "none", xl: "flex" }}>
                                    <Icon as={LuBuilding2} color="#5cac7d" strokeWidth="2.5" />
                                    <Text color="white" fontWeight="bold" fontSize="sm">{biz.shopCount} <Text as="span" fontWeight="normal" color="#888888">Shops</Text></Text>
                                </Flex>

                                {/* Master SaaS Plan */}
                                <Text color="#888888" fontWeight="bold" fontSize="10px" textTransform="uppercase" letterSpacing="wider" display={{ base: "none", xl: "block" }}>
                                    {biz.plan}
                                </Text>
                                
                                {/* Aggregated GMV */}
                                <Text color="white" fontWeight="black" fontSize="sm" display={{ base: "none", xl: "block" }} textAlign="right" letterSpacing="tight" fontFamily="monospace">
                                    {biz.totalGmv}
                                </Text>

                                {/* Action Menu Trigger */}
                                <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                    <IconButton
                                        aria-label="Manage Account"
                                        variant="ghost"
                                        size="sm"
                                        color="#888888"
                                        _hover={{ color: "white", bg: "#1A1A1A" }}
                                        rounded="none"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents layout navigation routing
                                            setSelectedBusiness(biz);
                                        }}
                                    >
                                        <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>
                            </Grid>
                        );
                    })}
                </VStack>
            )}

            {/* --- Mount Modal --- */}
            <ManageBusinessDrawer 
                business={selectedBusiness} 
                onClose={() => setSelectedBusiness(null)} 
                onUpdate={handleUpdateBusiness} 
            />
        </Box>
    );
}

