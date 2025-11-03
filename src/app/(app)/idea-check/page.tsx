import IdeaList from '@/app/(app)/idea-check/components/idea-list'
import InputArea from '@/app/(app)/idea-check/components/input-area'
import IssueList from '@/app/(app)/idea-check/components/issue-list'
import { Separator } from '@/components/ui/separator'

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center gap-12">
      <InputArea />
      <Separator />
      <IdeaList />
      <Separator />
      <IssueList />
    </div>
  )
}
