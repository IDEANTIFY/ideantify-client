import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-12 bg-neutral-50 px-7 py-7">
      <section className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-center text-2xl font-bold">최근 인기 콘텐츠</h1>
          <h2 className="text-center text-lg font-medium text-neutral-600">
            아이디어 영감을 얻어보세요.
          </h2>
        </div>

        <div className="flex gap-4">
          <Input placeholder="키워드를 입력하세요" />
          <Button className="bg-ideantify hover:bg-ideantify/90 px-8 text-white">
            검색
          </Button>
        </div>
      </section>

      <section className="flex w-full max-w-4xl flex-col items-center gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-center text-2xl font-bold">최신 공모전 수상작</h1>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="cursor-pointer overflow-clip rounded-md border bg-white hover:bg-neutral-50"
            >
              <Image
                src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
                alt="Idea Image"
                width={200}
                height={160}
                className="h-[160px] w-[200px] object-cover"
              />

              <section className="flex flex-col gap-2 px-4 py-6">
                <span className="text-sm font-medium text-neutral-700">
                  아이디어 1
                </span>
                <span className="font-medium text-neutral-700">
                  2025년 수상작
                </span>
              </section>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="bg-ideantify hover:bg-ideantify/90 w-fit px-8 text-white"
        >
          더보기
        </Button>
      </section>

      <section className="flex w-full max-w-4xl flex-col items-center gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-center text-2xl font-bold">최신 트랜드 뉴스</h1>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="cursor-pointer overflow-clip rounded-md border bg-white hover:bg-neutral-50"
            >
              <Image
                src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
                alt="Idea Image"
                width={200}
                height={160}
                className="h-[160px] w-[200px] object-cover"
              />

              <section className="flex flex-col gap-2 px-4 py-6">
                <span className="text-sm font-medium text-neutral-700">
                  아이디어 1
                </span>
                <span className="font-medium text-neutral-700">
                  2025년 수상작
                </span>
              </section>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="bg-ideantify hover:bg-ideantify/90 w-fit px-8 text-white"
        >
          더보기
        </Button>
      </section>
    </div>
  )
}
