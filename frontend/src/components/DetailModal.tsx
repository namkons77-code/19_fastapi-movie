import React, { useEffect, useState } from 'react';
import { X, Play, Star, Clock, Calendar, Users, Film } from 'lucide-react';
import type { MediaItem, MediaDetails } from '../types';
import { fetchMediaDetails } from '../api/client';

interface DetailModalProps {
  item: MediaItem | null;
  onClose: () => void;
  onSelectSimilar: (item: MediaItem) => void;
  autoPlayTrailer?: boolean;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
  onSelectSimilar,
  autoPlayTrailer = false,
}) => {
  const [details, setDetails] = useState<MediaDetails | null>(null);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(autoPlayTrailer);

  useEffect(() => {
    if (!item) return;

    setIsPlayingTrailer(autoPlayTrailer);
    fetchMediaDetails(item.media_type, item.id)
      .then((data) => {
        setDetails(data);
      })
      .catch((err) => {
        console.error('Failed to fetch details:', err);
        setDetails(item as MediaDetails);
      });
  }, [item, autoPlayTrailer]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const trailerVideo = details?.videos?.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser' || v.type === 'Clip')
  ) || details?.videos?.[0];

  const bgImage = details?.backdrop_url || item.backdrop_url || item.poster_url;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      {/* 닫기 배경 클릭 */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* 모달 윈도우 */}
      <div className="relative z-10 w-full max-w-4xl bg-[#141517] rounded-xl overflow-hidden shadow-2xl border border-neutral-800 text-white my-8">
        {/* 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition border border-neutral-700/80"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 상단 미디어 영역 (예고편 영상 또는 백드롭) */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
          {isPlayingTrailer && trailerVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&rel=0&controls=1`}
              title={trailerVideo.name || '트레일러'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <>
              {bgImage && (
                <img
                  src={bgImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
              {/* 그라데이션 */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141517] via-transparent to-black/40" />

              {/* 재생 / 트레일러 버튼 */}
              <div className="absolute inset-0 flex items-center justify-center">
                {trailerVideo ? (
                  <button
                    onClick={() => setIsPlayingTrailer(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff153c] hover:bg-[#e5092b] text-white font-bold text-sm sm:text-base shadow-2xl transition hover:scale-105 active:scale-95"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>예고편 재생하기</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`'${item.title}' 시청을 시작합니다.`)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-sm sm:text-base shadow-2xl transition hover:scale-105 active:scale-95"
                  >
                    <Play className="w-5 h-5 fill-black" />
                    <span>바로 시청하기</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* 모달 본문 정보 영역 */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* 타이틀 및 메타 태그 */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {item.badge && (
                <span className="px-2.5 py-0.5 bg-[#ff153c] text-white rounded text-xs font-bold">
                  {item.badge}
                </span>
              )}
              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded text-xs border border-neutral-700">
                {item.media_type === 'tv' ? '시리즈' : '영화'}
              </span>
              {item.age_rating && (
                <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded text-xs border border-neutral-700">
                  {item.age_rating}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {item.title}
            </h2>

            {item.original_title && item.original_title !== item.title && (
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 italic">
                {item.original_title}
              </p>
            )}

            {/* 메타 인포 아이콘들 */}
            <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-300 mt-3 flex-wrap">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                {item.vote_average.toFixed(1)} 점
              </span>
              {item.release_date && (
                <span className="flex items-center gap-1 text-neutral-300">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  {item.release_date}
                </span>
              )}
              {details?.runtime ? (
                <span className="flex items-center gap-1 text-neutral-300">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  {details.runtime}분
                </span>
              ) : null}
              {details?.number_of_seasons ? (
                <span className="text-neutral-300">
                  시즌 {details.number_of_seasons}개
                </span>
              ) : null}
            </div>
          </div>

          {/* 줄거리 */}
          <div>
            <h3 className="text-sm font-bold text-neutral-400 mb-2">줄거리</h3>
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              {details?.overview || item.overview || '줄거리 정보가 제공되지 않습니다.'}
            </p>
          </div>

          {/* 출연진 */}
          {details?.cast && details.cast.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-neutral-400 mb-3 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#ff153c]" />
                <span>주요 출연진</span>
              </h3>
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                {details.cast.map((actor) => (
                  <div key={actor.id} className="flex-shrink-0 text-center w-20">
                    <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 mb-1.5">
                      {actor.profile_url ? (
                        <img
                          src={actor.profile_url}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                          {actor.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-neutral-200 truncate">{actor.name}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 비슷한 추천 작품 */}
          {details?.similar && details.similar.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-neutral-400 mb-3 flex items-center gap-1.5">
                <Film className="w-4 h-4 text-[#ff153c]" />
                <span>비슷한 추천 콘텐츠</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {details.similar.slice(0, 4).map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectSimilar(sim)}
                    className="cursor-pointer group bg-neutral-900 rounded-md overflow-hidden border border-neutral-800 hover:border-neutral-600 transition"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-800">
                      {sim.backdrop_url || sim.poster_url ? (
                        <img
                          src={sim.backdrop_url || sim.poster_url}
                          alt={sim.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                          {sim.title}
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-semibold text-neutral-200 truncate group-hover:text-[#ff153c] transition-colors">
                        {sim.title}
                      </p>
                      <p className="text-[10px] text-amber-400 mt-0.5">
                        ★ {sim.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
