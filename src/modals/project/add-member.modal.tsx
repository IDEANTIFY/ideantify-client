'use client'

import { useEffect, useState } from 'react'

import { Search, User } from 'lucide-react'

import { SimpleUserResponse, userApi } from '@/api'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { OverlayProps } from '@/libs/utils'

interface AddMemberModalProps extends OverlayProps {
  onAddMember: (user: SimpleUserResponse) => void
}

export default function AddMemberModal({
  isOpen,
  close,
  onAddMember,
}: AddMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<SimpleUserResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const searchUsers = async () => {
      if (!searchQuery.trim()) {
        setUsers([])
        return
      }

      setIsLoading(true)
      try {
        const results = await userApi.searchUsers(searchQuery)
        // 최대 5개만 표시
        setUsers(results.slice(0, 5))
      } catch (error) {
        console.error('Failed to search users:', error)
        setUsers([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchUsers, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const handleAddMember = (user: SimpleUserResponse) => {
    onAddMember(user)
    close()
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>멤버 추가</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="사용자 이름이나 이메일로 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="max-h-[300px] space-y-2 overflow-y-auto">
            {isLoading && (
              <div className="py-8 text-center text-sm text-neutral-500">
                검색 중...
              </div>
            )}

            {!isLoading && searchQuery && users.length === 0 && (
              <div className="py-8 text-center text-sm text-neutral-500">
                검색 결과가 없습니다
              </div>
            )}

            {!isLoading && !searchQuery && (
              <div className="py-8 text-center text-sm text-neutral-500">
                사용자를 검색해주세요
              </div>
            )}

            {!isLoading &&
              users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleAddMember(user)}
                  className="flex w-full items-center gap-3 rounded-lg p-3 transition-colors hover:bg-neutral-100"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.nickname}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-neutral-600" />
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-medium">{user.nickname}</p>
                    <p className="text-xs text-neutral-500">{user.email}</p>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
