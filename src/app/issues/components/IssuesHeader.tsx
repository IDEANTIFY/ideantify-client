// src/app/issues/components/IssuesHeader.tsx

export default function IssuesHeader() {
    return (
      <section className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-50 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">최근 인기 콘텐츠</h1>
        <p className="mt-2 text-base text-gray-600">아이디어 영감을 얻어보세요.</p>
  
        <div className="mt-8 flex w-full max-w-xl">
          <input
            type="text"
            placeholder="키워드를 입력하세요..."
            className="
              flex-grow rounded-l-lg border border-gray-300 px-4 py-2.5
              text-base text-gray-900 placeholder:text-gray-400
              focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500
            "
          />
          <button 
            className="
              flex-shrink-0 rounded-r-lg bg-teal-500 px-8 py-2.5 
              text-base font-medium text-white hover:bg-teal-600
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
            "
          >
            검색
          </button>
        </div>
      </section>
    );
  }