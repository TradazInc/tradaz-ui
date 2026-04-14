"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, Button, Spinner } from "@chakra-ui/react";
import { LuSearch, LuFileText, LuDollarSign, LuCircleCheck, LuClock, LuCircleAlert } from "react-icons/lu";

import { useStaffSalaries } from "@/app/hooks/useStaffSalaries";
import { StaffSalary } from "@/app/lib/definitions";

const controlStyles = { bg: "#121214", border: "1px solid", borderColor: "whiteAlpha.200", color: "white", h: "44px", rounded: "lg", px: 3, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.50" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#121214", color: "white", height: "44px", borderRadius: "8px", padding: "0 12px", border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", cursor: "pointer", fontSize: "14px" };

export const StaffSalaryOverview = () => {
    // Call our custom hook
    const {
        searchQuery, statusFilter, sortBy, sortOrder,
        handleSearch, handleStatusFilter, handleSortBy, handleSortOrder,
        visibleItems, processedSalariesLength, totalStaff,
        visibleCount, loaderRef,
        totalPayroll, totalCleared, totalPending
    } = useStaffSalaries();

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
            
            {/* ---  Page Header (Scrolls naturally) --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} wrap="wrap" gap={4} mb={6} pt={2}>
                <Box>
                    <Text color="#5cac7d" fontWeight="bold" fontSize="3xl" mb={1}>
                        Staff Payroll ({totalStaff})
                    </Text>
                    <Text color="gray.400" fontSize="sm">
                        Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedSalariesLength}</Text> • Manage salaries, view payslips, and process payments.
                    </Text>
                </Box>
                <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} border="none" px={6} h="44px">
                    <Icon as={LuDollarSign} mr={2} /> Run Payroll
                </Button>
            </Flex>

            {/* ---  Sticky Toolbar (Docks to the top!) --- */}
            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} mx={-4} px={4} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    {/* Search */}
                    <Flex flex={1} minW="300px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="gray.400" mr={2} />
                        <Input placeholder="Search staff name, role, or bank..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} value={searchQuery} onChange={handleSearch} />
                    </Flex>
                    
                    {/* Functional Dropdowns */}
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={statusFilter} onChange={handleStatusFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#1A1C23" }}>All Statuses</option>
                                <option value="paid" style={{ background: "#1A1C23" }}>Paid</option>
                                <option value="pending" style={{ background: "#1A1C23" }}>Pending</option>
                                <option value="unpaid" style={{ background: "#1A1C23" }}>Unpaid</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="name" style={{ background: "#1A1C23" }}>Sort: Name</option>
                                <option value="role" style={{ background: "#1A1C23" }}>Sort: Role</option>
                                <option value="salary" style={{ background: "#1A1C23" }}>Sort: Salary</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="asc" style={{ background: "#1A1C23" }}>A-Z / Lowest</option>
                                <option value="desc" style={{ background: "#1A1C23" }}>Z-A / Highest</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- Dynamic Payroll Financial Summary --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                <Box bg="#1A1C23" rounded="2xl" p={6} border="1px solid" borderColor="whiteAlpha.100" shadow="sm">
                    <Text color="gray.400" fontSize="sm" fontWeight="medium" mb={2}>Loaded Payroll</Text>
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

            {/* --- 4. Staff Salary Table --- */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column">
                    <Text color="gray.400" fontSize="lg" fontWeight="bold">No staff records found.</Text>
                </Flex>
            ) : (
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
                            
                            {visibleItems.map((staff: StaffSalary, idx: number) => {
                                const statusStyle = getStatusStyle(staff.status);
                                return (
                                    <Box as="tr" key={idx} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{staff.name}</Text>
                                            <Text color="gray.500" fontSize="xs">{staff.id}</Text>
                                        </Box>
                                        <Box as="td" py={4} px={6}>
                                            <Text color="gray.300" fontSize="sm">{staff.role}</Text>
                                        </Box>
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="sm" fontWeight="medium">{staff.bank}</Text>
                                            <Text color="gray.500" fontSize="xs">•••• {staff.accountLast4}</Text>
                                        </Box>
                                        <Box as="td" py={4} px={6}>
                                            <Text color="white" fontSize="md" fontWeight="bold">₦{staff.salary.toLocaleString()}</Text>
                                        </Box>
                                        <Box as="td" py={4} px={6}>
                                            <Flex align="center" gap={2} px={3} py={1.5} rounded="full" bg={statusStyle.bg} color={statusStyle.color} fontSize="xs" fontWeight="bold" display="inline-flex">
                                                <Icon as={statusStyle.icon} boxSize="12px" />
                                                {staff.status}
                                            </Flex>
                                        </Box>
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
                    
                    {/* Infinite Scroll Trigger */}
                    {visibleCount < processedSalariesLength && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            <Spinner color="#5cac7d" size="md" />
                        </Flex>
                    )}
                </Box>
            )}
        </Box>
    );
};