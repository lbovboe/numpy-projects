import LazyImage from "../../tools/lazy_image";
import { changeDateFormat } from "../../../public/scripts/publicFunction";
export default function ArticleImage({ data, type = "news", index = 0, size = "small" }) {
  return (
    <a
      href={`${
        type === "video" && data?.video_id
          ? `/video/${data?.id}-${data?.video_id}.html`
          : type === "video"
          ? `/video/${data?.article_id}-${data?.ID}.html`
          : `/news/${data?.id}.html`
      }`}
      className="group relative"
    >
      <div className={`relative ${size === "big" ? "w-[200px]" : "w-[216px]"}`}>
        <div className={`relative`}>
          <LazyImage
            src={data?.image}
            width={size === "big" ? 200 : 216}
            height={size === "big" ? 150 : 163}
            className="rounded-[10px] overflow-hidden shrink-0"
          />
          {(data?.is_hot || data?.important) && (
            <LazyImage
              src={"/images/hot_icon.png"}
              width={20}
              height={20}
              className="absolute h-[20px] w-[20px] top-[5px] left-[5px]"
            />
          )}
          {type === "video" && (
            <svg className="absolute h-[30px] w-[30px] fill-white left-1/2 top-1/2 translate-x-[-15px] translate-y-[-15px] group-hover:fill-pri-color">
              <use href="#play-icon"></use>
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-[5px]">
          <div
            className={`flex items-center justify-between  text-[12px]  ${
              size === "big" ? "text-[14px] leading-[20px]" : "leading-[17px]"
            }`}
          >
            <p className="truncate bg-border-color py-[4px] text-pri-color text-center rounded-[8px] text-[12px] px-[12px]">
              來源：{data.source || "網友提供"}
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
                {changeDateFormat(data.updated_at || data.published_at, "yyyy-MM-dd")}
              </p>
            </div>
          </div>
          <p
            className={`line-clamp-2 leading-[24px] text-[16px] group-hover:text-pri-color ${
              size === "big" ? "text-[16px]" : ""
            }`}
          >
            {data?.title}
          </p>
        </div>
      </div>
    </a>
  );
}
