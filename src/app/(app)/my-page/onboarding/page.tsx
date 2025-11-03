'use client'

import { useState } from 'react'

import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/libs/utils'

const KEYWORD = [
  '스타트업 / 창업',
  '교육 / 학습',
  '헬스케어',
  '문화 / 예술',
  '패션 / 뷰티',
  '라이프스타일',
  '여행 / 관광',
  '제조 / 하드웨어',
  '스포츠 / 피트니스',
  '모빌리티',
  '금융 / 핀테크',
  '유통 / 커머스',
  'AI / 빅데이터',
  '부동산 / 주거',
  '환경 / 사회문제',
  '정책 / 공공서비스',
]

export default function Page() {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  return (
    <section className="flex flex-col gap-6 rounded-4xl bg-white p-16 shadow-2xl">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-neutral-700">
          나의 관심사는 무엇인가요?
        </h1>
        <h2 className="text-bae font-semibold text-neutral-500">
          아이디어 주제와 관련된 내용이어도 좋습니다!
        </h2>
      </div>

      <div className="flex max-w-sm flex-wrap gap-2">
        {KEYWORD.map((keyword) => (
          <Button
            key={keyword}
            variant="outline"
            className={cn(
              'font-medium',
              selectedKeywords.includes(keyword) &&
                'border-ideantify hover:border-ideantify text-ideantify hover:text-ideantify hover:bg-ideantify/10'
            )}
            onClick={() => {
              if (selectedKeywords.includes(keyword)) {
                setSelectedKeywords((prev) => prev.filter((k) => k !== keyword))
              } else {
                setSelectedKeywords((prev) => [...prev, keyword])
              }
            }}
          >
            {keyword}
          </Button>
        ))}
      </div>

      <Button
        className="bg-ideantify hover:bg-ideantify/90 w-fit self-end"
        size="lg"
        onClick={() => {
          sessionStorage.setItem('onboarding', 'completed')
          window.location.href = '/idea-check'
        }}
      >
        다음으로
      </Button>
    </section>
  )
}
