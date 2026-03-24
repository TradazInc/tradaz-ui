"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, VStack, SimpleGrid, IconButton 
} from "@chakra-ui/react";
import { 
    LuCreditCard, LuShield, LuKey, LuPowerOff, 
    LuSave, LuGlobe, LuMail, LuPercent, LuServer, LuEye, LuEyeOff
} from "react-icons/lu";

// --- SETTINGS TABS ---
type SettingsTab = 'general' | 'financial' | 'integrations' | 'security';

const SETTINGS_TABS = [
    { id: 'general', label: 'Platform Basics', icon: LuGlobe },
    { id: 'financial', label: 'Fees & Payouts', icon: LuPercent },
    { id: 'integrations', label: 'API & Webhooks', icon: LuKey },
    { id: 'security', label: 'Security & Compliance', icon: LuShield },
];

const brandColor = "#5cac7d";


const CustomToggle = ({ isOn }: { isOn: boolean }) => (
    <Flex 
        w="44px" h="24px" bg={isOn ? brandColor : "whiteAlpha.200"} 
        rounded="full" align="center" px="2px" cursor="pointer" transition="all 0.2s"
    >
        <Box boxSize="20px" bg="white" rounded="full" transform={isOn ? "translateX(20px)" : "translateX(0)"} transition="all 0.2s" shadow="sm" />
    </Flex>
);

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('general');
    const [showKey, setShowKey] = useState(false);

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1200px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">System Settings</Text>
                    <Text color="gray.400" fontSize="sm">Configure global variables, API keys, and platform-wide rules.</Text>
                </Box>
                <Button bg={brandColor} color="white" rounded="lg" h="45px" px={8} _hover={{ filter: "brightness(1.1)" }} display="flex" gap={2}>
                    <Icon as={LuSave} /> Save Changes
                </Button>
            </Flex>

            <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
                
                {/* --- LEFT SIDEBAR: VERTICAL TABS --- */}
                <VStack align="stretch" gap={2}>
                    {SETTINGS_TABS.map((tab) => (
                        <Button 
                            key={tab.id} variant="ghost" h="50px" justifyItems="flex-start" px={4} rounded="xl"
                            bg={activeTab === tab.id ? "rgba(92, 172, 125, 0.15)" : "transparent"}
                            color={activeTab === tab.id ? brandColor : "gray.400"}
                            _hover={{ bg: activeTab === tab.id ? "rgba(92, 172, 125, 0.2)" : "whiteAlpha.50", color: activeTab === tab.id ? brandColor : "white" }}
                            onClick={() => setActiveTab(tab.id as SettingsTab)}
                            display="flex" justifyContent="flex-start" gap={3}
                        >
                            <Icon as={tab.icon} boxSize="18px" />
                            <Text fontWeight={activeTab === tab.id ? "bold" : "medium"}>{tab.label}</Text>
                        </Button>
                    ))}
                </VStack>

                {/* --- RIGHT CONTENT AREA --- */}
                <Box bg="#1A1C23" p={{ base: 5, md: 8 }} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" minH="500px">
                    
                    {/* TAB: GENERAL */}
                    {activeTab === 'general' && (
                        <VStack align="stretch" gap={8} animation="fade-in 0.3s ease">
                            <Box borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4}>
                                <Text color="white" fontSize="xl" fontWeight="bold">Platform Basics</Text>
                                <Text color="gray.400" fontSize="sm">Public-facing information and global routing.</Text>
                            </Box>

                            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                                <Box>
                                    <Text color="gray.300" fontSize="sm" fontWeight="bold" mb={2}>Platform Name</Text>
                                    <Input defaultValue="Tradaz" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="45px" _focus={{ borderColor: brandColor, boxShadow: "none" }} />
                                </Box>
                                <Box>
                                    <Text color="gray.300" fontSize="sm" fontWeight="bold" mb={2}>Support Email Routing</Text>
                                    <Input defaultValue="support@tradaz.com" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="45px" _focus={{ borderColor: brandColor, boxShadow: "none" }} />
                                </Box>
                                <Box>
                                    <Text color="gray.300" fontSize="sm" fontWeight="bold" mb={2}>Default Timezone</Text>
                                    <Input defaultValue="Africa/Lagos (WAT)" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="45px" _focus={{ borderColor: brandColor, boxShadow: "none" }} />
                                </Box>
                                <Box>
                                    <Text color="gray.300" fontSize="sm" fontWeight="bold" mb={2}>Platform Currency</Text>
                                    
                                    <Input defaultValue="NGN (₦)" disabled bg="#121212" border="1px solid" borderColor="whiteAlpha.50" color="gray.500" h="45px" />
                                </Box>
                            </SimpleGrid>
                        </VStack>
                    )}

                    {/* TAB: FINANCIALS */}
                    {activeTab === 'financial' && (
                        <VStack align="stretch" gap={8} animation="fade-in 0.3s ease">
                            <Box borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4}>
                                <Text color="white" fontSize="xl" fontWeight="bold">Fees & Payouts</Text>
                                <Text color="gray.400" fontSize="sm">Configure how the platform generates revenue from tenants.</Text>
                            </Box>

                            <Box bg="#121212" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.200">
                                <Flex justify="space-between" align="center" mb={4}>
                                    <Box>
                                        <Text color="white" fontWeight="bold">Global Transaction Fee (%)</Text>
                                        <Text color="gray.500" fontSize="sm">The flat percentage taken from every successful shop order.</Text>
                                    </Box>
                                    <Input defaultValue="2.5" w="80px" textAlign="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.300" color={brandColor} fontWeight="black" fontSize="lg" h="45px" _focus={{ borderColor: brandColor, boxShadow: "none" }} />
                                </Flex>
                                <Flex justify="space-between" align="center" pt={4} borderTop="1px dashed" borderColor="whiteAlpha.100">
                                    <Box>
                                        <Text color="white" fontWeight="bold">Fixed Gateway Surcharge</Text>
                                        <Text color="gray.500" fontSize="sm">Flat fee passed to the buyer (e.g., ₦100).</Text>
                                    </Box>
                                    <Input defaultValue="100" w="80px" textAlign="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.300" color="white" fontWeight="bold" h="45px" _focus={{ borderColor: brandColor, boxShadow: "none" }} />
                                </Flex>
                            </Box>

                            <Box>
                                <Text color="white" fontWeight="bold" mb={4}>Payout Schedule</Text>
                                <SimpleGrid columns={3} gap={4}>
                                    {['Daily', 'Weekly (Every Friday)', 'Monthly'].map((schedule, i) => (
                                        <Button key={schedule} variant="outline" h="45px" borderColor={i === 1 ? brandColor : "whiteAlpha.200"} color={i === 1 ? brandColor : "gray.400"} bg={i === 1 ? "rgba(92, 172, 125, 0.1)" : "transparent"} _hover={{ bg: "whiteAlpha.50" }}>
                                            {schedule}
                                        </Button>
                                    ))}
                                </SimpleGrid>
                            </Box>
                        </VStack>
                    )}

                    {/* TAB: INTEGRATIONS */}
                    {activeTab === 'integrations' && (
                        <VStack align="stretch" gap={8} animation="fade-in 0.3s ease">
                            <Box borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4}>
                                <Text color="white" fontSize="xl" fontWeight="bold">API Keys & Webhooks</Text>
                                <Text color="gray.400" fontSize="sm">Connect external payment gateways and email services.</Text>
                            </Box>

                            <VStack align="stretch" gap={4}>
                                <Box bg="#121212" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.200">
                                    <Flex align="center" gap={3} mb={4}>
                                        <Icon as={LuCreditCard} color="blue.400" boxSize="20px" />
                                        <Text color="white" fontWeight="bold">Payment Gateway (Paystack)</Text>
                                    </Flex>
                                    <Box mb={4}>
                                        <Text color="gray.500" fontSize="xs" mb={1} textTransform="uppercase" fontWeight="bold">Public Key</Text>
                                        <Input defaultValue="pk_live_8f7b2c9a...3d4e5f" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" color="white" _focus={{ borderColor: brandColor }} />
                                    </Box>
                                    <Box>
                                        <Text color="gray.500" fontSize="xs" mb={1} textTransform="uppercase" fontWeight="bold">Secret Key</Text>
                                        <Flex align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="md" px={3}>
                                          
                                            <Input defaultValue="sk_live_1234567890abcdef" type={showKey ? "text" : "password"} border="none" color="white" py={2} _focus={{ outline: "none", boxShadow: "none" }} />
                                            <IconButton aria-label="Toggle visibility" variant="ghost" size="sm" color="gray.400" onClick={() => setShowKey(!showKey)}>
                                                {showKey ? <LuEyeOff /> : <LuEye />}
                                            </IconButton>
                                        </Flex>
                                    </Box>
                                </Box>

                                <Box bg="#121212" p={5} rounded="xl" border="1px solid" borderColor="whiteAlpha.200">
                                    <Flex align="center" gap={3} mb={4}>
                                        <Icon as={LuMail} color="purple.400" boxSize="20px" />
                                        <Text color="white" fontWeight="bold">Email Provider (Resend)</Text>
                                    </Flex>
                                    <Input defaultValue="re_123456789" type="password" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" color="white" _focus={{ borderColor: brandColor }} />
                                </Box>
                            </VStack>
                        </VStack>
                    )}

                    {/* TAB: SECURITY */}
                    {activeTab === 'security' && (
                        <VStack align="stretch" gap={8} animation="fade-in 0.3s ease">
                            <Box borderBottom="1px solid" borderColor="whiteAlpha.100" pb={4}>
                                <Text color="white" fontSize="xl" fontWeight="bold">Security & Compliance</Text>
                                <Text color="gray.400" fontSize="sm">Manage platform access, KYC policies, and emergency controls.</Text>
                            </Box>

                            <Box>
                                <Flex justify="space-between" align="center" p={4} bg="#121212" roundedTop="xl" border="1px solid" borderColor="whiteAlpha.200" borderBottom="none">
                                    <Box>
                                        <Text color="white" fontWeight="bold">Enforce 2FA for Shop Owners</Text>
                                        <Text color="gray.500" fontSize="sm">Require multi-factor authentication for all seller accounts.</Text>
                                    </Box>
                                    <CustomToggle isOn={true} />
                                </Flex>
                                <Flex justify="space-between" align="center" p={4} bg="#121212" border="1px solid" borderColor="whiteAlpha.200" borderBottom="none">
                                    <Box>
                                        <Text color="white" fontWeight="bold">Strict KYC Verification</Text>
                                        <Text color="gray.500" fontSize="sm">Shops cannot process live payments until ID is verified.</Text>
                                    </Box>
                                    <CustomToggle isOn={true} />
                                </Flex>
                                <Flex justify="space-between" align="center" p={4} bg="#121212" roundedBottom="xl" border="1px solid" borderColor="whiteAlpha.200">
                                    <Box>
                                        <Text color="white" fontWeight="bold">Auto-Suspend High Dispute Rates</Text>
                                        <Text color="gray.500" fontSize="sm">Suspend shops if chargebacks exceed 2% in a 30-day window.</Text>
                                    </Box>
                                    <CustomToggle isOn={false} />
                                </Flex>
                            </Box>

                            {/* DANGER ZONE */}
                            <Box mt={4}>
                                <Text color="red.400" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Emergency Controls</Text>
                                <Box bg="rgba(229, 62, 62, 0.05)" border="1px solid" borderColor="rgba(229, 62, 62, 0.2)" p={5} rounded="xl">
                                    <Flex justify="space-between" align="center">
                                        <Box>
                                            <Flex align="center" gap={2} mb={1}>
                                                <Icon as={LuServer} color="red.400" />
                                                <Text color="white" fontWeight="bold">Global Maintenance Mode</Text>
                                            </Flex>
                                            <Text color="gray.400" fontSize="sm">Pauses all checkouts and displays a maintenance page. Tenant dashboards remain accessible.</Text>
                                        </Box>
                                        <Button bg="red.500" color="white" _hover={{ bg: "red.600" }} display="flex" gap={2}>
                                            <Icon as={LuPowerOff} /> Enable Mode
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