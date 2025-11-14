'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { User } from 'lucide-react'

import { SimpleUserResponse, userApi } from '@/api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { OverlayProps } from '@/libs/utils'

export default function FollowersModal({ isOpen, close }: OverlayProps) {
  const router = useRouter()
  const [followers, setFollowers] = useState<SimpleUserResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      ;(async () => {
        setIsLoading(true)
        try {
          const data = await userApi.getFollowers()
          setFollowers(data)
        } catch (error) {
          console.error('팔로워 목록 불러오기 실패:', error)
        } finally {
          setIsLoading(false)
        }
      })()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>팔로워</DialogTitle>
        </DialogHeader>

        <div className="max-h-96 space-y-2 overflow-y-auto">
          {isLoading ? (
            <div className="py-8 text-center text-sm text-neutral-500">
              로딩 중...
            </div>
          ) : followers.length === 0 ? (
            <div className="py-8 text-center text-sm text-neutral-500">
              팔로워가 없습니다
            </div>
          ) : (
            followers.map((follower) => (
              <div
                key={follower.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-neutral-50"
                onClick={() => {
                  router.push(`/users/${follower.id}`)
                  close()
                }}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={follower.avatar} />
                  <AvatarFallback>
                    {follower.nickname.at(0) || <User className="h-5 w-5" />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-neutral-700">
                    {follower.nickname}
                  </p>
                  <p className="text-xs text-neutral-500">{follower.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
