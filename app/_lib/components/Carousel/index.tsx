import { Swiper } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import "swiper/css";
import "./styles.css";

type Props = {
  title?: string;
  color?: string;
  slidesPerView?: number;
  prevElNavId?: string;
  nextElNavId?: string;
  children: React.ReactNode[];
};

export default function Carousel({
  title,
  color,
  slidesPerView,
  prevElNavId,
  nextElNavId,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-2" style={{ color: color }}>
      <div className="flex items-center justify-between">
        <p></p>
        {prevElNavId && nextElNavId && (
          <div className="flex gap-4">
            <button className={prevElNavId}>
              <FaAngleLeft />
            </button>
            <button className={nextElNavId}>
              <FaAngleRight />
            </button>
          </div>
        )}
      </div>
      <Swiper
        slidesPerView={slidesPerView || "auto"}
        spaceBetween={30}
        freeMode={true}
        navigation={
          prevElNavId && nextElNavId
            ? {
                nextEl: `.${nextElNavId}`,
                prevEl: `.${prevElNavId}`,
              }
            : true
        }
        modules={[FreeMode, Navigation]}
        className="mySwiper"
      >
        {children}
      </Swiper>
    </div>
  );
}
