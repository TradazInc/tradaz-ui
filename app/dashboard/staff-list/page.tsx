"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, Avatar, IconButton, SimpleGrid
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuUserPlus, LuShieldCheck, LuHeadset, 
    LuPackage, LuBadgeDollarSign, LuEllipsisVertical, LuMail, LuTrendingUp
} from "react-icons/lu";
import { AddStaffForm } from "@/app/ui/dashboard/AddStaffForm";


// --- MOCK STAFF DATA ---
type StaffRole = 'store_manager' | 'sales_rep' | 'support_agent' | 'inventory_clerk';
type StaffStatus = 'active' | 'suspended' | 'invited';

interface StaffMember {
    id: string;
    name: string;
    email: string;
    role: StaffRole;
    status: StaffStatus;
    salesGenerated?: string; 
    lastActive: string;
}

const MOCK_STAFF: StaffMember[] = [
    { id: "STF-001", name: "Wada Gift", email: "wada@urbankicks.com", role: "store_manager", status: "active", lastActive: "Just now" },
    { id: "STF-002", name: "David O.", email: "david.o@urbankicks.com", role: "sales_rep", status: "active", salesGenerated: "₦1,250,000", lastActive: "2 hours ago" },
    { id: "STF-003", name: "Amina Yusuf", email: "amina@urbankicks.com", role: "sales_rep", status: "active", salesGenerated: "₦850,000", lastActive: "5 mins ago" },
    { id: "STF-004", name: "Chinedu Eze", email: "chinedu@urbankicks.com", role: "inventory_clerk", status: "active", lastActive: "Yesterday" },
    { id: "STF-005", name: "Sarah Connor", email: "sarah.c@urbankicks.com", role: "support_agent", status: "invited", lastActive: "Never" },
];

export default function StaffManagementPage() {
    const brandColor = "#5cac7d";
    const [searchQuery, setSearchQuery] = useState("");
    const [staff] = useState<StaffMember[]>(MOCK_STAFF);
   
    const [isAddingStaff, setIsAddingStaff] = useState(false);

   
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
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Staff Management</Text>
                    <Text color="gray.400" fontSize="sm">Manage roles, permissions, and track sales rep performance.</Text>
                </Box>
                
                <Button 
                    bg={brandColor} color="white" rounded="lg" h="45px" px={6} 
                    _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}
                    onClick={() => setIsAddingStaff(true)}
                >
                    <Icon as={LuUserPlus} /> Add New Staff
                </Button>
            </Flex>

            {/* --- KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Total Staff</Text>
                        <Icon as={LuShieldCheck} color="gray.400" />
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black">{staff.length}</Text>
                </Box>
                <Box bg="rgba(92, 172, 125, 0.05)" p={6} rounded="2xl" border="1px solid" borderColor="rgba(92, 172, 125, 0.2)">
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text color={brandColor} fontSize="xs" fontWeight="bold" textTransform="uppercase">Active Sales Reps</Text>
                        <Icon as={LuBadgeDollarSign} color={brandColor} />
                    </Flex>
                    <Flex align="end" gap={3}>
                        <Text color={brandColor} fontSize="3xl" fontWeight="black">
                            {staff.filter(s => s.role === 'sales_rep').length}
                        </Text>
                        <Flex align="center" gap={1} mb={2} color="green.400">
                            <Icon as={LuTrendingUp} boxSize="12px" />
                            <Text fontSize="xs" fontWeight="bold">Top Performer: David O.</Text>
                        </Flex>
                    </Flex>
                </Box>
                <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                    <Flex justify="space-between" align="center" mb={2}>
                        <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Pending Invites</Text>
                        <Icon as={LuMail} color="gray.400" />
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black">{staff.filter(s => s.status === 'invited').length}</Text>
                </Box>
            </SimpleGrid>

            {/* --- FILTERS --- */}
            <Flex gap={4} mb={6}>
                <Flex flex={1} align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" px={4} _focusWithin={{ borderColor: brandColor }}>
                    <Icon as={LuSearch} color="gray.500" />
                    <Input 
                        placeholder="Search by name, email, or role..." border="none" color="white" h="50px" 
                        _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>
                <Button h="50px" px={6} bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" color="white" rounded="xl" _hover={{ bg: "whiteAlpha.50" }} display="flex" gap={2}>
                    <Icon as={LuFilter} /> <Text display={{ base: "none", sm: "block" }}>Filter Roles</Text>
                </Button>
            </Flex>

            {/* --- STAFF GRID --- */}
            <VStack align="stretch" gap={3}>
                <Grid templateColumns="2fr 1.5fr 1fr 1fr 1.5fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Staff Member</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Store Role</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Last Active</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">30-Day Sales</Text>
                </Grid>

                {staff.map((member) => {
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
                                <Avatar.Root size="md">
                                    <Avatar.Fallback name={member.name} bg={member.status === 'invited' ? "whiteAlpha.200" : "whiteAlpha.300"} color="white" />
                                </Avatar.Root>
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
                                    <Text color={brandColor} fontWeight="black" fontSize="sm">{member.salesGenerated}</Text>
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
            </VStack>
        </Box>
    );
}