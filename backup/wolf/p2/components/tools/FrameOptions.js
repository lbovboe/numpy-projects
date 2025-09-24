import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

export default function FrameOptions({
  list,
  setActiveIndex,
  activeIndex,
  className = "px-[10px] py-[5px]",
}) {
  if (list) {
    return (
      <div className={`whitespace-nowrap mt-[15px]`}>
        <Swiper
          spaceBetween={10}
          slidesPerView={"auto"}
          className={`!mr-0 !ml-0`}
        >
          {list.map((v, i) => (
            <SwiperSlide key={i} className={`cursor-pointer !w-fit`}>
              <div className="flex items-center gap-x-[10px]">
                <div
                  className={`rounded-[10px] ${className} border border-solid ${
                    activeIndex === i
                      ? "bg-pri-color text-white border-transparent"
                      : "hover:bg-sec-color hover:text-white border-border-color hover:border-transparent"
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
