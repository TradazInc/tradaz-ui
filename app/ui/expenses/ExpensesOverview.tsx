"use client";
import React, { useState, useRef, useCallback } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton } from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuChevronDown, LuPlus, 
    LuTrendingDown, LuChartPie, LuWallet, LuBox, LuMegaphone, 
    LuSettings, LuZap, LuUsers, LuEllipsisVertical, LuReceipt, LuLoaderCircle 
} from "react-icons/lu";

import { generateDummyExpenses } from "@/app/lib/data";
import { Expense } from "@/app/lib/definitions";

export const ExpensesOverview = () => {
    const TOTAL_EXPENSES_LIMIT = 60; // Max items to load 
    const ITEMS_PER_PAGE = 15;

    const [expenses, setExpenses] = useState<Expense[]>(generateDummyExpenses(ITEMS_PER_PAGE, 0));
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // --- INFINITE SCROLL LOGIC ---
    const observer = useRef<IntersectionObserver | null>(null);
    

    const lastExpenseElementRef = useCallback((node: HTMLDivElement | null) => {
        if (isLoadingMore) return; 
        
        // Disconnect previous observer
        if (observer.current) observer.current.disconnect(); 

        // Create new observer
        observer.current = new IntersectionObserver(entries => {
        
            if (entries[0].isIntersecting && hasMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setExpenses(prev => {
                        const nextBatch = generateDummyExpenses(ITEMS_PER_PAGE, prev.length);
                        if (prev.length + nextBatch.length >= TOTAL_EXPENSES_LIMIT) {
                            setHasMore(false); // Stop loading if we hit the limit
                        }
                        return [...prev, ...nextBatch];
                    });
                    setIsLoadingMore(false);
                }, 800); //  loading spinner
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoadingMore, hasMore]);

    // Calculate Summary Metrics
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const pendingExpenses = expenses.filter(e => e.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0);
    const clearedExpenses = totalExpenses - pendingExpenses;

    // Helper for Category Styling & Icons
    const getCategoryStyle = (category: string) => {
        switch (category) {
            case "Inventory": return { bg: "rgba(66, 153, 225, 0.15)", color: "blue.400", icon: LuBox };
            case "Marketing": return { bg: "rgba(237, 137, 54, 0.15)", color: "orange.400", icon: LuMegaphone };
            case "Operations": return { bg: "rgba(128, 90, 213, 0.15)", color: "purple.400", icon: LuSettings };
            case "Utilities": return { bg: "rgba(236, 201, 75, 0.15)", color: "yellow.400", icon: LuZap };
            case "Payroll": return { bg: "rgba(92, 172, 125, 0.15)", color: "#5cac7d", icon: LuUsers };
            default: return { bg: "whiteAlpha.100", color: "gray.400", icon: LuChartPie };
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* --- Sticky Header & Filters --- */}
            <Box 
                position="sticky" 
                top={{ base: "70px", md: "85px" }} 
                zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" 
                backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} wrap="wrap" gap={4} mb={6}>
                    <Box>
                        <Text color="red.400" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuTrendingDown} /> Expenses ({expenses.length})
                        </Text>
                        <Text color="gray.400" fontSize="sm">Track, categorize, and manage your business outflows.</Text>
                    </Box>
                    <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d", transform: "translateY(-1px)", shadow: "lg" }} transition="all 0.2s" border="none" px={6} h="44px" rounded="lg" fontWeight="bold">
                        <Icon as={LuPlus} mr={2} /> Record Expense
                    </Button>
                </Flex>

                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="300px" align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} _focusWithin={{ borderColor: "#5cac7d" }}>
                        <Icon as={LuSearch} color="gray.400" />
                        <Input placeholder="Search descriptions or references..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="44px" />
                    </Flex>
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <Button flex={{ base: 1, md: "none" }} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="44px" bg="#121214">
                            <Icon as={LuFilter} mr={2} /> Category
                        </Button>
                        <Button flex={{ base: 1, md: "none" }} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="44px" bg="#121214">
                            Sort by <Icon as={LuChevronDown} ml={2} />
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            {/* --- Expense Financial Summary --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="whiteAlpha.100" shadow="sm">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="whiteAlpha.100" p={2} rounded="md"><Icon as={LuWallet} color="gray.300" boxSize="20px" /></Flex>
                        <Text color="gray.400" fontSize="sm" fontWeight="medium">Loaded Outflow</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black">₦{totalExpenses.toLocaleString()}</Text>
                </Box>
                
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="whiteAlpha.100" shadow="sm">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="rgba(92, 172, 125, 0.15)" p={2} rounded="md"><Icon as={LuReceipt} color="#5cac7d" boxSize="20px" /></Flex>
                        <Text color="gray.400" fontSize="sm" fontWeight="medium">Cleared Expenses</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black">₦{clearedExpenses.toLocaleString()}</Text>
                </Box>
                
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="red.900" shadow="sm" position="relative" overflow="hidden">
                    <Box position="absolute" right="-20px" top="-20px" opacity={0.05}><Icon as={LuTrendingDown} boxSize="120px" color="red.500" /></Box>
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="rgba(245, 101, 101, 0.15)" p={2} rounded="md"><Icon as={LuTrendingDown} color="red.400" boxSize="20px" /></Flex>
                        <Text color="gray.400" fontSize="sm" fontWeight="medium">Pending Payments</Text>
                    </Flex>
                    <Text color="red.400" fontSize="3xl" fontWeight="black">₦{pendingExpenses.toLocaleString()}</Text>
                </Box>
            </SimpleGrid>

            {/* --- Expenses Table --- */}
            <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" mb={4} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                        <Box as="tr">
                            {["Details", "Category", "Amount", "Date", "Status", "Actions"].map((head) => (
                                <Box as="th" key={head} py={4} px={6} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {expenses.map((expense, idx) => {
                            const catStyle = getCategoryStyle(expense.category);
                            
                            // Check if this is the very last row in  data arra
                            const isLastElement = expenses.length === idx + 1;

                            return (
                                <Box 
                                    as="tr" 
                                    key={expense.id} 
                                    ref={isLastElement ? lastExpenseElementRef : null}
                                    borderBottom="1px solid" borderColor="whiteAlpha.50" 
                                    _hover={{ bg: "whiteAlpha.50" }} 
                                    transition="background 0.2s"
                                >
                                    
                                    <Box as="td" py={4} px={6}>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{expense.description}</Text>
                                        <Text color="gray.500" fontSize="xs">{expense.reference}</Text>
                                    </Box>

                                    <Box as="td" py={4} px={6}>
                                        <Flex align="center" gap={2}>
                                            <Flex align="center" justify="center" bg={catStyle.bg} color={catStyle.color} p={1.5} rounded="md">
                                                <Icon as={catStyle.icon} boxSize="14px" />
                                            </Flex>
                                            <Text color="gray.300" fontSize="sm">{expense.category}</Text>
                                        </Flex>
                                    </Box>
                                    
                                    <Box as="td" py={4} px={6}>
                                        <Text color="white" fontSize="md" fontWeight="bold">₦{expense.amount.toLocaleString()}</Text>
                                    </Box>

                                    <Box as="td" py={4} px={6}>
                                        <Text color="gray.400" fontSize="sm">{expense.date}</Text>
                                    </Box>

                                    <Box as="td" py={4} px={6}>
                                        <Flex align="center" gap={2}>
                                            <Box boxSize="8px" rounded="full" bg={expense.status === "Cleared" ? "#5cac7d" : "orange.400"} />
                                            <Text color={expense.status === "Cleared" ? "gray.300" : "orange.400"} fontSize="sm" fontWeight={expense.status === "Pending" ? "bold" : "normal"}>
                                                {expense.status}
                                            </Text>
                                        </Flex>
                                    </Box>
                                    
                                    <Box as="td" py={4} px={6}>
                                        <Flex gap={2}>
                                            <Button size="sm" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.200" }}>
                                                View
                                            </Button>
                                            <IconButton aria-label="Options" size="sm" variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.200" }}>
                                                <Icon as={LuEllipsisVertical} />
                                            </IconButton>
                                        </Flex>
                                    </Box>

                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>

            {/* --- Auto-Loading Spinner --- */}
            {isLoadingMore && (
                <Flex justify="center" py={6} color="gray.400">
                    <Icon as={LuLoaderCircle} animation="spin 1s linear infinite" boxSize="24px" />
                </Flex>
            )}

        </Box>
    );
};