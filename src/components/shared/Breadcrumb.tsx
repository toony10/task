'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'

type BreadcrumbItem = {
    label: string
    href?: string
}

type BreadcrumbProps = {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    if (!items.length) return null

    return (
        <nav className={ cn('flex items-center gap-2 text-sm mb-4', className) }>
            { items.map((item, index) => {
                const isLast = index === items.length - 1

                return (
                    <span key={ index } className="flex items-center gap-2">
                        { index > 0 && <span className="text-primary"><ChevronLeft className="w-4 h-4" /></span> }

                        { item.href && !isLast ? (
                            <Link
                                href={ item.href }
                                className="text-primary font-medium hover:underline transition-colors"
                            >
                                { item.label }
                            </Link>
                        ) : (
                            <span className={ cn(
                                'font-medium',
                                isLast ? 'text-gray-700 font-bold' : 'text-primary'
                            ) }>
                                { item.label }
                            </span>
                        ) }
                    </span>
                )
            }) }
        </nav>
    )
}

