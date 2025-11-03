import Sidebar from '@/components/shared/side-bar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
