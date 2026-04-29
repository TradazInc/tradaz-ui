"use client";
import React from "react";
import { Box, Flex, Text, Input, Button, Icon, Grid, VStack, IconButton, SimpleGrid, Spinner } from "@chakra-ui/react";
import { 
    LuSearch, LuUserPlus, LuShieldCheck, LuHeadset, 
    LuPackage, LuBadgeDollarSign, LuEllipsisVertical, LuMail, LuTrendingUp
} from "react-icons/lu";

import { AddStaffForm } from "@/app/ui/dashboard/AddStaffForm";
import { useStaff, StaffRole, StaffMember } from "@/app/hooks/useStaff";

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

export default function StaffManagementPage() {
    const {
        isAddingStaff, setIsAddingStaff,
        searchQuery, roleFilter, sortBy, sortOrder,
        handleSearch, handleRoleFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount,
        visibleCount, loaderRef,  totalLimit,
        activeSalesRepsCount, pendingInvitesCount
    } = useStaff();

    if (isAddingStaff) {
        return (
            <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" bg="#000000" minH="100vh">
                <AddStaffForm onBack={() => setIsAddingStaff(false)} />
            </Box>
        );
    }

   
    const getRoleUI = (role: StaffRole) => {
        switch (role) {
            case "store_manager": return { iconColor: "purple.400", icon: LuShieldCheck, label: "Manager" };
            case "sales_rep": return { iconColor: "#5cac7d", icon: LuBadgeDollarSign, label: "Sales Rep" };
            case "support_agent": return { iconColor: "blue.400", icon: LuHeadset, label: "Support" };
            case "inventory_clerk": return { iconColor: "orange.400", icon: LuPackage, label: "Inventory" };
            default: return { iconColor: "gray.400", icon: LuShieldCheck, label: "Staff" }; 
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" animation="fade-in 0.3s ease" position="relative" bg="#000000" minH="100vh">
            
            {/* --- PAGE HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={6} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Staff Management</Text>
                    <Text color="#888888" fontSize="sm">Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedCount}</Text> members.</Text>
                </Box>
                <Button 
                    bg="white" color="black" rounded="none" h="44px" px={6} fontWeight="bold"
                    _hover={{ bg: "#E5E5E5" }} display="flex" gap={2} border="none"
                    onClick={() => setIsAddingStaff(true)}
                >
                    <Icon as={LuUserPlus} color="#5cac7d" strokeWidth="2.5" /> Add New Staff
                </Button>
            </Flex>

            {/* --- STICKY TOOLBAR --- */}
            <Box 
                position="sticky" top={{ base: "-16px", lg: "-32px" }} zIndex={20} 
                bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={4} mb={8} 
                mx={{ base: -4, lg: -8 }} px={{ base: 4, lg: 8 }} 
                borderBottom="1px solid" borderColor="#1A1A1A"
            >
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="300px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input placeholder="Search by name, email, or ID..." border="none" color="white" h="full" px={0} _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={handleSearch} />
                    </Flex>
                    
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={roleFilter} onChange={handleRoleFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#0A0A0A" }}>All Roles</option>
                                <option value="store_manager" style={{ background: "#0A0A0A" }}>Managers</option>
                                <option value="sales_rep" style={{ background: "#0A0A0A" }}>Sales Reps</option>
                                <option value="support_agent" style={{ background: "#0A0A0A" }}>Support</option>
                                <option value="inventory_clerk" style={{ background: "#0A0A0A" }}>Inventory</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="name" style={{ background: "#0A0A0A" }}>Sort: Name</option>
                                <option value="role" style={{ background: "#0A0A0A" }}>Sort: Role</option>
                                <option value="status" style={{ background: "#0A0A0A" }}>Sort: Status</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="asc" style={{ background: "#0A0A0A" }}>A-Z / Ascending</option>
                                <option value="desc" style={{ background: "#0A0A0A" }}>Z-A / Descending</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- STATS OVERVIEW --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Staff</Text>
                        <Icon as={LuShieldCheck} color="gray.500" strokeWidth="2.5" />
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{totalLimit}</Text>
                </Box>
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active Sales Reps</Text>
                        <Icon as={LuBadgeDollarSign} color="#5cac7d" strokeWidth="2.5" />
                    </Flex>
                    <Flex align="end" gap={3}>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{activeSalesRepsCount}</Text>
                        <Flex align="center" gap={1} mb={1.5}>
                            <Icon as={LuTrendingUp} color="#5cac7d" boxSize="14px" strokeWidth="2.5" />
                            <Text color="#888888" fontSize="xs" fontWeight="bold">Top: David O.</Text>
                        </Flex>
                    </Flex>
                </Box>
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Invites</Text>
                        <Icon as={LuMail} color="orange.400" strokeWidth="2.5" />
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{pendingInvitesCount}</Text>
                </Box>
            </SimpleGrid>

            {/* --- STAFF LIST --- */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" bg="#0A0A0A" border="1px dashed #1A1A1A" rounded="none">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No staff found.</Text>
                </Flex>
            ) : (
                <VStack align="stretch" gap={3}>
                    {/* List Header */}
                    <Grid templateColumns="2fr 1.5fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Staff Member</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Store Role</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Last Active</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">30-Day Sales</Text>
                    </Grid>

                    {/* Staff Rows */}
                    {visibleItems.map((member: StaffMember) => {
                        const roleUI = getRoleUI(member.role);
                        const isInvited = member.status === 'invited';
                        const isActive = member.status === 'active';

                        return (
                            <Grid 
                                key={member.id} 
                                templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr", xl: "2fr 1.5fr 1fr 1fr 1.5fr 50px" }} 
                                gap={4} p={4} bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A"
                                alignItems="center" cursor="pointer" transition="all 0.2s"
                                _hover={{ bg: "#111111", borderColor: "#333333" }}
                            >
                                <Flex align="center" gap={4}>
                                    <Flex 
                                        align="center" justify="center" boxSize="40px" rounded="full" 
                                        bg="#111111" border="1px solid #333333"
                                        color="white" fontWeight="black" flexShrink={0}
                                    >
                                        {member.name.charAt(0)}
                                    </Flex>
                                    <Box overflow="hidden">
                                        <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1} letterSpacing="tight">{member.name}</Text>
                                        <Text color="#888888" fontSize="xs" lineClamp={1}>{member.email}</Text>
                                    </Box>
                                </Flex>

                                <Flex align="center" display={{ base: "none", md: "flex" }}>
                                    <Flex bg="#111111" border="1px solid #333333" color="white" px={2.5} py={1} rounded="none" align="center" gap={1.5}>
                                        <Icon as={roleUI.icon} color={roleUI.iconColor} strokeWidth="2.5" boxSize="14px" />
                                        <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{roleUI.label}</Text>
                                    </Flex>
                                </Flex>

                                <Box display={{ base: "none", md: "block" }}>
                                    <Flex align="center" gap={2}>
                                        <Box boxSize="6px" rounded="none" bg={isActive ? "#5cac7d" : isInvited ? "orange.400" : "red.400"} />
                                        <Text color={isActive ? "white" : "#888888"} fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                            {member.status}
                                        </Text>
                                    </Flex>
                                </Box>

                                <Text color="#888888" fontSize="sm" display={{ base: "none", xl: "block" }}>{member.lastActive}</Text>

                                <Box textAlign="right" display={{ base: "none", xl: "block" }}>
                                    {member.role === 'sales_rep' ? (
                                        <Text color="white" fontWeight="black" fontSize="sm">₦{member.salesGenerated?.toLocaleString() || "0"}</Text>
                                    ) : (
                                        <Text color="#555555" fontSize="sm" fontWeight="bold">—</Text>
                                    )}
                                </Box>

                                <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                    <IconButton aria-label="Manage Staff" variant="ghost" color="#888888" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <LuEllipsisVertical strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>
                            </Grid>
                        );
                    })}

                    {/* Infinite scroll loader */}
                    {visibleCount < processedCount && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            <Spinner color="white" size="md" />
                        </Flex>
                    )}
                </VStack>
            )}
        </Box>
    );
}