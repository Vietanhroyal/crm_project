import { Lead, Contact, Deal, Activity, AIInsight, DashboardStats, ConvertLeadData, Company, TimelineItem, RecordType } from "@/types";

export const companies: Company[] = [
  {
    id: "c1",
    name: "Công ty ABC",
    website: "abc.vn",
    industry: "Công nghệ",
    size: "51-200",
    phone: "02812345678",
    address: "Q1, TP.HCM",
    ownerId: "u2",
    createdAt: "2026-02-10",
    description: "Khách hàng tiềm năng mảng ERP",
  },
  {
    id: "c2",
    name: "XYZ Corporation",
    website: "xyz.vn",
    industry: "Tài chính",
    size: "201-500",
    phone: "02898765432",
    address: "Q3, TP.HCM",
    ownerId: "u1",
    createdAt: "2026-01-15",
    description: "Tập đoàn tài chính lớn",
  },
  {
    id: "c3",
    name: "Tech Solutions",
    website: "techsolutions.vn",
    industry: "Công nghệ",
    size: "11-50",
    phone: "02811112222",
    address: "Cầu Giấy, Hà Nội",
    ownerId: "u1",
    createdAt: "2026-02-20",
    description: "Công ty tư vấn & triển khai giải pháp công nghệ",
  },
  {
    id: "c4",
    name: "Global Trading",
    website: "globaltrading.vn",
    industry: "Thương mại",
    size: "51-200",
    phone: "02833334444",
    address: "Q7, TP.HCM",
    ownerId: "u2",
    createdAt: "2026-03-01",
    description: "Công ty xuất nhập khẩu",
  },
];

export function getCompanyStats(companyId: string) {
  const cs = contacts.filter((c) => c.companyId === companyId);
  const ds = deals.filter((d) => (d as any).companyId === companyId);
  const openDealValue = ds.reduce((sum, d) => sum + d.value, 0);
  return { contactCount: cs.length, openDealCount: ds.length, openDealValue };
}

export const dashboardStats: DashboardStats = {
  totalLeads: 156,
  leadsGrowth: 12.5,
  totalDeals: 42,
  dealsGrowth: 8.2,
  revenue: 2850000000,
  revenueGrowth: 23.1,
  conversionRate: 32,
  conversionGrowth: 5.4,
};

export const recentDeals: Deal[] = [
  {
    id: "1",
    title: "Công ty ABC - Enterprise License",
    value: 450000000,
    stage: "negotiation",
    probability: 75,
    contactId: "1",
    createdAt: "2026-03-15",
    expectedCloseDate: "2026-04-15",
  },
  {
    id: "2",
    title: "XYZ Corp - AI Platform Setup",
    value: 280000000,
    stage: "proposal",
    probability: 60,
    contactId: "2",
    createdAt: "2026-03-10",
    expectedCloseDate: "2026-04-20",
  },
  {
    id: "3",
    title: "Tech Solutions - Cloud Migration",
    value: 180000000,
    stage: "qualified",
    probability: 40,
    contactId: "3",
    createdAt: "2026-03-08",
    expectedCloseDate: "2026-05-01",
  },
];

