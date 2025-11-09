'use client'

import Link from 'next/link'

import {
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  FireIcon,
  LightBulbIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { LogInIcon } from 'lucide-react'
import { overlay } from 'overlay-kit'

import SidebarItem from '@/components/shared/side-bar/item'
import SidebarItemGroup from '@/components/shared/side-bar/item-group'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import LoginModal from '@/modals/auth/login.modal'
import { useAuthStore, useUserStore } from '@/stores'

export default function Sidebar() {
  const { clearToken } = useAuthStore()
  const { user, clearUser } = useUserStore()

  return (
    <div className="fixed flex h-dvh w-64 flex-col items-start justify-between border-0 border-r border-solid border-neutral-100 bg-white">
      <div className="flex w-full shrink-0 flex-col gap-6">
        <div className="flex w-full shrink-0 flex-col items-start border-0 border-b border-solid border-neutral-100 p-6">
          <div className="flex shrink-0 items-center justify-center gap-2">
            <Link
              href="/"
              className="text-ideantify text-center text-2xl leading-8 font-bold text-nowrap whitespace-pre"
            >
              IDEANTIFY
            </Link>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-start gap-8 px-4 py-0">
          <SidebarItemGroup label="AI">
            <SidebarItem
              href="/idea-check"
              icon={LightBulbIcon}
              title="아이디어 검사기"
            />
            {user && (
              <SidebarItem
                href="/chat-bot"
                icon={ChatBubbleLeftIcon}
                title="챗봇"
              />
            )}
          </SidebarItemGroup>
          <SidebarItemGroup label="아이디어">
            <SidebarItem
              href="/ideas"
              icon={DocumentTextIcon}
              title="아이디어 모아보기"
            />
            {user && (
              <SidebarItem
                href="/trending"
                icon={FireIcon}
                title="요즘 뜨는 이슈"
              />
            )}
          </SidebarItemGroup>
          {user && (
            <SidebarItemGroup label="내 정보 관리">
              <SidebarItem
                href="/my-page"
                icon={PencilSquareIcon}
                title="마이페이지"
              />
            </SidebarItemGroup>
          )}
        </div>
      </div>

      <div className="flex w-full shrink-0 items-center border-0 border-t border-solid border-neutral-100 p-6">
        {user ? (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{user.nickname.at(0)}</AvatarFallback>
              </Avatar>
              <p className="text-base font-medium">{user.nickname}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                clearToken()
                clearUser()
              }}
            >
              <ArrowRightStartOnRectangleIcon className="size-5" />
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="w-full justify-between"
            variant="ghost"
            onClick={() =>
              overlay.open(({ isOpen, close }) => (
                <LoginModal service="Ideantify" isOpen={isOpen} close={close} />
              ))
            }
          >
            로그인
            <LogInIcon />
          </Button>
        )}
      </div>
    </div>
  )
}
