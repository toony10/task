'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSubPages } from '@/hooks/use-sub-pages'

type SubPagesNavProps = {
    className?: string
    showTitle?: boolean
}

export function SubPagesNav({ className, showTitle = true }: SubPagesNavProps) {
    const pathname = usePathname()
    const { parentItem, subPages, hasSubPages } = useSubPages()

    if (!hasSubPages) return null

    return (
        <div className={ cn('mb-6', className) }>
            { showTitle && parentItem && (
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    { parentItem.icon && <parentItem.icon className="w-5 h-5 text-primary" /> }
                    <span>{ parentItem.title }</span>
                </h2>
            ) }

            <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                { subPages.map((subPage) => {
                    const isActive = pathname === subPage.url || pathname.startsWith(subPage.url + '/')

                    return (
                        <Link
                            key={ subPage.url }
                            href={ subPage.url }
                            className={ cn(
                                'group relative flex items-center justify-between p-4 rounded-sm border transition-all duration-300',
                                'hover:shadow-md hover:border-primary/50',
                                isActive
                                    ? 'bg-primary/10 border-primary shadow-sm'
                                    : 'bg-card border-border hover:bg-accent/50'
                            ) }
                        >
                            <span
                                className={ cn(
                                    'font-medium transition-colors',
                                    isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                ) }
                            >
                                { subPage.title }
                            </span>

                            <ChevronLeft
                                className={ cn(
                                    'w-4 h-4 transition-all duration-300',
                                    'group-hover:-translate-x-1',
                                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                                ) }
                            />

                            { isActive && (
                                <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2 translate-x-1/2" />
                            ) }
                        </Link>
                    )
                }) }
            </nav>
        </div>
    )
}

