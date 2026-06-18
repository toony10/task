import type { LoginResponse } from '@/types/login.types'

export interface LoginBody {
  email: string
  password: string
}

export async function login(body: LoginBody): Promise<LoginResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`)
  }

  return response.json()
}
