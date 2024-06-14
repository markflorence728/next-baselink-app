export type UserProfile = {
  id: number;
  display_name: string;
  industry: string;
  description: string;
  image: string;
  legal_url: string;
  background_color: string;
  text_color: string;
  button_color: string;
  button_text_color: string;
};

export type PlatformKeys = 
  | 'Instagram'
  | 'Threads'
  | 'TikTok'
  | 'YouTube'
  | 'Website'
  | 'LinkedIn'
  | 'X'
  | 'Facebook'
  | 'Podcast'
  | 'Spotify'
  | 'Apple Podcasts'
  | 'Github'
  | 'Pinterest'
  | 'Google Podcasts'
  | 'Amazon Music'
  | 'Soundcloud'
  | 'Substack'
  | 'Medium'
  | 'Stack Exchange'
  | 'Trustpilot'
  | 'Yahoo Finance'
  | 'Google Play'
  | 'Apple Store'
  | 'iTunes'
  | 'Yelp';

export type SocialPlatform = {
  id: number;
  url: string;
  platform: PlatformKeys;
  priority: number | null;
};

export type ButtonItem = {
  id: number;
  title: string;
  priority: number | null;
  url: string;
  image: string;
};

export enum ImageSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export type ImageItem = {
  id: number;
  image: string;
  priority: number | null;
  title: string | null;
  size: ImageSize;
};

export enum EmbedType {
  YouTube = "YouTube",
  Vimeo = "Vimeo",
  FacebookVideo = "Facebook Video",
  Spotify = "Spotify",
  Soundcloud = "Soundcloud",
  Calendly = "Calendly",
}

export enum EmbedSize {
  Default = "Default",
  Large = "Large",
}

export type EmbedItem = {
  id: number;
  url: string;
  embed_type: EmbedType;
  priority: number | null;
  size: EmbedSize;
  embed_code: string;
};

export type ProductItem = {
  id: number;
  image: string | null;
  title: string;
  price: number;
  url: string | null;
  priority: number | null;
};

export type Section = {
  id: number;
  title: string;
  priority: number | null;
  buttons: ButtonItem[];
  images: ImageItem[];
  embeds: EmbedItem[];
  products: ProductItem[];
};

export type User = {
  id: number;
  email: string;
  username: string;
  userprofile: UserProfile;
  social_platforms: SocialPlatform[];
  sections: Section[];
};
