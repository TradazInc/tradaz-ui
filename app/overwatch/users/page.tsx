"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar, Input, IconButton, VStack, ScrollArea
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuSearch, LuFilter, LuArrowUpRight, LuUsers, LuUser, LuShieldAlert, 
    LuBan, LuEye, LuFlipVertical, LuStore, LuCheck, LuShield, LuX, LuMail, LuCalendar, LuClock
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "160px" };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

// --- MOCK DATA ---
const USER_KPIs = [
    { label: "Total Platform Users", value: "48,312", trend: "+1,240 this month", icon: LuUsers, iconColor: "blue.400" },
    { label: "Active Buyers", value: "45,102", trend: "93% of base", icon: LuUser, iconColor: "#888888" },
    { label: "Verified Merchants", value: "3,185", trend: "+42 this week", icon: LuStore, iconColor: "#5cac7d" },
    { label: "Restricted Accounts", value: "25", trend: "System flagged", icon: LuShieldAlert, iconColor: "red.400" },
];

export interface PlatformUser {
    id: string;
    name: string;
    email: string;
    role: "Buyer" | "Merchant" | "Admin";
    status: "Active" | "Suspended" | "Banned";
    lastActive: string;
    joinedAt: string;
}

const INITIAL_USERS: PlatformUser[] = [
    { id: "USR-0001", name: "System Admin", email: "admin@tradaz.com", role: "Admin", status: "Active", lastActive: "Just now", joinedAt: "Jan 01, 2022" },
    { id: "USR-4092", name: "Urban Kicks NG", email: "hello@urbankicks.ng", role: "Merchant", status: "Active", lastActive: "2 mins ago", joinedAt: "Nov 01, 2022" },
    { id: "USR-9901", name: "Sarah Connor", email: "sarah.c@example.com", role: "Buyer", status: "Active", lastActive: "1 hour ago", joinedAt: "Jan 12, 2023" },
    { id: "USR-9902", name: "Chuka Obi", email: "chuka@example.com", role: "Buyer", status: "Active", lastActive: "3 days ago", joinedAt: "Mar 05, 2023" },
    { id: "USR-4115", name: "Gadget World", email: "support@gadgetworld.io", role: "Merchant", status: "Suspended", lastActive: "1 week ago", joinedAt: "Jun 14, 2023" },
    { id: "USR-9905", name: "Bad Actor", email: "scammer99@fakemail.io", role: "Buyer", status: "Banned", lastActive: "1 month ago", joinedAt: "Nov 15, 2023" },
];

