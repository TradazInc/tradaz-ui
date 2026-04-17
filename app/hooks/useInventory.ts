import { useState, useEffect, useRef, useMemo } from "react";
import { InventoryProduct } from "@/app/lib/definitions";

// --- TYPES ---
export interface ProductVariation {
    id: string;
    size: string;
    color: string;
    colorHex: string;
    stock: number;
    salePrice: number;
    costPrice: number;
    sku: string;
}

export interface MockDetailedProduct extends InventoryProduct {
    category: string; 
    isFavorite: boolean; 
    isFeatured?: boolean; 
    images: string[];
    description: string;
    specs: {
        brand: string;
        type: string;
        gender: string;
        status: string;
        created: string;
    };
    variationsData: ProductVariation[];
}

// --- MOCK INVENTORY DATA GENERATOR ---
const BASE_INVENTORY: MockDetailedProduct[] = [
    { 
        id: "PROD-001", name: "Premium Cotton T-Shirt", sku: "TSH-BLK-M", category: "Shirts", price: 15000, stock: 120, 
        vendor: "Tradaz Platform",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", 
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", 
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
        ], 
        isFeatured: true, isFavorite: true, variations: 2, brand: "Tradaz Basics", 
        description: "A highly comfortable, 100% cotton t-shirt perfect for everyday wear. Breathable and stylish.",
        specs: { brand: "Tradaz Basics", type: "Physical", gender: "Unisex", status: "Active", created: "Oct 12, 2025" },
        variationsData: [
            { id: "v1", size: "M", color: "Black", colorHex: "#000000", stock: 60, salePrice: 15000, costPrice: 8000, sku: "TSH-BLK-M" },
            { id: "v2", size: "L", color: "Black", colorHex: "#000000", stock: 60, salePrice: 15000, costPrice: 8000, sku: "TSH-BLK-L" }
        ]
    },
    { 
        id: "PROD-002", name: "Urban Street Sneakers", sku: "SNK-WHT-42", category: "Foot Wears", price: 45000, stock: 0, 
        vendor: "Urban Kicks",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", 
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"], 
        isFeatured: false, isFavorite: false, variations: 1, brand: "Urban Kicks", 
        description: "Sleek and durable streetwear sneakers designed for the modern hustle.",
        specs: { brand: "Urban Kicks", type: "Physical", gender: "Men", status: "Out of Stock", created: "Nov 01, 2025" },
        variationsData: [
            { id: "v3", size: "42", color: "Red/Black", colorHex: "#E53E3E", stock: 0, salePrice: 45000, costPrice: 25000, sku: "SNK-WHT-42" }
        ]
    },
    { 
        id: "PROD-003", name: "Classic Denim Jacket", sku: "JKT-BLU-L", category: "Jackets", price: 35000, stock: 4, 
        vendor: "Lagos Streetwear",
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop", 
        images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop"], 
        isFeatured: true, isFavorite: false, variations: 1, brand: "Lagos Streetwear", 
        description: "Timeless denim jacket with deep pockets and a rugged aesthetic.",
        specs: { brand: "Lagos Streetwear", type: "Physical", gender: "Unisex", status: "Low Stock", created: "Dec 15, 2025" },
        variationsData: [
            { id: "v4", size: "L", color: "Blue", colorHex: "#3182CE", stock: 4, salePrice: 35000, costPrice: 18000, sku: "JKT-BLU-L" }
        ]
    },
];

const generateExtendedInventory = (count: number): MockDetailedProduct[] => {
    return Array.from({ length: count }).map((_, i) => {
        const base = BASE_INVENTORY[i % BASE_INVENTORY.length];
        const generatedStock = i % 5 === 0 ? 0 : i % 3 === 0 ? 3 : 50 + i;
        return {
            ...base,
            id: `PROD-${(i + 1).toString().padStart(3, '0')}`,
            name: `${base.name} - Edition ${i + 1}`,
            sku: `${base.sku}-${i}`,
            stock: generatedStock,
            price: base.price + (i * 1000),
            specs: { ...base.specs, status: generatedStock === 0 ? "Out of Stock" : generatedStock < 5 ? "Low Stock" : "Active" }
        };
    });
};

