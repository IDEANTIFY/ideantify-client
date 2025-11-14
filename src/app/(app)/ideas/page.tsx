'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { overlay } from 'overlay-kit'

import { ProjectListResponse, projectApi } from '@/api'
import { Button } from '@/components/ui/button'
import ProjectDetailModal from '@/modals/project/project-detail.modal'
import { useUserStore } from '@/stores'

export default function Page() {
  const { user } = useUserStore()

  const [projects, setProjects] = useState<ProjectListResponse[]>([])
  const [page, setPage] = useState(0)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const response = await projectApi.getProjectList({ page, size: 9 })
      setProjects((prev) => [...prev, ...response])
      setLoading(false)
    })()
  }, [page])

  if (loading) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center">
        <span className="text-lg text-neutral-500">로딩 중...</span>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col gap-16 px-8 py-20">
      <section className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">아이디어 모아보기</h1>
        <h2 className="text-lg font-medium text-neutral-500">
          아이디어 영감을 얻어보세요.
        </h2>
      </section>
      {/*<div className="flex w-full items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-6">*/}
      {/*  <div className="relative max-w-3xl flex-1">*/}
      {/*    <Search*/}
      {/*      className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"*/}
      {/*      size={20}*/}
      {/*    />*/}
      {/*    <Input*/}
      {/*      placeholder="프로젝트 검색..."*/}
      {/*      className="h-10 border-gray-200 bg-gray-50 pl-10"*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  <div className="flex items-center gap-2">*/}
      {/*    <Select value={category} onValueChange={setCategory}>*/}
      {/*      <SelectTrigger className="w-40 border-gray-200 bg-gray-50">*/}
      {/*        <SelectValue placeholder="카테고리" />*/}
      {/*      </SelectTrigger>*/}
      {/*      <SelectContent>*/}
      {/*        <SelectItem value="all">전체</SelectItem>*/}
      {/*        <SelectItem value="ai">AI</SelectItem>*/}
      {/*        <SelectItem value="web">웹</SelectItem>*/}
      {/*        <SelectItem value="app">앱</SelectItem>*/}
      {/*      </SelectContent>*/}
      {/*    </Select>*/}

      {/*    <Select value={sort} onValueChange={setSort}>*/}
      {/*      <SelectTrigger className="w-32 border-gray-200 bg-gray-50">*/}
      {/*        <SelectValue placeholder="정렬" />*/}
      {/*      </SelectTrigger>*/}
      {/*      <SelectContent>*/}
      {/*        <SelectItem value="latest">최신순</SelectItem>*/}
      {/*        <SelectItem value="popular">인기순</SelectItem>*/}
      {/*        <SelectItem value="views">조회순</SelectItem>*/}
      {/*      </SelectContent>*/}
      {/*    </Select>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="max-w-xs overflow-clip rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
                onClick={async () => {
                  const _project = await projectApi.getProject(project.id)

                  overlay.open(({ isOpen, close }) => (
                    <ProjectDetailModal
                      isOpen={isOpen}
                      close={close}
                      project={_project}
                    />
                  ))
                }}
              >
                <Image
                  src={project.image}
                  alt={project.subject}
                  width={300}
                  height={150}
                  className="h-[150px] w-full object-cover"
                />
                <div className="flex flex-col gap-2 p-3">
                  <span className="text-sm font-semibold text-neutral-700">
                    {project.subject}
                  </span>
                  <p className="line-clamp-2 text-xs leading-5 text-zinc-500">
                    {project.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <span className="col-span-3 text-center text-neutral-500">
              등록된 아이디어가 없습니다.
            </span>
          )}
        </div>

        <Button
          size="lg"
          className="bg-ideantify hover:bg-ideantify/90 text-white"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={projects.length <= page * 9}
        >
          더보기
        </Button>
      </div>

      {user && (
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
      )}
    </div>
  )
}
