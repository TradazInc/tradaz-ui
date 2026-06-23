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
  
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuSearch,
  LuFileText,
  LuDollarSign,
  LuCircleCheck,
  LuClock,
  LuCircleAlert,
  LuX,
  LuDownload,
  LuBuilding,
  LuUser
} from "react-icons/lu";

import { useStaffSalaries } from "@/hooks-test/useStaffSalaries";
import { StaffSalary } from "@/types/definitions";

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
  width: "100%",
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

// --- PAYSLIP MODAL COMPONENT ---
const PayslipModal = ({ staff, onClose }: { staff: StaffSalary | null; onClose: () => void }) => {
  if (!staff) return null;
  
  const taxDeduction = staff.salary * 0.05; // Dummy 5% tax
  const netPay = staff.salary - taxDeduction;

  return (
    <AnimatePresence>
      {staff && (
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
                    <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>Official Document</Text>
                    <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">Payslip</Text>
                  </Box>
                  <IconButton aria-label="Close modal" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                    <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                  </IconButton>
                </Flex>

                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                  <VStack w="full" gap={6} align="stretch">
                    
                    {/* Employee Info */}
                    <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                      <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={4}>Employee Details</Text>
                      <Flex align="center" gap={3} mb={4}>
                        <Icon as={LuUser} color="#888888" boxSize="18px" />
                        <Box>
                          <Text color="#888888" fontSize="xs">Name & ID</Text>
                          <Text color="white" fontWeight="bold">{staff.name} <Text as="span" color="gray.500" fontSize="xs" fontWeight="normal">({staff.id})</Text></Text>
                        </Box>
                      </Flex>
                      <Flex align="center" gap={3} mb={4}>
                        <Icon as={LuFileText} color="#888888" boxSize="18px" />
                        <Box>
                          <Text color="#888888" fontSize="xs">Designation</Text>
                          <Text color="white" fontWeight="bold">{staff.role}</Text>
                        </Box>
                      </Flex>
                      <Flex align="center" gap={3}>
                        <Icon as={LuBuilding} color="#888888" boxSize="18px" />
                        <Box>
                          <Text color="#888888" fontSize="xs">Bank Account</Text>
                          <Text color="white" fontWeight="bold">{staff.bank} •••• {staff.accountLast4}</Text>
                        </Box>
                      </Flex>
                    </Box>

                    {/* Earnings & Deductions */}
                    <Box bg="#111111" p={4} border="1px solid #1A1A1A">
                      <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={4}>Earnings Breakdown</Text>
                      <Flex justify="space-between" mb={2}>
                        <Text color="#888888" fontSize="sm">Basic Salary</Text>
                        <Text color="white" fontSize="sm" fontFamily="monospace">₦{staff.salary.toLocaleString()}</Text>
                      </Flex>
                      <Flex justify="space-between" mb={4}>
                        <Text color="red.400" fontSize="sm">Income Tax (5%)</Text>
                        <Text color="red.400" fontSize="sm" fontFamily="monospace">-₦{taxDeduction.toLocaleString()}</Text>
                      </Flex>
                      <Box borderTop="1px dashed #333333" mt={4} pt={4}>
                        <Flex justify="space-between" align="center">
                          <Text color="white" fontWeight="bold">Net Pay</Text>
                          <Text color="#5cac7d" fontSize="xl" fontWeight="black" fontFamily="monospace">₦{netPay.toLocaleString()}</Text>
                        </Flex>
                      </Box>
                    </Box>

                  </VStack>
                </Box>

                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" bg="#111111" gap={3}>
                  <Button flex={1} variant="outline" borderColor="#333333" color="white" rounded="none" fontWeight="bold" onClick={onClose} _hover={{ bg: "#1A1A1A" }}>
                    Close
                  </Button>
                  <Button flex={1} bg="white" color="black" rounded="none" fontWeight="bold" onClick={() => alert("Downloading PDF...")} _hover={{ bg: "#E5E5E5" }}>
                    <Icon as={LuDownload} mr={2} strokeWidth="2.5" /> Download
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

// --- PROCESS PAYROLL MODAL ---
const PaymentModal = ({ 
  isOpen, type, staff, totalAmount, count, onClose, onConfirm 
}: { 
  isOpen: boolean; type: "single" | "bulk"; staff?: StaffSalary; totalAmount: number; count: number; onClose: () => void; onConfirm: () => void; 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1500); // Simulate network request
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Box position="fixed" inset={0} zIndex={9999} bg="blackAlpha.800" backdropFilter="blur(4px)" display="flex" alignItems="center" justifyContent="center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            <Box bg="#0A0A0A" border="1px solid #333333" p={6} maxW="400px" w="full" shadow="2xl">
              <Flex align="center" gap={3} mb={4}>
                <Icon as={LuDollarSign} color="#5cac7d" boxSize="24px" />
                <Text color="white" fontWeight="bold" fontSize="lg">Process Payment</Text>
              </Flex>
              <Text color="gray.400" mb={4} fontSize="sm">
                {type === "single" 
                  ? `You are about to process the salary payment for ${staff?.name}.` 
                  : `You are about to run bulk payroll for ${count} pending/unpaid staff members.`}
              </Text>
              
              <Box bg="#111111" p={4} border="1px solid #1A1A1A" mb={6}>
                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>Total Deduction</Text>
                <Text color="white" fontSize="2xl" fontWeight="black" fontFamily="monospace">₦{totalAmount.toLocaleString()}</Text>
              </Box>

              <Flex justify="flex-end" gap={3}>
                <Button variant="ghost" color="gray.400" onClick={onClose} rounded="none" _hover={{ bg: "#111111", color: "white" }} disabled={isProcessing}>
                  Cancel
                </Button>
                <Button bg="#5cac7d" color="white" onClick={handleConfirm} rounded="none" _hover={{ bg: "#4a9c6d" }} loading={isProcessing} loadingText="Processing...">
                  Confirm & Pay
                </Button>
              </Flex>
            </Box>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
}

export const StaffSalaryOverview = () => {
  const {
    searchQuery,
    statusFilter,
    sortBy,
    sortOrder,
    handleSearch,
    handleStatusFilter,
    handleSortBy,
    handleSortOrder,
    visibleItems,
    processedSalariesLength,
    totalStaff,
    visibleCount,
    loaderRef,
    totalPayroll,
    totalCleared,
    totalPending,
  } = useStaffSalaries();

  // --- LOCAL UI STATE FOR BUTTONS ---
  const [locallyPaidIds, setLocallyPaidIds] = useState<Set<string>>(new Set());
  const [viewingPayslip, setViewingPayslip] = useState<StaffSalary | null>(null);
  
  const [paymentConfig, setPaymentConfig] = useState<{ isOpen: boolean; type: "single" | "bulk"; staff?: StaffSalary }>({ isOpen: false, type: "bulk" });

  // Calculate unpaid totals from visible items for the bulk modal
  const unpaidStaff = visibleItems.filter((s: StaffSalary) => s.status !== "Paid" && !locallyPaidIds.has(s.id));
  const totalUnpaidAmount = unpaidStaff.reduce((acc: number, s: StaffSalary) => acc + s.salary, 0);

  const handleConfirmPayment = () => {
    if (paymentConfig.type === "single" && paymentConfig.staff) {
      setLocallyPaidIds(prev => new Set(prev).add(paymentConfig.staff!.id));
    } else if (paymentConfig.type === "bulk") {
      const newPaidIds = new Set(locallyPaidIds);
      unpaidStaff.forEach((s: StaffSalary) => newPaidIds.add(s.id));
      setLocallyPaidIds(newPaidIds);
    }
    setPaymentConfig({ isOpen: false, type: "bulk" });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Paid":
        return { bg: "#111111", color: "white", border: "1px solid #333333", icon: LuCircleCheck, iconColor: "#5cac7d" };
      case "Pending":
        return { bg: "#111111", color: "white", border: "1px solid #333333", icon: LuClock, iconColor: "orange.400" };
      case "Unpaid":
        return { bg: "#111111", color: "white", border: "1px solid #333333", icon: LuCircleAlert, iconColor: "red.400" };
      default:
        return { bg: "#111111", color: "white", border: "1px solid #333333", icon: LuClock, iconColor: "gray.400" };
    }
  };

  return (
    <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
      
      {/* --- Page Header --- */}
      <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} wrap="wrap" gap={4} mb={6} pt={2}>
        <Box>
          <Text color="white" fontWeight="bold" fontSize="3xl" mb={1} letterSpacing="tight">
            Staff Payroll ({totalStaff})
          </Text>
          <Text color="#888888" fontSize="sm">
            Showing <Text as="span" color="white" fontWeight="bold">{visibleItems.length}</Text> of <Text as="span" color="white" fontWeight="bold">{processedSalariesLength}</Text> • Manage salaries, view payslips, and process payments.
          </Text>
        </Box>
        
        {/* Run Bulk Payroll Button */}
        <Button
          onClick={() => setPaymentConfig({ isOpen: true, type: "bulk" })}
          disabled={unpaidStaff.length === 0}
          bg="#111111" color="white" border="1px solid #333333" _hover={{ bg: "#1A1A1A", borderColor: "white" }} px={6} h="44px" rounded="none" fontWeight="bold"
        >
          <Icon as={LuDollarSign} color="#5cac7d" mr={2} strokeWidth="2.5" /> Run Payroll
        </Button>
      </Flex>

      {/* --- Sticky Toolbar --- */}
      <Box position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }} zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)" py={3} mb={6} borderBottom="1px solid #1A1A1A">
        <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
          <Flex flex={1} minW="300px" align="center" {...controlStyles}>
            <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
            <Input placeholder="Search staff name, role, or bank..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} value={searchQuery} onChange={handleSearch} />
          </Flex>

          <Flex gap={3} w={{ base: "full", md: "auto" }}>
            <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
              <select value={statusFilter} onChange={handleStatusFilter} style={nativeSelectStyle}>
                <option value="all" style={{ background: "#0A0A0A" }}>All Statuses</option>
                <option value="paid" style={{ background: "#0A0A0A" }}>Paid</option>
                <option value="pending" style={{ background: "#0A0A0A" }}>Pending</option>
                <option value="unpaid" style={{ background: "#0A0A0A" }}>Unpaid</option>
              </select>
            </Box>
            <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
              <select value={sortBy} onChange={handleSortBy} style={nativeSelectStyle}>
                <option value="name" style={{ background: "#0A0A0A" }}>Sort: Name</option>
                <option value="role" style={{ background: "#0A0A0A" }}>Sort: Role</option>
                <option value="salary" style={{ background: "#0A0A0A" }}>Sort: Salary</option>
              </select>
            </Box>
            <Box flex={{ base: 1, md: "initial" }} w={{ md: "160px" }}>
              <select value={sortOrder} onChange={handleSortOrder} style={nativeSelectStyle}>
                <option value="asc" style={{ background: "#0A0A0A" }}>A-Z / Lowest</option>
                <option value="desc" style={{ background: "#0A0A0A" }}>Z-A / Highest</option>
              </select>
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* --- Dynamic Payroll Financial Summary --- */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
        <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#1A1A1A">
          <Flex align="center" gap={2} mb={2}>
            <Icon as={LuDollarSign} color="white" strokeWidth="2.5" />
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Loaded Payroll</Text>
          </Flex>
          <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalPayroll.toLocaleString()}</Text>
        </Box>
        <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#1A1A1A">
          <Flex align="center" gap={2} mb={2}>
            <Icon as={LuCircleCheck} color="#5cac7d" strokeWidth="2.5" />
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Cleared (Paid)</Text>
          </Flex>
          <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalCleared.toLocaleString()}</Text>
        </Box>
        <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#1A1A1A">
          <Flex align="center" gap={2} mb={2}>
            <Icon as={LuClock} color="orange.400" strokeWidth="2.5" />
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Outstanding (Pending)</Text>
          </Flex>
          <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">₦{totalPending.toLocaleString()}</Text>
        </Box>
      </SimpleGrid>

      {/* --- Staff Salary Table --- */}
      {visibleItems.length === 0 ? (
        <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
          <Text color="#888888" fontSize="lg" fontWeight="bold">No staff records found.</Text>
        </Flex>
      ) : (
        <Box bg="#0A0A0A" rounded="none" border="1px solid" borderColor="#1A1A1A" mb={8} overflowX="auto" css={{ "&::-webkit-scrollbar": { height: "6px" }, "&::-webkit-scrollbar-thumb": { background: "#333333", borderRadius: "0px" } }}>
          <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
            <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
              <Box as="tr">
                {["Staff Member", "Role", "Bank Details", "Base Salary", "Status", "Actions"].map((head) => (
                  <Box as="th" key={head} py={4} px={6} color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                    {head}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box as="tbody">
              {visibleItems.map((staff: StaffSalary, idx: number) => {
                // Determine if this item was locally paid in this session
                const isPaid = staff.status === "Paid" || locallyPaidIds.has(staff.id);
                const currentStatus = isPaid ? "Paid" : staff.status;
                const statusStyle = getStatusStyle(currentStatus);
                
                return (
                  <Box as="tr" key={idx} borderBottom="1px solid" borderColor="#1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="sm" fontWeight="bold">{staff.name}</Text>
                      <Text color="#888888" fontSize="xs" fontWeight="500">{staff.id}</Text>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="sm" fontWeight="500">{staff.role}</Text>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="sm" fontWeight="medium">{staff.bank}</Text>
                      <Text color="#888888" fontSize="xs" fontWeight="500">•••• {staff.accountLast4}</Text>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="md" fontWeight="bold" letterSpacing="tight">₦{staff.salary.toLocaleString()}</Text>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Flex align="center" gap={2} px={3} py={1.5} rounded="none" bg={statusStyle.bg} color={statusStyle.color} border={statusStyle.border} fontSize="10px" textTransform="uppercase" letterSpacing="wider" fontWeight="bold" display="inline-flex">
                        <Icon as={statusStyle.icon} color={statusStyle.iconColor} boxSize="14px" strokeWidth="2.5" />
                        {currentStatus}
                      </Flex>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Flex gap={2}>
                        <Button 
                          onClick={() => setViewingPayslip(staff)}
                          size="sm" variant="ghost" rounded="none" color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}
                        >
                          <Icon as={LuFileText} mr={1.5} strokeWidth="2.5" /> Payslip
                        </Button>
                        {!isPaid && (
                          <Button
                            onClick={() => setPaymentConfig({ isOpen: true, type: "single", staff })}
                            size="sm" bg="#111111" color="white" border="1px solid #333333" rounded="none" fontWeight="bold" _hover={{ bg: "white", color: "black", borderColor: "white" }} transition="all 0.2s"
                          >
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
        </Box>
      )}

      {/* Infinite Scroll Trigger */}
      {visibleCount < processedSalariesLength && (
        <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
          <Spinner color="white" size="md" />
        </Flex>
      )}

      {/* --- Mount Modals --- */}
      <PayslipModal staff={viewingPayslip} onClose={() => setViewingPayslip(null)} />
      <PaymentModal 
        isOpen={paymentConfig.isOpen} 
        type={paymentConfig.type} 
        staff={paymentConfig.staff} 
        totalAmount={paymentConfig.type === "single" ? (paymentConfig.staff?.salary || 0) : totalUnpaidAmount} 
        count={paymentConfig.type === "single" ? 1 : unpaidStaff.length}
        onClose={() => setPaymentConfig({ isOpen: false, type: "bulk" })} 
        onConfirm={handleConfirmPayment} 
      />
    </Box>
  );
};