export const leads: Lead[] = [
  {
    id: "1",
    name: "Nguyễn Văn Minh",
    company: "Công ty ABC",
    email: "minh.nv@abc.vn",
    phone: "0901234567",
    source: "Website",
    status: "qualified",
    score: 85,
    createdAt: "2026-03-01",
    assignee: "Hoàng An",
    order: 0,
    tags: ["vip", "hot"],
    reminders: [
      {
        id: "r1",
        leadId: "1",
        date: "2026-06-08",
        time: "10:00",
        note: "Follow up on pricing discussion",
        status: "pending",
        createdAt: "2026-06-05",
      },
      {
        id: "r2",
        leadId: "1",
        date: "2026-06-01",
        time: "14:00",
        note: "Initial call",
        status: "completed",
        createdAt: "2026-05-30",
        completedAt: "2026-06-01",
      },
    ],
  },
  {
    id: "2",
    name: "Trần Thị Lan",
    company: "XYZ Corporation",
    email: "lan.tt@xyz.vn",
    phone: "0902345678",
    source: "LinkedIn",
    status: "contacted",
    score: 72,
    createdAt: "2026-03-05",
    assignee: "Hoàng An",
    order: 0,
    tags: ["new"],
    reminders: [
      {
        id: "r3",
        leadId: "2",
        date: "2026-06-07",
        time: "09:00",
        note: "Send product demo video",
        status: "pending",
        createdAt: "2026-06-05",
      },
    ],
  },
  {
    id: "3",
    name: "Lê Hoàng Nam",
    company: "Tech Solutions",
    email: "nam.lh@techsolutions.vn",
    phone: "0903456789",
    source: "Referral",
    status: "new",
    score: 45,
    createdAt: "2026-03-10",
    assignee: "Minh Tuấn",
    order: 0,
    tags: ["long-term", "follow-up"],
    reminders: [],
  },
  {
    id: "4",
    name: "Phạm Thu Hà",
    company: "Global Trading",
    email: "ha.pt@globaltrading.vn",
    phone: "0904567890",
    source: "Cold Call",
    status: "contacted",
    score: 68,
    createdAt: "2026-03-12",
    assignee: "Hoàng An",
    order: 1,
    tags: [],
    reminders: [
      {
        id: "r4",
        leadId: "4",
        date: "2026-06-05",
        time: "11:00",
        note: "Follow up call",
        status: "overdue",
        createdAt: "2026-06-04",
      },
    ],
  },
  {
    id: "5",
    name: "Đặng Minh Khoa",
    company: "Innovate Tech",
    email: "khoa.dm@innovate.vn",
    phone: "0905678901",
    source: "Email Campaign",
    status: "qualified",
    score: 90,
    createdAt: "2026-03-14",
    assignee: "Minh Tuấn",
    order: 1,
    tags: ["vip"],
    reminders: [],
  },
  {
    id: "6",
    name: "Vũ Thị Mai",
    company: "Smart Business",
    email: "mai.vt@smartbusiness.vn",
    phone: "0906789012",
    source: "Trade Show",
    status: "new",
    score: 35,
    createdAt: "2026-03-18",
    assignee: "Hoàng An",
    order: 1,
    tags: [],
    reminders: [],
  },
  {
    id: "7",
    name: "Bùi Đức Thắng",
    company: "Digital Transform",
    email: "thang.bd@digitaltransform.vn",
    phone: "0907890123",
    source: "Partner",
    status: "lost",
    score: 20,
    createdAt: "2026-02-28",
    assignee: "Minh Tuấn",
    order: 0,
    tags: ["inactive"],
    reminders: [],
  },
];

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Nguyễn Văn Minh",
    company: "Công ty ABC",
    email: "minh.nv@abc.vn",
    phone: "0901234567",
    position: "CEO",
    companyId: "c1",
    ownerId: "u2",
    tags: ["vip"],
    createdAt: "2026-02-15",
  },
  {
    id: "2",
    name: "Trần Thị Lan",
    company: "XYZ Corporation",
    email: "lan.tt@xyz.vn",
    phone: "0902345678",
    position: "CTO",
    companyId: "c2",
    ownerId: "u1",
    tags: [],
    createdAt: "2026-01-20",
  },
  {
    id: "3",
    name: "Lê Hoàng Nam",
    company: "Tech Solutions",
    email: "nam.lh@techsolutions.vn",
    phone: "0903456789",
    position: "COO",
    companyId: "c3",
    ownerId: "u1",
    tags: [],
    createdAt: "2026-02-25",
  },
  {
    id: "4",
    name: "Phạm Thu Hà",
    company: "Global Trading",
    email: "ha.pt@globaltrading.vn",
    phone: "0904567890",
    position: "Sales Director",
    companyId: "c4",
    ownerId: "u2",
    tags: [],
    createdAt: "2026-03-05",
  },
];

export const deals: Deal[] = [
  {
    id: "1",
    title: "Công ty ABC - Enterprise License",
    value: 450000000,
    stage: "negotiation",
    probability: 75,
    contactId: "1",
    createdAt: "2026-03-15",
    expectedCloseDate: "2026-04-15",
  },
  {
    id: "2",
    title: "XYZ Corp - AI Platform Setup",
    value: 280000000,
    stage: "proposal",
    probability: 60,
    contactId: "2",
    createdAt: "2026-03-10",
    expectedCloseDate: "2026-04-20",
  },
  {
    id: "3",
    title: "Tech Solutions - Cloud Migration",
    value: 180000000,
    stage: "qualified",
    probability: 40,
    contactId: "3",
    createdAt: "2026-03-08",
    expectedCloseDate: "2026-05-01",
  },
  {
    id: "4",
    title: "Global Trading - Data Analytics",
    value: 320000000,
    stage: "lead",
    probability: 25,
    contactId: "4",
    createdAt: "2026-03-18",
    expectedCloseDate: "2026-05-15",
  },
  {
    id: "5",
    title: "Innovate Tech - Full Suite",
    value: 550000000,
    stage: "won",
    probability: 100,
    contactId: "5",
    createdAt: "2026-03-01",
    expectedCloseDate: "2026-03-20",
  },
];

