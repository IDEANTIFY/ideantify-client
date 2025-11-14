'use client'

import Image from 'next/image'

import { ResultItem } from '@/api'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { OverlayProps } from '@/libs/utils'

interface ReportProjectDetailModalProps extends OverlayProps {
  result: ResultItem
}

export default function ReportProjectDetailModal({
  isOpen,
  close,
  result,
}: ReportProjectDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex w-full flex-row items-end justify-between">
          <div>
            <DialogTitle>{result.title}</DialogTitle>
            <DialogDescription>{result.keyword}</DialogDescription>
          </div>

          <span className="h-fit rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-500">
            {(Number(result.score) * 100).toFixed(2)}%
          </span>
        </DialogHeader>

        <div className="flex items-center gap-4">
          <Image
            src={result.thumbnail || '/placeholder.png'}
            alt={result.title}
            width={240}
            height={240}
            className="h-[240px] w-[240px] rounded-md object-cover"
          />

          <span className="text-sm whitespace-pre-wrap">{result.summary}</span>
        </div>

        <span className="flex flex-col rounded-xl bg-neutral-100 p-6 text-sm whitespace-pre-wrap">
          <span className="font-semibold">기존 아이디어</span>
          {result.insight
            .split('<기존 아이디어>')[1]
            .split('<내 아이디어>')[0]
            .split('\n')
            .map((line, index) => (
              <span key={index} className="pl-2">
                {line}
                <br />
              </span>
            ))}
          <br />
          <span className="font-semibold">내 아이디어</span>
          {result.insight
            .split('<내 아이디어>')[1]
            .split('\n')
            .map((line, index) => (
              <span key={index} className="pl-2">
                {line}
                <br />
              </span>
            ))}
        </span>
      </DialogContent>
    </Dialog>
  )
}
