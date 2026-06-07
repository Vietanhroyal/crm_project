"use client";

import { useState } from "react";
import { TimelineItem, TimelineItemType, RecordType } from "@/types";
import { TimelineComposer, typeConfig } from "./timeline-composer";
import { addTimelineItem } from "@/lib/timeline";

const filterLabels: Record<TimelineItemType | "all", string> = {
  all: "Tất cả",
  note: "Ghi chú",
  call: "Cuộc gọi",
  email: "Email",
  meeting: "Cuộc họp",
  task: "Task",
  system: "Hệ thống",
};

interface RecordTimelineProps {
  recordType: RecordType;
  recordId: string;
  items: TimelineItem[];
  onItemsChange: (items: TimelineItem[]) => void;
  createdBy?: string;
}

export function RecordTimeline({
  recordType,
  recordId,
  items,
  onItemsChange,
  createdBy = "Bạn",
}: RecordTimelineProps) {
  const [filter, setFilter] = useState<TimelineItemType | "all">("all");

  const filterTypes: (TimelineItemType | "all")[] = [
    "all",
    "note",
    "call",
    "email",
    "meeting",
    "task",
  ];

  const displayed = filter === "all" ? items : items.filter((i) => i.type === filter);

  const handleAdd = (data: { type: TimelineItemType; title: string; content: string }) => {
    const newItem = addTimelineItem(recordType, recordId, {
      ...data,
      createdAt: new Date().toLocaleString("vi-VN"),
      createdBy,
    });
    onItemsChange([newItem, ...items]);
  };

  return (
    <div className="space-y-4">
      <TimelineComposer onSubmit={handleAdd} />

      <div className="flex gap-2 flex-wrap">
        {filterTypes.map((ft) => (
          <button
            key={ft}
            type="button"
            onClick={() => setFilter(ft)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === ft
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-text-muted hover:bg-gray-200"
            }`}
          >
            {filterLabels[ft]}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-100" />
        <div className="space-y-6">
          {displayed.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-8 pl-10">
              Chưa có hoạt động nào
            </p>
          ) : (
            displayed.map((item) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;
              return (
                <div key={item.id} className="relative flex gap-4 pl-10">
                  <div
                    className={`absolute left-2 w-6 h-6 rounded-full ${config.color} flex items-center justify-center`}
                  >
                    <Icon className="w-3 h-3" />
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-text-dark text-sm">{item.title}</h4>
                      <span className="text-xs text-text-muted">{item.createdAt}</span>
                    </div>
                    <p className="text-sm text-text-dark mb-2">{item.content}</p>
                    <p className="text-xs text-text-muted">bởi {item.createdBy}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
