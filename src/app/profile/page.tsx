"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Ticket, Mail, TrendingUpIcon } from "lucide-react";

export default function UserProfileDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, [router]);

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); 
  };

  return (
    <div className="min-h-screen text-white p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                {user?.user_metadata?.full_name || "User"}
              </h1>
              <p className="text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
            </div>
          </div>

          <Button
            variant={"destructive"}
            className="bg-primary hover:bg-primary/90"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/25 border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Trivia Time
              </CardTitle>
              <Timer className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1 min. 30 sec.</div>
              <p className="text-xs text-gray-400">
                1 min. 30 sec. points this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/25 border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-400">3 active raffles</p>
            </CardContent>
          </Card>

          <Card className="bg-white/25 border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trivia Rank</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#42</div>
              <p className="text-xs text-gray-400">Top 5% of users</p>
            </CardContent>
          </Card>
        </div>

        <div className="">
          <Card className="col-span-2 bg-white/20 border border-white/20">
            <CardHeader>
              <CardTitle>My Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-4 flex flex-wrap gap-4">
                <Badge
                  icon={<Ticket className="w-4 h-4" />}
                  text={user?.email || "No email available"}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
    {icon}
    <span>{text}</span>
  </div>
);
