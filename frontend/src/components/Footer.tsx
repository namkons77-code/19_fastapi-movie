import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] border-t border-neutral-900 text-neutral-400 text-xs mt-16 sm:mt-24 pt-10 pb-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* 상단 공지사항 */}
        <div className="flex items-center gap-4 text-xs pb-6 border-b border-neutral-900">
          <span className="font-bold text-neutral-300">공지사항</span>
          <span className="text-neutral-500 hover:text-neutral-300 cursor-pointer truncate transition-colors">
            서비스 이용약관 및 미디어 데이터 처리방침 개정 안내
          </span>
        </div>

        {/* 약관 링크 */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-neutral-400">
          <a href="#" className="hover:text-white transition">고객센터</a>
          <a href="#" className="hover:text-white transition">이용약관</a>
          <a href="#" className="text-neutral-200 font-bold hover:text-white transition">개인정보처리방침</a>
          <a href="#" className="hover:text-white transition">청소년 보호정책</a>
          <a href="#" className="hover:text-white transition">법적고지</a>
          <a href="#" className="hover:text-white transition">오픈소스 라이선스</a>
        </div>

        {/* 서비스 및 데이터 제공 안내 */}
        <div className="text-neutral-500 text-[11px] leading-relaxed space-y-1">
          <p>
            CINEFLIX Media Streaming Service | 대한민국 및 글로벌 미디어 큐레이션 플랫폼
          </p>
          <p>
            고객지원센터: 1544-0000 (평일 09:00~18:00) | 문의메일: support@cineflix.stream
          </p>
          <p>
            본 서비스의 영화 및 시리즈 메타데이터와 포스터 이미지는 The Movie Database (TMDB) API를 기반으로 제공됩니다.
          </p>
        </div>

        {/* 카피라이트 */}
        <div className="pt-2 text-neutral-500 text-[11px] flex items-center justify-between">
          <p>© 2026 CINEFLIX Inc. All rights reserved. Powered by FastAPI & TMDB API.</p>
          <div className="flex items-center gap-2">
            <span className="text-[#ff153c] font-black tracking-wider text-sm">CINEFLIX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
