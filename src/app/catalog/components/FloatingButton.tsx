// src/components/FloatingButton.tsx

export default function FloatingButton() {
    return (
      <button
        className="fixed bottom-10 right-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white text-sm font-bold text-teal-500 shadow-md transition-all hover:shadow-lg"
        aria-label="아이디어 업로드 페이지로 이동"
      >
        <span className="text-center leading-tight">
          나도
          <br />
          업로드
          <br />
          하러가기
        </span>
      </button>
    );
  }