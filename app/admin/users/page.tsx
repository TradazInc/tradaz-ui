"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, Avatar, IconButton, SimpleGrid
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuPlus, LuShieldAlert, LuKey, LuUserX, LuVenetianMask, 
    LuShield, LuShieldCheck, LuEllipsisVertical, LuX, LuMonitorSmartphone, LuTrash2, LuStore
} from "react-icons/lu";

// --- MOCK DATA FOR MULTI-TENANT ---
type Role = 'super_admin' | 'shop_owner' | 'shop_staff' | 'customer';
type Status = 'active' | 'banned';

interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: Status;
    lastLogin: string;
    activeSessions: number;
    tenant: string; // Connects them to a specific shop or the platform
}

const MOCK_USERS: AdminUser[] = [
    { id: "USR-001", name: "Wada Gift", email: "hello@tradaz.com", role: "super_admin", status: "active", lastLogin: "2 mins ago", activeSessions: 2, tenant: "Platform HQ" },
    { id: "USR-002", name: "Sarah Connor", email: "sarah@tech.com", role: "shop_owner", status: "active", lastLogin: "1 hour ago", activeSessions: 1, tenant: "Minimalist Hub" },
    { id: "USR-003", name: "Mike Ross", email: "mike@urbankicks.com", role: "shop_staff", status: "active", lastLogin: "5 mins ago", activeSessions: 3, tenant: "Urban Kicks NG" },
    { id: "USR-004", name: "John Doe", email: "john@doe.com", role: "customer", status: "banned", lastLogin: "3 days ago", activeSessions: 0, tenant: "N/A" },
];

