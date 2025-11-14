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

export default function FollowingsModal({ isOpen, close }: OverlayProps) {
  const router = useRouter()
  const [followings, setFollowings] = useState<SimpleUserResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      ;(async () => {
        setIsLoading(true)
        try {
          const data = await userApi.getFollowings()
          setFollowings(data)
        } catch (error) {
          console.error('팔로잉 목록 불러오기 실패:', error)
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
          <DialogTitle>팔로잉</DialogTitle>
        </DialogHeader>

        <div className="max-h-96 space-y-2 overflow-y-auto">
          {isLoading ? (
            <div className="py-8 text-center text-sm text-neutral-500">
              로딩 중...
            </div>
          ) : followings.length === 0 ? (
            <div className="py-8 text-center text-sm text-neutral-500">
              팔로잉이 없습니다
            </div>
          ) : (
            followings.map((following) => (
              <div
                key={following.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-neutral-50"
                onClick={() => {
                  router.push(`/users/${following.id}`)
                  close()
                }}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={following.avatar} />
                  <AvatarFallback>
                    {following.nickname.at(0) || <User className="h-5 w-5" />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-neutral-700">
                    {following.nickname}
                  </p>
                  <p className="text-xs text-neutral-500">{following.email}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
