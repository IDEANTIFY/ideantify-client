'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'
import { overlay } from 'overlay-kit'

import { PROJECTS } from '@/__mock__/projects'
import { ProjectListResponse, projectApi } from '@/api'
import { Button } from '@/components/ui/button'
import ProjectDetailModal from '@/modals/project/project-detail.modal'

export default function IdeaList() {
  const [, setProjects] = useState<ProjectListResponse[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await projectApi.getProjectList({ own: true })
      setProjects(response)
    })()
  }, [])

  return (
    <section className="flex w-full max-w-5xl flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-teal-400">아이디어 모아보기</h2>
        <h3 className="text-lg font-semibold text-gray-700">
          &#34;IDEANTIFY&#34; 유저들의 아이디어를 구경해보세요!
        </h3>
      </div>

      <div className="flex max-w-xl flex-wrap justify-center gap-6">
        {PROJECTS.slice(0, 2).map((project, idx) => (
          <div
            key={idx}
            className="max-w-xs overflow-clip rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
            onClick={async () => {
              overlay.open(({ isOpen, close }) => (
                <ProjectDetailModal
                  isOpen={isOpen}
                  close={close}
                  // project={_project}
                />
              ))
            }}
          >
            <Image
              src={project.imageUrl}
              alt={project.projectName}
              width={300}
              height={150}
              className="h-[150px] w-full object-cover"
            />
            <div className="flex flex-col gap-2 p-3">
              <span className="text-sm font-semibold text-neutral-700">
                {project.projectName}
              </span>
              <p className="line-clamp-2 text-xs leading-5 text-zinc-500">
                {project.teamName}
              </p>
            </div>
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