export default function AdminUsersPage() {
    const brandColor = "#5cac7d";
    
    const [searchQuery, setSearchQuery] = useState("");
    const [users] = useState<AdminUser[]>(MOCK_USERS);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

    // --- MOCK API HANDLERS ---
    const handleAction = (actionName: string) => {
        alert(`API Triggered: POST /api/auth/admin/${actionName}\nTarget User: ${selectedUser?.email}`);
    };

    const getRoleUI = (role: Role) => {
        switch (role) {
            case "super_admin": return { color: "purple.400", bg: "rgba(159, 122, 234, 0.15)", icon: LuShieldAlert, label: "Platform Admin" };
            case "shop_owner": return { color: "blue.400", bg: "rgba(66, 153, 225, 0.15)", icon: LuShieldCheck, label: "Shop Owner" };
            case "shop_staff": return { color: "teal.400", bg: "rgba(49, 151, 149, 0.15)", icon: LuStore, label: "Shop Staff" };
            case "customer": return { color: "gray.400", bg: "whiteAlpha.100", icon: LuShield, label: "Customer" };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* Header & Actions */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Global Users</Text>
                    <Text color="gray.400" fontSize="sm">Manage platform admins, shop owners, and customers.</Text>
                </Box>
                <Button bg={brandColor} color="white" rounded="lg" h="45px" px={6} _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2} onClick={() => handleAction("create-user")}>
                    <Icon as={LuPlus} /> Add Global User
                </Button>
            </Flex>

            {/* Filters */}
            <Flex gap={4} mb={6}>
                <Flex flex={1} align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" px={4} _focusWithin={{ borderColor: brandColor }}>
                    <Icon as={LuSearch} color="gray.500" />
                    <Input 
                        placeholder="Search by name, email, or tenant..." border="none" color="white" h="50px" 
                        _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>
                <Button h="50px" px={6} bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" color="white" rounded="xl" _hover={{ bg: "whiteAlpha.50" }} display="flex" gap={2}>
                    <Icon as={LuFilter} /> <Text display={{ base: "none", sm: "block" }}>Filter</Text>
                </Button>
            </Flex>

            {/* Users List (Updated to 6 columns for Tenant data) */}
            <VStack align="stretch" gap={3}>
                <Grid templateColumns="2fr 1.5fr 1.5fr 1fr 1fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">User</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Platform Role</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Shop</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Status</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Last Login</Text>
                </Grid>

                {users.map((user) => {
                    const roleUI = getRoleUI(user.role);
                    return (
                        <Grid 
                            key={user.id} 
                            templateColumns={{ base: "1fr", md: "2fr 1.5fr", xl: "2fr 1.5fr 1.5fr 1fr 1fr 50px" }} 
                            gap={4} p={4} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.50"
                            alignItems="center" cursor="pointer" transition="all 0.2s"
                            _hover={{ borderColor: "whiteAlpha.300", transform: "translateY(-2px)", shadow: "lg" }}
                            onClick={() => setSelectedUser(user)}
                        >
                            {/* User Info */}
                            <Flex align="center" gap={3}>
                                <Avatar.Root size="md">
                                    <Avatar.Fallback name={user.name} bg={user.status === 'banned' ? "red.900" : "whiteAlpha.200"} color="white" />
                                    <Avatar.Image src="" />
                                </Avatar.Root>
                                <Box overflow="hidden">
                                    <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{user.name}</Text>
                                    <Text color="gray.500" fontSize="xs" lineClamp={1}>{user.email}</Text>
                                </Box>
                            </Flex>

                            {/* Role */}
                            <Flex align="center" display={{ base: "none", md: "flex" }}>
                                <Badge bg={roleUI.bg} color={roleUI.color} px={2.5} py={1} rounded="md" display="flex" alignItems="center" gap={1.5}>
                                    <Icon as={roleUI.icon} /> {roleUI.label}
                                </Badge>
                            </Flex>

                            {/* Tenant / Shop */}
                            <Text color="gray.300" fontSize="sm" fontWeight="medium" display={{ base: "none", xl: "block" }}>
                                {user.tenant}
                            </Text>

                            {/* Status */}
                            <Box display={{ base: "none", xl: "block" }}>
                                <Badge bg={user.status === 'active' ? "rgba(92, 172, 125, 0.15)" : "rgba(229, 62, 62, 0.15)"} color={user.status === 'active' ? brandColor : "red.400"} px={2.5} py={1} rounded="md">
                                    {user.status.toUpperCase()}
                                </Badge>
                            </Box>

                            {/* Last Login */}
                            <Text color="gray.400" fontSize="sm" display={{ base: "none", xl: "block" }}>{user.lastLogin}</Text>

                            {/* Actions Icon */}
                            <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                <Icon as={LuEllipsisVertical} color="gray.500" />
                            </Flex>
                        </Grid>
                    );
                })}
            </VStack>

            {/* --- USER DETAILS & COMMAND DRAWER --- */}
            <Box position="fixed" inset={0} zIndex={9999} pointerEvents={selectedUser ? "auto" : "none"}>
                <Box position="absolute" inset={0} bg="blackAlpha.700" backdropFilter="blur(4px)" opacity={selectedUser ? 1 : 0} transition="opacity 0.3s ease" onClick={() => setSelectedUser(null)} />
                
                <Flex 
                    position="absolute" top={0} right={0} h="100vh" w={{ base: "full", sm: "450px" }}
                    bg="#121212" borderLeft="1px solid" borderColor="whiteAlpha.100" direction="column" shadow="2xl"
                    transform={selectedUser ? "translateX(0)" : "translateX(100%)"} transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                    {selectedUser && (
                        <>
                            <Flex align="center" justify="space-between" p={6} borderBottom="1px solid" borderColor="whiteAlpha.100" bg="#1A1C23">
                                <Text fontSize="lg" fontWeight="bold" color="white">User Overview</Text>
                                <IconButton aria-label="Close" variant="ghost" color="gray.400" rounded="full" onClick={() => setSelectedUser(null)}>
                                    <LuX />
                                </IconButton>
                            </Flex>

                            <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                
                                {/* Profile Card */}
                                <Flex direction="column" align="center" textAlign="center" mb={8}>
                                    <Avatar.Root size="2xl" width="80px" height="80px" mb={4}>
                                        <Avatar.Fallback name={selectedUser.name} bg="whiteAlpha.200" color="white" />
                                    </Avatar.Root>
                                    <Text color="white" fontSize="xl" fontWeight="black">{selectedUser.name}</Text>
                                    <Text color="gray.400" fontSize="sm" mb={3}>{selectedUser.email}</Text>
                                    
                                    <Flex gap={2} mt={1}>
                                        <Badge bg={getRoleUI(selectedUser.role).bg} color={getRoleUI(selectedUser.role).color} px={3} py={1} rounded="md">
                                            {getRoleUI(selectedUser.role).label}
                                        </Badge>
                                        <Badge bg="whiteAlpha.100" color="gray.300" px={3} py={1} rounded="md">
                                            Tenant: {selectedUser.tenant}
                                        </Badge>
                                    </Flex>
                                </Flex>

                                {/* Quick Actions */}
                                <SimpleGrid columns={2} gap={3} mb={8}>
                                    <Button variant="outline" borderColor="whiteAlpha.200" color="white" h="45px" display="flex" gap={2} _hover={{ bg: "whiteAlpha.100" }} onClick={() => handleAction("impersonate-user")}>
                                        <Icon as={LuVenetianMask} color={brandColor} /> Impersonate
                                    </Button>
                                    <Button variant="outline" borderColor="whiteAlpha.200" color="white" h="45px" display="flex" gap={2} _hover={{ bg: "whiteAlpha.100" }} onClick={() => handleAction("set-user-password")}>
                                        <Icon as={LuKey} color="yellow.400" /> Reset Pwd
                                    </Button>
                                </SimpleGrid>

                                {/* Configuration Section */}
                                <Text color="white" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Global Role & Access</Text>
                                <VStack gap={4} align="stretch" mb={8}>
                                    <Box>
                                        <Text color="gray.500" fontSize="xs" mb={2}>System Role (set-role)</Text>
                                        <Flex wrap="wrap" gap={2} bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" p={2}>
                                            {['customer', 'shop_staff', 'shop_owner', 'super_admin'].map(r => (
                                                <Button 
                                                    key={r} flex="1 1 45%" size="xs" rounded="md" textTransform="capitalize" h="30px"
                                                    bg={selectedUser.role === r ? "whiteAlpha.200" : "transparent"} 
                                                    color={selectedUser.role === r ? "white" : "gray.500"}
                                                    border={selectedUser.role === r ? "1px solid" : "none"} borderColor="whiteAlpha.300"
                                                    onClick={() => handleAction("set-role")}
                                                >
                                                    {r.replace('_', ' ')}
                                                </Button>
                                            ))}
                                        </Flex>
                                    </Box>
                                    
                                    <Box bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="lg" p={4}>
                                        <Flex justify="space-between" align="center" mb={2}>
                                            <Flex align="center" gap={2}>
                                                <Icon as={LuMonitorSmartphone} color="gray.400" />
                                                <Text color="white" fontSize="sm" fontWeight="bold">Active Sessions</Text>
                                            </Flex>
                                            <Badge bg="whiteAlpha.200" color="white">{selectedUser.activeSessions}</Badge>
                                        </Flex>
                                        <Button size="sm" w="full" mt={2} variant="outline" borderColor="red.900" color="red.400" _hover={{ bg: "red.900" }} onClick={() => handleAction("revoke-user-sessions")}>
                                            Revoke All Sessions
                                        </Button>
                                    </Box>
                                </VStack>

                                {/* Danger Zone */}
                                <Text color="red.400" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Danger Zone</Text>
                                <VStack gap={3} align="stretch">
                                    {selectedUser.status === 'active' ? (
                                        <Button bg="red.500" color="white" h="50px" rounded="lg" display="flex" justifyItems="flex-start" px={4} gap={3} _hover={{ bg: "red.600" }} onClick={() => handleAction("ban-user")}>
                                            <Icon as={LuUserX} /> Suspend / Ban User
                                        </Button>
                                    ) : (
                                        <Button bg={brandColor} color="white" h="50px" rounded="lg" display="flex" justifyItems="flex-start" px={4} gap={3} _hover={{ filter: "brightness(1.1)" }} onClick={() => handleAction("unban-user")}>
                                            <Icon as={LuShieldCheck} /> Lift Suspension
                                        </Button>
                                    )}
                                    <Button variant="outline" borderColor="red.900" color="red.500" h="50px" rounded="lg" display="flex" justifyItems="flex-start" px={4} gap={3} _hover={{ bg: "red.900", color: "white" }} onClick={() => handleAction("remove-user")}>
                                        <Icon as={LuTrash2} /> Delete User Permanently
                                    </Button>
                                </VStack>

                            </Box>
                        </>
                    )}
                </Flex>
            </Box>

        </Box>
    );
}