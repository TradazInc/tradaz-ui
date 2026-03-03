

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

// dummy data for customers 
import { Customer } from "./definitions";

export const generateDummyCustomers = (count: number, startIndex: number = 0): Customer[] => {

    const names = ["John Doe", "Jane Smith", "Alice Customer", "Bob Tester", "Charlie Demo", "Diana Placeholder"];
    const statuses: Customer["status"][] = ["Active", "Active", "Active", "Inactive"]; 
    // const tiers: Customer["tier"][] = ["VIP", "Loyal", "Standard", "New"];

    return Array.from({ length: count }).map((_, i) => {
        const index = startIndex + i;
        const name = names[index % names.length];
        const firstName = name.split(" ")[0].toLowerCase();
        const lastName = name.split(" ")[1]?.toLowerCase() || "demo";
        
        return {
            id: `CUST-${8000 + index}`,
            name: name,
            handle: `@${firstName}_${lastName}`,
            email: `${firstName}.${lastName}@example.com`,
            orders: (index % 15) + 1,
            spend: 15000 + ((index * 25000) % 850000),
            status: statuses[index % statuses.length],
            // tier: tiers[index % tiers.length],
            joinedDate: `Feb ${10 + (index % 18)}, 2026`,
        };
    });
};



import { CartItem } from "./definitions";

export const initialPosCart: CartItem[] = [
    { id: "1", name: "Vortex 11 Sneakers", variant: "Size 42 | Black", price: 87000, qty: 1, stock: 4 },
    { id: "2", name: "Graphic Tee", variant: "L | White", price: 15000, qty: 2, stock: 12 },
];

import { StaffSalary } from "./definitions";

export const generateDummyStaffSalaries = (count: number, startIndex: number = 0): StaffSalary[] => {
    const names = ["David Opeyemi", "Sarah Connor", "Ahmed Musa", "Grace Effiong", "Samuel Okafor", "Linda Ikeji", "Chinedu Okeke", "Amina Yusuf"];
    const roles = ["Store Manager", "Inventory Clerk", "Sales Associate", "Customer Support", "Logistics Driver", "Social Media Manager"];
    const banks = ["GTBank", "Access Bank", "Zenith Bank", "UBA", "First Bank", "Kuda"];

    return Array.from({ length: count }).map((_, i) => {
        const index = startIndex + i;
        return {
            id: `STF-${(index + 1).toString().padStart(3, '0')}`,
            name: names[index % names.length],
            role: roles[index % roles.length],
            salary: 85000 + ((index * 15000) % 150000),
            status: index % 4 === 0 ? "Pending" : (index % 5 === 0 ? "Unpaid" : "Paid"), 
            bank: banks[index % banks.length],
            accountLast4: `${1000 + (index * 123) % 9000}`
        };
    });
};




import { Expense } from "./definitions";

export const generateDummyExpenses = (count: number, startIndex: number = 0): Expense[] => {
    const descriptions = ["Facebook Ads Campaign", "Restock: Summer Collection", "Shopify Subscription", "Electricity Bill", "Staff Lunch", "Packaging Materials"];
    const categories: Expense["category"][] = ["Marketing", "Inventory", "Operations", "Utilities", "Payroll", "Operations"];
    
    return Array.from({ length: count }).map((_, i) => {
        const index = startIndex + i;
        return {
            id: `EXP-10${index + 20}`,
            description: descriptions[index % descriptions.length],
            category: categories[index % categories.length],
            amount: 15000 + ((index * 27000) % 350000),
            date: `Feb ${20 - (index % 15)}, 2026`,
            status: index % 5 === 0 ? "Pending" : "Cleared",
            reference: `REF-${Math.floor(1000 + Math.random() * 9000)}`
        };
    });
};



import { RevenueTransaction } from "./definitions";

export const generateDummyRevenue = (count: number, startIndex: number = 0): RevenueTransaction[] => {
    const sources = ["Walk-in Customer", "Jane Doe", "Michael Smith", "Guest Checkout", "Sarah Connor", "B2B Bulk Order"];
    const channels: RevenueTransaction["channel"][] = ["POS", "Online", "Online", "POS", "Subscription", "Online"];
    
    return Array.from({ length: count }).map((_, i) => {
        const index = startIndex + i;
        const isRefunded = index % 12 === 0;
        return {
            id: `REV-90${index + 40}`,
            source: sources[index % sources.length],
            channel: channels[index % channels.length],
            amount: isRefunded ? -(15000 + ((index * 12000) % 80000)) : 25000 + ((index * 34000) % 450000),
            date: `Feb ${20 - (index % 15)}, 2026`,
            status: isRefunded ? "Refunded" : (index % 8 === 0 ? "Pending" : "Completed"),
            reference: `TXN-${Math.floor(10000 + Math.random() * 90000)}`
        };
    });
};



import { TaxableSale } from "./definitions";

