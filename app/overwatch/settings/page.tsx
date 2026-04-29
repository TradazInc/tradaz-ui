"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, VStack, SimpleGrid
} from "@chakra-ui/react";
import { 
     LuShield, LuPowerOff, 
    LuSave, LuGlobe, LuPercent, LuServer, 
} from "react-icons/lu";

// --- SETTINGS TABS ---
type SettingsTab = 'general' | 'financial' | 'integrations' | 'security';

const SETTINGS_TABS = [
    { id: 'general', label: 'Platform Basics', icon: LuGlobe },
    { id: 'financial', label: 'Fees & Payouts', icon: LuPercent },
    { id: 'security', label: 'Security & Compliance', icon: LuShield },
];

const brandColor = "#5cac7d";


const CustomToggle = ({ isOn }: { isOn: boolean }) => (
    <Flex 
        w="44px" h="24px" bg={isOn ? "white" : "#111111"} 
        border="1px solid" borderColor={isOn ? "white" : "#333333"}
        rounded="none" align="center" px="2px" cursor="pointer" transition="all 0.2s"
    >
        <Box boxSize="18px" bg={isOn ? "black" : "#888888"} rounded="none" transform={isOn ? "translateX(20px)" : "translateX(0)"} transition="all 0.2s" />
    </Flex>
);

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- COMBINED STICKY HEADER --- */}
            <Box 
                position="sticky" top="0" zIndex={30} 
                bg="#000000" 
                mx={{ base: "-16px", lg: "-32px" }} px={{ base: "16px", lg: "32px" }}
                pt={{ base: 4, lg: 8 }} pb={6} mb={8} 
                borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={4}>
                    <Box>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">System Settings</Text>
                        <Text color="#888888" fontSize="sm">Configure global variables and platform-wide rules.</Text>
                    </Box>
                    <Button bg="white" color="black" rounded="none" h="44px" px={8} _hover={{ bg: "#E5E5E5" }} display="flex" gap={2} fontWeight="bold" border="none">
                        <Icon as={LuSave} color="#5cac7d" strokeWidth="2.5" /> Save Changes
                    </Button>
                </Flex>
            </Box>

            <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
                
                {/* --- LEFT SIDEBAR: VERTICAL TABS --- */}
                <VStack align="stretch" gap={2}>
                    {SETTINGS_TABS.map((tab) => (
                        <Button 
                            key={tab.id} variant="ghost" h="50px" justifyItems="flex-start" px={4} rounded="none"
                            bg={activeTab === tab.id ? "#111111" : "transparent"}
                            color={activeTab === tab.id ? "white" : "#888888"}
                            border="1px solid" borderColor={activeTab === tab.id ? "#333333" : "transparent"}
                            _hover={{ bg: "#1A1A1A", color: "white" }}
                            onClick={() => setActiveTab(tab.id as SettingsTab)}
                            display="flex" justifyContent="flex-start" gap={3}
                        >
                            <Icon as={tab.icon} boxSize="18px" color={activeTab === tab.id ? brandColor : "inherit"} strokeWidth="2.5" />
                            <Text fontWeight={activeTab === tab.id ? "bold" : "medium"} letterSpacing="tight">{tab.label}</Text>
                        </Button>
                    ))}
                </VStack>

                {/* --- RIGHT CONTENT AREA --- */}
                <Box bg="#0A0A0A" p={{ base: 5, md: 8 }} rounded="none" border="1px solid" borderColor="#1A1A1A" minH="500px">
                    
                    {/* TAB: GENERAL */}
                    {activeTab === 'general' && (
                        <VStack align="stretch" gap={8} animation="fade-in 0.3s ease">
                            <Box borderBottom="1px solid" borderColor="#1A1A1A" pb={4}>
                                <Text color="white" fontSize="xl" fontWeight="bold" letterSpacing="tight">Platform Basics</Text>
                                <Text color="#888888" fontSize="sm">Public-facing information and global routing.</Text>
                            </Box>

                            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                                <Box>
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Platform Name</Text>
                                    <Input defaultValue="Tradaz" bg="#111111" border="1px solid" borderColor="#333333" color="white" h="44px" rounded="none" _focus={{ borderColor: "white", boxShadow: "none" }} />
                                </Box>
                                <Box>
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Support Email Routing</Text>
                                    <Input defaultValue="support@tradaz.com" bg="#111111" border="1px solid" borderColor="#333333" color="white" h="44px" rounded="none" _focus={{ borderColor: "white", boxShadow: "none" }} />
                                </Box>
                                <Box>
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Default Timezone</Text>
                                    <Input defaultValue="Africa/Lagos (WAT)" bg="#111111" border="1px solid" borderColor="#333333" color="white" h="44px" rounded="none" _focus={{ borderColor: "white", boxShadow: "none" }} />
                                </Box>
                                <Box>
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Platform Currency</Text>
                                    <Input defaultValue="NGN (₦)" disabled bg="#000000" border="1px solid" borderColor="#1A1A1A" color="#555555" h="44px" rounded="none" fontWeight="bold" />
                                </Box>
                            </SimpleGrid>
                        </VStack>
                    )}

                    {/* TAB: FINANCIALS */}
                    {activeTab === 'financial' && (
                        <VStack align="stretch" gap={8} animation="fade-in 0.3s ease">
                            <Box borderBottom="1px solid" borderColor="#1A1A1A" pb={4}>
                                <Text color="white" fontSize="xl" fontWeight="bold" letterSpacing="tight">Fees & Payouts</Text>
                                <Text color="#888888" fontSize="sm">Configure how the platform generates revenue from tenants.</Text>
                            </Box>

                            <Box bg="#111111" p={6} rounded="none" border="1px solid" borderColor="#333333">
                                <Flex justify="space-between" align="center" mb={6}>
                                    <Box>
                                        <Text color="white" fontWeight="bold" letterSpacing="tight">Global Transaction Fee (%)</Text>
                                        <Text color="#888888" fontSize="sm">The flat percentage taken from every successful shop order.</Text>
                                    </Box>
                                    <Input defaultValue="2.5" w="80px" textAlign="center" bg="#000000" border="1px solid" borderColor="#333333" color="white" rounded="none" fontWeight="black" fontSize="lg" h="44px" _focus={{ borderColor: "white", boxShadow: "none" }} />
                                </Flex>
                                <Flex justify="space-between" align="center" pt={6} borderTop="1px dashed" borderColor="#333333">
                                    <Box>
                                        <Text color="white" fontWeight="bold" letterSpacing="tight">Fixed Gateway Surcharge</Text>
                                        <Text color="#888888" fontSize="sm">Flat fee passed to the buyer (e.g., ₦100).</Text>
                                    </Box>
                                    <Input defaultValue="100" w="80px" textAlign="center" bg="#000000" border="1px solid" borderColor="#333333" color="white" rounded="none" fontWeight="bold" h="44px" _focus={{ borderColor: "white", boxShadow: "none" }} />
                                </Flex>
                            </Box>

                            <Box>
                                <Text color="white" fontWeight="bold" mb={4} textTransform="uppercase" fontSize="10px" letterSpacing="wider">Payout Schedule</Text>
                                <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4}>
                                    {['Daily', 'Weekly (Every Friday)', 'Monthly'].map((schedule, i) => (
                                        <Button 
                                            key={schedule} variant="outline" h="44px" rounded="none"
                                            borderColor={i === 1 ? "white" : "#333333"} 
                                            color={i === 1 ? "white" : "#888888"} 
                                            bg={i === 1 ? "#111111" : "transparent"} 
                                            _hover={{ bg: "#1A1A1A", color: "white" }}
                                            fontWeight="bold" fontSize="sm"
                                        >
                                            {schedule}
                                        </Button>
                                    ))}
                                </SimpleGrid>
                            </Box>
                        </VStack>
                    )}

                    {/* TAB: SECURITY */}
                    {activeTab === 'security' && (
                        <VStack align="stretch" gap={8} animation="fade-in 0.3s ease">
                            <Box borderBottom="1px solid" borderColor="#1A1A1A" pb={4}>
                                <Text color="white" fontSize="xl" fontWeight="bold" letterSpacing="tight">Security & Compliance</Text>
                                <Text color="#888888" fontSize="sm">Manage platform access, KYC policies, and emergency controls.</Text>
                            </Box>

                            <Box>
                                <Flex justify="space-between" align="center" p={5} bg="#111111" rounded="none" border="1px solid" borderColor="#333333" borderBottom="none">
                                    <Box pr={4}>
                                        <Text color="white" fontWeight="bold" letterSpacing="tight">Enforce 2FA for Shop Owners</Text>
                                        <Text color="#888888" fontSize="sm">Require multi-factor authentication for all seller accounts.</Text>
                                    </Box>
                                    <CustomToggle isOn={true} />
                                </Flex>
                                <Flex justify="space-between" align="center" p={5} bg="#111111" border="1px solid" borderColor="#333333" borderBottom="none">
                                    <Box pr={4}>
                                        <Text color="white" fontWeight="bold" letterSpacing="tight">Strict KYC Verification</Text>
                                        <Text color="#888888" fontSize="sm">Shops cannot process live payments until ID is verified.</Text>
                                    </Box>
                                    <CustomToggle isOn={true} />
                                </Flex>
                                <Flex justify="space-between" align="center" p={5} bg="#111111" rounded="none" border="1px solid" borderColor="#333333">
                                    <Box pr={4}>
                                        <Text color="white" fontWeight="bold" letterSpacing="tight">Auto-Suspend High Dispute Rates</Text>
                                        <Text color="#888888" fontSize="sm">Suspend shops if chargebacks exceed 2% in a 30-day window.</Text>
                                    </Box>
                                    <CustomToggle isOn={false} />
                                </Flex>
                            </Box>

                            {/* DANGER ZONE */}
                            <Box mt={4}>
                                <Text color="red.400" fontWeight="bold" mb={4} fontSize="10px" textTransform="uppercase" letterSpacing="wider">Emergency Controls</Text>
                                <Box bg="#111111" border="1px solid" borderColor="#333333" p={6} rounded="none">
                                    <Flex justify="space-between" align="center" direction={{ base: "column", sm: "row" }} gap={4}>
                                        <Box pr={4}>
                                            <Flex align="center" gap={2} mb={1}>
                                                <Icon as={LuServer} color="red.400" strokeWidth="2.5" />
                                                <Text color="white" fontWeight="bold" letterSpacing="tight">Global Maintenance Mode</Text>
                                            </Flex>
                                            <Text color="#888888" fontSize="sm">Pauses all checkouts and displays a maintenance page. Tenant dashboards remain accessible.</Text>
                                        </Box>
                                        <Button bg="#000000" color="red.400" border="1px solid #333333" rounded="none" _hover={{ bg: "#1A1A1A" }} display="flex" gap={2} fontWeight="bold" h="44px" flexShrink={0}>
                                            <Icon as={LuPowerOff} strokeWidth="2.5" /> Enable Mode
                                        </Button>
                                    </Flex>
                                </Box>
                            </Box>
                        </VStack>
                    )}

                </Box>
            </Grid>
        </Box>
    );
}