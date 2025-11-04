'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Search } from 'lucide-react'
import { overlay } from 'overlay-kit'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ProjectDetailModal from '@/modals/project/project-detail.modal'

export default function Page() {
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('latest')

  return (
    <div className="flex w-full max-w-5xl flex-col gap-12 bg-neutral-50 px-7 py-7">
      <div className="flex w-full items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-6">
        <div className="relative max-w-xl flex-1">
          <Search
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            placeholder="프로젝트 검색..."
            className="h-10 border-gray-200 bg-gray-50 pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40 border-gray-200 bg-gray-50">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="ai">AI</SelectItem>
              <SelectItem value="web">웹</SelectItem>
              <SelectItem value="app">앱</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-32 border-gray-200 bg-gray-50">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="popular">인기순</SelectItem>
              <SelectItem value="views">조회순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
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
                텍스트, 이미지 등 다양한 형태의 데이터를 동시에 이해하고 처리할
                수 있는 AI 모델로 구글의 차세대 AI 플랫폼입니다.
              </p>
              <span className="w-fit rounded-full border-[0.5px] border-[#cdcdcd] bg-gray-50 px-2 py-0.5 text-xs text-neutral-700">
                AI
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/ideas/new"
        className="fixed right-8 bottom-8 aspect-square rounded-full border border-zinc-300 bg-white p-5 text-center text-sm leading-tight font-semibold text-teal-400 shadow-lg transition-shadow hover:shadow-xl"
      >
        <div className="flex flex-col items-center justify-center gap-0">
          나도
          <br />
          업로드
          <br />
          하러가기
        </div>
      </Link>
    </div>
  )
}
