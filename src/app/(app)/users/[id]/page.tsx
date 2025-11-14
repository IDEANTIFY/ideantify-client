'use client'

import { use, useEffect, useState } from 'react'

import Image from 'next/image'

import { Share, UserMinus, UserPlus } from 'lucide-react'
import { overlay } from 'overlay-kit'
import { toast } from 'sonner'

import { ProjectListResponse, UserResponse, projectApi, userApi } from '@/api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import ProjectDetailModal from '@/modals/project/project-detail.modal'
import { useUserStore } from '@/stores'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { user: currentUser } = useUserStore()
  const [profileUser, setProfileUser] = useState<UserResponse | null>(null)
  const [projects, setProjects] = useState<ProjectListResponse[]>([])
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = use(params)

  const isOwnProfile = currentUser?.id === id

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const [userData, projectsData] = await Promise.all([
          userApi.getUserProfile(id),
          projectApi.getProjectList({ user: id }),
        ])
        setProfileUser(userData)
        setProjects(projectsData)

        // 팔로우 상태 확인
        if (currentUser && !isOwnProfile) {
          const followings = await userApi.getFollowings()
          setIsFollowing(followings.some((f) => f.id === id))
        }
      } catch (error) {
        console.error('프로필 로드 실패:', error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [id, currentUser, isOwnProfile])

  const handleFollowToggle = async () => {
    if (!currentUser) return

    try {
      if (isFollowing) {
        await userApi.unfollowUser(id)
        setIsFollowing(false)
        toast.success('언팔로우했습니다')
        if (profileUser) {
          setProfileUser({
            ...profileUser,
            followers: profileUser.followers - 1,
          })
        }
      } else {
        await userApi.followUser(id)
        setIsFollowing(true)
        toast.success('팔로우했습니다')
        if (profileUser) {
          setProfileUser({
            ...profileUser,
            followers: profileUser.followers + 1,
          })
        }
      }
    } catch (error) {
      console.error('팔로우 토글 실패:', error)
    }
  }

  if (isLoading || !profileUser) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="text-neutral-500">로딩 중...</div>
      </div>
    )
  }

  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col gap-10 px-12 py-20">
      <div className="flex w-full flex-col gap-4 rounded-lg border bg-white p-8">
        <section className="flex w-full justify-between">
          <div className="flex items-center gap-8">
            <Avatar className="size-16">
              <AvatarImage
                src={profileUser.avatar}
                alt={profileUser.nickname}
              />
              <AvatarFallback>{profileUser.nickname.at(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">{profileUser.nickname}</h1>
              <h2 className="text-sm text-neutral-500">{profileUser.email}</h2>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-4">
              {!isOwnProfile && currentUser && (
                <Button
                  size="sm"
                  variant={isFollowing ? 'outline' : 'default'}
                  className={
                    isFollowing
                      ? 'border-neutral-300 text-neutral-600'
                      : 'bg-ideantify hover:bg-ideantify/90 text-white'
                  }
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="mr-1 h-4 w-4" />
                      언팔로우
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-1 h-4 w-4" />
                      팔로우
                    </>
                  )}
                </Button>
              )}
              <Share
                size={18}
                className="cursor-pointer text-neutral-600 hover:text-neutral-600/90"
                onClick={() => {
                  const profileUrl = `${window.location.origin}/users/${id}`
                  navigator.clipboard.writeText(profileUrl)
                  toast.success('프로필 URL이 복사되었습니다!')
                }}
              />
            </div>

            <div className="flex gap-4">
              <span className="text-neutral-600 transition-colors">
                팔로워{' '}
                <span className="font-bold">{profileUser.followers}</span>
              </span>

              <span className="text-neutral-600 transition-colors">
                팔로잉{' '}
                <span className="font-bold">{profileUser.following}</span>
              </span>
            </div>
          </div>
        </section>

        <Separator />

        <div className="ml-32 flex gap-16">
          <div className="flex flex-col items-center text-neutral-800">
            <span className="text-3xl font-bold">{profileUser.projects}</span>
            <span className="text-sm">프로젝트</span>
          </div>

          <div className="flex flex-col items-center text-neutral-800">
            <span className="text-3xl font-bold">0</span>
            <span className="text-sm">좋아요</span>
          </div>

          <div className="flex flex-col items-center text-neutral-800">
            <span className="text-3xl font-bold">0</span>
            <span className="text-sm">댓글</span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-lg border bg-white p-8">
        <section className="flex w-full justify-between">
          <h1 className="text-xl font-semibold">
            {isOwnProfile ? '내 프로젝트' : '프로젝트'}
          </h1>
        </section>

        <div className="grid grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="max-w-xs cursor-pointer overflow-clip rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
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
              등록된 프로젝트가 없습니다.
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
