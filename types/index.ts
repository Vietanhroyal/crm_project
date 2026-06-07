export type RecordType = "lead" | "contact" | "deal" | "company";
export type TimelineItemType = "note" | "call" | "email" | "meeting" | "task" | "system";

export interface TimelineItem {
  id: string;
  type: TimelineItemType;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  meta?: Record<string, unknown>;
}

export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  size?: string;
  phone?: string;
  address?: string;
  taxCode?: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  contactCount?: number;
  openDealCount?: number;
  openDealValue?: number;
}

export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
export type ActivityType = "call" | "email" | "meeting" | "task";
export type ActivityStatus = "pending" | "completed" | "overdue";
export type InsightPriority = "high" | "medium" | "low";

export type ReminderStatus = "pending" | "completed" | "overdue" | "snoozed";

export interface LeadReminder {
  id: string;
  leadId: string;
  date: string;
  time: string;
  note: string;
  status: ReminderStatus;
  createdAt: string;
  completedAt?: string;
}

export type LeadTag = "vip" | "hot" | "long-term" | "new" | "follow-up" | "inactive" | string;

export interface TagConfig {
  id: LeadTag;
  label: string;
  color: string;
  bgColor: string;
}

export const TAG_CONFIGS: TagConfig[] = [
  { id: "vip", label: "VIP", color: "#8B5CF6", bgColor: "#EDE9FE" },
  { id: "hot", label: "Hot", color: "#EF4444", bgColor: "#FEE2E2" },
  { id: "long-term", label: "Long-term", color: "#3B82F6", bgColor: "#DBEAFE" },
  { id: "new", label: "New", color: "#10B981", bgColor: "#D1FAE5" },
  { id: "follow-up", label: "Follow-up", color: "#F59E0B", bgColor: "#FEF3C7" },
  { id: "inactive", label: "Inactive", color: "#6B7280", bgColor: "#F3F4F6" },
];

export type ViewMode = "table" | "kanban";

export interface LeadFilters {
  status: LeadStatus[];
  source: string[];
  dateFrom: string;
  dateTo: string;
  assignee: string | "all";
  scoreMin: number;
  scoreMax: number;
}

export type QuickFilter = "all" | "new" | "recent" | "highScore" | "myLeads";

export type SortField = "name" | "source" | "status" | "score" | "createdAt";
export type SortDirection = "asc" | "desc";

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
  order?: number;
  tags: LeadTag[];
  reminders: LeadReminder[];
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  companyId?: string;
  email: string;
  phone: string;
  position: string;
  ownerId?: string;
  tags?: string[];
  createdAt?: string;
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

export interface ConvertLeadData {
  leadId: string;
  dealTitle: string;
  dealValue: number;
  dealStage: DealStage;
  expectedCloseDate: string;
  createContact: boolean;
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

export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive' | 'invited' | 'deleted';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatarUrl?: string;
  lastLoginAt?: string;
  createdAt: string;
  leadCount?: number;
  openDealCount?: number;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface Invitation {
  id: number;
  email: string;
  role: UserRole;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  invitedBy: number;
  expiresAt: string;
  createdAt: string;
}

export type AssignMethod = 'manual' | 'rule' | 'claim' | 'round_robin';

export interface LeadAssignment {
  id: number;
  leadId: number;
  fromUserId?: number;
  toUserId: number;
  assignedBy?: number;
  method: AssignMethod;
  ruleId?: number;
  note?: string;
  createdAt: string;
}

export type RuleField = 'source' | 'score' | 'status' | 'company' | 'tag' | 'email_domain';
export type RuleOp = 'eq' | 'ne' | 'in' | 'not_in' | 'gte' | 'lte' | 'contains';
export type RuleStrategy = 'round_robin' | 'least_load' | 'first_available' | 'pool';

export interface RuleCondition {
  field: RuleField;
  op: RuleOp;
  value: string | number | string[];
}

export interface RuleAction {
  type: 'assign';
  targets: number[];
  strategy: RuleStrategy;
}

export interface DistributionRule {
  id: number;
  name: string;
  priority: number;
  isActive: boolean;
  conditions: RuleCondition[];
  action: RuleAction;
  createdBy: number;
  createdAt: string;
}

export interface AuditLog {
  id: number;
  userId: number;
  userName?: string;
  action: string;
  entityType: string;
  entityId?: number;
  details?: { before?: unknown; after?: unknown; meta?: unknown };
  ipAddress?: string;
  createdAt: string;
}

export interface SystemSetting {
  key: string;
  value: string;
  updatedBy?: number;
  updatedAt: string;
}

export interface PoolConfig {
  enabled: boolean;
  claimLimit: number;
}

export interface AdminStats {
  activeUsers: number;
  totalLeads: number;
  unassignedLeads: number;
  revenue: number;
  leadsByUser: { userId: number; name: string; count: number; pct: number }[];
  recentAudit: AuditLog[];
}

export interface EmployeePerformance {
  userId: number;
  userName: string;
  leadCount: number;
  dealCount: number;
  winRate: number;
}

export interface Alert {
  id: string;
  type: 'unassigned_lead' | 'inactive_user' | 'high_score_in_pool';
  message: string;
  severity: 'warning' | 'error';
  entityId?: number;
  createdAt: string;
}
