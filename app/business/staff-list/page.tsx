"use client";
import React from "react";
import { Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, IconButton, SimpleGrid, Spinner } from "@chakra-ui/react";
import { 
    LuSearch, LuUserPlus, LuShieldCheck, LuHeadset, 
    LuPackage, LuBadgeDollarSign, LuEllipsisVertical, LuMail, LuTrendingUp
} from "react-icons/lu";

import { AddStaffForm } from "@/app/ui/dashboard/AddStaffForm";
import { useStaff, StaffRole, StaffMember } from "@/app/hooks/useStaff";

const controlStyles = { bg: "#121214", border: "1px solid", borderColor: "whiteAlpha.200", color: "white", h: "44px", rounded: "lg", px: 3, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.50" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#121214", color: "white", height: "44px", borderRadius: "8px", padding: "0 12px", border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", cursor: "pointer", fontSize: "14px" };

export default function StaffManagementPage() {
    const brandColor = "#5cac7d";

    const {
        isAddingStaff, setIsAddingStaff,
        searchQuery, roleFilter, sortBy, sortOrder,
        handleSearch, handleRoleFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount,
        visibleCount, loaderRef, isLoadingMore, totalLimit,
        activeSalesRepsCount, pendingInvitesCount
    } = useStaff();

    if (isAddingStaff) {
        return (
            <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto">
                <AddStaffForm onBack={() => setIsAddingStaff(false)} />
            </Box>
        );
    }

    const getRoleUI = (role: StaffRole) => {
        switch (role) {
            case "store_manager": return { color: "purple.400", bg: "rgba(159, 122, 234, 0.15)", icon: LuShieldCheck, label: "Manager" };
            case "sales_rep": return { color: brandColor, bg: "rgba(92, 172, 125, 0.15)", icon: LuBadgeDollarSign, label: "Sales Rep" };
            case "support_agent": return { color: "blue.400", bg: "rgba(66, 153, 225, 0.15)", icon: LuHeadset, label: "Support" };
            case "inventory_clerk": return { color: "orange.400", bg: "rgba(237, 137, 54, 0.15)", icon: LuPackage, label: "Inventory" };
            default: return { color: "gray.400", bg: "whiteAlpha.200", icon: LuShieldCheck, label: "Staff" }; 
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" animation="fade-in 0.3s ease" position="relative">
            
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={6} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Staff Management</Text>
                    <Text color="gray.400" fontSize="sm">Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedCount}</Text> members.</Text>
                </Box>
                <Button 
                    bg={brandColor} color="white" rounded="lg" h="45px" px={6} 
                    _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}
                    onClick={() => setIsAddingStaff(true)}
                >
                    <Icon as={LuUserPlus} /> Add New Staff
                </Button>
            </Flex>

            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" py={3} mb={8} mx={{ base: -4, lg: 0 }} px={{ base: 4, lg: 0 }} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="300px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="gray.500" mr={2} />
                        <Input placeholder="Search by name, email, or ID..." border="none" color="white" h="full" px={0} _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={handleSearch} />
                    </Flex>
                    
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={roleFilter} onChange={handleRoleFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#1A1C23" }}>All Roles</option>
                                <option value="store_manager" style={{ background: "#1A1C23" }}>Managers</option>
                                <option value="sales_rep" style={{ background: "#1A1C23" }}>Sales Reps</option>
                                <option value="support_agent" style={{ background: "#1A1C23" }}>Support</option>
                                <option value="inventory_clerk" style={{ background: "#1A1C23" }}>Inventory</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="name" style={{ background: "#1A1C23" }}>Sort: Name</option>
                                <option value="role" style={{ background: "#1A1C23" }}>Sort: Role</option>
                                <option value="status" style={{ background: "#1A1C23" }}>Sort: Status</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="asc" style={{ background: "#1A1C23" }}>A-Z / Ascending</option>
                                <option value="desc" style={{ background: "#1A1C23" }}>Z-A / Descending</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Staff</Text>
                        <Icon as={LuShieldCheck} color="gray.400" />
                    </Flex>
                    {/*  Used totalLimit here to clear the unused warning */}
                    <Text color="white" fontSize="3xl" fontWeight="black">{totalLimit}</Text>
                </Box>
                <Box bg="rgba(92, 172, 125, 0.05)" p={6} rounded="2xl" border="1px solid" borderColor="rgba(92, 172, 125, 0.2)">
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text color={brandColor} fontSize="xs" fontWeight="bold" textTransform="uppercase">Active Sales Reps</Text>
                        <Icon as={LuBadgeDollarSign} color={brandColor} />
                    </Flex>
                    <Flex align="end" gap={3}>
                        <Text color={brandColor} fontSize="3xl" fontWeight="black">{activeSalesRepsCount}</Text>
                        <Flex align="center" gap={1} mb={2} color="green.400">
                            <Icon as={LuTrendingUp} boxSize="12px" />
                            <Text fontSize="xs" fontWeight="bold">Top: David O.</Text>
                        </Flex>
                    </Flex>
                </Box>
                <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Pending Invites</Text>
                        <Icon as={LuMail} color="gray.400" />
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black">{pendingInvitesCount}</Text>
                </Box>
            </SimpleGrid>

            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column">
                    <Text color="gray.400" fontSize="lg" fontWeight="bold">No staff found.</Text>
                </Flex>
            ) : (
                <VStack align="stretch" gap={3}>
                    <Grid templateColumns="2fr 1.5fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Staff Member</Text>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Store Role</Text>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Last Active</Text>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">30-Day Sales</Text>
                    </Grid>

                    {/* 'member' as StaffMember */}
                    {visibleItems.map((member: StaffMember) => {
                        const roleUI = getRoleUI(member.role);
                        return (
                            <Grid 
                                key={member.id} 
                                templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr", xl: "2fr 1.5fr 1fr 1fr 1.5fr 50px" }} 
                                gap={4} p={4} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.50"
                                alignItems="center" cursor="pointer" transition="all 0.2s"
                                _hover={{ borderColor: "whiteAlpha.300", transform: "translateY(-2px)", shadow: "lg" }}
                            >
                                <Flex align="center" gap={3}>
                                    <Flex 
                                        align="center" justify="center" boxSize="40px" rounded="full" 
                                        bg={member.status === 'invited' ? "whiteAlpha.200" : "whiteAlpha.300"} 
                                        color="white" fontWeight="bold" flexShrink={0}
                                    >
                                        {member.name.charAt(0)}
                                    </Flex>
                                    <Box overflow="hidden">
                                        <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{member.name}</Text>
                                        <Text color="gray.500" fontSize="xs" lineClamp={1}>{member.email}</Text>
                                    </Box>
                                </Flex>

                                <Flex align="center" display={{ base: "none", md: "flex" }}>
                                    <Badge bg={roleUI.bg} color={roleUI.color} px={2.5} py={1} rounded="md" display="flex" alignItems="center" gap={1.5}>
                                        <Icon as={roleUI.icon} /> {roleUI.label}
                                    </Badge>
                                </Flex>

                                <Box display={{ base: "none", md: "block" }}>
                                    <Badge 
                                        bg={member.status === 'active' ? "rgba(92, 172, 125, 0.15)" : member.status === 'invited' ? "rgba(236, 201, 75, 0.15)" : "rgba(229, 62, 62, 0.15)"} 
                                        color={member.status === 'active' ? brandColor : member.status === 'invited' ? "yellow.400" : "red.400"} 
                                        px={2.5} py={1} rounded="md" textTransform="uppercase"
                                    >
                                        {member.status}
                                    </Badge>
                                </Box>

                                <Text color="gray.400" fontSize="sm" display={{ base: "none", xl: "block" }}>{member.lastActive}</Text>

                                <Box textAlign="right" display={{ base: "none", xl: "block" }}>
                                    {member.role === 'sales_rep' ? (
                                        <Text color={brandColor} fontWeight="black" fontSize="sm">{member.salesGenerated || "₦0"}</Text>
                                    ) : (
                                        <Text color="gray.600" fontSize="sm">—</Text>
                                    )}
                                </Box>

                                <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                    <IconButton aria-label="Manage Staff" variant="ghost" color="gray.500" rounded="full" _hover={{ bg: "whiteAlpha.100", color: "white" }}>
                                        <LuEllipsisVertical />
                                    </IconButton>
                                </Flex>
                            </Grid>
                        );
                    })}

                    {/*  infinite scroll  */}
                    {visibleCount < processedCount && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            {isLoadingMore && <Spinner color="#5cac7d" size="md" />}
                        </Flex>
                    )}
                </VStack>
            )}
        </Box>
    );
}