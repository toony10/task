'use client'

import { useCallback, useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

import { fetchQualityControlStats } from '@/lib/api/statistics.api'
import { formatCompactNumber } from '@/lib/formatters'
import { useStatisticsQuery } from '@/hooks/use-statistics-query'

import DashboardCard from './DashboardCard'

const QC_COLORS: Record<string, string> = {
  'تحت الدراسة': '#D4B896',
  'يعاد التسليم': '#0F766E',
  معتمد: '#2563EB',
}

const DEFAULT_QC_COLOR = '#94A3B8'

export default function QualityControlChart() {
  const fetcher = useCallback((accessToken: string, regionId: string | null) => fetchQualityControlStats(accessToken, regionId), [])
  const { data, isLoading, error } = useStatisticsQuery(fetcher)

  const total = useMemo(
    () => data?.reduce((sum, item) => sum + item.statementsCount, 0) ?? 0,
    [data]
  )

  const chartData = useMemo(
    () =>
      data?.map((item) => ({
        name: item.category,
        value: item.statementsCount,
        itemStyle: {
          color: QC_COLORS[item.category] ?? DEFAULT_QC_COLOR,
        },
      })) ?? [],
    [data]
  )

  const option: EChartsOption = useMemo(
    () => ({
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const item = params as { name: string; value: number; percent: number }
          return `${ item.name }<br/>${ item.value.toLocaleString('ar-SA') } (${ item.percent.toFixed(1) }%)`
        },
      },
      legend: {
        bottom: 0,
        left: 'center',
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: '#6B7280', fontSize: 11 },
      },
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '38%',
          style: {
            text: 'إجمالي',
            fill: '#6B7280',
            fontSize: 13,
            fontWeight: 500,
            textAlign: 'center',
          },
        },
        {
          type: 'text',
          left: 'center',
          top: '44%',
          style: {
            text: formatCompactNumber(total),
            fill: '#111827',
            fontSize: 22,
            fontWeight: 700,
            textAlign: 'center',
          },
        },
      ],
      series: [
        {
          type: 'pie',
          radius: ['52%', '78%'],
          center: ['50%', '42%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: { show: false },
          labelLine: { show: false },
          data: chartData,
        },
      ],
    }),
    [chartData, total]
  )

  return (
    <DashboardCard
      title="إحصائيات ضبط الجودة"
      description="توزيع الطلبات والزيارات الميدانية"
      isLoading={ isLoading }
      error={ error }
      contentClassName="pb-2"
    >
      { data && chartData.length > 0 && (
        <>
          <div className="mb-4 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3">
            <p className="text-xs text-muted-foreground">إجمالي الاعتمادات</p>
            <p className="mt-1 text-lg font-bold text-foreground">
              +{ total.toLocaleString('ar-SA') } طلب
            </p>
          </div>

          <ReactECharts
            option={ option }
            style={ { width: '100%', height: 320 } }
            opts={ { renderer: 'canvas' } }
          />

          <div className="mt-2 flex flex-wrap justify-center gap-4">
            { chartData.map((item) => (
              <div key={ item.name } className="flex items-center gap-2">
                <span
                  className="size-3 rounded-full"
                  style={ { backgroundColor: item.itemStyle.color as string } }
                />
                <span className="text-xs text-muted-foreground">{ item.name }</span>
              </div>
            )) }
          </div>
        </>
      ) }
    </DashboardCard>
  )
}
