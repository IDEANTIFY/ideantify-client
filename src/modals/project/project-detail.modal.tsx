'use client'

import { User } from 'lucide-react'

import { OverlayProps } from '@/libs/utils'

const DATA = {
  projectName: '[디어케이] 레터링 케이크 통합 주문 플랫폼',
  teamName: '오케잌팀',
  content:
    '디어케이는 레터링 케이크로 추억을 만들고자 하는 고객(피커)과 추억을 함께 완성하는 가게(메이커)를 이어줍니다. 피커에겐 쉬운 가게·디자인 탐색부터 주문까지의 과정을, 메이커에겐 주문 혼선을 줄이고 가게를 홍보할 수 있는 환경이 되어줘요. 결과적으로 서로에게 핏-하게 연결되어, 피커는 추억에, 메이커는 케이크 제작에 집중할 수 있어요.',
  url: 'https://ideantify-s3.s3.ap-northeast-2.amazonaws.com/projects/files/%EB%94%94%EC%96%B4%EC%BC%80%EC%9D%B4.pdf',
}

// TODO: 여기 실제 데이터 확인해봐야함
export default function ProjectDetailModal({
  isOpen,
  close,
  // project,
}: OverlayProps) {
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
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200">
            <User className="text-neutral-600" size={24} />
          </div>
          <p className="text-[35px] font-medium text-white">{DATA.teamName}</p>
        </div>

        <p className="text-[24px] font-medium text-white">{DATA.projectName}</p>

        {/*<div className="flex gap-3">*/}
        {/*  {project.keywords?.map((keyword, index) => (*/}
        {/*    <div*/}
        {/*      key={index}*/}
        {/*      className="flex items-center justify-center rounded-lg bg-teal-500 px-[18px] py-3"*/}
        {/*    >*/}
        {/*      <p className="text-sm text-white">{keyword}</p>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}

        <p className="text-base font-medium text-white">{DATA.content}</p>

        <div className="relative">
          <div className="overflow-hidden rounded-[23px] border-[3.841px] border-black/10">
            <iframe
              src={DATA.url}
              className="h-[700px] w-full"
              title="Project Document"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
