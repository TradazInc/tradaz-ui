"use client";
import React from "react";
import { Box, Flex, Text, SimpleGrid, Icon, Input, IconButton, Spinner } from "@chakra-ui/react";
import { LuSearch, LuFilter, LuEye, LuMail, LuPencil, LuBan, LuTrash2 } from "react-icons/lu";
import { Customer } from "@/app/lib/definitions";

const controlStyles = { 
    bg: "#0A0A0A", 
    border: "1px solid", 
    borderColor: "#1A1A1A", 
    color: "white", 
    h: "40px", 
    px: 3, 
    rounded: "none", 
    _focus: { outline: "none", borderColor: "white", boxShadow: "0 0 0 1px white" }, 
    _hover: { bg: "#111111" } 
};

const nativeSelectStyle: React.CSSProperties = { 
    width: "100%", 
    backgroundColor: "#0A0A0A", 
    color: "white", 
    height: "40px", 
    borderRadius: "0px", 
    padding: "0 12px", 
    border: "1px solid #1A1A1A", 
    outline: "none", 
    cursor: "pointer", 
    fontSize: "14px" 
};


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
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            <Box mb={6} pt={2}>
                <Text color="white" fontWeight="bold" fontSize="3xl" mb={1}>Customers ({processedCustomersLength})</Text>
                <Text color="gray.500" fontSize="sm">Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedCustomersLength}</Text> • Manage customer accounts, orders, and activity.</Text>
            </Box>

            <Box position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} mx={-4} px={4} borderBottom="1px solid #1A1A1A">
                <Box bg="#0A0A0A" p={4} border="1px solid #1A1A1A" rounded="none" shadow="lg">
                    <Flex align="center" gap={2} mb={4}>
                        <Icon as={LuFilter} color="gray.400" />
                        <Text color="white" fontWeight="bold">Filters & Search</Text>
                    </Flex>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1} fontWeight="bold">Search Customers</Text>
                            <Flex align="center" {...controlStyles} _focusWithin={{ borderColor: "white" }}>
                                <Icon as={LuSearch} color="gray.400" boxSize="14px" />
                                <Input placeholder="Name, email, handle..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" fontSize="sm" value={searchQuery} onChange={handleSearch} rounded="none" />
                            </Flex>
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1} fontWeight="bold">Account Status</Text>
                            <select value={filterCategory} onChange={handleStatusFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#111111" }}>All Statuses</option>
                                <option value="active" style={{ background: "#111111" }}>Active</option>
                                <option value="inactive" style={{ background: "#111111" }}>Inactive</option>
                            </select>
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1} fontWeight="bold">Sort By</Text>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="spend" style={{ background: "#111111" }}>Total Spend</option>
                                <option value="orders" style={{ background: "#111111" }}>Total Orders</option>
                                <option value="name" style={{ background: "#111111" }}>Customer Name</option>
                            </select>
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="xs" mb={1} fontWeight="bold">Sort Order</Text>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#111111" }}>Highest / Z-A First</option>
                                <option value="asc" style={{ background: "#111111" }}>Lowest / A-Z First</option>
                            </select>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Box>

            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #333333" bg="#0A0A0A" rounded="none">
                    <Text color="gray.400" fontSize="lg" fontWeight="bold">No customers found.</Text>
                </Flex>
            ) : (
                <Box bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" mb={8} overflowX="auto" css={{ '&::-webkit-scrollbar': { height: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#1A1A1A', borderRadius: '0px' } }}>
                    <Box as="table" w="full" minW="1000px" textAlign="center" style={{ borderCollapse: "collapse" }}>
                        <Box as="thead" bg="#111111" borderBottom="1px solid #1A1A1A">
                            <Box as="tr">
                                {["Customer", "Contact", "Total Orders", "Total Spend", "Status", "Actions"].map((head) => (
                                    <Box as="th" key={head} py={4} px={5} color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">{head}</Box>
                                ))}
                            </Box>
                        </Box>
                        <Box as="tbody">
                            {visibleItems.map((customer, idx) => (
                                <Box as="tr" key={idx} borderBottom="1px solid #1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                                    <Box as="td" py={4} px={5}>
                                        <Text color="white" fontSize="sm" fontWeight="bold">{customer.name}</Text>
                                        <Text color="gray.500" fontSize="xs">{customer.handle}</Text>
                                    </Box>
                                    <Box as="td" py={4} px={5}>
                                        <Flex align="center" justify="center" gap={2} color="gray.400">
                                            <Icon as={LuMail} boxSize="14px" color="gray.500" />
                                            <Text fontSize="sm" fontFamily="monospace">{customer.email}</Text>
                                        </Flex>
                                    </Box>
                                    <Box as="td" py={4} px={5}><Text color="white" fontSize="sm" fontWeight="bold">{customer.orders}</Text></Box>
                                    <Box as="td" py={4} px={5}><Text color="#5cac7d" fontSize="sm" fontWeight="bold">₦{customer.spend.toLocaleString()}</Text></Box>
                                    <Box as="td" py={4} px={5}>
                                        <Flex 
                                            align="center" justify="center" gap={1.5} px={3} py={1} 
                                            bg={customer.status === "Active" ? "rgba(92, 172, 125, 0.1)" : "#111111"} 
                                            border="1px solid"
                                            borderColor={customer.status === "Active" ? "rgba(92, 172, 125, 0.3)" : "#333333"}
                                            color={customer.status === "Active" ? "#5cac7d" : "gray.400"} 
                                            fontSize="xs" fontWeight="bold" display="inline-flex"
                                            rounded="none"
                                        >
                                            {/* Even the status dot is squared */}
                                            <Box boxSize="6px" rounded="none" bg={customer.status === "Active" ? "#5cac7d" : "gray.500"} />
                                            {customer.status}
                                        </Flex>
                                    </Box>
                                    
                                    
                                    <Box as="td" py={4} px={5}>
                                        <Flex gap={1} justify="center">
                                            <IconButton aria-label="View Profile" onClick={() => onSelectCustomer(customer)} variant="ghost" size="sm" rounded="none" color="gray.400" _hover={{ color: "white", bg: "#1A1A1A" }}><Icon as={LuEye} /></IconButton>
                                            <IconButton aria-label="Edit Customer" onClick={() => onQuickAction("edit", customer)} variant="ghost" size="sm" rounded="none" color="blue.400" _hover={{ bg: "rgba(66, 153, 225, 0.1)" }}><Icon as={LuPencil} /></IconButton>
                                            <IconButton aria-label="Suspend Account" onClick={() => onQuickAction("suspend", customer)} variant="ghost" size="sm" rounded="none" color="orange.400" _hover={{ bg: "rgba(237, 137, 54, 0.1)" }}><Icon as={LuBan} /></IconButton>
                                            <IconButton aria-label="Delete Customer" onClick={() => onQuickAction("delete", customer)} variant="ghost" size="sm" rounded="none" color="red.400" _hover={{ bg: "rgba(245, 101, 101, 0.1)" }}><Icon as={LuTrash2} /></IconButton>
                                        </Flex>
                                    </Box>

                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            )}
            
            {visibleCount < processedCustomersLength && (
                <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                    {isLoadingMore && <Spinner color="#5cac7d" size="md" />}
                </Flex>
            )}
        </Box>
    );
};