"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, Icon, Input, Avatar, IconButton, VStack
} from "@chakra-ui/react";
import { 
    LuSearch, LuCheck, LuX, LuEye, LuBriefcase, LuFileText, LuFilter, LuShieldAlert, LuClock
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "160px" };
const scrollbarStyles = { '&::-webkit-scrollbar': { height: '6px', width: '6px' }, '&::-webkit-scrollbar-track': { background: 'transparent' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' }, '&::-webkit-scrollbar-thumb:hover': { background: '#555555' } };

// --- MOCK DATA ---
interface PendingBusiness {
    id: string;
    businessName: string;
    ownerName: string;
    email: string;
    businessType: string;
    appliedAt: string;
    kycStatus: "Verified" | "Pending Review" | "Missing Docs";
}

const MOCK_APPLICATIONS: PendingBusiness[] = [
    { id: "REQ-1042", businessName: "Lagos Streetwear Co.", ownerName: "Chuka Obi", email: "chuka@lagosstreetwear.ng", businessType: "Fashion & Apparel", appliedAt: "2 hours ago", kycStatus: "Verified" },
    { id: "REQ-1043", businessName: "Tech Haven Hub", ownerName: "Sarah Connor", email: "sarah.c@techhaven.io", businessType: "Electronics", appliedAt: "5 hours ago", kycStatus: "Pending Review" },
    { id: "REQ-1044", businessName: "Mama's Kitchen Spices", ownerName: "Grace Okafor", email: "grace@mamasspices.com", businessType: "Groceries", appliedAt: "1 day ago", kycStatus: "Missing Docs" },
    { id: "REQ-1045", businessName: "Urban Kicks NG", ownerName: "Wada Gift", email: "hello@urbankicks.ng", businessType: "Footwear", appliedAt: "2 days ago", kycStatus: "Verified" },
    { id: "REQ-1046", businessName: "Glow Beauty Cosmetics", ownerName: "Aisha Bello", email: "aisha@glowbeauty.com", businessType: "Health & Beauty", appliedAt: "3 days ago", kycStatus: "Pending Review" },
];

export default function PendingApprovalsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [kycFilter, setKycFilter] = useState("All");

    // Filter Logic
    const visibleApplications = MOCK_APPLICATIONS.filter(app => {
        const matchesSearch = app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              app.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesKyc = kycFilter === "All" || app.kycStatus === kycFilter;
        return matchesSearch && matchesKyc;
    });

    const getKycBadgeStyle = (status: string) => {
        switch (status) {
            case "Verified": return { bg: "rgba(92, 172, 125, 0.1)", color: "#5cac7d", border: "1px solid #5cac7d" };
            case "Pending Review": return { bg: "rgba(236, 201, 75, 0.1)", color: "yellow.400", border: "1px solid var(--chakra-colors-yellow-400)" };
            case "Missing Docs": return { bg: "rgba(229, 62, 62, 0.1)", color: "red.400", border: "1px solid var(--chakra-colors-red-400)" };
            default: return { bg: "#111111", color: "#888888", border: "1px solid #333333" };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Pending Approvals
                    </Text>
                    <Text color="#888888" fontSize="sm">Review and approve new business applications to join the Tradaz platform.</Text>
                </Box>
                
                <Flex gap={3} bg="#0A0A0A" border="1px solid #1A1A1A" p={3} align="center">
                    <Icon as={LuClock} color="yellow.400" strokeWidth="2.5" />
                    <Box>
                        <Text fontSize="10px" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Awaiting Review</Text>
                        <Text fontSize="lg" fontWeight="black" color="white" letterSpacing="tight" lineHeight="1">{MOCK_APPLICATIONS.length} Applications</Text>
                    </Box>
                </Flex>
            </Flex>

            {/* --- TOOLBAR (SEARCH & FILTERS) --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} mb={8}>
                <Flex direction={{ base: "column", md: "row" }} gap={4} w="full">
                    {/* Search */}
                    <Flex flex={1} align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search by business name, ID, or owner..." 
                            border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }} 
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </Flex>
                    
                    {/* Filters */}
                    <Flex gap={4} w={{ base: "full", md: "auto" }} wrap={{ base: "wrap", sm: "nowrap" }}>
                        <Flex align="center" bg="#111111" border="1px solid #333333" px={3} h="44px" flexShrink={0} display={{ base: "none", sm: "flex" }}>
                            <Icon as={LuFilter} color="#888888" strokeWidth="2.5" />
                        </Flex>
                        <select style={nativeSelectStyle} defaultValue="All">
                            <option value="All" style={{ background: "#000000" }}>All Business Types</option>
                            <option value="Fashion" style={{ background: "#000000" }}>Fashion & Apparel</option>
                            <option value="Electronics" style={{ background: "#000000" }}>Electronics</option>
                            <option value="Groceries" style={{ background: "#000000" }}>Groceries</option>
                        </select>
                        <select value={kycFilter} onChange={(e) => setKycFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All KYC Statuses</option>
                            <option value="Verified" style={{ background: "#000000" }}>KYC Verified</option>
                            <option value="Pending Review" style={{ background: "#000000" }}>KYC Pending</option>
                            <option value="Missing Docs" style={{ background: "#000000" }}>Missing Docs</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>

            {/* --- APPLICATIONS LIST --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" overflowX="auto" css={scrollbarStyles}>
                <Box minW="1000px">
                    
                    {/* Columns Header */}
                    <Grid templateColumns="2.5fr 1.5fr 1.5fr 1fr 200px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Business Details</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Category & Date</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">KYC Verification</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Quick Actions</Text>
                    </Grid>

                    {/* Table Rows */}
                    {visibleApplications.length === 0 ? (
                        <Flex justify="center" align="center" py={16} direction="column">
                            <Icon as={LuShieldAlert} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                            <Text color="#888888" fontSize="lg" fontWeight="bold">No pending applications found.</Text>
                        </Flex>
                    ) : (
                        <VStack align="stretch" gap={0}>
                            {visibleApplications.map((app) => {
                                const badgeStyle = getKycBadgeStyle(app.kycStatus);
                                return (
                                    <Grid 
                                        key={app.id} 
                                        templateColumns="2.5fr 1.5fr 1.5fr 1fr 200px" gap={4} px={6} py={5} 
                                        borderBottom="1px solid #1A1A1A" 
                                        alignItems="center" 
                                        _hover={{ bg: "#111111" }} transition="background 0.2s"
                                    >
                                        {/* Business & Owner Info */}
                                        <Flex align="center" gap={4}>
                                            <Avatar.Root size="md" rounded="full">
                                                <Avatar.Fallback name={app.businessName} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="black" />
                                            </Avatar.Root>
                                            <Box>
                                                <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" mb={0.5}>{app.businessName}</Text>
                                                <Text color="#888888" fontSize="xs" fontWeight="medium">{app.ownerName} • {app.email}</Text>
                                                <Text color="#555555" fontSize="10px" fontFamily="monospace" mt={1}>ID: {app.id}</Text>
                                            </Box>
                                        </Flex>

                                        {/* Category & Date */}
                                        <Box>
                                            <Flex align="center" gap={2} mb={1}>
                                                <Icon as={LuBriefcase} color="#888888" boxSize="14px" />
                                                <Text color="white" fontSize="sm" fontWeight="bold">{app.businessType}</Text>
                                            </Flex>
                                            <Text color="#888888" fontSize="xs">Applied: {app.appliedAt}</Text>
                                        </Box>

                                        {/* KYC Status */}
                                        <Box>
                                            <Flex align="center" gap={2} {...badgeStyle} px={2.5} py={1} rounded="none" display="inline-flex">
                                                <Icon as={app.kycStatus === "Verified" ? LuCheck : LuFileText} boxSize="12px" strokeWidth="3" />
                                                <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{app.kycStatus}</Text>
                                            </Flex>
                                        </Box>

                                        {/* Application Status */}
                                        <Box>
                                            <Text color="yellow.400" fontSize="sm" fontWeight="bold" letterSpacing="tight">Awaiting Review</Text>
                                        </Box>
                                        
                                        {/* Actions */}
                                        <Flex justify="flex-end" gap={2}>
                                            <IconButton aria-label="View Details" size="sm" h="36px" w="36px" bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                                <Icon as={LuEye} strokeWidth="2.5" />
                                            </IconButton>
                                            <IconButton aria-label="Reject" size="sm" h="36px" w="36px" variant="outline" borderColor="#333333" color="red.400" rounded="none" _hover={{ bg: "rgba(229, 62, 62, 0.1)" }}>
                                                <Icon as={LuX} strokeWidth="2.5" />
                                            </IconButton>
                                            <IconButton aria-label="Approve" size="sm" h="36px" w="36px" bg="white" color="black" border="none" rounded="none" _hover={{ bg: "#E5E5E5" }} disabled={app.kycStatus !== "Verified"}>
                                                <Icon as={LuCheck} strokeWidth="3" />
                                            </IconButton>
                                        </Flex>

                                    </Grid>
                                );
                            })}
                        </VStack>
                    )}
                </Box>
            </Box>

        </Box>
    );
}