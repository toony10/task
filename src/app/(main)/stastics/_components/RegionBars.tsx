'use client'

import { useMemo } from 'react'
import { useQueryState } from 'nuqs'

import { cn } from '@/lib/utils'
import { scrollToPublicData } from '@/lib/scrollToPublicData'
import type { AreaProject } from '@/types/region.types'

type Props = {
  data: AreaProject[]
}

export default function RegionBars({ data }: Props) {
  const [regionId, setRegionId] = useQueryState('regionId')

  const regions = useMemo(
    () =>
      data
        .filter((item) => item.regionCode)
        .sort((a, b) => b.count - a.count),
    [data]
  )

  const maxCount = Math.max(...regions.map((region) => region.count), 1)

  return (
    <div className="flex max-h-[420px] flex-col overflow-hidden rounded-2xl border bg-card shadow-lg ring-1 ring-black/5 lg:max-h-none lg:h-full">
      <div className="border-b px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">
          المشاريع حسب المنطقة
        </h3>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto p-3">
        { regions.map((region) => {
          const percent = (region.count / maxCount) * 100
          const isSelected = regionId === region.id
          const isMax = region.count === maxCount

          return (
            <button
              key={ region.id }
              type="button"
              onClick={ () => {
                setRegionId(region.id)
                scrollToPublicData()
              } }
              className={ cn(
                'flex w-full items-center gap-3 rounded-xl px-2 py-2 text-right transition-colors',
                'hover:bg-muted/60',
                isSelected && 'bg-primary/8 ring-1 ring-primary/30'
              ) }
            >
              <span className="w-24 shrink-0 truncate text-sm text-muted-foreground sm:w-28">
                { region.title }
              </span>

              <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className={ cn(
                    'h-full rounded-full transition-all duration-500',
                    isMax || isSelected ? 'bg-primary' : 'bg-primary/45'
                  ) }
                  style={ { width: `${percent}%` } }
                />
              </div>

              <span className="w-8 shrink-0 text-sm font-bold text-foreground tabular-nums">
                { region.count }
              </span>
            </button>
          )
        }) }
      </div>
    </div>
  )
}
