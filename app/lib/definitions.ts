import { ElementType } from "react";

// Sign In Type Definitions
export interface SignInData {
  login: string;
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

// Register Type Definitions
export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  subscribed_sms_campaigns: boolean;
  subscribed_email_campaigns: boolean;
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