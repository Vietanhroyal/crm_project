"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { leads } from "@/lib/mock-data";
import { Lead, LeadInteraction } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LeadScore } from "@/components/leads/lead-score";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  User,
  Edit,
  Trash2,
  MessageSquare,
  FileText,
  PhoneCall,
  MapPin,
} from "lucide-react";
import Link from "next/link";

type InteractionType = "call" | "email" | "meeting" | "note";

const generateMockInteractions = (lead: Lead): LeadInteraction[] => {
  const now = new Date();
  const baseInteractions: LeadInteraction[] = [];

  if (lead.status === "new") {
    baseInteractions.push({
      id: "1",
      type: "note",
      title: "Tạo Lead mới",
      content: `Tạo Lead mới từ nguồn ${lead.source}`,
      createdAt: lead.createdAt,
      createdBy: lead.assignee,
    });
  } else if (lead.status === "contacted") {
    baseInteractions.push(
      {
        id: "1",
        type: "note",
        title: "Tạo Lead mới",
        content: `Tạo Lead mới từ nguồn ${lead.source}`,
        createdAt: lead.createdAt,
        createdBy: lead.assignee,
      },
      {
        id: "2",
        type: "call",
        title: "Cuộc gọi đầu tiên",
        content: "Liên hệ lần đầu, khách hàng quan tâm đến sản phẩm",
        createdAt: "02/06/2026",
        createdBy: lead.assignee,
      },
      {
        id: "3",
        type: "email",
        title: "Gửi email giới thiệu",
        content: "Đã gửi tài liệu giới thiệu dịch vụ qua email",
        createdAt: "03/06/2026",
        createdBy: lead.assignee,
      }
    );
  } else if (lead.status === "qualified") {
    baseInteractions.push(
      {
        id: "1",
        type: "note",
        title: "Tạo Lead mới",
        content: `Tạo Lead mới từ nguồn ${lead.source}`,
        createdAt: lead.createdAt,
        createdBy: lead.assignee,
      },
      {
        id: "2",
        type: "call",
        title: "Cuộc gọi đầu tiên",
        content: "Liên hệ lần đầu, khách hàng quan tâm đến sản phẩm",
        createdAt: "28/05/2026",
        createdBy: lead.assignee,
      },
      {
        id: "3",
        type: "email",
        title: "Gửi email giới thiệu",
        content: "Đã gửi tài liệu giới thiệu dịch vụ qua email",
        createdAt: "29/05/2026",
        createdBy: lead.assignee,
      },
      {
        id: "4",
        type: "meeting",
        title: "Demo sản phẩm",
        content: "Thực hiện demo sản phẩm cho khách hàng, khách hàng rất hài lòng",
        createdAt: "01/06/2026",
        createdBy: lead.assignee,
      },
      {
        id: "5",
        type: "email",
        title: "Gửi báo giá",
        content: "Đã gửi báo giá gói Enterprise cho khách hàng",
        createdAt: "03/06/2026",
        createdBy: lead.assignee,
      }
    );
  } else if (lead.status === "lost") {
    baseInteractions.push(
      {
        id: "1",
        type: "note",
        title: "Tạo Lead mới",
        content: `Tạo Lead mới từ nguồn ${lead.source}`,
        createdAt: lead.createdAt,
        createdBy: lead.assignee,
      },
      {
        id: "2",
        type: "call",
        title: "Cuộc gọi đầu tiên",
        content: "Liên hệ lần đầu, khách hàng quan tâm đến sản phẩm",
        createdAt: "28/05/2026",
        createdBy: lead.assignee,
      },
      {
        id: "3",
        type: "meeting",
        title: "Demo sản phẩm",
        content: "Thực hiện demo sản phẩm",
        createdAt: "01/06/2026",
        createdBy: lead.assignee,
      },
      {
        id: "4",
        type: "note",
        title: "Lead Lost",
        content: "Khách hàng đã chọn nhà cung cấp khác",
        createdAt: "04/06/2026",
        createdBy: lead.assignee,
      }
    );
  }

  return baseInteractions;
};

const typeConfig: Record<InteractionType, { icon: React.ElementType; color: string; label: string }> = {
  call: { icon: PhoneCall, color: "bg-blue-100 text-blue-600", label: "Cuộc gọi" },
  email: { icon: Mail, color: "bg-green-100 text-green-600", label: "Email" },
  meeting: { icon: Calendar, color: "bg-orange-100 text-orange-600", label: "Cuộc họp" },
  note: { icon: FileText, color: "bg-purple-100 text-purple-600", label: "Ghi chú" },
};

