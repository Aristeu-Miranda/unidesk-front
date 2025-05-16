"use client";

import { Ticket } from "@/components/ui/ticket";
import { mockTickets } from "@/lib/mock-tickets";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { useState, useMemo } from "react";

export default function MyTickets() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const myTickets = useMemo(() => {
        return [...mockTickets]
            .filter(ticket =>
                (ticket.status !== "Finalizado" && ticket.status !== "Cancelado") &&
                ticket.assignee === "Aristeu Miranda"
            )
            .sort((a, b) => {
                // Show open tickets first
                if (a.status === "Em aberto" && b.status !== "Em aberto") return -1;
                if (a.status !== "Em aberto" && b.status === "Em aberto") return 1;

                // Then by priority
                const priorityOrder = { "Alta": 0, "Média": 1, "Baixa": 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
    }, []);

    const totalPages = Math.ceil(myTickets.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = myTickets.slice(indexOfFirstItem, indexOfLastItem);

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPageButtons = 5;

        if (totalPages <= maxPageButtons) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 2) {
                endPage = 3;
            } else if (currentPage >= totalPages - 1) {
                startPage = totalPages - 2;
            }

            if (startPage > 2) {
                pages.push('ellipsis-start');
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages - 1) {
                pages.push('ellipsis-end');
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const getTicketUrl = (ticketNumber: string) => {
        return `/dashboard/tickets/${ticketNumber.replace(/[^a-zA-Z0-9]/g, '')}`;
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Meus Tickets</h1>

            {myTickets.length === 0 ? (
                <div className="bg-gray-50 rounded-md p-6 text-center">
                    <p className="text-gray-500">Você não possui tickets atribuídos no momento.</p>
                </div>
            ) : (
                <>
                    <div className="space-y-2 mb-6">
                        {currentTickets.map((ticket) => (
                            <Ticket
                                key={ticket.ticketNumber}
                                ticketNumber={ticket.ticketNumber}
                                reporter={ticket.reporter}
                                assignee={ticket.assignee}
                                registrationDate={ticket.registrationDate}
                                priority={ticket.priority}
                                title={ticket.title}
                                status={ticket.status}
                                slaN1={ticket.slaN1}
                                href={getTicketUrl(ticket.ticketNumber)}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                                        style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed', opacity: currentPage > 1 ? 1 : 0.5 }}
                                    />
                                </PaginationItem>

                                {getPageNumbers().map((page, index) => {
                                    if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                                        return (
                                            <PaginationItem key={`ellipsis-${index}`}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        );
                                    }

                                    return (
                                        <PaginationItem key={`page-${page}`}>
                                            <PaginationLink
                                                isActive={page === currentPage}
                                                onClick={() => goToPage(page as number)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                                        style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed', opacity: currentPage < totalPages ? 1 : 0.5 }}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </>
            )}
        </div>
    );
} 