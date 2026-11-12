import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MediaItem } from '../types';
import { ContentCard } from './ContentCard';

interface ContentRowProps {
  title: string;
  items: MediaItem[];
  onSelect: (item: MediaItem) => void;
  onPlay: (item: MediaItem) => void;
  aspectRatio?: 'poster' | 'landscape';
}

export const ContentRow: React.FC<ContentRowProps> = ({
  title,
  items,
  onSelect,
  onPlay,
  aspectRatio = 'poster',
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
    <div className="relative group/row my-6 sm:my-8 px-4 sm:px-8 lg:px-12">
      {/* 섹션 타이틀 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight hover:text-[#ff153c] cursor-pointer transition-colors">
          {title}
        </h2>
      </div>

      {/* 좌측 화살표 */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          aria-label="이전 목록 보기"
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-11 h-20 sm:h-32 bg-black/70 hover:bg-black/90 text-white rounded-r flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 border-r border-y border-neutral-700/60 shadow-xl"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* 우측 화살표 */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          aria-label="다음 목록 보기"
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 sm:w-11 h-20 sm:h-32 bg-black/70 hover:bg-black/90 text-white rounded-l flex items-center justify-center backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 border-l border-y border-neutral-700/60 shadow-xl"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      )}

      {/* 가로 스크롤 카드 리스트 */}
      <div
        ref={rowRef}
        onScroll={handleScroll}
        className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2"
      >
        {items.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onSelect={onSelect}
            onPlay={onPlay}
            aspectRatio={aspectRatio}
          />
        ))}
      </div>
    </div>
  );
};
