"use client";
import React from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Icon,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import {
  LuSearch,
  LuFileText,
  LuDollarSign,
  LuCircleCheck,
  LuClock,
  LuCircleAlert,
} from "react-icons/lu";

import { useStaffSalaries } from "@/app/hooks/useStaffSalaries";
import { StaffSalary } from "@/app/lib/definitions";

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


  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Paid":
        return {
          bg: "#111111",
          color: "white",
          border: "1px solid #333333",
          icon: LuCircleCheck,
          iconColor: "#5cac7d" // Green Icon
        };
      case "Pending":
        return {
          bg: "#111111",
          color: "white",
          border: "1px solid #333333",
          icon: LuClock,
          iconColor: "orange.400" // Orange Icon
        };
      case "Unpaid":
        return {
          bg: "#111111",
          color: "white",
          border: "1px solid #333333",
          icon: LuCircleAlert,
          iconColor: "red.400" // Red Icon
        };
      default:
        return {
          bg: "#111111",
          color: "white",
          border: "1px solid #333333",
          icon: LuClock,
          iconColor: "gray.400"
        };
    }
  };

  return (
    <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
      
      {/* --- Page Header --- */}
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "flex-end" }}
        wrap="wrap"
        gap={4}
        mb={6}
        pt={2}
      >
        <Box>
          <Text color="white" fontWeight="bold" fontSize="3xl" mb={1} letterSpacing="tight">
            Staff Payroll ({totalStaff})
          </Text>
          <Text color="#888888" fontSize="sm">
            Showing{" "}
            <Text as="span" color="white" fontWeight="bold">
              {visibleItems.length}
            </Text>{" "}
            of{" "}
            <Text as="span" color="white" fontWeight="bold">
              {processedSalariesLength}
            </Text>{" "}
            • Manage salaries, view payslips, and process payments.
          </Text>
        </Box>
        
        {/* Dark Mode Run Payroll Button */}
        <Button
          bg="#111111"
          color="white"
          border="1px solid #333333"
          _hover={{ bg: "#1A1A1A", borderColor: "white" }}
          px={6}
          h="44px"
          rounded="none"
          fontWeight="bold"
        >
          <Icon as={LuDollarSign} color="#5cac7d" mr={2} strokeWidth="2.5" /> Run Payroll
        </Button>
      </Flex>

      {/* --- Sticky Toolbar --- */}
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
      >
        <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
          {/* Search */}
          <Flex flex={1} minW="300px" align="center" {...controlStyles}>
            <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
            <Input
              placeholder="Search staff name, role, or bank..."
              border="none"
              _focus={{ outline: "none", boxShadow: "none" }}
              color="white"
              h="full"
              px={0}
              value={searchQuery}
              onChange={handleSearch}
            />
          </Flex>

          {/* Functional Dropdowns */}
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
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
              Loaded Payroll
            </Text>
          </Flex>
          <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">
            ₦{totalPayroll.toLocaleString()}
          </Text>
        </Box>
        <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#1A1A1A">
          <Flex align="center" gap={2} mb={2}>
            <Icon as={LuCircleCheck} color="#5cac7d" strokeWidth="2.5" />
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
              Cleared (Paid)
            </Text>
          </Flex>
          <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">
            ₦{totalCleared.toLocaleString()}
          </Text>
        </Box>
        <Box bg="#0A0A0A" rounded="none" p={6} border="1px solid" borderColor="#1A1A1A">
          <Flex align="center" gap={2} mb={2}>
            <Icon as={LuClock} color="orange.400" strokeWidth="2.5" />
            <Text color="#888888" fontSize="11px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
              Outstanding (Pending)
            </Text>
          </Flex>
          <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">
            ₦{totalPending.toLocaleString()}
          </Text>
        </Box>
      </SimpleGrid>

      {/* --- Staff Salary Table --- */}
      {visibleItems.length === 0 ? (
        <Flex justify="center" align="center" py={20} direction="column" border="1px dashed #1A1A1A" bg="#0A0A0A">
          <Text color="#888888" fontSize="lg" fontWeight="bold">
            No staff records found.
          </Text>
        </Flex>
      ) : (
        <Box
          bg="#0A0A0A"
          rounded="none"
          border="1px solid"
          borderColor="#1A1A1A"
          mb={8}
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": { background: "#333333", borderRadius: "0px" },
          }}
        >
          <Box as="table" w="full" minW="900px" textAlign="left" style={{ borderCollapse: "collapse" }}>
            <Box as="thead" bg="#111111" borderBottom="1px solid" borderColor="#333333">
              <Box as="tr">
                {[
                  "Staff Member",
                  "Role",
                  "Bank Details",
                  "Base Salary",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <Box as="th" key={head} py={4} px={6} color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                    {head}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box as="tbody">
              {visibleItems.map((staff: StaffSalary, idx: number) => {
                const statusStyle = getStatusStyle(staff.status);
                return (
                  <Box as="tr" key={idx} borderBottom="1px solid" borderColor="#1A1A1A" _hover={{ bg: "#111111" }} transition="background 0.2s">
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="sm" fontWeight="bold">
                        {staff.name}
                      </Text>
                      <Text color="#888888" fontSize="xs" fontWeight="500">
                        {staff.id}
                      </Text>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="sm" fontWeight="500">
                        {staff.role}
                      </Text>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="sm" fontWeight="medium">
                        {staff.bank}
                      </Text>
                      <Text color="#888888" fontSize="xs" fontWeight="500">
                        •••• {staff.accountLast4}
                      </Text>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Text color="white" fontSize="md" fontWeight="bold" letterSpacing="tight">
                        ₦{staff.salary.toLocaleString()}
                      </Text>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Flex
                        align="center"
                        gap={2}
                        px={3}
                        py={1.5}
                        rounded="none"
                        bg={statusStyle.bg}
                        color={statusStyle.color}
                        border={statusStyle.border}
                        fontSize="10px"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        fontWeight="bold"
                        display="inline-flex"
                      >
                        <Icon
                          as={statusStyle.icon}
                          color={statusStyle.iconColor}
                          boxSize="14px"
                          strokeWidth="2.5"
                        />
                        {staff.status}
                      </Flex>
                    </Box>
                    <Box as="td" py={4} px={6}>
                      <Flex gap={2}>
                        <Button
                          size="sm"
                          variant="ghost"
                          rounded="none"
                          color="#888888"
                          _hover={{ bg: "#1A1A1A", color: "white" }}
                        >
                          <Icon as={LuFileText} mr={1.5} strokeWidth="2.5" />{" "}
                          Payslip
                        </Button>
                        {staff.status !== "Paid" && (
                          <Button
                            size="sm"
                            bg="#111111"
                            color="white"
                            border="1px solid white"
                            rounded="none"
                            fontWeight="bold"
                            _hover={{ bg: "white", color: "black" }}
                            transition="all 0.2s"
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

          {/* Infinite Scroll Trigger */}
          {visibleCount < processedSalariesLength && (
            <Flex ref={loaderRef} justify="center" align="center" py={8} h="80px">
              <Spinner color="white" size="md" />
            </Flex>
          )}
        </Box>
      )}
    </Box>
  );
};