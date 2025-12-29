import Link from 'next/link'
import { Home } from 'lucide-react'

import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4" dir="rtl">
            <Logo width={ 120 } height={ 120 } />

            <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-8xl font-bold text-primary">404</h1>
                <h2 className="text-2xl font-semibold text-foreground">
                    الصفحة غير موجودة
                </h2>
                <p className="max-w-md text-muted-foreground">
                    عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
                </p>
            </div>

            <Button asChild size="lg" className="gap-2">
                <Link href="/">
                    <Home className="size-5" />
                    <span>العودة للصفحة الرئيسية</span>
                </Link>
            </Button>
        </div>
    )
}

