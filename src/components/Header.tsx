// src/components/Header.tsx

import { Search, List, LayoutGrid } from 'lucide-react';

export default function Header() {
  return (
    // <header> 태그를 사용하고, flexbox로 자식 요소들을 정렬합니다.
    <header className="flex w-full items-center justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm">
      
      {/* 검색창 (flex-grow를 사용해 가능한 많은 공간을 차지하도록 설정) */}
      <div className="relative flex-grow">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="프로젝트 검색..."
          className="block w-full rounded-md border-gray-300 py-2 pl-10 pr-3 focus:border-teal-500 focus:ring-teal-500"
        />
      </div>

      {/* 필터 그룹 (flex-shrink-0으로 화면이 줄어도 크기가 줄어들지 않게 함) */}
      <div className="flex flex-shrink-0 items-center gap-4">
        <select className="rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500">
          <option>카테고리</option>
          {/* 다른 카테고리 옵션들 */}
        </select>
        <select className="rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500">
          <option>정렬</option>
          {/* 다른 정렬 옵션들 */}
        </select>
        
        {/* 보기 전환 아이콘 */}
        <div className="flex items-center gap-2">
           <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100">
            <List className="h-5 w-5" />
          </button>
          <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100">
            <LayoutGrid className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}