// src/app/issues/page.tsx

import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import IssuesHeader from './components/IssuesHeader';
import ContentCard from './components/ContentCard';
import ArticleCard from './components/ArticleCard';
// import IssuesFooter from './components/IssuesFooter'; 

// --- 데이터 세트 1: "최신 공모전"용 ---
const contestData = [
  { id: 1, imageUrl: '수상작 이미지 1', tag: '트렌디', title: '아이디어 1', subtitle: '2025년 수상작' },
  { id: 2, imageUrl: '수상작 이미지 2', tag: '혁신', title: '아이디어 2', subtitle: '2025년 수상작' },
  { id: 3, imageUrl: '수상작 이미지 3', tag: '친환경', title: '아이디어 3', subtitle: '2025년 수상작' },
];
const contestRelatedIdeasData = [
  { id: 101, imageUrl: '공모전 관련 이미지 1', title: '공모전 관련 아이디어 1', subtitle: '해당 키워드 관련', description: '공모전 아이디어에 대한 상세 설명입니다.', tags: ['공모전', '기획'] },
  { id: 102, imageUrl: '공모전 관련 이미지 2', title: '공모전 관련 아이디어 2', subtitle: '해당 키워드 관련', description: '수상작과 관련된 다른 아이디어입니다.', tags: ['UX', '디자인'] },
];

// --- 데이터 세트 2: "최신 트렌드 뉴스"용 ---
const trendData = [
  { id: 4, imageUrl: '뉴스 이미지 1', tag: 'AI', title: 'AI가 바꾸는 일상', subtitle: 'Tech News' },
  { id: 5, imageUrl: '뉴스 이미지 2', tag: 'UX/UI', title: '최신 UX 트렌드', subtitle: 'Design Weekly' },
  { id: 6, imageUrl: '뉴스 이미지 3', tag: '메타버스', title: '가상현실의 미래', subtitle: 'Future Tech' },
];
const trendRelatedIdeasData = [
  { id: 7, imageUrl: '트렌드 관련 이미지 1', title: '트렌드 관련 아이디어 1', subtitle: '해당 키워드 관련', description: '아이디어에 대한 상세 설명이 여기에 들어갑니다.', tags: ['AI', '트렌드'] },
  { id: 8, imageUrl: '트렌드 관련 이미지 2', title: '트렌드 관련 아이디어 2', subtitle: '해당 키워드 관련', description: '지속가능성과 회사의 비전에 대한 아이디어입니다.', tags: ['지속가능성', '비전'] },
];

export default function IssuesPage() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
          <IssuesHeader />

          {/* 1. 최신 공모전/수상작 섹션 */}
          <div>
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              최신 공모전 수상작
            </h2>
            {/* ◀ (수정) 3-card grid의 가로 간격을 md:gap-x-12 (48px), lg:gap-x-20 (80px)으로 세분화 */}
            {/* ◀ 세로 간격은 md:gap-y-8 (32px), lg:gap-y-8 (32px)로 수정 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-8">
              {contestData.map(item => (
                <Link href={`/projectview/${item.id}`} key={item.id}>
                  <ContentCard {...item} />
                </Link>
              ))}
            </div>
            {/* ◀ (수정) 2-card grid의 가로 간격을 md:gap-x-12 (48px)으로 세분화 */}
            {/* ◀ 세로 간격은 md:gap-y-8 (32px)로 수정 */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8">
              {contestRelatedIdeasData.map(idea => (
                <Link href={`/projectview/${idea.id}`} key={idea.id}>
                  <ArticleCard {...idea} />
                </Link>
              ))}
            </div>
            <div className="mt-16 flex justify-center">
              <button className="rounded-lg bg-teal-500 px-8 py-3 font-semibold text-white hover:bg-teal-600">
                더보기
              </button>
            </div>
          </div>

          {/* 2. 최신 트렌드 뉴스 섹션 */}
          <div>
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              최신 트렌드 뉴스
            </h2>
            {/* ◀ (수정) 3-card grid의 가로 간격을 md:gap-x-12 (48px), lg:gap-x-20 (80px)으로 세분화 */}
            {/* ◀ 세로 간격은 md:gap-y-8 (32px), lg:gap-y-8 (32px)로 수정 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-8">
              {trendData.map(item => (
                <Link href={`/projectview/${item.id}`} key={item.id}>
                  <ContentCard {...item} />
                </Link>
              ))}
            </div>
            {/* ◀ (수정) 2-card grid의 가로 간격을 md:gap-x-12 (48px)으로 세분화 */}
            {/* ◀ 세로 간격은 md:gap-y-8 (32px)로 수정 */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-12 md:gap-y-8">
              {trendRelatedIdeasData.map(idea => (
                <Link href={`/projectview/${idea.id}`} key={idea.id}>
                  <ArticleCard {...idea} />
                </Link>
              ))}
            </div>
            <div className="mt-16 flex justify-center">
              <button className="rounded-lg bg-teal-500 px-8 py-3 font-semibold text-white hover:bg-teal-600">
                더보기
              </button>
            </div>
          </div>

          {/* 푸터 (임시) */}
          <div className="p-4 border-t h-20 flex items-center justify-center text-gray-400">
            임시: IssuesFooter (푸터) 영역
          </div>
        </div>
      </main>
    </div>
  );
}