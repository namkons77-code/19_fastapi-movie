import React, { useState } from 'react';
import { Tv, Play, Radio, Volume2 } from 'lucide-react';
import type { LiveChannel } from '../types';
import { LIVE_CHANNELS } from '../data/tvingData';

export const LiveChannels: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<LiveChannel>(LIVE_CHANNELS[0]);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-8 lg:px-12 max-w-[1800px] mx-auto text-white">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-[#ff153c]/10 text-[#ff153c] border border-[#ff153c]/30">
          <Radio className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">실시간 라이브 TV</h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            지금 가장 뜨거운 방송을 실시간으로 시청하세요
          </p>
        </div>
      </div>

      {/* 대형 라이브 프리뷰 플레이어 (선택된 채널) */}
      {selectedChannel && (
        <div className="mb-10 bg-[#141517] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
          <div className="relative aspect-[21/9] min-h-[300px] sm:min-h-[420px] w-full bg-black flex items-center justify-center overflow-hidden">
            <img
              src={selectedChannel.thumbnail}
              alt={selectedChannel.current_program}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141517] via-black/20 to-transparent" />

            {/* LIVE 배지 및 채널 로고 */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <span className="px-3 py-1 bg-[#ff153c] text-white text-xs font-black rounded-full flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                ON AIR
              </span>
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-neutral-200 border border-neutral-700">
                CH {selectedChannel.channel_number} {selectedChannel.channel_name}
              </span>
            </div>

            {/* 가운데 재생 버튼 */}
            <button
              onClick={() => alert(`CH ${selectedChannel.channel_number} ${selectedChannel.channel_name} 실시간 고화질 스트림을 재생합니다.`)}
              className="group/play w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ff153c] text-white flex items-center justify-center shadow-2xl transition hover:scale-110 active:scale-95 z-20"
            >
              <Play className="w-8 h-8 fill-white ml-1" />
            </button>

            {/* 하단 방송 정보 오버레이 */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-bold text-[#ff153c] mb-1">
                  {selectedChannel.badge} · 실시간 시청률 {selectedChannel.viewer_rating}
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
                  {selectedChannel.current_program}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1 flex items-center gap-2">
                  <span className="text-neutral-400">다음 방송:</span>
                  <span>{selectedChannel.next_program}</span>
                </p>
              </div>

              {/* 화질 안내 */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 bg-black/50 px-3 py-1.5 rounded-full border border-neutral-800">
                <Volume2 className="w-4 h-4 text-neutral-300" />
                <span>Full HD 1080p 지원</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 실시간 채널 편성 그리드 카드 리스트 */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-neutral-200">
          <Tv className="w-5 h-5 text-[#ff153c]" />
          <span>전체 실시간 채널 편성표</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LIVE_CHANNELS.map((channel) => {
            const isSelected = selectedChannel?.id === channel.id;
            return (
              <div
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-neutral-900 border-[#ff153c] shadow-lg scale-[1.01]'
                    : 'bg-[#141517] border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-black text-white"
                      style={{ backgroundColor: channel.channel_color }}
                    >
                      {channel.channel_logo}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {channel.channel_name}
                    </span>
                    <span className="text-xs text-neutral-400">
                      CH {channel.channel_number}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-[#ff153c]">
                    {channel.viewer_rating}
                  </span>
                </div>

                {/* 현재 방송 프로그램 */}
                <div className="mb-3">
                  <p className="text-base font-bold text-neutral-100 truncate">
                    {channel.current_program}
                  </p>
                  <p className="text-xs text-neutral-400 truncate mt-0.5">
                    다음: {channel.next_program}
                  </p>
                </div>

                {/* 방송 진행률 프로그레스 바 */}
                <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ff153c] rounded-full transition-all duration-300"
                    style={{ width: `${channel.progress_percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
