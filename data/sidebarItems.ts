import {
  LuBox,
  LuCalculator,
  LuGift,
  LuHandshake,
  LuHeart,
  LuImage,
  LuLayoutGrid,
  LuList,
  LuMegaphone,
  LuPackage,
  LuPalette,
  LuPercent,
  LuPlus,
  LuRuler,
  LuScanLine,
  LuShoppingBag,
  LuStar,
  LuTag,
  LuTerminal,
  LuTicket,
  LuTicketPercent,
  LuTrendingDown,
  LuTruck,
  LuUserPlus,
  LuLayoutDashboard,
  LuStore,
  LuBriefcase,
  LuCheck,
  LuTrendingUp,
  LuUsers,
  LuUser,
  LuMessageSquare,
  LuWallet,
  LuCreditCard,
  LuLandmark,
  LuRefreshCw,
  LuShield,
  LuScale,
  LuUndo,
  LuFileText,
  LuSettings,
  LuZap,
  LuServer,
  LuShieldCheck,
  LuLayers,
} from "react-icons/lu";

export const sideBarItems = [
  {
    label: "Point of Sale",
    icon: LuScanLine,
    children: [{ label: "POS", icon: LuTerminal }],
  },
  {
    label: "Products",
    icon: LuShoppingBag,
    children: [
      { label: "Add Product", icon: LuPlus },
      { label: "Inventory", icon: LuPackage },
      { label: "Categories", icon: LuList },
      { label: "Product Type", icon: LuBox },
      { label: "Sizes", icon: LuRuler },
    ],
  },
  {
    label: "Customers",
    icon: LuUsers,
    children: [
      { label: "Customer List", icon: LuUsers },
      { label: "Reviews", icon: LuStar },
    ],
  },

  {
    label: "Vendors",
    icon: LuStore,
    children: [
      { label: "Vendor List", icon: LuUsers },
      { label: "Vendor Inventory", icon: LuPackage },
      { label: "Vendor Sales", icon: LuFileText },
    ],
  },
  {
    label: "Partners",
    icon: LuHandshake,
    children: [
      { label: "Partners List", icon: LuUsers },
      { label: "Partners Sales", icon: LuFileText },
    ],
  },

  {
    label: "Finance",
    icon: LuLandmark,
    children: [
      { label: "Sales Record", icon: LuFileText },
      { label: "Staff Salary", icon: LuWallet },
      { label: "Expenses", icon: LuTrendingDown },
      { label: "Revenue", icon: LuTrendingUp },
      { label: "Tax Calculation", icon: LuCalculator },
    ],
  },
  {
    label: "Dispute Resolution",
    icon: LuScale,
    children: [
      { label: "Customers Chats", icon: LuMessageSquare },
      { label: "Products exchange", icon: LuRefreshCw },
      { label: "Customers Refund", icon: LuUndo },
      { label: "Sales Reconciliation", icon: LuCheck },
    ],
  },
  {
    label: "Marketing & Promos",
    icon: LuTicketPercent,
    children: [
      { label: "Promotions", icon: LuMegaphone },
      { label: "Pop up", icon: LuLayoutGrid },
      { label: "Promo Banners", icon: LuImage },
      { label: "Hero Banner", icon: LuImage },
    ],
  },
  {
    label: "Loyalty & Rewards",
    icon: LuGift,
    children: [
      { label: "Loyalty", icon: LuHeart },
      { label: "Vouchers", icon: LuTicket },
      { label: "Set Coupon", icon: LuTag },
    ],
  },
  {
    label: "Staff",
    icon: LuUserPlus,
    children: [{ label: "Staff List", icon: LuUser }],
  },
  {
    label: "Settings",
    icon: LuSettings,
    children: [
      { label: "Logistics", icon: LuTruck },
      { label: "VAT", icon: LuPercent },
      { label: "Terms", icon: LuFileText },
      { label: "Conditions & Policies", icon: LuShield },
      { label: "UI config", icon: LuPalette },
    ],
  },
];

export const SUPER_ADMIN_NAV_ITEMS = [
  {
    label: "Overview",
    icon: LuLayoutDashboard,
    path: "/overwatch",
  },
  {
    label: "Businesses",
    icon: LuStore,
    children: [
      {
        label: "All Businesses",
        icon: LuBriefcase,
        path: "/overwatch/businesses",
      },
      { label: "All Shops", icon: LuStore, path: "/overwatch/shops" },
      {
        label: "Pending Approvals",
        icon: LuCheck,
        path: "/overwatch/approvals",
      },
      {
        label: "Shop Performance",
        icon: LuTrendingUp,
        path: "/overwatch/performance",
      },
    ],
  },
  {
    label: "Platform Data",
    icon: LuLayers,
    children: [
      { label: "Categories", icon: LuLayers, path: "/overwatch/categories" },
    ],
  },
  {
    label: "Users",
    icon: LuUsers,
    children: [
      { label: "All Users", icon: LuUser, path: "/overwatch/users" },
      {
        label: "Reviews & Feedback",
        icon: LuMessageSquare,
        path: "/overwatch/reviews",
      },
    ],
  },
  {
    label: "Finances",
    icon: LuWallet,
    children: [
      { label: "Finances", icon: LuWallet, path: "/overwatch/finance" },
      {
        label: "Transactions",
        icon: LuCreditCard,
        path: "/overwatch/transactions",
      },
      { label: "Payouts", icon: LuLandmark, path: "/overwatch/payouts" },
      {
        label: "Subscriptions",
        icon: LuRefreshCw,
        path: "/overwatch/subscriptions",
      },
    ],
  },
  {
    label: "Disputes & Security",
    icon: LuShield,
    children: [
      { label: "Active Disputes", icon: LuScale, path: "/overwatch/disputes" },
      { label: "Refunds", icon: LuUndo, path: "/overwatch/refunds" },
      {
        label: "Flagged Accounts",
        icon: LuFileText,
        path: "/overwatch/flagged",
      },
    ],
  },
  {
    label: "System Ops",
    icon: LuServer,
    children: [
      {
        label: "Automation Engine",
        icon: LuZap,
        path: "/overwatch/automation",
      },
      { label: "API & Health", icon: LuServer, path: "/overwatch/health" },
      { label: "Staff Roles", icon: LuShieldCheck, path: "/overwatch/staff" },
    ],
  },
  {
    label: "Settings",
    icon: LuSettings,
    children: [
      {
        label: "General Settings",
        icon: LuSettings,
        path: "/overwatch/settings",
      },
      { label: "Activity Logs", icon: LuFileText, path: "/overwatch/logs" },
    ],
  },
];
