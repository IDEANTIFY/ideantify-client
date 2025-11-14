'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { addHours, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Clock, SendHorizonal, Zap } from 'lucide-react'
import { overlay } from 'overlay-kit'

import {
  ChatRoomResponse,
  IdeaReportListResponse,
  chatApi,
  ideaReportApi,
} from '@/api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/libs/utils'
import SelectReportModal from '@/modals/chat/select-report.modal'

type ChatRoomType = 'normal' | 'develop' | 'report'

export default function Page() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isIdeaDeveloping, setIsIdeaDeveloping] = useState(false)
  const [isReportLoading, setIsReportLoading] = useState(false)

  const [rooms, setRooms] = useState<ChatRoomResponse[]>([])

  const [ideaReports, setIdeaReports] = useState<IdeaReportListResponse[]>([])
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null)

  // 초기에 채팅방 목록과 아이디어 리포트 목록을 한번 로드
  useEffect(() => {
    ;(async () => {
      const [chatRoomsData, ideaReportsData] = await Promise.all([
        chatApi.getUserChatRooms(),
        ideaReportApi.getIdeaReportList(),
      ])
      setRooms(chatRoomsData.chat_rooms)
      setIdeaReports(ideaReportsData)
    })()
  }, [])

  const getChatRoomType = (): ChatRoomType => {
    if (isIdeaDeveloping) return 'develop'
    if (isReportLoading) return 'report'
    return 'normal'
  }

  const handleReportButtonClick = () => {
    setIsIdeaDeveloping(false)

    if (!isReportLoading) {
      overlay.open(({ isOpen, close }) => (
        <SelectReportModal
          isOpen={isOpen}
          close={() => {
            // 모달이 닫힐 때 리포트가 선택되었는지 확인
            if (selectedReportId) {
              setIsReportLoading(true)
            }
            close()
          }}
          ideaReports={ideaReports}
          selectedReportId={selectedReportId}
          onSelectReport={(reportId) => {
            setSelectedReportId(reportId)
          }}
        />
      ))
    } else {
      setIsReportLoading(false)
      setSelectedReportId(null)
    }
  }

  const handleSubmit = async () => {
    if (!query.trim() || isSubmitting) return

    const chatRoomType = getChatRoomType()

    if (chatRoomType === 'report' && !selectedReportId) {
      overlay.open(({ isOpen, close }) => (
        <SelectReportModal
          isOpen={isOpen}
          close={close}
          ideaReports={ideaReports}
          selectedReportId={selectedReportId}
          onSelectReport={(reportId) => {
            setSelectedReportId(reportId)
          }}
        />
      ))
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
                  selectedReportId
                    ? 'border-ideantify text-ideantify hover:bg-teal-50'
                    : 'border-neutral-500 text-neutral-500 hover:bg-neutral-50'
                )}
                onClick={handleReportButtonClick}
              >
                <Zap /> 아이디어 검증 리포트 불러오기
              </Button>
            </div>
          </div>
        </section>

        <section className="flex w-full flex-1 flex-col items-center gap-2 overflow-y-auto bg-neutral-50 px-4 py-8">
          {rooms.map((room) => (
            <Link
              key={room.chat_room_id}
              href={`/chat-bot/${room.chat_room_id}`}
              className="flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-neutral-100 bg-white px-5 py-4 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="line-clamp-1 flex-1 text-base leading-6 font-medium text-neutral-700">
                  {room.title}
                </p>
                <div className="flex shrink-0 items-center gap-1">
                  <Clock size={18} className="text-neutral-500" />
                  <p className="text-xs leading-4 whitespace-nowrap text-neutral-500">
                    {formatDistanceToNow(
                      addHours(new Date(room.created_at), 9),
                      {
                        addSuffix: true,
                        locale: ko,
                      }
                    )}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </>
  )
}
