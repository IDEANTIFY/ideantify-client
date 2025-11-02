"use client"

import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  // 백엔드 API의 기본 URL 정의 -> 실제 배포 시에는 process.env.NEXT_PUBLIC_API_URL 등 ㄱㄱ
  const API_BASE_URL = "http://localhost:8080"

  const handleKakaoLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/oauth/kakao?redirect_to=/main`
  }

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/oauth/google?redirect_to=/main`
  }

  return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] p-8">
        <div className="w-full max-w-md bg-[#ffffff] rounded-2xl shadow-lg p-12">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <p className="text-[#949ba7] text-sm font-medium mb-2 tracking-wide">
              WELCOME TO
            </p>
            <h2 className="text-[#00bba7] text-4xl font-bold tracking-wide">
              IDEANTIFY
            </h2>
          </div>

          {/* Login Buttons */}
          <div className="space-y-3 mb-12">
            {/* Kakao Login */}
            <button
                onClick={handleKakaoLogin}
                className="w-full bg-[#fde047] hover:bg-[#fde047]/90 text-[#404040] font-medium py-6 rounded-lg flex items-center justify-center gap-3"
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="currentColor"
              >
                <path d="M12 3C6.48 3 2 6.97 2 11.5c0 2.42 1.3 4.59 3.37 6.06-.12.45-.74 2.74-.77 2.91 0 0-.02.1.05.14.07.04.13.01.13.01.17-.02 2.83-1.9 3.27-2.19 1.14.32 2.36.5 3.63.5 5.52 0 10-3.97 10-8.5S17.52 3 12 3z" />
              </svg>
              <span>카카오로 로그인하기</span>
            </button>

            {/* Google Login */}
            <button
                onClick={handleGoogleLogin}
                className="w-full bg-[#ffffff] hover:bg-[#fafafa] text-[#404040] font-medium py-6 rounded-lg border border-gray-300 flex items-center justify-center gap-3 shadow-sm"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <span>구글로 로그인하기</span>
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-between text-xs text-[#949ba7]">
            <div className="flex items-center gap-2">
              <button className="hover:text-[#737373]">아이디 찾기</button>
              <span>|</span>
              <button className="hover:text-[#737373]">비밀번호 찾기</button>
            </div>
            <button
                onClick={() => router.push("/signup")}
                className="hover:text-[#737373]"
            >
              회원가입
            </button>
          </div>
        </div>
      </main>
  )
}