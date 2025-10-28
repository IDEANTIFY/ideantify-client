"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Home, FileText, ChevronDown } from "lucide-react"
import { useState } from "react"

export default function IdeantifyPage() {
  const [searchValue, setSearchValue] = useState("")
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true)

  return (
      <div className="flex min-h-screen bg-[#fafafa]">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-b from-[#f9fafb] to-[#ffffff] py-16 px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-b from-[#fecdd3] to-[#ffffff] rounded-full flex items-center justify-center">
                  <span className="text-4xl" role="img" aria-label="lightbulb">💡</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-[#00bba7] mb-2">아이디어 검증기</h1>
              <h2 className="text-2xl font-semibold text-[#262626] mb-8">아이디어를 입력해보세요!</h2>

              <p className="text-sm text-[#737373] mb-2">IT 서비스와 관련된 기능에 대해 더 잘 보여줍니다.</p>

              {/* Background mockup images */}
              <div className="relative h-48 mb-8 opacity-30">
                <div className="absolute inset-0 flex justify-center items-center gap-8">
                  <img src="/web-interface-mockup.jpg" alt="" className="h-40 object-contain" />
                  <img src="/web-interface-mockup.jpg" alt="" className="h-40 object-contain" />
                  <img src="/web-interface-mockup.jpg" alt="" className="h-40 object-contain" />
                </div>
              </div>

              <p className="text-sm text-[#737373] mb-6">
                내가 생각한 서비스, 혹시 이미 있을까요? 아이디어를 입력해 보세요.
                <br />
                ex) 팀별 일정 업데이트 앱
              </p>

              <div className="max-w-2xl mx-auto mb-4 relative">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="아이디어를 입력하세요..."
                    className="w-full px-6 py-4 pr-32 rounded-full border-2 border-[#e5e7eb] focus:border-[#00bba7] focus:outline-none text-sm text-[#262626] placeholder:text-[#a3a3a3] transition-colors"
                />
                <button
                    className={`absolute right-2 bottom-2 ${
                        searchValue.trim()
                            ? "bg-[#00bba7] hover:bg-[#0d9488] text-white"
                            : "bg-[#d9d9d9] hover:bg-[#cdcdcd] text-[#737373]"
                    } px-6 py-2 rounded-full transition-colors text-sm`}
                >
                  검색하기 →
                </button>
              </div>

              <div className="mt-8 text-xs text-[#a3a3a3]">
                <p>✨ 더 구체적으로 물어보세요 👇</p>
                <p>내가 생각한 서비스를 더욱 잘 찾을 수 있도록 구체적인 키워드를 추가해주는 것도 좋습니다.</p>
              </div>
            </div>
          </section>

          {/* Idea History Section */}
          <section className="py-12 px-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <button
                    onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                    className="flex flex-col items-center gap-2 mx-auto hover:opacity-80 transition-opacity"
                >
                  <h3 className="text-lg font-semibold text-[#404040]">아이디어 검증 기록 보기</h3>
                  <ChevronDown
                      className={`w-5 h-5 text-[#00bba7] transition-transform ${isHistoryExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {isHistoryExpanded && (
                  <div className="space-y-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-[#f9fafb] px-6 py-3 rounded-lg text-sm text-[#737373]">
                          학습할 내는 지능차
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </section>

          {/* Ideas Collection Section */}
          <section className="py-12 px-8 bg-[#fafafa]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#00bba7] mb-2">아이디어 모아보기</h3>
                <p className="text-base font-semibold text-[#262626]">"IDEANTIFY" 유저들의 아이디어를 구경해보세요!</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Gemini Card */}
                <Card className="bg-white border-[#e5e7eb]">
                  <CardContent className="p-0">
                    <div className="bg-[#000000] h-40 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white text-2xl font-semibold mb-2">Gemini</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm text-[#262626] mb-2">기업 매체지식</h4>
                      <p className="text-xs text-[#737373] mb-3">
                        혁신 생태계 조성을 통한 글로벌 스타트업
                        <br />
                        육성 및 스케일 업 지원 프로그램 운영 기관
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#a3a3a3]">Google</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Placeholder Cards */}
                {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="bg-white border-[#e5e7eb]">
                      <CardContent className="p-0">
                        <div className="bg-[#d9d9d9] h-40"></div>
                        <div className="p-4 h-32"></div>
                      </CardContent>
                    </Card>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="bg-white border-[#e5e7eb]">
                      <CardContent className="p-0">
                        <div className="bg-[#d9d9d9] h-40"></div>
                        <div className="p-4 h-32"></div>
                      </CardContent>
                    </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="text-sm text-[#737373] hover:text-[#00bba7]">더 많은 아이디어 보러가기 →</button>
              </div>
            </div>
          </section>

          {/* Trending Issues Section */}
          <section className="py-12 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#00bba7] mb-2">요즘 뜨는 이슈</h3>
                <p className="text-base font-semibold text-[#262626]">지금 트렌드인 사례/뉴스/수상작들을 모아봤어요</p>
              </div>

              <h4 className="text-lg font-semibold text-[#262626] mb-4">최신 공모전 수상작</h4>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="bg-[#f9fafb] border-[#e5e7eb]">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 bg-[#d9d9d9] rounded-lg flex-shrink-0"></div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm text-[#262626] mb-2">관련 아이디어 {i + 1}</h5>
                            <p className="text-xs text-[#737373] mb-2">해당 기관에 관련</p>
                            <p className="text-xs text-[#737373] mb-3">아이디어에 대한 상세 설명</p>
                            <div className="flex gap-2">
                              <span className="text-xs px-2 py-1 bg-white rounded text-[#737373]">AI</span>
                              <span className="text-xs px-2 py-1 bg-white rounded text-[#737373]">혁신분야</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>

              <div className="text-center mb-8">
                <button className="text-sm text-[#737373] hover:text-[#00bba7]">더 많은 공모전 보러가기 →</button>
              </div>

              <h4 className="text-lg font-semibold text-[#262626] mb-4">최신 트렌드 뉴스</h4>

              <div className="grid grid-cols-2 gap-6">
                {Array.from({ length: 2 }).map((_, i) => (
                    <Card key={i} className="bg-[#f9fafb] border-[#e5e7eb]">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 bg-[#d9d9d9] rounded-lg flex-shrink-0"></div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm text-[#262626] mb-2">뉴스 타이틀</h5>
                            <p className="text-xs text-[#737373] mb-2">해당 기관에 관련</p>
                            <p className="text-xs text-[#737373] mb-3">뉴스에 대한 상세 설명</p>
                            <div className="flex gap-2">
                              <span className="text-xs px-2 py-1 bg-white rounded text-[#737373]">AI</span>
                              <span className="text-xs px-2 py-1 bg-white rounded text-[#737373]">혁신분야</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="text-sm text-[#737373] hover:text-[#00bba7]">더 많은 트렌드 보러가기 →</button>
              </div>
            </div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e7eb] py-3 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-[#737373]" />
            <span className="text-sm text-[#737373]">홈</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#737373]" />
            <span className="text-sm text-[#737373]">탐색하기</span>
          </div>
        </nav>
      </div>
  )
}
