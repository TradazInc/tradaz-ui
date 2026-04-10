"use client";
import React from "react";
import { useSales } from "@/app/hooks/useSales";
import { SalesGridView } from "./SalesGridView";
import { SalesDetailView } from "./SalesDetailView";

export const SalesRecordOverview = () => {
    // 🚀 1. Call the Hook
    const salesState = useSales();

    // 🚀 2. Route to the Details View if a sale is selected
    if (salesState.selectedSale) {
        return (
            <SalesDetailView 
                sale={salesState.selectedSale}
                onBack={() => salesState.setSelectedSale(null)}
            />
        );
    }

    // 🚀 3. Otherwise, show the Grid View
    return (
        <SalesGridView 
            visibleItems={salesState.visibleItems}
            processedSalesLength={salesState.processedSalesLength}
            searchQuery={salesState.searchQuery}
            sortBy={salesState.sortBy}
            sortOrder={salesState.sortOrder}
            handleSearch={salesState.handleSearch}
            handleSortBy={salesState.handleSortBy}
            handleSortOrder={salesState.handleSortOrder}
            onSelectSale={salesState.setSelectedSale}
            visibleCount={salesState.visibleCount}
            isLoadingMore={salesState.isLoadingMore}
            loaderRef={salesState.loaderRef}
        />
    );
};