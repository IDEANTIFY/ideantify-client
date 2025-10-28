"use client"

import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import { User, ChevronLeft, ChevronRight, Check } from "lucide-react"

type Attachment = {
  type: "image" | "file" | "embed"
  embedContent: string
}

type ProjectUser = {
  id: string
  name: string
  avatarUrl?: string
  isTrendy: boolean
}

type ProjectData = {
  id: string
  title: string
  description: string
  tags: string[]
  user: ProjectUser
  attachments: Attachment[]
}


const dummyProject: ProjectData = {
  id: "project-123",
  title: "주제 내용입니다. 어쩌구 저쩌구~",
  description:
      "설명 내용입니다. 어쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구.\n\n" +
      "줄바꿈도 잘 됩니다. 어쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구.\n\n" +
      "어쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구.",
  tags: ["웹 서비스", "AI", "아이디어 검사"],
  user: {
    id: "user-google",
    name: "Google",
    avatarUrl: undefined,
    isTrendy: true,
  },
  attachments: [
    { type: "embed", embedContent: "첨부한 파일 임베드 1 (예: Figma)" },
    { type: "image", embedContent: "첨부한 파일 임베드 2 (예: 이미지)" },
    { type: "file", embedContent: "첨부한 파일 임베드 3 (예: PDF)" },
  ],
}


export default function ProjectDetailPage() {

  const [isFollowing, setIsFollowing] = useState(false)

  const [currentAttachmentIndex, setCurrentAttachmentIndex] = useState(0)

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
    // TODO: 여기에 실제 팔로우/언팔로우 API 호출 로직 추가
    console.log(isFollowing ? "Unfollow" : "Follow", "user:", dummyProject.user.name)
  }

  const showNextAttachment = () => {
    setCurrentAttachmentIndex(
        (prevIndex) => (prevIndex + 1) % dummyProject.attachments.length
    )
  }

  const showPrevAttachment = () => {
    setCurrentAttachmentIndex(
        (prevIndex) =>
            (prevIndex - 1 + dummyProject.attachments.length) %
            dummyProject.attachments.length
    )
  }

  const currentAttachment = dummyProject.attachments[currentAttachmentIndex]

  return (
      <div className="flex min-h-screen bg-white">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-[#F0F2F5] p-10 lg:p-12">
          <div className="mx-auto max-w-4xl">
            {/* --- 1. 사용자 정보 및 팔로우 버튼 --- */}
            <header className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* 아바타 */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 shadow-sm">
                  {dummyProject.user.avatarUrl ? (
                      <img
                          src={dummyProject.user.avatarUrl}
                          alt={dummyProject.user.name}
                          className="h-full w-full rounded-full object-cover"
                      />
                  ) : (
                      <User size={24} className="text-gray-600" />
                  )}
                </div>
                {/* 사용자 이름 및 트렌디 배지 */}
                <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800">
                  {dummyProject.user.name}
                </span>
                  {/* '트렌디' 배지 조건부 렌더링 */}
                  {dummyProject.user.isTrendy && (
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                    트렌디
                  </span>
                  )}
                </div>
              </div>

              {/*  팔로우 / 팔로잉 버튼 (상태에 따라 스타일 변경) */}
              <button
                  onClick={handleFollowToggle}
                  className={`flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                      isFollowing
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-teal-500 text-white hover:bg-teal-600"
                  }`}
              >
                {isFollowing ? (
                    <>
                      <Check size={16} />
                      <span>팔로잉</span>
                    </>
                ) : (
                    "팔로우"
                )}
              </button>
            </header>

            {/* --- 2. 프로젝트 상세 내용 --- */}
            <section>
              {/* 제목 */}
              <h1 className="mb-4 text-3xl font-bold text-gray-900">
                {dummyProject.title}
              </h1>

              {/* 키워드 (태그) - 스크린샷과 유사한 스타일 적용 */}
              <div className="mb-6 flex flex-wrap gap-2">
                {dummyProject.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-teal-500 px-4 py-1.5 text-sm font-medium text-white"
                    >
                  {tag}
                </span>
                ))}
              </div>

              {/* 설명 (whitespace-pre-line으로 \n 줄바꿈 문자 인식) */}
              <p className="mb-8 text-base leading-relaxed text-gray-700 whitespace-pre-line">
                {dummyProject.description}
              </p>

              {/* --- 3. 첨부 파일 --- */}
              <div className="relative">
                {/* 파일 임베드 영역 */}
                <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-300 text-xl font-semibold text-gray-600">
                  {currentAttachment.embedContent}
                </div>

                {/* 캐러셀 버튼 (좌) */}
                <button
                    onClick={showPrevAttachment}
                    className="absolute left-[-20px] top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-600 shadow-lg transition-all hover:bg-white"
                    aria-label="Previous attachment"
                >
                  <ChevronLeft size={28} />
                </button>
                {/* 캐러셀 버튼 (우) */}
                <button
                    onClick={showNextAttachment}
                    className="absolute right-[-20px] top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-gray-600 shadow-lg transition-all hover:bg-white"
                    aria-label="Next attachment"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
  )
}