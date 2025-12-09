import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Note: 'h-screen' ensures the background covers the whole view
    // 'bg-[#0f0f13]' is a deep dark background to make glassmorphism pop
    return (
        <div className="min-h-screen bg-[#0f0f13] font-arabic text-white flex flex-row-reverse overflow-hidden">
            {/* Sidebar (Fixed to Right) */}
            <div className="w-64 flex-shrink-0">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 h-screen overflow-y-auto p-8 relative">
                {/* Background Ambient Glow */}
                <div className="fixed top-[-20%] right-[10%] w-[500px] h-[500px] bg-hub-red/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="fixed bottom-[-20%] left-[10%] w-[500px] h-[500px] bg-hub-orange/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
