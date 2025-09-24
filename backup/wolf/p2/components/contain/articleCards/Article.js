import LazyImage from "../../tools/lazy_image";
import { changeDateFormat } from "../../../public/scripts/publicFunction";

export default function Article({ data, type = "news", index = 0 }) {
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
      <div className="grid grid-cols-[100px_1fr] gap-x-[5px] ">
        <div className={`relative h-[76px]`}>
          <LazyImage
            src={data?.image}
            width={100}
            height={76}
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
            <svg className="absolute h-[18px] w-[18px] fill-white left-1/2 top-1/2 translate-x-[-9px] translate-y-[-9px] group-hover:fill-pri-color">
              <use href="#play-icon"></use>
            </svg>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <p className={`line-clamp-2 leading-[20px] group-hover:text-pri-color`}>{data?.title}</p>
          <div className={`flex items-center justify-between  text-[12px] leading-[17px]`}>
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
        </div>
      </div>
    </a>
  );
}
