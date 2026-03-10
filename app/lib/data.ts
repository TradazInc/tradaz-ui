

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
}

import { PromotionCampaign } from "./definitions";

export const generateDummyPromotions = (): PromotionCampaign[] => {
    return [
        { id: "PRM-001", title: "Easter Mega Sale", type: "Store-wide", target: "All Products", discountValue: "15%", startDate: "2026-03-25", endDate: "2026-04-10", revenueGenerated: 0, status: "Scheduled" },
        { id: "PRM-002", title: "Sneakerhead Week", type: "Category Discount", target: "Men's Sneakers", discountValue: "₦10,000", startDate: "2026-02-28", endDate: "2026-03-07", revenueGenerated: 850000, status: "Active" },
        { id: "PRM-003", title: "Weekend Free Delivery", type: "Free Shipping", target: "Orders over ₦50,000", discountValue: "Free", startDate: "2026-02-27", endDate: "2026-03-01", revenueGenerated: 420000, status: "Ended" },
        { id: "PRM-004", title: "Clearance BOGO", type: "Buy X Get Y", target: "Winter Collection", discountValue: "50% Off 2nd Item", startDate: "2026-03-01", endDate: "2026-03-15", revenueGenerated: 120000, status: "Paused" },
    ];
};



import { PopupCampaign } from "./definitions";

export const generateDummyPopups = (): PopupCampaign[] => {
    return [
        { id: "POP-001", name: "Welcome 10% Off", type: "Email Capture", trigger: "After 5 seconds", views: 12500, conversions: 850, status: "Active" },
        { id: "POP-002", name: "Wait! Don't Leave Empty Handed", type: "Exit Intent", trigger: "On Mouse Leave", views: 3200, conversions: 145, status: "Active" },
        { id: "POP-003", name: "Free Delivery This Weekend", type: "Announcement", trigger: "Immediately", views: 45000, conversions: 3200, status: "Paused" },
        { id: "POP-004", name: "Summer Collection 2026", type: "Discount Offer", trigger: "Scroll 50%", views: 8900, conversions: 420, status: "Active" },
    ];
};


import { PromoBanner } from "./definitions";

export const generateDummyBanners = (): PromoBanner[] => {
    return [
        { id: "BNR-001", name: "Free Shipping Alert", message: "Free Delivery on all orders over ₦50,000 this weekend!", ctaText: "Shop Now", ctaLink: "/collections/all", position: "Top Announcement Bar", bgColor: "#5cac7d", textColor: "#ffffff", status: "Active" },
        { id: "BNR-002", name: "Easter Mega Sale", message: "Up to 40% OFF across all categories.", ctaText: "View Deals", ctaLink: "/sale/easter", position: "Hero Slider", bgColor: "#1A202C", textColor: "#F6AD55", status: "Scheduled" },
        { id: "BNR-003", name: "App Download Push", message: "Get 10% off your first order when you shop on our mobile app.", ctaText: "Download", ctaLink: "/app", position: "Mobile Only", bgColor: "#2B6CB0", textColor: "#E2E8F0", status: "Active" },
        { id: "BNR-004", name: "Cart Abandonment Warning", message: "Stock is running out! Complete your checkout to secure your items.", ctaText: "Checkout", ctaLink: "/checkout", position: "Checkout Page", bgColor: "#C53030", textColor: "#FFF5F5", status: "Draft" },
    ];
};


import { ShippingTier, ShippingZone } from "./definitions";

export const generateDummyShippingTiers = (): ShippingTier[] => {
    return [
        { id: "TIER-1", name: "Standard Delivery", estimatedTime: "3 - 5 Business Days", flatRate: 0, status: "Active" },
        { id: "TIER-2", name: "Express Delivery", estimatedTime: "1 - 2 Business Days", flatRate: 3000, status: "Active" },
        { id: "TIER-3", name: "Same Day (Lagos Only)", estimatedTime: "Under 12 Hours", flatRate: 5000, status: "Disabled" },
    ];
};

export const generateDummyShippingZones = (): ShippingZone[] => {
    return [
        { id: "ZONE-1", stateName: "Lagos", basePrice: 2500, status: "Active" },
        { id: "ZONE-2", stateName: "Abuja (FCT)", basePrice: 4500, status: "Active" },
        { id: "ZONE-3", stateName: "Rivers", basePrice: 4000, status: "Active" },
        { id: "ZONE-4", stateName: "Kano", basePrice: 5000, status: "Active" },
        { id: "ZONE-5", stateName: "Oyo", basePrice: 3000, status: "Disabled" },
        { id: "ZONE-6", stateName: "Enugu", basePrice: 4500, status: "Active" },
    ];
};



