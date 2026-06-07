"use client";

import { useState } from "react";
import { activities as initialActivities } from "@/lib/mock-data";
import { Activity, ActivityStatus, ActivityType } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { ActivityForm } from "@/components/activities/activity-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [activityList, setActivityList] = useState<Activity[]>(initialActivities);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const filteredActivities = activityList.filter(
    (activity) => filter === "all" || activity.status === filter
  );

  const handleAddActivity = (activity: Omit<Activity, "id">) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
    };
    setActivityList([newActivity, ...activityList]);
    setIsAddModalOpen(false);
  };

  const handleUpdateActivity = (activity: Omit<Activity, "id">) => {
    if (editingActivity) {
      setActivityList(
        activityList.map((a) =>
          a.id === editingActivity.id ? { ...a, ...activity } : a
        )
      );
      setEditingActivity(null);
    }
  };

  const handleDeleteActivity = (id: string) => {
    setActivityList(activityList.filter((a) => a.id !== id));
  };

  const handleStatusChange = (id: string, status: ActivityStatus) => {
    setActivityList(
      activityList.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-text-dark">Activities</h1>
          <p className="text-text-muted mt-1">Track your tasks, calls, emails and meetings</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button variant="cta" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
            </DialogHeader>
            <ActivityForm onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddActivity} />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingActivity} onOpenChange={() => setEditingActivity(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Activity</DialogTitle>
            </DialogHeader>
            <ActivityForm activity={editingActivity} onClose={() => setEditingActivity(null)} onSubmit={handleUpdateActivity} />
          </DialogContent>
        </Dialog>
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
          <ActivityCard 
            key={activity.id} 
            activity={activity}
            onEdit={() => setEditingActivity(activity)}
            onDelete={() => handleDeleteActivity(activity.id)}
            onStatusChange={(status) => handleStatusChange(activity.id, status)}
          />
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

function ActivityCard({ 
  activity, 
  onEdit, 
  onDelete,
  onStatusChange,
}: { 
  activity: Activity;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: ActivityStatus) => void;
}) {
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
              <div className="flex items-center gap-2">
                <select
                  value={activity.status}
                  onChange={(e) => onStatusChange(e.target.value as ActivityStatus)}
                  className={`text-xs px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    activity.status === "completed" ? "bg-green-100 text-green-700" :
                    activity.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2" onClick={onEdit}>
                      <Edit className="w-4 h-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-red-600" onClick={onDelete}>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
