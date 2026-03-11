"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, VStack, Avatar, IconButton 
} from "@chakra-ui/react";
import { 
    LuUser, LuCamera, LuMail, LuPhone, LuLock, LuBell, LuShieldCheck, LuSave
} from "react-icons/lu";


const CustomToggle = ({ isOn, onToggle, brandColor }: { isOn: boolean, onToggle: () => void, brandColor: string }) => (
    <Flex 
        w="44px" h="24px" bg={isOn ? brandColor : "whiteAlpha.300"} rounded="full" 
        align="center" px="2px" cursor="pointer" onClick={onToggle} transition="all 0.2s"
    >
        <Box boxSize="20px" bg="white" rounded="full" transform={isOn ? "translateX(20px)" : "translateX(0)"} transition="all 0.2s" shadow="sm" />
    </Flex>
);

export default function ProfileSettingsPage() {
    const brandColor = "#5cac7d";

    // --- STATE ---
    const [isSaving, setIsSaving] = useState(false);
    
    const [profile, setProfile] = useState({
        firstName: "Wada",
        lastName: "Gift",
        email: "hello@tradaz.com",
        phone: "+234 812 345 6789",
    });

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promotions: false,
        securityAlerts: true
    });

    // --- LOGIC HANDLERS ---
    const handleSaveProfile = () => {
        setIsSaving(true);
        // API-READY: PUT /api/user/profile goes here
        setTimeout(() => {
            setIsSaving(false);
            alert("Profile updated successfully!");
        }, 1500);
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1000px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* Header */}
            <Flex align="center" gap={3} mb={8}>
                <Icon as={LuUser} boxSize="28px" color={brandColor} />
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                        Profile Settings
                    </Text>
                    <Text color="gray.400" fontSize="sm">Manage your personal information and security preferences.</Text>
                </Box>
            </Flex>

            <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
                
                {/* LEFT COLUMN: Avatar & Quick Stats */}
                <VStack align="stretch" gap={6}>
                    <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" textAlign="center">
                        <Box position="relative" display="inline-block" mb={4}>
                            <Avatar.Root size="2xl" width="100px" height="100px">
                                <Avatar.Fallback name={`${profile.firstName} ${profile.lastName}`} bg={brandColor} color="white" fontSize="2xl" />
                                <Avatar.Image src="https://bit.ly/sage-adebayo" />
                            </Avatar.Root>
                            <IconButton 
                                position="absolute" bottom={0} right={0} aria-label="Upload picture" 
                                bg="white" color="black" size="sm" rounded="full" shadow="lg"
                                _hover={{ bg: "gray.200" }}
                            >
                                <LuCamera />
                            </IconButton>
                        </Box>
                        <Text color="white" fontWeight="bold" fontSize="lg">{profile.firstName} {profile.lastName}</Text>
                        <Text color="gray.500" fontSize="sm" mb={4}>Premium Customer</Text>
                        
                        <Flex justify="center" gap={2} bg="rgba(92, 172, 125, 0.1)" color={brandColor} py={2} rounded="lg">
                            <Icon as={LuShieldCheck} />
                            <Text fontSize="xs" fontWeight="bold">Account Verified</Text>
                        </Flex>
                    </Box>
                </VStack>

                {/* RIGHT COLUMN: Forms */}
                <VStack align="stretch" gap={6}>
                    
                    {/*  Personal Information */}
                    <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Text color="white" fontSize="lg" fontWeight="bold" mb={6}>Personal Information</Text>
                        
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={6}>
                            <Box>
                                <Text color="gray.400" fontSize="xs" mb={1} fontWeight="bold" textTransform="uppercase">First Name</Text>
                                <Input 
                                    bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px"
                                    _focus={{ borderColor: brandColor, outline: "none" }}
                                    value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                                />
                            </Box>
                            <Box>
                                <Text color="gray.400" fontSize="xs" mb={1} fontWeight="bold" textTransform="uppercase">Last Name</Text>
                                <Input 
                                    bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px"
                                    _focus={{ borderColor: brandColor, outline: "none" }}
                                    value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                                />
                            </Box>
                            <Box>
                                <Text color="gray.400" fontSize="xs" mb={1} fontWeight="bold" textTransform="uppercase">Email Address</Text>
                                <Flex align="center" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" rounded="md" px={3} _focusWithin={{ borderColor: brandColor }}>
                                    <Icon as={LuMail} color="gray.500" />
                                    <Input border="none" color="white" h="50px" _focus={{ boxShadow: "none" }} value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                                </Flex>
                            </Box>
                            <Box>
                                <Text color="gray.400" fontSize="xs" mb={1} fontWeight="bold" textTransform="uppercase">Phone Number</Text>
                                <Flex align="center" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" rounded="md" px={3} _focusWithin={{ borderColor: brandColor }}>
                                    <Icon as={LuPhone} color="gray.500" />
                                    <Input border="none" color="white" h="50px" _focus={{ boxShadow: "none" }} value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                                </Flex>
                            </Box>
                        </Grid>

                        <Flex justify="flex-end">
                            <Button bg={brandColor} color="white" px={8} h="45px" rounded="lg" _hover={{ filter: "brightness(1.1)" }} onClick={handleSaveProfile} loading={isSaving} display="flex" gap={2}>
                                <Icon as={LuSave} /> Save Changes
                            </Button>
                        </Flex>
                    </Box>

                    {/*  Security */}
                    <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex align="center" gap={2} mb={6}>
                            <Icon as={LuLock} color="white" />
                            <Text color="white" fontSize="lg" fontWeight="bold">Security & Password</Text>
                        </Flex>
                        
                        <VStack gap={4} align="stretch" maxW="md">
                            <Input type="password" placeholder="Current Password" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px" _focus={{ borderColor: brandColor }} value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} />
                            <Input type="password" placeholder="New Password" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px" _focus={{ borderColor: brandColor }} value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} />
                            <Input type="password" placeholder="Confirm New Password" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px" _focus={{ borderColor: brandColor }} value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} />
                            <Button variant="outline" color="white" borderColor="whiteAlpha.200" h="45px" rounded="lg" _hover={{ bg: "whiteAlpha.100" }} alignSelf="flex-start" mt={2}>
                                Update Password
                            </Button>
                        </VStack>
                    </Box>

                    
                    <Box bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex align="center" gap={2} mb={6}>
                            <Icon as={LuBell} color="white" />
                            <Text color="white" fontSize="lg" fontWeight="bold">Notification Preferences</Text>
                        </Flex>

                        <VStack gap={0} align="stretch">
                            <Flex justify="space-between" align="center" py={4} borderBottom="1px solid" borderColor="whiteAlpha.50">
                                <Box>
                                    <Text color="white" fontWeight="bold" fontSize="sm">Order Updates</Text>
                                    <Text color="gray.500" fontSize="xs">Get real-time alerts on your package delivery status.</Text>
                                </Box>
                                
                                <CustomToggle brandColor={brandColor} isOn={notifications.orderUpdates} onToggle={() => setNotifications({...notifications, orderUpdates: !notifications.orderUpdates})} />
                            </Flex>
                            <Flex justify="space-between" align="center" py={4} borderBottom="1px solid" borderColor="whiteAlpha.50">
                                <Box>
                                    <Text color="white" fontWeight="bold" fontSize="sm">Promotions & Discounts</Text>
                                    <Text color="gray.500" fontSize="xs">Receive coupons, flash sales, and special drops.</Text>
                                </Box>
                                <CustomToggle brandColor={brandColor} isOn={notifications.promotions} onToggle={() => setNotifications({...notifications, promotions: !notifications.promotions})} />
                            </Flex>
                            <Flex justify="space-between" align="center" py={4}>
                                <Box>
                                    <Text color="white" fontWeight="bold" fontSize="sm">Security Alerts</Text>
                                    <Text color="gray.500" fontSize="xs">Get notified of new logins and password changes.</Text>
                                </Box>
                                <CustomToggle brandColor={brandColor} isOn={notifications.securityAlerts} onToggle={() => setNotifications({...notifications, securityAlerts: !notifications.securityAlerts})} />
                            </Flex>
                        </VStack>
                    </Box>

                </VStack>
            </Grid>
        </Box>
    );
}