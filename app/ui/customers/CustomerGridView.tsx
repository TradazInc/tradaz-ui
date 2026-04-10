"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, IconButton, Spinner } from "@chakra-ui/react";
import { LuSearch, LuFilter, LuEye, LuMail, LuPencil, LuBan, LuTrash2 } from "react-icons/lu";
import { Customer } from "@/app/lib/definitions";

const controlStyles = { bg: "#121214", border: "1px solid", borderColor: "whiteAlpha.200", color: "white", h: "40px", rounded: "lg", px: 3, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.50" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#121214", color: "white", height: "40px", borderRadius: "8px", padding: "0 12px", border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", cursor: "pointer", fontSize: "14px" };


interface CustomerGridViewProps {
    visibleItems: Customer[];
    processedCustomersLength: number;
    searchQuery: string; 
    filterCategory: string; 
    sortBy: string; 
    sortOrder: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    handleStatusFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
    handleSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
    handleSortOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSelectCustomer: (customer: Customer) => void;
    onQuickAction: (action: string, customer: Customer) => void;
    visibleCount: number; 
    isLoadingMore: boolean; 
    loaderRef: React.RefObject<HTMLDivElement | null>;
}

export const CustomerGridView = ({
    visibleItems, processedCustomersLength, searchQuery, filterCategory, sortBy, sortOrder,
    handleSearch, handleStatusFilter, handleSortBy, handleSortOrder,
    onSelectCustomer, onQuickAction, visibleCount, isLoadingMore, loaderRef
}: CustomerGridViewProps) => {
    return (
        <Box w="full" display="flex" flexDirection="column" position="relative">
            <Box mb={6} pt={2}>
                <Text color="white" fontWeight="bold" fontSize="3xl" mb={1}>Customers ({processedCustomersLength})</Text>
                <Text color="gray.400" fontSize="sm">Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedCustomersLength}</Text> • Manage customer accounts, orders, and activity.</Text>
            </Box>

            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} mx={-4} px={4} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Box bg="#1A1C23" p={4} rounded="xl" border="1px solid" borderColor="whiteAlpha.100" shadow="lg">
                    <Flex align="center" gap={2} mb={4}>
                        <Icon as={LuFilter} color="gray.400" />
                        <Text color="white" fontWeight="bold">Filters & Search</Text>
                    </Flex>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1}>Search Customers</Text>
                            <Flex align="center" {...controlStyles} _focusWithin={{ borderColor: "#5cac7d" }}>
                                <Icon as={LuSearch} color="gray.400" boxSize="14px" />
                                <Input placeholder="Name, email, handle..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" fontSize="sm" value={searchQuery} onChange={handleSearch} />
                            </Flex>
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1}>Account Status</Text>
                            <select value={filterCategory} onChange={handleStatusFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#1A1C23" }}>All Statuses</option>
                                <option value="active" style={{ background: "#1A1C23" }}>Active</option>
                                <option value="inactive" style={{ background: "#1A1C23" }}>Inactive</option>
                            </select>
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1}>Sort By</Text>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="spend" style={{ background: "#1A1C23" }}>Total Spend</option>
                                <option value="orders" style={{ background: "#1A1C23" }}>Total Orders</option>
                                <option value="name" style={{ background: "#1A1C23" }}>Customer Name</option>
                            </select>
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1}>Sort Order</Text>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#1A1C23" }}>Highest / Z-A First</option>
                                <option value="asc" style={{ background: "#1A1C23" }}>Lowest / A-Z First</option>
                            </select>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>

            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column">
                    <Text color="gray.400" fontSize="lg" fontWeight="bold">No customers found.</Text>
                </Flex>
            ) : (
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
                            {visibleItems.map((customer, idx) => (
                                <Box as="tr" key={idx} borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: "whiteAlpha.50" }} transition="background 0.2s">
                                    <Box as="td" py={4} px={5}>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{customer.name}</Text>
                                        <Text color="gray.500" fontSize="xs">{customer.handle}</Text>
                                    </Box>
                                    <Box as="td" py={4} px={5}>
                                        <Flex align="center" justify="center" gap={2} color="gray.300">
                                            <Icon as={LuMail} boxSize="14px" color="gray.500" />
                                            <Text fontSize="sm">{customer.email}</Text>
                                        </Flex>
                                    </Box>
                                    <Box as="td" py={4} px={5}><Text color="white" fontSize="sm" fontWeight="medium">{customer.orders}</Text></Box>
                                    <Box as="td" py={4} px={5}><Text color="#5cac7d" fontSize="sm" fontWeight="bold">₦{customer.spend.toLocaleString()}</Text></Box>
                                    <Box as="td" py={4} px={5}>
                                        <Flex align="center" justify="center" gap={1.5} px={3} py={1} rounded="full" bg={customer.status === "Active" ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.100"} color={customer.status === "Active" ? "#5cac7d" : "gray.400"} fontSize="xs" fontWeight="bold" display="inline-flex">
                                            <Box boxSize="6px" rounded="full" bg={customer.status === "Active" ? "#5cac7d" : "gray.400"} />
                                            {customer.status}
                                        </Flex>
                                    </Box>
                                    
                                    
                                    <Box as="td" py={4} px={5}>
                                        <Flex gap={1} justify="center">
                                            <IconButton aria-label="View Profile" onClick={() => onSelectCustomer(customer)} variant="ghost" size="sm" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }}><Icon as={LuEye} /></IconButton>
                                            <IconButton aria-label="Edit Customer" onClick={() => onQuickAction("edit", customer)} variant="ghost" size="sm" color="blue.400" _hover={{ color: "white", bg: "rgba(66, 153, 225, 0.15)" }}><Icon as={LuPencil} /></IconButton>
                                            <IconButton aria-label="Suspend Account" onClick={() => onQuickAction("suspend", customer)} variant="ghost" size="sm" color="orange.400" _hover={{ color: "white", bg: "rgba(237, 137, 54, 0.15)" }}><Icon as={LuBan} /></IconButton>
                                            <IconButton aria-label="Delete Customer" onClick={() => onQuickAction("delete", customer)} variant="ghost" size="sm" color="red.400" _hover={{ color: "white", bg: "rgba(245, 101, 101, 0.15)" }}><Icon as={LuTrash2} /></IconButton>
                                        </Flex>
                                    </Box>

                                </Box>
                            ))}
                        </Box>
                    </Box>
                    
                    {visibleCount < processedCustomersLength && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            {isLoadingMore && <Spinner color="#5cac7d" size="md" />}
                        </Flex>
                    )}
                </Box>
            )}
        </Box>
    );
};