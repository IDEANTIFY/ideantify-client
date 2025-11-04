// src/app/mypage/components/FollowModal.tsx

import { X } from 'lucide-react';
import FollowUserRow from './FollowUserRow';

// 이 컴포넌트가 받을 데이터 타입 정의
type FollowModalProps = {
  isOpen: boolean; // 모달이 열려있는지 여부
  onClose: () => void; // 모달을 닫는 함수
  title: string; // 모달 제목 (팔로워 또는 팔로잉)
  users: { id: number; name: string; avatarUrl: string }[]; // 유저 목록
};

export default function FollowModal({ isOpen, onClose, title, users }: FollowModalProps) {
  // isOpen이 false이면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    // 1. 화면 전체를 덮는 어두운 배경 (클릭 시 닫기)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* 2. 실제 모달 컨텐츠 (클릭해도 닫히지 않음) */}
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
      >
        {/* 3. 모달 헤더 (제목 + 닫기 버튼) */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* 4. 유저 목록 (스크롤 가능) */}
        <div className="flex max-h-80 flex-col divide-y overflow-y-auto">
          {users.map((user) => (
            <FollowUserRow
              key={user.id}
              name={user.name}
              avatarUrl={user.avatarUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}