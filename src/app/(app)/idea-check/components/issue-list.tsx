'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { NEWS } from '@/__mock__/news'
import { TrendingIssueResponse } from '@/api'
import { Button } from '@/components/ui/button'

export default function IssueList() {
  const [issues, setIssues] = useState<TrendingIssueResponse[]>([])

  useEffect(() => {
    // ;(async () => {
    //   setIssues(await userApi.getTrendingIssues())
    // })()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIssues(
      NEWS.map((issue) => ({
        title: issue.title,
        link: issue.link,
        source: issue.source,
        date: issue.date,
        image: issue.image,
        snippet: issue.snippet,
        matchedKeywords: issue.matched_keywords,
      })) as TrendingIssueResponse[]
    )
  }, [])

  return (
    <section className="flex w-full max-w-5xl flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-teal-400">요즘 뜨는 이슈</h2>
        <h3 className="text-lg font-semibold text-gray-700">
          지금 트렌드인 사례/뉴스/수상작들을 모아봤어요
        </h3>
      </div>

      <div className="grid max-w-xl grid-cols-2 gap-8">
        {issues.slice(0, 2).map((issue) => (
          <Link
            key={issue.link}
            href={issue.link}
            target="_blank"
            className="flex cursor-pointer flex-col gap-2 overflow-hidden rounded-md border bg-white hover:bg-neutral-50"
          >
            <Image
              src={issue.image || '/placeholder.png'}
              alt={issue.title}
              width={300}
              height={150}
              className="h-[150px] w-full object-cover"
            />
            <div className="flex flex-col gap-2 p-5 pt-3">
              <span className="text-sm text-neutral-500">{issue.source}</span>
              <span className="font-medium">{issue.title}</span>
            </div>
          </Link>
        ))}
      </div>

      <Link href="/trending" className="self-end">
        <Button variant="link">
          더 많은 콘텐츠 보러가기 <ArrowRight />
        </Button>
      </Link>
    </section>
  )
}
