import { ReactNode } from 'react'

import type { Metadata } from 'next'

import '@/globals.css'

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
      <body>{children}</body>
    </html>
  )
}
