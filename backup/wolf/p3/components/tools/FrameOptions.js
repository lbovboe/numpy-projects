import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

export default function FrameOptions({
  list,
  setActiveIndex,
  activeIndex,
  className = "py-[12px]",
}) {
  if (list) {
    return (
      <div
        className={`flex justify-center whitespace-nowrap rounded-[10px] border border-solid border-border-color ${className}`}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          className={`!mr-0 !ml-0 !px-[20px]`}
        >
          {list.map((v, i) => (
            <SwiperSlide key={i} className={`cursor-pointer !w-fit`}>
              <div className="flex items-center gap-x-[10px]">
                <div
                  className={`${className} ${
                    activeIndex === i
                      ? "text-sec-color"
                      : "text-pri-color hover:text-sec-color"
                  }`}
                  onClick={() => setActiveIndex(i)}
                >
                  {v}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
}
