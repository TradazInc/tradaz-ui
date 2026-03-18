"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, Badge, VStack, IconButton, SimpleGrid, Avatar
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuDownload, LuArrowUpRight, LuArrowDownLeft, 
    LuRefreshCcw, LuCreditCard, LuEllipsisVertical, LuX, LuStore, LuUser
} from "react-icons/lu";

// --- MOCK TRANSACTION DATA ---
type TxType = 'order_payment' | 'payout' | 'subscription' | 'refund';
type TxStatus = 'completed' | 'pending' | 'failed';

interface Transaction {
    id: string;
    date: string;
    type: TxType;
    amount: number;
    platformFee: number;
    netAmount: number;
    tenant: string;
    customer: string;
    method: string;
    status: TxStatus;
}

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: "TRX-90214", date: "Today, 14:30", type: "order_payment", amount: 150000, platformFee: 3750, netAmount: 146250, tenant: "Urban Kicks NG", customer: "Michael T.", method: "Card ending ****4242", status: "completed" },
    { id: "TRX-90213", date: "Today, 10:15", type: "payout", amount: 500000, platformFee: 0, netAmount: 500000, tenant: "Minimalist Hub", customer: "N/A", method: "Bank Transfer", status: "pending" },
    { id: "TRX-90212", date: "Yesterday, 09:00", type: "subscription", amount: 25000, platformFee: 25000, netAmount: 0, tenant: "Tech Gadgets Pro", customer: "John Doe", method: "Wallet Balance", status: "completed" },
    { id: "TRX-90211", date: "Oct 22, 18:45", type: "refund", amount: 45000, platformFee: -1125, netAmount: -43875, tenant: "Lagos Streetwear Co.", customer: "Sarah K.", method: "Original Payment Method", status: "failed" },
];

const KPI_STATS = [
    { label: "Total Volume (30d)", value: "₦142,500,000", trend: "+8.2%" },
    { label: "Platform Fees Collected", value: "₦3,562,500", trend: "+12.1%" },
    { label: "Pending Payouts", value: "₦8,240,000", trend: "14 shops" },
];

