'use client'

import { use, useEffect, useRef, useState } from 'react'

import { Client } from '@stomp/stompjs'
import { SendHorizonal, Sparkles } from 'lucide-react'

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

  const [loading, setLoading] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const lastUserMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let pollingInterval: NodeJS.Timeout | null = null

    ;(async () => {
      const response = await chatApi.getUserChatMessages(roomId, {
        page: 0,
        size: 1000,
      })

      setMessages(response.messages)

      // 초기 메시지 로드 후 스크롤을 아래로
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
      }, 50)

      // 메시지 길이가 1이면 폴링 시작 및 loading 설정
      if (response.messages.length === 1) {
        setLoading(true)

        pollingInterval = setInterval(async () => {
          const pollingResponse = await chatApi.getUserChatMessages(roomId, {
            page: 0,
            size: 1000,
          })

          setMessages(pollingResponse.messages)

          // 메시지가 생기면 폴링 중단 및 스크롤
          if (pollingResponse.messages.length > 1) {
            if (pollingInterval) {
              clearInterval(pollingInterval)
            }

            setLoading(false)

            // 답변이 도착하면 사용자 메시지가 화면 상단에서 24px 떨어지게 스크롤
            setTimeout(() => {
              if (lastUserMessageRef.current && scrollRef.current) {
                const container = scrollRef.current
                const element = lastUserMessageRef.current
                const elementRect = element.getBoundingClientRect()
                const containerRect = container.getBoundingClientRect()
                const offset =
                  elementRect.top - containerRect.top + container.scrollTop - 24

                container.scrollTo({ top: offset, behavior: 'smooth' })
              }
            }, 100)
          }
        }, 500)
      }
    })()

    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }
  }, [roomId])

  const handleSend = async () => {
    if (!query.trim()) return

    const userMessage = query

    // 사용자 메시지를 즉시 UI에 추가
    setMessages((prev) => [
      ...prev,
      {
        id: new Date() + '',
        created_at: new Date().toISOString(),
        role: 'USER',
        content: userMessage,
      } as ChatMessage,
    ])

    setQuery('')
    setLoading(true)

    // 질문을 보낼 때는 맨 아래로 스크롤
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, 100)

    try {
      // 메시지 전송 및 WebSocket 토픽 받기
      const { websocket_topic } = await chatApi.sendUserChat(roomId, {
        content: userMessage,
      })

      // WebSocket URL 생성
      const wsUrl = process.env
        .NEXT_PUBLIC_BASE_API_URL!.replace('https://', 'wss://')
        .replace('http://', 'ws://')

      // WebSocket 클라이언트 생성
      const client = new Client({
        brokerURL: `${wsUrl}/ws/chat`,
        reconnectDelay: 1000,
        debug:
          process.env.NODE_ENV === 'development'
            ? (str) => console.log(str)
            : undefined,
        onWebSocketError: (error) => {
          console.error('WebSocket 연결 오류:', error)
        },
      })

      // 연결 성공 시 토픽 구독
      client.onConnect = () => {
        client.subscribe(websocket_topic, (message) => {
          const response = JSON.parse(message.body) as ChatMessage

          // 응답 메시지를 UI에 추가
          setMessages((prev) => [
            ...prev,
            {
              ...response,
              role: 'agent',
            },
          ])

          setLoading(false)

          // 답변이 도착하면 사용자 메시지가 화면 상단에서 24px 떨어지게 스크롤
          setTimeout(() => {
            if (lastUserMessageRef.current && scrollRef.current) {
              const container = scrollRef.current
              const element = lastUserMessageRef.current
              const elementRect = element.getBoundingClientRect()
              const containerRect = container.getBoundingClientRect()
              const offset =
                elementRect.top - containerRect.top + container.scrollTop - 24

              container.scrollTo({ top: offset, behavior: 'smooth' })
            }
          }, 100)
        })
      }

      // WebSocket 활성화
      client.activate()
    } catch (error) {
      console.error('메시지 전송 실패:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-dvh w-full flex-col">
      <div
        ref={scrollRef}
        className="flex w-full flex-1 flex-col items-center overflow-y-auto bg-neutral-50 px-4 py-4"
      >
        <div className="flex w-full max-w-2xl flex-col gap-4">
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => {
              // 마지막 USER 메시지인지 확인
              const isLastUserMessage =
                message.role === 'USER' &&
                !messages.slice(index + 1).some((m) => m.role === 'USER')

              return message.role === 'USER' ? (
                <div
                  key={new Date().getTime() + message.id}
                  ref={isLastUserMessage ? lastUserMessageRef : null}
                  className="flex w-full items-center justify-center rounded-xl border border-neutral-100 bg-white p-4"
                >
                  <p className="flex-1 text-base leading-6 whitespace-pre-line text-neutral-700">
                    {message.content}
                  </p>
                </div>
              ) : (
                <div
                  key={new Date().getTime() + message.id}
                  className="flex w-full items-center justify-center rounded-xl p-4"
                >
                  <p className="flex-1 text-base leading-6 whitespace-pre-line text-neutral-700">
                    {message.content}
                  </p>
                </div>
              )
            })}

            {loading && (
              <div className="flex w-full items-center gap-2 rounded-xl p-4">
                <Sparkles className="text-ideantify h-5 w-5 animate-pulse" />
                <p className="flex-1 animate-pulse text-base leading-6 whitespace-pre-line text-neutral-700">
                  답변 생성 중...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="flex w-full shrink-0 flex-col items-center bg-white p-12">
        <div className="relative w-full max-w-2xl">
          <Textarea
            disabled={loading}
            className="h-24 w-full resize-none rounded-3xl p-6 text-base"
            placeholder="아이디어를 알려주세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            disabled={!query}
            className="bg-ideantify hover:bg-ideantify/90 absolute top-4 right-4 text-white disabled:bg-neutral-500"
            onClick={handleSend}
          >
            <SendHorizonal />
          </Button>
        </div>
      </section>
    </div>
  )
}
