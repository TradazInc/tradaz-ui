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
    shipping: string;
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