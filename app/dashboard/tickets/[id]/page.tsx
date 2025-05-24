'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockTickets, updateTicketStatus, updateTicketLinkedAssets } from '@/lib/mock-tickets';
import { mockAssets, Asset } from '@/lib/mock-assets';
import { useToast } from '@/components/ui/use-toast';
import { useState, useEffect } from 'react';
import { ArrowLeft, X, Plus, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Comment {
    id: string;
    author: string;
    text: string;
    date: string;
    initials: string;
}

export default function TicketDetail() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const [ticket, setTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [linkedAssets, setLinkedAssets] = useState<Asset[]>([]);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [statusAction, setStatusAction] = useState<'Em atendimento' | 'Aguardando Usuário' | 'Cancelar' | 'Finalizar' | null>(null);
    const [statusCommentText, setStatusCommentText] = useState('');

    const notebooks = mockAssets.filter(asset => asset.category === 'notebook');
    const monitors = mockAssets.filter(asset => asset.category === 'monitor');
    const headsets = mockAssets.filter(asset => asset.category === 'headset');

    useEffect(() => {
        if (params.id) {
            const normalizedId = String(params.id).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

            const foundTicket = mockTickets.find(
                t => t.ticketNumber.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() === normalizedId
            );

            setTicket(foundTicket);
            setLoading(false);

            // Load linked assets if present
            if (foundTicket?.linkedAssets?.length) {
                const assets = foundTicket.linkedAssets
                    .map(id => mockAssets.find(asset => asset.id === id))
                    .filter(asset => asset !== undefined) as Asset[];

                setLinkedAssets(assets);
            }

            if (foundTicket && foundTicket.status === 'Em aberto' && !foundTicket.assignee) {
                setShowAssignModal(true);
            }
        }
    }, [params.id]);

    const goBack = () => {
        router.back();
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!commentText.trim()) return;

        const author = ticket.assignee || "Suporte de T.I.";
        const initials = getInitials(author);

        const newComment: Comment = {
            id: Date.now().toString(),
            author: author,
            text: commentText,
            date: new Date().toLocaleDateString('pt-BR'),
            initials: initials
        };

        setComments([...comments, newComment]);
        setCommentText('');
    };

    const handleAssignTicket = () => {
        setTicket({
            ...ticket,
            assignee: "Você"
        });
        setShowAssignModal(false);
    };

    const closeAssignModal = () => {
        setShowAssignModal(false);
    };

    const handleStatusAction = (action: 'Aguardando Usuário' | 'Cancelar' | 'Finalizar') => {
        setStatusAction(action);
        setShowStatusModal(true);
    };

    const closeStatusModal = () => {
        setShowStatusModal(false);
        setStatusAction(null);
        setStatusCommentText('');
    };

    const confirmStatusChange = () => {
        if (!statusAction) return;

        let newStatus = ticket.status;
        let successMessage = "";

        if (statusAction === 'Finalizar') {
            newStatus = 'Finalizado';
            successMessage = "Ticket finalizado com sucesso!";
        } else if (statusAction === 'Cancelar') {
            newStatus = 'Cancelado';
            successMessage = "Ticket cancelado com sucesso!";
        } else if (statusAction === 'Aguardando Usuário') {
            newStatus = 'Aguardando usuário';
            successMessage = "Status do ticket alterado para Aguardando Usuário";
        }

        // Update local state
        setTicket({
            ...ticket,
            status: newStatus
        });

        // Update global mock data
        updateTicketStatus(ticket.ticketNumber, newStatus);

        if (statusCommentText.trim()) {
            const author = ticket.assignee || "Suporte de T.I.";
            const initials = getInitials(author);

            const newComment: Comment = {
                id: Date.now().toString(),
                author: author,
                text: statusCommentText,
                date: new Date().toLocaleDateString('pt-BR'),
                initials: initials
            };

            setComments([...comments, newComment]);
        }

        closeStatusModal();

        // If ticket is finished or canceled, redirect to tickets list
        if (newStatus === 'Finalizado' || newStatus === 'Cancelado') {
            toast({
                variant: "success",
                title: successMessage,
                description: `Ticket ${ticket.ticketNumber} foi ${newStatus.toLowerCase()}.`,
            });

            // Redirect to tickets list
            router.push('/dashboard/tickets');
        } else {
            toast({
                variant: "success",
                title: successMessage,
            });
        }
    };

    const addAsset = (asset: Asset) => {
        if (!linkedAssets.some(a => a.id === asset.id)) {
            const updatedAssets = [...linkedAssets, asset];
            setLinkedAssets(updatedAssets);

            // Update mock data
            if (ticket) {
                updateTicketLinkedAssets(
                    ticket.ticketNumber,
                    updatedAssets.map(a => a.id)
                );
            }
        }
    };

    const removeAsset = (assetId: string) => {
        const updatedAssets = linkedAssets.filter(asset => asset.id !== assetId);
        setLinkedAssets(updatedAssets);

        // Update mock data
        if (ticket) {
            updateTicketLinkedAssets(
                ticket.ticketNumber,
                updatedAssets.map(a => a.id)
            );
        }
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-120px)] overflow-y-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Carregando ticket...</h1>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="h-[calc(100vh-120px)] overflow-y-auto p-6">
                <div className="flex items-center mb-6">
                    <button onClick={goBack} className="mr-4 hover:text-gray-600">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Ticket não encontrado</h1>
                </div>
                <p>O ticket com o ID {params.id} não foi encontrado.</p>
            </div>
        );
    }

    const getStatusBadgeClass = () => {
        switch (ticket.status) {
            case 'Em aberto':
                return 'bg-green-100 text-green-800';
            case 'Aguardando usuário':
                return 'bg-yellow-100 text-yellow-800';
            case 'SLA estourado':
                return 'bg-red-100 text-red-800';
            case 'Finalizado':
                return 'bg-blue-100 text-blue-800';
            case 'Cancelado':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityBadgeClass = () => {
        switch (ticket.priority) {
            case 'Alta':
                return 'bg-red-100 text-red-800';
            case 'Média':
                return 'bg-blue-100 text-blue-800';
            case 'Baixa':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const assignedTicket = () => {
        setShowAssignModal(true)
    }

    return (
        <div className="h-[calc(100vh-120px)] overflow-y-auto">
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <button onClick={goBack} className="mr-4 hover:text-gray-600">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">Detalhes do Ticket</h1>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-gray-500 text-sm">Ticket</span>
                            <h2 className="text-xl font-bold">{ticket.ticketNumber}</h2>
                        </div>
                        <div className="flex space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadgeClass()}`}>
                                {ticket.priority}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass()}`}>
                                {ticket.status}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
                                    Status
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={() => assignedTicket()}>
                                        Em atendimento
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusAction('Aguardando Usuário')}>
                                        Aguardando Usuário
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusAction('Cancelar')}>
                                        Cancelar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleStatusAction('Finalizar')}>
                                        Finalizar
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">{ticket.title}</h3>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <span className="text-gray-500 text-sm block">Relator</span>
                            <span className="font-medium">{ticket.reporter}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm block">Designado</span>
                            <span className="font-medium">{ticket.assignee || "Nenhum"}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm block">Data de Cadastro</span>
                            <span className="font-medium">{ticket.registrationDate}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 text-sm block">SLA N1</span>
                            <span className={`font-medium ${ticket.status === 'SLA estourado' ? 'text-red-600' : ''}`}>
                                {ticket.slaN1}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-b py-6 mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500 text-sm">Ativos Vinculados</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200">
                                    <Plus className="h-4 w-4 mr-1" />
                                    Adicionar
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 max-h-[300px] overflow-y-auto">
                                    <DropdownMenuLabel>Notebooks</DropdownMenuLabel>
                                    {notebooks.map(asset => (
                                        <DropdownMenuItem
                                            key={asset.id}
                                            onClick={() => addAsset(asset)}
                                        >
                                            {asset.id} - {asset.description}
                                        </DropdownMenuItem>
                                    ))}

                                    <DropdownMenuSeparator />

                                    <DropdownMenuLabel>Monitores</DropdownMenuLabel>
                                    {monitors.map(asset => (
                                        <DropdownMenuItem
                                            key={asset.id}
                                            onClick={() => addAsset(asset)}
                                        >
                                            {asset.id} - {asset.description}
                                        </DropdownMenuItem>
                                    ))}

                                    <DropdownMenuSeparator />

                                    <DropdownMenuLabel>Headsets</DropdownMenuLabel>
                                    {headsets.map(asset => (
                                        <DropdownMenuItem
                                            key={asset.id}
                                            onClick={() => addAsset(asset)}
                                        >
                                            {asset.id} - {asset.description}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="mt-3">
                            {linkedAssets.length === 0 ? (
                                <p className="text-gray-500 text-sm">Nenhum ativo vinculado.</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {linkedAssets.map(asset => (
                                        <div
                                            key={asset.id}
                                            className="inline-flex items-center bg-gray-100 text-gray-800 rounded-md px-3 py-1 text-sm"
                                        >
                                            <span>{asset.id}</span>
                                            <button
                                                onClick={() => removeAsset(asset.id)}
                                                className="ml-2 text-gray-500 hover:text-red-500"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-2">
                        <h4 className="font-medium mb-2">Descrição</h4>
                        <p className="text-gray-700">
                            Esta é uma descrição detalhada do problema reportado neste ticket.
                            Por favor, entre em contato com o relator para obter mais informações, se necessário.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="font-semibold mb-4">Comentários</h3>
                    <div className="space-y-4">
                        {comments.length === 0 ? (
                            <p className="text-gray-500 text-sm">Nenhum comentário ainda.</p>
                        ) : (
                            comments.map(comment => (
                                <div key={comment.id} className="flex items-start">
                                    <Avatar className="h-10 w-10 mr-3">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.initials}`} alt={comment.author} />
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            {comment.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="font-medium">{comment.author}</span>
                                            <span className="text-gray-500 text-sm">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold mb-4">Adicionar Comentário</h3>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            placeholder="Digite seu comentário aqui..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Enviar Comentário
                        </button>
                    </form>
                </div>
            </div>

            {showAssignModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 pointer-events-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Assumir Ticket</h3>
                            <button
                                onClick={closeAssignModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="mb-6">Deseja assumir esse ticket para sua fila?</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeAssignModal}
                                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                                Não
                            </button>
                            <button
                                onClick={handleAssignTicket}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Sim
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showStatusModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 pointer-events-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {statusAction === 'Finalizar' ? 'Finalizar Ticket' :
                                    statusAction === 'Cancelar' ? 'Cancelar Ticket' :
                                        'Alterar Status do Ticket'}
                            </h3>
                            <button
                                onClick={closeStatusModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="mb-4">
                            {statusAction === 'Finalizar' ? 'Deseja finalizar este ticket?' :
                                statusAction === 'Cancelar' ? 'Deseja cancelar este ticket?' :
                                    'Deseja alterar o status para Aguardando Usuário?'}
                        </p>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Adicionar comentário
                            </label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                                placeholder="Digite seu comentário aqui..."
                                value={statusCommentText}
                                onChange={(e) => setStatusCommentText(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeStatusModal}
                                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmStatusChange}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 