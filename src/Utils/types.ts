export interface UserData {
  username: string;
  full_name: string;
  biography: string;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  media_count: number;
  follower_count: number;
  following_count: number;
  is_private: boolean;
  bio_links?: Array<{
    url: string;
    title: string;
  }>;
}

export interface ProfileOwnerData {
  username: string;
  is_verified: boolean;
  profile_pic_url_hd?: string;
  media_count: number;
  follower_count: number;
  following_count: number;
  full_name: string;
  biography: string;
  bio_links?: {
    url: string;
    title: string;
  }[];
  is_private: boolean;
  total_igtv_videos?: number;
}

export interface VideoData {
  video_url: string;
  id: string;
  user: {
    username: string;
    profile_pic_url: string;
  };
}
