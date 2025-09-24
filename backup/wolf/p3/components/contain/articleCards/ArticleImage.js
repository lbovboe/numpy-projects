import LazyImage from "../../tools/lazy_image";
import {
  changeDateFormat,
  getNewsTitle,
} from "../../../public/scripts/publicFunction";
export default function ArticleImage({ data, type = "news" }) {
  return (
    <a
      href={`${
        type === "video"
          ? `/video/${data?.article_id || data?.id}-${data?.ID}.html`
          : `/news/${data?.id}.html`
      }`}
      className={`group block rounded-[10px] border border-solid border-border-color p-[12px] hover:border-sec-color`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-[2px]">
          <span className="text-pri-color">{getNewsTitle(data.type || data.match_type)}</span>
          {(data?.is_hot || data?.important) && (
            <svg width={20} height={20} className={`fill-[#E32B2E]`}>
              <use href="#icon-hot"></use>
            </svg>
          )}
        </div>
        <span className="text-[#888]">
          {changeDateFormat(data.updated_at || data?.published_at, "yyyy-MM-dd")}
        </span>
      </div>
      <hr className="border-border-color mt-[6px] mb-[10px]" />
      <div className="grid grid-cols-[1fr_102px] gap-x-[12px]">
        <div className="flex items-center justify-center">
          <p className="line-clamp-3">{data?.title}</p>
        </div>
        <div className="relative h-[77px]">
          {type === "video" && (
            <svg
              width={20}
              height={20}
              className={`absolute inset-0 m-auto fill-white`}
            >
              <use href="#video-play"></use>
            </svg>
          )}
          <LazyImage
            src={data.image}
            width={102}
            height={77}
            alt={""}
            className="w-full h-full rounded-[5px] overflow-hidden shrink-0"
          />
        </div>
      </div>
    </a>
  );
}
