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
    <div className="flex w-full max-w-5xl flex-col gap-12 px-4 py-8">
      <section className="flex gap-6 rounded-md border bg-white px-12 py-8">
        <Avatar className="size-20">
          <AvatarFallback>김</AvatarFallback>
        </Avatar>

        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full justify-between">
            <div className="flex flex-col">
              <p className="text-2xl font-semibold">김아름</p>
              <p className="text-sm text-neutral-500">areumiii@kookmin.ac.kr</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <Share
                  className="cursor-pointer text-neutral-500 hover:text-neutral-700"
                  size={16}
                />
                <Edit
                  className="cursor-pointer text-neutral-500 hover:text-neutral-700"
                  size={16}
                />
              </div>

              <div className="flex gap-2">
                <p className="text-sm text-neutral-700">
                  팔로워 <span className="font-bold">30</span>
                </p>
                <p className="text-sm text-neutral-700">
                  팔로잉 <span className="font-bold">30</span>
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-20">
            <div className="group flex w-fit cursor-pointer flex-col items-center">
              <span className="text-2xl font-bold text-neutral-600 group-hover:text-neutral-800">
                4
              </span>
              <span className="text-neutral-600 group-hover:text-neutral-800">
                프로젝트
              </span>
            </div>

            <div className="group flex w-fit cursor-pointer flex-col items-center">
              <span className="text-2xl font-bold text-neutral-600 group-hover:text-neutral-800">
                120
              </span>
              <span className="text-neutral-600 group-hover:text-neutral-800">
                좋아요
              </span>
            </div>

            <div className="group flex w-fit cursor-pointer flex-col items-center">
              <span className="text-2xl font-bold text-neutral-600 group-hover:text-neutral-800">
                20
              </span>
              <span className="text-neutral-600 group-hover:text-neutral-800">
                댓글
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 rounded-md border bg-white px-12 py-8">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold">내 프로젝트</h1>
          <Button className="bg-ideantify hover:bg-ideantify/90 text-white">
            업로드
          </Button>
        </div>

        <div className="grid w-full grid-cols-3 justify-center gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              onClick={() =>
                overlay.open(({ isOpen, close }) => (
                  <ProjectDetailModal isOpen={isOpen} close={close} />
                ))
              }
              className="cursor-pointer overflow-clip rounded-xl border bg-white hover:bg-neutral-50"
            >
              <Image
                src="https://designcompass.org/wp-content/uploads/2023/12/gemini-01.png"
                alt="Idea Image"
                width={300}
                height={140}
                className="h-[140px] object-cover"
              />
              <section className="flex flex-col gap-2 p-4">
                <span className="font-semibold">구글 제미나이</span>
                <span className="text-xs text-neutral-600">
                  텍스트, 이미지 등 다양한 형태의 데이터를 동시에 이해하고
                  처리할 수 있는 AI 모델로 구글의 차세대 AI 플랫폼입니다.
                </span>
                <span className="w-fit rounded-full border bg-neutral-50 px-2 py-0.5 text-xs">
                  AI
                </span>
              </section>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
