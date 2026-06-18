'use client'

import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { useMemo } from 'react'
import { useQueryState } from 'nuqs'

import saudiGeoJson from '@/data/saudi.geo.json'
import { scrollToPublicData } from '@/lib/scrollToPublicData'
import type { AreaProject } from '@/types/region.types'

if (!echarts.getMap('saudi')) {
  echarts.registerMap('saudi', saudiGeoJson as never)
}

type MapChartParams = {
  name: string
  value?: number
  data?: {
    value?: number
    regionId?: string
  }
}

type Props = {
  data: AreaProject[]
}

const regionMap: Record<string, string> = {
  SA01: 'Ar Riyad',
  SA02: 'Makkah',
  SA03: 'Al Madinah',
  SA04: 'Ash Sharqiyah',
  SA05: 'Al Quassim',
  SA06: "Ha'il",
  SA07: 'Tabuk',
  SA08: 'Al Hudud ash Shamaliyah',
  SA09: 'Jizan',
  SA10: 'Najran',
  SA11: 'Al Bahah',
  SA12: 'Al Jawf',
  SA14: '`Asir',
}

export default function AreaChart({
  data,
}: Props) {
  const regionArabicMap = Object.fromEntries(
    data
      .filter(item => item.regionCode)
      .map(item => [
        regionMap[item.regionCode!],
        item.title
      ])
  )

  const [, setRegionId] =
    useQueryState('regionId')

  const chartData = useMemo(
    () =>
      data
        .filter((item) => item.regionCode)
        .map((item) => ({
          name:
            regionMap[item.regionCode!] ??
            item.title,
          value: Number(item.count) || 0,
          regionId: item.id,
        })),
    [data]
  )

  const maxValue = Math.max(
    ...chartData.map((item) => item.value),
    1
  )

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const item = params as MapChartParams
        const value = item.data?.value ?? item.value ?? 0

        return `
          <div style="padding:4px">
            <strong>${ item.name }</strong>
            <br />
            Projects: ${ value }
          </div>
        `
      },
    },

    visualMap: {
      min: 0,
      max: maxValue,
      show: false,

      inRange: {
        color: [
          '#DBEAFE',
          '#93C5FD',
          '#60A5FA',
          '#2563EB',
          '#1D4ED8',
        ],
      },
    },

    series: [
      {
        type: 'map',
        map: 'saudi',
        nameProperty: 'NAME_1',

        roam: false,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',

        selectedMode: false,

        label: {
          show: true,
          fontSize: 12,
          formatter: (params) => {
            const item = params as MapChartParams
            return regionArabicMap[item.name] ?? item.name
          },
        },

        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 1.5,
        },

        emphasis: {
          label: {
            show: true,
            fontWeight: 'bold',
          },

          itemStyle: {
            borderColor: '#111827',
            borderWidth: 2,
          },
        },

        data: chartData,
      },
    ],
  }

  return (
    <ReactECharts
      option={ option }
      style={ {
        width: '100%',
        height: 'min(78vh, 900px)',
        minHeight: '680px',
      } }
      onEvents={ {
        click: (params: MapChartParams) => {
          const region = chartData.find(
            (item) =>
              item.name === params.name
          )

          if (!region) return

          setRegionId(region.regionId)
          scrollToPublicData()
        },
      } }
    />
  )
}