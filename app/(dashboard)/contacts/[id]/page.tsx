"use client";

import { useParams } from "next/navigation";
import { contacts, deals, activities } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  Edit,
  Trash2,
  PhoneCall,
  FileText,
  User,
} from "lucide-react";
import Link from "next/link";

export default function ContactDetailPage() {
  const params = useParams();
  const contact = contacts.find((c) => c.id === params.id);
  const contactDeals = deals.filter((d) => d.contactId === params.id);
  const contactActivities = activities.filter((a) => a.contactId === params.id);

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-text-muted mb-4">Contact not found</p>
        <Link href="/contacts">
          <Button variant="outline">Back to Contacts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/contacts">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Contacts
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
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white text-2xl font-bold">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <CardTitle className="text-2xl">{contact.name}</CardTitle>
                  <p className="text-text-muted flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4" />
                    {contact.position} at {contact.company}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Email</p>
                  <p className="font-medium text-text-dark flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {contact.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Phone</p>
                  <p className="font-medium text-text-dark flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {contact.phone}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Company</p>
                  <p className="font-medium text-text-dark">{contact.company}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-text-muted">Position</p>
                  <p className="font-medium text-text-dark">{contact.position}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="cta" className="gap-2">
                  <PhoneCall className="w-4 h-4" />
                  Call
                </Button>
                <Button variant="outline" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>

          {contactDeals.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactDeals.map((deal) => (
                    <Link
                      key={deal.id}
                      href={`/deals/${deal.id}`}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-text-dark">{deal.title}</p>
                        <p className="text-sm text-text-muted">
                          Expected close: {formatDate(deal.expectedCloseDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{formatCurrency(deal.value)}</p>
                        <Badge variant="default" className="capitalize mt-1">
                          {deal.stage}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Phone className="w-4 h-4 text-cta" />
                Call
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Mail className="w-4 h-4 text-primary" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Calendar className="w-4 h-4 text-orange-500" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <FileText className="w-4 h-4 text-purple-500" />
                Add Note
              </Button>
            </CardContent>
          </Card>

          {contactActivities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactActivities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-dark text-sm">
                          {activity.title}
                        </p>
                        <p className="text-xs text-text-muted">
                          {formatDate(activity.dueDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
