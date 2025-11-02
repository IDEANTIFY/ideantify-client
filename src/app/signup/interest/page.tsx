"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const keywords = [
  "스타트업/창업",
  "교육/학습",
  "헬스케어/웰빙",
  "환경/기후변화",
  "사회문제 해결",
  "문화/예술",
  "라이프스타일/취미",
  "여행/관광",
  "스포츠/피트니스",
  "모빌리티/교통",
  "금융/핀테크",
  "부동산/주거",
  "AI/빅데이터/IT",
  "패션/뷰티",
  "국제/글로벌 이슈",
  "농업/식품",
]

export default function InterestSelection() {
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()

  const toggleKeyword = (index: number) => {
    setSelectedKeywords((prev) => {
      const isSelected = prev.includes(index)

      if (isSelected) {
        return prev.filter((i) => i !== index)
      } else {
        if (prev.length < 4) {
          return [...prev, index]
        }
      }
      return prev
    })
  }

  const handleComplete = () => {
    setShowPopup(true)
  }

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        router.push("/main")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showPopup, router])

  const selectedCount = selectedKeywords.length
  const isLimitReached = selectedCount >= 4
  const isButtonDisabled = selectedCount === 0

  return (
      <div className="flex h-screen bg-[#FAFAFA]">
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-lg p-18 max-w-2xl w-full">
            {/* Heading */}
            <h1 className="text-2xl font-semibold text-gray-900 text-left mb-12">
              나의 관심사는 무엇인가요?
            </h1>

            {/* Keywords Grid */}
            <div className="grid grid-cols-4 gap-3 mb-12">
              {keywords.map((keyword, index) => {
                const isSelected = selectedKeywords.includes(index)
                const isDisabled = !isSelected && isLimitReached

                return (
                    <button
                        key={index}
                        onClick={() => toggleKeyword(index)}
                        disabled={isDisabled}
                        className={`px-2 py-2.5 rounded-full text-sm font-medium transition-all ${
                            isSelected
                                ? "bg-white text-[#00BFA5] border-2 border-[#00BFA5]"
                                : "bg-white text-gray-500 border-2 border-gray-300 hover:border-gray-400"
                        } ${
                            isDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      {keyword}
                    </button>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                  onClick={handleComplete}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
              >
                건너뛰기
              </button>
              <button
                  onClick={handleComplete}
                  disabled={isButtonDisabled}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium bg-[#00BFA5] text-white transition-colors ${
                      isButtonDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-[#00A890]"
                  }`}
              >
                다음으로
              </button>
            </div>
          </div>
        </main>

        {/* Popup Overlay */}
        {showPopup && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center animate-fadeIn">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-lg font-bold mb-2 text-gray-800">회원가입 완료!</h2>
                <p className="text-gray-600">
                  축하합니다 🎊 회원가입이 완료되었어요!
                </p>
              </div>
            </div>
        )}
      </div>
  )
}