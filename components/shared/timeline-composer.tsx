"use client";

import { useState } from "react";
import { TimelineItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { PhoneCall, Mail, Calendar, FileText, CheckSquare } from "lucide-react";

const typeConfig: Record<
  TimelineItemType,
  { icon: React.ElementType; color: string; label: string }
> = {
  call: { icon: PhoneCall, color: "bg-blue-100 text-blue-600", label: "Cuộc gọi" },
  email: { icon: Mail, color: "bg-green-100 text-green-600", label: "Email" },
  meeting: { icon: Calendar, color: "bg-orange-100 text-orange-600", label: "Cuộc họp" },
  note: { icon: FileText, color: "bg-purple-100 text-purple-600", label: "Ghi chú" },
  task: { icon: CheckSquare, color: "bg-yellow-100 text-yellow-600", label: "Task" },
  system: { icon: FileText, color: "bg-gray-100 text-gray-600", label: "Hệ thống" },
};

interface TimelineComposerProps {
  onSubmit: (data: { type: TimelineItemType; title: string; content: string }) => void;
}

export function TimelineComposer({ onSubmit }: TimelineComposerProps) {
  const [activeType, setActiveType] = useState<TimelineItemType>("note");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const composableTypes: TimelineItemType[] = ["note", "call", "email", "meeting", "task"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({
      type: activeType,
      title: title.trim() || typeConfig[activeType].label,
      content: content.trim(),
    });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-xl">
      <div className="flex gap-2 flex-wrap">
        {composableTypes.map((type) => {
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề (tùy chọn)"
        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
  );
}

export { typeConfig };
