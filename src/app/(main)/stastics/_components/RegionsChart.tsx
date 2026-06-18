'use client'

import { useEffect, useState } from 'react'
import { useQueryState } from 'nuqs'
import { X } from 'lucide-react'

import AreaChart from '@/components/charts/AreaChart'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchAreaProjects } from '@/lib/api/region.api'
import type { AreaProject } from '@/types/region.types'

import RegionBars from './RegionBars'

function RegionsChartSkeleton() {
  return (
    <div className="relative p-4 sm:p-6">
      <div className="relative z-0 overflow-hidden rounded-2xl bg-muted/30 p-2 sm:p-3 lg:pe-[min(40%,22rem)]">
        <Skeleton className="min-h-[680px] w-full rounded-2xl" style={ { height: 'min(78vh, 900px)' } } />
      </div>

      <div className="relative z-10 -mt-6 px-2 sm:px-0 lg:absolute lg:end-6 lg:top-6 lg:bottom-6 lg:mt-0 lg:w-[min(100%,22rem)] lg:px-0">
        <div className="flex max-h-[420px] flex-col overflow-hidden rounded-2xl border bg-card p-4 shadow-lg ring-1 ring-black/5 lg:max-h-none lg:h-full">
          <Skeleton className="mb-4 h-5 w-40" />
          <div className="space-y-2">
            { Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={ index } className="h-10 w-full rounded-xl" />
            )) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RegionsChart() {
    const accessToken = localStorage.getItem('accessToken') as string
    const [data, setData] = useState<AreaProject[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [regionId, setRegionId] = useQueryState('regionId')

    const selectedRegion = data.find((item) => item.id === regionId)

    useEffect(() => {
        const fetchData = async () => {
            if (!accessToken) {
                setError('يرجى تسجيل الدخول لعرض البيانات')
                setIsLoading(false)
                return
            }

            try {
                setIsLoading(true)
                setError(null)
                const data = await fetchAreaProjects(accessToken)
                setData(data)
            } catch {
                setError('تعذر تحميل بيانات المناطق')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [accessToken])

    return (
        <section className="w-full">
            <div className="overflow-hidden rounded-md border bg-card shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-6">
                    <div>
                        <h2 className="text-lg font-bold text-foreground sm:text-xl">
                            المناطق
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            توزيع المشاريع على مناطق المملكة
                        </p>
                    </div>

                    { regionId && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={ () => setRegionId(null) }
                            className="rounded-full"
                        >
                            <X className="size-4" />
                            { selectedRegion
                                ? `إلغاء تحديد ${ selectedRegion.title }`
                                : 'إلغاء التحديد' }
                        </Button>
                    ) }
                </div>

                <div className="relative p-4 sm:p-6">
                    { isLoading ? (
                        <RegionsChartSkeleton />
                    ) : error ? (
                        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed bg-muted/20 p-6 text-center">
                            <p className="text-sm text-muted-foreground">{ error }</p>
                        </div>
                    ) : (
                        <>
                            <div className="relative z-0 overflow-hidden rounded-2xl bg-muted/30 p-2 sm:p-3 lg:pe-[min(40%,22rem)]">
                                <AreaChart data={ data } />
                            </div>

                            <div className="relative z-10 -mt-6 px-2 sm:px-0 lg:absolute lg:end-6 lg:top-6 lg:bottom-6 lg:mt-0 lg:w-[min(100%,22rem)] lg:px-0">
                                <RegionBars data={ data } />
                            </div>
                        </>
                    ) }
                </div>
            </div>
        </section>
    )
}