import { EarningRule, RedemptionRule } from "./definitions";

export const generateDummyEarningRules = (): EarningRule[] => {
    return [
        { id: "EARN-1", action: "Account Creation", description: "Reward customers for signing up.", pointsAwarded: 500, status: "Active" },
        { id: "EARN-2", action: "Product Review", description: "Reward points for verified purchase reviews.", pointsAwarded: 200, status: "Active" },
        { id: "EARN-3", action: "Refer a Friend", description: "Reward points when a referred friend makes a purchase.", pointsAwarded: 1000, status: "Disabled" },
        { id: "EARN-4", action: "Newsletter Signup", description: "Reward points for subscribing to marketing emails.", pointsAwarded: 100, status: "Active" },
    ];
};

export const generateDummyRedemptionRules = (): RedemptionRule[] => {
    return [
        { id: "RED-1", title: "₦1,000 Store Credit", pointsRequired: 1000, discountValue: 1000, status: "Active" },
        { id: "RED-2", title: "₦5,000 Store Credit", pointsRequired: 4500, discountValue: 5000, status: "Active" },
        { id: "RED-3", title: "₦10,000 Store Credit", pointsRequired: 8000, discountValue: 10000, status: "Active" },
    ];
};



import { VatRemittance } from "./definitions";

export const generateDummyVatRecords = (): VatRemittance[] => {
    return [
        { id: "VAT-2603", period: "March 2026", collectedAmount: 145000, remittedAmount: 0, dueDate: "2026-04-21", status: "Pending" },
        { id: "VAT-2602", period: "February 2026", collectedAmount: 280500, remittedAmount: 0, dueDate: "2026-03-21", status: "Overdue" },
        { id: "VAT-2601", period: "January 2026", collectedAmount: 310000, remittedAmount: 310000, dueDate: "2026-02-21", status: "Remitted", firsReceiptNo: "FIRS-202601-A9X" },
        { id: "VAT-2512", period: "December 2025", collectedAmount: 520000, remittedAmount: 520000, dueDate: "2026-01-21", status: "Remitted", firsReceiptNo: "FIRS-202512-B2M" },
        { id: "VAT-2511", period: "November 2025", collectedAmount: 195000, remittedAmount: 195000, dueDate: "2025-12-21", status: "Remitted", firsReceiptNo: "FIRS-202511-C7K" },
    ];
};


import { CustomerChat } from "./definitions";

export const generateDummyChats = (): CustomerChat[] => {
    return [
        {
            id: "CHAT-101",
            customerName: "Amina Yusuf",
            customerEmail: "amina.y@example.com",
            status: "Unread",
            lastMessageTime: "10:42 AM",
            messages: [
                { id: "M1", sender: "Customer", text: "Hello! I ordered the vintage denim jacket yesterday. Can I change the size from M to L before it ships?", timestamp: "10:42 AM" }
            ]
        },
        {
            id: "CHAT-102",
            customerName: "Chuka Obi",
            customerEmail: "chuka.o@example.com",
            status: "Pending",
            lastMessageTime: "Yesterday",
            messages: [
                { id: "M1", sender: "Customer", text: "My tracking number says delivered, but I haven't received anything.", timestamp: "Yesterday, 4:15 PM" },
                { id: "M2", sender: "Admin", text: "Hi Chuka, I'm so sorry about that. Let me check with GIG Logistics immediately.", timestamp: "Yesterday, 4:20 PM" },
                { id: "M3", sender: "Customer", text: "Please do. I really need those items by Friday.", timestamp: "Yesterday, 4:22 PM" }
            ]
        },
        {
            id: "CHAT-103",
            customerName: "Sarah Lawal",
            customerEmail: "sarah.l@example.com",
            status: "Replied",
            lastMessageTime: "Mon",
            messages: [
                { id: "M1", sender: "Customer", text: "Do you guys do wholesale discounts? I want to buy 50 pieces for my boutique.", timestamp: "Mon, 9:00 AM" },
                { id: "M2", sender: "Admin", text: "Hello Sarah! Yes we do. For 50 pieces, we can offer a 20% bulk discount. Would you like me to send a custom invoice?", timestamp: "Mon, 10:15 AM" }
            ]
        }
    ];
};


