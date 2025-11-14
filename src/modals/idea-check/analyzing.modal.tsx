'use client'

import { Loader2 } from 'lucide-react'

import { OverlayProps } from '@/libs/utils'

export default function AnalyzingModal({ isOpen }: OverlayProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="flex flex-col items-center gap-6 rounded-3xl bg-white px-12 py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Loader2 className="h-16 w-16 animate-spin text-teal-400" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-semibold text-neutral-800">
            분석중이에요
          </p>
          <p className="text-sm text-neutral-500">잠시만 기다려주세요...</p>
        </div>
      </div>
    </div>
  )
}
