"use client"

import Sidebar from "@/components/Sidebar"
import IdeaCard from "@/components/IdeaCard"
import { ChevronDown, Pencil, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={className}>{children}</div>
)
const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={className}>{children}</div>
)

type ConcretizedData = {
  mainFeature: string
  purpose: string
  differentiation: string
  coreTech: string
  targetAudience: string
}

const EditableField = ({
                         label,
                         value,
                         onChange,
                         rows = 3,
                       }: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
}) => (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
      <textarea
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-gray-300 p-4 pr-10 shadow-sm focus:border-[#00bba7] focus:outline-none focus:ring-1 focus:ring-[#00bba7] resize-none"
          rows={rows}
      />
        <Pencil className="absolute top-4 right-4 h-5 w-5 text-gray-400" />
      </div>
    </div>
)

const LoadingModal = ({ onCancel }: { onCancel: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-xs rounded-xl bg-white p-6 text-center shadow-2xl">
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
        <X size={24} />
      </button>

        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-8 border-gray-200 border-t-8 border-t-[#00bba7]"></div>

        <h3 className="mb-5 text-lg font-medium text-gray-800">
          AI가 아이디어를 구체화 중이에요
        </h3>

        <button
            onClick={onCancel}
            className="w-full rounded-lg bg-[#00bba7] py-3 font-medium text-white transition-colors hover:bg-[#0d9488]"
        >
          취소
        </button>
      </div>
    </div>
)

export default function MainPage() {
  const [searchValue, setSearchValue] = useState("")
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true)

  const [pageState, setPageState] = useState<"idle" | "loading" | "concretized">("idle")

  const [concretizedData, setConcretizedData] = useState<ConcretizedData>({
    mainFeature: "",
    purpose: "",
    differentiation: "",
    coreTech: "",
    targetAudience: "",
  })

  {/* AI 구체화 시작 핸들러 */}
  const handleStartConcretize = () => {
    if (!searchValue.trim()) return // 빈 값이면 실행 안함

    setPageState("loading")

    {/* API 호출 시뮬레이션 */}
    // fetch or axios API 호출 ㄱㄱ
    setTimeout(() => {
      // API가 성공적으로 응답했다고 가정하고 더미 데이터 설정
      setConcretizedData({
        mainFeature: `"${searchValue}" 아이디어를 기반으로 분석한 AI 추천 주요 내용입니다.`,
        purpose: "대학생 팀플 일정 조율 과정의 번거로움을 줄이고 협업 효율을 높이는 것을 목적으로 합니다.",
        differentiation: "기존 일정 공유 앱과 달리, AI가 자동으로 멤버들의 빈 시간을 찾아 최적의 회의 시간을 제안합니다.",
        coreTech: "시간표 데이터 파싱, AI 스케줄링 알고리즘, 캘린더 API 연동 (Google, Naver 등)",
        targetAudience: "대학생 팀플 조, 교내 동아리, 스터디 그룹",
      })


      setPageState("concretized")
    }, 2500)
  }

  {/* 구체화된 데이터 수정 핸들러 */}
  const handleDataChange = (field: keyof ConcretizedData, value: string) => {
    setConcretizedData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  {/* 로딩 취소 핸들러 */}
  const handleCancelLoading = () => {
    setPageState("idle")
    // 실제 API 호출 시: 여기서 AbortController 등으로 요청 취소
  }

  return (
      <div className="flex min-h-screen bg-[#fafafa]">
        <Sidebar />

        {/* 로딩 모달 (pageState가 'loading'일 때만 보임) */}
        {pageState === "loading" && <LoadingModal onCancel={handleCancelLoading} />}

        <main className="flex-1 overflow-y-auto">
          {/* pageState에 따라 다른 Hero Section 렌더링 */}

          {pageState === "idle" && (
              <section className="relative bg-gradient-to-b from-[#f9fafb] to-[#ffffff] py-16 px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center">
                  <span className="text-6xl" role="img" aria-label="lightbulb">
                    💡
                  </span>
                    </div>
                  </div>

                  <h1 className="text-4xl font-bold text-[#00bba7] mb-1">
                    아이디어 검증기
                  </h1>
                  <h2 className="text-2xl font-semibold text-[#262626] mb-4">
                    아이디어를 입력해보세요!
                  </h2>
                  <p className="text-sm text-[#737373] mb-2">
                    IT 서비스와 관련된 기능에 대해 더 잘 보여줍니다.
                  </p>

                  <div className="relative h-5 mb-8 opacity-30">
                    <div className="absolute inset-0 flex justify-center items-center gap-8">
                      <img src="/web-interface-mockup.jpg" alt="" className="h-40 object-contain" />
                      <img src="/web-interface-mockup.jpg" alt="" className="h-40 object-contain" />
                      <img src="/web-interface-mockup.jpg" alt="" className="h-40 object-contain" />
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto mb-4 relative">
                <textarea
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={
                      "내가 생각한 서비스, 혹시 이미 있을까요? 아이디어를 입력해 보세요.\nex) 팀별 일정 업데이트 앱"
                    }
                    className="w-full h-32 px-6 py-4 pr-32 rounded-3xl border-2 border-[#e5e7eb] focus:border-[#00bba7] focus:outline-none text-sm text-[#262626] placeholder:text-[#a3a3a3] transition-colors resize-none"
                />
                    <button
                        onClick={handleStartConcretize}
                        disabled={!searchValue.trim()}
                        className={`absolute right-4 bottom-5 ${
                            searchValue.trim()
                                ? "bg-[#00bba7] hover:bg-[#0d9488] text-white"
                                : "bg-[#d9d9d9] text-[#737373] cursor-not-allowed"
                        } px-6 py-2 rounded-full transition-colors text-sm`}
                    >
                      검색하기 →
                    </button>
                  </div>

                  <div className="mt-8 text-xs text-[#a3a3a3]">
                    <p>✨ 더 구체적으로 물어보세요 👇</p>
                    <p>
                      내가 생각한 서비스를 더욱 잘 찾을 수 있도록 구체적인 키워드를
                      추가해주는 것도 좋습니다.
                    </p>
                  </div>
                </div>
              </section>
          )}

          {/* 구체화 완료 상태 */}
          {pageState === "concretized" && (
              <section className="relative bg-white py-16 px-8">
                <div className="max-w-3xl mx-auto">
                  {/* 상단 헤더 */}
                  <div className="text-center mb-12">
                    <div className="mb-6 flex justify-center">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center">
                    <span className="text-6xl" role="img" aria-label="lightbulb">
                      💡
                    </span>
                      </div>
                    </div>
                    <h1 className="text-4xl font-bold text-[#00bba7] mb-1">
                      아이디어 검증기
                    </h1>
                    <h2 className="text-2xl font-semibold text-[#262626] mb-4">
                      아이디어를 입력해보세요!
                    </h2>
                    <p className="text-sm text-gray-500">
                      IT 서비스와 관련된 기능에 대해 더 잘 보여줍니다.
                    </p>
                  </div>

                  {/* 원본 입력 내용 */}
                  <div className="relative mb-4 rounded-lg border border-[#00bba7] bg-[#f0fdfa] p-4 text-sm font-medium text-[#0d9488]">
                    {searchValue}
                    <button
                        onClick={() => setPageState("idle")} // ◀ (X 버튼 누르면 초기 상태로)
                        className="absolute top-3 right-3 text-[#00bba7] opacity-70 hover:opacity-100"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="mb-8 text-center text-xs text-gray-500">
                    AI가 자동으로 구체화했어요. 필요하면 자유롭게 수정하세요.
                  </p>

                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                    <EditableField
                        label="주요 내용"
                        value={concretizedData.mainFeature}
                        onChange={(e) => handleDataChange("mainFeature", e.target.value)}
                    />
                    <EditableField
                        label="목적"
                        value={concretizedData.purpose}
                        onChange={(e) => handleDataChange("purpose", e.target.value)}
                    />
                    <EditableField
                        label="차별성"
                        value={concretizedData.differentiation}
                        onChange={(e) => handleDataChange("differentiation", e.target.value)}
                    />
                    <EditableField
                        label="핵심 기술"
                        value={concretizedData.coreTech}
                        onChange={(e) => handleDataChange("coreTech", e.target.value)}
                    />
                    <EditableField
                        label="사용 대상"
                        value={concretizedData.targetAudience}
                        onChange={(e) => handleDataChange("targetAudience", e.target.value)}
                    />
                  </div>

                  {/* 최종 '검사하기' 버튼 */}
                  <div className="mt-10 text-center">
                    <Link
                        href="/result"
                        className="inline-block rounded-full bg-[#00bba7] px-12 py-3 text-lg font-semibold text-white transition-colors hover:bg-[#0d9488]"
                    >
                      검사하기 →
                    </Link>
                  </div>
                </div>
              </section>
          )}

          {/* pageState가 'idle'일 때만 나머지 섹션(히스토리, 모아보기 등) */}
          {pageState === "idle" && (
              <>
                {/* 아이디어 검증 기록 보기 */}
                <section className="py-12 px-8 bg-white">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <button
                          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                          className="flex flex-col items-center gap-2 mx-auto hover:opacity-80 transition-opacity"
                      >
                        <h3 className="text-lg font-semibold text-[#404040]">
                          아이디어 검증 기록 보기
                        </h3>
                        <ChevronDown
                            className={`w-5 h-5 text-[#00bba7] transition-transform ${
                                isHistoryExpanded ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                    </div>
                    {isHistoryExpanded && (
                        <div className="space-y-3">
                          {Array.from({ length: 9 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="bg-[#f9fafb] px-6 py-3 rounded-lg text-sm text-[#737373]"
                              >
                                하늘을 나는 자동차
                              </div>
                          ))}
                        </div>
                    )}
                  </div>
                </section>

                {/* 아이디어 모아보기 */}
                <section className="py-12 px-8 bg-[#fafafa]">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#00bba7] mb-2">
                        아이디어 모아보기
                      </h3>
                      <p className="text-base font-semibold text-[#262626]">
                        "IDEANTIFY" 유저들의 아이디어를 구경해보세요!
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <IdeaCard
                          imageUrl="/web-interface-mockup.jpg"
                          title="기업 매체지식 (Gemini)"
                          description="혁신 생태계 조성을 통한 글로벌 스타트업 육성 및 스케일 업 지원 프로그램 운영 기관"
                          tags={["Google", "AI", "Startup"]}
                      />
                      <IdeaCard
                          imageUrl="/web-interface-mockup.jpg"
                          title="팀별 일정 업데이트 앱"
                          description="팀원들의 일정을 실시간으로 공유하고 업데이트할 수 있는 모바일 앱 아이디어입니다."
                          tags={["Productivity", "Mobile", "SaaS"]}
                      />
                      <IdeaCard
                          imageUrl="/web-interface-mockup.jpg"
                          title="AI 기반 작문 도우미"
                          description="블로그 포스트, 마케팅 카피 등을 자동으로 생성해주는 AI 작문 보조 도구입니다."
                          tags={["AI", "Writer", "Martech"]}
                      />
                    </div>
                    <div className="text-center mt-8">
                      <Link href={"/catalog"} className="text-sm text-[#737373] hover:text-[#00bba7]">
                        더 많은 아이디어 보러가기 →
                      </Link>
                    </div>
                  </div>
                </section>

                {/* 요즘 뜨는 이슈 */}
                <section className="py-12 px-8 bg-white">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#00bba7] mb-2">
                        요즘 뜨는 이슈
                      </h3>
                      <p className="text-base font-semibold text-[#262626]">
                        지금 트렌드인 사례/뉴스/수상작들을 모아봤어요
                      </p>
                    </div>

                    <h4 className="text-lg font-semibold text-[#262626] mb-4">
                      최신 공모전 수상작
                    </h4>


                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {Array.from({ length: 2 }).map((_, i) => (
                          <Card key={i} className="bg-[#f9fafb] border-[#e5e7eb]">
                            <CardContent className="p-6">
                              <div className="flex gap-4">
                                <div className="w-24 h-24 bg-[#d9d9d9] rounded-lg flex-shrink-0"></div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-sm text-[#262626] mb-2">
                                    관련 아이디어 {i + 1}
                                  </h5>
                                  <p className="text-xs text-[#737373] mb-2">
                                    해당 기관에 관련
                                  </p>
                                  <p className="text-xs text-[#737373] mb-3">
                                    아이디어에 대한 상세 설명
                                  </p>
                                  <div className="flex gap-2">
                              <span className="text-xs px-2 py-1 bg-white rounded text-[#737373]">
                                AI
                              </span>
                                    <span className="text-xs px-2 py-1 bg-white rounded text-[#737373]">
                                혁신분야
                              </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                      ))}
                    </div>

                    <div className="text-center mb-8">
                      <button className="text-sm text-[#737373] hover:text-[#00bba7]">
                        더 많은 공모전 보러가기 →
                      </button>
                    </div>

                    <h4 className="text-lg font-semibold text-[#262626] mb-4">
                      최신 트렌드 뉴스
                    </h4>


                    <div className="grid grid-cols-2 gap-6">
                      {Array.from({ length: 2 }).map((_, i) => (
                          <Card key={i} className="bg-[#f9fafb] border-[#e5e7eb]">
                            <CardContent className="p-6">
                              <div className="flex gap-4">
                                <div className="w-24 h-24 bg-[#d9d9d9] rounded-lg flex-shrink-0"></div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-sm text-[#262626] mb-2">
                                    뉴스 타이틀
                                  </h5>
                                  <p className="text-xs text-[#737373] mb-2">
                                    해당 기관에 관련
                                  </p>
                                  <p className="text-xs text-[#737373] mb-3">
                                    뉴스에 대한 상세 설명
                                  </p>
                                  <div className="flex gap-2">
                              <span className="text-xs px-2 py-1 bg-white rounded text-[#737373]">
                                AI
                              </span>
                                    <span className="text-xs px-2 py-1 bg-white rounded text-[#737373]">
                                혁신분야
                              </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                      ))}
                    </div>

                    <div className="text-center mt-8">
                      <button className="text-sm text-[#737373] hover:text-[#00bba7]">
                        더 많은 트렌드 보러가기 →
                      </button>
                    </div>
                  </div>
                </section>
              </>
          )}
        </main>
      </div>
  )
}