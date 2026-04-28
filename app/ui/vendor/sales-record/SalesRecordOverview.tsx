"use client";
import React from "react";
import { useSales } from "@/app/hooks/useSales";
import { SalesGridView } from "./SalesGridView";
import { SalesDetailView } from "./SalesDetailView";

export const SalesRecordOverview = () => {
  const salesState = useSales();

  if (salesState.selectedSale) {
    return (
      <SalesDetailView
        sale={salesState.selectedSale}
        onBack={() => salesState.setSelectedSale(null)}
      />
    );
  }

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
      loaderRef={salesState.loaderRef}
      onAddSale={salesState.addNewSale}
    />
  );
};