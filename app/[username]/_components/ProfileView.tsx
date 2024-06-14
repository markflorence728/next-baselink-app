import React from "react";
import Image from "next/image";
import { BsSubstack } from "react-icons/bs";
import {
  FaInstagram,
  FaThreads,
  FaTiktok,
  FaYoutube,
  FaHouse,
  FaLinkedin,
  FaX,
  FaFacebook,
  FaPodcast,
  FaSpotify,
  FaGithub,
  FaPinterest,
  FaSoundcloud,
  FaMedium,
  FaStackExchange,
  FaYahoo,
  FaGooglePlay,
  FaApple,
  FaItunes,
  FaYelp,
  FaGoogle,
  FaAmazon,
  FaRegStar,
} from "react-icons/fa6";
import { SocialPlatform, UserProfile } from "@/app/_lib/types/user";

const defaultProfileImage = "/images/profile.jpg";

type Props = {
  username?: string;
  profile?: UserProfile;
  socialPlatforms?: SocialPlatform[];
};

export default async function ProfileView({
  username,
  profile,
  socialPlatforms,
}: Props) {
  const socialIcons = {
    Instagram: <FaInstagram color={profile?.text_color} size={24} />,
    Threads: <FaThreads color={profile?.text_color} size={24} />,
    TikTok: <FaTiktok color={profile?.text_color} size={24} />,
    YouTube: <FaYoutube color={profile?.text_color} size={24} />,
    Website: <FaHouse color={profile?.text_color} size={24} />,
    LinkedIn: <FaLinkedin color={profile?.text_color} size={24} />,
    X: <FaX color={profile?.text_color} size={24} />,
    Facebook: <FaFacebook color={profile?.text_color} size={24} />,
    Podcast: <FaPodcast color={profile?.text_color} size={24} />,
    Spotify: <FaSpotify color={profile?.text_color} size={24} />,
    "Apple Podcasts": <FaApple color={profile?.text_color} size={24} />,
    Github: <FaGithub color={profile?.text_color} size={24} />,
    Pinterest: <FaPinterest color={profile?.text_color} size={24} />,
    "Google Podcasts": <FaGoogle color={profile?.text_color} size={24} />,
    "Amazon Music": <FaAmazon color={profile?.text_color} size={24} />,
    Soundcloud: <FaSoundcloud color={profile?.text_color} size={24} />,
    Substack: <BsSubstack color={profile?.text_color} size={18} />,
    Medium: <FaMedium color={profile?.text_color} size={24} />,
    "Stack Exchange": <FaStackExchange color={profile?.text_color} size={24} />,
    Trustpilot: <FaRegStar color={profile?.text_color} size={24} />,
    "Yahoo Finance": <FaYahoo color={profile?.text_color} size={24} />,
    "Google Play": <FaGooglePlay color={profile?.text_color} size={24} />,
    "Apple Store": <FaApple color={profile?.text_color} size={24} />,
    iTunes: <FaItunes color={profile?.text_color} size={24} />,
    Yelp: <FaYelp color={profile?.text_color} size={24} />,
  };

  return (
    <section id="userinfo" className="flex flex-col items-center gap-4">
      <Image
        src={profile?.image || defaultProfileImage}
        alt={profile?.display_name || ""}
        className="dark:invert rounded-lg"
        width={200}
        height={200}
        priority
      />
      <p className="w-2/3 text-center text-2xl font-bold overflow-hidden whitespace-nowrap text-ellipsis">
        {profile?.display_name}
      </p>
      <p className="w-2/3 text-center text-base overflow-hidden whitespace-nowrap text-ellipsis">
        @ {username}
      </p>
      <p className="w-2/3 text-center">{profile?.description}</p>
      <div className="flex items-center justify-center flex-wrap gap-6 max-w-xs">
        {socialPlatforms
          ?.sort((a, b) => (a.priority || 10) - (b.priority || 10))
          ?.map((item) => (
            <a href={item.url} target="_blank" key={item.platform}>
              {item.platform in socialIcons ? socialIcons[item.platform] : null}
            </a>
          ))}
      </div>
    </section>
  );
}
