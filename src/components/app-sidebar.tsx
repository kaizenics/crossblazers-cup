"use client";
import {
    IconBrandTabler,
    IconChartBar,
    IconList,
    IconSettings,
    IconTable,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, SidebarDropdown } from "./ui/sidebar";

interface LinkItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    children?: LinkItem[];
}

export function AppSidebar({ children }: { children: React.ReactNode }) {
    const links: LinkItem[] = [
        {
            label: "Dashboard",
            href: "#",
            icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            children: [
                {
                    label: "Overview",
                    href: "/dashboard",
                    icon: <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
                },
                {
                    label: "Tabulation",
                    href: "/dashboard/tabulation",
                    icon: <IconTable className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
                },
                {
                    label: "Updates",
                    href: "/dashboard/updates",
                    icon: <IconList className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
                },
                {
                    label: "Activities",
                    href: "/dashboard/activities",
                    icon: <IconList className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
                }
            ]
        },
        {
            label: "Settings",
            href: "#",
            icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            children: [
                {
                    label: "User",
                    href: "/dashboard",
                    icon: <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
                },
                {
                    label: "Change Password",
                    href: "/dashboard/tabulation",
                    icon: <IconTable className="text-neutral-700 dark:text-neutral-200 h-4 w-4 flex-shrink-0" />,
                },
                
            ]
        },
    ];

    const [open, setOpen] = useState(false);

    return (
        <div className="h-screen w-screen flex overflow-hidden bg-gray-100 dark:bg-neutral-900">
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="flex flex-col h-full justify-between">
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                link.children ? (
                                    <SidebarDropdown key={idx} link={link} />
                                ) : (
                                    <SidebarLink key={idx} link={link} />
                                )
                            ))}
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 px-4 py-2 border-t border-neutral-200 dark:border-neutral-700">
                        <Image
                            src="/images/me.png"
                            className="h-8 w-8 rounded-full"
                            width={32}
                            height={32}
                            alt="Avatar"
                        />
                        {open && (
                            <div className="text-sm text-neutral-700 dark:text-neutral-300">
                               User
                            </div>
                        )}
                    </div>
                </SidebarBody>
            </Sidebar>
            <main className="flex-1 overflow-auto py-2 sm:py-4 md:py-8">
                <div className="w-full px-2 sm:px-4 md:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

export const Logo = () => (
    <Link href="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-montserrat font-medium text-black dark:text-white whitespace-pre"
        >
            Cross Blazers Cup Admin
        </motion.span>
    </Link>
);

export const LogoIcon = () => (
    <Link href="/" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
);