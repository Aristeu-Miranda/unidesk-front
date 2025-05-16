export interface TicketData {
    ticketNumber: string;
    reporter: string;
    assignee: string;
    registrationDate: string;
    priority: 'Alta' | 'Média' | 'Baixa';
    title: string;
    status: 'Em aberto' | 'Aguardando usuário' | 'SLA estourado' | 'Finalizado' | 'Cancelado';
    slaN1: string;
    linkedAssets?: string[]; // Array of asset IDs
}

// Helper function to generate dates within the last 7 days
function getRecentDate(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('pt-BR');
}

export const mockTickets: TicketData[] = [
    // 5 tickets with expired SLA
    {
        ticketNumber: "TK-1001",
        reporter: "Marcos Silva",
        assignee: "Aristeu Miranda",
        registrationDate: getRecentDate(6),
        priority: "Alta",
        title: "Erro crítico no servidor principal",
        status: "SLA estourado",
        slaN1: "24h"
    },
    {
        ticketNumber: "TK-1032",
        reporter: "Julia Pereira",
        assignee: "Alex Sander",
        registrationDate: getRecentDate(5),
        priority: "Alta",
        title: "Sistema ERP fora do ar",
        status: "SLA estourado",
        slaN1: "4h"
    },
    {
        ticketNumber: "TK-1045",
        reporter: "Carlos Eduardo",
        assignee: "Thais Campos",
        registrationDate: getRecentDate(5),
        priority: "Média",
        title: "Problemas com o backup automático",
        status: "SLA estourado",
        slaN1: "8h"
    },
    {
        ticketNumber: "TK-1078",
        reporter: "Patricia Lopes",
        assignee: "Yago",
        registrationDate: getRecentDate(4),
        priority: "Média",
        title: "Falha na sincronização de dados",
        status: "SLA estourado",
        slaN1: "12h"
    },
    {
        ticketNumber: "TK-1092",
        reporter: "Roberto Almeida",
        assignee: "Victor Vargas",
        registrationDate: getRecentDate(4),
        priority: "Baixa",
        title: "Atualização de plugin necessária",
        status: "SLA estourado",
        slaN1: "48h"
    },

    // 3 tickets waiting for users
    {
        ticketNumber: "TK-1110",
        reporter: "Fernanda Costa",
        assignee: "Aristeu Miranda",
        registrationDate: getRecentDate(3),
        priority: "Alta",
        title: "Configuração de novo dispositivo",
        status: "Aguardando usuário",
        slaN1: "6h"
    },
    {
        ticketNumber: "TK-1123",
        reporter: "Diego Santos",
        assignee: "Alex Sander",
        registrationDate: getRecentDate(3),
        priority: "Média",
        title: "Dúvidas sobre acesso ao sistema",
        status: "Aguardando usuário",
        slaN1: "24h"
    },
    {
        ticketNumber: "TK-1145",
        reporter: "Camila Ferreira",
        assignee: "Thais Campos",
        registrationDate: getRecentDate(2),
        priority: "Baixa",
        title: "Solicitação de relatório personalizado",
        status: "Aguardando usuário",
        slaN1: "48h"
    },

    // 13 open tickets
    {
        ticketNumber: "TK-1156",
        reporter: "Leonardo Machado",
        assignee: "",
        registrationDate: getRecentDate(2),
        priority: "Alta",
        title: "Falha na autenticação de usuários",
        status: "Em aberto",
        slaN1: "4h"
    },
    {
        ticketNumber: "TK-1168",
        reporter: "Beatriz Lima",
        assignee: "",
        registrationDate: getRecentDate(2),
        priority: "Alta",
        title: "Servidor com lentidão crítica",
        status: "Em aberto",
        slaN1: "2h"
    },
    {
        ticketNumber: "TK-1177",
        reporter: "Gabriel Oliveira",
        assignee: "",
        registrationDate: getRecentDate(1),
        priority: "Média",
        title: "Problema com importação de dados",
        status: "Em aberto",
        slaN1: "8h"
    },
    {
        ticketNumber: "TK-1189",
        reporter: "Isabela Martins",
        assignee: "",
        registrationDate: getRecentDate(1),
        priority: "Média",
        title: "Impressora em rede sem conexão",
        status: "Em aberto",
        slaN1: "12h"
    },
    {
        ticketNumber: "TK-1193",
        reporter: "Rafael Sousa",
        assignee: "",
        registrationDate: getRecentDate(1),
        priority: "Baixa",
        title: "Solicitação de mudança de senha",
        status: "Em aberto",
        slaN1: "24h"
    },
    {
        ticketNumber: "TK-1201",
        reporter: "Mariana Castro",
        assignee: "",
        registrationDate: getRecentDate(1),
        priority: "Baixa",
        title: "Requisição de instalação de software",
        status: "Em aberto",
        slaN1: "48h"
    },
    {
        ticketNumber: "TK-1212",
        reporter: "Felipe Torres",
        assignee: "",
        registrationDate: getRecentDate(0),
        priority: "Alta",
        title: "Acesso negado ao banco de dados",
        status: "Em aberto",
        slaN1: "4h"
    },
    {
        ticketNumber: "TK-1225",
        reporter: "Larissa Rocha",
        assignee: "",
        registrationDate: getRecentDate(0),
        priority: "Média",
        title: "VPN não está funcionando",
        status: "Em aberto",
        slaN1: "12h"
    },
    {
        ticketNumber: "TK-1239",
        reporter: "Vinicius Gomes",
        assignee: "",
        registrationDate: getRecentDate(0),
        priority: "Média",
        title: "Erro ao gerar relatório mensal",
        status: "Em aberto",
        slaN1: "8h"
    },
    {
        ticketNumber: "TK-1252",
        reporter: "Amanda Ribeiro",
        assignee: "",
        registrationDate: getRecentDate(0),
        priority: "Baixa",
        title: "Solicitação de acesso a pasta compartilhada",
        status: "Em aberto",
        slaN1: "24h"
    },
    {
        ticketNumber: "TK-1267",
        reporter: "Bruno Alves",
        assignee: "",
        registrationDate: getRecentDate(0),
        priority: "Alta",
        title: "Site institucional fora do ar",
        status: "Em aberto",
        slaN1: "2h"
    },
    {
        ticketNumber: "TK-1281",
        reporter: "Carolina Moreira",
        assignee: "",
        registrationDate: getRecentDate(0),
        priority: "Média",
        title: "Lentidão no acesso ao ERP",
        status: "Em aberto",
        slaN1: "12h"
    },
    {
        ticketNumber: "TK-1299",
        reporter: "Daniel Teixeira",
        assignee: "",
        registrationDate: getRecentDate(0),
        priority: "Baixa",
        title: "Atualização de permissões de usuário",
        status: "Em aberto",
        slaN1: "48h"
    }
];

// Function to update ticket status
export function updateTicketStatus(ticketNumber: string, newStatus: 'Em aberto' | 'Aguardando usuário' | 'SLA estourado' | 'Finalizado' | 'Cancelado'): boolean {
    const ticketIndex = mockTickets.findIndex(ticket => ticket.ticketNumber === ticketNumber);
    if (ticketIndex !== -1) {
        mockTickets[ticketIndex].status = newStatus;
        return true;
    }
    return false;
}

// Function to update linked assets for a ticket
export function updateTicketLinkedAssets(ticketNumber: string, assetIds: string[]): boolean {
    const ticketIndex = mockTickets.findIndex(ticket => ticket.ticketNumber === ticketNumber);
    if (ticketIndex !== -1) {
        mockTickets[ticketIndex].linkedAssets = [...assetIds];
        return true;
    }
    return false;
} 