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

export default function FacebookVideoView({ profile, embeds }: Props) {
  const defaultFacebookVideos = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.FacebookVideo && item.size === EmbedSize.Default
  );

  const largeFacebookVideos = embeds.filter(
    (item) =>
      item.embed_type === EmbedType.FacebookVideo && item.size === EmbedSize.Large
  );

  if (![...defaultFacebookVideos, ...largeFacebookVideos].length) return null;

  return (
    <div className="flex flex-col gap-4">
      {defaultFacebookVideos.length > 0 && (
        <Carousel
          title="FacebookVideos"
          color={profile.text_color}
          slidesPerView={1.62}
          prevElNavId="facebook-video-prev"
          nextElNavId="facebook-video-next"
        >
          {defaultFacebookVideos
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <SwiperSlide key={`facebook-video-${item.id}`}>
                <div className="rounded-md overflow-hidden" dangerouslySetInnerHTML={{ __html: item.embed_code }} />
              </SwiperSlide>
            ))}
        </Carousel>
      )}
      {largeFacebookVideos.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          {largeFacebookVideos
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((item) => (
              <div
               className="rounded-md overflow-hidden"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
                key={`facebook-video-${item.id}`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
