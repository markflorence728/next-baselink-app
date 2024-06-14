"client side";

import React from "react";
import classNames from "classnames";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { Tooltip } from "react-tooltip";
import { ProductItem, UserProfile } from "@/app/_lib/types/user";

import "swiper/css";
import Carousel from "@/app/_lib/components/Carousel";

const defaultProductImage = "/images/product.jpeg";

function ProductItemView({
  profile,
  product,
}: {
  profile: UserProfile;
  product: ProductItem;
}) {
  const formattedPriceIntl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price);

  return (
    <div className="flex flex-col gap-1" style={{ width: `200px` }}>
      <Image
        className={classNames(`rounded-md object-cover`)}
        style={{
          width: `200px`,
          height: `200px`,
        }}
        src={product.image || defaultProductImage}
        alt={product.title || ""}
        width={200}
        height={200}
      />
      <p
        className="font-bold overflow-hidden whitespace-nowrap text-ellipsis text-left"
        data-tooltip-id={`product-${product.id}`}
      >
        {product.title}
      </p>
      <p className="text-left">{formattedPriceIntl}</p>
      <Tooltip
        id={`product-${product.id}`}
        className="max-w-xl"
        content={product.title}
      />
    </div>
  );
}

type Props = {
  profile: UserProfile;
  products: ProductItem[];
};

export default function ProductsView({ profile, products }: Props) {
  if (!products.length) return null;

  return (
    <div className="flex flex-col gap-2">
      {products.length > 0 && (
        <Carousel
          title="Products"
          color={profile.text_color}
          slidesPerView={2.5}
          prevElNavId="product-prev"
          nextElNavId="product-next"
        >
          {products
            .sort((a, b) => (a.priority || 10) - (b.priority || 10))
            .map((product) => (
              <SwiperSlide key={`product-${product.id}`}>
                <ProductItemView profile={profile} product={product} />
              </SwiperSlide>
            ))}
        </Carousel>
      )}
    </div>
  );
}
