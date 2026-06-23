
"use client";
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Icon,
  Input,
  Button,
  Spinner,
  IconButton,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuSearch,
  LuPlus,
  LuTrendingDown,
  LuChartPie,
  LuWallet,
  LuBox,
  LuMegaphone,
  LuSettings,
  LuZap,
  LuUsers,
  LuReceipt,
  LuX,
  LuCalendar,
} from "react-icons/lu";

import { useExpenses } from "@/hooks/useExpenses";
import { Expense } from "@/types/definitions";

const controlStyles = {
  bg: "#0A0A0A",
  border: "1px solid",
  borderColor: "#1A1A1A",
  color: "white",
  h: "44px",
  rounded: "none",
  px: 3,
  _focus: { outline: "none", borderColor: "white" },
  _hover: { bg: "#111111" },
};

const nativeSelectStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#0A0A0A",
  color: "white",
  height: "44px",
  borderRadius: "8px",
  padding: "0 12px",
  border: "1px solid #1A1A1A",
  outline: "none",
  cursor: "pointer",
  fontSize: "14px",
};

const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };
const inputStyles = { bg: "#000000", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white", boxShadow: "none" }, _hover: { borderColor: "#555555" } };

// --- RECORD EXPENSE MODAL ---
const RecordExpenseModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
          <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px", md: "450px" }} pointerEvents="none">
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
            >
              <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                  <Box>
                    <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>New Transaction</Text>
                    <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">Record Expense</Text>
                  </Box>
                  <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                    <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                  </IconButton>
                </Flex>

                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                  <VStack w="full" gap={6} align="stretch">
                    <Box>
                      <Text as="label" {...labelStyles}>Description <Text as="span" color="red.400">*</Text></Text>
                      <Input placeholder="e.g. Office Supplies" {...inputStyles} />
                    </Box>
                    <Box>
                      <Text as="label" {...labelStyles}>Amount (₦) <Text as="span" color="red.400">*</Text></Text>
                      <Input type="number" placeholder="0.00" {...inputStyles} />
                    </Box>
                    <Box>
                      <Text as="label" {...labelStyles}>Category <Text as="span" color="red.400">*</Text></Text>
                      <select style={{ ...nativeSelectStyle, borderRadius: "0px", borderColor: "#333333", backgroundColor: "#000000" }}>
                        <option value="Inventory">Inventory</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Operations">Operations</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Payroll">Payroll</option>
                      </select>
                    </Box>
                    <Box>
                      <Text as="label" {...labelStyles}>Date <Text as="span" color="red.400">*</Text></Text>
                      <Input type="date" {...inputStyles} />
                    </Box>
                  </VStack>
                </Box>

                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                  <Button variant="outline" borderColor="#333333" onClick={onClose} h="44px" rounded="none" color="#888888" bg="#0A0A0A" _hover={{ bg: "#1A1A1A", color: "white" }}>
                    Cancel
                  </Button>
                  <Button flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" onClick={handleSave} loading={isLoading} loadingText="Saving..." _hover={{ bg: "#E5E5E5" }}>
                    Save Expense
                  </Button>
                </Flex>
              </Box>
            </motion.div>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
};

