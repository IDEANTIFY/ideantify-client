// src/components/IdeaCard.tsx

// 이 카드가 받을 데이터의 타입을 미리 정의합니다.
type IdeaCardProps = {
  imageUrl: string; // 이미지 URL (지금은 텍스트로 대체)
  title: string;
  description: string;
  tags: string[]; // 태그를 여러 개 받을 수 있도록 배열로 만듭니다.
};

export default function IdeaCard({
  imageUrl,
  title,
  description,
  tags,
}: IdeaCardProps) {
  return (
    // 전체 카드 컨테이너
    <div className="flex cursor-pointer flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
      
      {/* 1. 이미지 영역 */}
      <div className="flex aspect-video items-center justify-center bg-gray-200">
        {/* ... */}
      </div>

      {/* 2. 콘텐츠 영역 (flex-grow로 남은 공간을 모두 채움) */}
      <div className="flex flex-grow flex-col p-4">
        {/* 제목 */}
        <h3 className="text-base font-bold text-gray-800">{title}</h3>
        
        {/* 설명 */}
        <p className="mt-1 text-sm text-gray-600 line-clamp-3">
          {description}
        </p>

        {/* 태그 (mt-auto로 맨 아래에 붙임) */}
        <div className="mt-auto pt-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}