import { ExchangeRequest } from "./definitions";

export const generateDummyExchanges = (): ExchangeRequest[] => {
    return [
        {
            id: "EXC-9021",
            orderId: "#TRD-8021",
            customerName: "Amina Yusuf",
            customerEmail: "amina.y@example.com",
            returnItem: "Vintage Denim Jacket (Size: M)",
            returnItemImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEA8PDw8PDw8PDw8PDw8QDw8NDw8PFRUWFxURFRYYHSggGBomGxUVITEhJSkrLi4vFx8zODMsNyktLisBCgoKDg0OGxAQGjAlICU3ListMC0tLS0tLS0tLSstLSsrKysrLS0tLSstLS0tLS0tLS0tKy0tLS0tLS0tLTUtLf/AABEIARMAtwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAABAgAEAwYHBQj/xAA/EAABBAEBBAgCBwYFBQAAAAABAAIDEQQhBRIxQQYHEyJRYXGBkbEUIzJCUqHBYnKCkqLwJENTstEVM0Rj8f/EABoBAQACAwEAAAAAAAAAAAAAAAAEBQECAwb/xAAtEQACAQMDAgMIAwEAAAAAAAAAAQIDBBESITEyQQUiMxNRYYGRodHwI3HBFP/aAAwDAQACEQMRAD8A3ilKT0jSASkaTUjSASkaTUjSASkaTUjSASkaTUpSAWkaTUpSAWlKTUpSAWkKT0hSAxkJaWUhLSAxkJCFmISEIDCQgQsjglIQGItUT0igLlI0mpGkAtKUnpSkAlI0npSkAlKUnpSkAtKUmpSkAtI0mpSkAtKUmpSkAlKUmpSkBjIS0spCWkBjISkLKQlIQGEhIQsxCRAYyFE5CCAu0jSNI0gAAjSNI0gFpSk1KUgFpSkyiAVRGkUAtKUmUpACkKTIIAUoiogEKWlkKWkAhCUrIQlIWQYykpZCEtLAEIUTEKIC2AmpSkaWQSlKRpGlgC0ompSkAFEUEAEFU2rtBuNE+Z+oYBTRoXOJAaPiQuTbV6zc1sz2wujaxpquyjcARxFuBPkpNK1nUWpbL4mkqijsdkUXCpeszaZ4TNb6Q4/6sXnZXTnaUmjsuUfuHs/9tLr/AMTXMl9zX2q9x9DFRaP1YbWlniMcj3SVFC9pcS52847jxZ8XFtDzK3gFR61F0paTeMtSyRRFRcTYUoJkEApSkJylKyDGQlWQpSEAhCiYhRAW6RRUWARRFRABRFeZtrbuPhtuV/fItsTdZHe3IeZW8Kcpy0xWWYbSWWelS1zb/S7HxQ5rSJpRfdae60/tO/Qa+i0fpD01mybY09lEf8thOo/adxd6aDyWo5eXdE8LF+l6q7t/CVFaqz+S/wBZDqXWdoHXOsSR0eD3jbmswZHngC+QZO8a8LY34BcOMTCSe8CSSdb1XYeszL7TY0WQP/KxMJpPhNDMzu+tTTfyLjcRPNLRx0aGuGKuc5THGOznvH3A/RMIYhruA+pcUhCxyNPiVMelLpOSbfc6z1Rs3g5wG6DLiRMA4aSumcB6Ng/NWcnpc/FzMuIASwMyZ91hO65g7R1hrvC70N+ysdTjBHhRzvrci+m5kp5iqhjP8rMlc1zcx0ks8h+0+Ql1fiOrv6iVGoQhXrS1rbb9+33Ok26cFg7XsbpHjZdCN+7J/pPpr/bk72JXrFfPcWUQQRyr1C3LYPT6WGmTnt4+HeP1rR5OP2vQ/FcrnwhrzUX8n+Tandp7SOopVU2VtWHLZ2kDw4feHB7D4OHJXFSyjKL0yWGS001lAKUpylKwZEKUpykKAhUUKiAuKKIrAAoiggPD6YbeGBjOl07Rx3IWnW3n71eAGvw8VxfKznzEyPeXueSXOJskq91i7cdmTycRHCXRRMOhAadXEciSL+A5LXsF/wBWPdeo8PoqgtLW7WX+CtuJ691xwZnOVeYF43BqTpxr8/BWHKnM4jUcQbCmVXscKfJsk22Zp8TH2X3ZN2QvjAvedI8UGje/aLq/fK18wFpLXAtcCQWuBa5p5gg6g+S9fZWWJZMUkd5k0bmVpR7RpI+K7v0g6GYW0STNFuyDQZEJ7KXyBPB38QNKBXuIW7jlbPPBJjTdRPD3R84GNIW6Fdtk6n8UWPpmS3w3mwu/MAWlx+qPAbRlmypiQS1hcyFpArU7rd4D+LmucvErfG2foZVvU7mp7L6Qsw+jpZvXLkTzRkc2wMfe77ucR/E7wWi7OkJY4u4ucT7nUn4qdJyHNx3NEETXGVoxoN8djuOA3n7xO851nUkmhxUgFRgLpZdcsfH6v8GK/SjM13NebJM7eJvmrxOhXnO5qTcSeFg5UlybD0Y6QS40rZIzRboQfsvbzDvELuWwtrx5kLZojx0ew6ujfzaf71FL5ywx4Le+gOVlMymMxmOl7ShNHwaYhxeSdG1r3j6c6US6tlXpa3tJd/edqdTRPSuGdhKBTJSvOk8QpU5SoBVEUVgFtFRRABQCyB5op4BbggNI6zegAyWPzMRtZLQXSxDhkADUt/b+fquMYn2W+gPxX1NnyENFL5w6UANz8wNAa0ZEtAaAam/ztXfhdeUnol24IV1BJZRQdwVHIVx50VGcq3rvykWmtzNsTLEUkbnfZZNG81qaDhdL6hjynM3AWinEdk9pPZyNIsangfI/mvk+Ln6hfTXQbPdk4OI0i2jFiEjjTgaG6B69324+CoL7eEX7tifR2kzZY3GQG9GixfHed4jyC8faEskXaved/uUxw/CONjxuvVejml8TSW95oGg4bnw5ea1/OyC3Eypprs40sjRr3GNa4tJ8yST5ClWxWXgkHzLOS57fUn816h0aAvNgFyei9CReotlhSZW1eUhie6vPfxKvu4KnLobW9bfBrTPX6K7HkzsiLFhrffq5x+zGwfaefID46DmvonYWwMfZ8IggbroZJDXaSu/E4/IcByWhdSGyQyKfMIBdLJ2MZ8I2AF1erjX8AXT3lUd9cSlL2aeyJ1KCS1d2UZW0SsZVnKHAquVXnYQhIVkKUhZAqihCKwC2ioogAs2INT6LErGIOJQGHbT92Mnw1Xzht2XfzMp34smYj03yvoTpRIRjy1+B3yXzhM65Xk83uJ9yVbeF9TZFuuECQ6KnOrUhVWfgrmtuiHTMeE0FxB4fBfRPVlE8bLxHMNgMka+OgCXtkc0vB5mgND4ey+dMQ08eei731TZ7pMJkLb7jnku/02lxJ99fiqa7SdDPfP5JlNv2mDeGW8240wEXy33fg9BxPw8Vo/WPM3Gwc4sdYnaIt0my3ec1rqHgd5bptOI1vRup7WmgXHddpzvn5rk/WNOY9n7znB0s+S3jRLI2doWjytzCT6AclXUFmpEkS4ZynZ7dXE+KtvOqw4h7u8TZJJJ8ynJXpaSxTSK+e82ZCVhmH5hZLSyfdW890ax2Z37qwhEezMJo+8x8h9Xvc79VtpWp9XMods/Er7sLWH1C2ory1Xrf9ss48Czix6KoVdOopUyFzMmMoFMlKACiKCAtoqKICKzjDT4qsrcOjQgNf6cTBmHO4mqY4/kvnkauefP5ld16yX/4GceLSPiuGSAAv/fIHoP/AKrbwzlkS64RjesDwszlhermfBFiU26O913vqixmvwC4Exv7eTvtOrvskNcOY158Na5rgrxquy9U+RIMdjAKbLJJuPru6GnEu5VpodTYriqa82pNfFEyn1ZOhTtc6VscmjG1v+EgJFNHjfPyBXMOuuRjo4i2t58rXPqhdMeG/k4/kurZrY2xhpIH2qk+/vEUXg+P6LivWWD2TN7VxlB3qI+qMf1ZB8CGuPv4hQbX1V+9jtPpNDxT3QFkWLFOiyOK9FB+VECXUS0ZuA9Ulp3atTOTHc7l1TE/9PjB5OfXoSt2WidUF/8ATwTzlkA9Af8Am1vbF5uusVJL4ljDpQb0VWUa+qsHisWQOa4mxgKUpylKAUqIqIC0ioogAVaGgVYDUeoViQ6IDSus6QfQnjXVzR+a47trD7CRsZNu7KGV/DR8rGyFvsHgey6z1pvvDI87+C5d0tk3s3IPg8M9mNa0fJWnhvW/6I110o8YrE5ZCl3VdPdENFV41XZOpLIacbKZJuG5+8HAmRwLGluv7wefU2uPEalb11TTPbNM1kLJbEZc913A0FwMmmu73ta8lWXsf4pfvclUn5kdc2zE0d1zt6FtGTm6vuxXy3iKvwvmuc9aMjMqWCEOZFeQyJ0rr3Iw7eFmuQ1PxXS83KjZEWinNvUm++41bj4fpS5B1hROZACRXazMmY7mYwx4YCORp1n94KrtvVRIn0mjFgY97A4PDHOZvt+y/dJG8PI1fumeq0Hj4rOr+m/KQp8ip2O7rr/u/wCwg5e91fZLY9o42+GuZI50D2uAcC2RpZz8yFictKyEs7HS+p+S8Dd/DNIPjR/VdAba5x1UMMH0/FN3j5skevGhTb/pXR2OKoK7zUkydBYihg1Y5mmime88tEmvNcTYwBBQcx4FQoBSoiogLSKARQBj40ss1UscI73spkFAaF1mRb0Oh0bqR4rlG3X72ROfGaX/AHFdU6xHjsHAcS4D/hck2k65ZD4yyn+oq18O6myLc8IqOKN6IOCF0rhPBEEYNT5reOqXM7DNls010BBq+T2EcFpFA+PHWuNeS2LojGDnObC5xYGksdIWxvLA5upo1ah3npSR3pdSZ2jIxmTjuMcYmkGUDTe57jfXS/L2XO+tPP7aPRtNa5pB8u8B8l0T6cGwAMbusaKAPHTiSfG1zbrBxS3Hc91Dtntk3KoxtDnho9w668SqS39WJMn0s5tBwCskKtHwCzWr+HBBnyNSmPOYpI5RxjeyQerSCPklJSv4LM+DCO79GsSsvOyWG2zTtbI38L+yie148j2hB8wPHTdGyClpHV7L2jcr9tuDLf7+LGL/AKFt+FLvDXiNCPPmvOVFhlgiwCOJSOceSyPF6BZYoq1K0MlB4p3qPzH9lQo5z9QRwDhaBQAUUUQFlFBEIDJF4rFMeJWUGgVUldx8EBpPTN++xkdAFzgSfDzXHsrj8fmux7axTLkxsGoe8NA8iaXGchxJ1FHmPA+CtfD31fIi3PYxWoUthM5wAtWqfvI2BWLYOhcJOS4g1uxOeT4AObqvCgbpZ5r2ei+bBDJMZpWxNdD2bS9rnNcS5ttNAnha4Xa/gbOlL1Dr2ypg+IPolulBw+2R96vX4rT+sqU9jvXvd5pviBR5j1HD1WxbI21hmNlZeKBXDt421XkSD8VrHWVlw/R9yOaJ7nva4sY9khIAPf0OnEBUdun7SOxNn0s55tLaD8maXIk3d+aQvdujdbZ8AsYWFo09CsrToFex22IUhkj0znLGNUm+xhHauqbIbJFNukHchwY3eTmRubXwAW7HuSA8nfPmud9STh2WYBxEkJPpT6+RXSpmbw8xqPVUVwsVGidB5jksxm1lkdpSqYzwRr8FZ3QeC4GxTyoe643yKxwP3mtd4tB9+as5J7pCoYDu6W/he4e3EfNAWEUFEBZRadQktYcvNZA0ySuayNtbz3Hda2yACTyFkaoC3O7RVnMJ4+qkO1scje7WMt8Q9pHxtNNnwubbHAg8C3UfEJgHi4kQdlA8dxr3D14fqufdb+wYoXxZUMJZ2vafSHMH1Yktu44j7pdb9edePHpezIu/JJyIDWnx1s/oqHSjIZGWPmjyBFuOH0vHBkdASdRIwA2wiuLXNtuo4LvQqOEso0nFSWD51dIl7TRdkGxdnZR3o8jY8183QNjmJ/aMUrBf8IWidYGyYcbJiiiZAz6kSOMDpnMdvOcBo9zqPd5HmrGnXc5aThKmorJrcc5NNAs8AACSfZYMgggeZ/RehgxyCRpg3hKN4t3PtUGkur2tdP6mtnRyY+XNLGyQuyGxgyMa/wCywONWP/YutxOUYPVua04pvY45F5K01lB3mB819LP6P4TvtYeKfXHi/wCFpfWvsKCPZ4kgx4YTHkRFzo4o4yWOD2USBw3nN/JQqNwnNI6yp7ZOQQjum0kmmiubXwXYs0mO+SOR0e6C+I7zDvNDgQf4q9lVxsSab/txSykHdPZxvk18NArKdWOhNHDQ8ld1p42+JpezD0VynECQR496hs0jWyH0ibbz/KvbwuiDYt2SZz36jcDozC0uPBrYz9Y918AQ2/A8DDlXijqoNnRurXo2MHFEji4zZTI5ZWmqjFEsYK5gO11Oq3BYMRpEcYIohjARxogCwstqsnJyllkhLCwYz3XeuqtxyWFVkCwZO0YoQTJIyMNGpe9rAPWytDJem1C8zGJbJI08w1w9RYPzC1/anWPs+LujIbIa/wAlrph/M0bv5q10T2kzOYc1heGF0kTGOABG6RbjRPGls4SW7QybDaiW1FgGbeXi9LsUZGK+B27uyuYHAz/RbAcHaP3Xa2BpWq9TeWOaBklCRjH7ptu+1r900RYvgaJHutls8g5Rl9WjD3mR5hv8EmBMPi5zCqzOrtwLGkZzGvexjj/ggGhxALiGynhd8+C6hN0cxH39Q2Mk2XQOfiOJ83RFpKTG6M48cjJWuyi6N28A/Ny5WE/tNe8ghdXVeN2a6Ue7CwMa1rRTWgNaPAAUAmSAo2o5sUczYmJNfa4uNKTxL4Ink+5Cou6H7NOn0DE9oWNPxAXuWot1Uku4NYm6vtluN/Rd0j8E+RGPgH0va2JseDCi7DGZ2ce859Fz5CXGrJLiTyHwVy1LSVSclhswkkPa8PprgOycDKiZRcYi9oIu3MIeB620L2bUtYjLS0zLWT5oytmNc+NuF22SHQQyP3InOcydzbkjpo4A8PVbr0E2fPAydk+zNoSukcx0YaXY0OgIIk33taeXEFdehibG0NY1rGjg1jQxo9AE9qVUutSxg5qnh5NPw9kZ5FMbh7MjP3IYxlT14k91gPs5e3snYMOO7tDvzz0Qcid3aSa8Q37sY8mgBeooozmb4HtLaBKUlamRiVq3S/YmG/8AxeQ3FY5gax82Qx0jdy6a2t9ouzxN+C2a0kjA4EOAcDxBAIPsVtGWGDlxxNlm9zIwCR/pYUDz8nLa+gb/AKqaMNk7NkxLJXwjHbJvDUNbut0FcQK14nVbKGgaAADyFBQlZcsgNopLUWgMtJgFAisAlI0jSiACJRpQoBUUKRAQEUpFRAClKTUhSAWlESggIoojSAQhKQslJSEAlJaWQhKQsgQpSshCUhAIgnpRAWUUaUCwCI0iogIgVCpaAChRRKARFAhEBAEKKUogFKCekKQACiNI0gFQKekCgEKWk5CCASkCFkQIQCUgmIUQGekwUpRARQqIIAKAI0iAgAEaRpFALSlJkEAEEUaQApRFBAAqKI0gFUpNSlIBKUpEoIAII0jSAQhRNSiAyqKKIAFQIKIBkQoogIoFFEAUpUUQECKiiAhSqKICBEKKIAoFRRAKUAgogCooogIgoogP/9k=",
            requestItem: "Vintage Denim Jacket (Size: L)",
            requestItemImage: "data:image/jpeg;base64,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",
            reason: "Item is a bit too tight across the shoulders.",
            dateRequested: "2026-03-03",
            status: "Pending"
        },
        {
            id: "EXC-9022",
            orderId: "#TRD-7944",
            customerName: "Chuka Obi",
            customerEmail: "chuka.o@example.com",
            returnItem: "Nike Air Force 1 (White)",
            returnItemImage: "https://via.placeholder.com/50/1A1C23/FFFFFF?text=WHT",
            requestItem: "Nike Air Force 1 (Black)",
            requestItemImage: "https://via.placeholder.com/50/5cac7d/FFFFFF?text=BLK",
            reason: "Changed my mind, prefer the black colorway.",
            dateRequested: "2026-03-02",
            status: "Approved"
        },
        {
            id: "EXC-9023",
            orderId: "#TRD-7810",
            customerName: "Sarah Lawal",
            customerEmail: "sarah.l@example.com",
            returnItem: "Minimalist Leather Tote (Brown)",
            returnItemImage: "https://via.placeholder.com/50/1A1C23/FFFFFF?text=BRN",
            requestItem: "Minimalist Leather Tote (Black)",
            requestItemImage: "https://via.placeholder.com/50/5cac7d/FFFFFF?text=BLK",
            reason: "The brown doesn't match my usual outfits.",
            dateRequested: "2026-02-28",
            status: "Completed"
        },
        {
            id: "EXC-9024",
            orderId: "#TRD-7705",
            customerName: "Emmanuel K.",
            customerEmail: "emmanuel.k@example.com",
            returnItem: "Wireless Earbuds Pro",
            returnItemImage: "https://via.placeholder.com/50/1A1C23/FFFFFF?text=POD",
            requestItem: "Gaming Headset Max",
            requestItemImage: "https://via.placeholder.com/50/5cac7d/FFFFFF?text=MAX",
            reason: "I want to upgrade. Willing to pay the difference.",
            dateRequested: "2026-02-25",
            status: "Rejected"
        }
    ];
};



