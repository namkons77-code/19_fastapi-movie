import React, { useEffect, useState } from 'react';
import { X, Play, Star, Clock, Calendar, Users, Film, Maximize2, Minimize2 } from 'lucide-react';
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
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState<string | null>(null);

  useEffect(() => {
    if (!item) return;

    setIsPlayingTrailer(autoPlayTrailer);
    if (autoPlayTrailer) {
      setIsTheaterMode(true);
    } else {
      setIsTheaterMode(false);
    }
    setSelectedVideoKey(null);

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

  // 가용 유튜브 비디오 추출 및 정렬
  const availableVideos = details?.videos?.filter(
    (v) => v.site === 'YouTube' && v.key
  ) || [];

  const defaultVideo =
    availableVideos.find((v) => v.type === 'Trailer') ||
    availableVideos.find((v) => v.type === 'Teaser') ||
    availableVideos[0] ||
    (item.trailer_key
      ? { key: item.trailer_key, name: '공식 트레일러', site: 'YouTube', type: 'Trailer' }
      : null);

  const currentVideoKey = selectedVideoKey || defaultVideo?.key || null;
  const currentVideo = availableVideos.find((v) => v.key === currentVideoKey) || defaultVideo;

  const bgImage = details?.backdrop_url || item.backdrop_url || item.poster_url;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-fade-in">
      {/* 닫기 배경 클릭 */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* 모달 윈도우: 뷰포트 내 최적화 (화면 잘림 원천 방지) */}
      <div
        className={`relative z-10 w-full ${
          isTheaterMode ? 'max-w-6xl' : 'max-w-4xl'
        } max-h-[92vh] flex flex-col bg-[#141517] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 text-white transition-all duration-300 my-auto`}
      >
        {/* 상단 컨트롤 바 (플로팅 헤더) */}
        <div className="absolute top-3 left-3 right-3 z-40 pointer-events-none flex flex-col gap-2.5">
          {/* 상단 1번째 줄: 좌측 상태 배지 & 우측 모달 닫기(X) 버튼 */}
          <div className="flex items-center justify-between w-full">
            {/* 좌측 상태 배지 */}
            <div className="pointer-events-auto flex items-center gap-2">
              {isPlayingTrailer && currentVideoKey ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#ff153c]/40 text-white text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#ff153c] animate-pulse" />
                  <span className="truncate max-w-[150px] sm:max-w-[280px]">
                    {currentVideo?.name || '예고편 재생 중'}
                  </span>
                </span>
              ) : item.badge ? (
                <span className="px-2.5 py-1 bg-[#ff153c] text-white rounded-md text-xs font-bold shadow-lg">
                  {item.badge}
                </span>
              ) : null}
            </div>

            {/* 우측 모달 닫기 버튼 */}
            <div className="pointer-events-auto">
              <button
                onClick={onClose}
                aria-label="닫기"
                title="닫기 (ESC)"
                className="p-2 rounded-full bg-black/85 hover:bg-[#ff153c] text-white transition border border-neutral-700 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 상단 2번째 줄 (한 줄 아래 배치): 기본 화면/극장 모드 & 영상 정지 버튼 */}
          {isPlayingTrailer && currentVideoKey && (
            <div className="flex items-center justify-end w-full">
              <div className="pointer-events-auto flex items-center gap-2">
                {/* 극장 모드 / 기본 화면 토글 버튼 */}
                <button
                  onClick={() => setIsTheaterMode((prev) => !prev)}
                  title={isTheaterMode ? '기본 화면으로 축소' : '대화면 극장 모드로 확대'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-bold backdrop-blur-md border border-neutral-700 transition shadow-lg hover:scale-105 active:scale-95"
                >
                  {isTheaterMode ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>기본 화면</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>극장 모드</span>
                    </>
                  )}
                </button>

                {/* 영상 정지 / 포스터 보기 버튼 */}
                <button
                  onClick={() => setIsPlayingTrailer(false)}
                  title="영상 멈추고 포스터 보기"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-bold backdrop-blur-md border border-neutral-700 transition shadow-lg hover:scale-105 active:scale-95"
                >
                  <Film className="w-3.5 h-3.5 text-[#ff153c]" />
                  <span>영상 정지</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 상단 미디어 영역 (예고편 영상 플레이어 또는 백드롭) */}
        <div className="relative w-full flex-shrink-0 bg-black flex items-center justify-center overflow-hidden">
          {isPlayingTrailer && currentVideoKey ? (
            <div
              className="w-full aspect-video mx-auto relative flex items-center justify-center bg-black transition-all duration-300"
              style={{
                maxHeight: isTheaterMode ? '70vh' : '52vh',
                maxWidth: isTheaterMode ? 'calc(70vh * 16 / 9)' : 'calc(52vh * 16 / 9)',
              }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentVideoKey}?autoplay=1&rel=0&controls=1&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1`}
                title={currentVideo?.name || item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0 block"
              />
            </div>
          ) : (
            <div className="relative aspect-[16/9] w-full max-h-[50vh] bg-black overflow-hidden">
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
                {currentVideoKey ? (
                  <button
                    onClick={() => {
                      setIsPlayingTrailer(true);
                      setIsTheaterMode(true);
                    }}
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
            </div>
          )}
        </div>

        {/* 하단 모달 정보 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 custom-scrollbar bg-[#141517]">
          {/* 가용 비디오 클립 선택 바 (2개 이상인 경우) */}
          {availableVideos.length > 1 && (
            <div className="bg-neutral-900/90 p-3 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#ff153c]" />
                  <span>영상 클립 선택 ({availableVideos.length}개)</span>
                </span>
                <span className="text-[11px] text-neutral-400">클릭 시 해당 영상 재생</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {availableVideos.map((vid) => (
                  <button
                    key={vid.key}
                    onClick={() => {
                      setSelectedVideoKey(vid.key);
                      setIsPlayingTrailer(true);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      currentVideoKey === vid.key
                        ? 'bg-[#ff153c] text-white shadow-md'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700/60'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span className="truncate max-w-[220px]">{vid.name || vid.type}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 타이틀 및 메타 정보 */}
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
