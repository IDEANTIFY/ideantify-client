'use client'

import Image, { StaticImageData } from 'next/image'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { OverlayProps } from '@/libs/utils'

interface ReportProjectDetailModalProps extends OverlayProps {
  project: {
    title: string
    description: string
    percent: number
    image: StaticImageData | string
    content: string
    subContent: string
  }
}

export default function ReportProjectDetailModal({
  isOpen,
  close,
  project: { title, description, percent, image, content, subContent },
}: ReportProjectDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={close} modal>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex-row items-end justify-between">
          <section className="flex flex-col gap-1">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </section>
          <span className="h-fit rounded-full bg-red-200 px-4 py-1.5 text-sm font-medium text-red-500">
            {percent}%
          </span>
        </DialogHeader>

        <section className="flex items-center gap-4">
          <Image
            src={image}
            alt="Project Image"
            width={260}
            height={260}
            className="h-[260px] w-[260px] rounded-md object-cover"
          />

          <p className="text-sm whitespace-pre-line text-neutral-700">
            {content}
          </p>
        </section>

        <section className="rounded-md bg-neutral-100 p-6 whitespace-pre-line text-neutral-700">
          {subContent}
        </section>
      </DialogContent>
    </Dialog>
  )
}