import { RefundRequest } from "./definitions";

export const generateDummyRefunds = (): RefundRequest[] => {
    return [
        {
            id: "REF-5011",
            orderId: "#TRD-8102",
            customerName: "Amina Yusuf",
            customerEmail: "amina.y@example.com",
            itemName: "Vintage Denim Jacket (Size: M)",
            itemImage: "https://via.placeholder.com/50/1A1C23/FFFFFF?text=M",
            refundAmount: 24500,
            reason: "Item arrived damaged. I sent pictures to support.",
            dateRequested: "2026-03-04",
            status: "Pending"
        },
        {
            id: "REF-5012",
            orderId: "#TRD-8055",
            customerName: "Chuka Obi",
            customerEmail: "chuka.o@example.com",
            itemName: "Nike Air Force 1 (White)",
            itemImage: "https://via.placeholder.com/50/1A1C23/FFFFFF?text=WHT",
            refundAmount: 85000,
            reason: "Delivery took too long, bought it somewhere else.",
            dateRequested: "2026-03-01",
            status: "Processing"
        },
        {
            id: "REF-5013",
            orderId: "#TRD-7930",
            customerName: "Sarah Lawal",
            customerEmail: "sarah.l@example.com",
            itemName: "Minimalist Leather Tote (Brown)",
            itemImage: "https://via.placeholder.com/50/1A1C23/FFFFFF?text=BRN",
            refundAmount: 45000,
            reason: "Quality wasn't what I expected.",
            dateRequested: "2026-02-25",
            status: "Refunded"
        },
        {
            id: "REF-5014",
            orderId: "#TRD-7812",
            customerName: "Emmanuel K.",
            customerEmail: "emmanuel.k@example.com",
            itemName: "Wireless Earbuds Pro",
            itemImage: "https://via.placeholder.com/50/1A1C23/FFFFFF?text=POD",
            refundAmount: 15000,
            reason: "Changed my mind.",
            dateRequested: "2026-02-20",
            status: "Rejected"
        }
    ];
};


