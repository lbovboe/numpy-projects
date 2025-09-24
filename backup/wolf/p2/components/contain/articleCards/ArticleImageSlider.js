import LazyImage from "../../tools/lazy_image";
import { changeDateFormat } from "../../../public/scripts/publicFunction";
import { useState } from "react";

export default function ArticleImageSlider({ data, type }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {data && data?.length > 0 && (
        <div className="max12:flex max12:flex-wrap grid grid-cols-[524px_1fr] gap-[20px] mb-[20px]">
          {/* Left side - single active image */}
          <div className="w-[524px] h-[395px] relative top-0">
            <a
              href={`${
                type === "video" && data[activeIndex]?.video_id
                  ? `/video/${data[activeIndex]?.id}-${data[activeIndex]?.video_id}.html`
                  : type === "video"
                  ? `/video/${data[activeIndex]?.article_id}-${data[activeIndex]?.ID}.html`
                  : `/news/${data[activeIndex]?.id}.html`
              }`}
            >
              <LazyImage
                src={data[activeIndex]?.image}
                width={524}
                height={395}
                className="rounded-[10px] overflow-hidden shrink-0"
              />
              {(data[activeIndex]?.is_hot || data[activeIndex]?.important) && (
                <LazyImage
                  src={"/images/hot_icon.png"}
                  width={20}
                  height={20}
                  className="absolute h-[20px] w-[20px] top-[5px] left-[5px]"
                />
              )}
              {type === "video" && (
                <svg className="absolute h-[30px] w-[30px] fill-white left-1/2 top-1/2 translate-x-[-15px] translate-y-[-15px]">
                  <use href="#play-icon"></use>
                </svg>
              )}
            </a>
          </div>

          {/* Right side - all article info */}
          <div className="flex flex-col">
            {data?.map((article, i) => {
              return (
                <div key={i}>
                  <a
                    href={`${
                      type === "video" && article?.video_id
                        ? `/video/${article?.id}-${article?.video_id}.html`
                        : type === "video"
                        ? `/video/${article?.article_id}-${article?.ID}.html`
                        : `/news/${article?.id}.html`
                    }`}
                    className={`group relative flex flex-col gap-[9px] rounded-[10px]`}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <p className={`line-clamp-1 leading-[24px] group-hover:text-pri-color text-[16px]`}>
                      {article?.title}
                    </p>
                    <div className={`flex items-center justify-between text-[12px] leading-[17px]`}>
                      <p className="truncate bg-border-color py-[4px] text-pri-color text-center rounded-[8px] text-[12px] px-[12px]">
                        來源：{article.source || "網友提供"}
                      </p>
                      <div className="flex items-center gap-x-[4px]">
                        <div className="h-[17px] w-[17px]">
                          <LazyImage
                            src={"/images/calendar-icon.png"}
                            width={17}
                            height={17}
                          ></LazyImage>
                        </div>
                        <p className="truncate text-[12px]">
                          {changeDateFormat(article.updated_at || article.published_at, "yyyy-MM-dd")}
                        </p>
                      </div>
                    </div>
                  </a>
                  {i !== data?.length - 1 && <div className="h-[1px] bg-border-color mt-[15px] mb-[10px]"></div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
