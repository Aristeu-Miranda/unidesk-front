import { Header } from "@/_components/Header";
import { Footer } from "@/_components/Footer";
import { Sidebar } from "@/_components/Sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}