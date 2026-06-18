import { cookies } from 'next/headers'

import { AppSidebar } from '@/components/layout'
import AuthGuard from '@/components/providers/AuthGuard'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

export default async function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

    return (
        <AuthGuard>
            <SidebarProvider defaultOpen={ defaultOpen }>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-14 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-mr-1 cursor-pointer" />
                        <div className='flex flex-col gap-1'>
                            <p className='text-lg text-gray-900 font-bold'>أهلا بك فى لوحة التحكم 👋</p>
                            <span className='text-sm text-gray-500'>{ new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }) }</span>
                        </div>
                    </header>
                    <main className="flex-1 p-4" dir="rtl">
                        { children }
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AuthGuard>
    )
}
