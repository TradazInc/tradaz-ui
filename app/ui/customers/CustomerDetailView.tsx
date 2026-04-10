"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Button, Badge } from "@chakra-ui/react";
import { LuArrowLeft, LuMail, LuPhone, LuMapPin, LuShoppingBag, LuBan, LuTrash2, LuPencil } from "react-icons/lu";
import { Customer } from "@/app/lib/definitions";

interface CustomerDetailViewProps {
    customer: Customer;
    onBack: () => void;
}

export const CustomerDetailView = ({ customer, onBack }: CustomerDetailViewProps) => {
    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" pb={10}>
            
            {/* Header / Back Button */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" py={4} mb={6} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Flex justify="space-between" align="center">
                    <Flex align="center" gap={4}>
                        <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack} px={2} h="40px">
                            <Icon as={LuArrowLeft} boxSize="20px" />
                        </Button>
                        <Text color="white" fontWeight="bold" fontSize="xl">Customer Profile</Text>
                    </Flex>
                    <Flex gap={2}>
                        <Button size="sm" bg="rgba(66, 153, 225, 0.15)" color="blue.300" _hover={{ bg: "rgba(66, 153, 225, 0.25)" }} border="none">
                            <Icon as={LuPencil} mr={2} /> Edit
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
                
                {/* Left Column: Profile Card */}
                <Box gridColumn={{ lg: "span 1" }}>
                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6} textAlign="center" mb={6}>
                        
            
                        <Flex 
                            align="center" justify="center" 
                            boxSize="100px" rounded="full" 
                            bg="#5cac7d" color="white" 
                            fontSize="4xl" fontWeight="black" 
                            mb={4} mx="auto" shadow="lg"
                        >
                            {customer.name.charAt(0)}
                        </Flex>

                        <Text color="white" fontSize="2xl" fontWeight="black">{customer.name}</Text>
                        <Text color="gray.500" mb={4}>{customer.handle}</Text>
                        
                        <Badge bg={customer.status === "Active" ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.100"} color={customer.status === "Active" ? "#5cac7d" : "gray.400"} px={3} py={1} rounded="full" mb={6}>
                            {customer.status} Account
                        </Badge>

                        <Flex direction="column" gap={3} textAlign="left" bg="#121214" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.50">
                            <Flex align="center" gap={3} color="gray.300">
                                <Icon as={LuMail} color="#5cac7d" />
                                <Text fontSize="sm">{customer.email}</Text>
                            </Flex>
                            <Flex align="center" gap={3} color="gray.300">
                                <Icon as={LuPhone} color="#5cac7d" />
                                <Text fontSize="sm">+234 (0) 800 000 0000</Text>
                            </Flex>
                            <Flex align="center" gap={3} color="gray.300">
                                <Icon as={LuMapPin} color="#5cac7d" />
                                <Text fontSize="sm">Abuja, FCT, Nigeria</Text>
                            </Flex>
                        </Flex>
                    </Box>

                    {/* Danger Zone */}
                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                        <Text color="white" fontWeight="bold" mb={4}>Danger Zone</Text>
                        <Button w="full" mb={3} variant="outline" color="orange.400" borderColor="orange.400" _hover={{ bg: "rgba(237, 137, 54, 0.1)" }}>
                            <Icon as={LuBan} mr={2} /> Suspend Account
                        </Button>
                        <Button w="full" bg="rgba(245, 101, 101, 0.15)" color="red.400" _hover={{ bg: "rgba(245, 101, 101, 0.25)" }} border="none">
                            <Icon as={LuTrash2} mr={2} /> Delete Customer
                        </Button>
                    </Box>
                </Box>

                {/* Right Column: Lifetime Stats & Recent Orders */}
                <Box gridColumn={{ lg: "span 2" }}>
                    
                    {/* Metrics Row */}
                    <SimpleGrid columns={2} gap={6} mb={8}>
                        <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                            <Flex align="center" justify="space-between" mb={4}>
                                <Text color="gray.400" fontSize="sm" fontWeight="bold" textTransform="uppercase">Total Orders</Text>
                                <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="lg"><Icon as={LuShoppingBag} color="#5cac7d" /></Flex>
                            </Flex>
                            <Text color="white" fontSize="4xl" fontWeight="black">{customer.orders}</Text>
                        </Box>
                        <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6}>
                            <Flex align="center" justify="space-between" mb={4}>
                                <Text color="gray.400" fontSize="sm" fontWeight="bold" textTransform="uppercase">Lifetime Spend</Text>
                                <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="lg"><Text color="#5cac7d" fontWeight="bold">₦</Text></Flex>
                            </Flex>
                            <Text color="#5cac7d" fontSize="4xl" fontWeight="black">₦{customer.spend.toLocaleString()}</Text>
                        </Box>
                    </SimpleGrid>

                    {/* Placeholder for Recent Orders Table */}
                    <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" p={6} h="300px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Icon as={LuShoppingBag} boxSize="40px" color="whiteAlpha.200" mb={4} />
                        <Text color="white" fontWeight="bold" fontSize="lg">Recent Orders</Text>
                        
                        <Text color="gray.500" fontSize="sm">Customer&apos;s order history will populate here.</Text>
                    </Box>
                </Box>
            </SimpleGrid>
        </Box>
    );
};