export default function LeadDetailPage() {
  const params = useParams();
  const lead = leads.find((l) => l.id === params.id);

  const [interactions, setInteractions] = useState<LeadInteraction[]>([]);
  const [activeType, setActiveType] = useState<InteractionType>("note");
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (lead) {
      setInteractions(generateMockInteractions(lead));
    }
  }, [lead]);

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-text-muted mb-4">Lead not found</p>
        <Link href="/leads">
          <Button variant="outline">Back to Leads</Button>
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "success" | "warning" | "error" | "info"> = {
      new: "info",
      contacted: "default",
      qualified: "success",
      lost: "error",
    };
    const labels: Record<string, string> = {
      new: "New",
      contacted: "Contacted",
      qualified: "Qualified",
      lost: "Lost",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const handleAddInteraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newInteraction: LeadInteraction = {
      id: Date.now().toString(),
      type: activeType,
      title: newTitle.trim() || typeConfig[activeType].label,
      content: newContent,
      createdAt: new Date().toLocaleString("vi-VN"),
      createdBy: lead.assignee,
    };

    setInteractions([newInteraction, ...interactions]);
    setNewContent("");
    setNewTitle("");
  };

  const scrollToForm = (type: InteractionType) => {
    setActiveType(type);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/leads">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Leads
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="ghost" className="gap-2 text-red-600 hover:text-red-600 hover:bg-red-50">
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-xl font-bold">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{lead.name}</CardTitle>
                    <p className="text-text-muted flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4" />
                      {lead.company}
                    </p>
                  </div>
                </div>
                {getStatusBadge(lead.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Email</p>
                  <p className="font-medium text-text-dark flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {lead.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Phone</p>
                  <p className="font-medium text-text-dark flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {lead.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Source</p>
                  <p className="font-medium text-text-dark">{lead.source}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Created</p>
                  <p className="font-medium text-text-dark flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(lead.createdAt)}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-text-dark mb-4">Lead Score Analysis</h4>
                <div className="flex items-center gap-6">
                  <LeadScore score={lead.score} />
                  <div className="flex-1">
                    <p className="text-sm text-text-muted mb-2">AI-powered analysis</p>
                    <p className="text-sm text-text-dark">
                      {lead.score >= 80
                        ? "Highly qualified lead with strong conversion potential."
                        : lead.score >= 60
                        ? "Good lead with moderate conversion potential."
                        : "Requires more nurturing before conversion."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Lịch sử tương tác & Ghi chú</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form ref={formRef} onSubmit={handleAddInteraction} className="space-y-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex gap-2">
                  {(["call", "email", "meeting", "note"] as InteractionType[]).map((type) => {
                    const config = typeConfig[type];
                    const Icon = config.icon;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActiveType(type)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeType === type
                            ? `${config.color} ring-2 ring-offset-2 ring-indigo-500`
                            : "bg-white text-text-muted hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {config.label}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Tiêu đề (tùy chọn)"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                />
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Nhập nội dung tương tác hoặc ghi chú..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm resize-none"
                />
                <div className="flex justify-end">
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                    Lưu lại
                  </Button>
                </div>
              </form>

              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-100" />
                <div className="space-y-6">
                  {interactions.map((interaction) => {
                    const config = typeConfig[interaction.type];
                    const Icon = config.icon;
                    return (
                      <div key={interaction.id} className="relative flex gap-4 pl-10">
                        <div className={`absolute left-2 w-6 h-6 rounded-full ${config.color} flex items-center justify-center`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-text-dark text-sm">{interaction.title}</h4>
                            <span className="text-xs text-text-muted">{interaction.createdAt}</span>
                          </div>
                          <p className="text-sm text-text-dark mb-2">{interaction.content}</p>
                          <p className="text-xs text-text-muted">bởi {interaction.createdBy}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                onClick={() => scrollToForm("call")}
              >
                <Phone className="w-4 h-4 text-blue-500" />
                Call Lead
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                onClick={() => scrollToForm("email")}
              >
                <Mail className="w-4 h-4 text-green-500" />
                Send Email
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                onClick={() => scrollToForm("note")}
              >
                <MessageSquare className="w-4 h-4 text-purple-500" />
                Add Note
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                onClick={() => scrollToForm("meeting")}
              >
                <Calendar className="w-4 h-4 text-orange-500" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assignee</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {lead.assignee
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-text-dark">{lead.assignee}</p>
                  <p className="text-sm text-text-muted">Sales Representative</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}