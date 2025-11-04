'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ChartColumnIncreasing, Download, SendHorizonal } from 'lucide-react'
import { overlay } from 'overlay-kit'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import ReportProjectDetailModal from '@/modals/project/report-project-detail.modal'

interface Props {
  reportId: string
}

export default function IdeaReport({ reportId }: Props) {
  return (
    <section className="flex w-full max-w-5xl flex-col gap-8">
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">검증 결과를 확인해보세요!</h1>

          <div className="flex gap-4">
            <span className="rounded-full bg-red-200 px-4 py-1.5 text-sm font-medium text-red-500">
              80~100% 유사도
            </span>
            <span className="rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-500">
              70~80% 유사도
            </span>
            <span className="rounded-full bg-sky-200 px-4 py-1.5 text-sm font-medium text-blue-500">
              60~70% 유사도
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* TODO: 구현해야 함 */}
          <Button
            size="lg"
            className="rounded-full bg-teal-600 hover:bg-teal-600/90"
          >
            결과 저장 <Download />
          </Button>
          <Link href={`/chat-bot?context=${reportId}`}>
            <Button
              size="lg"
              className="bg-ideantify hover:bg-ideantify/90 rounded-full"
            >
              챗봇으로 이동 <SendHorizonal />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <section className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
            <ChartColumnIncreasing size={20} />
            <span>전체 점수</span>
          </h2>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm font-medium">
              <span>유사도</span>
              <span>75%</span>
            </div>
            <Slider value={[75]} max={100} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm font-medium">
              <span>유사도</span>
              <span>50%</span>
            </div>
            <Slider value={[50]} max={100} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm font-medium">
              <span>유사도</span>
              <span>25%</span>
            </div>
            <Slider value={[25]} max={100} />
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="gap-2 text-lg font-semibold text-gray-700">
            분석 결과
          </h2>
          <span className="text-sm text-neutral-700">
            Agent가 취업에 관련된 온라인 커뮤니티 오픈채팅방에서 어떤 구직자들이
            Agent의 실제로 실행할 적합도 조건이고, 어떤 것 차별점 어떤 것 차별점
            어떤 것 차별점 어떤 것 차별점 어떤 것 차별점 어떤 것 차별점 어떤 것
            차별점 어떤 것 차별점 어떤 것 차별점
          </span>
        </section>
      </div>

      <Separator />

      <section className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col gap-4 rounded-lg border bg-white p-5 hover:bg-neutral-50"
            onClick={() =>
              overlay.open(({ isOpen, close }) => (
                <ReportProjectDetailModal
                  isOpen={isOpen}
                  close={close}
                  project={{
                    title: '구글 캘린더',
                    description: '서비스 > 일정 등록·공유, 알림 제공',
                    percent: 80.8,
                    image:
                      'https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png',
                    content:
                      '👤 노벨라팀\n' +
                      '📅 2025.01.01\n' +
                      '\n' +
                      ' 공모전/수상 이력\n' +
                      '🏆 한국스타트업협회 주최 🥇 생산성 혁신상 수상\n' +
                      '\n' +
                      '기존 아이디어 설명란입니다. 어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구   어쩌구저쩌구  어쩌구저쩌구  어쩌구저쩌구 ',
                    subContent:
                      '💡 차별화 포인트\n' +
                      '기존 아이디어\n' +
                      '개별 일정 관리 중심\n' +
                      '단일 사용자 위주 설계\n' +
                      '내 아이디어\n' +
                      '팀플 일정 자동 추천: 캘린더 데이터 기반으로 팀 전체 일정 최적 시간대 자동 제안\n' +
                      '프라이버시 존중 일정 공유: 업무명은 숨기고 상태(바쁨/여유)만 표시 → 부담 최소화\n' +
                      '집중 모드 연계: 일정 시작 시 자동으로 ‘방해금지 모드 + 모각작 집중방 참여’ 연동\n' +
                      '크로스 툴 연결: Notion/Trello와 양방향 싱크 → 프로젝트 관리 + 일정관리 통합',
                  }}
                />
              ))
            }
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h2 className="font-semibold text-neutral-700">구글 캘린더</h2>
                <h3 className="text-xs font-medium text-neutral-500">
                  일정 등록·공유, 알림 제공
                </h3>
              </div>
              <span className="h-fit rounded-full bg-red-200 px-4 py-1.5 text-sm font-medium text-red-500">
                80.8%
              </span>
            </div>
            <div className="flex h-[120px] gap-4 overflow-hidden">
              <Image
                src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
                alt="Idea Image"
                width={120}
                height={120}
                className="aspect-square h-[120px] w-[120px] rounded-md object-cover"
              />
              <span className="text-sm text-neutral-700">
                어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌구어쩌구저쩌
              </span>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}
