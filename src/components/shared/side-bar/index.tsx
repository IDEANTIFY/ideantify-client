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
import { overlay } from 'overlay-kit'

import SidebarItem from '@/components/shared/side-bar/item'
import SidebarItemGroup from '@/components/shared/side-bar/item-group'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import LoginModal from '@/modals/auth/login.modal'

export default function Sidebar() {
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
            <SidebarItem
              href="/chat-bot"
              icon={ChatBubbleLeftIcon}
              title="챗봇"
            />
          </SidebarItemGroup>
          <SidebarItemGroup label="아이디어">
            <SidebarItem
              href="/ideas"
              icon={DocumentTextIcon}
              title="아이디어 모아보기"
            />
            <SidebarItem
              href="/trending"
              icon={FireIcon}
              title="요즘 뜨는 이슈"
            />
          </SidebarItemGroup>
          <SidebarItemGroup label="내 정보 관리">
            <SidebarItem
              href="/my-page"
              icon={PencilSquareIcon}
              title="마이페이지"
            />
          </SidebarItemGroup>
        </div>
      </div>

      <div className="flex w-full shrink-0 items-center border-0 border-t border-solid border-neutral-100 p-6">
        <div className="relative flex min-h-px min-w-px shrink-0 grow basis-0 items-center justify-between">
          <div className="flex shrink-0 items-center gap-2">
            <Avatar>
              <AvatarFallback>김</AvatarFallback>
            </Avatar>
            <p className="text-base font-medium">김이름</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              overlay.open(({ isOpen, close }) => (
                <LoginModal service="업로드" isOpen={isOpen} close={close} />
              ))
            }
          >
            <ArrowRightStartOnRectangleIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
