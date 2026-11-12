import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Film, Tv, Star } from 'lucide-react';
import type { MediaItem } from '../types';
import { searchMedia } from '../api/client';
import { POPULAR_KEYWORDS } from '../data/tvingData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      searchMedia(query.trim())
        .then((data) => {
          setResults(data);
        })
        .catch((err) => {
          console.error('Search error:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // ESC 키 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-xl overflow-y-auto animate-fade-in text-white">
      {/* 헤더 & 검색창 컨테이너 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-6">
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-3 flex-1 mr-4">
            <Search className="w-6 h-6 sm:w-7 sm:h-7 text-[#ff153c]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="제목, 인물, 장르를 검색해보세요"
              className="w-full bg-transparent text-xl sm:text-2xl font-bold text-white placeholder-neutral-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition"
          >
            닫기
          </button>
        </div>

        {/* 검색어가 없을 때: 실시간 인기 검색어 */}
        {!query.trim() && (
          <div className="mt-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[#ff153c] font-bold text-base">
                <TrendingUp className="w-5 h-5" />
                <span>실시간 인기 검색어</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {POPULAR_KEYWORDS.map((keyword, idx) => (
                  <button
                    key={keyword}
                    onClick={() => setQuery(keyword)}
                    className="flex items-center gap-4 p-3 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 text-left transition group border border-neutral-800/60"
                  >
                    <span className="w-5 text-center font-black text-sm text-[#ff153c]">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-neutral-200 group-hover:text-white flex-1 truncate">
                      {keyword}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 로딩 인디케이터 */}
        {loading && (
          <div className="py-20 text-center text-neutral-400 text-sm">
            검색 결과를 불러오는 중입니다...
          </div>
        )}

        {/* 검색 결과 표시 */}
        {!loading && query.trim() && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-neutral-300 mb-4">
              '{query}' 검색 결과 ({results.length}건)
            </h3>

            {results.length === 0 ? (
              <div className="py-20 text-center text-neutral-400 space-y-2">
                <p className="text-base font-semibold">검색 결과가 없습니다.</p>
                <p className="text-xs text-neutral-500">
                  단어의 철자가 정확한지 확인하거나 다른 검색어로 다시 시도해보세요.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.map((item) => (
                  <div
                    key={`${item.media_type}-${item.id}`}
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="cursor-pointer group bg-neutral-900/80 rounded-lg overflow-hidden border border-neutral-800 hover:border-neutral-600 transition"
                  >
                    <div className="aspect-[2/3] w-full bg-neutral-800 overflow-hidden relative">
                      {item.poster_url || item.backdrop_url ? (
                        <img
                          src={item.poster_url || item.backdrop_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-2 text-center text-xs text-neutral-500">
                          {item.title}
                        </div>
                      )}
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white flex items-center gap-1">
                        {item.media_type === 'tv' ? <Tv className="w-3 h-3" /> : <Film className="w-3 h-3" />}
                        <span>{item.media_type === 'tv' ? '시리즈' : '영화'}</span>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-sm font-semibold text-neutral-200 group-hover:text-[#ff153c] transition-colors truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-400 mt-1">
                        <span className="flex items-center gap-1 text-amber-400 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {item.vote_average.toFixed(1)}
                        </span>
                        <span>{item.release_date?.split('-')[0]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