export const generateDummyTaxableSales = (count: number): TaxableSale[] => {
    const customers = ["Walk-in Customer", "Jane Doe", "Michael Smith", "TechCorp Ltd", "Sarah Connor"];
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    
    return Array.from({ length: count }).map((_, i) => {
        // Spread dates randomly over the last 365 days
        const daysAgo = Math.floor(Math.random() * 365);
        const pastDate = new Date(now - (daysAgo * oneDay));
        
      return {
            id: `TAX-${Math.floor(10000 + Math.random() * 90000)}`,
            date: pastDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            timestamp: pastDate.getTime(),
            reference: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
            customer: customers[i % customers.length],
            grossAmount: 50000 + (Math.random() * 450000),
            status: (daysAgo > 30 ? "Remitted" : "Pending") as "Remitted" | "Pending",
        };
    }).sort((a, b) => b.timestamp - a.timestamp); // Sort newest to oldest
};



import { ProductReview } from "./definitions";

export const generateDummyReviews = (count: number): ProductReview[] => {
    const products = ["Classic White Sneakers", "Wireless Noise-Canceling Headphones", "Vitamin C Serum", "Minimalist Desk Lamp", "Leather Crossbody Bag"];
    const categories: ProductReview["category"][] = ["Fashion", "Electronics", "Beauty", "Home", "Fashion"];
    const customers = ["Amina Y.", "Chuka Obi", "Sarah L.", "Emmanuel K.", "Tolu F."];
    const comments = [
        "Absolutely love this! The quality is way better than I expected.",
        "It's okay, but shipping took forever.",
        "Terrible experience. The item arrived broken.",
        "Five stars! Will definitely be ordering from Tradaz again.",
        "Looks exactly like the pictures. Very satisfied."
    ];
    
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    
    return Array.from({ length: count }).map((_, i) => {
        const daysAgo = Math.floor(Math.random() * 60);
        const pastDate = new Date(now - (daysAgo * oneDay));
        const rating = i % 5 === 2 ? 1 : (i % 5 === 1 ? 3 : 5); // Mix of ratings
        
        return {
            id: `REV-${Math.floor(10000 + Math.random() * 90000)}`,
            productName: products[i % products.length],
            category: categories[i % categories.length],
            customerName: customers[i % customers.length],
            rating: rating,
            comment: comments[i % comments.length],
            date: pastDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            timestamp: pastDate.getTime(),
            status: (i % 4 === 0 ? "Pending" : (i % 5 === 2 ? "Disapproved" : "Approved")) as "Pending" | "Approved" | "Disapproved",
        };
    }).sort((a, b) => b.timestamp - a.timestamp); 
};



import { DiscountCoupon } from "./definitions";

export const generateDummyCoupons = (): DiscountCoupon[] => {
    return [
        { id: "CPN-1", code: "WELCOME20", type: "Percentage", value: 20, usageCount: 145, usageLimit: "Unlimited", expiryDate: "2026-12-31", status: "Active" },
        { id: "CPN-2", code: "FLASH5K", type: "Fixed", value: 5000, usageCount: 50, usageLimit: 50, expiryDate: "2026-03-15", status: "Expired" },
        { id: "CPN-3", code: "VIPFREESHIP", type: "Percentage", value: 100, usageCount: 12, usageLimit: 20, expiryDate: "2026-06-01", status: "Active" },
        { id: "CPN-4", code: "BLACKFRIDAY", type: "Percentage", value: 40, usageCount: 890, usageLimit: 1000, expiryDate: "2025-11-30", status: "Disabled" },
        { id: "CPN-5", code: "NAIJASALES", type: "Fixed", value: 2500, usageCount: 34, usageLimit: 100, expiryDate: "2026-10-01", status: "Active" },
    ];
};


import { GiftVoucher } from "./definitions";

export const generateDummyVouchers = (): GiftVoucher[] => {
    return [
        { id: "VCH-101", code: "TRDZ-A8F9-K2M4", recipientName: "Amina Y.", recipientEmail: "amina@example.com", initialValue: 50000, remainingBalance: 12500, issueDate: "2026-01-10", expiryDate: "2027-01-10", status: "Active" },
        { id: "VCH-102", code: "TRDZ-B2X1-P9Q7", recipientName: "Chuka Obi", recipientEmail: "chuka@example.com", initialValue: 100000, remainingBalance: 0, issueDate: "2025-11-20", expiryDate: "2026-11-20", status: "Fully Redeemed" },
        { id: "VCH-103", code: "TRDZ-M5V3-C8L2", recipientName: "Sarah L.", recipientEmail: "sarah@example.com", initialValue: 25000, remainingBalance: 25000, issueDate: "2026-02-28", expiryDate: "2027-02-28", status: "Active" },
        { id: "VCH-104", code: "TRDZ-J7N8-W4R1", recipientName: "Emmanuel K.", recipientEmail: "emmanuel@example.com", initialValue: 15000, remainingBalance: 15000, issueDate: "2024-12-01", expiryDate: "2025-12-01", status: "Expired" },
        { id: "VCH-105", code: "TRDZ-T9H2-F6D5", recipientName: "Tolu F.", recipientEmail: "tolu@example.com", initialValue: 75000, remainingBalance: 75000, issueDate: "2026-03-01", expiryDate: "2027-03-01", status: "Revoked" },
    ];
};