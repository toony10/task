'use client'

import { useCallback } from 'react'

import { fetchGeneralStatistics } from '@/lib/api/statistics.api'
import { formatCompactNumber } from '@/lib/formatters'
import { useStatisticsQuery } from '@/hooks/use-statistics-query'
import { cn } from '@/lib/utils'
import type { GeneralStatisticsResponse } from '@/types/statistics.types'

import DashboardCard from './DashboardCard'

const BUDGET_SEGMENTS = [
  {
    key: 'contractualBudget' as const,
    label: 'مبالغ تم ترسيتها',
    color: 'bg-slate-600',
    position: 'top' as const,
  },
  {
    key: 'inProgressAmount' as const,
    label: 'مبالغ تحت الإجراء',
    color: 'bg-slate-300',
    position: 'bottom' as const,
  },
  {
    key: 'paidAmount' as const,
    label: 'مبالغ منصرفة',
    color: 'bg-sky-400',
    position: 'top' as const,
  },
  {
    key: 'remaining' as const,
    label: 'مبالغ متبقية',
    color: 'bg-emerald-500',
    position: 'bottom' as const,
  },
]

function BudgetLabel({
  value,
  position,
}: {
  value: number
  position: 'top' | 'bottom'
}) {
  return (
    <div
      className={ cn(
        'relative flex justify-center',
        position === 'top' ? 'mb-2' : 'mt-2'
      ) }
    >
      <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-foreground shadow-sm">
        { formatCompactNumber(value) }
      </span>
      <span
        className={ cn(
          'absolute start-1/2 size-0 -translate-x-1/2 border-x-4 border-x-transparent',
          position === 'top'
            ? 'top-full border-t-4 border-t-muted'
            : 'bottom-full border-b-4 border-b-muted'
        ) }
      />
    </div>
  )
}

function BudgetBar({ data }: { data: GeneralStatisticsResponse }) {
  const segmentTotal = BUDGET_SEGMENTS.reduce(
    (sum, segment) => sum + data[segment.key],
    0
  )

  const segments = BUDGET_SEGMENTS.map((segment) => {
    const value = data[segment.key]
    const width = segmentTotal > 0 ? (value / segmentTotal) * 100 : 0

    return { ...segment, value, width }
  }).filter((segment) => segment.width > 0)

  const positionedSegments = segments.reduce<
    Array<(typeof segments)[number] & { center: number }>
  >((items, segment) => {
    const usedWidth = items.reduce((sum, item) => sum + item.width, 0)
    const center = usedWidth + segment.width / 2

    items.push({ ...segment, center })
    return items
  }, [])

  return (
    <div className="space-y-1">
      <div className="relative h-9">
        { positionedSegments.map((segment) =>
          segment.position === 'top' ? (
            <div
              key={ `${ segment.key }-top` }
              className="absolute top-0 -translate-x-1/2"
              style={ { insetInlineStart: `${ segment.center }%` } }
            >
              <BudgetLabel value={ segment.value } position="top" />
            </div>
          ) : null
        ) }
      </div>

      <div className="flex h-8 overflow-hidden rounded-xl">
        { segments.map((segment) => (
          <div
            key={ segment.key }
            className={ cn('h-full', segment.color) }
            style={ { width: `${ segment.width }%` } }
          />
        )) }
      </div>

      <div className="relative h-9">
        { positionedSegments.map((segment) =>
          segment.position === 'bottom' ? (
            <div
              key={ `${ segment.key }-bottom` }
              className="absolute top-0 -translate-x-1/2"
              style={ { insetInlineStart: `${ segment.center }%` } }
            >
              <BudgetLabel value={ segment.value } position="bottom" />
            </div>
          ) : null
        ) }
      </div>
    </div>
  )
}

export default function GeneralStatisticsCard() {
  const fetcher = useCallback((accessToken: string, regionId: string | null) => fetchGeneralStatistics(accessToken, regionId), [])
  const { data, isLoading, error } = useStatisticsQuery(fetcher)

  return (
    <DashboardCard
      title="الإحصائيات العامة"
      description="ملخص الميزانية وعدد المشاريع"
      className="xl:col-span-2"
      isLoading={ isLoading }
      error={ error }
    >
      { data && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">إجمالي الميزانية</p>
              <p className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                { formatCompactNumber(data.totalBudget) }
              </p>
            </div>

            <div className="rounded-2xl bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">عدد المشاريع</p>
              <p className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                { data.projectsCount.toLocaleString('ar-SA') }
              </p>
            </div>
          </div>

          <div className="space-y-4">

            <BudgetBar data={ data } />

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              { BUDGET_SEGMENTS.map((segment) => (
                <div key={ segment.key } className="flex items-center gap-2">
                  <span className={ cn('size-3 rounded-sm', segment.color) } />
                  <span className="text-xs text-muted-foreground">{ segment.label }</span>
                </div>
              )) }
            </div>
          </div>
        </div>
      ) }
    </DashboardCard>
  )
}
