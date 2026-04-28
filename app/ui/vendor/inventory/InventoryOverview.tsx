"use client";
import React from "react";
import { useInventory } from "@/app/hooks/useInventory";
import { ProductDetailView } from "./ProductDetailView";
import { InventoryGridView } from "./InventoryGridView";

export const InventoryOverview = () => {
    const inventoryState = useInventory();

    // routing logic
    if (inventoryState.selectedProduct && inventoryState.detailedProduct) {
        return (
            <ProductDetailView 
                product={inventoryState.detailedProduct}
                activeImageIdx={inventoryState.activeImageIdx}
                setActiveImageIdx={inventoryState.setActiveImageIdx}
                onBack={inventoryState.clearSelection}
                onDelete={inventoryState.deleteProduct}
                onRestock={inventoryState.restockProduct}
                onEdit={inventoryState.editProduct}
            />
        );
    }

    return (
        <InventoryGridView 
            visibleItems={inventoryState.visibleItems}
            processedInventoryLength={inventoryState.processedInventoryLength}
            searchQuery={inventoryState.searchQuery}
            filterCategory={inventoryState.filterCategory}
            sortBy={inventoryState.sortBy}
            handleSearch={inventoryState.handleSearch}
            handleFilter={inventoryState.handleFilter}
            handleSort={inventoryState.handleSort}
            onSelectProduct={inventoryState.setSelectedProduct}
            visibleCount={inventoryState.visibleCount}
            isLoadingMore={inventoryState.isLoadingMore}
            loaderRef={inventoryState.loaderRef}
            onDelete={inventoryState.deleteProduct}
            onRestock={inventoryState.restockProduct}
            onEdit={inventoryState.editProduct}
            toggleFavorite={inventoryState.toggleFavorite} 
        />
    );
};