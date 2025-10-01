"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const keywords = [
  "키워드1",
  "키워드22222",
  "키워드1",
  "키워드1",
  "키워드1",
  "키워드1",
  "키워드1",
  "키워드1",
  "키워드1",
  "키워드1",
  "예시",
  "키워드1",
  "키워드1",
  "키워드1",
  "키워드1",
  "키워드3333",
]

export default function InterestSelection() {
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([0, 5, 10, 11])
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()

  const toggleKeyword = (index: number) => {
    setSelectedKeywords((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
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

  return (
      <div className="flex h-screen bg-[#FAFAFA]">


        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-lg p-18 max-w-2xl w-full">
            {/* Heading */}
            <h1 className="text-2xl font-semibold text-gray-900 text-left mb-12">나의 관심사는 무엇인가요?</h1>

            {/* Keywords Grid */}
            <div className="grid grid-cols-4 gap-3 mb-12">
              {keywords.map((keyword, index) => {
                const isSelected = selectedKeywords.includes(index)
                return (
                    <button
                        key={index}
                        onClick={() => toggleKeyword(index)}
                        className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                            isSelected
                                ? "bg-white text-[#00BFA5] border-2 border-[#00BFA5]"
                                : "bg-white text-gray-500 border-2 border-gray-300 hover:border-gray-400"
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
                  className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#00BFA5] text-white hover:bg-[#00A890] transition-colors"
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
                <h2 className="text-lg font-bold mb-2">회원가입 완료!</h2>
                <p className="text-gray-600">축하합니다 🎊 회원가입이 완료되었어요!</p>
              </div>
            </div>
        )}
      </div>
      )
}
