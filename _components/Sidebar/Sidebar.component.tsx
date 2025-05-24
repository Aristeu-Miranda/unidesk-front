"use client"

import { LucideLayoutList, LucideTicket, LucideSearch, LucideMenu, LucideChevronLeft, LucideHome } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { LinkSideBar } from "../LinkSideBar"

export function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true)

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <aside className={cn(
            "h-[calc(100vh-6.5rem)] bg-quaternary border-r p-4 transition-all duration-300",
            isExpanded ? "w-64" : "w-20"
        )}>
            <div className={cn(
                "mb-4",
                isExpanded ? "flex justify-end" : "flex justify-center"
            )}>
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-full hover:bg-secondary-foreground/20"
                    aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isExpanded ? (
                        <LucideChevronLeft className="w-5 h-5" />
                    ) : (
                        <LucideMenu className="w-5 h-5" />
                    )}
                </button>
            </div>
            <nav className="space-y-4 mt-4">
                <div className="space-y-5">
                    <LinkSideBar
                        title="Dashboard"
                        href="/dashboard"
                        icon={<LucideHome className="w-5 h-5" />}
                        isExpanded={isExpanded}
                    />
                    <LinkSideBar
                        title="Lista de chamados"
                        href="/dashboard/tickets"
                        icon={<LucideLayoutList className="w-5 h-5" />}
                        isExpanded={isExpanded}
                    />
                    <LinkSideBar
                        title="Meus chamados"
                        href="/dashboard/mytickets"
                        icon={<LucideTicket className="w-5 h-5" />}
                        isExpanded={isExpanded}
                    />
                    <LinkSideBar
                        title="Pesquisa avançada"
                        href="/dashboard/search"
                        icon={<LucideSearch className="w-5 h-5" />}
                        isExpanded={isExpanded}
                    />
                </div>
            </nav>
        </aside>
    )
} 