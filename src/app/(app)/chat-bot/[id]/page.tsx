'use client'

import { use, useEffect, useRef, useState } from 'react'

import { SendHorizonal } from 'lucide-react'

import { ChatMessage, chatApi } from '@/api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  params: Promise<{ id: string }>
}

export default function Page({ params }: Props) {
  const { id: roomId } = use(params)

  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      const response = await chatApi.getUserChatMessages(roomId, {
        page: 0,
        size: 1000,
      })

      setMessages(response.messages)

      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    })()
  }, [])

  return (
    <div className="flex h-dvh w-full flex-col">
      <div
        ref={scrollRef}
        className="flex w-full flex-1 flex-col items-center overflow-y-auto bg-neutral-50 px-4 py-4"
      >
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) =>
              message.role === 'user' ? (
                <div
                  key={message.id}
                  className="flex w-full items-center justify-center rounded-xl border border-neutral-100 bg-white p-4"
                >
                  <p className="flex-1 text-base leading-6 text-neutral-700">
                    {message.content}
                  </p>
                </div>
              ) : (
                <div
                  key={message.id}
                  className="flex w-full items-center justify-center rounded-xl p-4"
                >
                  <p className="flex-1 text-base leading-6 text-neutral-700">
                    {message.content}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <section className="flex w-full shrink-0 flex-col items-center bg-white p-12">
        <div className="relative w-full max-w-2xl">
          <Textarea
            className="h-24 w-full resize-none rounded-3xl p-6 text-base"
            placeholder="아이디어를 알려주세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            disabled={!query}
            className="bg-ideantify hover:bg-ideantify/90 absolute top-4 right-4 text-white disabled:bg-neutral-500"
            onClick={async () => {
              // TODO: 아래 role 2개 확인해봐야함
              setMessages((prev) => [
                ...prev,
                {
                  id: new Date() + '',
                  createdAt: new Date().toISOString(),
                  role: 'user',
                  content: query,
                } as ChatMessage,
              ])

              setQuery('')

              const message = await chatApi.sendUserChat(roomId, {
                content: query,
              })

              setMessages((prev) => [
                ...prev,
                {
                  ...message,
                  createdAt: new Date().toISOString(),
                  role: 'assistant',
                } as ChatMessage,
              ])
            }}
          >
            <SendHorizonal />
          </Button>
        </div>
      </section>
    </div>
  )
}