// --- VIEW USER MODAL ---
const ViewUserModal = ({ user, onClose }: { user: PlatformUser | null; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {user && (
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
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>User Profile</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{user.name}</Text>
                                    </Box>
                                    <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Flex align="center" gap={4} mb={4}>
                                                <Avatar.Root size="lg" rounded="none">
                                                    <Avatar.Fallback name={user.name} bg="#1A1A1A" color="white" border="1px solid #333333" />
                                                </Avatar.Root>
                                                <Box>
                                                    <Text color="white" fontWeight="bold">{user.name}</Text>
                                                    <Text color="#888888" fontSize="sm" fontFamily="monospace">{user.id}</Text>
                                                </Box>
                                            </Flex>
                                            <Flex align="center" gap={2} color="#888888" fontSize="sm" mb={2}>
                                                <Icon as={LuMail} /> {user.email}
                                            </Flex>
                                        </Box>
                                        
                                        <Flex justify="space-between" align="center" bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Box>
                                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>System Role</Text>
                                                <Text color="white" fontSize="sm" fontWeight="bold">{user.role}</Text>
                                            </Box>
                                            <Badge colorScheme={user.status === "Active" ? "green" : user.status === "Suspended" ? "yellow" : "red"} px={3} py={1} rounded="none" textTransform="uppercase">
                                                {user.status}
                                            </Badge>
                                        </Flex>

                                        <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={4}>Activity Log</Text>
                                            <Flex align="center" gap={3} mb={3}>
                                                <Icon as={LuCalendar} color="#888888" />
                                                <Text color="white" fontSize="sm">Joined: <Text as="span" fontWeight="bold">{user.joinedAt}</Text></Text>
                                            </Flex>
                                            <Flex align="center" gap={3}>
                                                <Icon as={LuClock} color="#888888" />
                                                <Text color="white" fontSize="sm">Last Active: <Text as="span" fontWeight="bold">{user.lastActive}</Text></Text>
                                            </Flex>
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

// --- MANAGE USER MODAL ---
const ManageUserModal = ({ 
    user, onClose, onUpdate 
}: { 
    user: PlatformUser | null; onClose: () => void; onUpdate: (id: string, updates: Partial<PlatformUser>) => void 
}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<PlatformUser["status"]>(user?.status || "Active");
    const [role, setRole] = useState<PlatformUser["role"]>(user?.role || "Buyer");

    React.useEffect(() => {
        if (user) {
            setStatus(user.status);
            setRole(user.role);
        }
    }, [user]);

    if (!user) return null;

    const handleSaveChanges = () => {
        setIsSaving(true);
        setTimeout(() => {
            onUpdate(user.id, { status, role });
            setIsSaving(false);
            onClose();
        }, 600); // Simulate API delay
    };

    return (
        <AnimatePresence>
            {user && (
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
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Manage User</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{user.name}</Text>
                                    </Box>
                                    <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box>
                                            <Text as="label" {...labelStyles}>Account Status</Text>
                                           <select value={status} onChange={(e) => setStatus(e.target.value as PlatformUser["status"])} style={{ ...nativeSelectStyle, width: "100%" }}>
                                                <option value="Active">Active</option>
                                                <option value="Suspended">Suspended</option>
                                                <option value="Banned">Banned</option>
                                            </select>
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>System Role</Text>
                                           <select value={role} onChange={(e) => setRole(e.target.value as PlatformUser["role"])} style={{ ...nativeSelectStyle, width: "100%" }}>
                                                <option value="Buyer">Buyer</option>
                                                <option value="Merchant">Merchant</option>
                                                <option value="Admin">Admin</option>
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

export default function UsersPage() {
    const [users, setUsers] = useState<PlatformUser[]>(INITIAL_USERS);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    
    // Modal State
    const [viewingUser, setViewingUser] = useState<PlatformUser | null>(null);
    const [managingUser, setManagingUser] = useState<PlatformUser | null>(null);
    const [isExporting, setIsExporting] = useState(false);

    // --- ACTIONS ---
    const handleUpdateUser = (id: string, updates: Partial<PlatformUser>) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    };

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            const headers = ["User ID", "Name", "Email", "Role", "Status", "Joined", "Last Active"];
            const csvRows = filteredUsers.map(u => 
                [u.id, `"${u.name}"`, `"${u.email}"`, u.role, u.status, `"${u.joinedAt}"`, `"${u.lastActive}"`].join(",")
            );
            const csvString = [headers.join(","), ...csvRows].join("\n");
            
            const blob = new Blob([csvString], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'platform_users_export.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            setIsExporting(false);
        }, 800);
    };

    // --- FILTER LOGIC ---
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              user.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "All" || user.role === roleFilter;
        const matchesStatus = statusFilter === "All" || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const getRoleStyle = (role: string) => {
        switch (role) {
            case "Admin": return { bg: "rgba(159, 122, 234, 0.1)", color: "purple.400", border: "1px solid var(--chakra-colors-purple-400)", icon: LuShield };
            case "Merchant": return { bg: "rgba(66, 153, 225, 0.1)", color: "blue.400", border: "1px solid var(--chakra-colors-blue-400)", icon: LuStore };
            default: return { bg: "#111111", color: "#888888", border: "1px solid #333333", icon: LuUser }; // Buyer
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Active": return { color: "#5cac7d", icon: LuCheck };
            case "Suspended": return { color: "yellow.400", icon: LuShieldAlert };
            case "Banned": return { color: "red.400", icon: LuBan };
            default: return { color: "#888888", icon: LuUser };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Platform Users
                    </Text>
                    <Text color="#888888" fontSize="sm">Central directory for all registered accounts: Buyers, Merchants, and Staff.</Text>
                </Box>
                
                <Button 
                    onClick={handleExport} loading={isExporting} loadingText="Exporting..."
                    display={{ base: "none", sm: "flex" }} bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} gap={2} h="44px" px={6} fontWeight="bold"
                >
                    <Icon as={LuArrowUpRight} color="#888888" strokeWidth="2.5" /> Export Roster
                </Button>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {USER_KPIs.map((kpi, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex boxSize="40px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center">
                                <Icon as={kpi.icon} color={kpi.iconColor} boxSize="20px" strokeWidth="2.5" />
                            </Flex>
                            <Badge bg="#111111" color="#888888" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                {kpi.trend}
                            </Badge>
                        </Flex>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>{kpi.label}</Text>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{kpi.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- TOOLBAR (SEARCH & FILTERS) --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} mb={8}>
                <Flex direction={{ base: "column", md: "row" }} gap={4} w="full" justify="space-between">
                    {/* Search */}
                    <Flex flex={1} maxW={{ md: "400px" }} align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search by name, email, or ID..." 
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
                        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Roles</option>
                            <option value="Buyer" style={{ background: "#000000" }}>Buyers Only</option>
                            <option value="Merchant" style={{ background: "#000000" }}>Merchants Only</option>
                            <option value="Admin" style={{ background: "#000000" }}>Staff / Admins</option>
                        </select>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Statuses</option>
                            <option value="Active" style={{ background: "#000000" }}>Active</option>
                            <option value="Suspended" style={{ background: "#000000" }}>Suspended</option>
                            <option value="Banned" style={{ background: "#000000" }}>Banned</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>

            {/* --- USERS LIST TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
                <ScrollArea.Root maxW="full">
                    <ScrollArea.Viewport pb={4}>
                        <Box minW="1000px">
                            
                            {/* Columns Header */}
                            <Grid templateColumns="2.5fr 1fr 1fr 1fr 100px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">User Identity</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Platform Role</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Activity</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Account Status</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>

                            {/* Table Rows */}
                            {filteredUsers.length === 0 ? (
                                <Flex justify="center" align="center" py={16} direction="column">
                                    <Icon as={LuUsers} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                                    <Text color="#888888" fontSize="lg" fontWeight="bold">No users found.</Text>
                                </Flex>
                            ) : (
                                <VStack align="stretch" gap={0}>
                                    {filteredUsers.map((user) => {
                                        const roleStyle = getRoleStyle(user.role);
                                        const statusStyle = getStatusStyle(user.status);
                                        
                                        return (
                                            <Grid 
                                                key={user.id} 
                                                templateColumns="2.5fr 1fr 1fr 1fr 100px" gap={4} px={6} py={5} 
                                                borderBottom="1px solid #1A1A1A" 
                                                alignItems="center" 
                                                _hover={{ bg: "#111111" }} transition="background 0.2s"
                                            >
                                                {/* Identity */}
                                                <Flex align="center" gap={4}>
                                                    <Avatar.Root size="md" rounded="full">
                                                        <Avatar.Fallback name={user.name} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="black" />
                                                    </Avatar.Root>
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" mb={0.5}>{user.name}</Text>
                                                        <Text color="#888888" fontSize="xs">{user.email}</Text>
                                                        <Text color="#555555" fontSize="10px" fontFamily="monospace" mt={1}>ID: {user.id}</Text>
                                                    </Box>
                                                </Flex>

                                                {/* Role */}
                                                <Box>
                                                    <Flex align="center" gap={2} {...roleStyle} px={2.5} py={1} rounded="none" display="inline-flex">
                                                        <Icon as={roleStyle.icon} boxSize="12px" strokeWidth="2.5" />
                                                        <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{user.role}</Text>
                                                    </Flex>
                                                </Box>

                                                {/* Activity */}
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" mb={1}>{user.lastActive}</Text>
                                                    <Text color="#888888" fontSize="xs">Joined: {user.joinedAt}</Text>
                                                </Box>

                                                {/* Status */}
                                                <Box>
                                                    <Flex align="center" gap={2}>
                                                        <Icon as={statusStyle.icon} color={statusStyle.color} boxSize="14px" strokeWidth="3" />
                                                        <Text color={statusStyle.color} fontSize="sm" fontWeight="bold">{user.status}</Text>
                                                    </Flex>
                                                </Box>
                                                
                                                {/* Actions */}
                                                <Flex justify="flex-end" gap={2}>
                                                    <IconButton 
                                                        onClick={() => setViewingUser(user)}
                                                        aria-label="View Data" size="sm" h="36px" w="36px" bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }}
                                                    >
                                                        <Icon as={LuEye} strokeWidth="2.5" />
                                                    </IconButton>
                                                    <IconButton 
                                                        onClick={() => setManagingUser(user)}
                                                        aria-label="Manage Account" size="sm" h="36px" w="36px" variant="outline" borderColor="#333333" color="#888888" rounded="none" _hover={{ bg: "#111111", color: "white" }}
                                                    >
                                                        <Icon as={LuFlipVertical} strokeWidth="2.5" />
                                                    </IconButton>
                                                </Flex>

                                            </Grid>
                                        );
                                    })}
                                </VStack>
                            )}
                        </Box>
                    </ScrollArea.Viewport>
                    
                    {/* Horizontal Scrollbar */}
                    <ScrollArea.Scrollbar orientation="horizontal" bg="#0A0A0A" h="6px" p={0}>
                        <ScrollArea.Thumb bg="#1A1A1A" rounded="none" _hover={{ bg: "#333333" }} />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </Box>

            {/* --- Modals --- */}
            <ViewUserModal user={viewingUser} onClose={() => setViewingUser(null)} />
            <ManageUserModal user={managingUser} onClose={() => setManagingUser(null)} onUpdate={handleUpdateUser} />
        </Box>
    );
}