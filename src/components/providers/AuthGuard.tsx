'use client'

import { startTransition, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { hasAccessToken } from '@/lib/tokenStorage'

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!hasAccessToken()) {
      router.replace('/login')
      return
    }
    startTransition(() => {
      setIsAuthorized(true)
    })
  }, [router])

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">جاري التحقق...</p>
      </div>
    )
  }

  return children
}
