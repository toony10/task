'use client'

import { useCallback } from 'react'

import { Progress } from '@/components/ui/progress'
import { fetchProjectExecutionSummary } from '@/lib/api/statistics.api'
import { formatPercent } from '@/lib/formatters'
import { useStatisticsQuery } from '@/hooks/use-statistics-query'

import DashboardCard from './DashboardCard'

type SummarySectionProps = {
  title: string
  description: string
  percentage: number
}

function SummarySection({ title, description, percentage }: SummarySectionProps) {
  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{ title }</h3>
        <p className="text-sm leading-7 text-muted-foreground">{ description }</p>
      </div>

      <div className="space-y-2">
        <Progress
          value={ percentage }
          className="h-3 bg-emerald-100"
          indicatorClassName="bg-emerald-700"
        />
        <p className="text-end text-xs font-semibold text-emerald-700">
          { formatPercent(percentage) }
        </p>
      </div>
    </section>
  )
}

export default function ExecutiveSummaryCard() {
  const fetcher = useCallback((accessToken: string, regionId: string | null) => fetchProjectExecutionSummary(accessToken, regionId), [])
  const { data, isLoading, error } = useStatisticsQuery(fetcher)

  return (
    <DashboardCard
      title="الملخص التنفيذي"
      description="نظرة عامة على حالة تنفيذ المشاريع"
      isLoading={ isLoading }
      error={ error }
    >
      { data && (
        <div className="space-y-6">
          <SummarySection
            title="المشاريع المنجزة"
            description={ `بلغ عدد المشاريع المنجزة ${ data.finishedProjects } مشروعًا من إجمالي ${ data.totalProjects } مشروعًا، بنسبة ${ formatPercent(data.finishedPercentage) }.` }
            percentage={ data.finishedPercentage }
          />

          <SummarySection
            title="نسبة الإنجاز أكثر من 95%"
            description={ `يمثل عدد المشاريع التي تجاوزت نسبة إنجازها 95% مقدار ${ data.achievement95Projects } مشروعًا، أي ${ formatPercent(data.achievement95Percentage) } من إجمالي المشاريع.` }
            percentage={ data.achievement95Percentage }
          />

          <SummarySection
            title="نسبة الإنجاز أكثر من 25%"
            description={ `بلغت نسبة المشاريع التي تجاوزت إنجازها 25% مقدار ${ data.achievement25Projects } مشروعًا، بما يعادل ${ formatPercent(data.achievement25Percentage) } من إجمالي المشاريع.` }
            percentage={ data.achievement25Percentage }
          />
        </div>
      ) }
    </DashboardCard>
  )
}
