'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { FillBtn } from '../shared/Btns'
import AnimationWrapper from '../shared/AnimationWrapper'
import Logo from '../shared/Logo'
import {
  loginAction,
  type LoginActionState,
} from '@/app/(auth)/login/_actions/login.action'
import { storeTokens } from '@/lib/tokenStorage'

const initialState: LoginActionState = {
  success: false,
  message: '',
}

export default function LoginForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(loginAction, initialState)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      if (state.tokens) {
        storeTokens(state.tokens)
      }
      toast.success(state.message)
      router.push('/')
      return
    }

    toast.error(state.message)
  }, [state, router])

  return (
    <AnimationWrapper initial={ { opacity: 0, y: 20 } } whileInView={ { opacity: 1, y: 0 } } transition={ { duration: 0.5 } } variants={ { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } } } className="flex bg-white rounded-lg shadow-sm items-center justify-center p-6 w-full max-w-[480px]">
      <div className="w-full">
        <form action={ formAction } className="flex flex-col items-center gap-4 sm:gap-6">
          <Logo width={ 120 } height={ 120 } />

          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#16368d]">
              مرحبا بك في لوحة التحكم
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              من فضلك ادخل بيانات تسجيل الدخول
            </p>
          </div>

          <div className="w-full space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              className="h-12 text-right"
              dir="rtl"
              required
              disabled={ isPending }
            />

            <div className="relative">
              <Input
                type={ showPassword ? 'text' : 'password' }
                name="password"
                placeholder="كلمة المرور"
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                className="h-12 pl-10 text-right"
                dir="rtl"
                required
                disabled={ isPending }
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute left-1 top-1/2 -translate-y-1/2 size-8 text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={ () => setShowPassword(!showPassword) }
                disabled={ isPending }
              >
                { showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" /> }
              </Button>
            </div>

          </div>

          <FillBtn
            type="submit"
            className="h-12 w-full bg-primary text-lg font-semibold text-white hover:bg-primary/90"
            disabled={ isPending }
          >
            { isPending ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول' }
          </FillBtn>
        </form>
      </div>
    </AnimationWrapper>
  )
}
