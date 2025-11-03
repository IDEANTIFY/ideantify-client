'use client'

import { ComponentType, SVGProps } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/libs/utils'

interface SidebarItemProps {
  title: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export default function SidebarItem({
  href,
  icon: Icon,
  title,
}: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)

  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start gap-2 p-4 py-6',
        isActive &&
          'bg-ideantify hover:bg-ideantify text-white hover:text-white'
      )}
      asChild
    >
      <Link href={href}>
        <Icon className="size-5 shrink-0" />
        <span>{title}</span>
      </Link>
    </Button>
  )
}
