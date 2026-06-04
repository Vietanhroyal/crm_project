"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bell, Shield, Palette, Users } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-poppins text-text-dark">Settings</h1>
        <p className="text-text-muted mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                    HA
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-text-dark text-lg">Hoàng An</h3>
                <p className="text-text-muted text-sm">hoangan@company.com</p>
                <Badge variant="default" className="mt-2">
                  Admin
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <User className="w-4 h-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Bell className="w-4 h-4" />
              Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Shield className="w-4 h-4" />
              Security
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Palette className="w-4 h-4" />
              Appearance
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Users className="w-4 h-4" />
              Team
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-dark">First Name</label>
                  <Input defaultValue="Hoàng" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-dark">Last Name</label>
                  <Input defaultValue="An" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-dark">Email</label>
                <Input type="email" defaultValue="hoangan@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-dark">Phone</label>
                <Input type="tel" defaultValue="0901234567" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-dark">Position</label>
                <Input defaultValue="Sales Manager" />
              </div>
              <div className="flex justify-end">
                <Button variant="cta">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50">
                <div>
                  <p className="font-medium text-text-dark">Email Notifications</p>
                  <p className="text-sm text-text-muted">
                    Receive email updates about new leads and deals
                  </p>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50">
                <div>
                  <p className="font-medium text-text-dark">Push Notifications</p>
                  <p className="text-sm text-text-muted">
                    Receive push notifications for important updates
                  </p>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50">
                <div>
                  <p className="font-medium text-text-dark">Daily Summary</p>
                  <p className="text-sm text-text-muted">
                    Get a daily summary of your sales activities
                  </p>
                </div>
                <Badge variant="default">Disabled</Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50">
                <div>
                  <p className="font-medium text-text-dark">AI Insights</p>
                  <p className="text-sm text-text-muted">
                    Receive AI-powered insights and recommendations
                  </p>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
