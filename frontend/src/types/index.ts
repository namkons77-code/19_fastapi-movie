export interface MediaItem {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  backdrop_path?: string;
  backdrop_url?: string;
  poster_path?: string;
  poster_url?: string;
  media_type: 'movie' | 'tv';
  vote_average: number;
  release_date?: string;
  genres?: string[];
  popularity?: number;
  age_rating?: string;
  badge?: string;
  rank?: number;
  is_original?: boolean;
  tagline?: string;
  trailer_key?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_url?: string;
}

export interface VideoItem {
  key: string;
  name: string;
  type: string;
  site: string;
}

export interface MediaDetails extends MediaItem {
  cast?: CastMember[];
  videos?: VideoItem[];
  similar?: MediaItem[];
  runtime?: number;
  status?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

export interface ContentSection {
  id: string;
  title: string;
  type: 'ranking' | 'standard';
  items: MediaItem[];
}

export interface HomeFeedResponse {
  hero_banners: MediaItem[];
  sections: ContentSection[];
}

export interface LiveChannel {
  id: string;
  channel_name: string;
  channel_number: number;
  channel_logo: string;
  channel_color: string;
  current_program: string;
  next_program: string;
  viewer_rating: string;
  progress_percent: number;
  badge: string;
  thumbnail: string;
}
