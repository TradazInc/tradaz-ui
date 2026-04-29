"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid,VStack, Avatar, IconButton, Spinner
} from "@chakra-ui/react";
import { 
    LuSearch, LuPlus, LuShieldAlert, LuKey, LuUserX, LuVenetianMask, 
    LuShield, LuShieldCheck, LuEllipsisVertical, LuX, LuMonitorSmartphone, LuTrash2, LuStore
} from "react-icons/lu";

import { useAdminUsers, AdminUser, Role } from "@/app/hooks/useAdminUsers";

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

export default function AdminUsersPage() {
    // Call the Hook
    const {
        searchQuery, roleFilter, statusFilter, sortBy, sortOrder,
        handleSearch, handleRoleFilter, handleStatusFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount, totalLimit,
        visibleCount, isLoadingMore, loaderRef
    } = useAdminUsers();

    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

    const handleAction = (actionName: string) => {
        alert(`API Triggered: POST /api/auth/admin/${actionName}\nTarget User: ${selectedUser?.email}`);
    };

    
    const getRoleUI = (role: Role) => {
        switch (role) {
            case "super_admin": return { iconColor: "purple.400", icon: LuShieldAlert, label: "Platform Admin" };
            case "shop_owner": return { iconColor: "blue.400", icon: LuShieldCheck, label: "Shop Owner" };
            case "shop_staff": return { iconColor: "teal.400", icon: LuStore, label: "Shop Staff" };
            case "customer": return { iconColor: "gray.500", icon: LuShield, label: "Customer" };
            default: return { iconColor: "gray.500", icon: LuShield, label: "Unknown" };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease" position="relative" bg="#000000" minH="100vh">
            
            {/* --- COMBINED STICKY HEADER & TOOLBAR --- */}
            <Box 
                position="sticky" top="0" zIndex={30} 
                bg="#000000" 
                mx={{ base: "-16px", lg: "-32px" }} px={{ base: "16px", lg: "32px" }}
                pt={{ base: 4, lg: 8 }} pb={6} mb={8} 
                borderBottom="1px solid #1A1A1A"
            >
                {/* Title & Action */}
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={6} gap={4}>
                    <Box>
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">Global Users ({totalLimit})</Text>
                        <Text color="#888888" fontSize="sm">Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedCount}</Text> • Manage platform admins, shop owners, and customers.</Text>
                    </Box>
                    <Button w={{ base: "full", md: "auto" }} bg="#111111" border="1px solid #333333" color="white" rounded="none" h="44px" px={6} _hover={{ bg: "#1A1A1A", borderColor: "white" }} display="flex" gap={2} onClick={() => handleAction("create-user")} fontWeight="bold">
                        <Icon as={LuPlus} color="#5cac7d" strokeWidth="2.5" /> Add Global User
                    </Button>
                </Flex>

                {/* Filters & Search */}
                <Flex direction={{ base: "column", lg: "row" }} gap={3} w="full">
                    {/* Search */}
                    <Flex flex={1} w={{ base: "full", lg: "auto" }} minW={{ lg: "300px" }} align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search by name, email, or tenant..." border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={handleSearch}
                        />
                    </Flex>
                    
                    {/* Functional Dropdowns */}
                    <Flex gap={3} w={{ base: "full", lg: "auto" }} wrap="wrap">
                        <Box flex={{ base: "1 1 45%", lg: "initial" }} w={{ lg: "150px" }}>
                            <select value={roleFilter} onChange={handleRoleFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#000000" }}>All Roles</option>
                                <option value="super_admin" style={{ background: "#000000" }}>Platform Admins</option>
                                <option value="shop_owner" style={{ background: "#000000" }}>Shop Owners</option>
                                <option value="shop_staff" style={{ background: "#000000" }}>Shop Staff</option>
                                <option value="customer" style={{ background: "#000000" }}>Customers</option>
                            </select>
                        </Box>
                        <Box flex={{ base: "1 1 45%", lg: "initial" }} w={{ lg: "140px" }}>
                            <select value={statusFilter} onChange={handleStatusFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#000000" }}>All Statuses</option>
                                <option value="active" style={{ background: "#000000" }}>Active</option>
                                <option value="banned" style={{ background: "#000000" }}>Banned</option>
                            </select>
                        </Box>
                        <Box flex={{ base: "1 1 45%", lg: "initial" }} w={{ lg: "150px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="name" style={{ background: "#000000" }}>Sort: Name</option>
                                <option value="tenant" style={{ background: "#000000" }}>Sort: Tenant</option>
                                <option value="role" style={{ background: "#000000" }}>Sort: Role</option>
                            </select>
                        </Box>
                        <Box flex={{ base: "1 1 45%", lg: "initial" }} w={{ lg: "150px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="asc" style={{ background: "#000000" }}>A-Z / Ascending</option>
                                <option value="desc" style={{ background: "#000000" }}>Z-A / Descending</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- USERS GRID --- */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" bg="#0A0A0A" border="1px dashed #1A1A1A">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No users found.</Text>
                </Flex>
            ) : (
                <VStack align="stretch" gap={3}>
                    <Grid templateColumns="2fr 1.5fr 1.5fr 1fr 1fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">User</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Platform Role</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Shop</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Last Login</Text>
                        <Text></Text>
                    </Grid>

                    {visibleItems.map((user: AdminUser) => {
                        const roleUI = getRoleUI(user.role);
                        const isBanned = user.status === 'banned';

                        return (
                            <Grid 
                                key={user.id} 
                                templateColumns={{ base: "1fr auto", md: "2fr 1.5fr auto", xl: "2fr 1.5fr 1.5fr 1fr 1fr 50px" }} 
                                gap={4} p={4} bg="#0A0A0A" rounded="none" border="1px solid" borderColor= "#1A1A1A"
                                alignItems="center" cursor="pointer" transition="all 0.2s"
                                _hover={{ borderColor: "#333333", bg: "#111111" }}
                                onClick={() => setSelectedUser(user)}
                            >
                                {/* User Info */}
                                <Flex align="center" gap={3}>
                                    <Avatar.Root size="md" rounded="full">
                                        <Avatar.Fallback name={user.name} bg="#111111" border="1px solid #333333" color="white" rounded="full" fontWeight="bold" />
                                    </Avatar.Root>
                                    <Box overflow="hidden">
                                        <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1} letterSpacing="tight">{user.name}</Text>
                                        <Text color="#888888" fontSize="xs" lineClamp={1}>{user.email}</Text>
                                    </Box>
                                </Flex>

                                {/* Role */}
                                <Flex align="center" display={{ base: "none", md: "flex" }}>
                                    <Flex bg="#111111" border="1px solid #333333" px={2.5} py={1} rounded="none" align="center" gap={1.5}>
                                        <Icon as={roleUI.icon} color={roleUI.iconColor} strokeWidth="2.5" boxSize="14px" />
                                        <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                            {roleUI.label}
                                        </Text>
                                    </Flex>
                                </Flex>

                                {/* Tenant / Shop */}
                                <Text color="white" fontSize="sm" fontWeight="bold" display={{ base: "none", xl: "block" }}>
                                    {user.tenant}
                                </Text>

                                {/* Status */}
                                <Box display="block">
                                    <Flex align="center" gap={2}>
                                        <Box boxSize="6px" rounded="none" bg={isBanned ? "red.400" : "#5cac7d"} />
                                        <Text color={isBanned ? "red.400" : "white"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                            {user.status}
                                        </Text>
                                    </Flex>
                                </Box>

                                {/* Last Login */}
                                <Text color="#888888" fontSize="sm" display={{ base: "none", xl: "block" }}>{user.lastLogin}</Text>

                                {/* Actions Icon */}
                                <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                    <Icon as={LuEllipsisVertical} color="#888888" strokeWidth="2.5" _hover={{ color: "white" }} />
                                </Flex>
                            </Grid>
                        );
                    })}

                    {/* Infinite Scroll Trigger */}
                    {visibleCount < processedCount && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            {isLoadingMore && <Spinner color="white" size="md" />}
                        </Flex>
                    )}
                </VStack>
            )}

            {/* --- USER DETAILS & COMMAND DRAWER --- */}
            <Box position="fixed" inset={0} zIndex={9999} pointerEvents={selectedUser ? "auto" : "none"}>
                <Box position="absolute" inset={0} bg="rgba(0,0,0,0.85)" backdropFilter="blur(4px)" opacity={selectedUser ? 1 : 0} transition="opacity 0.3s ease" onClick={() => setSelectedUser(null)} />
                
                <Flex 
                    position="absolute" top={0} right={0} h="100vh" w={{ base: "full", sm: "450px" }}
                    bg="#000000" borderLeft="1px solid" borderColor="#1A1A1A" direction="column" shadow="2xl"
                    transform={selectedUser ? "translateX(0)" : "translateX(100%)"} transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                    {selectedUser && (
                        <>
                            <Flex align="center" justify="space-between" p={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#0A0A0A">
                                <Text fontSize="lg" fontWeight="bold" color="white" letterSpacing="tight">User Overview</Text>
                                <IconButton aria-label="Close" variant="ghost" color="#888888" rounded="none" onClick={() => setSelectedUser(null)} _hover={{ bg: "#111111", color: "white" }}>
                                    <LuX strokeWidth="2.5" />
                                </IconButton>
                            </Flex>

                            <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                
                                {/* Profile Card */}
                                <Flex direction="column" align="center" textAlign="center" mb={8}>
                                    <Avatar.Root size="2xl" width="80px" height="80px" rounded="full" mb={4}>
                                        <Avatar.Fallback name={selectedUser.name} bg="#111111" border="1px solid #333333" color="white" rounded="none" />
                                    </Avatar.Root>
                                    <Text color="white" fontSize="xl" fontWeight="black" letterSpacing="tight">{selectedUser.name}</Text>
                                    <Text color="#888888" fontSize="sm" mb={3}>{selectedUser.email}</Text>
                                    
                                    <Flex gap={2} mt={1} wrap="wrap" justify="center">
                                        <Flex bg="#111111" border="1px solid #333333" px={3} py={1} rounded="none" align="center" gap={1.5}>
                                            <Icon as={getRoleUI(selectedUser.role).icon} color={getRoleUI(selectedUser.role).iconColor} strokeWidth="2.5" boxSize="12px" />
                                            <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                {getRoleUI(selectedUser.role).label}
                                            </Text>
                                        </Flex>
                                        <Flex bg="#111111" border="1px solid #333333" px={3} py={1} rounded="none" align="center">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                Tenant: <Text as="span" color="white">{selectedUser.tenant}</Text>
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {/* Quick Actions */}
                                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={3} mb={8}>
                                    <Button bg="#111111" border="1px solid #333333" color="white" h="44px" rounded="none" display="flex" gap={2} _hover={{ bg: "#1A1A1A" }} onClick={() => handleAction("impersonate-user")} fontWeight="bold">
                                        <Icon as={LuVenetianMask} color="#5cac7d" strokeWidth="2.5" /> Impersonate
                                    </Button>
                                    <Button bg="#111111" border="1px solid #333333" color="white" h="44px" rounded="none" display="flex" gap={2} _hover={{ bg: "#1A1A1A" }} onClick={() => handleAction("set-user-password")} fontWeight="bold">
                                        <Icon as={LuKey} color="orange.400" strokeWidth="2.5" /> Reset Pwd
                                    </Button>
                                </Grid>

                                {/* Configuration Section */}
                                <Text color="#888888" fontWeight="bold" mb={3} fontSize="10px" textTransform="uppercase" letterSpacing="wider">Global Role & Access</Text>
                                <VStack gap={4} align="stretch" mb={8}>
                                    <Box>
                                        <Text color="#555555" fontSize="xs" mb={2} fontWeight="bold">System Role (set-role)</Text>
                                        <Flex wrap="wrap" gap={2} bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" rounded="none" p={2}>
                                            {['customer', 'shop_staff', 'shop_owner', 'super_admin'].map(r => (
                                                <Button 
                                                    key={r} flex="1 1 45%" size="sm" rounded="none" textTransform="capitalize" h="36px"
                                                    bg={selectedUser.role === r ? "#111111" : "transparent"} 
                                                    color={selectedUser.role === r ? "white" : "#888888"}
                                                    border="1px solid" borderColor={selectedUser.role === r ? "#333333" : "transparent"}
                                                    onClick={() => handleAction("set-role")}
                                                    fontWeight="bold"
                                                    _hover={{ bg: "#1A1A1A" }}
                                                >
                                                    {r.replace('_', ' ')}
                                                </Button>
                                            ))}
                                        </Flex>
                                    </Box>
                                    
                                    <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" rounded="none" p={4}>
                                        <Flex justify="space-between" align="center" mb={4}>
                                            <Flex align="center" gap={2}>
                                                <Icon as={LuMonitorSmartphone} color="#888888" strokeWidth="2.5" />
                                                <Text color="white" fontSize="sm" fontWeight="bold">Active Sessions</Text>
                                            </Flex>
                                            <Text color="white" fontWeight="black">{selectedUser.activeSessions}</Text>
                                        </Flex>
                                        <Button size="sm" w="full" bg="#111111" border="1px solid #333333" color="red.400" rounded="none" _hover={{ bg: "#1A1A1A" }} onClick={() => handleAction("revoke-user-sessions")} fontWeight="bold">
                                            Revoke All Sessions
                                        </Button>
                                    </Box>
                                </VStack>

                                {/* Danger Zone */}
                                <Text color="red.400" fontWeight="bold" mb={3} fontSize="10px" textTransform="uppercase" letterSpacing="wider">Danger Zone</Text>
                                <VStack gap={3} align="stretch">
                                    {selectedUser.status === 'active' ? (
                                        <Button bg="#111111" border="1px solid #333333" color="white" h="44px" rounded="none" display="flex" justifyItems="flex-start" px={4} gap={3} _hover={{ bg: "#1A1A1A" }} onClick={() => handleAction("ban-user")} fontWeight="bold">
                                            <Icon as={LuUserX} color="red.400" strokeWidth="2.5" /> Suspend / Ban User
                                        </Button>
                                    ) : (
                                        <Button bg="white" color="black" h="44px" rounded="none" display="flex" justifyItems="flex-start" px={4} gap={3} _hover={{ bg: "#E5E5E5" }} onClick={() => handleAction("unban-user")} fontWeight="bold" border="none">
                                            <Icon as={LuShieldCheck} color="#5cac7d" strokeWidth="2.5" /> Lift Suspension
                                        </Button>
                                    )}
                                    <Button variant="outline" borderColor="#333333" bg="#0A0A0A" color="white" h="44px" rounded="none" display="flex" justifyItems="flex-start" px={4} gap={3} _hover={{ bg: "#111111" }} onClick={() => handleAction("remove-user")} fontWeight="bold">
                                        <Icon as={LuTrash2} color="red.400" strokeWidth="2.5" /> Delete User Permanently
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