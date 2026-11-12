import axios from 'axios';
import type { HomeFeedResponse, MediaDetails, MediaItem, LiveChannel } from '../types';
import {
  HERO_BANNERS,
  TOP_20_RANKING,
  EXCLUSIVE_ORIGINALS,
  POPULAR_MOVIES,
  GLOBAL_EXCLUSIVE,
  LIVE_CHANNELS
} from '../data/tvingData';

const API_BASE = '/api';

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
});

export const fetchHomeFeed = async (): Promise<HomeFeedResponse> => {
  try {
    const response = await apiClient.get<HomeFeedResponse>('/media/home-feed');
    if (response.data && response.data.hero_banners?.length > 0) {
      return response.data;
    }
  } catch (err) {
    console.warn('Backend home-feed unavailable, using local fallback:', err);
  }

  // Fallback
  return {
    hero_banners: HERO_BANNERS,
    sections: [
      { id: 'top20', title: '실시간 인기 TOP 20', type: 'ranking', items: TOP_20_RANKING },
      { id: 'originals', title: '단독 오리지널 & 독점작', type: 'standard', items: EXCLUSIVE_ORIGINALS },
      { id: 'popular_movies', title: '지금 가장 많이 본 인기 영화', type: 'standard', items: POPULAR_MOVIES },
      { id: 'global', title: '글로벌 독점 컬렉션', type: 'standard', items: GLOBAL_EXCLUSIVE }
    ]
  };
};

export const fetchMoviesFeed = async (): Promise<HomeFeedResponse> => {
  try {
    const response = await apiClient.get<HomeFeedResponse>('/movies/feed');
    if (response.data && response.data.sections?.length > 0) {
      return response.data;
    }
  } catch (err) {
    console.warn('Backend movies-feed unavailable, using local fallback:', err);
  }

  return {
    hero_banners: POPULAR_MOVIES,
    sections: [
      { id: 'movie_top', title: '현재 가장 사랑받는 영화 TOP 10', type: 'ranking', items: TOP_20_RANKING.filter(it => it.media_type === 'movie') },
      { id: 'movie_now', title: '극장에서 바로 온 화제의 최신 개봉작', type: 'standard', items: POPULAR_MOVIES },
      { id: 'movie_action', title: '스펙터클 액션 & 블록버스터 컬렉션', type: 'standard', items: POPULAR_MOVIES }
    ]
  };
};

export const fetchTvFeed = async (): Promise<HomeFeedResponse> => {
  try {
    const response = await apiClient.get<HomeFeedResponse>('/tv/feed');
    if (response.data && response.data.sections?.length > 0) {
      return response.data;
    }
  } catch (err) {
    console.warn('Backend tv-feed unavailable, using local fallback:', err);
  }

  return {
    hero_banners: EXCLUSIVE_ORIGINALS,
    sections: [
      { id: 'tv_top', title: '실시간 인기 시리즈 TOP 10', type: 'ranking', items: TOP_20_RANKING.filter(it => it.media_type === 'tv') },
      { id: 'tv_orig', title: '단독 오리지널 시리즈', type: 'standard', items: EXCLUSIVE_ORIGINALS },
      { id: 'tv_global', title: '글로벌 인기 시리즈', type: 'standard', items: GLOBAL_EXCLUSIVE }
    ]
  };
};

export const fetchLiveChannels = async (): Promise<LiveChannel[]> => {
  try {
    const response = await apiClient.get<LiveChannel[]>('/live/channels');
    if (response.data && response.data.length > 0) {
      return response.data;
    }
  } catch (err) {
    console.warn('Backend live-channels unavailable, using local fallback:', err);
  }
  return LIVE_CHANNELS;
};

export const fetchMediaDetails = async (mediaType: 'movie' | 'tv', id: number): Promise<MediaDetails> => {
  try {
    const response = await apiClient.get<MediaDetails>(`/media/details/${mediaType}/${id}`);
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    console.warn('Backend details unavailable, using local fallback:', err);
  }

  const allItems = [...HERO_BANNERS, ...TOP_20_RANKING, ...EXCLUSIVE_ORIGINALS, ...POPULAR_MOVIES, ...GLOBAL_EXCLUSIVE];
  const found = allItems.find((i) => i.id === id) || allItems[0];
  const similar = allItems.filter((i) => i.id !== id).slice(0, 4);

  return {
    ...found,
    runtime: found.media_type === 'movie' ? 128 : 65,
    number_of_seasons: found.media_type === 'tv' ? 2 : undefined,
    cast: [
      { id: 1, name: "김수현", character: "백현우", profile_url: "https://image.tmdb.org/t/p/w185/8d1hU3mJ93J51a7w6T9d4y9U0zX.jpg" },
      { id: 2, name: "김지원", character: "홍해인", profile_url: "https://image.tmdb.org/t/p/w185/fW9k1hYq9xHh4Z0Yp4Xp2P4Zk0K.jpg" },
      { id: 3, name: "변우석", character: "류선재", profile_url: "https://image.tmdb.org/t/p/w185/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg" },
      { id: 4, name: "김혜윤", character: "임솔", profile_url: "https://image.tmdb.org/t/p/w185/stKGOm8wToLQIYXj625Ym6Fg82U.jpg" }
    ],
    videos: found.trailer_key
      ? [{ key: found.trailer_key, name: "공식 메인 예고편", site: "YouTube", type: "Trailer" }]
      : [{ key: "dQw4w9WgXcQ", name: "공식 티저", site: "YouTube", type: "Trailer" }],
    similar
  };
};

export const searchMedia = async (query: string): Promise<MediaItem[]> => {
  if (!query.trim()) return [];
  try {
    const response = await apiClient.get<MediaItem[]>('/media/search', {
      params: { query },
    });
    if (response.data && response.data.length > 0) {
      return response.data;
    }
  } catch (err) {
    console.warn('Backend search unavailable, using local fallback:', err);
  }

  const q = query.toLowerCase().trim();
  const allItems = [...HERO_BANNERS, ...TOP_20_RANKING, ...EXCLUSIVE_ORIGINALS, ...POPULAR_MOVIES, ...GLOBAL_EXCLUSIVE];
  const uniqueMap = new Map<number, MediaItem>();
  allItems.forEach((it) => {
    if (!uniqueMap.has(it.id)) uniqueMap.set(it.id, it);
  });

  return Array.from(uniqueMap.values()).filter((it) =>
    it.title.toLowerCase().includes(q) ||
    (it.original_title && it.original_title.toLowerCase().includes(q)) ||
    (it.overview && it.overview.toLowerCase().includes(q))
  );
};
