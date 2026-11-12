import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { MediaItem } from '../types';

interface TopRankingRowProps {
  title: string;
  items: MediaItem[];
  onSelect: (item: MediaItem) => void;
  onPlay: (item: MediaItem) => void;
}

export const TopRankingRow: React.FC<TopRankingRowProps> = ({
  title,
  items,
  onSelect,
  onPlay,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative group/row my-6 sm:my-10 px-4 sm:px-8 lg:px-12">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span>{title}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#ff153c]/20 text-[#ff153c] border border-[#ff153c]/40">
            실시간
          </span>
        </h2>
      </div>

      {/* 좌측 스크롤 화살표 버튼 */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          aria-label="이전 목록 보기"
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-24 sm:h-36 bg-black/70 hover:bg-black/90 text-white rounded-r flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 border-r border-y border-neutral-700/60 shadow-xl"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      )}

      {/* 우측 스크롤 화살표 버튼 */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          aria-label="다음 목록 보기"
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-12 h-24 sm:h-36 bg-black/70 hover:bg-black/90 text-white rounded-l flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 border-l border-y border-neutral-700/60 shadow-xl"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      )}

      {/* 랭킹 리스트 가로 스크롤 컨테이너 */}
      <div
        ref={rowRef}
        onScroll={handleScroll}
        className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-3"
      >
        {items.map((item, index) => {
          const rank = item.rank || index + 1;
          const poster = item.poster_url || item.backdrop_url;

          return (
            <div
              key={`${item.id}-${rank}`}
              className="flex-shrink-0 relative group/card cursor-pointer select-none transition-transform duration-300 hover:scale-105"
              onClick={() => onSelect(item)}
            >
              {/* 카드 본체: 랭킹 넘버 + 포스터 콤보 */}
              <div className="relative flex items-end">
                {/* 초대형 랭킹 넘버 */}
                <div className="rank-number text-7xl sm:text-8xl lg:text-9xl tracking-tighter -mr-4 sm:-mr-6 z-10 select-none pointer-events-none drop-shadow-2xl">
                  {rank}
                </div>

                {/* 포스터 이미지 */}
                <div className="relative w-36 sm:w-44 lg:w-52 aspect-[2/3] rounded-md overflow-hidden bg-neutral-900 shadow-xl border border-neutral-800">
                  {poster ? (
                    <img
                      src={poster}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-3 text-center text-xs text-neutral-500">
                      {item.title}
                    </div>
                  )}

                  {/* 호버 시 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlay(item);
                      }}
                      className="w-10 h-10 rounded-full bg-[#ff153c] text-white flex items-center justify-center shadow-lg mb-2 hover:scale-110 transition active:scale-95 self-center"
                    >
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </button>
                    <p className="text-xs font-bold text-white line-clamp-1">{item.title}</p>
                    <p className="text-[11px] text-neutral-300 flex items-center justify-between mt-0.5">
                      <span>★ {item.vote_average.toFixed(1)}</span>
                      <span>{item.media_type === 'tv' ? '시리즈' : '영화'}</span>
                    </p>
                  </div>

                  {/* 오리지널 독점 뱃지 */}
                  {item.is_original && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#ff153c] text-white text-[10px] font-black rounded shadow">
                      ORIGINAL
                    </div>
                  )}
                </div>
              </div>

              {/* 포스터 아래 제목 */}
              <div className="mt-2 text-center max-w-[170px] sm:max-w-[200px]">
                <p className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover/card:text-[#ff153c] transition-colors truncate">
                  {item.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