import { ReconciliationRecord } from "./definitions";

export const generateDummyReconciliations = (): ReconciliationRecord[] => {
    return [
        {
            id: "REC-260304",
            settlementDate: "2026-03-04",
            gateway: "OPay",
            expectedAmount: 450000,
            gatewayFee: 6750, // Assuming a 1.5% fee
            actualPayout: 443250,
            status: "Matched"
        },
        {
            id: "REC-260303",
            settlementDate: "2026-03-03",
            gateway: "Cash on Delivery",
            expectedAmount: 125000,
            gatewayFee: 0,
            actualPayout: 115000, // Short by 10k!
            status: "Discrepancy",
            notes: "Logistics partner reported one failed delivery, awaiting return."
        },
        {
            id: "REC-260302",
            settlementDate: "2026-03-02",
            gateway: "Bank Transfer",
            expectedAmount: 85000,
            gatewayFee: 50, // Flat transfer fee
            actualPayout: 84950,
            status: "Matched"
        },
        {
            id: "REC-260301",
            settlementDate: "2026-03-01",
            gateway: "Monie Point",
            expectedAmount: 320000,
            gatewayFee: 4800,
            actualPayout: 0,
            status: "Pending",
            notes: "Awaiting T+1 settlement from gateway."
        }
    ];
};




