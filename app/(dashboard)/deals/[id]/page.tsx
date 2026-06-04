"use client";

import { useParams } from "next/navigation";
import { deals, contacts } from "@/lib/mock-data";
import { DEAL_STAGES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DealScore } from "@/components/deals/deal-score";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Building2,
  Calendar,
  User,
  Edit,
  Trash2,
  Phone,
  Mail,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function DealDetailPage() {
  const params = useParams();
  const deal = deals.find((d) => d.id === params.id);
  const contact = deal ? contacts.find((c) => c.id === deal.contactId) : null;

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-text-muted mb-4">Deal not found</p>
        <Link href="/deals">
          <Button variant="outline">Back to Deals</Button>
        </Link>
      </div>
    );
  }

  const stageInfo = DEAL_STAGES.find((s) => s.id === deal.stage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/deals">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Deals
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
                <div>
                  <CardTitle className="text-2xl">{deal.title}</CardTitle>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge
                      style={{ backgroundColor: `${stageInfo?.color}20`, color: stageInfo?.color }}
                      className="capitalize"
                    >
                      <div
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: stageInfo?.color }}
                      />
                      {deal.stage}
                    </Badge>
                    <DealScore score={deal.probability} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary">
                  {formatCurrency(deal.value)}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Expected Close Date</p>
                  <p className="font-medium text-text-dark flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(deal.expectedCloseDate)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Created</p>
                  <p className="font-medium text-text-dark flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(deal.createdAt)}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-text-dark mb-4">Deal Progress</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Win Probability</span>
                    <span className="font-medium text-text-dark">{deal.probability}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-cta transition-all duration-500"
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {contact && (
            <Card>
              <CardHeader>
                <CardTitle>Related Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-semibold">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-text-dark">{contact.name}</p>
                      <p className="text-sm text-text-muted flex items-center gap-2">
                        <Building2 className="w-3 h-3" />
                        {contact.company} - {contact.position}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-primary to-primary-hover border-0">
            <CardContent className="p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-8 h-8" />
                <div>
                  <p className="text-white/60 text-sm">Deal Value</p>
                  <p className="text-3xl font-bold">{formatCurrency(deal.value)}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-white/80 text-sm">
                  <span>Expected ROI</span>
                  <span>+{Math.round(deal.probability * 1.5)}%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${deal.probability}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pipeline Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {DEAL_STAGES.map((stage, index) => (
                  <div
                    key={stage.id}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      deal.stage === stage.id ? "bg-primary/10" : ""
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <span
                      className={`font-medium ${
                        deal.stage === stage.id ? "text-primary" : "text-text-dark"
                      }`}
                    >
                      {stage.label}
                    </span>
                    {deal.stage === stage.id && (
                      <TrendingUp className="w-4 h-4 text-primary ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Phone className="w-4 h-4 text-cta" />
                Call Contact
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Mail className="w-4 h-4 text-primary" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Calendar className="w-4 h-4 text-orange-500" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
