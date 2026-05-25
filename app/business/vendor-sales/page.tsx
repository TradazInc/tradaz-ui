
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
  IconButton,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuSearch,
  LuRefreshCw,
  LuDownload,
  LuStore,
  LuCheck,
  LuClock,
  LuUndo,
  LuEye,
  LuTrendingUp,
  LuWallet,
  LuReceipt,
  LuX,
  LuUser,
} from "react-icons/lu";

const controlStyles = {
  bg: "#0A0A0A",
  border: "1px solid",
  borderColor: "#333333",
  color: "white",
  h: "44px",
  rounded: "none",
  px: 3,
  _focus: { outline: "none", borderColor: "white" },
  _hover: { bg: "#111111" },
};

const nativeSelectStyle: React.CSSProperties = {
  backgroundColor: "#0A0A0A",
  color: "white",
  height: "44px",
  borderRadius: "0px",
  padding: "0 12px",
  border: "1px solid #333333",
  outline: "none",
  cursor: "pointer",
  fontSize: "14px",
};

export interface VendorSale {
  id: string;
  vendorName: string;
  customerName: string;
  date: string;
  totalAmount: number;
  commission: number;
  status: "Completed" | "Pending" | "Refunded";
}

// Simulated Database
const INITIAL_VENDOR_SALES: VendorSale[] = [
  {
    id: "ORD-99281",
    vendorName: "OG dior",
    customerName: "Walk-in Customer",
    date: "Apr 28, 2026 - 10:23 AM",
    totalAmount: 45000,
    commission: 2250,
    status: "Completed",
  },
  {
    id: "ORD-99282",
    vendorName: "OG Dior",
    customerName: "Sarah Jenkins",
    date: "Apr 28, 2026 - 11:05 AM",
    totalAmount: 120000,
    commission: 6000,
    status: "Completed",
  },
  {
    id: "ORD-99283",
    vendorName: "ahL Leather",
    customerName: "Michael B.",
    date: "Apr 27, 2026 - 02:15 PM",
    totalAmount: 32000,
    commission: 1600,
    status: "Pending",
  },
  {
    id: "ORD-99284",
    vendorName: "OG Kicks",
    customerName: "Anonymous",
    date: "Apr 26, 2026 - 09:45 AM",
    totalAmount: 15000,
    commission: 750,
    status: "Refunded",
  },
  {
    id: "ORD-99285",
    vendorName: "OG Threads",
    customerName: "David O.",
    date: "Apr 25, 2026 - 04:30 PM",
    totalAmount: 25000,
    commission: 1250,
    status: "Completed",
  },
];

