import { ElementType } from "react";

// Sign In Type Definitions
export interface SignInData {
  email: string; 
  password: string;
}
export interface SignInResponse {
  token: string;
  user: User;
}

export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string | null;
  is_verified: boolean;
  email_verified: boolean;
  phone_verified: boolean;
}

// signup
export interface SignUpData {
  name: string;
  email: string;
  password: string;
}



// Onboarding Type Definitions
export interface OnboardingData {
  businessName: string;
  subDomain: string;
  about: string;
  address: string;
  phone: string;
  category: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  logo: File | null;
}

//  interface for all three of your form steps!
export interface StepFormProps {
  data: OnboardingData;
  update: (newData: Partial<OnboardingData>) => void;
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
}



// Dashboard & Store Definitions
export interface Business {
    id: string;
    name: string;
    category: string;
}

export interface Store {
    id: string;
    name: string;
    address: string;
}

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    activeBusiness: Business;
    availableStores: Store[];
    activeStoreId: string;
    onStoreChange: (id: string) => void;
}

//Dashboard Header
export interface DashboardHeaderProps {
    businesses: Business[];
    activeBusiness: Business;
    onBusinessChange: (id: string) => void;
    onOpenSidebar: () => void;
}

export interface MetricCardProps {
    title: string;
    value: string;
    trend: string;
    icon: ElementType;
    isNegative?: boolean; 
}


export interface SalesRecord {
    id: string;
    type: string;
    transaction: string;
    date: string;
    payment: string;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
}


export interface InventoryProduct {
    id: string;
    name: string;
    image: string;
    vendor: string;
    brand: string;
    sku: string;
    variations: number;
    stock: number;
    price: number;
    isFeatured?: boolean;
    isFavorite?: boolean;
}


export interface OnlineOrder {
    id: string;
    customer: string;
    date: string;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    paymentStatus: "Paid" | "Unpaid" | "Refunded";
    shippingMethod: string;
    total: number;
}


export interface Customer {
    id: string;
    name: string;
    handle: string;
    email: string;
    orders: number;
    spend: number;
    status: "Active" | "Inactive";
    // tier: "VIP" | "Loyal" | "New" | "Standard";
    joinedDate: string;
}


export interface CartItem {
    id: string;
    name: string;
    variant: string;
    price: number;
    qty: number;
    stock: number;
}

export interface StaffSalary {
    id: string;
    name: string;
    role: string;
    salary: number;
    status: "Paid" | "Pending" | "Unpaid";
    bank: string;
    accountLast4: string;
}


export interface Expense {
    id: string;
    description: string;
    category: "Inventory" | "Marketing" | "Operations" | "Utilities" | "Payroll";
    amount: number;
    date: string;
    status: "Cleared" | "Pending";
    reference: string;
}



export interface RevenueTransaction {
    id: string;
    source: string; 
    channel: "Online" | "POS" | "Subscription";
    amount: number;
    date: string;
    status: "Completed" | "Pending" | "Refunded";
    reference: string;
}



export interface TaxableSale {
    id: string;
    date: string;
    timestamp: number; // Used for the 1M/3M/6M time toggles
    reference: string;
    customer: string;
    grossAmount: number;
    status: "Remitted" | "Pending";
}


export interface ProductReview {
    id: string;
    productName: string;
    category: "Fashion" | "Electronics" | "Beauty" | "Home";
    customerName: string;
    rating: number; // 1 to 5
    comment: string;
    date: string;
    timestamp: number;
    status: "Pending" | "Approved" | "Disapproved";
}


export interface DiscountCoupon {
    id: string;
    code: string;
    type: "Percentage" | "Fixed";
    value: number; // e.g., 15 for 15% or 5000 for ₦5,000
    usageCount: number;
    usageLimit: number | "Unlimited";
    expiryDate: string;
    status: "Active" | "Expired" | "Disabled";
}


export interface GiftVoucher {
    id: string;
    code: string;
    recipientName: string;
    recipientEmail: string;
    initialValue: number;
    remainingBalance: number;
    issueDate: string;
    expiryDate: string;
    status: "Active" | "Fully Redeemed" | "Expired" | "Revoked";
}


export interface PromotionCampaign {
    id: string;
    title: string;
    type: "Store-wide" | "Category Discount" | "Buy X Get Y" | "Free Shipping";
    target: string; // e.g., "All Products", "Sneakers", "Orders over ₦50k"
    discountValue: string; // e.g., "20%", "Free", "₦5,000"
    startDate: string;
    endDate: string;
    revenueGenerated: number;
    status: "Scheduled" | "Active" | "Paused" | "Ended";
}



