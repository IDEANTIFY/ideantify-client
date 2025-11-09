import { ReactNode } from 'react'

import Sidebar from '@/components/shared/side-bar'

interface Props {
  children: ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex min-h-dvh">
      <aside className="w-64">
        <Sidebar />
      </aside>
      <main className="flex flex-1 items-center justify-center overflow-y-auto bg-neutral-50">
        {children}
      </main>
    </div>
  )
}
