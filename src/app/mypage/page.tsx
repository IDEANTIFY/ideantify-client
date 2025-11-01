// src/app/mypage/page.tsx

import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import IdeaCard from '@/components/IdeaCard';
import UserProfile from './components/UserProfile'; // 방금 만든 UserProfile을 가져옵니다.

// 마이페이지에서 사용할 임시 데이터
const userProfileData = {
  name: '김아름',
  email: 'areumiii@kookmin.ac.kr',
  avatarUrl: '', // 아바타 이미지 URL
  stats: {
    projects: 4,
    likes: 120,
    comments: 20,
  },
  followers: 30,
  following: 30,
};

// 내가 올린 프로젝트 목록 (catalog의 mockIdeas 재사용)
const myProjects = [
  { 
    id: 1, 
    title: '구글 제미나이', 
    description: '텍스트, 이미지 등 다양한 형태의 데이터를 동시에 이해하고 처리할 수 있는 AI 모델입니다.', 
    imageUrl: 'Gemini Image',
    tags: ['AI', 'Google'] 
  },
  { 
    id: 2, 
    title: '실시간 통역 이어폰', 
    description: '언어의 장벽 없이 자유롭게 소통할 수 있도록 도와주는 실시간 통역 이어폰입니다.', 
    imageUrl: 'Earphone Image',
    tags: ['하드웨어', '여행'] 
  },
  { 
    id: 3, 
    title: 'AI 기반 작곡 어시스턴트', 
    description: '음악적 영감을 구체화하고, 멜로디와 화음을 자동으로 생성하여 작곡 과정을 돕습니다.', 
    imageUrl: 'Music Image',
    tags: ['AI', '음악'] 
  },
];


export default function MyPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          
          <UserProfile {...userProfileData} />

          <div className="w-full rounded-lg border bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">내 프로젝트</h2>
              <button className="rounded-lg bg-teal-500 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-600">
                업로드
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {myProjects.map((idea) => (
                // ◀ 2. <Link> 태그로 <IdeaCard>를 감쌉니다.
                <Link href={`/projectview/${idea.id}`} key={idea.id}>
                  <IdeaCard
                    imageUrl={idea.imageUrl}
                    title={idea.title}
                    description={idea.description}
                    tags={idea.tags}
                  />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}