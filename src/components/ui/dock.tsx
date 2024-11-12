"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, User, GamepadIcon, Settings, Trophy, LucideIcon } from "lucide-react";

interface DockItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const DockItem: React.FC<DockItemProps> = ({ href, icon: Icon, label }) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center gap-1 p-1 sm:p-2 cursor-pointer"
      >
        <div className="bg-white/10 p-2 sm:p-3 rounded-xl hover:bg-white/20 transition-colors">
          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
        <span className="text-[10px] sm:text-xs text-white/80 hidden sm:block">{label}</span>
      </motion.div>
    </Link>
  );
};

export const Dock: React.FC = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 sm:bottom-8 flex justify-center items-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/50 backdrop-blur-md rounded-2xl p-1 sm:p-2 border border-white/20"
      >
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <DockItem href="/" icon={Home} label="Home" />
          <DockItem href="/profile" icon={User} label="Profile" />
          <DockItem href="/trivia" icon={GamepadIcon} label="Play" />
          <DockItem href="/leaderboard" icon={Trophy} label="Ranks" />
          <DockItem href="/settings" icon={Settings} label="Settings" />
        </div>
      </motion.div>
    </div>
  );
};
