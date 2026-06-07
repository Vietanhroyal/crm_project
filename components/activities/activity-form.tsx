"use client";

import { useState } from "react";
import { Activity, ActivityType, ActivityStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, Calendar, CheckCircle } from "lucide-react";

interface ActivityFormProps {
  activity?: Activity | null;
  onClose: () => void;
  onSubmit: (activity: Omit<Activity, "id">) => void;
}

const typeOptions: { value: ActivityType; label: string; icon: React.ElementType }[] = [
  { value: "call", label: "Call", icon: Phone },
  { value: "email", label: "Email", icon: Mail },
  { value: "meeting", label: "Meeting", icon: Calendar },
  { value: "task", label: "Task", icon: CheckCircle },
];

const statusOptions: { value: ActivityStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" },
];

export function ActivityForm({ activity, onClose, onSubmit }: ActivityFormProps) {
  const [title, setTitle] = useState(activity?.title || "");
  const [type, setType] = useState<ActivityType>(activity?.type || "task");
  const [dueDate, setDueDate] = useState(activity?.dueDate || "");
  const [status, setStatus] = useState<ActivityStatus>(activity?.status || "pending");
  const [description, setDescription] = useState(activity?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      type,
      title,
      description,
      dueDate,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-dark">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter activity title"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-dark">Type</label>
        <div className="flex gap-2">
          {typeOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setType(option.value)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  type === option.value
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-text-muted hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-dark">Due Date</label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-dark">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ActivityStatus)}
            className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-dark">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="cta">
          {activity ? "Update Activity" : "Add Activity"}
        </Button>
      </div>
    </form>
  );
}