import { ReactNode } from 'react'

interface SidebarItemGroupProps {
  label: string
  children: ReactNode
}

export default function SidebarItemGroup({
  label,
  children,
}: SidebarItemGroupProps) {
  return (
    <div className="flex w-full shrink-0 flex-col items-start gap-2">
      <p className="w-full text-sm leading-5 text-neutral-500">{label}</p>
      <div className="flex w-full shrink-0 flex-col items-start gap-2">
        {children}
      </div>
    </div>
  )
}
