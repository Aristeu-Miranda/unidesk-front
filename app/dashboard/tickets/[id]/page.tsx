'use client';

import { useParams, useRouter } from 'next/navigation';
import { mockTickets } from '@/lib/mock-tickets';
import { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    const [ticket, setTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [showAssignModal, setShowAssignModal] = useState(false);

    useEffect(() => {
        if (params.id) {
            const normalizedId = String(params.id).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

            const foundTicket = mockTickets.find(
                t => t.ticketNumber.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() === normalizedId
            );

            setTicket(foundTicket);
            setLoading(false);

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

                    <div className="border-t pt-6">
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
        </div>
    );
} 