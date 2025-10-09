// src/app/catalog/page.tsx

import IdeaCard from '@/components/IdeaCard';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import FloatingButton from '@/components/FloatingButton';

// API 연결 전까지 사용할 임시 데이터
const mockIdeas = [
  { 
    id: 1, 
    title: '구글 제미나이', 
    description: '텍스트, 이미지 등 다양한 형태의 데이터를 동시에 이해하고 처리할 수 있는 AI 모델로 구글의 차세대 AI 플랫폼입니다.', 
    imageUrl: 'Gemini Image',
    tags: ['AI', 'Google', 'LLM'] 
  },
  { 
    id: 2, 
    title: '실시간 통역 이어폰', 
    description: '해외 여행이나 비즈니스 미팅 시 언어의 장벽 없이 자유롭게 소통할 수 있도록 도와주는 실시간 통역 이어폰입니다.', 
    imageUrl: 'Earphone Image',
    tags: ['하드웨어', '여행'] 
  },
  { 
    id: 3, 
    title: 'AI 기반 작곡 어시스턴트', 
    description: '음악적 영감을 구체화하고, 멜로디와 화음을 자동으로 생성하여 작곡 과정을 돕는 AI 어시스턴트입니다.', 
    imageUrl: 'Music Image',
    tags: ['AI', '음악', '창작'] 
  },
  { 
    id: 4, 
    title: '반려동물 건강 모니터링 앱', 
    description: '반려동물의 활동량, 수면 패턴, 식사량 등을 기록하고 분석하여 건강 이상 징후를 미리 알려주는 모바일 앱입니다.', 
    imageUrl: 'Pet Image',
    tags: ['모바일앱', '반려동물'] 
  },
  { 
    id: 5, 
    title: 'AR 인테리어 시뮬레이터', 
    description: '스마트폰 카메라로 자신의 방을 비추면, 가구를 가상으로 배치해보고 인테리어를 미리 체험할 수 있는 AR 앱입니다.', 
    imageUrl: 'AR Image',
    tags: ['AR', '인테리어'] 
  },
  { 
    id: 6, 
    title: '개인 맞춤형 영양제 추천 서비스', 
    description: '간단한 건강 설문과 식습관 분석을 통해 개인에게 가장 필요한 영양제를 추천하고 정기적으로 배송해주는 구독 서비스입니다.', 
    imageUrl: 'Pill Image',
    tags: ['구독서비스', '건강'] 
  },
];


export default function CatalogPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="relative flex-1 overflow-y-auto p-8">
        {/* 콘텐츠가 너무 넓어지지 않도록 최대 너비를 설정하고 중앙 정렬합니다. */}
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Header />

          {/* 카드 사이의 간격을 gap-6에서 gap-8로 늘립니다. */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                imageUrl={idea.imageUrl}
                title={idea.title}
                description={idea.description}
                tags={idea.tags}
              />
            ))}
          </div>
        </div>

        <FloatingButton />
      </main>
    </div>
  );
}