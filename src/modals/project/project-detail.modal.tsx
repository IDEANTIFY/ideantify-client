'use client'

import { User } from 'lucide-react'

import { OverlayProps } from '@/libs/utils'

interface ProjectDetailModalProps extends OverlayProps {
  project?: {
    uploader: string
    title: string
    description: string
    keywords: string[]
    imageUrl?: string
  }
}

export default function ProjectDetailModal({
  isOpen,
  close,
  project = {
    uploader: 'Google',
    title: '주제 내용입니다. 어쩌구 저쩌구~',
    description:
      '설명 내용입니다. 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
    keywords: ['웹 서비스', 'AI', '아이디어 검사'],
  },
}: ProjectDetailModalProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 py-8"
      onClick={close}
    >
      <div
        className="relative flex w-full max-w-[1160px] flex-col gap-8 px-20 py-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
            <User className="text-neutral-600" size={24} />
          </div>
          <p className="text-[35px] font-medium text-white">
            {project.uploader}
          </p>
        </div>

        <p className="text-[24px] font-medium text-white">{project.title}</p>

        <div className="flex gap-3">
          {project.keywords.map((keyword, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg bg-teal-500 px-[18px] py-3"
            >
              <p className="text-sm text-white">{keyword}</p>
            </div>
          ))}
        </div>

        <p className="text-base font-medium text-white">
          {project.description}
        </p>

        <div className="relative">
          <div className="overflow-hidden rounded-[23px] border-[3.841px] border-black/10">
            <div className="flex min-h-[500px] w-full items-center justify-center bg-neutral-300">
              <p className="text-[30px] text-black">첨부한 파일 임베드</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
