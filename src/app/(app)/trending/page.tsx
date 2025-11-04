import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
  return (
    <div className="flex flex-col gap-24 px-8 py-20">
      <div className="flex flex-col items-center gap-6">
        <section className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">최근 인기 콘텐츠</h1>
          <h2 className="text-lg font-medium text-neutral-700">
            아이디어 영감을 얻어보세요.
          </h2>
        </section>

        <div className="flex gap-4">
          <Input
            className="w-sm bg-white"
            placeholder="키워드를 입력하세요..."
          />
          <Button className="bg-ideantify hover:bg-ideantify/90 text-white">
            검색
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">최신 공모전 수상작</h1>

        <div className="grid w-2xl grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <Link
              key={index}
              href="https://example.com"
              target="_blank"
              className="flex cursor-pointer flex-col gap-2 overflow-hidden rounded-md border bg-white hover:bg-neutral-50"
            >
              <Image
                src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
                alt="Idea Image"
                width={300}
                height={150}
                className="h-[150px] w-full object-cover"
              />
              <div className="flex flex-col gap-2 p-5 pt-3">
                <span className="text-sm text-neutral-500">아이디어 1</span>
                <span className="font-medium">2025년 수상작</span>
              </div>
            </Link>
          ))}
        </div>

        <Button
          size="lg"
          className="bg-ideantify hover:bg-ideantify/90 text-white"
        >
          더보기
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">최신 트랜드 뉴스</h1>

        <div className="grid w-2xl grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <Link
              key={index}
              href="https://example.com"
              target="_blank"
              className="flex cursor-pointer flex-col gap-2 overflow-hidden rounded-md border bg-white hover:bg-neutral-50"
            >
              <Image
                src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
                alt="Idea Image"
                width={300}
                height={150}
                className="h-[150px] w-full object-cover"
              />
              <div className="flex flex-col gap-2 p-5 pt-3">
                <span className="text-sm text-neutral-500">아이디어 1</span>
                <span className="font-medium">2025년 수상작</span>
              </div>
            </Link>
          ))}
        </div>

        <Button
          size="lg"
          className="bg-ideantify hover:bg-ideantify/90 text-white"
        >
          더보기
        </Button>
      </div>
    </div>
  )
}
