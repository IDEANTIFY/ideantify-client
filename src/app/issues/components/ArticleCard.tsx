// src/app/issues/components/ArticleCard.tsx

// 재사용을 위한 작은 태그 컴포넌트
const Tag = ({ text }: { text: string }) => (
    <span className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
      {text}
    </span>
  );
  
  // 이 카드가 받을 데이터의 타입을 정의합니다.
  type ArticleCardProps = {
    imageUrl: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
  };
  
  export default function ArticleCard({
    imageUrl,
    title,
    subtitle,
    description,
    tags,
  }: ArticleCardProps) {
    return (
      // 전체 카드 컨테이너
      <div className="flex flex-1 cursor-pointer gap-4 rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md">
        
        {/* 1. 이미지 영역 */}
        <div className="h-28 w-28 flex-shrink-0 rounded bg-gray-100">
          {/* 이미지가 없을 때를 대비한 Placeholder 텍스트 */}
          <span className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            {imageUrl}
          </span>
        </div>
  
        {/* 2. 텍스트 콘텐츠 영역 */}
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
          <p className="text-sm text-gray-700">{description}</p>
          
          {/* 3. 태그 (mt-auto로 하단에 붙임) */}
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => <Tag key={tag} text={tag} />)}
          </div>
        </div>
      </div>
    );
  }