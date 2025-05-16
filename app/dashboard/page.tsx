import { TicketChart } from "@/_components/TicketChart";

export default function Dashboard() {
    return (
        <div className="flex items-center justify-center w-full h-[calc(100vh-6.5rem)]">
            <div className="max-w-4xl w-full">
                <h1 className="text-2xl font-bold mb-6 ">Dashboard</h1>

                <div className="flex justify-center">
                    <div className="w-full">
                        <TicketChart />
                    </div>
                </div>
            </div>
        </div>
    )
}