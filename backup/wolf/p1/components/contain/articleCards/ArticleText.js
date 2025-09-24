import OverflowSlideDiv from "../../tools/overflowSlideDiv";
import LazyImage from "../../tools/lazy_image";
import { changeDateFormat } from "../../../public/scripts/publicFunction";
export default function ArticleText({ data, type = "news", pageType = "index", index = 0 }) {
  return (
    <div className="relative">
      <a
        href={`${type === "video" ? `/video/${data?.article_id}-${data?.ID}.html` : `/news/${data?.id}.html`}`}
        className="group relative hover:text-sec-color grid grid-cols-[480px_85px] gap-x-[15px] max12:grid-cols-[580px_82px] items-center leading-[20px]"
      >
        <div className="flex gap-x-[10px] items-center ">
          {data?.important ? (
            <LazyImage src={"/images/hot-icon.png"} className="w-[20px] h-[20px] shrink-0" />
          ) : (
            <div className="h-[20px] w-[20px] rounded-tr-[5px] rounded-bl-[5px] text-center bg-pri-color group-hover:bg-sec-color text-white">
              {index}
            </div>
          )}
          <OverflowSlideDiv text={data.title} />
        </div>
        <div className="truncate text-ter-color w-[85px]">
          {changeDateFormat(data?.updated_at,'yyyy-MM-dd')}
        </div>
      </a>
    </div>
  );
}