// --- RECEIPT MODAL COMPONENT ---
const ReceiptModal = ({ sale, onClose }: { sale: VendorSale | null; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {sale && (
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
                    <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Transaction Receipt</Text>
                    <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{sale.id}</Text>
                  </Box>
                  <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                    <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                  </IconButton>
                </Flex>

                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                  <VStack w="full" gap={6} align="stretch">
                    
                    {/* Status & Date */}
                    <Flex justify="space-between" align="center" bg="#111111" p={4} border="1px solid #1A1A1A">
                      <Box>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Date & Time</Text>
                        <Text color="white" fontSize="sm">{sale.date}</Text>
                      </Box>
                      <Badge 
                        colorScheme={sale.status === "Completed" ? "green" : sale.status === "Refunded" ? "red" : "orange"} 
                        px={3} py={1} rounded="none" textTransform="uppercase" fontWeight="bold" letterSpacing="wider"
                      >
                        {sale.status}
                      </Badge>
                    </Flex>

                    {/* Parties Involved */}
                    <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                      <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={4}>Parties</Text>
                      <Flex align="center" gap={3} mb={4}>
                        <Icon as={LuStore} color="#888888" boxSize="18px" />
                        <Box>
                          <Text color="#888888" fontSize="xs">Vendor</Text>
                          <Text color="white" fontWeight="bold">{sale.vendorName}</Text>
                        </Box>
                      </Flex>
                      <Flex align="center" gap={3}>
                        <Icon as={LuUser} color="#888888" boxSize="18px" />
                        <Box>
                          <Text color="#888888" fontSize="xs">Customer</Text>
                          <Text color="white" fontWeight="bold">{sale.customerName}</Text>
                        </Box>
                      </Flex>
                    </Box>

                    {/* Financial Breakdown */}
                    <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                      <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={4}>Financial Breakdown</Text>
                      <Flex justify="space-between" mb={2}>
                        <Text color="#888888" fontSize="sm">Gross Amount</Text>
                        <Text color="white" fontSize="sm" fontFamily="monospace">₦{sale.totalAmount.toLocaleString()}</Text>
                      </Flex>
                      <Flex justify="space-between" mb={4}>
                        <Text color="#5cac7d" fontSize="sm">Platform Commission (5%)</Text>
                        <Text color="#5cac7d" fontSize="sm" fontFamily="monospace">-₦{sale.commission.toLocaleString()}</Text>
                      </Flex>
                      <Box borderTop="1px dashed #333333" pt={4}>
                        <Flex justify="space-between" align="center">
                          <Text color="white" fontWeight="bold">Net to Vendor</Text>
                          <Text color="white" fontSize="xl" fontWeight="black" fontFamily="monospace">₦{(sale.totalAmount - sale.commission).toLocaleString()}</Text>
                        </Flex>
                      </Box>
                    </Box>

                  </VStack>
                </Box>

                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" bg="#111111">
                  <Button w="full" bg="white" color="black" rounded="none" fontWeight="bold" onClick={onClose} _hover={{ bg: "#E5E5E5" }}>
                    Close Receipt
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

export default function VendorSalesOverview() {
  const [sales] = useState<VendorSale[]>(INITIAL_VENDOR_SALES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // States for interactive buttons
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState<VendorSale | null>(null);

  // Filter Logic
  const visibleItems = sales.filter((sale) => {
    const matchesSearch =
      sale.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Action: Refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSearchQuery("");
      setStatusFilter("All");
      setIsRefreshing(false);
    }, 600);
  };

  // Action: Export CSV
  const handleExport = () => {
    // Generate CSV Content
    const headers = ["Order ID", "Vendor", "Customer", "Date", "Total Amount (NGN)", "Commission (NGN)", "Status"];
    const csvRows = visibleItems.map(s => 
      [s.id, `"${s.vendorName}"`, `"${s.customerName}"`, `"${s.date}"`, s.totalAmount, s.commission, s.status].join(",")
    );
    const csvString = [headers.join(","), ...csvRows].join("\n");
    
    // Create Blob and trigger download
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'vendor_sales_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusIconProps = (status: string) => {
    switch (status) {
      case "Completed": return { icon: LuCheck, color: "#5cac7d" };
      case "Pending": return { icon: LuClock, color: "orange.400" };
      case "Refunded": return { icon: LuUndo, color: "red.400" };
      default: return { icon: LuReceipt, color: "#888888" };
    }
  };

  return (
    <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000" minH="100vh">
      
      {/* Header */}
      <Flex justify="space-between" align="flex-start" mb={6} wrap="wrap" gap={4} pt={2}>
        <Box>
          <Flex align="center" gap={3} mb={1}>
            <Text color="white" fontWeight="bold" fontSize="2xl" letterSpacing="tight">
              Vendor Sales Record
            </Text>
           <Button
              onClick={handleRefresh}
              loading={isRefreshing}         
              loadingText="Refreshing..."
              size="sm"
              variant="ghost"
              color="#888888"
              border="1px solid #1A1A1A"
              rounded="none"
              _hover={{ color: "white", bg: "#111111" }}
            >
              <Icon as={LuRefreshCw} mr={2} strokeWidth="2.5" /> Refresh
            </Button>
          </Flex>
          <Text color="#888888" fontSize="sm">
            Track multi-vendor transaction volumes and calculate your platform commissions.
          </Text>
        </Box>

        {/* Export Action */}
        <Button
          onClick={handleExport}
          bg="white"
          color="black"
          h="44px"
          rounded="none"
          fontWeight="bold"
          _hover={{ bg: "#E5E5E5" }}
          border="none"
          px={6}
        >
          <Icon as={LuDownload} mr={2} strokeWidth="2.5" /> Export Report
        </Button>
      </Flex>

      {/* KPI Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} mb={8}>
        <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
          <Flex justify="space-between" align="flex-start" mb={2}>
            <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Gross Vendor Volume</Text>
            <Icon as={LuTrendingUp} color="blue.400" boxSize="18px" strokeWidth="2.5" />
          </Flex>
          <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">₦237,000</Text>
        </Box>
        <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
          <Flex justify="space-between" align="flex-start" mb={2}>
            <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Platform Commission</Text>
            <Icon as={LuWallet} color="#5cac7d" boxSize="18px" strokeWidth="2.5" />
          </Flex>
          <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">₦11,850</Text>
        </Box>
        <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
          <Flex justify="space-between" align="flex-start" mb={2}>
            <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Total Orders</Text>
            <Icon as={LuReceipt} color="gray.400" boxSize="18px" strokeWidth="2.5" />
          </Flex>
          <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">5</Text>
        </Box>
        <Box bg="#0A0A0A" border="1px solid" borderColor="#1A1A1A" p={5} rounded="none">
          <Flex justify="space-between" align="flex-start" mb={2}>
            <Text fontSize="xs" color="#888888" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Pending Settlements</Text>
            <Icon as={LuClock} color="orange.400" boxSize="18px" strokeWidth="2.5" />
          </Flex>
          <Text fontSize="3xl" fontWeight="black" color="white" letterSpacing="tight">₦32,000</Text>
        </Box>
      </SimpleGrid>

      {/* Sticky Toolbar */}
      <Box
        position="sticky"
        top={{ base: "-16px", md: "-32px" }}
        mx={{ base: "-16px", md: "-32px" }}
        px={{ base: "16px", md: "32px" }}
        zIndex={20}
        bg="rgba(0, 0, 0, 0.85)"
        backdropFilter="blur(12px)"
        py={3}
        mb={6}
        borderBottom="1px solid"
        borderColor="#1A1A1A"
        w="full"
      >
        <Flex gap={3} wrap="wrap">
          <Flex flex={1} minW="250px" align="center" {...controlStyles}>
            <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
            <Input
              placeholder="Search by Order ID or Vendor..."
              border="none"
              _focus={{ outline: "none", boxShadow: "none" }}
              color="white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              px={0}
              w="full"
            />
          </Flex>
          <Box w={{ base: "full", md: "auto" }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={nativeSelectStyle}
            >
              <option value="All" style={{ background: "#0A0A0A" }}>All Statuses</option>
              <option value="Completed" style={{ background: "#0A0A0A" }}>Completed</option>
              <option value="Pending" style={{ background: "#0A0A0A" }}>Pending</option>
              <option value="Refunded" style={{ background: "#0A0A0A" }}>Refunded</option>
            </select>
          </Box>
        </Flex>
      </Box>

      {/* Sales Data Table */}
      {visibleItems.length === 0 ? (
        <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
          <Text color="#888888" fontSize="lg" fontWeight="bold">No vendor sales found.</Text>
        </Flex>
      ) : (
        <Box
          bg="#0A0A0A"
          rounded="none"
          border="1px solid #1A1A1A"
          mb={8}
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": { background: "#1A1A1A", borderRadius: "0px" },
          }}
        >
          <Box as="table" w="full" minW="1000px" textAlign="left" style={{ borderCollapse: "collapse" }}>
            <Box as="thead" bg="#111111" borderBottom="1px solid #1A1A1A">
              <Box as="tr">
                {["Order ID & Date", "Vendor", "Total Amount", "Commission (5%)", "Status", "Actions"].map((head) => (
                  <Box as="th" key={head} py={4} px={6} color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                    {head}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box as="tbody">
              {visibleItems.map((sale) => {
                const statusProps = getStatusIconProps(sale.status);
                const isRefunded = sale.status === "Refunded";

                return (
                  <Box as="tr" key={sale.id} borderBottom="1px solid #1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s" opacity={isRefunded ? 0.6 : 1}>
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="sm" fontWeight="bold" textDecoration={isRefunded ? "line-through" : "none"}>{sale.id}</Text>
                      <Text color="gray.500" fontSize="xs" mt={0.5}>{sale.date}</Text>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Flex align="center" gap={2}>
                        <Icon as={LuStore} color="gray.500" boxSize="14px" />
                        <Box>
                          <Text color="white" fontSize="sm" fontWeight="500">{sale.vendorName}</Text>
                          <Text color="gray.500" fontSize="xs" mt={0.5}>Customer: {sale.customerName}</Text>
                        </Box>
                      </Flex>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="md" fontWeight="bold" fontFamily="monospace" letterSpacing="tight">
                        {isRefunded ? "-" : ""}₦{sale.totalAmount.toLocaleString()}
                      </Text>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="sm" fontWeight="bold" fontFamily="monospace">
                        {isRefunded ? "₦0" : `₦${sale.commission.toLocaleString()}`}
                      </Text>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Flex align="center" gap={1.5} bg="#111111" color="white" px={2} py={0.5} border="1px solid #333333" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" display="inline-flex">
                        <Icon as={statusProps.icon} color={statusProps.color} boxSize="12px" strokeWidth="3" />
                        {sale.status}
                      </Flex>
                    </Box>

                    <Box as="td" py={4} px={6}>
                      <Flex gap={2} align="center">
                        <Button
                          onClick={() => setViewingReceipt(sale)}
                          size="sm" h="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" fontSize="12px" _hover={{ bg: "#1A1A1A" }}
                        >
                          <Icon as={LuEye} mr={1.5} /> Receipt
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

      {/* Mount Modal */}
      <ReceiptModal sale={viewingReceipt} onClose={() => setViewingReceipt(null)} />
    </Box>
  );
}

