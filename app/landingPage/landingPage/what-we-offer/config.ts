import { 
    LuStore, LuCreditCard, LuPackage, 
    LuUsers, LuShoppingBag, LuChartBar 
} from "react-icons/lu";

export const OFFERINGS = [
    { 
        id: "01", 
        title: "Custom Storefronts", 
        description: "Create multiple stores under one account. Design with custom colors, fonts, and claim your subdomain.", 
        icon: LuStore, 
        color: "#5cac7d", 
        features: ["Multiple business creation", "Custom subdomains", "No-code design"] 
    },
    { 
        id: "02", 
        title: "Unified POS & Online", 
        description: "Sell anywhere. Process in-store payments with our POS interface or accept secure online orders.", 
        icon: LuCreditCard, 
        color: "#5cac7d", 
        features: ["In-store checkout", "Secure payment gateway", "Unified order tracking"] 
    },
    { 
        id: "03", 
        title: "Smart Inventory", 
        description: "Track stock across all stores in real-time. Get low-stock alerts and manage product variations.", 
        icon: LuPackage, 
        color: "#5cac7d", 
        features: ["Real-time tracking", "Variations management", "Low stock alerts"] 
    },
    { 
        id: "04", 
        title: "Team Management", 
        description: "Add sales reps, stock keepers, and store managers with strict role-based permissions.", 
        icon: LuUsers, 
        color: "#5cac7d", 
        features: ["Role-based access", "Sales rep accounts", "Staff activity logs"] 
    },
    { 
        id: "05", 
        title: "Seamless Shopping", 
        description: "Provide your customers with a fast, intuitive browsing and checkout experience that converts.", 
        icon: LuShoppingBag, 
        color: "#5cac7d", 
        features: ["Smart search & filters", "Fast checkout", "Customer order history"] 
    },
    { 
        id: "06", 
        title: "Powerful Analytics", 
        description: "Make data-driven decisions with an intuitive dashboard tracking revenue, sales, and store metrics.", 
        icon: LuChartBar, 
        color: "#5cac7d", 
        features: ["Revenue tracking", "Store performance", "Exportable reports"] 
    },
];