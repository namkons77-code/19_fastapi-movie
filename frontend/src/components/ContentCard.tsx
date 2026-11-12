import React from 'react';
import { Play, Star } from 'lucide-react';
import type { MediaItem } from '../types';

interface ContentCardProps {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
  onPlay: (item: MediaItem) => void;
  aspectRatio?: 'poster' | 'landscape';
}

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onSelect,
  onPlay,
  aspectRatio = 'poster',
}) => {
  const isPoster = aspectRatio === 'poster';
  const imageUrl = isPoster
    ? item.poster_url || item.backdrop_url
    : item.backdrop_url || item.poster_url;

  return (
    <div
      onClick={() => onSelect(item)}
      className="flex-shrink-0 relative group/card cursor-pointer select-none transition-all duration-300 hover:scale-105 hover:z-20"
      style={{
        width: isPoster ? 'clamp(140px, 15vw, 200px)' : 'clamp(240px, 24vw, 320px)',
      }}
    >
      {/* 썸네일 컨테이너 */}
      <div
        className={`relative w-full rounded-md overflow-hidden bg-neutral-900 border border-neutral-800/80 shadow-lg ${
          isPoster ? 'aspect-[2/3]' : 'aspect-[16/9]'
        }`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-3 text-center text-xs text-neutral-500">
            {item.title}
          </div>
        )}

        {/* 티빙 뱃지 태그 */}
        {item.badge && (
          <div className="absolute top-2 left-2 z-10 px-1.5 py-0.5 bg-[#ff153c] text-white text-[10px] font-bold rounded shadow-md">
            {item.badge}
          </div>
        )}

        {/* 호버 시 나타나는 세련된 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(item);
            }}
            className="w-9 h-9 rounded-full bg-[#ff153c] text-white flex items-center justify-center shadow-lg mb-2 hover:scale-110 transition active:scale-95 self-center"
          >
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </button>

          <p className="text-xs font-bold text-white line-clamp-1">{item.title}</p>
          <div className="flex items-center justify-between text-[11px] text-neutral-300 mt-1">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3 h-3 fill-amber-400" />
              {item.vote_average.toFixed(1)}
            </span>
            <span className="text-neutral-400">
              {item.release_date ? item.release_date.split('-')[0] : ''}
            </span>
          </div>
        </div>
      </div>

      {/* 카드 하단 텍스트 정보 */}
      <div className="mt-2 px-0.5">
        <p className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover/card:text-[#ff153c] transition-colors truncate">
          {item.title}
        </p>
        {item.genres && item.genres.length > 0 && (
          <p className="text-[11px] text-neutral-400 truncate mt-0.5">
            {item.genres.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};
