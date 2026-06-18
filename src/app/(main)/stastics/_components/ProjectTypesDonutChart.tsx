'use client'

import { useCallback, useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

import { fetchProjectTypeCounts } from '@/lib/api/statistics.api'
import { useStatisticsQuery } from '@/hooks/use-statistics-query'
import type { ProjectTypeKey } from '@/types/statistics.types'

import DashboardCard from './DashboardCard'

const TYPE_LABELS: Record<ProjectTypeKey, string> = {
  Started: 'بدء التنفيذ',
  Awarded: 'مرسى',
  Signed: 'موقع',
  ReviewCommittee: 'لجنة المراجعة',
  Accreditation: 'اعتماد',
  Finished: 'منجز',
  Tender: 'مناقصة',
}

const TYPE_COLORS = [
  '#60A5FA',
  '#166534',
  '#1D4ED8',
  '#94A3B8',
  '#F5F5F4',
  '#0F766E',
  '#D4B896',
]

export default function ProjectTypesDonutChart() {
  const fetcher = useCallback((accessToken: string, regionId: string | null) => fetchProjectTypeCounts(accessToken, regionId), [])
  const { data, isLoading, error } = useStatisticsQuery(fetcher)

  const chartData = useMemo(() => {
    if (!data) return []

    const total = data.values.reduce((sum, item) => sum + item.value, 0)

    return data.values
      .filter((item) => item.value > 0)
      .map((item, index) => {
        const percent = total > 0 ? (item.value / total) * 100 : 0

        return {
          name: TYPE_LABELS[item.key],
          value: item.value,
          percent,
          itemStyle: { color: TYPE_COLORS[index % TYPE_COLORS.length] },
        }
      })
  }, [data])

  const option: EChartsOption = useMemo(
    () => ({
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const item = params as {
            name: string
            value: number
            percent: number
          }

          return `${ item.name }<br/>${ item.value } مشروع (${ item.percent.toFixed(1) }%)`
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
      series: [
        {
          type: 'pie',
          radius: ['52%', '78%'],
          center: ['50%', '44%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter: (params) => {
              const item = params as { percent: number; value: number }
              return item.percent >= 5
                ? `${ item.percent.toFixed(1) }%`
                : ''
            },
            color: '#fff',
            fontWeight: 600,
          },
          labelLine: { show: false },
          data: chartData,
        },
      ],
    }),
    [chartData]
  )

  return (
    <DashboardCard
      title="حالة المشاريع"
      description="توزيع المشاريع حسب المرحلة"
      isLoading={ isLoading }
      error={ error }
      contentClassName="pb-2"
    >
      { chartData.length > 0 && (
        <ReactECharts
          option={ option }
          style={ { width: '100%', height: 340 } }
          opts={ { renderer: 'canvas' } }
        />
      ) }
    </DashboardCard>
  )
}
