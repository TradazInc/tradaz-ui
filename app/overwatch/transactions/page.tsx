"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, IconButton, SimpleGrid, Avatar, Spinner
} from "@chakra-ui/react";
import { 
    LuSearch, LuDownload, LuArrowUpRight, LuArrowDownLeft, 
    LuRefreshCcw, LuCreditCard, LuEllipsisVertical, LuX, LuStore, LuUser
} from "react-icons/lu";

import { useAdminTransactions, Transaction, TxType } from "@/app/hooks/useAdminTransaction";

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };

export default function AdminTransactionsPage() {
    
    
    const {
        searchQuery, typeFilter, sortBy, sortOrder,
        handleSearch, handleTypeFilter, handleSortBy, handleSortOrder,
        visibleItems, processedCount, totalLimit,
        visibleCount, isLoadingMore, loaderRef,
        kpiStats
    } = useAdminTransactions();

    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    const getTypeUI = (type: TxType) => {
        switch (type) {
            case "order_payment": return { iconColor: "green.400", icon: LuArrowDownLeft, label: "Payment In" };
            case "payout": return { iconColor: "blue.400", icon: LuArrowUpRight, label: "Seller Payout" };
            case "subscription": return { iconColor: "purple.400", icon: LuCreditCard, label: "SaaS Fee" };
            case "refund": return { iconColor: "orange.400", icon: LuRefreshCcw, label: "Refund" };
            default: return { iconColor: "gray.400", icon: LuCreditCard, label: "Unknown" }; 
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease" position="relative" bg="#000000" minH="100vh">
            
            {/* --- COMBINED STICKY HEADER & TOOLBAR --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }}
        mx={{ base: "-16px", md: "-32px" }}
        px={{ base: "16px", md: "32px" }} zIndex={30} 
                bg="#000000" 
                
                pt={{ base: 4, lg: 8 }} pb={6} mb={8} 
                borderBottom="1px solid #1A1A1A"
            >
                {/* Title & Export */}
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={6} gap={4}>
                    <Box>
                        <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Global Ledger ({totalLimit})</Text>
                        <Text color="#888888" fontSize="sm">Track all payments, payouts, fees, and refunds across the platform.</Text>
                    </Box>
                    <Button bg="#111111" border="1px solid #333333" color="white" rounded="none" h="44px" px={6} _hover={{ bg: "#1A1A1A", borderColor: "white" }} display="flex" gap={2}>
                        <Icon as={LuDownload} color="#888888" strokeWidth="2.5" /> Export CSV
                    </Button>
                </Flex>

                {/* Filters & Search */}
                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="300px" align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search by Trx ID, Tenant, or Customer..." border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={handleSearch} 
                        />
                    </Flex>
                    
                    <Flex gap={3} w={{ base: "full", md: "auto" }}>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={typeFilter} onChange={handleTypeFilter} style={nativeSelectStyle}>
                                <option value="all" style={{ background: "#000000" }}>All Types</option>
                                <option value="order_payment" style={{ background: "#000000" }}>Payment In</option>
                                <option value="payout" style={{ background: "#000000" }}>Payouts</option>
                                <option value="subscription" style={{ background: "#000000" }}>Subscriptions</option>
                                <option value="refund" style={{ background: "#000000" }}>Refunds</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                                <option value="date" style={{ background: "#000000" }}>Sort: Date</option>
                                <option value="amount" style={{ background: "#000000" }}>Sort: Gross Amount</option>
                                <option value="fee" style={{ background: "#000000" }}>Sort: Platform Fee</option>
                            </select>
                        </Box>
                        <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
                            <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                                <option value="desc" style={{ background: "#000000" }}>Newest / Highest</option>
                                <option value="asc" style={{ background: "#000000" }}>Oldest / Lowest</option>
                            </select>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* --- DYNAMIC KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                {kpiStats.map((stat: { label: string; value: string; trend: string }, idx: number) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={2}>
                            <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{stat.label}</Text>
                            <Badge bg="#111111" color="white" border="1px solid #333333" rounded="none" px={2} py={0.5} fontSize="10px" fontWeight="bold" textTransform="uppercase">{stat.trend}</Badge>
                        </Flex>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{stat.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- TRANSACTIONS GRID --- */}
            {visibleItems.length === 0 ? (
                <Flex justify="center" align="center" py={20} direction="column" bg="#0A0A0A" border="1px dashed #1A1A1A">
                    <Text color="#888888" fontSize="lg" fontWeight="bold">No transactions found.</Text>
                </Flex>
            ) : (
                <VStack align="stretch" gap={3}>
                    <Grid templateColumns="1.5fr 1.5fr 1fr 1fr 1fr 1fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Transaction & Date</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Tenant (Shop)</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Type</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Gross Amount</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Platform Fee</Text>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="center">Status</Text>
                    </Grid>

                    {visibleItems.map((tx: Transaction) => {
                        const ui = getTypeUI(tx.type);
                        const isCompleted = tx.status === 'completed';
                        const isPending = tx.status === 'pending';

                        return (
                            <Grid 
                                key={tx.id} 
                                templateColumns={{ base: "1fr", md: "1.5fr 1.5fr 1fr", xl: "1.5fr 1.5fr 1fr 1fr 1fr 1fr 50px" }} 
                                gap={4} p={4} bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A"
                                alignItems="center" cursor="pointer" transition="all 0.2s"
                                _hover={{ bg: "#111111", borderColor: "#333333" }}
                                onClick={() => setSelectedTx(tx)}
                            >
                                <Box overflow="hidden">
                                    <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1} letterSpacing="tight">{tx.id}</Text>
                                    <Text color="#888888" fontSize="xs" fontFamily="monospace" mt={0.5}>{tx.date}</Text>
                                </Box>

                                <Flex align="center" gap={3} display={{ base: "none", md: "flex" }}>
                                    <Avatar.Root size="xs" rounded="full"><Avatar.Fallback name={tx.tenant} bg="#111111" border="1px solid #333333" color="white" rounded="none" /></Avatar.Root>
                                    <Text color="white" fontSize="sm" fontWeight="bold" lineClamp={1}>{tx.tenant}</Text>
                                </Flex>

                                <Flex display={{ base: "none", xl: "flex" }}>
                                    <Flex bg="#111111" border="1px solid #333333" px={2.5} py={1} rounded="none" align="center" gap={1.5}>
                                        <Icon as={ui.icon} color={ui.iconColor} strokeWidth="2.5" /> 
                                        <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{ui.label}</Text>
                                    </Flex>
                                </Flex>

                                <Text color="white" fontWeight="black" fontSize="sm" textAlign={{ base: "left", xl: "right" }} letterSpacing="tight">
                                    ₦{tx.amount.toLocaleString()}
                                </Text>

                                <Text color="white" fontWeight="bold" fontSize="sm" display={{ base: "none", xl: "block" }} textAlign="right" letterSpacing="tight">
                                    {tx.platformFee === 0 ? "—" : `₦${Math.abs(tx.platformFee).toLocaleString()}`}
                                </Text>

                                <Flex justify={{ base: "flex-start", xl: "center" }}>
                                    <Flex align="center" gap={2}>
                                        <Box boxSize="6px" rounded="none" bg={isCompleted ? "#5cac7d" : isPending ? "orange.400" : "red.400"} />
                                        <Text color={isCompleted ? "white" : "#888888"} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                            {tx.status}
                                        </Text>
                                    </Flex>
                                </Flex>

                                <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                    <Icon as={LuEllipsisVertical} color="#888888" strokeWidth="2.5" _hover={{ color: "white" }} />
                                </Flex>
                            </Grid>
                        );
                    })}

                    {visibleCount < processedCount && (
                        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
                            {isLoadingMore && <Spinner color="white" size="md" />}
                        </Flex>
                    )}
                </VStack>
            )}

            {/* --- TRANSACTION DETAILS DRAWER --- */}
            <Box position="fixed" inset={0} zIndex={9999} pointerEvents={selectedTx ? "auto" : "none"}>
                <Box position="absolute" inset={0} bg="rgba(0,0,0,0.85)" backdropFilter="blur(4px)" opacity={selectedTx ? 1 : 0} transition="opacity 0.3s ease" onClick={() => setSelectedTx(null)} />
                
                <Flex 
                    position="absolute" top={0} right={0} h="100vh" w={{ base: "full", sm: "450px" }}
                    bg="#000000" borderLeft="1px solid" borderColor="#1A1A1A" direction="column" shadow="2xl"
                    transform={selectedTx ? "translateX(0)" : "translateX(100%)"} transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                    {selectedTx && (
                        <>
                            <Flex align="center" justify="space-between" p={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#0A0A0A">
                                <Text fontSize="lg" fontWeight="bold" color="white" letterSpacing="tight">Transaction Details</Text>
                                <IconButton aria-label="Close" variant="ghost" color="#888888" rounded="none" onClick={() => setSelectedTx(null)} _hover={{ bg: "#111111", color: "white" }}>
                                    <LuX strokeWidth="2.5" />
                                </IconButton>
                            </Flex>

                            <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                
                                {/* Amount & Type Header */}
                                <Flex direction="column" align="center" textAlign="center" mb={8}>
                                    <Flex boxSize="60px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center" mb={4}>
                                        <Icon as={getTypeUI(selectedTx.type).icon} color={getTypeUI(selectedTx.type).iconColor} boxSize="28px" strokeWidth="2.5" />
                                    </Flex>
                                    <Text color="white" fontSize="4xl" fontWeight="black" letterSpacing="tighter" mb={1}>
                                        ₦{selectedTx.amount.toLocaleString()}
                                    </Text>
                                    <Text color="#888888" fontSize="sm" fontFamily="monospace" mb={4}>{selectedTx.id} • {selectedTx.date}</Text>
                                    
                                    <Flex align="center" gap={2} px={3} py={1.5} bg="#111111" border="1px solid #333333" rounded="none">
                                        <Box boxSize="6px" rounded="none" bg={selectedTx.status === 'completed' ? "#5cac7d" : selectedTx.status === 'pending' ? "orange.400" : "red.400"} />
                                        <Text color="white" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                            {selectedTx.status}
                                        </Text>
                                    </Flex>
                                </Flex>

                                {/* Parties Involved */}
                                <Text color="#888888" fontWeight="bold" mb={3} fontSize="10px" textTransform="uppercase" letterSpacing="wider">Entities Involved</Text>
                                <VStack gap={0} align="stretch" mb={8} border="1px solid #1A1A1A">
                                    <Flex align="center" justify="space-between" p={4} bg="#0A0A0A" borderBottom="1px solid #1A1A1A">
                                        <Flex align="center" gap={3}>
                                            <Icon as={LuStore} color="#5cac7d" strokeWidth="2.5" />
                                            <Text color="#888888" fontSize="sm" fontWeight="bold">Tenant Shop</Text>
                                        </Flex>
                                        <Text color="white" fontWeight="bold" fontSize="sm">{selectedTx.tenant}</Text>
                                    </Flex>
                                    <Flex align="center" justify="space-between" p={4} bg="#0A0A0A">
                                        <Flex align="center" gap={3}>
                                            <Icon as={LuUser} color="blue.400" strokeWidth="2.5" />
                                            <Text color="#888888" fontSize="sm" fontWeight="bold">Customer</Text>
                                        </Flex>
                                        <Text color="white" fontWeight="bold" fontSize="sm">{selectedTx.customer}</Text>
                                    </Flex>
                                </VStack>

                                {/* Financial Split Breakdown */}
                                <Text color="#888888" fontWeight="bold" mb={3} fontSize="10px" textTransform="uppercase" letterSpacing="wider">Financial Split</Text>
                                <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" rounded="none" p={5}>
                                    <Flex justify="space-between" align="center" mb={3}>
                                        <Text color="#888888" fontSize="sm" fontWeight="bold">Gross Amount</Text>
                                        <Text color="white" fontWeight="bold">₦{selectedTx.amount.toLocaleString()}</Text>
                                    </Flex>
                                    <Flex justify="space-between" align="center" mb={4} pb={4} borderBottom="1px dashed" borderColor="#333333">
                                        <Text color="#888888" fontSize="sm" fontWeight="bold">Platform Fee (HQ Cut)</Text>
                                        <Text color="white" fontWeight="bold">
                                            {selectedTx.platformFee > 0 ? "-" : ""}₦{Math.abs(selectedTx.platformFee).toLocaleString()}
                                        </Text>
                                    </Flex>
                                    <Flex justify="space-between" align="center">
                                        <Text color="white" fontSize="sm" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Net Settlement</Text>
                                        <Text color="white" fontSize="xl" fontWeight="black" letterSpacing="tight">₦{selectedTx.netAmount.toLocaleString()}</Text>
                                    </Flex>
                                </Box>

                                {/* Payment Metadata */}
                                <Box mt={8}>
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={2}>Payment Method</Text>
                                    <Text color="white" fontSize="sm" fontWeight="bold">{selectedTx.method}</Text>
                                </Box>

                            </Box>

                            {/* Sticky Footer Actions */}
                            {selectedTx.status === 'completed' && selectedTx.type === 'order_payment' && (
                                <Box p={6} borderTop="1px solid" borderColor="#1A1A1A" bg="#0A0A0A">
                                    <Button w="full" h="44px" bg="#111111" border="1px solid #333333" color="red.400" rounded="none" fontWeight="bold" _hover={{ bg: "#1A1A1A", borderColor: "red.400" }}>
                                        Force Reverse / Refund
                                    </Button>
                                </Box>
                            )}
                        </>
                    )}
                </Flex>
            </Box>

        </Box>
    );
}