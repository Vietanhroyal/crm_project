"use client";

import { Lead } from "@/types";
import { LeadScore } from "./lead-score";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Phone, Mail, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onMailClick?: (lead: Lead) => void;
}

export function LeadTable({ leads, onEdit, onMailClick }: LeadTableProps) {
  const getStatusBadge = (status: Lead["status"]) => {
    const variants: Record<Lead["status"], "default" | "success" | "warning" | "error" | "info"> = {
      new: "info",
      contacted: "default",
      qualified: "success",
      lost: "error",
    };
    const labels: Record<Lead["status"], string> = {
      new: "New",
      contacted: "Contacted",
      qualified: "Qualified",
      lost: "Lost",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-dark">
                Lead
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-dark">
                Source
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-dark">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-dark">
                Score
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-dark">
                Date
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-dark">
                Assignee
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-text-dark">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-text-dark">{lead.name}</p>
                    <p className="text-sm text-text-muted">{lead.company}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">{lead.source}</td>
                <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                <td className="px-6 py-4">
                  <LeadScore score={lead.score} />
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">
                  {formatDate(lead.createdAt)}
                </td>
                <td className="px-6 py-4 text-sm text-text-muted">{lead.assignee}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-8 h-8 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                      onClick={() => onMailClick?.(lead)}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" asChild>
                          <Link href={`/leads/${lead.id}`}>
                            <Eye className="w-4 h-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => onEdit(lead)}>
                          <Edit className="w-4 h-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">No leads found</p>
        </div>
      )}
    </div>
  );
}
