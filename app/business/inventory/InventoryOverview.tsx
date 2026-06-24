"use client";
import React, { useState, useMemo, useCallback } from "react";
import { useProductList, useProductActions } from "@/entities/products/hooks";
import type { Product } from "@/entities/products/types";
import { ProductDetailView } from "./productDetailView";
import { InventoryGridView } from "./inventoryGridView";
import { InventorySkeleton } from "./InventorySkeleton";

export interface GridProduct {
  id: string;
  name: string;
  image: string;
  sku: string;
  price: number;
  stock: number;
  variations: number;
  isFeatured: boolean;
  isFavorite: boolean;
}

// Helpers

function getTotalStock(product: Product): number {
  return product.variations.reduce(
    (sum, v) =>
      sum + v.teamVariations.reduce((tSum, tv) => tSum + tv.quantity, 0),
    0,
  );
}

function toGridProduct(product: Product): GridProduct {
  return {
    id: product.id,
    name: product.name,
    image: product.images?.[0]?.url ?? "/placeholder.png",
    sku: product.variations?.[0]?.sku ?? "N/A",
    price: product.variations?.[0]?.price ?? 0,
    stock: getTotalStock(product),
    variations: product.variations.length,
    isFeatured: false,
    isFavorite: false,
  };
}

// Component

export const InventoryOverview = () => {
  const { data, isLoading } = useProductList({ pageSize: 100 });
  const { remove } = useProductActions();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const allProducts = useMemo<Product[]>(() => data?.products ?? [], [data]);

  const gridProducts = useMemo(
    () => allProducts.map(toGridProduct),
    [allProducts],
  );

  const visibleItems = useMemo(() => {
    let result = [...gridProducts];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "stock-asc":
        result.sort((a, b) => a.stock - b.stock);
        break;
      case "stock-desc":
        result.sort((a, b) => b.stock - a.stock);
        break;
    }

    return result;
  }, [gridProducts, searchQuery, sortBy]);

  const detailedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return allProducts.find((p) => p.id === selectedProductId) ?? null;
  }, [allProducts, selectedProductId]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    [],
  );

  const handleSort = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value),
    [],
  );

  const handleSelectProduct = useCallback(
    (product: GridProduct) => setSelectedProductId(product.id),
    [],
  );

  const handleBack = useCallback(() => {
    setSelectedProductId(null);
    setActiveImageIdx(0);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      await remove.mutateAsync(id);
      if (selectedProductId === id) handleBack();
    },
    [remove, selectedProductId, handleBack],
  );

  const handleRestock = useCallback(async (id: string, amount: number) => {
    console.log(`Restock product ${id} by ${amount}`);
  }, []);

  const handleEdit = useCallback((id: string) => {
    console.log(`Edit product ${id}`);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    console.log(`Toggle favorite for ${id}`);
  }, []);

  // ---- Loading state ----
  if (isLoading) {
    return <InventorySkeleton />;
  }

  // ---- Detail view ----
  if (selectedProductId && detailedProduct) {
    return (
      <ProductDetailView
        product={detailedProduct}
        activeImageIdx={activeImageIdx}
        setActiveImageIdx={setActiveImageIdx}
        onBack={handleBack}
        onDelete={handleDelete}
        onRestock={handleRestock}
        onEdit={handleEdit}
      />
    );
  }

  // ---- Grid view ----
  return (
    <InventoryGridView
      visibleItems={visibleItems}
      processedInventoryLength={gridProducts.length}
      searchQuery={searchQuery}
      sortBy={sortBy}
      handleSearch={handleSearch}
      handleSort={handleSort}
      onSelectProduct={handleSelectProduct}
      visibleCount={visibleItems.length}
      isLoadingMore={false}
      loaderRef={null as unknown as React.RefObject<HTMLDivElement | null>}
      onDelete={handleDelete}
      onRestock={handleRestock}
      onEdit={handleEdit}
      toggleFavorite={toggleFavorite}
    />
  );
};
