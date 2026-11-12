import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Sparkles } from 'lucide-react';

export type NavTab = 'home' | 'series' | 'movies' | 'live' | 'global';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#000000]/95 backdrop-blur-md shadow-2xl border-b border-neutral-900'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* 좌측 로고 및 메뉴 */}
        <div className="flex items-center gap-8 lg:gap-12">
          {/* 브랜드 로고 */}
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center gap-1 focus:outline-none group select-none"
          >
            <span className="text-[#ff153c] font-black text-2xl sm:text-3xl tracking-tighter">
              CINEFLIX
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff153c] mb-2.5 animate-pulse" />
          </button>

          {/* 메인 메뉴 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] sm:text-base font-semibold">
            <button
              onClick={() => onTabChange('home')}
              className={`transition-colors relative py-1 ${
                currentTab === 'home'
                  ? 'text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              홈
              {currentTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff153c] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onTabChange('series')}
              className={`transition-colors relative py-1 ${
                currentTab === 'series'
                  ? 'text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              시리즈
              {currentTab === 'series' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff153c] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onTabChange('movies')}
              className={`transition-colors relative py-1 ${
                currentTab === 'movies'
                  ? 'text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              영화
              {currentTab === 'movies' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff153c] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onTabChange('live')}
              className={`transition-colors relative py-1 flex items-center gap-1.5 ${
                currentTab === 'live'
                  ? 'text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              라이브
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff153c] inline-block animate-ping" />
              {currentTab === 'live' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff153c] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onTabChange('global')}
              className={`transition-colors relative py-1 flex items-center gap-1 ${
                currentTab === 'global'
                  ? 'text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="text-[#0064ff] font-black italic mr-0.5">TOP</span>
              <span>글로벌 관</span>
              {currentTab === 'global' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0064ff] rounded-full" />
              )}
            </button>
          </nav>
        </div>

        {/* 우측 유틸리티 영역 */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* 멤버십 버튼 */}
          <button className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 transition">
            <Sparkles className="w-3.5 h-3.5 text-[#ff153c]" />
            <span>멤버십</span>
          </button>

          {/* 검색 버튼 */}
          <button
            onClick={onOpenSearch}
            aria-label="콘텐츠 검색"
            className="p-2 text-neutral-300 hover:text-white transition rounded-full hover:bg-neutral-800/80"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* 알림 버튼 */}
          <button
            aria-label="알림"
            className="p-2 text-neutral-300 hover:text-white transition rounded-full hover:bg-neutral-800/80 hidden sm:block"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* 프로필 아이콘 */}
          <div className="flex items-center gap-2 pl-1 sm:pl-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#ff153c] to-neutral-700 flex items-center justify-center text-white cursor-pointer hover:ring-2 hover:ring-[#ff153c] transition">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
