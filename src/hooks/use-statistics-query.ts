'use client'

import { useEffect, useState } from 'react'
import { useQueryState } from 'nuqs'

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'))
  }, [])

  return accessToken
}

export function useStatisticsQuery<T>(
  fetcher: (accessToken: string, regionId: string | null) => Promise<T>
) {
  const accessToken = useAccessToken()
  const [regionId] = useQueryState('regionId')
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!accessToken) {
      setError('يرجى تسجيل الدخول لعرض البيانات')
      setIsLoading(false)
      return
    }

    let cancelled = false

    const load = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const result = await fetcher(accessToken, regionId ?? null)

        if (!cancelled) {
          setData(result)
        }
      } catch {
        if (!cancelled) {
          setError('تعذر تحميل البيانات')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [accessToken, regionId, fetcher])

  return { data, isLoading, error, regionId }
}
