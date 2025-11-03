'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Clock, SendHorizonal, Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/libs/utils'

export default function Page() {
  const [query, setQuery] = useState('')

  const [isIdeaDeveloping, setIsIdeaDeveloping] = useState(false)
  const [isReportLoading, setIsReportLoading] = useState(false)

  return (
    <div className="flex h-screen w-full flex-col">
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
              onClick={() => setIsIdeaDeveloping((prev) => !prev)}
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
              onClick={() => setIsReportLoading((prev) => !prev)}
            >
              <Zap /> 아이디어 검증 리포트 불러오기
            </Button>
          </div>
        </div>
      </section>

      <section className="flex w-full flex-1 flex-col items-center gap-2 overflow-y-auto bg-neutral-50 px-4 py-8">
        {[...Array(10)].map((_, i) => (
          <Link
            key={i}
            href={`/chat-bot/${i + 1}`}
            className="flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-neutral-100 bg-white px-5 py-4 transition-colors hover:bg-neutral-50"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="line-clamp-1 flex-1 text-base leading-6 font-medium text-neutral-700">
                User-agent: * Disallow: /user/history Disallow: /kr/user/history
                # Allow user agents Us
              </p>
              <div className="flex shrink-0 items-center gap-1">
                <Clock size={18} className="text-neutral-500" />
                <p className="text-xs leading-4 whitespace-nowrap text-neutral-500">
                  6시간 전
                </p>
              </div>
            </div>
            <p className="line-clamp-2 text-sm leading-5 text-neutral-500">
              아니요, 팀블라인드(Team Blind)를 스크래핑하면 안 됩니다.
              제공해주신 robots.txt 파일과 팀블라인드의 이용약관을 확인한 결과,
              명확히 스크래핑이 금지되어 있습니다. robots.txt에서 다음과 같이 AI
              크롤러들을 명시적으로 차단하고 있습니다
            </p>
          </Link>
        ))}
      </section>
    </div>
  )
}
