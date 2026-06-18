'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

type ProgressProps = React.ComponentProps<'div'> & {
  value?: number
  indicatorClassName?: string
}

function Progress({
  className,
  value = 0,
  indicatorClassName,
  ...props
}: ProgressProps) {
  return (
    <div
      data-slot="progress"
      className={ cn(
        'bg-primary/15 relative h-2 w-full overflow-hidden rounded-full',
        className
      ) }
      { ...props }
    >
      <div
        data-slot="progress-indicator"
        className={ cn(
          'bg-primary h-full rounded-full transition-all duration-500',
          indicatorClassName
        ) }
        style={ { width: `${Math.min(100, Math.max(0, value))}%` } }
      />
    </div>
  )
}

export { Progress }
