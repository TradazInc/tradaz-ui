"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton, Avatar, AvatarGroup, VStack, Badge } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LuSearch, LuRefreshCw, LuStore, LuCheck,
    LuBan, LuClock, LuMail, LuSend, LuEye, LuX, LuUser, LuBox, LuTrendingUp
} from "react-icons/lu";

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

export interface VendorRecord {
    id: string;
    businessName: string;
    contactName: string;
    email: string;
    productsCount: number;
    totalSales: number;
    status: "Active" | "Pending Invite" | "Suspended";
    joinedDate: string;
}

// Simulated Database
const INITIAL_VENDORS: VendorRecord[] = [
    { id: "VND-001", businessName: "AO Leather", contactName: "Aba O.", email: "david@nyashii.com", productsCount: 45, totalSales: 1250000, status: "Active", joinedDate: "Jan 12, 2025" },
    { id: "VND-002", businessName: "Luxe Shoes", contactName: "Bello K.", email: "hello@luxeshoes.ng", productsCount: 12, totalSales: 450000, status: "Active", joinedDate: "Feb 05, 2025" },
    { id: "VND-003", businessName: "Dap Threads", contactName: "Michael B.", email: "mike@urbanthreads.co", productsCount: 0, totalSales: 0, status: "Pending Invite", joinedDate: "Apr 28, 2026" },
    { id: "VND-004", businessName: "Sharp Kicks", contactName: "John D.", email: "john@shadykicks.com", productsCount: 3, totalSales: 15000, status: "Suspended", joinedDate: "Mar 10, 2025" },
    { id: "VND-005", businessName: "Bee Boutique", contactName: "Bella W.", email: "admin@boutiquebella.com", productsCount: 0, totalSales: 0, status: "Pending Invite", joinedDate: "Apr 25, 2026" },
];

const TABS_CONFIG = [
    { id: "All", label: "All Vendors" },
    { id: "Active", label: "Active" },
    { id: "Pending Invite", label: "Pending Invites" },
    { id: "Suspended", label: "Suspended" },
];

