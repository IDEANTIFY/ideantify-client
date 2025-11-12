'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Clock, SendHorizonal, X, Zap } from 'lucide-react'

import { ChatRoomResponse, IdeaReport, chatApi } from '@/api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/libs/utils'

type ChatRoomType = 'normal' | 'develop' | 'report'

export default function Page() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isIdeaDeveloping, setIsIdeaDeveloping] = useState(false)
  const [isReportLoading, setIsReportLoading] = useState(false)

  const [rooms, setRooms] = useState<ChatRoomResponse[]>([])

  const [showReportModal, setShowReportModal] = useState(false)
  const [ideaReports, setIdeaReports] = useState<IdeaReport[]>([])
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      setRooms((await chatApi.getUserChatRooms()).chatRooms)
    })()
  }, [])

  const loadIdeaReports = async () => {
    try {
      const reports = await chatApi.getIdeaReports()
      setIdeaReports(reports)
    } catch (error) {
      console.error('리포트 목록 불러오기 실패:', error)
      alert('리포트 목록을 불러오는데 실패했습니다.')
    }
  }

  const getChatRoomType = (): ChatRoomType => {
    if (isIdeaDeveloping) return 'develop'
    if (isReportLoading) return 'report'
    return 'normal'
  }

  const handleReportButtonClick = async () => {
    setIsReportLoading((prev) => !prev)
    setIsIdeaDeveloping(false)

    if (!isReportLoading) {
      await loadIdeaReports()
      setShowReportModal(true)
    } else {
      setSelectedReportId(null)
    }
  }

  const handleSelectReport = (reportId: string) => {
    setSelectedReportId(reportId)
    setShowReportModal(false)
  }

  const handleSubmit = async () => {
    if (!query.trim() || isSubmitting) return

    const chatRoomType = getChatRoomType()

    if (chatRoomType === 'report' && !selectedReportId) {
      await loadIdeaReports()
      setShowReportModal(true)
      return
    }

    setIsSubmitting(true)
    try {
      let response

      switch (chatRoomType) {
        case 'develop':
          response = await chatApi.createDevelopChatRoom({ content: query })
          break

        case 'report':
          response = await chatApi.createIdeaReportChatRoom(selectedReportId!, {
            content: query,
          })
          break

        case 'normal':
        default:
          response = await chatApi.createChatRoom({ content: query })
          break
      }

      router.push(`/chat-bot/${response.id}`)
    } catch (error) {
      console.error('채팅방 생성 실패:', error)
      alert('채팅방 생성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <div className="flex min-h-dvh w-full flex-col">
        <section className="flex w-full shrink-0 flex-col items-center gap-6 bg-white p-12">
          <h1 className="text-ideantify text-5xl font-bold">IDEANTIFY</h1>

          <div className="relative w-full max-w-2xl">
            <Textarea
              className="h-32 w-full resize-none rounded-3xl p-6 text-base"
              placeholder="아이디어를 알려주세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
            />
            <Button
              disabled={!query.trim() || isSubmitting}
              className="bg-ideantify hover:bg-ideantify/90 absolute top-4 right-4 text-white disabled:bg-neutral-500"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <SendHorizonal />
              )}
            </Button>

            <div className="absolute bottom-4 left-4 flex gap-2">
              <Button
                disabled={isSubmitting}
                className={cn(
                  'border bg-white text-xs disabled:bg-neutral-500',
                  isIdeaDeveloping
                    ? 'border-ideantify text-ideantify hover:bg-teal-50'
                    : 'border-neutral-500 text-neutral-500 hover:bg-neutral-50'
                )}
                onClick={() => {
                  setIsIdeaDeveloping((prev) => !prev)
                  setIsReportLoading(false)
                  setSelectedReportId(null)
                }}
              >
                <Zap /> 아이디어 디벨롭
              </Button>
              <Button
                disabled={isSubmitting}
                className={cn(
                  'border bg-white text-xs disabled:bg-neutral-500',
                  isReportLoading
                    ? 'border-ideantify text-ideantify hover:bg-teal-50'
                    : 'border-neutral-500 text-neutral-500 hover:bg-neutral-50'
                )}
                onClick={handleReportButtonClick}
              >
                <Zap /> 아이디어 검증 리포트 불러오기
                {selectedReportId && (
                  <span className="bg-ideantify ml-1 rounded-full px-1.5 text-white">
                    ✓
                  </span>
                )}
              </Button>
            </div>
          </div>
        </section>

        <section className="flex w-full flex-1 flex-col items-center gap-2 overflow-y-auto bg-neutral-50 px-4 py-8">
          {rooms.map((room) => (
            <Link
              key={room.chatRoomId}
              href={`/chat-bot/${room.chatRoomId}`}
              className="flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-neutral-100 bg-white px-5 py-4 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="line-clamp-1 flex-1 text-base leading-6 font-medium text-neutral-700">
                  {room.title}
                </p>
                <div className="flex shrink-0 items-center gap-1">
                  <Clock size={18} className="text-neutral-500" />
                  <p className="text-xs leading-4 whitespace-nowrap text-neutral-500">
                    {new Date(room.createdAt).toLocaleDateString('ko-KR', {})}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>

      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>아이디어 검증 리포트 선택</DialogTitle>
          </DialogHeader>
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {ideaReports.length === 0 ? (
              <p className="py-8 text-center text-neutral-500">
                생성된 리포트가 없습니다.
              </p>
            ) : (
              ideaReports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => handleSelectReport(report.id)}
                  className="flex w-full flex-col gap-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left transition-colors hover:bg-neutral-50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="flex-1 font-medium text-neutral-700">
                      {report.query}
                    </p>
                    {selectedReportId === report.id && (
                      <span className="text-ideantify shrink-0">✓</span>
                    )}
                  </div>
                  <p className="line-clamp-2 text-xs text-neutral-500">
                    {report.analysisNarrative}
                  </p>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
