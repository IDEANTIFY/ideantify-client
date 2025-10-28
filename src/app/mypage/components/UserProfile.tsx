// src/app/mypage/components/UserProfile.tsx

import { Share2, Settings } from 'lucide-react';

// 컴포넌트가 받을 데이터 타입을 정의합니다.
type UserProfileProps = {
  name: string;
  email: string;
  avatarUrl: string; // 이미지 URL
  stats: {
    projects: number;
    likes: number;
    comments: number;
  };
  followers: number;
  following: number;
};

// 숫자와 레이블을 함께 보여주는 작은 컴포넌트
const StatItem = ({ value, label }: { value: number, label: string }) => (
  <div className="text-center">
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default function UserProfile({ name, email, avatarUrl, stats, followers, following }: UserProfileProps) {
  return (
    <div className="w-full rounded-lg border bg-white p-8 shadow-sm">
      {/* 상단 프로필 정보 */}
      <div className="flex items-center">
        {/* 프로필 이미지 */}
        <div className="h-24 w-24 flex-shrink-0 rounded-full bg-gray-200">
          {/* 실제 이미지가 있다면 <Image> 태그를 사용합니다. */}
        </div>
        
        {/* 이름, 이메일 */}
        <div className="ml-6 flex-grow">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          <p className="text-base text-gray-500">{email}</p>
        </div>

        {/* 팔로워, 팔로잉 */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div><span className="font-bold text-gray-800">{followers}</span> 팔로워</div>
          <div><span className="font-bold text-gray-800">{following}</span> 팔로잉</div>
          <button className="text-gray-500 hover:text-gray-800"><Share2 size={20} /></button>
          <button className="text-gray-500 hover:text-gray-800"><Settings size={20} /></button>
        </div>
      </div>

      {/* 구분선 */}
      <hr className="my-8" />

      {/* 하단 통계 정보 */}
      <div className="flex justify-around">
        <StatItem value={stats.projects} label="프로젝트" />
        <StatItem value={stats.likes} label="좋아요" />
        <StatItem value={stats.comments} label="댓글" />
      </div>
    </div>
  );
}