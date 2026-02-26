"use client";
import React, { useState } from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button } from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuChevronDown, LuFileText, 
    LuDollarSign, LuCircleCheck, LuClock, LuCircleAlert, LuLoaderCircle 
} from "react-icons/lu";


import { generateDummyStaffSalaries } from "@/app/lib/data";
import { StaffSalary } from "@/app/lib/definitions";

export const StaffSalaryOverview = () => {
    // --- PAGINATION STATE ---
    const TOTAL_STAFF = 45;
    const ITEMS_PER_PAGE = 6;
    
    const [salaries, setSalaries] = useState<StaffSalary[]>(generateDummyStaffSalaries(ITEMS_PER_PAGE, 0));
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // --- LOAD MORE HANDLER ---
    const handleLoadMore = () => {
        if (salaries.length >= TOTAL_STAFF) return;
        setIsLoadingMore(true);
        setTimeout(() => {
            setSalaries((prev) => [...prev, ...generateDummyStaffSalaries(ITEMS_PER_PAGE, prev.length)]);
            setIsLoadingMore(false);
        }, 800);
    };

    // Calculate Summary Metrics (Updates dynamically as you load more)
    const totalPayroll = salaries.reduce((acc, curr) => acc + curr.salary, 0);
    const totalCleared = salaries.filter(s => s.status === "Paid").reduce((acc, curr) => acc + curr.salary, 0);
    const totalPending = totalPayroll - totalCleared;

    // Dynamic Badge Styling
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Paid": return { bg: "rgba(92, 172, 125, 0.15)", color: "#5cac7d", icon: LuCircleCheck };
            case "Pending": return { bg: "rgba(237, 137, 54, 0.15)", color: "orange.400", icon: LuClock };
            case "Unpaid": return { bg: "rgba(245, 101, 101, 0.15)", color: "red.400", icon: LuCircleAlert };
            default: return { bg: "whiteAlpha.200", color: "gray.300", icon: LuClock };
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
                {/* Header Text & Main Action */}
                <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} wrap="wrap" gap={4} mb={6}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1}>
                            Staff Payroll ({TOTAL_STAFF})
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                            Showing <Text as="span" color="white" fontWeight="bold">{salaries.length}</Text> of <Text as="span" color="white" fontWeight="bold">{TOTAL_STAFF}</Text> • Manage salaries, view payslips, and process payments.
                        </Text>
                    </Box>
                    <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} border="none" px={6} h="44px">
                        <Icon as={LuDollarSign} mr={2} /> Run Payroll
                    </Button>
                </Flex>

                {/* Filter Toolbar */}
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="300px" align="center" bg="#121214" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} _focusWithin={{ borderColor: "#5cac7d" }}>
                        <Icon as={LuSearch} color="gray.400" />
                        <Input placeholder="Search staff name or role..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="44px" />
                    </Flex>
                    
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <Button flex={{ base: 1, md: "none" }} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="44px" bg="#121214">
                            <Icon as={LuFilter} mr={2} /> Status
                        </Button>
                        <Button flex={{ base: 1, md: "none" }} variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "whiteAlpha.50" }} h="44px" bg="#121214">
                            Sort by <Icon as={LuChevronDown} ml={2} />
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            {/* --- Payroll Financial Summary --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="whiteAlpha.100" shadow="sm">
                    <Text color="gray.400" fontSize="sm" fontWeight="medium" mb={2}>Loaded Monthly Payroll</Text>
                    <Text color="white" fontSize="3xl" fontWeight="black">₦{totalPayroll.toLocaleString()}</Text>
                </Box>
                <Box bg="rgba(92, 172, 125, 0.05)" rounded="2xl" p={6} border="1px solid" borderColor="rgba(92, 172, 125, 0.3)">
                    <Text color="#5cac7d" fontSize="sm" fontWeight="bold" mb={2}>Cleared (Paid)</Text>
                    <Text color="#5cac7d" fontSize="3xl" fontWeight="black">₦{totalCleared.toLocaleString()}</Text>
                </Box>
                <Box bg="rgba(237, 137, 54, 0.05)" rounded="2xl" p={6} border="1px solid" borderColor="rgba(237, 137, 54, 0.3)">
                    <Text color="orange.400" fontSize="sm" fontWeight="bold" mb={2}>Outstanding (Pending/Unpaid)</Text>
                    <Text color="orange.400" fontSize="3xl" fontWeight="black">₦{totalPending.toLocaleString()}</Text>
                </Box>
            </SimpleGrid>

            {/* --- Staff Salary Table --- */}
            <Box bg="whiteAlpha.50" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
                    <Box as="thead" bg="#1A1C23" borderBottom="1px solid" borderColor="whiteAlpha.100">
                        <Box as="tr">
                            {["Staff Member", "Role", "Bank Details", "Base Salary", "Status", "Actions"].map((head) => (
                                <Box as="th" key={head} py={4} px={6} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                            ))}
                        </Box>
                    </Box>
                    <Box as="tbody">
                        {salaries.map((staff, idx) => {
                            const statusStyle = getStatusStyle(staff.status);
                            return (
                                <Box as="tr" key={idx} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                    
                                    {/* Staff Name & ID */}
                                    <Box as="td" py={4} px={6}>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{staff.name}</Text>
                                        <Text color="gray.500" fontSize="xs">{staff.id}</Text>
                                    </Box>

                                    {/* Role */}
                                    <Box as="td" py={4} px={6}>
                                        <Text color="gray.300" fontSize="sm">{staff.role}</Text>
                                    </Box>
                                    
                                    {/* Bank Details */}
                                    <Box as="td" py={4} px={6}>
                                        <Text color="white" fontSize="sm" fontWeight="medium">{staff.bank}</Text>
                                        <Text color="gray.500" fontSize="xs">•••• {staff.accountLast4}</Text>
                                    </Box>

                                    {/* Salary */}
                                    <Box as="td" py={4} px={6}>
                                        <Text color="white" fontSize="md" fontWeight="bold">₦{staff.salary.toLocaleString()}</Text>
                                    </Box>

                                    {/* Payment Status Badge */}
                                    <Box as="td" py={4} px={6}>
                                        <Flex align="center" gap={2} px={3} py={1.5} rounded="full" bg={statusStyle.bg} color={statusStyle.color} fontSize="xs" fontWeight="bold" display="inline-flex">
                                            <Icon as={statusStyle.icon} boxSize="12px" />
                                            {staff.status}
                                        </Flex>
                                    </Box>
                                    
                                    {/* Actions */}
                                    <Box as="td" py={4} px={6}>
                                        <Flex gap={2}>
                                            <Button size="sm" variant="ghost" color="blue.400" _hover={{ bg: "rgba(66, 153, 225, 0.15)" }}>
                                                <Icon as={LuFileText} mr={1.5} /> Payslip
                                            </Button>
                                            {staff.status !== "Paid" && (
                                                <Button size="sm" variant="outline" borderColor="whiteAlpha.200" color="white" _hover={{ bg: "#5cac7d", borderColor: "#5cac7d" }}>
                                                    Pay Now
                                                </Button>
                                            )}
                                        </Flex>
                                    </Box>

                                </Box>
                            );
                        })}
                    </Box>
                </Box>
                
                {/* --- Load More Trigger --- */}
                {salaries.length < TOTAL_STAFF && (
                    <Flex justify="center" py={6}>
                        <Button onClick={handleLoadMore} disabled={isLoadingMore} variant="ghost" color="gray.400" _hover={{ color: "white" }} fontSize="sm">
                            {isLoadingMore ? <Icon as={LuLoaderCircle} animation="spin 1s linear infinite" /> : "Load More Staff"}
                        </Button>
                    </Flex>
                )}
            </Box>

        </Box>
    );
};