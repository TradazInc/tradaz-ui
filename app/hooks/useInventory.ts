import { useState, useEffect, useRef, useMemo } from "react";
import { generateDummyInventory } from "@/app/lib/data";
import { InventoryProduct } from "@/app/lib/definitions";

const TOTAL_PRODUCTS = 100;
const ITEMS_PER_PAGE = 9;

export const useInventory = () => {
    // --- 1. DATA STATE ---
    const [allInventory] = useState<InventoryProduct[]>(() => generateDummyInventory(TOTAL_PRODUCTS, 0));
    
    // --- 2. FILTER & SORT STATE ---
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    // --- 3. PAGINATION STATE ---
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // --- 4. DETAIL VIEW STATE ---
    const [selectedProduct, setSelectedProduct] = useState<InventoryProduct | null>(null);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    // --- 5. HANDLERS ---
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setVisibleCount(ITEMS_PER_PAGE);
    };

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterCategory(e.target.value);
        setVisibleCount(ITEMS_PER_PAGE);
    };

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
        setVisibleCount(ITEMS_PER_PAGE);
    };

    const clearSelection = () => {
        setSelectedProduct(null);
        setActiveImageIdx(0);
    };

    // --- 6. CORE LOGIC: PROCESS & SORT ---
    const processedInventory = useMemo(() => {
        let processed = [...allInventory];

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            processed = processed.filter(p => 
                p.name.toLowerCase().includes(lowerQuery) || p.sku.toLowerCase().includes(lowerQuery)
            );
        }

        if (filterCategory === "featured") processed = processed.filter(p => p.isFeatured);
        if (filterCategory === "low-stock") processed = processed.filter(p => p.stock > 0 && p.stock < 5);
        if (filterCategory === "out-of-stock") processed = processed.filter(p => p.stock === 0);

        if (sortBy === "price-asc") processed.sort((a, b) => a.price - b.price);
        if (sortBy === "price-desc") processed.sort((a, b) => b.price - a.price);
        if (sortBy === "stock-asc") processed.sort((a, b) => a.stock - b.stock);
        if (sortBy === "stock-desc") processed.sort((a, b) => b.stock - a.stock);

        return processed;
    }, [allInventory, searchQuery, filterCategory, sortBy]);

    const visibleItems = processedInventory.slice(0, visibleCount);

    // --- 7. INFINITE SCROLL EFFECT ---
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < processedInventory.length && !isLoadingMore) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, processedInventory.length));
                    setIsLoadingMore(false);
                }, 600);
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [visibleCount, processedInventory.length, isLoadingMore]);

    // --- 8. DETAILED PRODUCT FORMATTER ---
    const detailedProduct = selectedProduct ? {
        ...selectedProduct,
        images: [
            selectedProduct.image,
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop"
        ],
        description: "Step into the Future of Fashion with these Stylish Unisex Casual Shoes. They redefine casual footwear, seamlessly blending dynamic design with an all-encompassing appeal for both men and women.",
        specs: { brand: "Tracer", type: "Shoes", gender: "Unisex", status: "Active", created: "2/18/2026" },
        variationsData: [
            { id: "v1", size: "EU41", color: "Navy Blue", colorHex: "#0a192f", stock: 1, salePrice: selectedProduct.price, costPrice: selectedProduct.price * 0.6, sku: `${selectedProduct.sku}-001` },
            { id: "v2", size: "EU44", color: "Navy Blue", colorHex: "#0a192f", stock: 5, salePrice: selectedProduct.price, costPrice: selectedProduct.price * 0.6, sku: `${selectedProduct.sku}-002` },
            { id: "v3", size: "EU45", color: "Navy Blue", colorHex: "#0a192f", stock: 0, salePrice: selectedProduct.price, costPrice: selectedProduct.price * 0.6, sku: `${selectedProduct.sku}-003` },
        ]
    } : null;

    // --- 9. EXPORT EVERYTHING THE UI NEEDS ---
    return {
        searchQuery, filterCategory, sortBy,
        handleSearch, handleFilter, handleSort,
        visibleItems, processedInventoryLength: processedInventory.length,
        visibleCount, isLoadingMore, loaderRef,
        selectedProduct, setSelectedProduct, clearSelection,
        activeImageIdx, setActiveImageIdx, detailedProduct
    };
};