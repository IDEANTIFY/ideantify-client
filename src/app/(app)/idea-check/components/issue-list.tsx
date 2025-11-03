import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function IssueList() {
  return (
    <section className="flex w-full max-w-5xl flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-teal-400">요즘 뜨는 이슈</h2>
        <h3 className="text-lg font-semibold text-gray-700">
          지금 트렌드인 사례/뉴스/수상작들을 모아봤어요
        </h3>
      </div>

      <h4 className="text-lg font-semibold text-gray-700">
        최신 공모전 수상작
      </h4>

      <div className="grid grid-cols-2 gap-8">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full cursor-pointer gap-6 rounded-lg border bg-white p-4 hover:bg-neutral-50"
          >
            <Image
              src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
              alt="Idea Image"
              width={100}
              height={100}
              className="aspect-square h-[100px] w-[100px] rounded-md object-cover"
            />
            <section className="flex flex-col gap-2">
              <span className="font-semibold">구글 제미나이</span>
              <span className="text-xs text-neutral-600">
                텍스트, 이미지 등 다양한 형태의 데이터를 동시에 이해하고 처리할
                수 있는 AI 모델로 구글의 차세대 AI 플랫폼입니다.
              </span>
              <span className="w-fit rounded-full border bg-neutral-50 px-2 py-0.5 text-xs">
                AI
              </span>
            </section>
          </div>
        ))}
      </div>

      <h4 className="text-lg font-semibold text-gray-700">최신 트렌드 뉴스</h4>

      <div className="grid grid-cols-2 gap-8">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex w-full cursor-pointer gap-6 rounded-lg border bg-white p-4 hover:bg-neutral-50"
          >
            <Image
              src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
              alt="Idea Image"
              width={100}
              height={100}
              className="aspect-square h-[100px] w-[100px] rounded-md object-cover"
            />
            <section className="flex flex-col gap-2">
              <span className="font-semibold">구글 제미나이</span>
              <span className="text-xs text-neutral-600">
                텍스트, 이미지 등 다양한 형태의 데이터를 동시에 이해하고 처리할
                수 있는 AI 모델로 구글의 차세대 AI 플랫폼입니다.
              </span>
              <span className="w-fit rounded-full border bg-neutral-50 px-2 py-0.5 text-xs">
                AI
              </span>
            </section>
          </div>
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
