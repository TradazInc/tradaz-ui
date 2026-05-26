"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
    Box, Flex, Text, Input, Icon, Grid, VStack, Avatar, IconButton, Button, SimpleGrid 
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuSearch, LuEllipsisVertical, LuUsers, LuX, LuCheck, LuClock, LuBan, LuActivity
} from "react-icons/lu";

// --- INITIAL SHOP DATA ---
const INITIAL_SHOPS = [
    { id: "SHP-001", name: "Urban Kicks NG", owner: "Wada Gift", plan: "Pro Tier", status: "active", gmv: "₦12,500,000", users: 104 },
    { id: "SHP-002", name: "Lagos Streetwear", owner: "Tobi O.", plan: "Basic Tier", status: "pending", gmv: "₦0", users: 100 },
    { id: "SHP-003", name: "Tech Gadgets Pro", owner: "John Doe", plan: "Enterprise", status: "active", gmv: "₦5,100,000", users: 120 },
    { id: "SHP-004", name: "Minimalist Hub", owner: "Sarah Connor", plan: "Pro Tier", status: "suspended", gmv: "₦8,200,000", users: 300 },
];

const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

// --- MANAGE SHOP DRAWER COMPONENT ---
const ManageShopDrawer = ({ 
    shop, onClose, onUpdate 
}: { 
    shop: typeof INITIAL_SHOPS[0] | null; onClose: () => void; onUpdate: (id: string, updates: Partial<typeof INITIAL_SHOPS[0]>) => void 
}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState(shop?.status || "active");
    const [plan, setPlan] = useState(shop?.plan || "Basic Tier");

    React.useEffect(() => {
        if (shop) {
            setStatus(shop.status);
            setPlan(shop.plan);
        }
    }, [shop]);

    if (!shop) return null;

    const handleSaveChanges = () => {
        setIsSaving(true);
        setTimeout(() => {
            onUpdate(shop.id, { status, plan });
            setIsSaving(false);
            onClose();
        }, 600); // Simulate API delay
    };

    return (
        <AnimatePresence>
            {shop && (
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
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Manage Shop</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{shop.name}</Text>
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
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>30-Day GMV</Text>
                                                <Text color="white" fontSize="md" fontWeight="black" fontFamily="monospace">{shop.gmv}</Text>
                                            </Box>
                                            <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Total Users</Text>
                                                <Text color="white" fontSize="md" fontWeight="black">{shop.users} Users</Text>
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
                                            <Text as="label" {...labelStyles}>SaaS Plan Tier</Text>
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
                                        Save Account Changes
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

export default function AdminShopsPage() {
    const router = useRouter();
    
    // --- STATE ---
    const [shops, setShops] = useState(INITIAL_SHOPS);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPlan, setFilterPlan] = useState("all");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    // Drawer State
    const [selectedShop, setSelectedShop] = useState<typeof INITIAL_SHOPS[0] | null>(null);

    // --- HELPER: Parse GMV string to number for accurate sorting ---
    const parseGMV = (gmvString: string) => {
        return Number(gmvString.replace(/[^0-9.-]+/g, ""));
    };

    // --- MUTATION LOGIC ---
    const handleUpdateShop = (id: string, updates: Partial<typeof INITIAL_SHOPS[0]>) => {
        setShops(prev => prev.map(shop => shop.id === id ? { ...shop, ...updates } : shop));
    };

    // --- FILTERING & SORTING LOGIC ---
    const processedShops = useMemo(() => {
        return [...shops].filter(shop => {
            const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  shop.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  shop.id.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === "all" || shop.status === filterStatus;
            const matchesPlan = filterPlan === "all" || shop.plan === filterPlan;

            return matchesSearch && matchesStatus && matchesPlan;
        }).sort((a, b) => {
            let valA: string | number;
            let valB: string | number;

            if (sortBy === "gmv") {
                valA = parseGMV(a.gmv);
                valB = parseGMV(b.gmv);
            } else if (sortBy === "users") {
                valA = a.users;
                valB = b.users;
            } else {
                // default to name
                valA = a.name.toLowerCase();
                valB = b.name.toLowerCase();
            }

            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [shops, searchQuery, filterStatus, filterPlan, sortBy, sortOrder]);

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
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Registered Shops</Text>
                        <Text color="#888888" fontSize="sm">Monitor tenant health, subscription plans, and user counts.</Text>
                    </Box>
                </Flex>
            </Box>

            {/* --- FILTERS & SEARCH TOOLBAR --- */}
            <Flex gap={3} mb={6} direction={{ base: "column", xl: "row" }} w="full">
                <Flex flex={1} align="center" bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" px={4} h="44px" _focusWithin={{ borderColor: "white" }}>
                    <Icon as={LuSearch} color="#888888" strokeWidth="2.5" />
                    <Input 
                        placeholder="Search by shop name, owner, or ID..." border="none" color="white" h="full" px={2}
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
                            <option value="users" style={{ background: "#0A0A0A" }}>Sort by Users</option>
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

            {/* --- GLOBAL SHOPS GRID --- */}
            {processedShops.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" bg="#0A0A0A" border="1px dashed #1A1A1A" rounded="none">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No shops match your criteria.</Text>
                </Flex>
            ) : (
                <VStack align="stretch" gap={3}>
                    
                    {/* Desktop Table Headers */}
                    <Grid templateColumns="2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Shop / Tenant</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Owner</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">SaaS Plan</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Users</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">30-Day GMV</Text>
                        <Text></Text>
                    </Grid>

                    {/* Table Rows */}
                    {processedShops.map((shop) => {
                        const isActive = shop.status === 'active';
                        const isPending = shop.status === 'pending';
                        const statusProps = getStatusIconProps(shop.status);

                        return (
                            <Grid 
                                key={shop.id} 
                                templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr", xl: "2fr 1.5fr 1fr 1fr 1fr 1.5fr 50px" }} 
                                gap={4} p={4} bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A"
                                alignItems="center" cursor="pointer" transition="all 0.2s"
                                _hover={{ bg: "#111111", borderColor: "#333333" }}
                                onClick={() => router.push(`/admin/shops/${shop.id}`)}
                            >
                                {/* Shop Info */}
                                <Flex align="center" gap={4}>
                                    <Avatar.Root size="md" rounded="full">
                                        <Avatar.Fallback name={shop.name} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="bold" />
                                    </Avatar.Root>
                                    <Box overflow="hidden">
                                        <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1} letterSpacing="tight">{shop.name}</Text>
                                        <Text color="#888888" fontSize="xs" lineClamp={1} fontFamily="monospace" mt={0.5}>ID: {shop.id}</Text>
                                    </Box>
                                </Flex>

                                {/* Owner */}
                                <Text color="#888888" fontSize="sm" fontWeight="bold" display={{ base: "none", md: "block" }}>
                                    {shop.owner}
                                </Text>

                                {/* Status */}
                                <Box display={{ base: "none", md: "block" }}>
                                    <Flex align="center" gap={2}>
                                        <Box boxSize="6px" rounded="none" bg={isActive ? "#5cac7d" : isPending ? "orange.400" : "red.400"} />
                                        <Text color={isActive ? "white" : "#888888"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                            {shop.status}
                                        </Text>
                                    </Flex>
                                </Box>

                                {/* Master SaaS Plan */}
                                <Text color="#888888" fontWeight="bold" fontSize="10px" textTransform="uppercase" letterSpacing="wider" display={{ base: "none", xl: "block" }}>
                                    {shop.plan}
                                </Text>
                                
                                {/* Staff Count */}
                                <Flex align="center" gap={2} display={{ base: "none", xl: "flex" }}>
                                    <Icon as={LuUsers} color="#5cac7d" strokeWidth="2.5" />
                                    <Text color="white" fontWeight="bold" fontSize="sm">{shop.users}</Text>
                                </Flex>

                                {/* GMV */}
                                <Text color="white" fontWeight="black" fontSize="sm" display={{ base: "none", xl: "block" }} textAlign="right" letterSpacing="tight" fontFamily="monospace">
                                    {shop.gmv}
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
                                            setSelectedShop(shop);
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

            {/* Mount Drawer Component */}
            <ManageShopDrawer 
                shop={selectedShop} 
                onClose={() => setSelectedShop(null)} 
                onUpdate={handleUpdateShop} 
            />
        </Box>
    );
}