export const DEAL_STAGES = [
  { id: "lead", label: "Lead", color: "#818CF8" },
  { id: "qualified", label: "Qualified", color: "#6366F1" },
  { id: "proposal", label: "Proposal", color: "#8B5CF6" },
  { id: "negotiation", label: "Negotiation", color: "#A855F7" },
  { id: "won", label: "Won", color: "#10B981" },
  { id: "lost", label: "Lost", color: "#EF4444" },
] as const;

export const LEAD_SOURCES = [
  "Website",
  "Referral",
  "LinkedIn",
  "Cold Call",
  "Email Campaign",
  "Trade Show",
  "Partner",
] as const;

export const INDUSTRIES = [
  "Công nghệ",
  "Tài chính",
  "Bất động sản",
  "Sản xuất",
  "Thương mại",
  "Y tế",
  "Giáo dục",
  "Logistics",
  "Du lịch",
  "Khác",
] as const;

export const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
] as const;

export const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/leads", label: "Leads", icon: "Users" },
  { href: "/contacts", label: "Contacts", icon: "Contact" },
  { href: "/companies", label: "Công ty", icon: "Building2" },
  { href: "/deals", label: "Deals", icon: "TrendingUp" },
  { href: "/activities", label: "Activities", icon: "Calendar" },
  { href: "/reports", label: "Reports", icon: "BarChart3" },
  { href: "/settings", label: "Settings", icon: "Settings" },
] as const;

export const TIMELINE_TYPE_CONFIG = {
  call: { color: "bg-blue-100 text-blue-600", label: "Cuộc gọi" },
  email: { color: "bg-green-100 text-green-600", label: "Email" },
  meeting: { color: "bg-orange-100 text-orange-600", label: "Cuộc họp" },
  note: { color: "bg-purple-100 text-purple-600", label: "Ghi chú" },
  task: { color: "bg-yellow-100 text-yellow-600", label: "Task" },
  system: { color: "bg-gray-100 text-gray-600", label: "Hệ thống" },
} as const;
