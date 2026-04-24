"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, VStack, SimpleGrid, IconButton
} from "@chakra-ui/react";
import { 
    LuArrowLeft, LuShieldCheck, LuHeadset, LuPackage, LuBadgeDollarSign, 
    LuMail, LuCheck, LuX, LuInfo
} from "react-icons/lu";

type StaffRole = 'store_manager' | 'sales_rep' | 'support_agent' | 'inventory_clerk';

// --- NEW DEFINITION: Granular Permissions Matrix ---
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
    store_manager: { label: "Store Manager", icon: LuShieldCheck, color: "purple.400", bg: "rgba(159, 122, 234, 0.15)", description: "Full access to the store, including financials and staff management." },
    sales_rep: { label: "Sales Representative", icon: LuBadgeDollarSign, color: "#5cac7d", bg: "rgba(92, 172, 125, 0.15)", description: "Focused on generating orders and applying promotional discounts." },
    inventory_clerk: { label: "Inventory Clerk", icon: LuPackage, color: "orange.400", bg: "rgba(237, 137, 54, 0.15)", description: "Handles product uploads, stock levels, and category management." },
    support_agent: { label: "Support Agent", icon: LuHeadset, color: "blue.400", bg: "rgba(66, 153, 225, 0.15)", description: "Manages customer disputes, chats, and tracks order fulfillment." }
};

interface AddStaffFormProps {
    onBack: () => void;
}


const CustomToggle = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
    <Flex 
        w="40px" h="22px" bg={isOn ? "#5cac7d" : "whiteAlpha.200"} 
        rounded="full" align="center" px="2px" cursor="pointer" transition="all 0.2s"
        onClick={onToggle}
    >
        <Box boxSize="18px" bg="white" rounded="full" transform={isOn ? "translateX(18px)" : "translateX(0)"} transition="all 0.2s" shadow="sm" />
    </Flex>
);

