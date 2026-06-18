'use server'

import { login } from '@/lib/api/login.api'
import type { LoginResponse } from '@/types/login.types'

export type LoginActionState = {
  success: boolean
  message: string
  tokens?: LoginResponse
}

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = formData.get('email')
  const password = formData.get('password')

  if (typeof email !== 'string' || !email.trim()) {
    return { success: false, message: 'يرجى إدخال البريد الإلكتروني' }
  }

  if (typeof password !== 'string' || !password) {
    return { success: false, message: 'يرجى إدخال كلمة المرور' }
  }

  try {
    const tokens = await login({ email: email.trim(), password })

    return {
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      tokens,
    }
  } catch {
    return {
      success: false,
      message: 'فشل تسجيل الدخول. تحقق من بياناتك وحاول مرة أخرى.',
    }
  }
}
