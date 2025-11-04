import { ReactNode } from 'react'

import type { Metadata } from 'next'

import ClientLayout from '@/app/client-layout'
import { Toaster } from '@/components/ui/sonner'
import '@/styles/globals.css'

interface Props {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Ideantify',
  description: 'Ideantify',
}

export default function Layout({ children }: Props) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Toaster />
      </body>
    </html>
  )
}
