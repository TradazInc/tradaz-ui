"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, Icon, Input, Button, VStack, Badge,Separator
} from "@chakra-ui/react";
import { 
    LuSettings, LuShield, LuBell, LuCode, LuUsers, LuSave, LuGlobe, LuMail, LuKey, LuSmartphone, LuLaptop
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const inputStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white" }, _hover: { borderColor: "#555555" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 16px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", width: "100%" };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

// --- CUSTOM BRUTALIST TOGGLE SWITCH ---
const BrutalistToggle = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
    <Flex 
        w="44px" h="24px" bg={isOn ? "#5cac7d" : "#1A1A1A"} border="1px solid" borderColor={isOn ? "#5cac7d" : "#333333"}
        p="2px" cursor="pointer" rounded="none" onClick={onToggle} transition="background 0.2s"
    >
        <Box 
            w="18px" h="18px" bg="white" rounded="none"
            transform={isOn ? "translateX(20px)" : "translateX(0)"} transition="transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)" 
        />
    </Flex>
);

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("General");

    // Mock toggle states for the Security tab
    const [toggles, setToggles] = useState({ twoFactor: true, loginAlerts: true, requirePin: false });
    const handleToggle = (key: keyof typeof toggles) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

    const SETTINGS_TABS = [
        { id: "General", icon: LuSettings, description: "Platform details & localization" },
        { id: "Security", icon: LuShield, description: "2FA, passwords & active sessions" },
        { id: "Notifications", icon: LuBell, description: "Alert routing & preferences" },
        { id: "API & Integrations", icon: LuCode, description: "Webhooks & API keys" },
        { id: "Staff Access", icon: LuUsers, description: "Role-based access control" },
    ];

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Platform Configuration
                    </Text>
                    <Text color="#888888" fontSize="sm">Manage global settings, security policies, and integrations for the Tradaz ecosystem.</Text>
                </Box>
            </Flex>

            {/* --- SETTINGS LAYOUT --- */}
            <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8} alignItems="start">
                
                {/* LEFT NAVIGATION PANE */}
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none">
                    <VStack align="stretch" gap={0}>
                        {SETTINGS_TABS.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <Flex 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    align="center" gap={4} p={4} cursor="pointer"
                                    borderBottom="1px solid #1A1A1A"
                                    bg={isActive ? "#111111" : "transparent"}
                                    borderLeft="2px solid" borderColor={isActive ? "white" : "transparent"}
                                    _hover={{ bg: "#111111" }} transition="all 0.2s"
                                >
                                    <Icon as={tab.icon} color={isActive ? "white" : "#888888"} boxSize="18px" strokeWidth="2.5" />
                                    <Box>
                                        <Text color={isActive ? "white" : "#A1A1AA"} fontSize="sm" fontWeight="bold" letterSpacing="tight">{tab.id}</Text>
                                        <Text color="#555555" fontSize="10px" mt={0.5}>{tab.description}</Text>
                                    </Box>
                                </Flex>
                            );
                        })}
                    </VStack>
                </Box>

                {/* RIGHT CONTENT PANE */}
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" minH="500px" p={6} position="relative">
                    
                    {/* === GENERAL SETTINGS TAB === */}
                    {activeTab === "General" && (
                        <Box animation="fade-in 0.2s ease">
                            <Text color="white" fontSize="xl" fontWeight="black" letterSpacing="tight" mb={6}>General Settings</Text>
                            
                            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mb={8}>
                                <Box>
                                    <Text as="label" {...labelStyles}>Platform Name</Text>
                                    <Flex align="center" position="relative">
                                        <Icon as={LuGlobe} color="#555555" position="absolute" left={3} zIndex={1} />
                                        <Input defaultValue="Tradaz Marketplace" pl={10} {...inputStyles} />
                                    </Flex>
                                </Box>
                                <Box>
                                    <Text as="label" {...labelStyles}>Support Email</Text>
                                    <Flex align="center" position="relative">
                                        <Icon as={LuMail} color="#555555" position="absolute" left={3} zIndex={1} />
                                        <Input defaultValue="support@tradaz.com" pl={10} {...inputStyles} />
                                    </Flex>
                                </Box>
                            </Grid>

                            <Separator borderColor="#1A1A1A" mb={8} />

                            <Text color="white" fontSize="md" fontWeight="bold" letterSpacing="tight" mb={6}>Localization</Text>
                            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mb={10}>
                                <Box>
                                    <Text as="label" {...labelStyles}>Default Currency</Text>
                                    <select style={nativeSelectStyle} defaultValue="NGN">
                                        <option value="NGN" style={{ background: "#000000" }}>NGN - Nigerian Naira</option>
                                        <option value="USD" style={{ background: "#000000" }}>USD - US Dollar</option>
                                        <option value="GBP" style={{ background: "#000000" }}>GBP - British Pound</option>
                                    </select>
                                </Box>
                                <Box>
                                    <Text as="label" {...labelStyles}>System Timezone</Text>
                                    <select style={nativeSelectStyle} defaultValue="WAT">
                                        <option value="WAT" style={{ background: "#000000" }}>West Africa Time (WAT)</option>
                                        <option value="GMT" style={{ background: "#000000" }}>Greenwich Mean Time (GMT)</option>
                                        <option value="EST" style={{ background: "#000000" }}>Eastern Standard Time (EST)</option>
                                    </select>
                                </Box>
                            </Grid>

                            <Flex justify="flex-end" pt={4} borderTop="1px solid #1A1A1A">
                                <Button bg="white" color="black" rounded="none" border="none" _hover={{ bg: "#E5E5E5" }} h="44px" px={8} fontWeight="bold" gap={2}>
                                    <Icon as={LuSave} strokeWidth="2.5" /> Save Configuration
                                </Button>
                            </Flex>
                        </Box>
                    )}

                    {/* === SECURITY SETTINGS TAB === */}
                    {activeTab === "Security" && (
                        <Box animation="fade-in 0.2s ease">
                            <Text color="white" fontSize="xl" fontWeight="black" letterSpacing="tight" mb={6}>Security & Access</Text>
                            
                            {/* Password Section */}
                            <Box bg="#111111" border="1px solid #1A1A1A" p={5} mb={6}>
                                <Flex align="center" gap={3} mb={4}>
                                    <Icon as={LuKey} color="white" boxSize="18px" />
                                    <Text color="white" fontWeight="bold">Administrator Password</Text>
                                </Flex>
                                <Text color="#888888" fontSize="sm" mb={4}>Last changed 45 days ago. We recommend updating your password every 90 days.</Text>
                                <Button variant="outline" borderColor="#333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} h="40px">
                                    Change Password
                                </Button>
                            </Box>

                            {/* Toggles Section */}
                            <VStack align="stretch" gap={0} mb={8} border="1px solid #1A1A1A">
                                <Flex justify="space-between" align="center" p={5} bg="#111111" borderBottom="1px solid #1A1A1A">
                                    <Box>
                                        <Text color="white" fontWeight="bold" fontSize="sm" mb={1}>Two-Factor Authentication (2FA)</Text>
                                        <Text color="#888888" fontSize="xs">Require an authenticator app code when logging in.</Text>
                                    </Box>
                                    <BrutalistToggle isOn={toggles.twoFactor} onToggle={() => handleToggle("twoFactor")} />
                                </Flex>
                                <Flex justify="space-between" align="center" p={5} bg="#111111" borderBottom="1px solid #1A1A1A">
                                    <Box>
                                        <Text color="white" fontWeight="bold" fontSize="sm" mb={1}>New Login Alerts</Text>
                                        <Text color="#888888" fontSize="xs">Send an email when a login occurs from a new IP address.</Text>
                                    </Box>
                                    <BrutalistToggle isOn={toggles.loginAlerts} onToggle={() => handleToggle("loginAlerts")} />
                                </Flex>
                                <Flex justify="space-between" align="center" p={5} bg="#111111">
                                    <Box>
                                        <Text color="white" fontWeight="bold" fontSize="sm" mb={1}>Require PIN for Payouts</Text>
                                        <Text color="#888888" fontSize="xs">Require a 4-digit master PIN before approving escrow releases.</Text>
                                    </Box>
                                    <BrutalistToggle isOn={toggles.requirePin} onToggle={() => handleToggle("requirePin")} />
                                </Flex>
                            </VStack>

                            <Text color="white" fontSize="md" fontWeight="bold" letterSpacing="tight" mb={4}>Active Sessions</Text>
                            <VStack align="stretch" gap={0} border="1px solid #1A1A1A">
                                <Flex justify="space-between" align="center" p={4} bg="#111111" borderBottom="1px solid #1A1A1A">
                                    <Flex align="center" gap={4}>
                                        <Icon as={LuLaptop} color="#5cac7d" boxSize="20px" />
                                        <Box>
                                            <Flex align="center" gap={2}>
                                                <Text color="white" fontWeight="bold" fontSize="sm">Mac OS • Chrome</Text>
                                                <Badge bg="rgba(92, 172, 125, 0.1)" color="#5cac7d" border="1px solid #5cac7d" rounded="none" fontSize="8px">Current</Badge>
                                            </Flex>
                                            <Text color="#888888" fontSize="xs">IP: 192.168.1.1 • Abuja, NG</Text>
                                        </Box>
                                    </Flex>
                                </Flex>
                                <Flex justify="space-between" align="center" p={4} bg="#111111">
                                    <Flex align="center" gap={4}>
                                        <Icon as={LuSmartphone} color="#888888" boxSize="20px" />
                                        <Box>
                                            <Text color="white" fontWeight="bold" fontSize="sm">iOS 17 • Safari</Text>
                                            <Text color="#888888" fontSize="xs">IP: 105.112.x.x • Lagos, NG</Text>
                                        </Box>
                                    </Flex>
                                    <Button size="sm" variant="outline" borderColor="#333333" color="red.400" rounded="none" _hover={{ bg: "rgba(229, 62, 62, 0.1)", borderColor: "red.400" }}>Revoke</Button>
                                </Flex>
                            </VStack>

                        </Box>
                    )}

                    {/* === PLACEHOLDER FOR OTHER TABS === */}
                    {["Notifications", "API & Integrations", "Staff Access"].includes(activeTab) && (
                        <Flex direction="column" align="center" justify="center" h="100%" minH="400px" animation="fade-in 0.2s ease">
                            <Icon as={SETTINGS_TABS.find(t => t.id === activeTab)?.icon} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                            <Text color="white" fontSize="xl" fontWeight="black" letterSpacing="tight">{activeTab} Settings</Text>
                            <Text color="#888888" fontSize="sm" mt={2}>Configuration module loading or under construction.</Text>
                        </Flex>
                    )}

                </Box>
            </Grid>
        </Box>
    );
}