import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LinkSideBarProps {
    title: string;
    href: string;
    icon: ReactNode;
    isExpanded: boolean;
}

export function LinkSideBar({ title, href, icon, isExpanded }: LinkSideBarProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary-foreground/20 transition-colors",
                !isExpanded && "justify-center"
            )}
        >
            {icon}
            <span className={cn("text-sm transition-opacity",
                isExpanded ? "opacity-100" : "opacity-0 hidden"
            )}>
                {title}
            </span>
        </Link>
    )
}