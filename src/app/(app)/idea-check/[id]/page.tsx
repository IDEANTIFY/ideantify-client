'use client'

import { use } from 'react'

import IdeaReport from '@/app/(app)/idea-check/components/idea-report'
import InputArea from '@/app/(app)/idea-check/components/input-area'
import { Separator } from '@/components/ui/separator'

interface Props {
  params: Promise<{ id: string }>
}

export default function Page({ params }: Props) {
  const { id: reportId } = use(params)

  return (
    <div className="flex w-full flex-col items-center gap-12 pb-12">
      <InputArea
        defaultQuery="테스트"
        defaultMetadata={{
          key_points: '팀플 일정 맞춰주는 앱',
          purpose:
            '팀원들의 일정 조율을 간편하게 하여 효율적인 팀 프로젝트 진행을 돕기 위해',
          distinctiveness:
            '자동 일정 분석 및 최적 회의 시간 추천 기능을 통해 기존 캘린더 앱과 차별화',
          core_technology: '캘린더 API 연동, 머신러닝 기반 일정 분석 알고리즘',
          target_audience: '대학생 및 직장인 등 팀 프로젝트를 자주 하는 사용자',
        }}
      />

      <Separator />

      <IdeaReport reportId={reportId} />
    </div>
  )
}
