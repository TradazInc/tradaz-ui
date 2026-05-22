"use client";
import React from "react";
import { Box, Flex, Text, Button, Icon } from "@chakra-ui/react";
import {  LuTriangle } from "react-icons/lu";

import { useCustomers } from "@/app/hooks/useCustomer";
import { CustomerGridView } from "./CustomerGridView";
import { CustomerDetailView } from "./CustomerDetailView";
import { Customer } from "@/app/lib/definitions";

// --- ACTION CONFIRMATION MODAL ---
const ActionModal = ({ 
    isOpen, action, customer, onClose, onConfirm 
}: { 
    isOpen: boolean, action: string, customer: Customer | null, onClose: () => void, onConfirm: () => void 
}) => {
    if (!isOpen || !customer) return null;
    const isDelete = action === 'delete';
    
    return (
      <Box position="fixed" inset={0} zIndex={9999} bg="blackAlpha.800" backdropFilter="blur(4px)" display="flex" alignItems="center" justifyContent="center">
          <Box bg="#0A0A0A" border="1px solid #333333" p={6} maxW="400px" w="full" shadow="2xl">
              <Flex align="center" gap={3} mb={4}>
                  <Icon as={LuTriangle} color={isDelete ? "red.400" : "orange.400"} boxSize="24px" />
                  <Text color="white" fontWeight="bold" fontSize="lg">{isDelete ? 'Delete' : 'Suspend'} Customer?</Text>
              </Flex>
              <Text color="gray.400" mb={6} fontSize="sm">
                  Are you sure you want to {action} <b>{customer.name}</b>? {isDelete ? "This action cannot be undone." : "They will not be able to log in or make purchases."}
              </Text>
              <Flex justify="flex-end" gap={3}>
                  <Button variant="ghost" color="gray.400" onClick={onClose} rounded="none" _hover={{ bg: "#111111", color: "white" }}>Cancel</Button>
                  <Button colorScheme={isDelete ? "red" : "orange"} onClick={onConfirm} rounded="none">{isDelete ? 'Delete' : 'Suspend'}</Button>
              </Flex>
          </Box>
      </Box>
    );
};

export const CustomersOverview = () => {
    const customerState = useCustomers();

    // . Handled by the "View" button
    if (customerState.selectedCustomer) {
        return (
            <CustomerDetailView 
                customer={customerState.selectedCustomer}
                onBack={() => customerState.setSelectedCustomer(null)}
            />
        );
    }

    return (
        <Box w="full" position="relative">
            <CustomerGridView 
                visibleItems={customerState.visibleItems}
                processedCustomersLength={customerState.processedCustomersLength}
                searchQuery={customerState.searchQuery}
                filterCategory={customerState.statusFilter}
                sortBy={customerState.sortBy}
                sortOrder={customerState.sortOrder}
                handleSearch={customerState.handleSearch}
                handleStatusFilter={customerState.handleStatusFilter}
                handleSortBy={customerState.handleSortBy}
                handleSortOrder={customerState.handleSortOrder}
                onSelectCustomer={customerState.setSelectedCustomer}
                onQuickAction={customerState.handleQuickAction}
                visibleCount={customerState.visibleCount}
                isLoadingMore={customerState.isLoadingMore}
                loaderRef={customerState.loaderRef}
            />

            {/*  Handled by the Suspend/Delete buttons */}
            <ActionModal 
                isOpen={customerState.actionModal.isOpen} 
                action={customerState.actionModal.action} 
                customer={customerState.actionModal.customer} 
                onClose={customerState.closeActionModal}
                onConfirm={customerState.executeAction}
            />
        </Box>
    );
};