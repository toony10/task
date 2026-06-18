'use client'

import type { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  description?: string
  className?: string
  contentClassName?: string
  isLoading?: boolean
  error?: string | null
  children: ReactNode
}

function DashboardCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}

export default function DashboardCard({
  title,
  description,
  className,
  contentClassName,
  isLoading,
  error,
  children,
}: Props) {
  return (
    <Card
      className={ cn(
        'gap-0 overflow-hidden rounded-3xl border-0 py-0 shadow-md shadow-black/[0.06]',
        className
      ) }
    >
      <CardHeader className="border-b border-border/60 px-5 py-4 sm:px-6">
        <CardTitle className="text-base font-bold sm:text-lg">{ title }</CardTitle>
        { description && (
          <CardDescription>{ description }</CardDescription>
        ) }
      </CardHeader>

      <CardContent className={ cn('px-5 py-5 sm:px-6 sm:py-6', contentClassName) }>
        { isLoading ? (
          <DashboardCardSkeleton />
        ) : error ? (
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed bg-muted/20 p-6 text-center">
            <p className="text-sm text-muted-foreground">{ error }</p>
          </div>
        ) : (
          children
        ) }
      </CardContent>
    </Card>
  )
}
