// src/app/issues/components/ContentCard.tsx

// 이 카드가 받을 데이터의 타입을 정의합니다.
type ContentCardProps = {
    imageUrl: string;
    tag: string;
    title: string;
    subtitle: string;
  };
  
  export default function ContentCard({ imageUrl, tag, title, subtitle }: ContentCardProps) {
    return (
      // 전체 카드 컨테이너
      <div className="flex cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-transform duration-300 hover:-translate-y-1">
        
        {/* 1. 이미지 영역 */}
        <div className="relative h-44 w-full bg-gray-100">
          {/* 이미지가 없을 때를 대비한 Placeholder 텍스트 */}
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-400">
            {imageUrl}
          </span>
  
          {/* 2. 태그 (피그마 디자인 참고) */}
          <div className="absolute top-0 left-0 rounded-br-lg bg-teal-100 px-3 py-1">
            <span className="text-xs font-semibold text-teal-700">{tag}</span>
          </div>
        </div>
  
        {/* 3. 텍스트 콘텐츠 영역 */}
        <div className="flex flex-col p-4">
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    );
  }