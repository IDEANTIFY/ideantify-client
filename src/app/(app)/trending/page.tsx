'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { NEWS } from '@/__mock__/news'
import { TrendingIssueResponse } from '@/api'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [issues, setIssues] = useState<TrendingIssueResponse[]>([])
  const [page, setPage] = useState(1)

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
    <div className="flex min-h-dvh flex-col gap-16 px-8 py-20">
      <div className="flex flex-col items-center gap-6">
        <section className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">최신 트랜드 뉴스</h1>
          <h2 className="text-lg font-medium text-neutral-500">
            아이디어 영감을 얻어보세요.
          </h2>
        </section>

        {/*<div className="flex gap-4">*/}
        {/*  <Input*/}
        {/*    className="w-sm bg-white"*/}
        {/*    placeholder="키워드를 입력하세요..."*/}
        {/*  />*/}
        {/*  <Button className="bg-ideantify hover:bg-ideantify/90 text-white">*/}
        {/*    검색*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="grid w-2xl grid-cols-3 gap-8">
          {issues.length > 0 ? (
            issues.slice(0, 9 * page).map((issue) => (
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
                  <span className="text-sm text-neutral-500">
                    {issue.source}
                  </span>
                  <span className="line-clamp-2 font-medium">
                    {issue.title}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <span className="col-span-3 text-center text-neutral-500">
              등록된 트랜드 뉴스가 없습니다.
            </span>
          )}
        </div>

        <Button
          size="lg"
          className="bg-ideantify hover:bg-ideantify/90 text-white"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={issues.length <= page * 9}
        >
          더보기
        </Button>
      </div>
    </div>
  )
}