export interface PopupCampaign {
    id: string;
    name: string;
    type: "Email Capture" | "Announcement" | "Discount Offer" | "Exit Intent";
    trigger: string; // e.g., "After 5 seconds", "On Exit", "Scroll 50%"
    views: number;
    conversions: number; // e.g., emails submitted or buttons clicked
    status: "Active" | "Paused";
}



export interface PromoBanner {
    id: string;
    name: string;
    message: string;
    ctaText: string;
    ctaLink: string;
    position: "Top Announcement Bar" | "Hero Slider" | "Checkout Page" | "Mobile Only";
    bgColor: string;
    textColor: string;
    status: "Active" | "Draft" | "Scheduled";
}


export interface ShippingTier {
    id: string;
    name: string;
    estimatedTime: string;
    flatRate: number; // Use 0 if the price strictly depends on the state
    status: "Active" | "Disabled";
}

export interface ShippingZone {
    id: string;
    stateName: string;
    basePrice: number;
    status: "Active" | "Disabled";
}


export interface EarningRule {
    id: string;
    action: string; // e.g., "Account Creation", "Leave a Review"
    description: string;
    pointsAwarded: number;
    status: "Active" | "Disabled";
}

export interface RedemptionRule {
    id: string;
    title: string;
    pointsRequired: number;
    discountValue: number; // The Naira value of the discount
    status: "Active" | "Disabled";
}


export interface VatRemittance {
    id: string;
    period: string; // e.g., "January 2026"
    collectedAmount: number;
    remittedAmount: number;
    dueDate: string;
    status: "Pending" | "Remitted" | "Overdue";
    firsReceiptNo?: string;
}


export interface ChatMessage {
    id: string;
    sender: "Customer" | "Admin";
    text: string;
    timestamp: string;
}

export interface CustomerChat {
    id: string;
    customerName: string;
    customerEmail: string;
    status: "Unread" | "Pending" | "Replied";
    lastMessageTime: string;
    messages: ChatMessage[];
}


export interface ExchangeRequest {
    id: string;
    orderId: string;
    customerName: string;
    customerEmail: string;
    returnItem: string; // What they are sending back
    returnItemImage: string;
    requestItem: string; // What they want instead
    requestItemImage: string;
    reason: string;
    dateRequested: string;
    status: "Pending" | "Approved" | "Rejected" | "Completed";
}


export interface RefundRequest {
    id: string;
    orderId: string;
    customerName: string;
    customerEmail: string;
    itemName: string;
    itemImage: string;
    refundAmount: number;
    reason: string;
    dateRequested: string;
    status: "Pending" | "Processing" | "Refunded" | "Rejected";
}


export interface ReconciliationRecord {
    id: string;
    settlementDate: string;
    gateway: "OPay" | "Monie Point" |"Bank Transfer" | "Cash on Delivery";
    expectedAmount: number; 
    actualPayout: number;   
    gatewayFee: number;     
    status: "Matched" | "Discrepancy" | "Pending";
    notes?: string;
}




// STOREFRONT DEFINITIONS

export interface CustomerSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    activePath?: string;
    brandColor?: string; 
    storeName?: string;
}

export interface HeaderProps {
    onOpenSidebar: () => void;
    brandColor?: string;
    storeName?: string;
}



export interface CartItems {
    id: string;
    productId: string;
    name: string;
    image: string;
    price: number;
    size: string;
    color: string;
    quantity: number;
}

export interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    brandColor?: string;
}

export interface StorefrontProduct {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
}


// app/lib/definitions.ts

export interface StoreProduct {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    isNew?: boolean;
}

export interface ProductDetailViewProps {
    product: StoreProduct;
    onBack: () => void;
    brandColor?: string;
}


export interface Message {
    id: string;
    sender: 'user' | 'admin';
    text: string;
    timestamp: string;
}

export interface ChatSession {
    id: string; 
    orderName: string;
    lastMessage: string;
    status: 'active' | 'resolved';
    unread?: boolean;
}

export interface Coupon {
    id: string;
    code: string;
    discount: string;
    description: string;
    expiryDate: string;
    minSpend?: number;
    status: 'active' | 'used' | 'expired';
}

export interface GiftCard {
    id: string;
    code: string;
    balance: number;
    initialValue: number;
    expiryDate: string;
    status: 'active' | 'empty' | 'expired';
}


export interface PendingReview {
    id: string;
    orderId: string;
    productName: string;
    productImage: string;
    deliveredDate: string;
}

export interface PastReview {
    id: string;
    productName: string;
    productImage: string;
    rating: number;
    comment: string;
    date: string;
}