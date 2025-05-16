"use client"


import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface DataItem {
    name: string;
    value: number;
    color: string;
}

const data: DataItem[] = [
    { name: 'Aguardando atendimento', value: 13, color: '#22c55e' }, // verde
    { name: 'SLA Estourado', value: 5, color: '#ef4444' },           // vermelho
    { name: 'Aguardando usuário', value: 3, color: '#eab308' },      // amarelo
];

const COLORS = ['#22c55e', '#ef4444', '#eab308'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export function TicketChart() {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-md mr-3"></div>
                <div>
                    <h3 className="text-lg font-medium">Número de chamados</h3>
                    <p className="text-3xl font-bold">{total}</p>
                </div>
            </div>

            <div className="h-64">
                {/* @ts-ignore */}
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        {/* @ts-ignore */}
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        {/* @ts-ignore */}
                        <Tooltip formatter={(value: any) => [`${value} chamados`, '']} />
                        {/* @ts-ignore */}
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            formatter={(value: string, entry: any, index: number) => {
                                const { color } = data[index];
                                return (
                                    <span style={{ color, fontWeight: 'bold' }}>
                                        {value} ({data[index].value})
                                    </span>
                                );
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 