export const activities: Activity[] = [
  {
    id: "1",
    type: "call",
    title: "Gọi điện follow up",
    description: "Theo dõi tiến độ đàm phán với ABC",
    dealId: "1",
    contactId: "1",
    dueDate: "2026-03-24",
    status: "pending",
  },
  {
    id: "2",
    type: "meeting",
    title: "Demo sản phẩm",
    description: "Demo AI Platform cho XYZ Corp",
    dealId: "2",
    contactId: "2",
    dueDate: "2026-03-25",
    status: "pending",
  },
  {
    id: "3",
    type: "email",
    title: "Gửi proposal",
    description: "Gửi proposal chi tiết cho Tech Solutions",
    dealId: "3",
    contactId: "3",
    dueDate: "2026-03-23",
    status: "completed",
  },
  {
    id: "4",
    type: "task",
    title: "Chuẩn bị hợp đồng",
    description: "Soạn draft hợp đồng cho deal ABC",
    dealId: "1",
    contactId: "1",
    dueDate: "2026-03-26",
    status: "overdue",
  },
];

export const aiInsights: AIInsight[] = [
  {
    id: "1",
    type: "conversion",
    title: "Tỷ lệ chuyển đổi cao",
    description: "Lead từ LinkedIn có tỷ lệ chuyển đổi 40% - cao hơn 15% so với trung bình. Cân nhắc đầu tư thêm vào kênh này.",
    priority: "high",
    createdAt: "2026-03-22",
  },
  {
    id: "2",
    type: "timing",
    title: "Thời điểm liên hệ tối ưu",
    description: "Khách hàng có xu hướng phản hồi nhanh hơn khi được liên hệ vào thứ 3-4, khoảng 10-11 giờ sáng.",
    priority: "medium",
    createdAt: "2026-03-21",
  },
  {
    id: "3",
    type: "deal",
    title: "Deal ABC có nguy cơ chậm tiến độ",
    description: "Expected close date đã qua 5 ngày nhưng deal vẫn ở stage Negotiation. Cần follow up khẩn cấp.",
    priority: "high",
    createdAt: "2026-03-23",
  },
  {
    id: "4",
    type: " upsell",
    title: "Cơ hội mở rộng deal",
    description: "Innovate Tech đang sử dụng 60% tính năng. Có tiềm năng upsell gói Enterprise với giá trị +200M.",
    priority: "medium",
    createdAt: "2026-03-20",
  },
];

export const chartData = [
  { month: "Tháng 1", leads: 28, deals: 8 },
  { month: "Tháng 2", leads: 35, deals: 12 },
  { month: "Tháng 3", leads: 42, deals: 15 },
  { month: "Tháng 4", leads: 38, deals: 11 },
  { month: "Tháng 5", leads: 45, deals: 14 },
  { month: "Tháng 6", leads: 52, deals: 18 },
];

const nextId = () => Date.now().toString();

const getDealProbability = (stage: Deal["stage"]) => {
  switch (stage) {
    case "qualified":
      return 40;
    case "proposal":
      return 60;
    case "negotiation":
      return 75;
    case "won":
      return 100;
    case "lost":
      return 0;
    default:
      return 25;
  }
};

export function convertLeadToDeal(
  data: ConvertLeadData,
  lead: Lead
): { deal: Deal; contact?: Contact } {
  const createdAt = new Date().toISOString().split("T")[0];

  let contact: Contact | undefined;
  if (data.createContact) {
    contact = {
      id: nextId(),
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      position: "",
      companyId: lead.id,
    };
    contacts.push(contact);
  }

  const deal: Deal = {
    id: nextId(),
    title: data.dealTitle,
    value: data.dealValue,
    stage: data.dealStage,
    probability: getDealProbability(data.dealStage),
    contactId: contact?.id || "",
    createdAt,
    expectedCloseDate: data.expectedCloseDate,
  };

  deals.push(deal);

  return { deal, contact };
}