export const AddStaffForm = ({ onBack }: AddStaffFormProps) => {
    const brandColor = "#5cac7d";
    
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
                <IconButton aria-label="Back" variant="ghost" color="gray.400" rounded="full" _hover={{ bg: "whiteAlpha.100", color: "white" }} onClick={onBack}>
                    <Icon as={LuArrowLeft} boxSize="20px" />
                </IconButton>
                <Box>
                    <Text fontSize="2xl" fontWeight="black" color="white" letterSpacing="tight">Add New Staff</Text>
                    <Text color="gray.400" fontSize="sm">Invite a team member and configure their store permissions.</Text>
                </Box>
            </Flex>

            <Grid templateColumns={{ base: "1fr", lg: "1.2fr 1.3fr" }} gap={8}>
                {/* --- LEFT COLUMN: FORM & ROLE PRESETS --- */}
                <VStack align="stretch" gap={8}>
                    {/* Basic Info Box */}
                    <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Text color="white" fontSize="lg" fontWeight="bold" mb={6}>Staff Details</Text>
                        
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5} mb={5}>
                            <Box>
                                <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" mb={2}>First Name</Text>
                                <Input placeholder="e.g. David" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="45px" _focus={{ borderColor: brandColor, boxShadow: "none" }} />
                            </Box>
                            <Box>
                                <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" mb={2}>Last Name</Text>
                                <Input placeholder="e.g. Olayinka" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="45px" _focus={{ borderColor: brandColor, boxShadow: "none" }} />
                            </Box>
                        </SimpleGrid>

                        <Box>
                            <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase" mb={2}>Email Address</Text>
                            <Input placeholder="david@example.com" type="email" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="45px" _focus={{ borderColor: brandColor, boxShadow: "none" }} />
                        </Box>
                    </Box>

                    {/* Role Presets Box */}
                    <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Text color="white" fontSize="lg" fontWeight="bold" mb={2}>Assign Role</Text>
                        <Text color="gray.400" fontSize="sm" mb={6}>Select a base role. You can customize permissions on the right.</Text>
                        
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                            {(Object.keys(ROLE_PRESETS) as StaffRole[]).map((roleKey) => {
                                const role = ROLE_PRESETS[roleKey];
                                const isSelected = selectedRole === roleKey;
                                
                                return (
                                    <Flex 
                                        key={roleKey} direction="column" p={4} rounded="xl" cursor="pointer" transition="all 0.2s"
                                        bg={isSelected ? role.bg : "#121212"} border="2px solid" borderColor={isSelected ? role.color : "whiteAlpha.100"}
                                        _hover={!isSelected ? { borderColor: "whiteAlpha.300" } : {}}
                                        onClick={() => handleSelectPreset(roleKey)}
                                    >
                                        <Flex align="center" justify="space-between" mb={3}>
                                            <Flex align="center" justify="center" boxSize="36px" bg={isSelected ? role.color : "whiteAlpha.100"} color={isSelected ? "white" : role.color} rounded="lg">
                                                <Icon as={role.icon} fontSize="lg" />
                                            </Flex>
                                            <Box boxSize="18px" rounded="full" border="2px solid" borderColor={isSelected ? role.color : "gray.600"} display="flex" alignItems="center" justifyContent="center">
                                                {isSelected && <Box boxSize="8px" rounded="full" bg={role.color} />}
                                            </Box>
                                        </Flex>
                                        <Text color={isSelected ? "white" : "gray.300"} fontWeight="bold" fontSize="md" mb={1}>{role.label}</Text>
                                        <Text color={isSelected ? "whiteAlpha.800" : "gray.500"} fontSize="xs" lineHeight="tall">{role.description}</Text>
                                    </Flex>
                                );
                            })}
                        </SimpleGrid>
                    </Box>
                </VStack>

                {/* --- RIGHT COLUMN: INTERACTIVE PERMISSIONS CHECKLIST --- */}
                <Box>
                    <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" position="sticky" top="90px">
                        
                        <Flex align="center" justify="space-between" mb={6} pb={6} borderBottom="1px dashed" borderColor="whiteAlpha.200">
                            <Flex align="center" gap={3}>
                                <Flex align="center" justify="center" boxSize="40px" bg={activeRole.bg} color={activeRole.color} rounded="lg">
                                    <Icon as={activeRole.icon} fontSize="xl" />
                                </Flex>
                                <Box>
                                    <Text color="white" fontSize="lg" fontWeight="black">{activeRole.label}</Text>
                                    <Text color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">Customize Permissions Matrix</Text>
                                </Box>
                            </Flex>
                        </Flex>

                       
                        <VStack align="stretch" gap={0} mb={6}>
                            {ALL_PERMISSIONS.map((perm) => {
                                const isAllowed = permissions[perm.id];
                                return (
                                    <Flex 
                                        key={perm.id} justify="space-between" align="center" 
                                        py={3} px={2} rounded="md" _hover={{ bg: "whiteAlpha.50" }}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Icon as={isAllowed ? LuCheck : LuX} color={isAllowed ? "green.400" : "red.400"} />
                                            <Text color={isAllowed ? "gray.300" : "gray.500"} fontSize="sm">{perm.label}</Text>
                                        </Flex>
                                        
                                        <CustomToggle 
                                            isOn={isAllowed} 
                                            onToggle={() => handleTogglePermission(perm.id)} 
                                        />
                                    </Flex>
                                );
                            })}
                        </VStack>

                        {/* Important Info & Button Section */}
                        <Box pt={6} borderTop="1px solid" borderColor="whiteAlpha.100">
                            <Flex align="start" gap={3} p={3} bg="rgba(66, 153, 225, 0.1)" rounded="lg" border="1px solid" borderColor="rgba(66, 153, 225, 0.2)" mb={6}>
                                <Icon as={LuInfo} color="blue.400" mt="2px" />
                                <Text color="blue.200" fontSize="xs" lineHeight="tall">
                                    Clicking &apos;Send Invite&apos; will apply the permissions configured above. An invite email will be sent for the staff member to activate their account.
                                </Text>
                            </Flex>

                            <Button 
                                w="full" h="50px" bg={brandColor} color="white" rounded="xl" 
                                _hover={{ filter: "brightness(1.1)", transform: "translateY(-2px)", shadow: "lg" }} 
                                transition="all 0.2s" display="flex" gap={2}
                            >
                                <Icon as={LuMail} fontSize="lg" /> Send Email Invite
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};