'use client'

import { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ChartColumnIncreasing, Download, SendHorizonal } from 'lucide-react'
import { overlay } from 'overlay-kit'

import { ResultItem, chatApi, ideaReportApi } from '@/api'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/libs/utils'
import ReportProjectDetailModal from '@/modals/project/report-project-detail.modal'

interface Props {
  reportId: string
  similarity: number
  creativity: number
  feasibility: number
  analysisNarrative: string
  detailedResults: ResultItem[]
}

export default function IdeaReport({
  reportId,
  similarity,
  creativity,
  feasibility,
  analysisNarrative,
  detailedResults,
}: Props) {
  const router = useRouter()
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
          {/*<Button*/}
          {/*  size="lg"*/}
          {/*  className="rounded-full bg-teal-600 hover:bg-teal-600/90"*/}
          {/*>*/}
          {/*  결과 저장 <Download />*/}
          {/*</Button>*/}
          <Link href={`/chat-bot/${reportId}`}>
            <Button
              size="lg"
              className="bg-ideantify hover:bg-ideantify/90 rounded-full"
              onClick={async () => {
                const find = (await chatApi.getUserChatRooms()).chat_rooms.find(
                  (r) => r.idea_report_id === reportId
                )

                if (find) {
                  router.push(`/chat-bot/${find.chat_room_id}`)
                } else {
                  router.push(`/chat-bot?report=${reportId}`)
                }
              }}
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
              <span>유사성</span>
              <span>{similarity}%</span>
            </div>
            <Slider value={[similarity]} max={100} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm font-medium">
              <span>창의성</span>
              <span>{creativity}%</span>
            </div>
            <Slider value={[creativity]} max={100} />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-sm font-medium">
              <span>실현 가능성</span>
              <span>{feasibility}%</span>
            </div>
            <Slider value={[feasibility]} max={100} />
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="gap-2 text-lg font-semibold text-gray-700">
            분석 결과
          </h2>
          <span className="text-sm text-neutral-700">{analysisNarrative}</span>
        </section>
      </div>

      <Separator />

      <section className="grid grid-cols-3 gap-4">
        {detailedResults.map((result) => (
          <div
            key={result.id}
            className="flex cursor-pointer flex-col gap-4 rounded-lg border bg-white p-5 hover:bg-neutral-50"
            onClick={() =>
              overlay.open(({ isOpen, close }) => (
                <ReportProjectDetailModal
                  isOpen={isOpen}
                  close={close}
                  result={result}
                />
              ))
            }
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h2 className="line-clamp-1 font-semibold text-neutral-700">
                  {result.title}
                </h2>
              </div>
              <span
                className={cn(
                  'h-fit rounded-full px-4 py-1.5 text-sm font-medium',
                  Number(result.score) >= 0.8
                    ? 'bg-red-200 text-red-500'
                    : Number(result.score) >= 0.7
                      ? 'bg-teal-100 text-teal-500'
                      : 'bg-sky-200 text-blue-500'
                )}
              >
                {(Number(result.score) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex h-[120px] gap-4 overflow-hidden">
              <Image
                src={result.thumbnail || '/placeholder.png'}
                alt={result.title}
                width={120}
                height={120}
                className="aspect-square h-[120px] w-[120px] rounded-md object-cover"
              />
              <span className="text-sm text-neutral-700">{result.summary}</span>
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}
