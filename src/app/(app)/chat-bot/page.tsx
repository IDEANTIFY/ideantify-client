'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Clock, SendHorizonal, Zap } from 'lucide-react'

import { ChatRoomResponse, chatApi } from '@/api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/libs/utils'

export default function Page() {
  const [query, setQuery] = useState('')

  const [isIdeaDeveloping, setIsIdeaDeveloping] = useState(false)
  const [isReportLoading, setIsReportLoading] = useState(false)

  const [rooms, setRooms] = useState<ChatRoomResponse[]>([])

  useEffect(() => {
    ;(async () => {
      setRooms((await chatApi.getUserChatRooms()).chatRooms)
    })()
  }, [])

  return (
    <div className="flex min-h-dvh w-full flex-col">
      <section className="flex w-full shrink-0 flex-col items-center gap-6 bg-white p-12">
        <h1 className="text-ideantify text-5xl font-bold">IDEANTIFY</h1>

        <div className="relative w-full max-w-2xl">
          <Textarea
            className="h-32 w-full resize-none rounded-3xl p-6 text-base"
            placeholder="아이디어를 알려주세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            disabled={!query}
            className="bg-ideantify hover:bg-ideantify/90 absolute top-4 right-4 text-white disabled:bg-neutral-500"
          >
            <SendHorizonal />
          </Button>

          <div className="absolute bottom-4 left-4 flex gap-2">
            <Button
              className={cn(
                'border bg-white text-xs disabled:bg-neutral-500',
                isIdeaDeveloping
                  ? 'border-ideantify text-ideantify hover:bg-teal-50'
                  : 'border-neutral-500 text-neutral-500 hover:bg-neutral-50'
              )}
              onClick={() => {
                setIsIdeaDeveloping((prev) => !prev)
                setIsReportLoading(false)
              }}
            >
              <Zap /> 아이디어 디벨롭
            </Button>
            <Button
              className={cn(
                'border bg-white text-xs disabled:bg-neutral-500',
                isReportLoading
                  ? 'border-ideantify text-ideantify hover:bg-teal-50'
                  : 'border-neutral-500 text-neutral-500 hover:bg-neutral-50'
              )}
              onClick={() => {
                setIsReportLoading((prev) => !prev)
                setIsIdeaDeveloping(false)
              }}
            >
              <Zap /> 아이디어 검증 리포트 불러오기
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
  )
}
