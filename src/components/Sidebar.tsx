// src/components/Sidebar.tsx
"use client"; // ◀ 1. usePathname 훅을 사용하기 위해 파일 최상단에 추가!

import { usePathname } from 'next/navigation'; // ◀ 2. usePathname 훅 가져오기
import Link from 'next/link'; // ◀ 3. a 태그 대신 Link 컴포넌트 사용
import {
  Bot,
  Lightbulb,
  Folder,
  MessageSquare,
  User,
  LogOut,
} from 'lucide-react';

// 섹션 제목 컴포넌트 (변경 없음)
const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">{children}</h3>;
};

// 메뉴 아이템 컴포넌트 (a를 Link로 변경)
const NavItem = ({ href, icon, text, active = false }: { href: string, icon: React.ReactNode, text: string, active?: boolean }) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
        active
          ? 'bg-teal-500 text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname(); // ◀ 4. 현재 URL 경로를 가져옵니다 (예: '/catalog', '/mypage')

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white sticky top-0">
      <div className="border-b p-6">
        <Link href="/catalog"> {/* 로고 클릭 시 목록 페이지로 이동 */}
          <h1 className="text-2xl font-bold text-teal-500">IDEANTIFY</h1>
        </Link>
      </div>

      <div className="flex-grow p-4">
        <nav className="flex flex-col gap-4">
          <div>
            <SectionTitle>AI</SectionTitle>
            <div className="flex flex-col gap-1">
              {/* ▼ 5. 각 NavItem에 href와 동적인 active 속성 부여 */}
              <NavItem href="/main" icon={<Lightbulb size={18} />} text="아이디어 검사기" active={pathname === '/main'} />
              <NavItem href="/chatbot" icon={<Bot size={18} />} text="챗봇" active={pathname === '/chatbot'} />
            </div>
          </div>
          <div>
            <SectionTitle>아이디어</SectionTitle>
            <div className="flex flex-col gap-1">
              <NavItem href="/catalog" icon={<Folder size={18} />} text="아이디어 목록" active={pathname === '/catalog'} />
              <NavItem href="/issues" icon={<MessageSquare size={18} />} text="요즘 뜨는 이슈" active={pathname === '/issues'} />
            </div>
          </div>
          <div>
            <SectionTitle>내 정보 관리</SectionTitle>
            <div className="flex flex-col gap-1">
              <NavItem href="/mypage" icon={<User size={18} />} text="마이페이지" active={pathname === '/mypage'} />
            </div>
          </div>
        </nav>
      </div>

      <div className="border-t p-4">
        {/* ... 하단 프로필 영역 (변경 없음) ... */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">김</div>
            <span className="text-sm font-semibold">김이름</span>
          </div>
          <button className="text-gray-500 hover:text-gray-800"><LogOut size={18} /></button>
        </div>
      </div>
    </aside>
  );
}