"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, Icon, Grid, VStack, SimpleGrid, IconButton } from "@chakra-ui/react";
import { 
    LuArrowLeft, LuShieldCheck, LuHeadset, LuPackage, LuBadgeDollarSign, 
    LuMail, LuCheck, LuX, LuInfo
} from "react-icons/lu";

type StaffRole = 'store_manager' | 'sales_rep' | 'support_agent' | 'inventory_clerk';

//  DEFINITION
const ALL_PERMISSIONS = [
    { id: "manage_inventory", label: "Manage products & inventory", default_for: ["store_manager", "inventory_clerk"] },
    { id: "view_revenue", label: "View total sales & revenue", default_for: ["store_manager"] },
    { id: "process_refunds", label: "Process refunds & exchanges", default_for: ["store_manager"] },
    { id: "pos_orders", label: "Create manual POS orders", default_for: ["store_manager", "sales_rep"] },
    { id: "discount_codes", label: "Apply discount codes", default_for: ["store_manager", "sales_rep"] },
    { id: "view_own_sales", label: "View their own sales stats", default_for: ["sales_rep"] },
    { id: "support_chats", label: "Reply to customer chats", default_for: ["store_manager", "support_agent"] },
    { id: "order_tracking", label: "View order fulfillment status", default_for: ["store_manager", "support_agent"] },
    { id: "manage_staff", label: "Add or remove staff", default_for: ["store_manager"] },
    { id: "edit_pricing", label: "Edit product pricing", default_for: ["store_manager", "inventory_clerk"] },
];

const ROLE_PRESETS = {
    store_manager: { label: "Store Manager", icon: LuShieldCheck, color: "purple.400", description: "Full access to the store, including financials and staff management." },
    sales_rep: { label: "Sales Representative", icon: LuBadgeDollarSign, color: "#5cac7d", description: "Focused on generating orders and applying promotional discounts." },
    inventory_clerk: { label: "Inventory Clerk", icon: LuPackage, color: "orange.400", description: "Handles product uploads, stock levels, and category management." },
    support_agent: { label: "Support Agent", icon: LuHeadset, color: "blue.400", description: "Manages customer disputes, chats, and tracks order fulfillment." }
};

interface AddStaffFormProps {
    onBack: () => void;
}

// ---  REUSABLE COMPONENTS ---
const BrutalistToggle = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
    <Flex 
        w="40px" h="20px" bg={isOn ? "white" : "#111111"} border="1px solid" borderColor={isOn ? "white" : "#333333"}
        align="center" px="2px" cursor="pointer" transition="all 0.2s" onClick={onToggle} rounded="none"
    >
        <Box boxSize="14px" bg={isOn ? "black" : "#555555"} transform={isOn ? "translateX(20px)" : "translateX(0)"} transition="all 0.2s" rounded="none" />
    </Flex>
);

const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };


