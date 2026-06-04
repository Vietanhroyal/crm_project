export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
export type ActivityType = "call" | "email" | "meeting" | "task";
export type ActivityStatus = "pending" | "completed" | "overdue";
export type InsightPriority = "high" | "medium" | "low";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  score: number;
  createdAt: string;
  assignee: string;
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  position: string;
  companyId: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  probability: number;
  contactId: string;
  createdAt: string;
  expectedCloseDate: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  dealId?: string;
  contactId?: string;
  dueDate: string;
  status: ActivityStatus;
}

export interface AIInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: InsightPriority;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "seller" | "lead";
  text: string;
  timestamp: Date;
}

export interface LeadInteraction {
  id: string;
  type: "call" | "email" | "meeting" | "note";
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface DashboardStats {
  totalLeads: number;
  leadsGrowth: number;
  totalDeals: number;
  dealsGrowth: number;
  revenue: number;
  revenueGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
}

export interface ChatMessage {
  id: string;
  sender: "seller" | "lead";
  text: string;
  timestamp: Date;
}

