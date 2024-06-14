import React from "react";
import classNames from "classnames";
import { SwiperSlide } from "swiper/react";
import {
  EmbedItem,
  EmbedSize,
  EmbedType,
  UserProfile,
} from "@/app/_lib/types/user";

import "swiper/css";
import Carousel from "@/app/_lib/components/Carousel";

type Props = {
  profile: UserProfile;
  embeds: EmbedItem[];
};

export default function YoutubeView({ profile, embeds }: Props) {
  const defaultYoutubes = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.YouTube && item.size === EmbedSize.Default
  );

  const largeYoutubes = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.YouTube && item.size === EmbedSize.Large
  );

  if (![...defaultYoutubes, ...largeYoutubes].length) return null;

  return (
    <div className="flex flex-col gap-4">
      {defaultYoutubes.length > 0 && (
        <Carousel
          title="Youtubes"
          color={profile.text_color}
          slidesPerView={1.62}
          prevElNavId="youtube-prev"
          nextElNavId="youtube-next"
        >
          {defaultYoutubes
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <SwiperSlide key={`youtube-${item.id}`}>
                <div
                  className="rounded-md overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: item.embed_code }}
                />
              </SwiperSlide>
            ))}
        </Carousel>
      )}
      {largeYoutubes.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {largeYoutubes
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <div
               className="rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
                key={`youtube-${item.id}`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