export const AddStaffForm = ({ onBack }: AddStaffFormProps) => {
    // Track the active *preset* role
    const [selectedRole, setSelectedRole] = useState<StaffRole>('sales_rep');
    
    // Track the *customized* permissions for this specific individual
    const [permissions, setPermissions] = useState<Record<string, boolean>>(
        ALL_PERMISSIONS.reduce((acc, perm) => {
            acc[perm.id] = perm.default_for.includes('sales_rep');
            return acc;
        }, {} as Record<string, boolean>)
    );

    // Apply a preset role and populate the customized permissions state
    const handleSelectPreset = (role: StaffRole) => {
        setSelectedRole(role);
        setPermissions(
            ALL_PERMISSIONS.reduce((acc, perm) => {
                acc[perm.id] = perm.default_for.includes(role);
                return acc;
            }, {} as Record<string, boolean>)
        );
    };

    // Toggle a single granular permission
    const handleTogglePermission = (id: string) => {
        setPermissions(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const activeRole = ROLE_PRESETS[selectedRole];

    return (
        <Box animation="fade-in 0.3s ease">
            {/* --- HEADER --- */}
            <Flex align="center" gap={4} mb={8}>
                <IconButton aria-label="Back" variant="ghost" color="#888888" rounded="none" _hover={{ bg: "#111111", color: "white" }} onClick={onBack} h="44px">
                    <Icon as={LuArrowLeft} boxSize="20px" strokeWidth="2.5" />
                </IconButton>
                <Box>
                    <Text fontSize="2xl" fontWeight="black" color="white" letterSpacing="tight">Add New Staff</Text>
                    <Text color="#888888" fontSize="sm">Invite a team member and configure their store permissions.</Text>
                </Box>
            </Flex>

            <Grid templateColumns={{ base: "1fr", lg: "1.2fr 1.3fr" }} gap={8}>
                {/* --- LEFT COLUMN: FORM & ROLE PRESETS --- */}
                <VStack align="stretch" gap={8}>
                    {/* Basic Info Box */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Text color="white" fontSize="lg" fontWeight="black" mb={6} letterSpacing="tight">1. Staff Details</Text>
                        
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5} mb={5}>
                            <Box>
                                <Text as="label" {...labelStyles}>First Name <Text as="span" color="red.400">*</Text></Text>
                                <Input placeholder="e.g. David" {...inputStyles} />
                            </Box>
                            <Box>
                                <Text as="label" {...labelStyles}>Last Name <Text as="span" color="red.400">*</Text></Text>
                                <Input placeholder="e.g. Olayinka" {...inputStyles} />
                            </Box>
                        </SimpleGrid>

                        <Box>
                            <Text as="label" {...labelStyles}>Email Address <Text as="span" color="red.400">*</Text></Text>
                            <Input placeholder="david@example.com" type="email" {...inputStyles} />
                        </Box>
                    </Box>

                    {/* Role Presets Box */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Text color="white" fontSize="lg" fontWeight="black" mb={2} letterSpacing="tight">2. Assign Role</Text>
                        <Text color="#888888" fontSize="sm" mb={6}>Select a base role. You can customize permissions on the right.</Text>
                        
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                            {(Object.keys(ROLE_PRESETS) as StaffRole[]).map((roleKey) => {
                                const role = ROLE_PRESETS[roleKey];
                                const isSelected = selectedRole === roleKey;
                                
                                return (
                                    <Flex 
                                        key={roleKey} direction="column" p={4} rounded="none" cursor="pointer" transition="all 0.2s"
                                        bg={isSelected ? "white" : "#111111"} border="1px solid" borderColor={isSelected ? "white" : "#333333"}
                                        _hover={!isSelected ? { borderColor: "#555555" } : {}}
                                        onClick={() => handleSelectPreset(roleKey)}
                                    >
                                        <Flex align="center" gap={3} mb={3}>
                                            <Icon as={role.icon} color={role.color} boxSize="18px" strokeWidth="2.5" />
                                            <Text color={isSelected ? "black" : "white"} fontWeight="bold" fontSize="sm" letterSpacing="tight">{role.label}</Text>
                                        </Flex>
                                        <Text color={isSelected ? "#333333" : "#888888"} fontSize="10px" lineHeight="tall">{role.description}</Text>
                                    </Flex>
                                );
                            })}
                        </SimpleGrid>
                    </Box>
                </VStack>

                {/* --- RIGHT COLUMN: INTERACTIVE PERMISSIONS CHECKLIST --- */}
                <Box>
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A" position="sticky" top="90px">
                        
                        <Flex align="center" justify="space-between" mb={6} pb={6} borderBottom="1px solid" borderColor="#333333">
                            <Flex align="center" gap={3}>
                                <Box>
                                    <Text color="white" fontSize="lg" fontWeight="black" letterSpacing="tight">3. Permissions Matrix</Text>
                                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" mt={1}>Base: {activeRole.label}</Text>
                                </Box>
                            </Flex>
                        </Flex>

                        <VStack align="stretch" gap={0} mb={6} border="1px solid" borderColor="#1A1A1A" bg="#111111">
                            {ALL_PERMISSIONS.map((perm, index) => {
                                const isAllowed = permissions[perm.id];
                                const isLast = index === ALL_PERMISSIONS.length - 1;
                                return (
                                    <Flex 
                                        key={perm.id} justify="space-between" align="center" 
                                        py={3} px={4} borderBottom={isLast ? "none" : "1px solid #1A1A1A"}
                                        _hover={{ bg: "#1A1A1A" }} transition="background 0.2s"
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={isAllowed ? LuCheck : LuX} color={isAllowed ? "#5cac7d" : "red.400"} strokeWidth="3" boxSize="14px" />
                                            <Text color={isAllowed ? "white" : "#888888"} fontSize="xs" fontWeight="bold">{perm.label}</Text>
                                        </Flex>
                                        
                                        <BrutalistToggle 
                                            isOn={isAllowed} 
                                            onToggle={() => handleTogglePermission(perm.id)} 
                                        />
                                    </Flex>
                                );
                            })}
                        </VStack>

                        {/* Important Info & Button Section */}
                        <Box pt={6} borderTop="1px solid" borderColor="#1A1A1A">
                            <Flex align="start" gap={3} p={4} bg="#111111" border="1px solid #333333" mb={6}>
                                <Icon as={LuInfo} color="blue.400" mt="2px" strokeWidth="2.5" />
                                <Text color="#888888" fontSize="xs" lineHeight="tall">
                                    Clicking &apos;Send Invite&apos; will apply the permissions configured above. An invite email will be sent for the staff member to activate their account.
                                </Text>
                            </Flex>

                            <Button 
                                w="full" h="44px" bg="white" color="black" rounded="none" border="none"
                                _hover={{ bg: "#E5E5E5" }} transition="all 0.2s" display="flex" gap={2}
                                fontWeight="bold"
                            >
                                <Icon as={LuMail} strokeWidth="2.5" /> Send Email Invite
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};