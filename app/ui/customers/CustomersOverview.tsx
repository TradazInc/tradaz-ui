"use client";
import React from "react";
import { useCustomers } from "@/app/hooks/useCustomer";
import { CustomerGridView } from "./CustomerGridView";
import { CustomerDetailView } from "./CustomerDetailView";

export const CustomersOverview = () => {
    
    const customerState = useCustomers();

    if (customerState.selectedCustomer) {
        return (
            <CustomerDetailView 
                customer={customerState.selectedCustomer}
                onBack={() => customerState.setSelectedCustomer(null)}
            />
        );
    }

    
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
            
            onSelectCustomer={customerState.setSelectedCustomer}
            onQuickAction={customerState.handleQuickAction}
            visibleCount={customerState.visibleCount}
            isLoadingMore={customerState.isLoadingMore}
            loaderRef={customerState.loaderRef}
        />
    );
};