'use client'

import { useState } from 'react'

import { RedirectType, redirect, usePathname } from 'next/navigation'

import { Client } from '@stomp/stompjs'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, XIcon } from 'lucide-react'
import SockJS from 'sockjs-client'

import { ideaReportApi } from '@/api'
import Title from '@/app/(app)/idea-check/components/title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/libs/utils'

interface Metadata {
  summary: string
  purpose: string
  differentiation: string
  technology: string
  target: string
}

const MetadataLabel: Record<keyof Metadata, string> = {
  summary: '주요 내용',
  purpose: '목적',
  differentiation: '차별점',
  technology: '핵심 기술',
  target: '사용 대상',
}

interface Props {
  defaultQuery?: string
  defaultMetadata?: Metadata
}

export default function InputArea({ defaultQuery, defaultMetadata }: Props) {
  const pathname = usePathname()

  const [query, setQuery] = useState<string | undefined>(defaultQuery)
  const [metadata, setMetadata] = useState<Metadata | undefined>(
    defaultMetadata
  )

  const [isMetadataOpen, setIsMetadataOpen] = useState(true)

  return (
    <section className="flex w-full max-w-2xl flex-col items-center gap-6 pt-32 pb-12">
      <Title />

      <div className="flex w-full flex-col gap-4">
        {!metadata ? (
          <>
            <div className="relative">
              <Textarea
                className="h-42 resize-none rounded-3xl bg-white p-6 pb-14 text-base focus-visible:border-teal-300 focus-visible:ring-1 focus-visible:ring-teal-300"
                placeholder={`내가 생각한 서비스, 혹시 이미 있을까? 아이디어를 입력해 보세요.
ex) 팀플 일정 맞춰주는 앱`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                disabled={!query}
                className="absolute right-4 bottom-4 bg-teal-400 text-white hover:bg-teal-400/90 disabled:bg-neutral-500"
                onClick={async () => {
                  const { websocket_topic } =
                    await ideaReportApi.createIdeaReportMetadata({
                      query: query!,
                    })

                  const client = new Client({
                    webSocketFactory: () =>
                      new SockJS(
                        process.env.NEXT_PUBLIC_BASE_API_URL + '/ws/chat'
                      ),
                    reconnectDelay: 1000,
                    debug: (str) => console.log(str),
                    onWebSocketError: (error) => {
                      console.error('WebSocket 에러:', error)
                    },
                  })

                  client.onConnect = () => {
                    client.subscribe(websocket_topic, (message) => {
                      setMetadata(JSON.parse(message.body) as Metadata)
                      client.forceDisconnect()
                    })
                  }

                  client.activate()
                }}
              >
                검사하기
              </Button>
            </div>
            <span className="text-sm text-gray-400">
              좀 더 구체적으로도 좋아요 👇
              <br />
              ex) 강의 시간표와 팀원 일정표를 분석해 최적 회의 시간을 추천해주는
              서비스
            </span>
          </>
        ) : (
          <section className="flex flex-col items-center gap-6">
            <div className="flex w-full items-center justify-between rounded-full border-2 border-teal-300 bg-teal-50 px-6 py-4">
              {query}
              <XIcon
                size={14}
                className="cursor-pointer"
                onClick={() => setMetadata(undefined)}
              />
            </div>

            {pathname === '/idea-check' ? (
              <span className="text-sm text-gray-600">
                AI가 자동으로 구체화했어요. 필요하면 자유롭게 수정해보세요️
              </span>
            ) : (
              <div
                className="text- flex cursor-pointer flex-col items-center gap-1 text-gray-600"
                onClick={() => setIsMetadataOpen((prev) => !prev)}
              >
                <span>아이디어 구체화 내용 보기</span>
                <ChevronDown
                  className={cn(
                    'transition-all duration-300',
                    isMetadataOpen ? 'rotate-180' : 'rotate-0'
                  )}
                />
              </div>
            )}

            <AnimatePresence initial={false}>
              {isMetadataOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: 'linear' }}
                  className="w-full overflow-hidden"
                >
                  <div className="flex w-full flex-col gap-4 rounded-xl border bg-gray-100 px-12 py-8">
                    {(Object.keys(metadata) as (keyof Metadata)[]).map(
                      (key) => (
                        <div key={key} className="flex flex-col gap-0.5">
                          <span className="font-medium text-teal-400">
                            {MetadataLabel[key]}
                          </span>
                          <Input
                            className="border-teal-400 bg-gray-50 p-5 text-gray-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400"
                            value={metadata[key]}
                            onChange={(e) =>
                              setMetadata({
                                ...metadata,
                                [key]: e.target.value,
                              })
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {pathname === '/idea-check' && (
              <Button
                size="lg"
                className="bg-teal-400 text-white hover:bg-teal-400/90"
                onClick={async () => {
                  if (!metadata) return

                  const { websocket_topic } =
                    await ideaReportApi.createIdeaReport({
                      query: query!,
                      ...metadata,
                    })

                  const client = new Client({
                    webSocketFactory: () =>
                      new SockJS(
                        process.env.NEXT_PUBLIC_BASE_API_URL + '/ws/chat'
                      ),
                    reconnectDelay: 1000,
                    debug: (str) => console.log(str),
                    onWebSocketError: (error) => {
                      console.error('WebSocket 에러:', error)
                    },
                  })

                  client.onConnect = () => {
                    client.subscribe(websocket_topic, (message) => {
                      const { id } = JSON.parse(message.body) as { id: string }
                      client.forceDisconnect()
                      redirect(`/idea-check/${id}`, RedirectType.push)
                    })
                  }

                  client.activate()
                }}
              >
                검사하기
                <ArrowRight />
              </Button>
            )}
          </section>
        )}
      </div>
    </section>
  )
}
