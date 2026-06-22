"use client";
import React from "react";
import { useOnlineOrders } from "@/hooks/useOnlineOrders";
import { OnlineOrdersGridView } from "./OnlineOrdersGridView";
import { OnlineOrderDetailView } from "./OnlineOrderDetailView";

export const OnlineOrdersOverview = () => {

    const ordersState = useOnlineOrders();

    // If an order is selected, show the Details View
    if (ordersState.selectedOrder) {
        return (
            <OnlineOrderDetailView
                order={ordersState.selectedOrder}
                onBack={() => ordersState.setSelectedOrder(null)}
            />
        );
    }

    // Otherwise, show the Grid View
    return (
        <OnlineOrdersGridView
            visibleItems={ordersState.visibleItems}
            processedOrdersLength={ordersState.processedOrdersLength}
            totalOrders={ordersState.totalOrders}
            searchQuery={ordersState.searchQuery}

            sortBy={ordersState.sortBy}

            handleSearch={ordersState.handleSearch}

            handleSortBy={ordersState.handleSortBy}

            onSelectOrder={ordersState.setSelectedOrder}
            visibleCount={ordersState.visibleCount}
            isLoadingMore={ordersState.isLoadingMore}
            loaderRef={ordersState.loaderRef}
        />
    );
};