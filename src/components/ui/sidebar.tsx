"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link, { LinkProps } from "next/link";
import React, { createContext, useContext, useState } from "react";

interface Links {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
}

interface DropdownLink extends Links {
    children?: Links[];
}

interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
    undefined
);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    const [openState, setOpenState] = useState(false);

    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

    return (
        <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
    return (
        <>
            <DesktopSidebar {...props} />
            <MobileSidebar {...(props as React.ComponentProps<"div">)} />
        </>
    );
};

export const DesktopSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen, animate } = useSidebar();
    return (
        <>
            <motion.div
                className={cn(
                    "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0",
                    className
                )}
                animate={{
                    width: animate ? (open ? "300px" : "60px") : "300px",
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                {...props}
            >
                {children}
            </motion.div>
        </>
    );
};

export const MobileSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) => {
    const { open, setOpen } = useSidebar();
    return (
        <div
            className={cn(
                "flex flex-col hidden bg-neutral-100 dark:bg-neutral-800 w-full"
            )}
            {...props}
        >
            <div className="flex justify-end z-20 w-full p-4">
                <IconMenu2
                    className="text-neutral-800 dark:text-neutral-200"
                    onClick={() => setOpen(!open)}
                />
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                        }}
                        className={cn(
                            "fixed inset-0 bg-white dark:bg-neutral-900 z-[100] flex flex-col",
                            className
                        )}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold">Menu</h2>
                            <IconX
                                className="text-neutral-800 dark:text-neutral-200"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const SidebarLink = ({
    link,
    className,
    ...props
}: {
    link: Links;
    className?: string;
    props?: LinkProps;
}) => {
    const { open, animate } = useSidebar();
    return (
        <Link
            href={link.href}
            className={cn(
                "flex items-center justify-start gap-2  group/sidebar py-2",
                className
            )}
            {...props}
        >
            {link.icon}

            <motion.span
                animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
                {link.label}
            </motion.span>
        </Link>
    );
};

export const SidebarDropdown = ({
    link,
    className,
}: {
    link: DropdownLink;
    className?: string;
}) => {
    const { open: sidebarOpen } = useSidebar();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col">
            <button
                onClick={() => setOpen(!open)}
                className={cn(
                    "flex items-center justify-between w-full py-2 px-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors",
                    className
                )}
            >
                <div className="flex items-center gap-2">
                    {link.icon}
                    <span className={cn(
                        "text-neutral-700 dark:text-neutral-200 text-sm whitespace-nowrap",
                        !sidebarOpen && "md:hidden"
                    )}>
                        {link.label}
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    className={cn("transition-transform", !sidebarOpen && "md:hidden")}
                >
                    <IconChevronDown className="h-4 w-4 text-neutral-700 dark:text-neutral-200" />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4"
                    >
                        {link.children?.map((child, idx) => (
                            <SidebarLink
                                key={idx}
                                link={child}
                                className="border-l border-neutral-200 dark:border-neutral-700 pl-4"
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};