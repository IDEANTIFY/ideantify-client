'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { User } from 'lucide-react'

import { ProjectDetailResponse, UserResponse, userApi } from '@/api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { OverlayProps } from '@/libs/utils'

interface ProjectDetailModalProps extends OverlayProps {
  project: ProjectDetailResponse
}

// TODO: 여기 실제 데이터 확인해봐야함
export default function ProjectDetailModal({
  isOpen,
  close,
  project,
}: ProjectDetailModalProps) {
  const router = useRouter()
  const [members, setMembers] = useState<UserResponse[]>([])
  const [isLoadingMembers, setIsLoadingMembers] = useState(true)

  useEffect(() => {
    if (isOpen && project.members && project.members.length > 0) {
      ;(async () => {
        setIsLoadingMembers(true)
        try {
          const memberData = await Promise.all(
            project.members!.map((memberId) => userApi.getUserProfile(memberId))
          )
          setMembers(memberData)
        } catch (error) {
          console.error('멤버 정보 불러오기 실패:', error)
        } finally {
          setIsLoadingMembers(false)
        }
      })()
    }
  }, [isOpen, project.members])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 py-8"
      onClick={close}
    >
      <div
        className="relative flex w-full max-w-[1160px] flex-col gap-8 px-20 py-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-6">
          <p className="text-[35px] font-medium text-white">
            {project.subject}
          </p>
        </div>

        <p className="text-base font-medium text-white">
          {project.description}
        </p>

        {project.members && project.members.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-xl font-medium text-white">팀원</p>
            <div className="flex flex-wrap gap-4">
              {isLoadingMembers ? (
                <p className="text-sm text-white/70">로딩 중...</p>
              ) : (
                members.map((member) => (
                  <div
                    key={member.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg bg-white/10 px-4 py-3 transition-colors hover:bg-white/20"
                    onClick={() => {
                      router.push(`/users/${member.id}`)
                      close()
                    }}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.nickname.at(0) || <User className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-white">
                        {member.nickname}
                      </p>
                      <p className="text-xs text-white/70">{member.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {project.files && project.files.length > 0 && (
          <iframe
            src={project.files[0]}
            className="h-[600px] w-full rounded-3xl border border-black/10"
            title="프로젝트 파일"
          />
        )}
      </div>
    </div>
  )
}