// --- VIEW EXPENSE MODAL ---
const ViewExpenseModal = ({ expense, onClose }: { expense: Expense | null; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {expense && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
          <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px" }} pointerEvents="none">
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
            >
              <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                  <Box>
                    <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Expense Details</Text>
                    <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{expense.reference}</Text>
                  </Box>
                  <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                    <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                  </IconButton>
                </Flex>

                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                  <VStack w="full" gap={6} align="stretch">
                    <Box bg="#111111" p={5} border="1px solid #1A1A1A">
                      <Text color="#888888" fontSize="xs" textTransform="uppercase" fontWeight="bold" letterSpacing="wider" mb={1}>Amount</Text>
                      <Text color="white" fontSize="3xl" fontWeight="black" fontFamily="monospace">₦{expense.amount.toLocaleString()}</Text>
                      <Badge mt={3} bg={expense.status === "Cleared" ? "white" : "transparent"} color={expense.status === "Cleared" ? "black" : "gray.400"} border={expense.status === "Cleared" ? "1px solid white" : "1px dashed #333333"} rounded="none" px={2} py={1}>
                        {expense.status}
                      </Badge>
                    </Box>

                    <Box bg="#111111" p={5} border="1px solid #1A1A1A">
                      <VStack align="stretch" gap={4}>
                        <Box>
                          <Text color="#888888" fontSize="xs" mb={1}>Description</Text>
                          <Text color="white" fontWeight="bold">{expense.description}</Text>
                        </Box>
                        <Box>
                          <Text color="#888888" fontSize="xs" mb={1}>Category</Text>
                          <Text color="white" fontWeight="bold">{expense.category}</Text>
                        </Box>
                        <Box>
                          <Text color="#888888" fontSize="xs" mb={1}>Date</Text>
                          <Flex align="center" gap={2} color="white">
                            <Icon as={LuCalendar} color="gray.400" />
                            <Text fontWeight="bold">{expense.date}</Text>
                          </Flex>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
                
                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" bg="#111111">
                  <Button w="full" bg="white" color="black" rounded="none" fontWeight="bold" onClick={onClose} _hover={{ bg: "#E5E5E5" }}>
                    Close Details
                  </Button>
                </Flex>
              </Box>
            </motion.div>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
};

export const ExpensesOverview = () => {
  // Modal States
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [viewingExpense, setViewingExpense] = useState<Expense | null>(null);

  // Call custom hook
  const {
    searchQuery,
    categoryFilter,
    sortBy,
    sortOrder,
    handleSearch,
    handleCategoryFilter,
    handleSortBy,
    handleSortOrder,
    visibleItems,
    processedExpensesLength,
    totalLimit,
    visibleCount,
    loaderRef,
    totalExpenses,
    pendingExpenses,
    clearedExpenses,
  } = useExpenses();

  const getCategoryStyle = (category: string) => {
    const baseStyle = {
      bg: "#111111",
      color: "white",
      border: "1px solid #1A1A1A",
    };
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
    <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
      
      {/* --- Page Header --- */}
      <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} wrap="wrap" gap={4} mb={6} pt={2}>
        <Box>
          <Text color="white" fontWeight="bold" fontSize="3xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
            <Icon as={LuTrendingDown} strokeWidth="2.5" /> Expenses ({totalLimit})
          </Text>
          <Text color="gray.500" fontSize="sm">
            Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedExpensesLength}</Text> • Track, categorize, and manage your business outflows.
          </Text>
        </Box>
        <Button
          onClick={() => setIsRecordModalOpen(true)}
          bg="white" color="black" _hover={{ bg: "gray.200" }} transition="all 0.2s" border="none" px={6} h="44px" rounded="none" fontWeight="bold"
        >
          <Icon as={LuPlus} mr={2} strokeWidth="2.5" /> Record Expense
        </Button>
      </Flex>

      {/* --- Sticky Toolbar --- */}
      <Box position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }} zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} borderBottom="1px solid #1A1A1A">
        <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
          <Flex flex={1} minW="300px" align="center" {...controlStyles}>
            <Icon as={LuSearch} color="gray.400" mr={2} strokeWidth="2.5" />
            <Input placeholder="Search descriptions or references..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} value={searchQuery} onChange={handleSearch} rounded="none" />
          </Flex>

          <Flex gap={3} w={{ base: "full", md: "auto" }}>
            <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
              <select value={categoryFilter} onChange={handleCategoryFilter} style={nativeSelectStyle}>
                <option value="all" style={{ background: "#111111" }}>All Categories</option>
                <option value="inventory" style={{ background: "#111111" }}>Inventory</option>
                <option value="marketing" style={{ background: "#111111" }}>Marketing</option>
                <option value="operations" style={{ background: "#111111" }}>Operations</option>
                <option value="utilities" style={{ background: "#111111" }}>Utilities</option>
                <option value="payroll" style={{ background: "#111111" }}>Payroll</option>
              </select>
            </Box>
            <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
              <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                <option value="date" style={{ background: "#111111" }}>Sort: Date</option>
                <option value="amount" style={{ background: "#111111" }}>Sort: Amount</option>
              </select>
            </Box>
            <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
              <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                <option value="desc" style={{ background: "#111111" }}>Newest / Highest</option>
                <option value="asc" style={{ background: "#111111" }}>Oldest / Lowest</option>
              </select>
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* --- Dynamic Financial Summary --- */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
        <Box bg="#0A0A0A" rounded="lg" p={6} border="1px solid #1A1A1A">
          <Flex align="center" gap={3} mb={3}>
            <Flex bg="rgba(66, 153, 225, 0.1)" p={2} rounded="md" border="1px solid rgba(66, 153, 225, 0.2)">
              <Icon as={LuWallet} color="blue.400" boxSize="18px" strokeWidth="2.5" />
            </Flex>
            <Text color="gray.500" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Loaded Outflow</Text>
          </Flex>
          <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalExpenses.toLocaleString()}</Text>
        </Box>

        <Box bg="#0A0A0A" rounded="lg" p={6} border="1px solid #1A1A1A">
          <Flex align="center" gap={3} mb={3}>
            <Flex bg="rgba(92, 172, 125, 0.1)" p={2} rounded="md" border="1px solid rgba(92, 172, 125, 0.2)">
              <Icon as={LuReceipt} color="#5cac7d" boxSize="18px" strokeWidth="2.5" />
            </Flex>
            <Text color="gray.500" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Cleared Expenses</Text>
          </Flex>
          <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{clearedExpenses.toLocaleString()}</Text>
        </Box>

        <Box bg="#0A0A0A" rounded="lg" p={6} border="1px solid #1A1A1A">
          <Flex align="center" gap={3} mb={3}>
            <Flex bg="rgba(237, 137, 54, 0.1)" p={2} rounded="md" border="1px solid rgba(237, 137, 54, 0.2)">
              <Icon as={LuTrendingDown} color="orange.400" boxSize="18px" strokeWidth="2.5" />
            </Flex>
            <Text color="gray.500" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Payments</Text>
          </Flex>
          <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{pendingExpenses.toLocaleString()}</Text>
        </Box>
      </SimpleGrid>

      {/* --- Expenses Table --- */}
      {visibleItems.length === 0 ? (
        <Flex justify="center" align="center" py={20} direction="column" bg="#0A0A0A" border="1px dashed #1A1A1A" rounded="lg">
          <Text color="gray.500" fontSize="lg" fontWeight="bold">No expenses found.</Text>
        </Flex>
      ) : (
        <Box bg="#0A0A0A" rounded="lg" border="1px solid #1A1A1A" mb={4} overflowX="auto" css={{ "&::-webkit-scrollbar": { height: "6px" }, "&::-webkit-scrollbar-thumb": { background: "#1A1A1A", borderRadius: "4px" } }}>
          <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
            <Box as="thead" bg="#111111" borderBottom="1px solid #1A1A1A">
              <Box as="tr">
                {["Details", "Category", "Amount", "Date", "Status", "Actions"].map((head) => (
                  <Box as="th" key={head} py={4} px={6} color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{head}</Box>
                ))}
              </Box>
            </Box>
            <Box as="tbody">
              {visibleItems.map((expense: Expense, idx: number) => {
                const catStyle = getCategoryStyle(expense.category);
                return (
                  <Box as="tr" key={idx} borderBottom="1px solid #1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="sm" fontWeight="bold">{expense.description}</Text>
                      <Text color="gray.500" fontSize="xs" fontWeight="500" fontFamily="monospace" mt={1}>{expense.reference}</Text>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Flex align="center" gap={2}>
                        <Flex align="center" justify="center" bg={catStyle.bg} border={catStyle.border} color={catStyle.color} p={1.5} rounded="md">
                          <Icon as={catStyle.icon} boxSize="14px" strokeWidth="2.5" />
                        </Flex>
                        <Text color="white" fontSize="sm" fontWeight="500">{expense.category}</Text>
                      </Flex>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="md" fontWeight="bold" letterSpacing="tight">₦{expense.amount.toLocaleString()}</Text>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Text color="gray.400" fontSize="sm" fontWeight="500">{expense.date}</Text>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Flex align="center" justify="center" px={2} py={1} rounded="md" bg={expense.status === "Cleared" ? "white" : "transparent"} color={expense.status === "Cleared" ? "black" : "gray.400"} border={expense.status === "Cleared" ? "1px solid white" : "1px dashed #333333"} fontSize="10px" textTransform="uppercase" letterSpacing="wider" fontWeight="bold" display="inline-flex">
                        {expense.status}
                      </Flex>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Flex gap={2}>
                        <Button 
                          onClick={() => setViewingExpense(expense)}
                          size="sm" variant="ghost" rounded="md" color="gray.400" _hover={{ color: "white", bg: "#1A1A1A" }} fontWeight="bold"
                        >
                          View
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}

      {/* Infinite Scroll Trigger */}
      {visibleCount < processedExpensesLength && (
        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
          {/* Using a spinner safely assuming hook manages isLoadingMore */}
          <Spinner color="white" size="md" />
        </Flex>
      )}

      {/* --- Render Modals --- */}
      <RecordExpenseModal isOpen={isRecordModalOpen} onClose={() => setIsRecordModalOpen(false)} />
      <ViewExpenseModal expense={viewingExpense} onClose={() => setViewingExpense(null)} />
    </Box>
  );
};

