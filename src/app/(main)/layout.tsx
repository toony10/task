import { cookies } from 'next/headers'

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout'

export default async function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

    return (
        <SidebarProvider defaultOpen={ defaultOpen }>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-14 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-mr-1 cursor-pointer" />
                    <p className='text-lg text-gray-900 font-bold'>أهلا بك فى لوحة التحكم 👋</p>
                </header>
                <main className="flex-1 p-4" dir="rtl">
                    { children }
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
