'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Share } from 'lucide-react'
import { overlay } from 'overlay-kit'
import { toast } from 'sonner'

import { ProjectListResponse, projectApi } from '@/api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import ProjectDetailModal from '@/modals/project/project-detail.modal'
import { useUserStore } from '@/stores'

export default function Page() {
  const { user } = useUserStore()

  const [projects, setProjects] = useState<ProjectListResponse[]>([])

  if (!user) return null

  useEffect(() => {
    ;(async () => {
      const response = await projectApi.getProjectList({ own: true })
      setProjects(response)
    })()
  }, [])

  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col gap-10 px-12 py-20">
      <div className="flex w-full flex-col gap-4 rounded-lg border bg-white p-8">
        <section className="flex w-full justify-between">
          <div className="flex items-center gap-8">
            <Avatar className="size-16">
              <AvatarImage src={user.avatar} alt={user.nickname} />
              <AvatarFallback>{user.nickname.at(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">{user.nickname}</h1>
              <h2 className="text-sm text-neutral-500">{user.email}</h2>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4">
              {/*<Edit*/}
              {/*  size={18}*/}
              {/*  className="cursor-pointer text-neutral-600 hover:text-neutral-600/90"*/}
              {/*/>*/}
              <Share
                size={18}
                className="cursor-pointer text-neutral-600 hover:text-neutral-600/90"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success('프로필 URL이 복사되었습니다!')
                }}
              />
            </div>

            <div className="flex gap-4">
              <span className="text-neutral-600">
                팔로워 <span className="font-bold">{user.followers}</span>
              </span>

              <span className="text-neutral-600">
                팔로잉 <span className="font-bold">{user.following}</span>
              </span>
            </div>
          </div>
        </section>

        <Separator />

        <div className="ml-32 flex gap-16">
          <div className="flex cursor-pointer flex-col items-center text-neutral-800 hover:text-neutral-800/90">
            <span className="text-3xl font-bold">{user.projects}</span>
            <span className="text-sm">프로젝트</span>
          </div>

          <div className="flex cursor-pointer flex-col items-center text-neutral-800 hover:text-neutral-800/90">
            <span className="text-3xl font-bold">0</span>
            <span className="text-sm">좋아요</span>
          </div>

          <div className="flex cursor-pointer flex-col items-center text-neutral-800 hover:text-neutral-800/90">
            <span className="text-3xl font-bold">0</span>
            <span className="text-sm">댓글</span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-lg border bg-white p-8">
        <section className="flex w-full justify-between">
          <h1 className="text-xl font-semibold">내 프로젝트</h1>
          <Link href="/ideas/new">
            <Button className="bg-ideantify hover:bg-ideantify/90 text-white">
              업로드
            </Button>
          </Link>
        </section>

        <div className="grid grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.slice(0, 3).map((project) => (
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
                  <div className="flex gap-1.5">
                    {project.keywords?.map((keyword) => (
                      <span
                        key={keyword}
                        className="w-fit rounded-full border-[0.5px] border-[#cdcdcd] bg-gray-50 px-2 py-0.5 text-xs text-neutral-700"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="col-span-3 text-center text-neutral-500">
              등록된 프로젝트가 없습니다.
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
