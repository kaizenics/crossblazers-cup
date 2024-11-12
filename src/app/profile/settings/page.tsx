"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dock } from "@/components/ui/dock";
import { Container } from "@/components/ui/container";
import { LogOut, ChevronRight, Bell, Shield, HelpCircle } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

export default function ProfileSettings() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.setItem("logout", "true");
    toast.success("Successfully signed out");
    router.push("/login");
  };

  const settingsItems = [
    {
      title: "Notifications",
      description: "Manage your notification preferences",
      icon: Bell,
    },
    {
      title: "Privacy",
      description: "Control your privacy settings",
      icon: Shield,
    },
    {
      title: "Help & Support",
      description: "Get help or contact support",
      icon: HelpCircle,
    },
  ];

  return (
    <Container variant={"fullMobileBreakpointPadded"}>
      <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>

          {/* Settings Options */}
          <div className="space-y-4">
            {settingsItems.map((item) => (
              <Card 
                key={item.title} 
                className="bg-white/5 border-white/10"
              >
                <button className="w-full text-left">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-white/10">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </CardContent>
                </button>
              </Card>
            ))}
          </div>

          <Separator className="bg-white/10" />

          {/* Sign Out Button */}
          <Card className="bg-red-500/10 border-red-500/20">
            <button 
              onClick={handleSignOut}
              className="w-full text-left"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-red-500/10">
                    <LogOut className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-red-400">Sign Out</h3>
                    <p className="text-sm text-red-400/70">Sign out of your account</p>
                  </div>
                </div>
              </CardContent>
            </button>
          </Card>
        </div>
        <Dock />
      </div>
    </Container>
  );
}