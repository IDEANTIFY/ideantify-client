// src/components/Sidebar.tsx

import {
    Bot,
    Lightbulb,
    Folder,
    MessageSquare,
    User,
    LogOut,
  } from 'lucide-react';
  
  // 섹션 제목을 위한 작은 컴포넌트
  const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    return (
      <h3 className="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-gray-500">
        {children}
      </h3>
    );
  };
  
  // 메뉴 아이템을 위한 재사용 컴포넌트
  const NavItem = ({ icon, text, active = false }: { icon: React.ReactNode, text: string, active?: boolean }) => {
    return (
      <a
        href="#"
        className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
          active
            ? 'bg-teal-500 text-white' // 활성화된 아이템 스타일
            : 'text-gray-700 hover:bg-gray-100' // 기본 아이템 스타일
        }`}
      >
        {icon}
        <span>{text}</span>
      </a>
    );
  };
  
  export default function Sidebar() {
    return (
      // 전체 사이드바 컨테이너
      <aside className="flex h-screen w-64 flex-col border-r bg-white">
        
        {/* 로고 영역 */}
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold text-teal-500">IDEANTIFY</h1>
        </div>
  
        {/* 메뉴 리스트 (flex-grow로 남은 공간을 모두 차지) */}
        <div className="flex-grow p-4">
          <nav className="flex flex-col gap-4">
            <div>
              <SectionTitle>AI</SectionTitle>
              <div className="flex flex-col gap-1">
                <NavItem icon={<Lightbulb size={18} />} text="아이디어 검사기" />
                <NavItem icon={<Bot size={18} />} text="챗봇" />
              </div>
            </div>
            <div>
              <SectionTitle>아이디어</SectionTitle>
              <div className="flex flex-col gap-1">
                <NavItem icon={<Folder size={18} />} text="아이디어 목록" active={true} />
                <NavItem icon={<MessageSquare size={18} />} text="요즘 뜨는 이슈" />
              </div>
            </div>
            <div>
              <SectionTitle>내 정보 관리</SectionTitle>
              <div className="flex flex-col gap-1">
                <NavItem icon={<User size={18} />} text="마이페이지" />
              </div>
            </div>
          </nav>
        </div>
  
        {/* 하단 프로필 영역 */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
                김
              </div>
              <span className="text-sm font-semibold">김이름</span>
            </div>
            <button className="text-gray-500 hover:text-gray-800">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    );
  }