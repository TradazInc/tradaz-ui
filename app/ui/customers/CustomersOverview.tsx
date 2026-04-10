"use client";
import React from "react";
import { useCustomers } from "@/app/hooks/useCustomer";
import { CustomerGridView } from "./CustomerGridView";
import { CustomerDetailView } from "./CustomerDetailView";

export const CustomersOverview = () => {
    // 🚀 1. Call the Hook
    const customerState = useCustomers();

    // 🚀 2. Route to the Details View if a customer is selected (Eye Button clicked)
    if (customerState.selectedCustomer) {
        return (
            <CustomerDetailView 
                customer={customerState.selectedCustomer}
                onBack={() => customerState.setSelectedCustomer(null)}
            />
        );
    }

    // 🚀 3. Otherwise, show the Main Grid View
    return (
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
            // Pass the action handlers down
            onSelectCustomer={customerState.setSelectedCustomer}
            onQuickAction={customerState.handleQuickAction}
            visibleCount={customerState.visibleCount}
            isLoadingMore={customerState.isLoadingMore}
            loaderRef={customerState.loaderRef}
        />
    );
};