'use client'

import { useCallback, useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

import { fetchProjectStatusCounts } from '@/lib/api/statistics.api'
import { useStatisticsQuery } from '@/hooks/use-statistics-query'
import type { ProjectStatusKey } from '@/types/statistics.types'

import DashboardCard from './DashboardCard'

const STATUS_META: Record<
  ProjectStatusKey,
  { label: string; color: string }
> = {
  Good: { label: 'جيد', color: '#16A34A' },
  Finished: { label: 'منجز', color: '#38BDF8' },
  Critical: { label: 'حرج', color: '#DC2626' },
}

export default function ProjectStatusTreemap() {
  const fetcher = useCallback((accessToken: string, regionId: string | null) => fetchProjectStatusCounts(accessToken, regionId), [])
  const { data, isLoading, error } = useStatisticsQuery(fetcher)

  const chartData = useMemo(
    () =>
      data?.values.map((item) => ({
        name: STATUS_META[item.key].label,
        value: item.value,
        itemStyle: { color: STATUS_META[item.key].color },
      })) ?? [],
    [data]
  )

  const option: EChartsOption = useMemo(
    () => ({
      tooltip: {
        formatter: (params) => {
          const item = params as { name: string; value: number }
          return `${ item.name }<br/>${ item.value } مشروع`
        },
      },
      series: [
        {
          type: 'treemap',
          roam: false,
          nodeClick: false,
          breadcrumb: { show: false },
          label: {
            show: true,
            formatter: '{c}',
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
          upperLabel: { show: false },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
            gapWidth: 2,
          },
          data: chartData,
        },
      ],
    }),
    [chartData]
  )

  return (
    <DashboardCard
      title="إحصائيات حالة المشاريع"
      description="توزيع المشاريع حسب الحالة"
      isLoading={ isLoading }
      error={ error }
      contentClassName="pb-2"
    >
      { chartData.length > 0 && (
        <>
          <ReactECharts
            option={ option }
            style={ { width: '100%', height: 300 } }
            opts={ { renderer: 'canvas' } }
          />

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            { Object.entries(STATUS_META).map(([key, meta]) => (
              <div key={ key } className="flex items-center gap-2">
                <span
                  className="size-3 rounded-full"
                  style={ { backgroundColor: meta.color } }
                />
                <span className="text-xs text-muted-foreground">{ meta.label }</span>
              </div>
            )) }
          </div>
        </>
      ) }
    </DashboardCard>
  )
}
