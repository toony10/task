'use client'

import { useQueryState } from 'nuqs'

import ExecutiveSummaryCard from './ExecutiveSummaryCard'
import GeneralStatisticsCard from './GeneralStatisticsCard'
import ProjectSectorsChart from './ProjectSectorsChart'
import ProjectStatusTreemap from './ProjectStatusTreemap'
import ProjectTypesDonutChart from './ProjectTypesDonutChart'
import QualityControlChart from './QualityControlChart'

export default function PublicData() {
  const [regionId] = useQueryState('regionId')

  return (
    <section id="public-data" className="scroll-mt-6 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            بيانات المشاريع
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            { regionId
              ? 'عرض بيانات المنطقة المحددة'
              : 'عرض بيانات جميع المناطق' }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ExecutiveSummaryCard />
        <GeneralStatisticsCard />
        <ProjectSectorsChart />
        <ProjectStatusTreemap />
        <ProjectTypesDonutChart />
        <QualityControlChart />
      </div>
    </section>
  )
}
