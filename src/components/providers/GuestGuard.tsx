'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { hasAccessToken } from '@/lib/tokenStorage'

type Props = {
  children: React.ReactNode
}

export default function GuestGuard({ children }: Props) {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (hasAccessToken()) {
      router.replace('/')
      return
    }

    setIsReady(true)
  }, [router])

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">جاري التحقق...</p>
      </div>
    )
  }

  return children
}
