import React, { useState, useEffect, useRef } from 'react';
import { Navbar, type NavTab } from './components/Navbar';
import { BannerHero } from './components/BannerHero';
import { QuickShortcutBar, type ShortcutItem } from './components/QuickShortcutBar';
import { ShortcutModal } from './components/ShortcutModal';
import { TopRankingRow } from './components/TopRankingRow';
import { ContentRow } from './components/ContentRow';
import { DetailModal } from './components/DetailModal';
import { SearchModal } from './components/SearchModal';
import { LiveChannels } from './components/LiveChannels';
import { Footer } from './components/Footer';
import type { HomeFeedResponse, MediaItem } from './types';
import { fetchHomeFeed, fetchMoviesFeed, fetchTvFeed } from './api/client';
import { GLOBAL_EXCLUSIVE } from './data/tvingData';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [feedData, setFeedData] = useState<HomeFeedResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // 모달 상태
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [autoPlayTrailer, setAutoPlayTrailer] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedShortcut, setSelectedShortcut] = useState<ShortcutItem | null>(null);

  // 섹션 참조 (오리지널 바로가기용)
  const originalSectionRef = useRef<HTMLDivElement>(null);

  // 탭 변경 시 해당 피드 로딩
  useEffect(() => {
    if (currentTab === 'live' || currentTab === 'global') {
      setLoading(false);
      return;
    }

    setLoading(true);
    let fetchFn = fetchHomeFeed;
    if (currentTab === 'movies') fetchFn = fetchMoviesFeed;
    if (currentTab === 'series') fetchFn = fetchTvFeed;

    fetchFn()
      .then((data) => {
        setFeedData(data);
      })
      .catch((err) => {
        console.error('Error fetching feed data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentTab]);

  const handleOpenDetail = (item: MediaItem) => {
    setAutoPlayTrailer(false);
    setSelectedItem(item);
  };

  const handlePlay = (item: MediaItem) => {
    setAutoPlayTrailer(true);
    setSelectedItem(item);
  };

  const handleSelectShortcut = (shortcut: ShortcutItem) => {
    if (shortcut.id === 'original' && originalSectionRef.current) {
      originalSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSelectedShortcut(shortcut);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-[#ff153c] selection:text-white">
      {/* 고정 상단 네비게이션 헤더 */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1">
        {currentTab === 'live' ? (
          <LiveChannels />
        ) : currentTab === 'global' ? (
          <div>
            <BannerHero
              items={GLOBAL_EXCLUSIVE}
              onSelect={handleOpenDetail}
              onPlay={handlePlay}
            />

            {/* 티빙 스타일 원형 바로가기 퀵 메뉴 바 */}
            <QuickShortcutBar onSelectShortcut={handleSelectShortcut} />

            <div className="relative z-20 space-y-4 pb-12 mt-2">
              <div className="px-4 sm:px-8 lg:px-12 mb-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0064ff]/20 text-[#0064ff] border border-[#0064ff]/40 rounded-full text-xs font-bold">
                  <span>글로벌 프리미엄 컬렉션</span>
                </div>
              </div>

              <ContentRow
                title="글로벌 독점 오리지널 대작"
                items={GLOBAL_EXCLUSIVE}
                onSelect={handleOpenDetail}
                onPlay={handlePlay}
                aspectRatio="landscape"
              />

              <TopRankingRow
                title="글로벌 실시간 인기 순위"
                items={GLOBAL_EXCLUSIVE.map((it, idx) => ({ ...it, rank: idx + 1 }))}
                onSelect={handleOpenDetail}
                onPlay={handlePlay}
              />
            </div>
          </div>
        ) : loading ? (
          <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#ff153c] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-neutral-400">
              콘텐츠를 불러오는 중입니다...
            </p>
          </div>
        ) : feedData ? (
          <div>
            {/* 대형 히어로 배너 */}
            <BannerHero
              items={feedData.hero_banners}
              onSelect={handleOpenDetail}
              onPlay={handlePlay}
            />

            {/* 티빙 공식 원형 바로가기 퀵 메뉴 바 (KBO 리그, 100일의 거짓말, 오리지널 등 12개) */}
            <QuickShortcutBar onSelectShortcut={handleSelectShortcut} />

            {/* 본문 큐레이션 행 리스트 */}
            <div className="relative z-20 space-y-2 sm:space-y-4 pb-12 mt-2">
              {feedData.sections.map((section) => {
                if (section.type === 'ranking') {
                  return (
                    <TopRankingRow
                      key={section.id}
                      title={section.title}
                      items={section.items}
                      onSelect={handleOpenDetail}
                      onPlay={handlePlay}
                    />
                  );
                }

                const isOriginalSection = section.id.includes('orig');
                return (
                  <div
                    key={section.id}
                    ref={isOriginalSection ? originalSectionRef : undefined}
                  >
                    <ContentRow
                      title={section.title}
                      items={section.items}
                      onSelect={handleOpenDetail}
                      onPlay={handlePlay}
                      aspectRatio="poster"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </main>

      {/* 푸터 */}
      <Footer />

      {/* 티빙 퀵 바로가기 팝업 모달 */}
      <ShortcutModal
        item={selectedShortcut}
        onClose={() => setSelectedShortcut(null)}
      />

      {/* 상세 모달 & 트레일러 플레이어 */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSelectSimilar={(sim) => setSelectedItem(sim)}
        autoPlayTrailer={autoPlayTrailer}
      />

      {/* 검색 모달 */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={handleOpenDetail}
      />
    </div>
  );
};

export default App;
