import React from 'react';
import { X, Play, Sparkles, Calendar, Radio } from 'lucide-react';
import type { ShortcutItem } from './QuickShortcutBar';

interface ShortcutModalProps {
  item: ShortcutItem | null;
  onClose: () => void;
}

export const ShortcutModal: React.FC<ShortcutModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-[#141517] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 text-white p-6 sm:p-8 space-y-6">
        {/* 상단 닫기 */}
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 아이콘 및 타이틀 */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
            {item.renderIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black">{item.title}</h2>
              {item.hasNewBadge && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-[#ff153c] text-white">
                  NEW
                </span>
              )}
            </div>
            <p className="text-xs text-[#ff153c] font-semibold mt-0.5">
              스페셜 테마 큐레이션
            </p>
          </div>
        </div>

        {/* 설명 */}
        <p className="text-sm text-neutral-300 leading-relaxed bg-neutral-900/80 p-4 rounded-xl border border-neutral-800">
          {item.description}
        </p>

        {/* 콘텐츠 상세 안내 카드 */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            주요 서비스 및 편성 안내
          </h3>

          <div className="grid grid-cols-1 gap-2.5 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <Radio className="w-4 h-4 text-[#ff153c]" />
              <span>Full HD 초고화질 실시간 라이브 & 다시보기 VOD 무제한</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>경기 일정 및 매치 하이라이트 실시간 알림 서비스</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>CINEFLIX 회원 전용 특별 라이브 챗 및 팬 응원존 참여</span>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="pt-2">
          <button
            onClick={() => {
              alert(`'${item.title}' 전용 페이지로 이동합니다.`);
              onClose();
            }}
            className="w-full py-3.5 rounded-xl bg-[#ff153c] hover:bg-[#e5092b] text-white font-extrabold text-sm sm:text-base transition duration-200 shadow-lg flex items-center justify-center gap-2 active:scale-98"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>지금 바로 시청하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
