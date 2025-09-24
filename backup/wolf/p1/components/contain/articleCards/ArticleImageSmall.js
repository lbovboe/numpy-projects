import LazyImage from "../../tools/lazy_image";
import { changeDateFormat, getNewsTitle } from "../../../public/scripts/publicFunction";
export default function ArticleImageSmall({ data, type = "news", iconType = "normal" }) {
  return (
    <a
      href={`${type === "video" ? `/video/${data?.article_id}-${data?.ID}.html` : `/news/${data?.id}.html`}`}
      className="group grid grid-cols-[102px_1fr] gap-x-[12px] p-[15px] rounded-[10px] border border-solid border-border-color hover:border-sec-color"
    >
      <div className="relative shrink-0 w-full h-[77px]">
        <LazyImage
          src={data.image}
          alt={data.title}
          className="w-full h-full rounded-[10px] overflow-hidden shrink-0"
        />
        {type === "video" && (
          <svg
            width={30}
            height={30}
            className={`absolute inset-0 m-auto fill-white group-hover:fill-sec-color`}
          >
            <use href="#video-play"></use>
          </svg>
        )}
      </div>
      <div>
        <div className="line-clamp-2 h-[40px]">{data?.title}</div>
        <hr className="border-border-color mt-[15px] mb-[5px]" />
        <div className="flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-x-[10px] leading-[17px]">
            <span className="text-pri-color">{getNewsTitle(data?.type || data?.match_type)}</span>
            <span className="text-[#888]">
              {changeDateFormat(data?.published_at || data?.created_at, "yyyy-MM-dd")}
            </span>
            <span className="text-[#888]"> {data.source || "網友提供"}</span>
          </div>
          {(data?.is_hot || data?.important) && (
            <div className="flex items-center justify-center">
              <LazyImage
                src={"/images/hot-icon.png"}
                width={17}
                height={17}
              />
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
