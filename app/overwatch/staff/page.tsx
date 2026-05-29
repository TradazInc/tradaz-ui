"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar, Input, IconButton, VStack, ScrollArea, Spinner
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuSearch, LuFilter, LuShield, LuKey, LuUser, LuMail, 
    LuCheck, LuLock, LuUserMinus, LuSettings, LuPlus, LuUsers, LuX, LuUserCheck
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "160px" };
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };
const scrollbarStyles = { '&::-webkit-scrollbar': { height: '6px', width: '6px' }, '&::-webkit-scrollbar-track': { background: 'transparent' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' }, '&::-webkit-scrollbar-thumb:hover': { background: '#555555' } };

// --- MOCK DATA ---
const STAFF_KPIs = [
    { label: "Total Staff", value: "24", trend: "Active roster", icon: LuUsers, iconColor: "blue.400" },
    { label: "Super Admins", value: "3", trend: "Full platform access", icon: LuShield, iconColor: "red.400" },
    { label: "2FA Compliance", value: "100%", trend: "Mandatory policy", icon: LuLock, iconColor: "#5cac7d" },
    { label: "Pending Invites", value: "2", trend: "Awaiting setup", icon: LuMail, iconColor: "yellow.400" },
];

export type RoleType = "Super Admin" | "Support Lead" | "Moderator" | "Financial Analyst";

export interface StaffRecord {
    id: string;
    name: string;
    email: string;
    role: RoleType;
    clearance: number; // 1 to 5
    status: "Active" | "Inactive" | "Invited";
    twoFactor: boolean;
    lastLogin: string;
}

const INITIAL_STAFF: StaffRecord[] = [
    { id: "STF-001", name: "System Ops", email: "admin@tradaz.com", role: "Super Admin", clearance: 5, status: "Active", twoFactor: true, lastLogin: "Just now" },
    { id: "STF-012", name: "Jane Doe", email: "jane.d@tradaz.com", role: "Support Lead", clearance: 4, status: "Active", twoFactor: true, lastLogin: "2 hours ago" },
    { id: "STF-018", name: "Mark Essien", email: "mark.e@tradaz.com", role: "Financial Analyst", clearance: 4, status: "Active", twoFactor: true, lastLogin: "Yesterday, 09:15 AM" },
    { id: "STF-024", name: "Aisha Bello", email: "aisha.b@tradaz.com", role: "Moderator", clearance: 3, status: "Active", twoFactor: true, lastLogin: "Oct 24, 14:30 PM" },
    { id: "STF-025", name: "Chuka Obi", email: "chuka.o@tradaz.com", role: "Moderator", clearance: 3, status: "Invited", twoFactor: false, lastLogin: "Never" },
    { id: "STF-009", name: "Wada Gift", email: "wada.g@tradaz.com", role: "Support Lead", clearance: 4, status: "Inactive", twoFactor: true, lastLogin: "Aug 12, 2023" },
];

const getRoleClearance = (role: RoleType): number => {
    switch (role) {
        case "Super Admin": return 5;
        case "Support Lead": return 4;
        case "Financial Analyst": return 4;
        case "Moderator": return 3;
        default: return 1;
    }
};

const getStatusStyle = (status: string) => {
    switch (status) {
        case "Active": return { bg: "rgba(92, 172, 125, 0.1)", color: "#5cac7d", border: "1px solid #5cac7d", icon: LuCheck };
        case "Invited": return { bg: "rgba(236, 201, 75, 0.1)", color: "yellow.400", border: "1px solid var(--chakra-colors-yellow-400)", icon: LuMail };
        case "Inactive": return { bg: "rgba(229, 62, 62, 0.1)", color: "red.400", border: "1px solid var(--chakra-colors-red-400)", icon: LuUserMinus };
        default: return { bg: "#111111", color: "#888888", border: "1px solid #333333", icon: LuUser };
    }
};

const getRoleColor = (clearance: number) => {
    if (clearance === 5) return "red.400";
    if (clearance === 4) return "blue.400";
    return "#888888";
};

// --- INVITE STAFF MODAL ---
const InviteStaffModal = ({ 
    isOpen, onClose, onSubmit 
}: { 
    isOpen: boolean; onClose: () => void; onSubmit: (data: { name: string; email: string; role: RoleType }) => void 
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<{ name: string; email: string; role: RoleType }>({ name: '', email: '', role: 'Moderator' });

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            onSubmit(formData);
            setIsLoading(false);
            setFormData({ name: '', email: '', role: 'Moderator' });
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
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Access Management</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">Invite Team Member</Text>
                                    </Box>
                                    <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={scrollbarStyles}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box>
                                            <Text as="label" {...labelStyles}>Full Name <Text as="span" color="red.400">*</Text></Text>
                                            <Input placeholder="e.g. John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} {...inputStyles} />
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>Email Address <Text as="span" color="red.400">*</Text></Text>
                                            <Input type="email" placeholder="john@tradaz.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} {...inputStyles} />
                                        </Box>
                                        <Box>
                                            <Text as="label" {...labelStyles}>Assign Role <Text as="span" color="red.400">*</Text></Text>
                                            <select 
                                                value={formData.role} 
                                                onChange={e => setFormData({...formData, role: e.target.value as RoleType})} 
                                                style={{...nativeSelectStyle, width: "100%", minWidth: "100%"}}
                                            >
                                                <option value="Super Admin" style={{ background: "#000000" }}>Super Admin (Level 5)</option>
                                                <option value="Support Lead" style={{ background: "#000000" }}>Support Lead (Level 4)</option>
                                                <option value="Financial Analyst" style={{ background: "#000000" }}>Financial Analyst (Level 4)</option>
                                                <option value="Moderator" style={{ background: "#000000" }}>Moderator (Level 3)</option>
                                            </select>
                                        </Box>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} loading={isLoading} loadingText="Sending Invite..." disabled={!formData.name || !formData.email} _hover={{ bg: "#E5E5E5" }}>
                                        Send Invitation
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

// --- EDIT ROLE DRAWER ---
const EditRoleDrawer = ({ 
    staff, onClose, onSave 
}: { 
    staff: StaffRecord | null; onClose: () => void; onSave: (id: string, newRole: RoleType) => void 
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<RoleType>("Moderator");

    // Sync state when drawer opens
    React.useEffect(() => {
        if (staff) setSelectedRole(staff.role);
    }, [staff]);

    if (!staff) return null;

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            onSave(staff.id, selectedRole);
            setIsLoading(false);
            onClose();
        }, 800);
    };

    return (
        <AnimatePresence>
            {staff && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Update Privileges</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{staff.name}</Text>
                                    </Box>
                                    <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={scrollbarStyles}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                                            <Flex align="center" justify="space-between" mb={3}>
                                                <Text color="#888888" fontSize="sm">Current Role</Text>
                                                <Text color="white" fontWeight="bold">{staff.role}</Text>
                                            </Flex>
                                            <Flex align="center" justify="space-between">
                                                <Text color="#888888" fontSize="sm">Account ID</Text>
                                                <Text color="white" fontFamily="monospace" fontSize="xs">{staff.id}</Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box>
                                            <Text as="label" {...labelStyles}>New Role Assignment</Text>
                                            <select 
                                                value={selectedRole} 
                                                onChange={e => setSelectedRole(e.target.value as RoleType)} 
                                                style={{...nativeSelectStyle, width: "100%", minWidth: "100%"}}
                                            >
                                                <option value="Super Admin" style={{ background: "#000000" }}>Super Admin (Level 5)</option>
                                                <option value="Support Lead" style={{ background: "#000000" }}>Support Lead (Level 4)</option>
                                                <option value="Financial Analyst" style={{ background: "#000000" }}>Financial Analyst (Level 4)</option>
                                                <option value="Moderator" style={{ background: "#000000" }}>Moderator (Level 3)</option>
                                            </select>
                                            <Text color="orange.400" fontSize="xs" mt={3}>
                                                <Icon as={LuShield} display="inline" mr={1} /> 
                                                Clearance Level {getRoleClearance(selectedRole)} will be applied immediately.
                                            </Text>
                                        </Box>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        Cancel
                                    </Button>
                                    <Button flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} loading={isLoading} loadingText="Updating..." _hover={{ bg: "#E5E5E5" }}>
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

export default function StaffAccountsPage() {
    // --- STATE ---
    const [staffList, setStaffList] = useState<StaffRecord[]>(INITIAL_STAFF);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    // Modal / Inline Loading States
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<StaffRecord | null>(null);
    const [processingId, setProcessingId] = useState<string | null>(null);

    // --- ACTIONS ---
    const handleInviteStaff = (data: { name: string; email: string; role: RoleType }) => {
        const newStaff: StaffRecord = {
            id: `STF-0${Math.floor(Math.random() * 90) + 10}`,
            name: data.name,
            email: data.email,
            role: data.role,
            clearance: getRoleClearance(data.role),
            status: "Invited",
            twoFactor: false,
            lastLogin: "Never"
        };
        setStaffList([newStaff, ...staffList]);
    };

    const handleUpdateRole = (id: string, newRole: RoleType) => {
        setStaffList(prev => prev.map(s => 
            s.id === id ? { ...s, role: newRole, clearance: getRoleClearance(newRole) } : s
        ));
    };

    const handleToggleStatus = (e: React.MouseEvent, id: string, newStatus: "Active" | "Inactive") => {
        e.stopPropagation();
        setProcessingId(id);
        setTimeout(() => {
            setStaffList(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
            setProcessingId(null);
        }, 800);
    };

    // --- FILTER LOGIC ---
    const filteredStaff = staffList.filter(staff => {
        const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              staff.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "All" || staff.role === roleFilter;
        const matchesStatus = statusFilter === "All" || staff.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Staff Accounts
                    </Text>
                    <Text color="#888888" fontSize="sm">Manage internal team members, assign platform roles, and audit access levels.</Text>
                </Box>
                
                <Button onClick={() => setIsInviteOpen(true)} display={{ base: "none", sm: "flex" }} bg="white" color="black" rounded="none" border="none" _hover={{ bg: "#E5E5E5" }} gap={2} h="44px" px={6} fontWeight="bold">
                    <Icon as={LuPlus} strokeWidth="3" /> Invite Team Member
                </Button>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {STAFF_KPIs.map((kpi, idx) => (
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
                    <Flex flex={1} maxW={{ md: "450px" }} align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search by name, email, or Staff ID..." 
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
                            <option value="Super Admin" style={{ background: "#000000" }}>Super Admin</option>
                            <option value="Support Lead" style={{ background: "#000000" }}>Support Lead</option>
                            <option value="Financial Analyst" style={{ background: "#000000" }}>Financial Analyst</option>
                            <option value="Moderator" style={{ background: "#000000" }}>Moderator</option>
                        </select>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Statuses</option>
                            <option value="Active" style={{ background: "#000000" }}>Active</option>
                            <option value="Invited" style={{ background: "#000000" }}>Invited</option>
                            <option value="Inactive" style={{ background: "#000000" }}>Inactive</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>

            {/* --- STAFF LEDGER TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
                <ScrollArea.Root maxW="full">
                    <ScrollArea.Viewport pb={4}>
                        <Box minW="1000px">
                            
                            {/* Columns Header */}
                            <Grid templateColumns="1.5fr 1.5fr 1fr 1.2fr 100px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Staff Member</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Role & Clearance</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Security (2FA)</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status & Activity</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>

                            {/* Table Rows */}
                            {filteredStaff.length === 0 ? (
                                <Flex justify="center" align="center" py={16} direction="column">
                                    <Icon as={LuUsers} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                                    <Text color="#888888" fontSize="lg" fontWeight="bold">No staff members found.</Text>
                                </Flex>
                            ) : (
                                <VStack align="stretch" gap={0}>
                                    {filteredStaff.map((staff) => {
                                        const statusStyle = getStatusStyle(staff.status);
                                        const roleColor = getRoleColor(staff.clearance);
                                        const isProcessing = processingId === staff.id;
                                        
                                        return (
                                            <Grid 
                                                key={staff.id} 
                                                templateColumns="1.5fr 1.5fr 1fr 1.2fr 100px" gap={4} px={6} py={5} 
                                                borderBottom="1px solid #1A1A1A" 
                                                alignItems="center" 
                                                _hover={{ bg: "#111111" }} transition="background 0.2s"
                                            >
                                                {/* Identity */}
                                                <Flex align="center" gap={4}>
                                                    <Avatar.Root size="md" rounded="full">
                                                        <Avatar.Fallback name={staff.name} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="black" />
                                                    </Avatar.Root>
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" mb={0.5}>{staff.name}</Text>
                                                        <Text color="#888888" fontSize="xs" mb={0.5}>{staff.email}</Text>
                                                        <Text color="#555555" fontSize="10px" fontFamily="monospace">ID: {staff.id}</Text>
                                                    </Box>
                                                </Flex>

                                                {/* Role & Clearance */}
                                                <Box>
                                                    <Flex align="center" gap={2} mb={1}>
                                                        <Icon as={LuShield} color={roleColor} boxSize="14px" />
                                                        <Text color="white" fontSize="sm" fontWeight="bold">{staff.role}</Text>
                                                    </Flex>
                                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Clearance: Level {staff.clearance}</Text>
                                                </Box>

                                                {/* Security */}
                                                <Box>
                                                    <Flex align="center" gap={2}>
                                                        <Icon as={staff.twoFactor ? LuLock : LuKey} color={staff.twoFactor ? "#5cac7d" : "red.400"} boxSize="14px" strokeWidth="2.5" />
                                                        <Text color={staff.twoFactor ? "#5cac7d" : "red.400"} fontSize="xs" fontWeight="bold">
                                                            {staff.twoFactor ? "Enabled" : "Disabled"}
                                                        </Text>
                                                    </Flex>
                                                </Box>

                                                {/* Status & Activity */}
                                                <Box>
                                                    <Badge {...statusStyle} px={2.5} py={1} rounded="none" fontSize="9px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" display="inline-flex" alignItems="center" gap={1.5} mb={2}>
                                                        <Icon as={statusStyle.icon} boxSize="10px" strokeWidth="3" />
                                                        {staff.status}
                                                    </Badge>
                                                    <Text color="#555555" fontSize="10px" fontFamily="monospace" display="block">Active: {staff.lastLogin}</Text>
                                                </Box>
                                                
                                                {/* Actions */}
                                                <Flex justify="flex-end" gap={2}>
                                                    <IconButton 
                                                        onClick={() => setEditingStaff(staff)}
                                                        aria-label="Edit Role" title="Edit Access" size="sm" h="32px" w="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }}
                                                    >
                                                        <Icon as={LuSettings} strokeWidth="2.5" boxSize="14px" />
                                                    </IconButton>

                                                    {/* Cannot revoke clearance 5. Toggle between active/inactive. */}
                                                    {staff.clearance < 5 && (
                                                        staff.status === "Inactive" ? (
                                                            <IconButton 
                                                                onClick={(e) => handleToggleStatus(e, staff.id, "Active")} disabled={isProcessing}
                                                                aria-label="Restore Access" title="Restore Access" size="sm" h="32px" w="32px" bg="rgba(92, 172, 125, 0.1)" border="1px solid #5cac7d" color="#5cac7d" rounded="none" _hover={{ bg: "#5cac7d", color: "black" }}
                                                            >
                                                                {isProcessing ? <Spinner size="xs" color="currentColor" /> : <Icon as={LuUserCheck} strokeWidth="2.5" boxSize="14px" />}
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton 
                                                                onClick={(e) => handleToggleStatus(e, staff.id, "Inactive")} disabled={isProcessing}
                                                                aria-label="Revoke Access" title="Revoke Access" size="sm" h="32px" w="32px" variant="outline" borderColor="#333333" color="red.400" rounded="none" _hover={{ bg: "rgba(229, 62, 62, 0.1)", borderColor: "red.400" }}
                                                            >
                                                                {isProcessing ? <Spinner size="xs" color="currentColor" /> : <Icon as={LuUserMinus} strokeWidth="2.5" boxSize="14px" />}
                                                            </IconButton>
                                                        )
                                                    )}
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

            {/* Modals & Drawers */}
            <InviteStaffModal 
                isOpen={isInviteOpen} 
                onClose={() => setIsInviteOpen(false)} 
                onSubmit={handleInviteStaff} 
            />
            <EditRoleDrawer 
                staff={editingStaff} 
                onClose={() => setEditingStaff(null)} 
                onSave={handleUpdateRole} 
            />

        </Box>
    );
}