import GuestGuard from '@/components/providers/GuestGuard'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GuestGuard>
            <main>
                { children }
            </main>
        </GuestGuard>
    );
}
