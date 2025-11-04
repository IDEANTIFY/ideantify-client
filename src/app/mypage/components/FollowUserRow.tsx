// src/app/mypage/components/FollowUserRow.tsx

// '홍길동' 한 줄에 해당하는 컴포넌트
type FollowUserRowProps = {
    name: string;
    avatarUrl: string; // 아바타 이미지 URL (지금은 비어있음)
  };
  
  export default function FollowUserRow({ name, avatarUrl }: FollowUserRowProps) {
    return (
      <div className="flex items-center justify-between py-3">
        {/* 프로필 사진 + 이름 */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200">
            {/* <Image src={avatarUrl} alt={name} width={40} height={40} className="rounded-full" /> */}
          </div>
          <span className="font-medium text-gray-900">{name}</span>
        </div>
  
        {/* 팔로우 버튼 (피그마 코드 기반) */}
        <button className="rounded-lg border border-gray-900 bg-white px-4 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50">
          팔로우
        </button>
      </div>
    );
  }