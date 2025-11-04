'use client'

import Image from 'next/image'

import { Edit, Share } from 'lucide-react'
import { overlay } from 'overlay-kit'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import ProjectDetailModal from '@/modals/project/project-detail.modal'

export default function Page() {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-12 py-20">
      <div className="flex w-full flex-col gap-4 rounded-lg border bg-white p-8">
        <section className="flex w-full justify-between">
          <div className="flex items-center gap-8">
            <Avatar className="size-16">
              <AvatarFallback>김</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">김아름</h1>
              <h2 className="text-sm text-neutral-500">
                areumiii@kookmin.ac.kr
              </h2>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4">
              <Edit
                size={18}
                className="cursor-pointer text-neutral-600 hover:text-neutral-600/90"
              />
              <Share
                size={18}
                className="cursor-pointer text-neutral-600 hover:text-neutral-600/90"
              />
            </div>

            <div className="flex gap-4">
              <span className="text-neutral-600">
                팔로워 <span className="font-bold">30</span>
              </span>

              <span className="text-neutral-600">
                팔로잉 <span className="font-bold">30</span>
              </span>
            </div>
          </div>
        </section>

        <Separator />

        <div className="ml-32 flex gap-16">
          <div className="flex cursor-pointer flex-col items-center text-neutral-800 hover:text-neutral-800/90">
            <span className="text-3xl font-bold">4</span>
            <span className="text-sm">프로젝트</span>
          </div>

          <div className="flex cursor-pointer flex-col items-center text-neutral-800 hover:text-neutral-800/90">
            <span className="text-3xl font-bold">120</span>
            <span className="text-sm">좋아요</span>
          </div>

          <div className="flex cursor-pointer flex-col items-center text-neutral-800 hover:text-neutral-800/90">
            <span className="text-3xl font-bold">20</span>
            <span className="text-sm">댓글</span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-lg border bg-white p-8">
        <section className="flex w-full justify-between">
          <h1 className="text-xl font-semibold">내 프로젝트</h1>
          <Button className="bg-ideantify hover:bg-ideantify/90 text-white">
            업로드
          </Button>
        </section>

        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="max-w-xs overflow-clip rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
              onClick={() =>
                overlay.open(({ isOpen, close }) => (
                  <ProjectDetailModal isOpen={isOpen} close={close} />
                ))
              }
            >
              <Image
                src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
                alt="Idea Image"
                width={300}
                height={150}
                className="h-[150px] w-full object-cover"
              />
              <div className="flex flex-col gap-2 p-3">
                <span className="text-sm font-semibold text-neutral-700">
                  구글 제미나이
                </span>
                <p className="line-clamp-2 text-xs leading-5 text-zinc-500">
                  텍스트, 이미지 등 다양한 형태의 데이터를 동시에 이해하고
                  처리할 수 있는 AI 모델로 구글의 차세대 AI 플랫폼입니다.
                </p>
                <span className="w-fit rounded-full border-[0.5px] border-[#cdcdcd] bg-gray-50 px-2 py-0.5 text-xs text-neutral-700">
                  AI
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
