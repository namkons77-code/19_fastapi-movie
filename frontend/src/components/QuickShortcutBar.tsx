import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ShortcutItem {
  id: string;
  title: string;
  hasNewBadge?: boolean;
  renderIcon: () => React.ReactNode;
  actionType: 'modal' | 'filter' | 'link';
  description: string;
}

export const SHORTCUT_ITEMS: ShortcutItem[] = [
  {
    id: 'kbo',
    title: 'KBO 리그',
    description: '2026 KBO 리그 전 경기 실시간 무료 생중계 및 하이라이트',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden shadow-inner border border-neutral-300">
        {/* 야구공 실밥 SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          <path
            d="M 22 15 C 36 35, 36 65, 22 85"
            fill="none"
            stroke="#ff2d55"
            strokeWidth="3.5"
            strokeDasharray="2,3"
          />
          <path
            d="M 78 15 C 64 35, 64 65, 78 85"
            fill="none"
            stroke="#ff2d55"
            strokeWidth="3.5"
            strokeDasharray="2,3"
          />
        </svg>
        <span className="relative z-10 text-[#004bb4] font-black italic text-xl tracking-tighter drop-shadow-sm select-none">
          KBO
        </span>
      </div>
    ),
  },
  {
    id: 'drama-100days',
    title: '100일의 거짓말',
    description: '거짓말로 시작된 100일간의 아찔한 로맨스 스릴러',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full overflow-hidden bg-neutral-800 border border-neutral-700">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
          alt="100일의 거짓말"
          className="w-full h-full object-cover object-center"
        />
      </div>
    ),
  },
  {
    id: 'original',
    title: '오리지널',
    description: '오직 티빙에서만 만날 수 있는 독점 오리지널 대작 컬렉션',
    actionType: 'filter',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#ff153c] via-[#ff3b30] to-[#ff9500] flex items-center justify-center shadow-lg border border-white/20">
        <span className="text-white font-black text-[13px] tracking-tight leading-none drop-shadow">
          ORIGINAL
        </span>
      </div>
    ),
  },
  {
    id: 'movie-shop',
    title: '영화구매 포인트샵',
    description: '최신 극장 개봉작 소장 & VOD 포인트 결제 혜택관',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full overflow-hidden bg-neutral-800 border border-neutral-700">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
          alt="영화구매 포인트샵"
          className="w-full h-full object-cover object-top"
        />
      </div>
    ),
  },
  {
    id: 'mystery',
    title: '도시괴담은 처음이지?',
    hasNewBadge: true,
    description: '심야 공포 & 대탈출 미스터리 괴담 레전드 에피소드 모음',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#0a140a] flex flex-col items-center justify-center p-1.5 relative overflow-hidden border border-emerald-900/60 shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:8px_8px] opacity-30" />
        <span className="relative z-10 text-white font-black text-[12px] tracking-tight leading-none drop-shadow text-center">
          대탈출
        </span>
        <span className="relative z-10 text-emerald-400 font-extrabold text-[10px] tracking-tighter leading-tight mt-0.5">
          도시괴담
        </span>
      </div>
    ),
  },
  {
    id: 'conan',
    title: '명탐정 코난 30주년',
    description: '명탐정 코난 TV 시리즈 & 극장판 30주년 기념 전편 특별관',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1 relative overflow-hidden border border-neutral-300 shadow-sm">
        {/* 코난 돋보기 & 30 로고 */}
        <div className="w-full h-full rounded-full flex flex-col items-center justify-center relative">
          <div className="flex items-center justify-center">
            <span className="text-[#d92323] font-black text-base italic leading-none">3</span>
            <div className="w-5 h-5 rounded-full border-2 border-[#d92323] flex items-center justify-center -ml-0.5">
              <span className="text-[10px] text-[#004bb4] font-bold">👓</span>
            </div>
          </div>
          <span className="text-[9px] font-black text-neutral-800 tracking-tighter -mt-0.5">
            DETECTIVE
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'apple-tv',
    title: 'Apple TV',
    description: 'Apple TV+ 명작 오리지널 시리즈 & 영화 티빙 단독 스트리밍',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#161617] flex items-center justify-center border border-neutral-700 shadow-inner">
        <div className="flex items-center gap-0.5 text-white">
          {/* 애플 로고 SVG */}
          <svg className="w-5 h-5 fill-white" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.58-7.91-11.66-14.49-5.99-9.67-10.73-20.48-14.22-32.42-3.48-11.94-5.23-23.08-5.23-33.42 0-14.12 3.6-25.76 10.8-34.92 7.21-9.16 16.48-13.88 27.82-14.17 4.93.13 10.42 1.45 16.48 3.96 6.07 2.51 10.23 3.82 12.49 3.94 1.74-.12 6.13-1.53 13.17-4.22 7.04-2.69 13.04-3.87 18-3.55 13.62 1.05 24.3 6.19 32.04 15.42-12.02 7.26-17.9 17.2-17.65 29.83.25 10.15 4.17 18.57 11.75 25.26 7.58 6.69 16.63 10.5 27.15 11.44-2.61 7.82-6.09 16.22-10.44 25.2zM119.22 33.15c0-7.39 2.67-14.37 8-20.94 5.34-6.58 12.08-10.99 20.24-13.21.99 7.82-1.4 15.06-7.18 21.72-5.78 6.66-12.79 10.81-21.06 12.43z" />
          </svg>
          <span className="font-extrabold text-sm tracking-tight ml-0.5">tv</span>
        </div>
      </div>
    ),
  },
  {
    id: 'coming-soon',
    title: '공개예정',
    description: '티빙에 곧 찾아올 이번 달 최고의 기대작 라인업',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ff9500] via-[#ff6a00] to-[#e65100] flex items-center justify-center shadow-lg border border-amber-300/30">
        <span className="text-black font-black text-base italic tracking-wider drop-shadow-sm">
          SOON
        </span>
      </div>
    ),
  },
  {
    id: 'apbc',
    title: '2026 APBC',
    hasNewBadge: true,
    description: '2026 아시아 프로야구 챔피언십 대한민국 국가대표 경기 생중계',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full overflow-hidden bg-[#001f5c] border border-blue-600 relative">
        <img
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=200&q=80"
          alt="2026 APBC"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-1">
          <span className="text-[10px] font-black text-white italic">APBC</span>
        </div>
      </div>
    ),
  },
  {
    id: 'kbl',
    title: '26-27 KBL',
    description: '2026-2027 KBL 프로농구 정규리그 전 경기 독점 라이브 스트리밍',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-[#f36f21] flex items-center justify-center border border-amber-500 shadow-md">
        <div className="flex flex-col items-center">
          <span className="text-[#002f6c] font-black italic text-base tracking-tighter drop-shadow-sm">
            KBL
          </span>
          <div className="w-7 h-1 bg-[#002f6c] rounded-full -mt-0.5" />
        </div>
      </div>
    ),
  },
  {
    id: 'recommend-what-to-watch',
    title: '오늘 뭐 볼까?',
    description: '지금 내 기분과 취향에 꼭 맞는 인생 콘텐츠 맞춤 추천',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#7b1fa2] via-[#9c27b0] to-[#e91e63] flex items-center justify-center border border-pink-400/30 shadow-lg">
        {/* 귀여운 두 개의 커다란 눈동자 👀 */}
        <div className="flex items-center gap-1">
          <div className="w-4 h-5 rounded-full bg-white flex items-start justify-start p-0.5 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-black ml-0.5 mt-0.5" />
          </div>
          <div className="w-4 h-5 rounded-full bg-white flex items-start justify-start p-0.5 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-black ml-0.5 mt-0.5" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'clip',
    title: '클립',
    description: '화제의 드라마 & 예능 숏폼 하이라이트 영상 무제한 재생',
    actionType: 'modal',
    renderIcon: () => (
      <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#6200ea] via-[#7c4dff] to-[#ff4081] flex items-center justify-center border border-purple-300/30 shadow-lg">
        <div className="flex items-center text-white">
          <span className="font-black text-xs tracking-wider">CL</span>
          <span className="text-yellow-300 font-bold text-xs -mx-0.5">⚡</span>
          <span className="font-black text-xs tracking-wider">P</span>
        </div>
      </div>
    ),
  },
];

