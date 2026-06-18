import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import ToastProvider from '@/components/providers/ToastProvider'
import './globals.css'

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'ريف السعودية - لوحة التحكم',
  description: 'لوحة تحكم ريف السعودية'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={ `${ cairo.variable } font-sans antialiased` }>
        <NuqsAdapter>
          { children }
        </NuqsAdapter>
        <ToastProvider />
      </body>
    </html>
  )
}
