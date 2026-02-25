

// subdomains for our simulation
const TAKEN_SUBDOMAINS = [
    'shop',
    'store',
    'fashion',
    'admin',
    'test',
    'tradaz',
    'app',
    'api'
];

// Simulated async API call to check availability
export const checkSubdomainAvailability = async (subdomain: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Returns true if the subdomain is NOT in our taken list
            resolve(!TAKEN_SUBDOMAINS.includes(subdomain.toLowerCase()));
        }, 600); // 600ms artificial network delay
    });
};


//sales record simulations

import { SalesRecord } from "./definitions";



export const generateDummySales = (count: number): SalesRecord[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `POS-0000000${98 - i}`,
        type: i % 3 === 0 ? "Online" : "POS",
        transaction: `202602190${200506 + i}`,
        date: "22/02/26 12:26",
        payment: i % 2 === 0 ? "Credit Card" : "Transfer",
        discount: i % 4 === 0 ? 4500 : 0,
        tax: 4500,
        shipping: i % 3 === 0 ? "Delivery" : "In-Store",
        total: 60000 + (i * 1500),
    }));
};


// dummy inventroy data
import { InventoryProduct } from "./definitions";

export const generateDummyInventory = (count: number, startIndex: number = 0): InventoryProduct[] => {
    const titles = ["Vortex 11", "Body Stockings", "C n C Kimono", "WINE SKIRT", "Graphic Tee", "Denim Jacket"];
    const vendors = ["Tracer Shoes Nigeria", "Primeira", "The Malissa Onojo", "DI'OCHA FASHION", "Urban Wear", "Denim Co."];
    const brands = ["tracer", "primeira", "malissa onojo", "di'ocha", "urban", "denim co"];
    const prices = [87000, 38000, 160000, 59500, 15000, 45000];

    return Array.from({ length: count }).map((_, i) => {
        const index = startIndex + i;
        return {
            id: `INV-${index}`,
            name: titles[index % titles.length],
            image: `https://picsum.photos/seed/${index + 50}/400/400`, 
            vendor: vendors[index % vendors.length],
            brand: brands[index % brands.length],
            sku: `SP00100${7 - (index % 4)}V00${index % 3 + 1}`,
            variations: (index % 4) + 1,
            stock: (index % 15) + 1,
            price: prices[index % prices.length],
            isFeatured: index % 5 === 0,
            isFavorite: index % 3 === 0,
        };
    });
};

//dummy online order data
import { OnlineOrder } from "./definitions";

export const generateDummyOnlineOrders = (count: number, startIndex: number = 0): OnlineOrder[] => {
    const statuses: OnlineOrder["status"][] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    const customers = ["Chinedu Okeke", "Sarah Connor", "Amina Yusuf", "John Doe", "Jane Smith"];
    const methods = ["Standard Delivery", "Express", "In-Store Pickup"];

    return Array.from({ length: count }).map((_, i) => {
        const index = startIndex + i;
        const payStatus = index % 2 === 0 ? "Paid" : (index % 5 === 0 ? "Refunded" : "Unpaid"); 
        
        return {
            id: `ORD-2026${8000 + index}`,
            customer: customers[index % customers.length],
            date: `25/02/26 14:${10 + (index % 40)}`,
            status: statuses[index % statuses.length],
            paymentStatus: payStatus as OnlineOrder["paymentStatus"],
            shippingMethod: methods[index % methods.length],
            total: 15000 + ((index * 2500) % 50000),
        };
    });
};