export default function AdminTransactionsPage() {
    const brandColor = "#5cac7d";
    
    const [searchQuery, setSearchQuery] = useState("");
    const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
    const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

    const getTypeUI = (type: TxType) => {
        switch (type) {
            case "order_payment": return { color: "green.400", bg: "rgba(72, 187, 120, 0.15)", icon: LuArrowDownLeft, label: "Payment In" };
            case "payout": return { color: "blue.400", bg: "rgba(66, 153, 225, 0.15)", icon: LuArrowUpRight, label: "Seller Payout" };
            case "subscription": return { color: "purple.400", bg: "rgba(159, 122, 234, 0.15)", icon: LuCreditCard, label: "SaaS Fee" };
            case "refund": return { color: "orange.400", bg: "rgba(237, 137, 54, 0.15)", icon: LuRefreshCcw, label: "Refund" };
        }
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1300px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} mb={8} gap={4}>
                <Box>
                    <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">Global Ledger</Text>
                    <Text color="gray.400" fontSize="sm">Track all payments, payouts, fees, and refunds across the platform.</Text>
                </Box>
                <Button bg="whiteAlpha.100" color="white" rounded="lg" h="45px" px={6} _hover={{ bg: "whiteAlpha.200" }} display="flex" gap={2}>
                    <Icon as={LuDownload} /> Export CSV
                </Button>
            </Flex>

            {/* --- KPI CARDS --- */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
                {KPI_STATS.map((stat, idx) => (
                    <Box key={idx} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                        <Flex justify="space-between" align="start" mb={2}>
                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">{stat.label}</Text>
                            <Badge bg="rgba(92, 172, 125, 0.1)" color={brandColor} rounded="full" px={2} py={0.5}>{stat.trend}</Badge>
                        </Flex>
                        <Text color="white" fontSize="2xl" fontWeight="black" letterSpacing="tight">{stat.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- FILTERS --- */}
            <Flex gap={4} mb={6}>
                <Flex flex={1} align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" px={4} _focusWithin={{ borderColor: brandColor }}>
                    <Icon as={LuSearch} color="gray.500" />
                    <Input 
                        placeholder="Search by Trx ID, Tenant, or Customer..." border="none" color="white" h="50px" 
                        _focus={{ boxShadow: "none", outline: "none" }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Flex>
                <Button h="50px" px={6} bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" color="white" rounded="xl" _hover={{ bg: "whiteAlpha.50" }} display="flex" gap={2}>
                    <Icon as={LuFilter} /> <Text display={{ base: "none", sm: "block" }}>Filter Type</Text>
                </Button>
            </Flex>

            {/* --- TRANSACTIONS GRID --- */}
            <VStack align="stretch" gap={3}>
                <Grid templateColumns="1.5fr 1.5fr 1fr 1fr 1fr 1fr 50px" gap={4} px={6} py={2} display={{ base: "none", xl: "grid" }}>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Transaction & Date</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Tenant (Shop)</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Type</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Gross Amount</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="right">Platform Fee</Text>
                    <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" textAlign="center">Status</Text>
                </Grid>

                {transactions.map((tx) => {
                    const ui = getTypeUI(tx.type);
                    return (
                        <Grid 
                            key={tx.id} 
                            templateColumns={{ base: "1fr", md: "1.5fr 1.5fr 1fr", xl: "1.5fr 1.5fr 1fr 1fr 1fr 1fr 50px" }} 
                            gap={4} p={4} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.50"
                            alignItems="center" cursor="pointer" transition="all 0.2s"
                            _hover={{ borderColor: brandColor, transform: "translateY(-2px)", shadow: "lg" }}
                            onClick={() => setSelectedTx(tx)}
                        >
                            {/* Trx ID & Date */}
                            <Box overflow="hidden">
                                <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{tx.id}</Text>
                                <Text color="gray.500" fontSize="xs">{tx.date}</Text>
                            </Box>

                            {/* Tenant */}
                            <Flex align="center" gap={2} display={{ base: "none", md: "flex" }}>
                                <Avatar.Root size="xs"><Avatar.Fallback name={tx.tenant} bg="whiteAlpha.200" color="white" /></Avatar.Root>
                                <Text color="gray.300" fontSize="sm" fontWeight="medium" lineClamp={1}>{tx.tenant}</Text>
                            </Flex>

                            {/* Type Badge */}
                            <Flex display={{ base: "none", xl: "flex" }}>
                                <Badge bg={ui.bg} color={ui.color} px={2.5} py={1} rounded="md" display="flex" alignItems="center" gap={1.5}>
                                    <Icon as={ui.icon} /> {ui.label}
                                </Badge>
                            </Flex>

                            {/* Gross Amount */}
                            <Text color="white" fontWeight="black" fontSize="sm" textAlign={{ base: "left", xl: "right" }}>
                                ₦{tx.amount.toLocaleString()}
                            </Text>

                            {/* Platform Fee */}
                            <Text color={brandColor} fontWeight="bold" fontSize="sm" display={{ base: "none", xl: "block" }} textAlign="right">
                                {tx.platformFee === 0 ? "—" : `₦${tx.platformFee.toLocaleString()}`}
                            </Text>

                            {/* Status */}
                            <Flex justify={{ base: "flex-start", xl: "center" }}>
                                <Badge 
                                    bg={tx.status === 'completed' ? "rgba(92, 172, 125, 0.15)" : tx.status === 'pending' ? "rgba(236, 201, 75, 0.15)" : "rgba(229, 62, 62, 0.15)"} 
                                    color={tx.status === 'completed' ? brandColor : tx.status === 'pending' ? "yellow.400" : "red.400"} 
                                    px={2.5} py={1} rounded="md" textTransform="uppercase"
                                >
                                    {tx.status}
                                </Badge>
                            </Flex>

                            <Flex justify="flex-end" display={{ base: "none", xl: "flex" }}>
                                <Icon as={LuEllipsisVertical} color="gray.500" />
                            </Flex>
                        </Grid>
                    );
                })}
            </VStack>

            {/* --- TRANSACTION DETAILS DRAWER --- */}
            <Box position="fixed" inset={0} zIndex={9999} pointerEvents={selectedTx ? "auto" : "none"}>
                <Box position="absolute" inset={0} bg="blackAlpha.700" backdropFilter="blur(4px)" opacity={selectedTx ? 1 : 0} transition="opacity 0.3s ease" onClick={() => setSelectedTx(null)} />
                
                <Flex 
                    position="absolute" top={0} right={0} h="100vh" w={{ base: "full", sm: "450px" }}
                    bg="#121212" borderLeft="1px solid" borderColor="whiteAlpha.100" direction="column" shadow="2xl"
                    transform={selectedTx ? "translateX(0)" : "translateX(100%)"} transition="transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                    {selectedTx && (
                        <>
                            <Flex align="center" justify="space-between" p={6} borderBottom="1px solid" borderColor="whiteAlpha.100" bg="#1A1C23">
                                <Text fontSize="lg" fontWeight="bold" color="white">Transaction Details</Text>
                                <IconButton aria-label="Close" variant="ghost" color="gray.400" rounded="full" onClick={() => setSelectedTx(null)}>
                                    <LuX />
                                </IconButton>
                            </Flex>

                            <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                
                                {/* Amount & Type Header */}
                                <Flex direction="column" align="center" textAlign="center" mb={8}>
                                    <Flex boxSize="60px" bg={getTypeUI(selectedTx.type).bg} color={getTypeUI(selectedTx.type).color} rounded="full" align="center" justify="center" mb={4}>
                                        <Icon as={getTypeUI(selectedTx.type).icon} boxSize="28px" />
                                    </Flex>
                                    <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">
                                        ₦{selectedTx.amount.toLocaleString()}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm" mb={3}>{selectedTx.id} • {selectedTx.date}</Text>
                                    <Badge 
                                        bg={selectedTx.status === 'completed' ? "rgba(92, 172, 125, 0.15)" : selectedTx.status === 'pending' ? "rgba(236, 201, 75, 0.15)" : "rgba(229, 62, 62, 0.15)"} 
                                        color={selectedTx.status === 'completed' ? brandColor : selectedTx.status === 'pending' ? "yellow.400" : "red.400"} 
                                        px={3} py={1} rounded="md" textTransform="uppercase"
                                    >
                                        {selectedTx.status}
                                    </Badge>
                                </Flex>

                                {/* Parties Involved */}
                                <Text color="white" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Entities Involved</Text>
                                <VStack gap={3} align="stretch" mb={8}>
                                    <Flex align="center" justify="space-between" p={4} bg="#1A1C23" rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                                        <Flex align="center" gap={3}>
                                            <Icon as={LuStore} color="gray.500" />
                                            <Text color="gray.400" fontSize="sm">Tenant Shop</Text>
                                        </Flex>
                                        <Text color="white" fontWeight="bold" fontSize="sm">{selectedTx.tenant}</Text>
                                    </Flex>
                                    <Flex align="center" justify="space-between" p={4} bg="#1A1C23" rounded="xl" border="1px solid" borderColor="whiteAlpha.100">
                                        <Flex align="center" gap={3}>
                                            <Icon as={LuUser} color="gray.500" />
                                            <Text color="gray.400" fontSize="sm">Customer</Text>
                                        </Flex>
                                        <Text color="white" fontWeight="bold" fontSize="sm">{selectedTx.customer}</Text>
                                    </Flex>
                                </VStack>

                                {/* Financial Split Breakdown */}
                                <Text color="white" fontWeight="bold" mb={4} fontSize="sm" textTransform="uppercase" letterSpacing="wider">Financial Split</Text>
                                <Box bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.100" rounded="xl" p={5}>
                                    <Flex justify="space-between" align="center" mb={3}>
                                        <Text color="gray.400" fontSize="sm">Gross Amount</Text>
                                        <Text color="white" fontWeight="bold">₦{selectedTx.amount.toLocaleString()}</Text>
                                    </Flex>
                                    <Flex justify="space-between" align="center" mb={4} pb={4} borderBottom="1px dashed" borderColor="whiteAlpha.200">
                                        <Text color="gray.400" fontSize="sm">Platform Fee (HQ Cut)</Text>
                                        <Text color={selectedTx.platformFee > 0 ? brandColor : "gray.400"} fontWeight="bold">
                                            {selectedTx.platformFee > 0 ? "-" : ""}₦{Math.abs(selectedTx.platformFee).toLocaleString()}
                                        </Text>
                                    </Flex>
                                    <Flex justify="space-between" align="center">
                                        <Text color="white" fontSize="sm" fontWeight="bold">Net Settlement (To Shop)</Text>
                                        <Text color="white" fontSize="lg" fontWeight="black">₦{selectedTx.netAmount.toLocaleString()}</Text>
                                    </Flex>
                                </Box>

                                {/* Payment Metadata */}
                                <Box mt={8}>
                                    <Text color="gray.500" fontSize="xs" mb={1}>Payment Method</Text>
                                    <Text color="white" fontSize="sm" fontWeight="medium">{selectedTx.method}</Text>
                                </Box>

                            </Box>

                            {/* Sticky Footer Actions */}
                            {selectedTx.status === 'completed' && selectedTx.type === 'order_payment' && (
                                <Box p={4} borderTop="1px solid" borderColor="whiteAlpha.100" bg="#1A1C23">
                                    <Button w="full" h="50px" variant="outline" borderColor="red.900" color="red.400" _hover={{ bg: "red.900", color: "white" }}>
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