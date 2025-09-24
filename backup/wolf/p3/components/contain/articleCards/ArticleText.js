import OverflowSlideDiv from "../../tools/overflowSlideDiv";
import LazyImage from "../../tools/lazy_image";
import {
  changeDateFormat,
  getNewsTitle,
} from "../../../public/scripts/publicFunction";

export default function ArticleText({
  data,
  type = "news",
  pageType = "index",
  index = 0,
}) {
  return (
    <div className="relative">
      <a
        href={`${
          type === "video"
            ? `/video/${data?.article_id}-${data?.ID}.html`
            : `/news/${data?.id}.html`
        }`}
        className="group"
      >
        <div className="grid grid-cols-[20px_auto_1fr] w-full gap-x-[6px] items-center">
          {data?.is_hot || data?.important ? (
            <svg width={20} height={20} className={`fill-[#E32B2E]`}>
              <use href="#icon-hot"></use>
            </svg>
          ) : (
            <LazyImage
              src={type === "news" ? "/images/icon_news.png" : "/images/icon_video.png"}
              width={20}
              height={20}
              alt=""
            />
          )}
          <span className="text-pri-color whitespace-nowrap">{getNewsTitle(data.type || data.match_type)}</span>
          <OverflowSlideDiv text={data.title} />
        </div>
      </a>
    </div>
  );
}
