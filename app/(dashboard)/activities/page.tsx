"use client";

import { useState } from "react";
import { activities } from "@/lib/mock-data";
import { Activity, ActivityStatus, ActivityType } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import {
  Plus,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
} from "lucide-react";

const typeIcons: Record<ActivityType, React.ElementType> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  task: CheckCircle,
};

const typeColors: Record<ActivityType, string> = {
  call: "bg-blue-500/10 text-blue-500",
  email: "bg-purple-500/10 text-purple-500",
  meeting: "bg-orange-500/10 text-orange-500",
  task: "bg-green-500/10 text-green-500",
};

const statusConfig: Record<ActivityStatus, { icon: React.ElementType; variant: "default" | "success" | "error" | "warning"; label: string }> = {
  pending: { icon: Clock, variant: "warning", label: "Pending" },
  completed: { icon: CheckCircle, variant: "success", label: "Completed" },
  overdue: { icon: AlertCircle, variant: "error", label: "Overdue" },
};

export default function ActivitiesPage() {
  const [filter, setFilter] = useState<ActivityStatus | "all">("all");

  const filteredActivities = activities.filter(
    (activity) => filter === "all" || activity.status === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-text-dark">Activities</h1>
          <p className="text-text-muted mt-1">Track your tasks, calls, emails and meetings</p>
        </div>
        <Button variant="cta" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Activity
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
          className="gap-1"
        >
          <Filter className="w-4 h-4" />
          All
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("pending")}
          className="gap-1"
        >
          <Clock className="w-4 h-4" />
          Pending
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("completed")}
          className="gap-1"
        >
          <CheckCircle className="w-4 h-4" />
          Completed
        </Button>
        <Button
          variant={filter === "overdue" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("overdue")}
          className="gap-1"
        >
          <AlertCircle className="w-4 h-4" />
          Overdue
        </Button>
      </div>

      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">No activities found</p>
        </div>
      )}
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const Icon = typeIcons[activity.type];
  const statusInfo = statusConfig[activity.status];

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${typeColors[activity.type]}`}>
            <Icon className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-text-dark">{activity.title}</h3>
                <p className="text-sm text-text-muted mt-1">{activity.description}</p>
              </div>
              <Badge variant={statusInfo.variant} className="gap-1">
                <statusInfo.icon className="w-3 h-3" />
                {statusInfo.label}
              </Badge>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Calendar className="w-4 h-4" />
                <span>Due: {formatDate(activity.dueDate)}</span>
              </div>
              <Badge variant="default" className="capitalize">
                {activity.type}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
