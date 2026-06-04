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

export const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/leads", label: "Leads", icon: "Users" },
  { href: "/contacts", label: "Contacts", icon: "Contact" },
  { href: "/deals", label: "Deals", icon: "TrendingUp" },
  { href: "/activities", label: "Activities", icon: "Calendar" },
  { href: "/reports", label: "Reports", icon: "BarChart3" },
  { href: "/settings", label: "Settings", icon: "Settings" },
] as const;
