import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { MediaItem } from '../types';

interface BannerHeroProps {
  items: MediaItem[];
  onSelect: (item: MediaItem) => void;
  onPlay: (item: MediaItem) => void;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  items,
  onSelect,
  onPlay,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = items.length;

  const nextSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (total <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPaused, currentIndex]);

  if (total === 0) return null;

  const currentItem = items[currentIndex];
  const bgImage = currentItem.backdrop_url || currentItem.poster_url || '';

  return (
    <div
      className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[88vh] min-h-[500px] overflow-hidden select-none bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 배경 백드롭 이미지 */}
      <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
        {bgImage ? (
          <img
            key={currentItem.id}
            src={bgImage}
            alt={currentItem.title}
            className="w-full h-full object-cover object-center animate-fade-in"
          />
        ) : (
          <div className="w-full h-full bg-neutral-900" />
        )}
      </div>

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 hero-gradient-overlay" />
      <div className="absolute inset-0 hero-side-gradient" />

      {/* 메인 콘텐츠 영역 */}
      <div className="relative z-10 max-w-[1800px] mx-auto h-full px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-16 sm:pb-24 lg:pb-32">
        <div className="max-w-2xl lg:max-w-3xl space-y-3 sm:space-y-4">
          {/* 뱃지 & 장르 */}
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-semibold">
            {currentItem.badge && (
              <span className="px-2.5 py-1 bg-[#ff153c] text-white rounded font-bold shadow-md">
                {currentItem.badge}
              </span>
            )}
            {currentItem.age_rating && (
              <span className="px-2 py-0.5 bg-neutral-800/90 text-neutral-300 rounded border border-neutral-700">
                {currentItem.age_rating}
              </span>
            )}
            <div className="flex items-center gap-1 text-amber-400 font-bold bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-700">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{currentItem.vote_average.toFixed(1)}</span>
            </div>
            {currentItem.genres && currentItem.genres.length > 0 && (
              <span className="text-neutral-300 hidden sm:inline">
                {currentItem.genres.join(' · ')}
              </span>
            )}
          </div>

          {/* 대형 타이틀 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] line-clamp-2">
            {currentItem.title}
          </h1>

          {/* 서브타이틀 */}
          {currentItem.original_title && currentItem.original_title !== currentItem.title && (
            <p className="text-xs sm:text-sm text-neutral-400 italic">
              {currentItem.original_title}
            </p>
          )}

          {/* 줄거리 */}
          <p className="text-sm sm:text-base text-neutral-200/90 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl drop-shadow-md">
            {currentItem.overview}
          </p>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-3 pt-2 sm:pt-4">
            <button
              onClick={() => onPlay(currentItem)}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded bg-white text-black font-extrabold text-sm sm:text-base hover:bg-neutral-200 transition-all duration-200 shadow-lg hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-black" />
              <span>시청하기</span>
            </button>

            <button
              onClick={() => onSelect(currentItem)}
              className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded bg-neutral-800/80 hover:bg-neutral-700 text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all duration-200 border border-neutral-700/60 hover:scale-105 active:scale-95"
            >
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>상세정보</span>
            </button>
          </div>
        </div>
      </div>

      {/* 우측 하단 슬라이드 컨트롤러 & 인디케이터 */}
      <div className="absolute right-4 sm:right-8 lg:right-12 bottom-12 sm:bottom-20 lg:bottom-28 z-20 flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800/80">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-white">
          <span className="text-[#ff153c]">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="text-neutral-500 mx-1">/</span>
          <span className="text-neutral-400">{String(total).padStart(2, '0')}</span>
        </span>

        <div className="flex items-center gap-1 border-l border-neutral-700/60 pl-2">
          <button
            onClick={prevSlide}
            aria-label="이전 배너"
            className="p-1 text-neutral-300 hover:text-white transition rounded-full hover:bg-neutral-700/50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="다음 배너"
            className="p-1 text-neutral-300 hover:text-white transition rounded-full hover:bg-neutral-700/50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
