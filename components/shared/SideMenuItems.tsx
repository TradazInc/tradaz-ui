import { AllOrgPermission } from "@/lib/organizationAc";
import React from "react";
import { AiOutlineAccountBook } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import {
  LuCalculator,
  LuCheck,
  LuFileText,
  LuHandshake,
  LuHeart,
  LuImage,
  LuLandmark,
  LuLayoutGrid,
  LuList,
  LuMail,
  LuMegaphone,
  LuMessageSquare,
  LuPackage,
  LuPercent,
  LuPlus,
  LuRefreshCw,
  LuRuler,
  LuScale,
  LuScanLine,
  LuSettings,
  LuShield,
  LuShoppingBag,
  LuStar,
  LuStore,
  LuTag,
  LuTicket,
  LuTicketPercent,
  LuTrendingDown,
  LuTrendingUp,
  LuTruck,
  LuUndo,
  LuUser,
  LuUserPlus,
  LuUsers,
  LuWallet,
} from "react-icons/lu";
import {
  MdDevices,
  MdOutlineAnalytics,
  MdOutlinePassword,
  MdOutlinePayment,
  MdOutlinePointOfSale,
  MdOutlineRoomPreferences,
  MdOutlineShoppingCartCheckout,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

export interface SideMenuItem {
  label: string;
  icon: React.ReactNode;
  permission?: AllOrgPermission; // none = everyone sees it
  children?: (SideMenuItem & { path: string })[];
}

export const dashboardItems: SideMenuItem[] = [
  {
    label: "Dashboard",
    icon: <LuUser />,
    children: [
      { label: "Overview", icon: <RxDashboard />, path: "/" },
      {
        label: "Invitations",
        icon: <LuMail />,
        path: "/invitations",
      },
    ],
  },
  {
    label: "Account & Security",
    icon: <LuUser />,
    children: [
      { label: "Profile", icon: <LuUserPlus />, path: "/account" },
      {
        label: "Password",
        icon: <MdOutlinePassword />,
        path: "/account/security",
      },
      {
        label: "Active Devices",
        icon: <MdDevices />,
        path: "/account/devices",
      },
    ],
  },
  {
    label: "Preferences & Legal",
    icon: <LuSettings />,
    children: [
      {
        label: "App Preferences",
        icon: <MdOutlineRoomPreferences />,
        path: "/preferences",
      },
      { label: "Terms of Service", icon: <LuFileText />, path: "/terms" },
      { label: "Privacy Policies", icon: <LuShield />, path: "/privacy" },
    ],
  },
  {
    label: "Billing and Subscriptions",
    icon: <BsCashCoin />,
    children: [
      {
        label: "Plan Management",
        icon: <MdOutlineSubscriptions />,
        path: "/billing/plans",
      },
      {
        label: "Payment Methods",
        icon: <MdOutlinePayment />,
        path: "/billing/payment-methods",
      },
    ],
  },
];

export const businessItems: SideMenuItem[] = [
  {
    label: "Dashboard",
    icon: <LuUser />,
    children: [
      { label: "Overview", icon: <RxDashboard />, path: "/" },
      {
        label: "Analytics",
        icon: <MdOutlineAnalytics />,
        path: "/analytics",
        permission: { organization: ["update"] },
      },
    ],
  },
  {
    label: "Catalog & Inventory",
    icon: <LuShoppingBag />,
    children: [
      {
        label: "Add Product",
        icon: <LuPlus />,
        path: "/products/new",
        permission: { products: ["create"] },
      },
      {
        label: "Inventory",
        icon: <LuPackage />,
        path: "/products",
        permission: { products: ["read"] },
      },
      {
        label: "Vendor Inventory",
        icon: <LuStore />,
        path: "/vendor-inventory",
        permission: { organization: ["update"] },
      },
      {
        label: "Categories",
        icon: <LuList />,
        path: "/product-categories",
        permission: { productCategories: ["create"] },
      },
      {
        label: "Sizes",
        icon: <LuRuler />,
        path: "/product-sizes",
        permission: { sizeTypes: ["create"] },
      },
    ],
  },
  {
    label: "Directory & CRM",
    icon: <LuUsers />,
    children: [
      {
        label: "Customers",
        icon: <LuUsers />,
        path: "/customers",
        permission: { member: ["update"] },
      },
      {
        label: "Customer Reviews",
        icon: <LuStar />,
        path: "/reviews",
        permission: { organization: ["update"] },
      },
      {
        label: "Vendors",
        icon: <LuStore />,
        path: "/vendors",
        permission: { member: ["update"] },
      },
      // { label: "Partners", icon: <LuHandshake />, path: "/partners" },
      {
        label: "Staff Members",
        icon: <LuUser />,
        path: "/staff",
        permission: { member: ["update"] },
      },
      {
        label: "Invitations",
        icon: <LuMail />,
        path: "/invitations",
        permission: { invitation: ["create"] },
      },
    ],
  },
  {
    label: "Finance & Sales",
    icon: <LuLandmark />,
    children: [
      {
        label: "Sales Record",
        icon: <LuFileText />,
        path: "/sales-record",
        permission: { orders: ["read"] },
      },
      {
        label: "Vendor Sales",
        icon: <LuStore />,
        path: "/vendor-sales",
        permission: { vendors: ["read"] },
      },
      {
        label: "Partner Sales",
        icon: <LuHandshake />,
        path: "/partner-sales",
        permission: { organization: ["update"] },
      },
      {
        label: "Revenue",
        icon: <LuTrendingUp />,
        path: "/revenue",
        permission: { revenue: ["read"] },
      },
      {
        label: "Expenses",
        icon: <LuTrendingDown />,
        path: "/expenses",
        permission: { expense: ["read"] },
      },
      {
        label: "Staff Payroll",
        icon: <LuWallet />,
        path: "/payroll",
        permission: { organization: ["update"] },
      },
      {
        label: "Tax Calculations",
        icon: <LuCalculator />,
        path: "/taxes",
        permission: { organization: ["update"] },
      },
      {
        label: "Subaccounts",
        icon: <AiOutlineAccountBook />,
        path: "/subaccounts",
        permission: { subaccounts: ["read"] },
      },
    ],
  },
  {
    label: "Support & Disputes",
    icon: <LuScale />,
    children: [
      {
        label: "Customer Chats",
        icon: <LuMessageSquare />,
        path: "/chats",
        permission: { supportChats: ["update"] },
      },
      {
        label: "Product Exchanges",
        icon: <LuRefreshCw />,
        path: "/exchanges",
        permission: { organization: ["update"] },
      },
      {
        label: "Refund Requests",
        icon: <LuUndo />,
        path: "/disputes",
        permission: { organization: ["update"] },
      },
      {
        label: "Sales Reconciliation",
        icon: <LuCheck />,
        path: "/reconciliation",
        permission: { organization: ["update"] },
      },
    ],
  },
  {
    label: "Marketing & Engagement",
    icon: <LuMegaphone />,
    children: [
      {
        label: "Promotional Campaigns",
        icon: <LuTicketPercent />,
        path: "/promos",
        permission: { organization: ["update"] },
      },
      {
        label: "Loyalty Points",
        icon: <LuHeart />,
        path: "/loyalty-points",
        permission: { pointsConfig: ["read"] },
      },
      {
        label: "Discount Coupons",
        icon: <LuTag />,
        path: "/coupons",
        permission: { coupons: ["read"] },
      },
      {
        label: "Gift Vouchers",
        icon: <LuTicket />,
        path: "/vouchers",
        permission: { organization: ["update"] },
      },
      // { label: "Promo Banners", icon: <LuImage />, path: "/banners" },
      // { label: "Hero Banner", icon: <LuImage />, path: "/hero-banner" },
      // { label: "Pop-up Modals", icon: <LuLayoutGrid />, path: "/pop-ups" },
    ],
  },
  {
    label: "Configuration",
    icon: <LuSettings />,
    children: [
      {
        label: "Storefront Themes",
        icon: <CgWebsite />,
        path: "/storefront",
        permission: { uiConfig: ["upsert"] },
      },
      {
        label: "Logistics & Shipping",
        icon: <LuTruck />,
        path: "/shipping",
        permission: { shippingConfigs: ["read"] },
      },
      {
        label: "Roles & Permissions",
        icon: <LuShield />,
        path: "/roles",
        permission: { ac: ["create"] },
      },
      // { label: "VAT Settings", icon: <LuPercent />, path: "/vat" },
    ],
  },
];

export const storeItems: SideMenuItem[] = [
  {
    label: "Dashboard",
    icon: <LuUser />,
    children: [
      { label: "Overview", icon: <RxDashboard />, path: "/" },
      {
        label: "Analytics",
        icon: <MdOutlineAnalytics />,
        path: "/analytics",
        permission: { organization: ["update"] },
      },
    ],
  },
  {
    label: "Point of Sale",
    icon: <LuScanLine />,
    children: [
      {
        label: "Cart Checkout",
        icon: <MdOutlineShoppingCartCheckout />,
        path: "/carts",
        permission: { cart: ["read"] },
      },
    ],
  },
  {
    label: "Operations & Finance",
    icon: <LuLandmark />,
    children: [
      {
        label: "Sales Record",
        icon: <LuFileText />,
        path: "/sales-record",
        permission: { orders: ["read"] },
      },
      {
        label: "Revenue",
        icon: <LuTrendingUp />,
        path: "/revenue",
        permission: { revenue: ["read"] },
      },
      {
        label: "Expenses",
        icon: <LuTrendingDown />,
        path: "/expenses",
        permission: { expense: ["read"] },
      },
      {
        label: "Staff Payroll",
        icon: <LuWallet />,
        path: "/payroll",
        permission: { organization: ["update"] },
      },
      {
        label: "Staff Members",
        icon: <LuUserPlus />,
        path: "/staff",
        permission: { member: ["update"] },
      },
      {
        label: "Tax Breakdown",
        icon: <LuCalculator />,
        path: "/taxes",
        permission: { organization: ["update"] },
      },
    ],
  },
  {
    label: "Configuration",
    icon: <LuSettings />,
    children: [
      {
        label: "Terminal (POS)",
        icon: <MdOutlinePointOfSale />,
        path: "/point-of-sale",
        permission: { posConfig: ["read"] },
      },
    ],
  },
];
