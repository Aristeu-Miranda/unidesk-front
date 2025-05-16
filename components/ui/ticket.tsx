import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";

interface TicketProps extends React.HTMLAttributes<HTMLDivElement> {
    ticketNumber?: string;
    reporter?: string;
    assignee?: string;
    registrationDate?: string;
    priority?: 'Alta' | 'Média' | 'Baixa';
    title?: string;
    status?: 'Em aberto' | 'Aguardando usuário' | 'SLA estourado' | 'Finalizado' | 'Cancelado';
    slaN1?: string;
    href?: string;
}

export function Ticket({
    ticketNumber = "-",
    reporter = "-",
    assignee = "-",
    registrationDate = "-",
    priority = "Baixa",
    title = "-",
    status = "Em aberto",
    slaN1 = "-",
    href = "#",
    className,
    ...props
}: TicketProps) {
    const isExpiredSLA = status === 'SLA estourado';
    const isWaitingForUser = status === 'Aguardando usuário';
    const isOpen = status === 'Em aberto';
    const isHighPriority = priority === 'Alta';

    const containerStyles = cn(
        "flex items-center w-full p-2 mb-2 border border-gray-300 rounded-md transition-colors cursor-pointer",
        isExpiredSLA && "bg-red-200",
        isWaitingForUser && "bg-yellow-50",
        isOpen && "bg-green-50",
        !isExpiredSLA && !isWaitingForUser && !isOpen && "hover:bg-gray-100/5",
        className
    );

    const priorityTextColor = isHighPriority ? "text-red-600" : "text-inherit";
    const titleTextColor = isHighPriority ? "text-red-600" : "text-inherit";
    const statusTextColor = isExpiredSLA ? "text-red-600" : "text-inherit";
    const slaTextColor = isExpiredSLA ? "text-red-600" : "text-inherit";

    return (
        <Link href={href} className="block w-full">
            <div
                className={containerStyles}
                {...props}
            >
                <div className="grid grid-cols-8 w-full gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">N° Chamado</span>
                        <span className="font-medium text-xs">{ticketNumber}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">Relator</span>
                        <span className="text-xs">{reporter}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">Designado</span>
                        <span className="text-xs">{assignee}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">Data Cadastro</span>
                        <span className="text-xs">{registrationDate}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">Prioridade</span>
                        <span className={`${priorityTextColor} text-xs`}>{priority}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">Título</span>
                        <span className={`truncate ${titleTextColor} text-xs`} >{title}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">Status</span>
                        <span className={`${statusTextColor} text-xs`}>{status}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-500">SLA N1</span>
                        <span className={`${slaTextColor} text-xs`}>{slaN1}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
} 