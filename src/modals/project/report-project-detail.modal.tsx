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
    name: string
    summary: string
    percent: number
    image: StaticImageData | string
    content: string
    description: string
  }
}

export default function ReportProjectDetailModal({
  isOpen,
  close,
  project = {
    name: '구글 캘린더',
    summary: '서비스 > 일정 등록·공유, 알림 제공',
    percent: 80.8,
    image: 'https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png',
    content:
      '👤 노벨라팀\n' +
      '📅 2025.01.01\n' +
      '\n' +
      ' 공모전/수상 이력\n' +
      '🏆 한국스타트업협회 주최 🥇 생산성 혁신상 수상\n' +
      '\n' +
      '기존 아이디어 설명란입니다. 어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구 ',
    description:
      '💡 차별화 포인트\n' +
      '기존 아이디어\n' +
      '개별 일정 관리 중심\n' +
      '단일 사용자 위주 설계\n' +
      '내 아이디어\n' +
      '팀플 일정 자동 추천: 캘린더 데이터 기반으로 팀 전체 일정 최적 시간대 자동 제안\n' +
      '프라이버시 존중 일정 공유: 업무명은 숨기고 상태(바쁨/여유)만 표시 → 부담 최소화\n' +
      '집중 모드 연계: 일정 시작 시 자동으로 ‘방해금지 모드 + 모각작 집중방 참여’ 연동\n' +
      '크로스 툴 연결: Notion/Trello와 양방향 싱크 → 프로젝트 관리 + 일정관리 통합',
  },
}: ReportProjectDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="flex w-full flex-row items-end justify-between">
          <div>
            <DialogTitle>{project.name}</DialogTitle>
            <DialogDescription>{project.summary}</DialogDescription>
          </div>

          <span className="h-fit rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-500">
            {project.percent}%
          </span>
        </DialogHeader>

        <div className="flex items-center gap-4">
          <Image
            src={project.image}
            alt={project.name}
            width={240}
            height={240}
            className="h-[240px] w-[240px] rounded-md object-cover"
          />

          <span className="text-sm whitespace-pre-wrap">{project.content}</span>
        </div>

        <span className="rounded-xl bg-neutral-100 p-6 text-sm whitespace-pre-wrap">
          {project.description}
        </span>
      </DialogContent>
    </Dialog>
  )
}
