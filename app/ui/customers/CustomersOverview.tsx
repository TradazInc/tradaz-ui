"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton } from "@chakra-ui/react";

import { 
    LuSearch, LuFilter, LuEye, LuMail, 
    LuLoaderCircle, LuChevronDown, LuEllipsis 
} from "react-icons/lu";

import { generateDummyCustomers } from "@/app/lib/data";
import { Customer } from "@/app/lib/definitions";

export const CustomersOverview = () => {
    const TOTAL_CUSTOMERS = 150;
    const ITEMS_PER_PAGE = 10;
    
    const [customers, setCustomers] = useState<Customer[]>(generateDummyCustomers(ITEMS_PER_PAGE, 0));
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleLoadMore = () => {
        if (customers.length >= TOTAL_CUSTOMERS) return;
        setIsLoadingMore(true);
        setTimeout(() => {
            setCustomers((prev) => [...prev, ...generateDummyCustomers(ITEMS_PER_PAGE, prev.length)]);
            setIsLoadingMore(false);
        }, 800);
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* ---  Header & Filters --- */}
            <Box 
                position="sticky" 
                top={{ base: "70px", md: "85px" }} 
                zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" 
                backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                {/* Header Text */}
                <Flex justify="space-between" align="end" mb={4}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="2xl" mb={1}>
                            Customers ({TOTAL_CUSTOMERS})
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                            Showing <Text as="span" color="white" fontWeight="bold">{customers.length}</Text> of <Text as="span" color="white" fontWeight="bold">{TOTAL_CUSTOMERS}</Text> • Manage customer accounts, orders, and activity.
                        </Text>
                    </Box>
                </Flex>

                {/* Filter Grid */}
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100" shadow="lg">
                    <Flex align="center" gap={2} mb={4}>
                        <Icon as={LuFilter} color="gray.400" />
                        <Text color="white" fontWeight="bold">Filters & Search</Text>
                    </Flex>
                    
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
                        {/* Search */}
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1}>Search Customers</Text>
                            <Flex align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} _focusWithin={{ borderColor: "#5cac7d" }} h="40px">
                                <Icon as={LuSearch} color="gray.400" boxSize="14px" />
                                <Input placeholder="Name, email, handle..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" fontSize="sm" />
                            </Flex>
                        </Box>

                        {/* Filter by Status */}
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1}>Filter by Account Status</Text>
                            <Flex as="button" w="full" h="40px" px={3} align="center" justify="space-between" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" color="white" fontSize="sm" _hover={{ bg: "whiteAlpha.50" }}>
                                All Statuses <Icon as={LuChevronDown} color="gray.500" />
                            </Flex>
                        </Box>

                        {/* Sort By */}
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1}>Sort By</Text>
                            <Flex as="button" w="full" h="40px" px={3} align="center" justify="space-between" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" color="white" fontSize="sm" _hover={{ bg: "whiteAlpha.50" }}>
                                Total Spend <Icon as={LuChevronDown} color="gray.500" />
                            </Flex>
                        </Box>

                    
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1}>Sort Order</Text>
                            <Flex as="button" w="full" h="40px" px={3} align="center" justify="space-between" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" color="white" fontSize="sm" _hover={{ bg: "whiteAlpha.50" }}>
                                Highest First <Icon as={LuChevronDown} color="gray.500" />
                            </Flex>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>

            {/* --- Customers Table --- */}
            <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
            
                <Box as="table" w="full" minW="1000px" textAlign="center" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                        <Box as="tr">
                            {["Customer", "Contact", "Total Orders", "Total Spend", "Status", "Actions"].map((head) => (
                                <Box as="th" key={head} py={4} px={5} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {customers.map((customer, idx) => {
                            return (
                                <Box as="tr" key={idx} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                    
                                    {/* Name & Handle */}
                                    <Box as="td" py={4} px={5}>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{customer.name}</Text>
                                        <Text color="gray.500" fontSize="xs">{customer.handle}</Text>
                                    </Box>
                                    
                                    {/* Contact */}
                                    <Box as="td" py={4} px={5}>
                                    
                                        <Flex align="center" justify="center" gap={2} color="gray.300">
                                            <Icon as={LuMail} boxSize="14px" color="gray.500" />
                                            <Text fontSize="sm">{customer.email}</Text>
                                        </Flex>
                                    </Box>

                                    {/* Orders & Spend */}
                                    <Box as="td" py={4} px={5}><Text color="white" fontSize="sm" fontWeight="medium">{customer.orders}</Text></Box>
                                    <Box as="td" py={4} px={5}><Text color="#5cac7d" fontSize="sm" fontWeight="bold">₦{customer.spend.toLocaleString()}</Text></Box>

                                    {/* Status Badge */}
                                    <Box as="td" py={4} px={5}>
                                        <Flex align="center" justify="center" gap={1.5} px={3} py={1} rounded="full" bg={customer.status === "Active" ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.100"} color={customer.status === "Active" ? "#5cac7d" : "gray.400"} fontSize="xs" fontWeight="bold" display="inline-flex">
                                            <Box boxSize="6px" rounded="full" bg={customer.status === "Active" ? "#5cac7d" : "gray.400"} />
                                            {customer.status}
                                        </Flex>
                                    </Box>
                                    
                                    {/* Actions */}
                                    <Box as="td" py={4} px={5}>
                                    
                                        <Flex gap={1} justify="center">
                                            <IconButton aria-label="View" variant="ghost" size="sm" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }}><Icon as={LuEye} /></IconButton>
                                            <IconButton aria-label="More Options" variant="ghost" size="sm" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }}><Icon as={LuEllipsis} /></IconButton>
                                        </Flex>
                                    </Box>

                                </Box>
                            );
                        })}
                    </Box>
                </Box>
                
                {/* Load More Trigger */}
                {customers.length < TOTAL_CUSTOMERS && (
                    <Flex justify="center" py={6}>
                        <Button onClick={handleLoadMore} disabled={isLoadingMore} variant="ghost" color="gray.400" _hover={{ color: "white" }} fontSize="sm">
                            {isLoadingMore ? <Icon as={LuLoaderCircle} animation="spin 1s linear infinite" /> : "Load More Customers"}
                        </Button>
                    </Flex>
                )}
            </Box>

        </Box>
    );
};