'use client'

import IdeaList from '@/app/(app)/idea-check/components/idea-list'
import InputArea from '@/app/(app)/idea-check/components/input-area'
import IssueList from '@/app/(app)/idea-check/components/issue-list'
import { Separator } from '@/components/ui/separator'
import { useUserStore } from '@/stores'

export default function Page() {
  const { user } = useUserStore()

  return (
    <div className="flex min-h-dvh w-full flex-col items-center gap-12 px-4 py-12">
      <InputArea />
      <Separator />
      <IdeaList />
      {user && (
        <>
          <Separator />
          <IssueList />
        </>
      )}
    </div>
  )
}
