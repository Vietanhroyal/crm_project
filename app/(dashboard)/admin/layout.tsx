"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminSubnav } from "@/components/admin/admin-subnav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <AdminSubnav />
        {children}
      </div>
    </AdminGuard>
  );
}