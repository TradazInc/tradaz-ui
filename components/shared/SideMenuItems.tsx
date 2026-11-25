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
  children?: (SideMenuItem & { path: string })[];
}

export const dashboardItems: SideMenuItem[] = [
  {
    label: "Dashboard",
    icon: <LuUser />,
    children: [{ label: "Overview", icon: <RxDashboard />, path: "/" }],
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
      { label: "Analytics", icon: <MdOutlineAnalytics />, path: "/analytics" },
    ],
  },
  {
    label: "Catalog & Inventory",
    icon: <LuShoppingBag />,
    children: [
      { label: "Add Product", icon: <LuPlus />, path: "/products/new" },
      { label: "Inventory", icon: <LuPackage />, path: "/products" },
      {
        label: "Vendor Inventory",
        icon: <LuStore />,
        path: "/vendor-inventory",
      },
      { label: "Categories", icon: <LuList />, path: "/product-categories" },
      { label: "Sizes", icon: <LuRuler />, path: "/product-sizes" },
    ],
  },
  {
    label: "Directory & CRM",
    icon: <LuUsers />,
    children: [
      { label: "Customers", icon: <LuUsers />, path: "/customers" },
      { label: "Customer Reviews", icon: <LuStar />, path: "/reviews" },
      { label: "Vendors", icon: <LuStore />, path: "/vendors" },
      // { label: "Partners", icon: <LuHandshake />, path: "/partners" },
      { label: "Staff Members", icon: <LuUser />, path: "/staff" },
      { label: "Invitations", icon: <LuMail />, path: "/invitations" },
    ],
  },
  {
    label: "Finance & Sales",
    icon: <LuLandmark />,
    children: [
      { label: "Sales Record", icon: <LuFileText />, path: "/sales-record" },
      { label: "Vendor Sales", icon: <LuStore />, path: "/vendor-sales" },
      { label: "Partner Sales", icon: <LuHandshake />, path: "/partner-sales" },
      { label: "Revenue", icon: <LuTrendingUp />, path: "/revenue" },
      { label: "Expenses", icon: <LuTrendingDown />, path: "/expenses" },
      { label: "Staff Payroll", icon: <LuWallet />, path: "/payroll" },
      { label: "Tax Calculations", icon: <LuCalculator />, path: "/taxes" },
      {
        label: "Subaccounts",
        icon: <AiOutlineAccountBook />,
        path: "/subaccounts",
      },
    ],
  },
  {
    label: "Support & Disputes",
    icon: <LuScale />,
    children: [
      { label: "Customer Chats", icon: <LuMessageSquare />, path: "/chats" },
      { label: "Product Exchanges", icon: <LuRefreshCw />, path: "/exchanges" },
      { label: "Refund Requests", icon: <LuUndo />, path: "/disputes" },
      {
        label: "Sales Reconciliation",
        icon: <LuCheck />,
        path: "/reconciliation",
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
      },
      { label: "Loyalty Points", icon: <LuHeart />, path: "/loyalty-points" },
      { label: "Discount Coupons", icon: <LuTag />, path: "/coupons" },
      { label: "Gift Vouchers", icon: <LuTicket />, path: "/vouchers" },
      // { label: "Promo Banners", icon: <LuImage />, path: "/banners" },
      // { label: "Hero Banner", icon: <LuImage />, path: "/hero-banner" },
      // { label: "Pop-up Modals", icon: <LuLayoutGrid />, path: "/pop-ups" },
    ],
  },
  {
    label: "Configuration",
    icon: <LuSettings />,
    children: [
      { label: "Logistics & Shipping", icon: <LuTruck />, path: "/shipping" },
      // { label: "VAT Settings", icon: <LuPercent />, path: "/vat" },
      { label: "Roles & Permissions", icon: <LuShield />, path: "/roles" },
      { label: "Storefront Themes", icon: <CgWebsite />, path: "/storefront" },
    ],
  },
];

export const storeItems: SideMenuItem[] = [
  {
    label: "Dashboard",
    icon: <LuUser />,
    children: [
      { label: "Overview", icon: <RxDashboard />, path: "/" },
      { label: "Analytics", icon: <MdOutlineAnalytics />, path: "/analytics" },
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
      },
    ],
  },
  {
    label: "Operations & Finance",
    icon: <LuLandmark />,
    children: [
      { label: "Sales Record", icon: <LuFileText />, path: "/sales-record" },
      { label: "Revenue", icon: <LuTrendingUp />, path: "/revenue" },
      { label: "Expenses", icon: <LuTrendingDown />, path: "/expenses" },
      { label: "Staff Payroll", icon: <LuWallet />, path: "/payroll" },
      { label: "Staff Members", icon: <LuUserPlus />, path: "/staff" },
      { label: "Tax Breakdown", icon: <LuCalculator />, path: "/taxes" },
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
      },
    ],
  },
];