// --- VIEW VENDOR MODAL COMPONENT ---
const ViewVendorModal = ({ vendor, onClose }: { vendor: VendorRecord | null; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {vendor && (
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
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Vendor Profile</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{vendor.businessName}</Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        
                                        {/* Status & ID */}
                                        <Flex justify="space-between" align="center" bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Box>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Vendor ID</Text>
                                                <Text color="white" fontSize="sm" fontFamily="monospace">{vendor.id}</Text>
                                            </Box>
                                            <Badge colorScheme={vendor.status === "Active" ? "green" : vendor.status === "Suspended" ? "red" : "orange"} px={3} py={1} rounded="none">
                                                {vendor.status}
                                            </Badge>
                                        </Flex>

                                        {/* Contact Information */}
                                        <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Text {...labelStyles} mb={4}>Contact Information</Text>
                                            <Flex align="center" gap={3} mb={4}>
                                                <Icon as={LuUser} color="#888888" boxSize="18px" />
                                                <Box>
                                                    <Text color="#888888" fontSize="xs">Point of Contact</Text>
                                                    <Text color="white" fontWeight="bold">{vendor.contactName}</Text>
                                                </Box>
                                            </Flex>
                                            <Flex align="center" gap={3}>
                                                <Icon as={LuMail} color="#888888" boxSize="18px" />
                                                <Box>
                                                    <Text color="#888888" fontSize="xs">Email Address</Text>
                                                    <Text color="white" fontWeight="bold">{vendor.email}</Text>
                                                </Box>
                                            </Flex>
                                        </Box>

                                        {/* Performance Stats */}
                                        <Box>
                                            <Text {...labelStyles}>Performance Overview</Text>
                                            <SimpleGrid columns={2} gap={4}>
                                                <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                    <Icon as={LuBox} color="blue.400" boxSize="20px" mb={2} />
                                                    <Text color="#888888" fontSize="xs" mb={1}>Active Products</Text>
                                                    <Text color="white" fontSize="2xl" fontWeight="black">{vendor.productsCount}</Text>
                                                </Box>
                                                <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                    <Icon as={LuTrendingUp} color="#5cac7d" boxSize="20px" mb={2} />
                                                    <Text color="#888888" fontSize="xs" mb={1}>Gross Sales</Text>
                                                    <Text color="white" fontSize="xl" fontWeight="black">₦{vendor.totalSales.toLocaleString()}</Text>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>
                                        
                                        <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Joined Date</Text>
                                            <Text color="white" fontSize="sm">{vendor.status === "Pending Invite" ? "Awaiting Acceptance" : vendor.joinedDate}</Text>
                                        </Box>

                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Button w="full" bg="white" color="black" rounded="none" fontWeight="bold" onClick={onClose} _hover={{ bg: "#E5E5E5" }}>
                                        Close Profile
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

// --- INVITE VENDOR MODAL COMPONENT ---
const InviteVendorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ contactName: '', email: '', businessName: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendInvite = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert(`Invite sent to ${formData.email}!`);
            setFormData({ contactName: '', email: '', businessName: '' });
            onClose();
        }, 800);
    };

    return (
        <AnimatePresence>
            {isOpen && (
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
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Vendor Onboarding</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">Invite New Vendor</Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box>
                                            <Text as="label" {...labelStyles}>Contact Name <Text as="span" color="red.400">*</Text></Text>
                                            <Input name="contactName" value={formData.contactName} onChange={handleChange} placeholder="e.g. John Doe" {...inputStyles} />
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>Email Address <Text as="span" color="red.400">*</Text></Text>
                                            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. john@business.com" {...inputStyles} />
                                            <Text color="#555555" fontSize="10px" mt={1.5}> We will send the onboarding link to this address.</Text>
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>Business Name (Optional)</Text>
                                            <Input name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g. Sharp Kicks Ltd." {...inputStyles} />
                                        </Box>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSendInvite} 
                                        disabled={!formData.contactName || !formData.email || isLoading}
                                        _hover={{ bg: "#E5E5E5" }} 
                                        _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "#333333", color: "#888888" }} 
                                        transition="all 0.2s ease"
                                    >
                                        {isLoading ? "Sending..." : "Send Invite"}
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

export default function Page() {
    const [vendors] = useState<VendorRecord[]>(INITIAL_VENDORS);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    
    // Modal & Button States
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [viewingVendor, setViewingVendor] = useState<VendorRecord | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [resendingId, setResendingId] = useState<string | null>(null);

    // --- ACTIONS ---
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setSearchQuery("");
            setActiveTab("All");
            setIsRefreshing(false);
        }, 600);
    };

    const handleResend = (id: string) => {
        setResendingId(id);
        setTimeout(() => {
            setResendingId(null);
            // In a real app, this triggers a toast notification
        }, 800);
    };

    // --- FILTER LOGIC ---
    const visibleItems = vendors.filter(vendor => {
        const matchesSearch = vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) || vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeTab === "All" || vendor.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    // --- DYNAMIC COUNTS ---
    const dynamicTabs = TABS_CONFIG.map(tab => ({
        ...tab,
        count: tab.id === "All" ? vendors.length : vendors.filter(v => v.status === tab.id).length
    }));
    const totalVendors = vendors.length;
    const activeCount = vendors.filter(v => v.status === "Active").length;
    const pendingCount = vendors.filter(v => v.status === "Pending Invite").length;
    const suspendedCount = vendors.filter(v => v.status === "Suspended").length;

    const getStatusIconProps = (status: string) => {
        switch(status) {
            case "Active": return { icon: LuCheck, color: "#5cac7d" };
            case "Pending Invite": return { icon: LuClock, color: "orange.400" };
            case "Suspended": return { icon: LuBan, color: "red.400" };
            default: return { icon: LuStore, color: "#888888" };
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000" minH="100vh">
            
            {/* Header */}
            <Flex justify="space-between" align="flex-start" mb={6} wrap="wrap" gap={4} pt={2} px={{ base: 4, lg: 8 }}>
                <Box>
                    <Flex align="center" gap={3} mb={1}>
                        <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">Vendor Directory</Text>
                        <Button 
                            onClick={handleRefresh}
                            loading={isRefreshing}
                            loadingText="Refreshing..."
                            size="sm" variant="ghost" color="#888888" border="1px solid #1A1A1A" rounded="none" _hover={{ color: "white", bg: "#111111" }}
                        >
                            <Icon as={LuRefreshCw} mr={2} strokeWidth="2.5" /> Refresh
                        </Button>
                    </Flex>
                    <Text color="#888888" fontSize="sm">Manage your partner network, track performance, and onboard new vendors.</Text>
                </Box>
                
                {/* SEND INVITE BUTTON */}
                <Button onClick={() => setIsInviteModalOpen(true)} bg="white" color="black" h="44px" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }} border="none" px={6}>
                    <Icon as={LuSend} mr={2} strokeWidth="2.5" /> Invite Vendor
                </Button>
            </Flex>

            <Box px={{ base: 4, lg: 8 }}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
                    <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                        <Flex justify="space-between" align="flex-start" mb={2}>
                            <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Vendors</Text>
                            <Icon as={LuStore} color="blue.400" boxSize="18px" strokeWidth="2.5" />
                        </Flex>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">{totalVendors}</Text>
                    </Box>
                    <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                        <Flex justify="space-between" align="flex-start" mb={2}>
                            <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active</Text>
                            <Icon as={LuCheck} color="#5cac7d" boxSize="18px" strokeWidth="2.5" />
                        </Flex>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">{activeCount}</Text>
                    </Box>
                    <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                        <Flex justify="space-between" align="flex-start" mb={2}>
                            <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Invites</Text>
                            <Icon as={LuClock} color="orange.400" boxSize="18px" strokeWidth="2.5" />
                        </Flex>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">{pendingCount}</Text>
                    </Box>
                    <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                        <Flex justify="space-between" align="flex-start" mb={2}>
                            <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Suspended</Text>
                            <Icon as={LuBan} color="red.400" boxSize="18px" strokeWidth="2.5" />
                        </Flex>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">{suspendedCount}</Text>
                    </Box>
                </SimpleGrid>

                <Flex borderBottom="1px solid #1A1A1A" mb={6} overflowX="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                    {dynamicTabs.map((tab) => (
                        <Box 
                            key={tab.id}
                            px={4} py={3} cursor="pointer"
                            borderBottom="2px solid"
                            borderColor={activeTab === tab.id ? "white" : "transparent"}
                            onClick={() => setActiveTab(tab.id)}
                            _hover={{ color: "white" }}
                            transition="all 0.2s"
                        >
                            <Text fontSize="sm" fontWeight={activeTab === tab.id ? "bold" : "500"} color={activeTab === tab.id ? "white" : "#888888"} whiteSpace="nowrap">
                                {tab.label} ({tab.count})
                            </Text>
                        </Box>
                    ))}
                </Flex>

                {/* Search Bar */}
                <Flex align="center" {...controlStyles} mb={6} bg="#0A0A0A" w={{ base: "full", md: "400px" }}>
                    <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                    <Input placeholder="Search vendors or emails..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} px={0} w="full" />
                </Flex>

                {/* Vendor Table */}
                {visibleItems.length === 0 ? (
                    <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
                        <Text color="#888888" fontSize="lg" fontWeight="bold">No vendors found.</Text>
                    </Flex>
                ) : (
                    <Box bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#1A1A1A', borderRadius: '0px' } }}>
                        <Box as="table" w="full" minW="1000px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                            <Box as="thead" bg="#111111" borderBottom="1px solid #1A1A1A">
                                <Box as="tr">
                                    {["Vendor Details", "Contact Info", "Performance", "Joined", "Status", "Actions"].map((head) => (
                                        <Box as="th" key={head} py={4} px={6} color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box as="tbody">
                                {visibleItems.map((vendor) => {
                                    const statusProps = getStatusIconProps(vendor.status);
                                    const isResending = resendingId === vendor.id;

                                    return (
                                        <Box as="tr" key={vendor.id} borderBottom="1px solid #1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s" opacity={vendor.status === "Suspended" ? 0.6 : 1}>
                                            
                                            {/* Vendor Details */}
                                            <Box as="td" py={4} px={6}>
                                                <Flex align="center" gap={3}>
                                                    <AvatarGroup>
                                                        <Avatar.Root size="sm" rounded="full" border="1px solid #333333">
                                                            <Avatar.Fallback bg="#111111" color="white" rounded="none" fontSize="10px" fontWeight="bold">
                                                                {vendor.businessName.substring(0, 2).toUpperCase()}
                                                            </Avatar.Fallback>
                                                        </Avatar.Root>
                                                    </AvatarGroup>
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold" textDecoration={vendor.status === "Suspended" ? "line-through" : "none"}>{vendor.businessName}</Text>
                                                        <Text color="gray.500" fontSize="xs" fontFamily="monospace" mt={0.5}>{vendor.id}</Text>
                                                    </Box>
                                                </Flex>
                                            </Box>

                                            {/* Contact Info */}
                                            <Box as="td" py={4} px={6}>
                                                <Text color="white" fontSize="sm" fontWeight="500">{vendor.contactName}</Text>
                                                <Flex align="center" gap={1.5} mt={0.5} color="gray.500">
                                                    <Icon as={LuMail} boxSize="12px" />
                                                    <Text fontSize="xs">{vendor.email}</Text>
                                                </Flex>
                                            </Box>

                                            {/* Performance */}
                                            <Box as="td" py={4} px={6}>
                                                <Text color="white" fontSize="sm" fontWeight="bold">₦{vendor.totalSales.toLocaleString()}</Text>
                                                <Text color="gray.500" fontSize="xs" mt={0.5}>{vendor.productsCount} active products</Text>
                                            </Box>

                                            {/* Joined */}
                                            <Box as="td" py={4} px={6}>
                                                <Text color="gray.400" fontSize="sm">{vendor.status === "Pending Invite" ? "—" : vendor.joinedDate}</Text>
                                            </Box>

                                            {/* Status */}
                                            <Box as="td" py={4} px={6}>
                                                <Flex align="center" gap={1.5} bg="#111111" color="white" px={2} py={0.5} border="1px solid #333333" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" display="inline-flex">
                                                    <Icon as={statusProps.icon} color={statusProps.color} boxSize="12px" strokeWidth="3" />
                                                    {vendor.status}
                                                </Flex>
                                            </Box>
                                            
                                            {/* Actions */}
                                            <Box as="td" py={4} px={6}>
                                                <Flex gap={2} align="center">
                                                    {vendor.status === "Pending Invite" ? (
                                                        <Button 
                                                            onClick={() => handleResend(vendor.id)}
                                                            loading={isResending}
                                                            loadingText="Sending..."
                                                            size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}
                                                        >
                                                            {!isResending && <><Icon as={LuSend} mr={1.5} /> Resend</>}
                                                        </Button>
                                                    ) : (
                                                        <Button 
                                                            onClick={() => setViewingVendor(vendor)}
                                                            size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}
                                                        >
                                                            <Icon as={LuEye} mr={1.5} /> View
                                                        </Button>
                                                    )}
                                                </Flex>
                                            </Box>

                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Mount the Modals */}
            <InviteVendorModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
            <ViewVendorModal vendor={viewingVendor} onClose={() => setViewingVendor(null)} />
        </Box>
    );
}