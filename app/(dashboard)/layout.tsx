"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SidebarProvider, useSidebar } from "@/components/layout/sidebar-context";
import { I18nProvider } from "@/lib/i18n";
import { CommandPalette } from "@/components/search/command-palette";
import { cn } from "@/lib/utils";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />
      <Header onSearchClick={() => setIsSearchOpen(true)} />
      <CommandPalette open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out pt-14",
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <I18nProvider>
        <DashboardContent>{children}</DashboardContent>
      </I18nProvider>
    </SidebarProvider>
  );
}