export const STORE_BANNERS = [
  {
    id: 1,
    title: "Get Special Offer",
    subtitle: "Up to 40% Off",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1000&auto=format&fit=crop",
    cta: "Claim Now",
    color: "#E53E3E"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Premium Urban Wear",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000&auto=format&fit=crop",
    cta: "Shop Collection",
    color: "#5cac7d"
  },
  {
    id: 3,
    title: "Weekend Deals",
    subtitle: "Buy 1 Get 1 Free",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1000&auto=format&fit=crop",
    cta: "Shop Deals",
    color: "#3182CE"
  },
  {
    id: 4,
    title: "Street Style",
    subtitle: "Urban Fashion Collection",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    cta: "Explore Now",
    color: "#805AD5"
  },
  {
    id: 5,
    title: "Limited Edition",
    subtitle: "Exclusive Drops",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop",
    cta: "Shop Now",
    color: "#DD6B20"
  }
];

export const STORE_PRODUCTS = [
    {
        id: "PROD-1",
        name: "Minimalist Urban Jacket",
        category: "Clothes",
        price: 45000,
        originalPrice: 60000,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=500&auto=format&fit=crop",
        rating: 4.8,
        reviews: 124,
        isNew: true
    },
    {
        id: "PROD-2",
        name: "Yeezy Boost 350 V2",
        category: "Shoes",
        price: 120000,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500&auto=format&fit=crop",
        rating: 4.9,
        reviews: 312
    },
    {
        id: "PROD-3",
        name: "Matte Black Smartwatch",
        category: "Watch",
        price: 85000,
        originalPrice: 95000,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=500&auto=format&fit=crop",
        rating: 4.5,
        reviews: 89
    },
    {
        id: "PROD-4",
        name: "Vintage Leather Tote",
        category: "Bags",
        price: 55000,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=500&auto=format&fit=crop",
        rating: 4.7,
        reviews: 56
    }
];

