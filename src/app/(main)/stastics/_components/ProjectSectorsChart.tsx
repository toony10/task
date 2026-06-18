'use client'

import { useCallback, useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

import { fetchSectorProjects } from '@/lib/api/statistics.api'
import { useStatisticsQuery } from '@/hooks/use-statistics-query'

import DashboardCard from './DashboardCard'

export default function ProjectSectorsChart() {
  const fetcher = useCallback((accessToken: string, regionId: string | null) => fetchSectorProjects(accessToken, regionId), [])
  const { data, isLoading, error } = useStatisticsQuery(fetcher)

  const sortedData = useMemo(
    () => (data ? [...data].sort((a, b) => b.count - a.count) : []),
    [data]
  )

  const option: EChartsOption = useMemo(
    () => ({
      grid: {
        left: 8,
        right: 24,
        top: 8,
        bottom: 8,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params) => {
          const item = Array.isArray(params) ? params[0] : params
          return `${ item.name }<br/>${ item.value } مشروع`
        },
      },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: {
          lineStyle: { color: '#E5E7EB', type: 'dashed' },
        },
        axisLabel: { color: '#6B7280' },
      },
      yAxis: {
        type: 'category',
        data: sortedData.map((item) => item.title),
        inverse: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#374151',
          width: 120,
          overflow: 'truncate',
        },
      },
      series: [
        {
          type: 'bar',
          data: sortedData.map((item, index) => ({
            value: item.count,
            itemStyle: {
              color: index % 2 === 0 ? '#2563EB' : '#D4B896',
              borderRadius: [0, 8, 8, 0],
            },
          })),
          barMaxWidth: 28,
          label: {
            show: true,
            position: 'right',
            color: '#111827',
            fontWeight: 600,
          },
        },
      ],
    }),
    [sortedData]
  )

  return (
    <DashboardCard
      title="قطاعات المشاريع"
      description="توزيع المشاريع حسب القطاع"
      className="xl:col-span-2"
      isLoading={ isLoading }
      error={ error }
      contentClassName="pb-2"
    >
      { sortedData.length > 0 && (
        <ReactECharts
          option={ option }
          style={ { width: '100%', height: Math.max(sortedData.length * 44, 280) } }
          opts={ { renderer: 'canvas' } }
        />
      ) }
    </DashboardCard>
  )
}
