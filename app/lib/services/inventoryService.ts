// app/lib/services/inventoryService.ts
import { generateDummyInventory } from "../data";
import { InventoryProduct } from "../definitions";

const STORAGE_KEY = "tradaz_inventory_data";

// Fake network latency simulator (500ms to 1s)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get raw data
const getRawData = (): InventoryProduct[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        const initialData = generateDummyInventory(9, 0);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        return initialData;
    }
    return JSON.parse(stored);
};


export const inventoryApi = {
    // GET: /api/inventory
    getAll: async (): Promise<InventoryProduct[]> => {
        await delay(800); // Simulate fetching from database
        return getRawData();
    },

    // POST: /api/inventory
    create: async (product: InventoryProduct): Promise<InventoryProduct> => {
        await delay(1200); // Simulate database insert
        const current = getRawData();
        const updated = [product, ...current];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return product;
    },

    // PATCH: /api/inventory/:id/stock
    updateStock: async (id: string, additionalStock: number): Promise<InventoryProduct[]> => {
        await delay(600); // Simulate database update
        const current = getRawData();
        const updated = current.map(item => 
            item.id === id ? { ...item, stock: item.stock + additionalStock } : item
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    },

    // DELETE: /api/inventory/:id
    delete: async (id: string): Promise<InventoryProduct[]> => {
        await delay(800); // Simulate database deletion
        const current = getRawData();
        const updated = current.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    }
};