interface QuickShortcutBarProps {
  onSelectShortcut?: (item: ShortcutItem) => void;
}

export const QuickShortcutBar: React.FC<QuickShortcutBarProps> = ({
  onSelectShortcut,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 15);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 15);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // macOS Dock 포물선 확대 및 부유(TranslateY) 계산
  const getDockTransform = (index: number) => {
    if (hoveredIndex === null) {
      return {
        scale: 1,
        translateY: 0,
        zIndex: 1,
        diff: 999,
      };
    }

    const diff = Math.abs(hoveredIndex - index);

    if (diff === 0) {
      // 🎯 마우스 호버 중앙 아이콘: 최대 1.45배 확대 & 위로 18px 부유
      return {
        scale: 1.45,
        translateY: -18,
        zIndex: 40,
        diff,
      };
    } else if (diff === 1) {
      // 🌊 1단계 인접 아이콘: 1.22배 확대 & 위로 9px 부유
      return {
        scale: 1.22,
        translateY: -9,
        zIndex: 30,
        diff,
      };
    } else if (diff === 2) {
      // 🌊 2단계 인접 아이콘: 1.08배 확대 & 위로 3px 부유
      return {
        scale: 1.08,
        translateY: -3,
        zIndex: 20,
        diff,
      };
    }

    return {
      scale: 1,
      translateY: 0,
      zIndex: 10,
      diff,
    };
  };

  return (
    <div
      className="relative group/bar max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 pt-2 pb-6 select-none"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* 좌측 스크롤 화살표 */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          aria-label="이전 바로가기"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/85 hover:bg-black text-white flex items-center justify-center border border-neutral-700 shadow-2xl opacity-0 group-hover/bar:opacity-100 transition duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* 우측 스크롤 화살표 */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          aria-label="다음 바로가기"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/85 hover:bg-black text-white flex items-center justify-center border border-neutral-700 shadow-2xl opacity-0 group-hover/bar:opacity-100 transition duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* 가로 스크롤 리스트 (macOS Dock 확대 애니메이션 컨테이너) */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-end gap-3 sm:gap-5 lg:gap-7 overflow-x-auto no-scrollbar scroll-smooth pt-10 pb-4 px-3"
      >
        {SHORTCUT_ITEMS.map((item, index) => {
          const dock = getDockTransform(index);

          return (
            <button
              key={item.id}
              onClick={() => onSelectShortcut?.(item)}
              onMouseEnter={() => setHoveredIndex(index)}
              className="flex-shrink-0 flex flex-col items-center group cursor-pointer text-center focus:outline-none select-none relative"
              style={{
                width: 'clamp(72px, 7.8vw, 92px)',
                zIndex: dock.zIndex,
              }}
            >
              {/* 원형 아이콘 컨테이너 (macOS Dock 확대 & 부유 인터랙션) */}
              <div
                className={`relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px] rounded-full p-0.5 origin-bottom transition-all ${
                  dock.diff === 0
                    ? 'ring-2 ring-[#ff153c] shadow-[0_16px_32px_rgba(0,0,0,0.85),0_0_24px_rgba(255,21,60,0.55)]'
                    : dock.diff === 1
                    ? 'ring-1 ring-white/40 shadow-[0_10px_22px_rgba(0,0,0,0.7),0_0_12px_rgba(255,255,255,0.2)]'
                    : dock.diff === 2
                    ? 'shadow-[0_6px_14px_rgba(0,0,0,0.5)]'
                    : 'shadow-md'
                }`}
                style={{
                  transform: `scale(${dock.scale}) translateY(${dock.translateY}px)`,
                  transition:
                    'transform 0.22s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.22s ease-out, ring-color 0.22s ease-out',
                }}
              >
                {item.renderIcon()}

                {/* 우측 상단 'N' 신규 배지 */}
                {item.hasNewBadge && (
                  <div className="absolute -top-1 -right-1 z-10 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-[#ff153c] text-white text-[10px] sm:text-[11px] font-black flex items-center justify-center shadow-lg border border-black animate-bounce">
                    N
                  </div>
                )}
              </div>

              {/* 하단 텍스트 라벨 (독 확대 시 가독성 및 정렬 유지) */}
              <span
                className={`text-[11px] sm:text-xs transition-all duration-200 mt-2.5 text-center leading-tight line-clamp-2 max-w-[80px] sm:max-w-[92px] ${
                  dock.diff === 0
                    ? 'text-white font-bold scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
                    : dock.diff === 1
                    ? 'text-neutral-200 font-semibold'
                    : 'text-neutral-400 font-medium'
                }`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
