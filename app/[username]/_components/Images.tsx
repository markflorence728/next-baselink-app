"client side";

import React from "react";
import classNames from "classnames";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { ImageItem, ImageSize, UserProfile } from "@/app/_lib/types/user";

import "swiper/css";
import Carousel from "@/app/_lib/components/Carousel";
import { Tooltip } from "react-tooltip";

function ImageItemView({
  profile,
  image,
}: {
  profile: UserProfile;
  image: ImageItem;
}) {
  const width =
    image.size === ImageSize.Small
      ? 110
      : image.size === ImageSize.Large
      ? 550
      : 325;
  const height =
    image.size === ImageSize.Small
      ? 110
      : image.size === ImageSize.Large
      ? 310
      : 183;

  return (
    <div className="flex flex-col gap-1" style={{ width: `${width}px` }}>
      <Image
        className={classNames(`rounded-md object-cover`)}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        src={image.image}
        alt={image.title || ""}
        width={width}
        height={height}
      />
      <p
        className="ont-bold overflow-hidden whitespace-nowrap text-ellipsis text-left"
        data-tooltip-id={`image-${image.id}`}
      >
        {image.title}
      </p>
      <Tooltip
        id={`image-${image.id}`}
        className="max-w-xl"
        content={image.title ?? ""}
      />
    </div>
  );
}

type Props = {
  profile: UserProfile;
  images: ImageItem[];
};

export default function ImagesView({ profile, images }: Props) {
  const smallImages = images.filter((image) => image.size === ImageSize.Small);
  const largeImages = images.filter((image) => image.size === ImageSize.Large);
  const defaultImages = images.filter(
    (image) => image.size !== ImageSize.Small && image.size !== ImageSize.Large
  );

  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {smallImages.length > 0 && (
        <div id="small-images">
          <Carousel
            title="Small Images"
            color={profile.text_color}
            slidesPerView={4}
            prevElNavId="sm-image-prev"
            nextElNavId="sm-image-next"
          >
            {smallImages
              .sort((a, b) => (a.priority || 10) - (b.priority || 10))
              .map((image) => (
                <SwiperSlide key={`image-${image.id}`}>
                  <ImageItemView profile={profile} image={image} />
                </SwiperSlide>
              ))}
          </Carousel>
        </div>
      )}
      {defaultImages.length > 0 && (
        <div id="default-images">
          <Carousel
            title="Default Images"
            color={profile.text_color}
            prevElNavId="md-image-prev"
            nextElNavId="md-image-next"
          >
            {defaultImages
              .sort((a, b) => (a.priority || 10) - (b.priority || 10))
              .map((image) => (
                <SwiperSlide key={`image-${image.id}`}>
                  <ImageItemView profile={profile} image={image} />
                </SwiperSlide>
              ))}
          </Carousel>
        </div>
      )}
      {largeImages.length > 0 && (
        <div id="large-images" className="flex flex-col items-center gap-2">
          <p>Large Images</p>
          {largeImages
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((image) => (
              <ImageItemView
                profile={profile}
                image={image}
                key={`image-${image.id}`}
              />
            ))}
        </div>
      )}
    </div>
  );
}