export const STORE_CATEGORIES = [
    { name: "Clothes", icon: "👕" },
    { name: "Electronics", icon: "💻" },
    { name: "Shoes", icon: "👟" },
    { name: "Watch", icon: "⌚" },
    { name: "Bags", icon: "🎒" }
];


//carts data 

import { CartItems } from "./definitions";

export const MOCK_CART_ITEMS: CartItems[] = [
    {
        id: "v1-001",
        productId: "PROD-1",
        name: "Minimalist Urban Jacket",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=500&auto=format&fit=crop",
        price: 45000,
        size: "L",
        color: "Black",
        quantity: 1
    },
    {
        id: "v2-002",
        productId: "PROD-2",
        name: "Yeezy Boost 350 V2",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=500&auto=format&fit=crop",
        price: 120000,
        size: "EU44",
        color: "Core Black",
        quantity: 1
    }
];

// app/lib/data.ts
import { ChatSession, Message } from "./definitions";

export const MOCK_CHATS: ChatSession[] = [
    { 
        id: "TRD-9823-XYZ", 
        orderName: "Minimalist Urban Jacket", 
        lastMessage: "When will my item arrive?", 
        status: 'active', 
        unread: true 
    },
    { 
        id: "TRD-4451-ABC", 
        orderName: "Yeezy Boost 350 V2", 
        lastMessage: "Thank you for the refund.", 
        status: 'resolved' 
    },
];

export const MOCK_MESSAGES: Message[] = [
    { id: "1", sender: 'user', text: "Hello, I have an issue with order TRD-9823-XYZ.", timestamp: "10:30 AM" },
    { id: "2", sender: 'admin', text: "Hi Wada! I'm here to help. What seems to be the problem?", timestamp: "10:32 AM" },
    { id: "3", sender: 'user', text: "The size I received is L, but I ordered XL.", timestamp: "10:35 AM" },
];