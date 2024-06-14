import React from "react";
import classNames from "classnames";
import {
  EmbedItem,
  EmbedSize,
  EmbedType,
  UserProfile,
} from "@/app/_lib/types/user";
import { SwiperSlide } from "swiper/react";
import Carousel from "@/app/_lib/components/Carousel";

type Props = {
  profile: UserProfile;
  embeds: EmbedItem[];
};

export default function SpotifyView({ profile, embeds }: Props) {
  const defaultSpotifies = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.Spotify && item.size === EmbedSize.Default
  );

  const largeSpotifies = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.Spotify && item.size === EmbedSize.Large
  );

  if (![...defaultSpotifies, ...largeSpotifies].length) return null;

  return (
    <div className="flex flex-col gap-4">
      {defaultSpotifies.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {defaultSpotifies
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <div
               className="rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
                key={`spotify-${item.id}`}
              />
            ))}
        </div>
      )}
      {largeSpotifies.length > 0 && (
        <Carousel
          title="Spotifies"
          color={profile.text_color}
          slidesPerView={1.3}
          prevElNavId="spotify-prev"
          nextElNavId="spotify-next"
        >
          {largeSpotifies
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <SwiperSlide key={`spotify-${item.id}`}>
                <div
                 className="rounded-md overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: item.embed_code }}
                />
              </SwiperSlide>
            ))}
        </Carousel>
      )}
      {/* {largeSpotifies.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {largeSpotifies
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <div
               className="rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
                key={`spotify-${item.id}`}
              />
            ))}
        </div>
      )} */}
    </div>
  );
}
