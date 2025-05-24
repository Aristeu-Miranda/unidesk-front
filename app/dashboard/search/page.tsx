"use client";

import { useState, useMemo } from "react";
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

export default function AdvancedSearch() {
    const [searchParams, setSearchParams] = useState({
        ticketNumber: "",
        openingDate: "",
        reporter: "",
        assignee: ""
    });
    const [searchTriggered, setSearchTriggered] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        setSearchTriggered(true);
    };

    const filteredTickets = useMemo(() => {
        if (!searchTriggered) {
            return [];
        }
        // If no search parameters are provided, return an empty array
        if (searchParams.ticketNumber === "" && searchParams.openingDate === "" && searchParams.reporter === "" && searchParams.assignee === "") {
            return [];
        }
        return mockTickets.filter(ticket => {
            const matchesTicketNumber = searchParams.ticketNumber === "" ||
                ticket.ticketNumber.toLowerCase().includes(searchParams.ticketNumber.toLowerCase());
            const matchesOpeningDate = searchParams.openingDate === "" ||
                ticket.registrationDate.includes(searchParams.openingDate);
            const matchesReporter = searchParams.reporter === "" ||
                ticket.reporter.toLowerCase().includes(searchParams.reporter.toLowerCase());
            const matchesAssignee = searchParams.assignee === "" ||
                ticket.assignee.toLowerCase().includes(searchParams.assignee.toLowerCase());
            return matchesTicketNumber && matchesOpeningDate && matchesReporter && matchesAssignee;
        });
    }, [searchParams, searchTriggered]);

    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

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
            <h1 className="text-2xl font-bold mb-6">Pesquisa Avançada</h1>

            <div className="mb-6 space-y-4">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="ticketNumber">Número do Ticket</label>
                    <input
                        type="text"
                        id="ticketNumber"
                        name="ticketNumber"
                        value={searchParams.ticketNumber}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        placeholder="Digite o número do ticket"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="openingDate">Data de Abertura</label>
                    <input
                        type="text"
                        id="openingDate"
                        name="openingDate"
                        value={searchParams.openingDate}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        placeholder="Digite a data de abertura"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="reporter">Solicitante</label>
                    <input
                        type="text"
                        id="reporter"
                        name="reporter"
                        value={searchParams.reporter}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        placeholder="Digite o nome do solicitante"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="assignee">Analista</label>
                    <input
                        type="text"
                        id="assignee"
                        name="assignee"
                        value={searchParams.assignee}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        placeholder="Digite o nome do analista"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Fazer pesquisa
                </button>
            </div>

            {filteredTickets.length === 0 && (searchParams.ticketNumber !== "" || searchParams.openingDate !== "" || searchParams.reporter !== "" || searchParams.assignee !== "") ? (
                <div className="bg-gray-50 rounded-md p-6 text-center">
                    <p className="text-gray-500">Hm... nenhum chamado encontrado</p>
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