import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { useState, useRef } from "react";
import Frame from "../../tools/Frame";
import ImageTextButtonList from "../sharedButtonCards/ImageTextButtonList";

export default function HotProducts({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef(null);

  return (
    data &&
    data.length > 0 && (
      <Frame
        title="熱門產品"
        iconName="icon_product"
        isSwiper ={true}
        options={
          <div className="flex items-center overflow-hidden pl-[19px] ">
            <Swiper
              spaceBetween={0}
              ref={swiperRef}
              slidesPerView={"auto"}
              className="!mr-0 !ml-0"
            >
              {data.map((v, i) => (
                <SwiperSlide
                  key={i}
                  className={`cursor-pointer !w-fit`}
                >
                  <div
                    className={`h-[30px] rounded-[10px] flex items-center justify-center group text-pri-color `}
                    onClick={() => setActiveIndex(i)}
                  >
                    <span className={`${activeIndex === i ? "font-semibold " : "hover:font-semibold"}`}>
                      {v.title}
                    </span>
                    {i !== data?.length - 1 && <span className="px-[14px]">/</span>}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        }
      >
        {data?.[activeIndex]?.products && <ImageTextButtonList data={data[activeIndex].products} />}
      </Frame>
    )
  );
}
