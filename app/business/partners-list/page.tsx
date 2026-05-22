
"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton, Avatar, Grid, VStack, Badge } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LuSearch, LuRefreshCw, LuStore, LuCheck,
    LuBan, LuClock, LuMail, LuSend, LuEye, LuEllipsisVertical, LuX, LuBox, LuBanknote
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };
const brandColor = "#5cac7d";

export interface PartnerRecord {
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
const MOCK_PARTNERS: PartnerRecord[] = [
    { id: "PTN-001", businessName: "AO Leather", contactName: "Aba O.", email: "david@nyashii.com", productsCount: 45, totalSales: 1250000, status: "Active", joinedDate: "Jan 12, 2025" },
    { id: "PTN-002", businessName: "Luxe Shoes", contactName: "Bello K.", email: "hello@luxeshoes.ng", productsCount: 12, totalSales: 450000, status: "Active", joinedDate: "Feb 05, 2025" },
    { id: "PTN-003", businessName: "Dap Threads", contactName: "Michael B.", email: "mike@urbanthreads.co", productsCount: 0, totalSales: 0, status: "Pending Invite", joinedDate: "Apr 28, 2026" },
    { id: "PTN-004", businessName: "Sharp Kicks", contactName: "John D.", email: "john@shadykicks.com", productsCount: 3, totalSales: 15000, status: "Suspended", joinedDate: "Mar 10, 2025" },
    { id: "PTN-005", businessName: "Bee Boutique", contactName: "Bella W.", email: "admin@boutiquebella.com", productsCount: 0, totalSales: 0, status: "Pending Invite", joinedDate: "Apr 25, 2026" },
];

const TABS = [
    { id: "All", label: "All Partners", count: 5 },
    { id: "Active", label: "Active", count: 2 },
    { id: "Pending Invite", label: "Pending Invites", count: 2 },
    { id: "Suspended", label: "Suspended", count: 1 },
];

// --- VIEW PARTNER MODAL COMPONENT ---
const ViewPartnerModal = ({ partner, onClose }: { partner: PartnerRecord | null; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {partner && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />

                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
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
                                            Partner Details
                                        </Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">
                                            {partner.businessName}
                                        </Text>
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
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Partner ID</Text>
                                                <Text color="white" fontSize="sm" fontFamily="monospace">{partner.id}</Text>
                                            </Box>
                                            <Badge colorScheme={partner.status === "Active" ? "green" : partner.status === "Suspended" ? "red" : "orange"} px={3} py={1} rounded="none">
                                                {partner.status}
                                            </Badge>
                                        </Flex>

                                        {/* Contact Information */}
                                        <Box>
                                            <Text {...labelStyles}>Contact Information</Text>
                                            <VStack align="stretch" gap={4} bg="#111111" p={4} border="1px solid #1A1A1A">
                                                <Box>
                                                    <Text color="#888888" fontSize="xs" mb={1}>Full Name</Text>
                                                    <Text color="white" fontWeight="bold">{partner.contactName}</Text>
                                                </Box>
                                                <Box>
                                                    <Text color="#888888" fontSize="xs" mb={1}>Email Address</Text>
                                                    <Flex align="center" gap={2}>
                                                        <Icon as={LuMail} color="#888888" />
                                                        <Text color="white" fontWeight="bold">{partner.email}</Text>
                                                    </Flex>
                                                </Box>
                                                <Box>
                                                    <Text color="#888888" fontSize="xs" mb={1}>Joined Date</Text>
                                                    <Text color="white" fontWeight="bold">{partner.joinedDate}</Text>
                                                </Box>
                                            </VStack>
                                        </Box>

                                        {/* Performance Stats */}
                                        <Box>
                                            <Text {...labelStyles}>Performance Overview</Text>
                                            <SimpleGrid columns={2} gap={4}>
                                                <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                    <Icon as={LuBox} color={brandColor} boxSize="20px" mb={2} />
                                                    <Text color="#888888" fontSize="xs" mb={1}>Products Listed</Text>
                                                    <Text color="white" fontSize="2xl" fontWeight="black">{partner.productsCount}</Text>
                                                </Box>
                                                <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                                    <Icon as={LuBanknote} color="blue.400" boxSize="20px" mb={2} />
                                                    <Text color="#888888" fontSize="xs" mb={1}>Total Sales</Text>
                                                    <Text color="white" fontSize="2xl" fontWeight="black">₦{partner.totalSales.toLocaleString()}</Text>
                                                </Box>
                                            </SimpleGrid>
                                        </Box>

                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                  
                                </Flex>

                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};

// --- INVITE PARTNER MODAL COMPONENT ---
const InvitePartnerModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />

                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
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
                                            Partner Onboarding
                                        </Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">
                                            Invite New Partner
                                        </Text>
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
                                            <Text color="#555555" fontSize="10px" mt={1.5} fontFamily="monospace">We will send the onboarding link to this address.</Text>
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
                                        disabled={!formData.contactName || !formData.email}
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


export default function PartnersListPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("All");
    
    // Modals State
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [viewingPartner, setViewingPartner] = useState<PartnerRecord | null>(null); // State for View Modal

    // Filter Logic
    const visibleItems = MOCK_PARTNERS.filter(partner => {
        const matchesSearch = partner.businessName.toLowerCase().includes(searchQuery.toLowerCase()) || partner.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = activeTab === "All" || partner.status === activeTab;
        return matchesSearch && matchesStatus;
    });

    const getStatusIconProps = (status: string) => {
        switch(status) {
            case "Active": return { icon: LuCheck, color: "#5cac7d" };
            case "Pending Invite": return { icon: LuClock, color: "orange.400" };
            case "Suspended": return { icon: LuBan, color: "red.400" };
            default: return { icon: LuStore, color: "#888888" };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease" position="relative" bg="#000000" minH="100vh">
            
            {/* PAGE HEADER  */}
            <Box pt={2} mb={8}>
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
                    <Box>
                        <Flex align="center" gap={3} mb={1}>
                            <Text color="white" fontWeight="black" fontSize="3xl" letterSpacing="tight">Partner Directory</Text>
                            <Button size="sm" variant="ghost" color="#888888" border="1px solid #1A1A1A" rounded="none" _hover={{ color: "white", bg: "#111111" }} h="32px">
                                <Icon as={LuRefreshCw} mr={2} strokeWidth="2.5" /> Refresh
                            </Button>
                        </Flex>
                        <Text color="#888888" fontSize="sm">Manage your partner network, track performance, and onboard new vendors.</Text>
                    </Box>
                    <Button onClick={() => setIsInviteModalOpen(true)} bg="white" color="black" h="44px" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }} border="none" px={6}>
                        <Icon as={LuSend} mr={2} strokeWidth="2.5" /> Invite Partner
                    </Button>
                </Flex>
            </Box>

            {/* KPI CARDS (Non-Sticky) */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Partners</Text>
                        <Icon as={LuStore} color="blue.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">5</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active</Text>
                        <Icon as={LuCheck} color="#5cac7d" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">2</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Invites</Text>
                        <Icon as={LuClock} color="orange.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">2</Text>
                </Box>
                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
                    <Flex justify="space-between" align="flex-start" mb={2}>
                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Suspended</Text>
                        <Icon as={LuBan} color="red.400" boxSize="18px" strokeWidth="2.5" />
                    </Flex>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">1</Text>
                </Box>
            </SimpleGrid>

            {/* STICKY TABS & SEARCH BAR */}
            <Box
                position="sticky"
                top={{ base: "-16px", lg: "-32px" }}
                mx={{ base: "-16px", lg: "-32px" }}
                px={{ base: "16px", lg: "32px" }}
                zIndex={30}
                bg="rgba(0, 0, 0, 0.85)"
                backdropFilter="blur(12px)"
                py={{ base: 3, md: 4 }}
                mb={6}
                borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "stretch", lg: "center" }} direction={{ base: "column", lg: "row" }} gap={4}>
                    {/* TABS */}
                    <Flex overflowX="auto" w={{ base: "full", lg: "auto" }} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                        {TABS.map((tab) => (
                            <Box 
                                key={tab.id}
                                px={4} py={2} cursor="pointer"
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

                    {/* SEARCH */}
                    <Flex align="center" {...controlStyles} h="40px" bg="#0A0A0A" w={{ base: "full", lg: "350px" }} flexShrink={0}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search partners or emails..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" 
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} px={0} w="full" h="full" 
                        />
                    </Flex>
                </Flex>
            </Box>

            {/* PARTNERS GRID TABLE */}
            <Box minH="65vh">
                {visibleItems.length === 0 ? (
                    <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
                        <Text color="#888888" fontSize="lg" fontWeight="bold">No partners found.</Text>
                    </Flex>
                ) : (
                    <Box bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                        <Box minW="1000px">
                            
                            {/* Table Header */}
                          
                            <Grid templateColumns="2fr 1.5fr 1fr 1fr 1fr 200px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid" borderColor="#333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Partner Details</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Contact Info</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Performance</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Joined</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>

                            {/* Table Rows */}
                            <VStack align="stretch" gap={0}>
                                {visibleItems.map((partner) => {
                                    const statusProps = getStatusIconProps(partner.status);

                                    return (
                                        <Grid 
                                            key={partner.id} 
                                            templateColumns="2fr 1.5fr 1fr 1fr 1fr 200px" gap={4} px={6} py={4} 
                                            borderBottom="1px solid #1A1A1A" 
                                            alignItems="center" 
                                            _hover={{ bg: "#111111" }} transition="background 0.2s" 
                                            opacity={partner.status === "Suspended" ? 0.6 : 1}
                                        >
                                            {/* Partner Details */}
                                            <Flex align="center" gap={3}>
                                                <Avatar.Root size="sm" rounded="full">
                                                    <Avatar.Fallback bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="10px" fontWeight="bold">
                                                        {partner.businessName.substring(0, 2).toUpperCase()}
                                                    </Avatar.Fallback>
                                                </Avatar.Root>
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" textDecoration={partner.status === "Suspended" ? "line-through" : "none"}>
                                                        {partner.businessName}
                                                    </Text>
                                                    <Text color="#888888" fontSize="xs" fontFamily="monospace" mt={0.5}>{partner.id}</Text>
                                                </Box>
                                            </Flex>

                                            {/* Contact Info */}
                                            <Box>
                                                <Text color="white" fontSize="sm" fontWeight="bold">{partner.contactName}</Text>
                                                <Flex align="center" gap={1.5} mt={0.5} color="#888888">
                                                    <Icon as={LuMail} boxSize="12px" strokeWidth="2.5" />
                                                    <Text fontSize="xs" fontWeight="bold">{partner.email}</Text>
                                                </Flex>
                                            </Box>

                                            {/* Performance */}
                                            <Box>
                                                <Text color="white" fontSize="sm" fontWeight="black" letterSpacing="tight">₦{partner.totalSales.toLocaleString()}</Text>
                                                <Text color="#888888" fontSize="xs" mt={0.5} fontWeight="bold">{partner.productsCount} products</Text>
                                            </Box>

                                            {/* Joined */}
                                            <Text color="#888888" fontSize="sm" fontWeight="bold">
                                                {partner.status === "Pending Invite" ? "—" : partner.joinedDate}
                                            </Text>

                                            {/* Status */}
                                            <Box>
                                                <Flex align="center" gap={1.5} bg="#111111" color="white" px={2.5} py={1} border="1px solid #333333" rounded="none" display="inline-flex">
                                                    <Icon as={statusProps.icon} color={statusProps.color} boxSize="12px" strokeWidth="3" />
                                                    <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{partner.status}</Text>
                                                </Flex>
                                            </Box>
                                            
                                          {/* Actions */}
                                            
                                            <Flex gap={2} align="center" justify="flex-end">
                                                {partner.status === "Pending Invite" && (
                                                    <>
                                                        
                                                        <Button size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" _hover={{ bg: "#1A1A1A" }}>
                                                            <Icon as={LuSend} mr={1.5} strokeWidth="2.5" /> Resend
                                                        </Button>
                                                    </>
                                                )}
                                                
                                                {partner.status !== "Pending Invite" && (
                                                    <Button onClick={() => setViewingPartner(partner)} size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" _hover={{ bg: "#1A1A1A" }}>
                                                        <Icon as={LuEye} mr={1.5} strokeWidth="2.5" /> View
                                                    </Button>
                                                )}
                                                
                                                <IconButton aria-label="More options" size="sm" h="32px" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }}>
                                                 
                                                </IconButton>
                                            </Flex>

                                        </Grid>
                                    );
                                })}
                            </VStack>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Mount the Modals */}
            <InvitePartnerModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
            <ViewPartnerModal partner={viewingPartner} onClose={() => setViewingPartner(null)} />
        </Box>
    );
}

