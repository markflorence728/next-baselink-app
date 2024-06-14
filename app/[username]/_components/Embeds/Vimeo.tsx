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

export default function VimeoView({ profile, embeds }: Props) {
  const defaultVimeos = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.Vimeo && item.size === EmbedSize.Default
  );

  const largeVimeos = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.Vimeo && item.size === EmbedSize.Large
  );

  if (![...defaultVimeos, ...largeVimeos].length) return null;

  return (
    <div className="flex flex-col gap-4">
      {defaultVimeos.length > 0 && (
        <Carousel
          title="Vimeos"
          color={profile.text_color}
          slidesPerView={1.62}
          prevElNavId="vimeo-prev"
          nextElNavId="vimeo-next"
        >
          {defaultVimeos
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <SwiperSlide key={`vimeo-${item.id}`}>
                <div
                 className="rounded-md overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: item.embed_code }}
                />
              </SwiperSlide>
            ))}
        </Carousel>
      )}
      {largeVimeos.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {largeVimeos
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <div
               className="rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
                key={`vimeo-${item.id}`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
