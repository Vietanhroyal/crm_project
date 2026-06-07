"use client";

import { Bell, Search, ChevronDown, Sparkles, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "./sidebar-context";
import { useI18n } from "@/lib/i18n";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  onSearchClick?: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  const { isCollapsed } = useSidebar();
  const { t } = useI18n();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100",
        isCollapsed ? "lg:left-20" : "lg:left-64"
      )}
    >
      <div className="flex items-center justify-between px-6 h-full">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder={t("search.placeholder")}
              className="pl-10 bg-gray-50/50 border-0 cursor-pointer"
              readOnly
              onClick={onSearchClick}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-text-muted bg-gray-100 px-1.5 py-0.5 rounded">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NotificationBell />

          <Button variant="cta" size="sm" className="gap-2">
            <Sparkles className="w-4 h-4" />
            AI Insights
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2 pr-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    HA
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm">Hoàng An</span>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
