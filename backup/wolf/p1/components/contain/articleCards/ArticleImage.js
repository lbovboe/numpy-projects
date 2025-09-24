import LazyImage from "../../tools/lazy_image";
import {
  changeDateFormat,
  getNewsTitle,
} from "../../../public/scripts/publicFunction";
export default function ArticleImage({
  data,
  type = "news",
  iconType = "normal",
  layout = "column",
}) {
  return layout === "column" ? (
    <a
      href={`${
        type === "video"
          ? `/video/${data?.article_id}-${data?.ID}.html`
          : `/news/${data?.id}.html`
      }`}
      className={`group block rounded-[10px] border border-solid border-border-color p-[15px] hover:border-sec-color`}
    >
      <div className={`relative shrink-0 w-full h-[190px] `}>
        <LazyImage
          src={data.image}
          alt={data.title}
          className="w-full h-full rounded-[5px] overflow-hidden shrink-0"
        />
        {type === "video" && (
          <svg
            width={40}
            height={40}
            className={`absolute inset-0 m-auto fill-white`}
          >
            <use href="#video-play"></use>
          </svg>
        )}
      </div>
      <div className="line-clamp-2 mt-[10px] h-[40px]">{data?.title}</div>
      <hr className="border-border-color mt-[15px] mb-[10px]" />
      <div className="flex items-center justify-between text-[12px]">
        <div className="flex items-center gap-x-[10px]">
          <span className="text-pri-color">{getNewsTitle(data.type)}</span>
          <span className="text-[#888]">
            {changeDateFormat(data.updated_at, "yyyy-MM-dd")}
          </span>
          <span className="text-[#888]"> {data.source || "網友提供"}</span>
        </div>
        {(data?.is_hot || data?.important) && (
          <div className="flex items-center justify-center">
            <LazyImage src={"/images/hot-icon.png"} width={17} height={17} />
          </div>
        )}
      </div>
    </a>
  ) : (
    <a
      href={`${
        type === "video"
          ? `/video/${data?.article_id}-${data?.ID}.html`
          : `/news/${data?.id}.html`
      }`}
      className={`group grid grid-cols-[2fr_1fr] gap-x-[20px] rounded-[5px] border border-solid border-border-color hover:border-ter-color p-[20px]`}
    >
      <div className="flex flex-col justify-between">
        <div className="line-clamp-2 group-hover:text-sec-color text-[16px]">
          {data?.title}
        </div>
        <div className="flex items-center gap-x-[10px] ">
          <div className="flex items-center gap-x-[5px] rounded-[5px] bg-ter-color px-[10px] py-[7px] text-[12px] truncate">
            <LazyImage
              src={"/images/source.png"}
              className="shrink-0"
              width={17}
              height={17}
            />
            <div className="truncate max-w-[65px]">
              {data.source || "網友提供"}
            </div>
          </div>
          <div className="text-[#888] ">
            {changeDateFormat(data.updated_at, "yyyy-MM-dd")}
          </div>
        </div>
      </div>
      <div className={`relative shrink-0 w-full h-[100px] `}>
        <LazyImage
          src={data.image}
          alt={data.title}
          className="w-full h-full rounded-[5px] overflow-hidden shrink-0"
        />
        {(data?.is_hot || data?.important) && (
          <div className="absolute right-[10px] top-[10px] flex items-center justify-center rounded-[5px] bg-white w-[24px] h-[24px]">
            <LazyImage src={"/images/hot-icon.png"} width={20} height={20} />
          </div>
        )}
        {type === "video" && (
          <svg
            width={30}
            height={30}
            className={`absolute inset-0 m-auto fill-white`}
          >
            <use href="#video-play"></use>
          </svg>
        )}
      </div>
    </a>
  );
}
