"use client";

import { useParams } from "next/navigation";
import { leads } from "@/lib/mock-data";
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
} from "lucide-react";
import Link from "next/link";

export default function LeadDetailPage() {
  const params = useParams();
  const lead = leads.find((l) => l.id === params.id);

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
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Phone className="w-4 h-4 text-cta" />
                Call Lead
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Mail className="w-4 h-4 text-primary" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <MessageSquare className="w-4 h-4 text-purple-500" />
                Add Note
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
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
