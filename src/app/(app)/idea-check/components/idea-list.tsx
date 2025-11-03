import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function IdeaList() {
  return (
    <section className="flex w-full max-w-5xl flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-teal-400">아이디어 모아보기</h2>
        <h3 className="text-lg font-semibold text-gray-700">
          &#34;IDEANTIFY&#34; 유저들의 아이디어를 구경해보세요!
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="max-w-[300px] cursor-pointer overflow-clip rounded-xl border bg-white hover:bg-neutral-50"
          >
            <Image
              src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
              alt="Idea Image"
              width={300}
              height={150}
              className="h-[150px] w-[300px] object-cover"
            />
            <section className="flex flex-col gap-2 p-4">
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

      <Link href="/ideas" className="self-end">
        <Button variant="link">
          더 많은 콘텐츠 보러가기 <ArrowRight />
        </Button>
      </Link>
    </section>
  )
}