const TOTAL_INVENTORY = 45;
const ITEMS_PER_PAGE = 12;

export const useInventory = () => {
    // --- STATE ---
    const [inventory, setInventory] = useState<MockDetailedProduct[]>(() => generateExtendedInventory(TOTAL_INVENTORY));
    
    // View State
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    // Infinite Scroll State
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    // --- VIEW HANDLERS ---
    
    const setSelectedProduct = (product: InventoryProduct) => {
        setSelectedProductId(product.id);
        setActiveImageIdx(0);
    };

    const clearSelection = () => {
        setSelectedProductId(null);
        setActiveImageIdx(0);
    };

    // --- ACTION HANDLERS ---
    
    // 1. Delete Product
    const deleteProduct = (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to permanently delete this product? This action cannot be undone.");
        if (!confirmDelete) return;

        setInventory(prev => prev.filter(item => item.id !== id));
        
        // Return to grid if deleting from detail view
        if (selectedProductId === id) {
            clearSelection();
        }
    };

    // 2. Restock Product
    const restockProduct = (id: string, amountToAdd: number) => {
        setInventory(prev => prev.map(item => {
            if (item.id === id) {
                const newStock = item.stock + amountToAdd;
                return { 
                    ...item, 
                    stock: newStock,
                    specs: { ...item.specs, status: newStock > 0 ? "Active" : "Out of Stock" } 
                };
            }
            return item;
        }));
        
        // Provide visual feedback
        alert(`Successfully added ${amountToAdd} units to inventory.`);
    };

    // 3. Edit Product
    const editProduct = (id: string) => {
        // In a real app: router.push(`/dashboard/edit-product/${id}`);
        alert(`Routing to Edit Product page for ID: ${id}`);
    };

    // 4. Toggle Favorite
    const toggleFavorite = (id: string) => {
        setInventory(prev => prev.map(item => 
            item.id === id 
                ? { ...item, isFavorite: !item.isFavorite } 
                : item
        ));
    };

    // --- FILTER HANDLERS ---
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => { setFilterCategory(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };
    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => { setSortBy(e.target.value); setVisibleCount(ITEMS_PER_PAGE); };

    // --- SEARCH & SORT ENGINE ---
    const processedInventory = useMemo(() => {
        let processed = [...inventory];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            processed = processed.filter(item => 
                item.name.toLowerCase().includes(q) || 
                item.sku.toLowerCase().includes(q)
            );
        }

        if (filterCategory !== "all") {
            if (filterCategory === "featured") processed = processed.filter(item => item.isFeatured);
            else if (filterCategory === "low-stock") processed = processed.filter(item => item.stock > 0 && item.stock <= 5);
            else if (filterCategory === "out-of-stock") processed = processed.filter(item => item.stock === 0);
            else processed = processed.filter(item => item.category === filterCategory);
        }

        processed.sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            if (sortBy === "stock-asc") return a.stock - b.stock;
            if (sortBy === "stock-desc") return b.stock - a.stock;
            return 0; // default
        });

        return processed;
    }, [inventory, searchQuery, filterCategory, sortBy]);

    const visibleItems = processedInventory.slice(0, visibleCount);
    const detailedProduct = inventory.find(p => p.id === selectedProductId) || null;

    // --- INFINITE SCROLL OBSERVER ---
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

    return {
        searchQuery, filterCategory, sortBy,
        visibleItems, processedInventoryLength: processedInventory.length,
        visibleCount, isLoadingMore, loaderRef,
        
        selectedProduct: selectedProductId,
        detailedProduct,
        activeImageIdx, setActiveImageIdx,
        
        handleSearch, handleFilter, handleSort,
        setSelectedProduct, clearSelection,

        deleteProduct, restockProduct, editProduct, toggleFavorite
    };
};