

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



import { CustomerChat } from "./definitions";

export const initialChats: CustomerChat[] = [
    {
        id: "CHAT-001",
        customerName: "Joy Iwuofor",
        customerEmail: "joy@example.com",
        status: "Pending",
        lastMessage: "I haven't received my tracking number yet.",
        timestamp: "10:41 AM",
        unreadCount: 2,
        messages: [
            { id: "m1", text: "Hello, I placed an order yesterday.", timestamp: "10:30 AM", isAgent: false },
            { id: "m2", text: "Hi Joy! I'd be happy to check on that for you. What is your order number?", timestamp: "10:35 AM", isAgent: true },
            { id: "m3", text: "It is ORD-20268004.", timestamp: "10:40 AM", isAgent: false },
            { id: "m4", text: "I haven't received my tracking number yet.", timestamp: "10:41 AM", isAgent: false },
        ]
    },
    {
        id: "CHAT-002",
        customerName: "Adebayo Ogunlesi",
        customerEmail: "adebayo@example.com",
        status: "Open",
        lastMessage: "Can I change the shipping address?",
        timestamp: "09:15 AM",
        unreadCount: 1,
        messages: [
            { id: "m1", text: "Can I change the shipping address for my recent purchase?", timestamp: "09:15 AM", isAgent: false },
        ]
    },
    {
        id: "CHAT-003",
        customerName: "Sarah Connor",
        customerEmail: "sarah@example.com",
        status: "Resolved",
        lastMessage: "Thanks, that worked perfectly!",
        timestamp: "Yesterday",
        unreadCount: 0,
        messages: [
            { id: "m1", text: "My discount code isn't applying at checkout.", timestamp: "Yesterday", isAgent: false },
            { id: "m2", text: "I've refreshed the code on our end. Please try applying it one more time!", timestamp: "Yesterday", isAgent: true },
            { id: "m3", text: "Thanks, that worked perfectly!", timestamp: "Yesterday", isAgent: false },
        ]
    }
];