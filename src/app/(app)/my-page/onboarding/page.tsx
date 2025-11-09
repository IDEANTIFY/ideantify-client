'use client'

import { useEffect, useState } from 'react'

import { KeywordResponse, keywordApi } from '@/api'
import { Button } from '@/components/ui/button'
import { cn } from '@/libs/utils'

export default function Page() {
  const [keywords, setKeywords] = useState<KeywordResponse[]>([])
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      setKeywords(await keywordApi.getAllKeywords())
    })()
  }, [])

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
        {keywords.map((keyword) => (
          <Button
            key={keyword.id}
            variant="outline"
            className={cn(
              'font-medium',
              selectedKeywords.includes(keyword.id) &&
                'border-ideantify hover:border-ideantify text-ideantify hover:text-ideantify hover:bg-ideantify/10'
            )}
            onClick={() => {
              if (selectedKeywords.includes(keyword.id)) {
                setSelectedKeywords((prev) =>
                  prev.filter((k) => k !== keyword.id)
                )
              } else {
                setSelectedKeywords((prev) =>
                  prev.length < 4 ? [...prev, keyword.id] : prev
                )
              }
            }}
          >
            {keyword.name}
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
        disabled={selectedKeywords.length < 1}
      >
        다음으로
      </Button>
    </section>
  )
}
