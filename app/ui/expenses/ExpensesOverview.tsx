"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, IconButton, Spinner } from "@chakra-ui/react";
import { 
    LuSearch, LuPlus, LuTrendingDown, LuChartPie, 
    LuWallet, LuBox, LuMegaphone, LuSettings, 
    LuZap, LuUsers, LuEllipsisVertical, LuReceipt 
} from "react-icons/lu";

import { useExpenses } from "@/app/hooks/useExpenses";
import { Expense } from "@/app/lib/definitions";


const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

export const ExpensesOverview = () => {
    // Call custom hook
    const {
        searchQuery, categoryFilter, sortBy, sortOrder,
        handleSearch, handleCategoryFilter, handleSortBy, handleSortOrder,
        visibleItems, processedExpensesLength, totalLimit,
        visibleCount, loaderRef,
        totalExpenses, pendingExpenses, clearedExpenses
    } = useExpenses();


    const getCategoryStyle = (category: string) => {
        const baseStyle = { bg: "#111111", color: "white", border: "1px solid #333333" };
        switch (category) {
            case "Inventory": return { ...baseStyle, icon: LuBox };
            case "Marketing": return { ...baseStyle, icon: LuMegaphone };
            case "Operations": return { ...baseStyle, icon: LuSettings };
            case "Utilities": return { ...baseStyle, icon: LuZap };
            case "Payroll": return { ...baseStyle, icon: LuUsers };
            default: return { ...baseStyle, icon: LuChartPie };
        }
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            {/* ---  Page Header (Scrolls naturally) --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} wrap="wrap" gap={4} mb={6} pt={2}>
                <Box>
                    <Text color="white" fontWeight="bold" fontSize="3xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                        <Icon as={LuTrendingDown} strokeWidth="2.5" /> Expenses ({totalLimit})
                    </Text>
                    <Text color="#888888" fontSize="sm">
                        Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedExpensesLength}</Text> • Track, categorize, and manage your business outflows.
                    </Text>
                </Box>
                <Button bg="white" color="black" _hover={{ bg: "#E5E5E5" }} transition="all 0.2s" border="none" px={6} h="44px" rounded="none" fontWeight="bold">
                    <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Record Expense
                </Button>
            </Flex>

            {/* --- Sticky Toolbar (Docks to the top!) --- */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} mx={-4} px={4} borderBottom="1px solid" borderColor="#1A1A1A">
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    {/* Search */}
                    <Flex flex={1} minW="300px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input placeholder="Search descriptions or references..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} value={searchQuery} onChange={handleSearch} />
                    </Flex>
                    
                    {/* Functional Dropdowns */}
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={categoryFilter} onChange={handleCategoryFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#0A0A0A" }}>All Categories</option>
                                <option value="inventory" style={{ background: "#0A0A0A" }}>Inventory</option>
                                <option value="marketing" style={{ background: "#0A0A0A" }}>Marketing</option>
                                <option value="operations" style={{ background: "#0A0A0A" }}>Operations</option>
                                <option value="utilities" style={{ background: "#0A0A0A" }}>Utilities</option>
                                <option value="payroll" style={{ background: "#0A0A0A" }}>Payroll</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="date" style={{ background: "#0A0A0A" }}>Sort: Date</option>
                                <option value="amount" style={{ background: "#0A0A0A" }}>Sort: Amount</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#0A0A0A" }}>Newest / Highest</option>
                                <option value="asc" style={{ background: "#0A0A0A" }}>Oldest / Lowest</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- Dynamic Financial Summary --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#333333">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuWallet} color="white" boxSize="18px" strokeWidth="2.5" /></Flex>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Loaded Outflow</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalExpenses.toLocaleString()}</Text>
                </Box>
                
                <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#333333">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuReceipt} color="white" boxSize="18px" strokeWidth="2.5" /></Flex>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Cleared Expenses</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{clearedExpenses.toLocaleString()}</Text>
                </Box>
                
                <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#333333">
                    <Flex align="center" gap={3} mb={3}>
                        <Flex bg="#111111" p={2} rounded="none" border="1px solid #333333"><Icon as={LuTrendingDown} color="white" boxSize="18px" strokeWidth="2.5" /></Flex>
                        <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Payments</Text>
                    </Flex>
                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{pendingExpenses.toLocaleString()}</Text>
                </Box>
            </SimpleGrid>

            {/* ---  Expenses Table --- */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No expenses found.</Text>
                </Flex>
            ) : (
                <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" mb={4} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                    <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                        <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
                            <Box as="tr">
                                {["Details", "Category", "Amount", "Date", "Status", "Actions"].map((head) => (
                                    <Box as="th" key={head} py={4} px={6} color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                                ))}
                            </Box>
                        </Box>
                        <Box as="tbody">
                            
                            {visibleItems.map((expense: Expense, idx: number) => {
                                const catStyle = getCategoryStyle(expense.category);
                                return (
                                    <Box as="tr" key={idx} borderBottom="1px solid" borderColor="#1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{expense.description}</Text>
                                            <Text color="#888888" fontSize="xs" fontWeight="500">{expense.reference}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2}>
                                                <Flex align="center" justify="center" bg={catStyle.bg} border={catStyle.border} color={catStyle.color} p={1.5} rounded="none">
                                                    <Icon as={catStyle.icon} boxSize="14px" strokeWidth="2.5" />
                                                </Flex>
                                                <Text color="white" fontSize="sm" fontWeight="500">{expense.category}</Text>
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="md" fontWeight="bold" letterSpacing="tight">₦{expense.amount.toLocaleString()}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Text color="#888888" fontSize="sm" fontWeight="500">{expense.date}</Text>
                                        </Box>

                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" justify="center" px={2} py={1} rounded="none" bg={expense.status === "Cleared" ? "white" : "transparent"} color={expense.status === "Cleared" ? "black" : "#888888"} border={expense.status === "Cleared" ? "none" : "1px dashed #888888"} fontSize="10px" textTransform="uppercase" letterSpacing="wider" fontWeight="bold" display="inline-flex">
                                                {expense.status}
                                            </Flex>
                                        </Box>
                                        
                                        <Box as="td" py={4} px={6}>
                                            <Flex gap={2}>
                                                <Button size="sm" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }} fontWeight="bold">
                                                    View
                                                </Button>
                                                <IconButton aria-label="Options" size="sm" variant="ghost" rounded="none" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }}>
                                                    <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
                                                </IconButton>
                                            </Flex>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                    
                    {/* Infinite Scroll Trigger */}
                    {visibleCount < processedExpensesLength && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            <Spinner color="white" size="md" />
                        </Flex>
                    )}
                </Box>
            )}
        </Box>
    );
};