import LazyImage from "../../tools/lazy_image";
import { changeDateFormat } from "../../../public/scripts/publicFunction";

export default function ArticleSlider({ data }) {

  const getArticleType = (article) => {
    return article?.video_id ? "video" : "news";
  };

  const getArticleUrl = (article) => {
    const type = getArticleType(article);
    if (type === "video") {
      if (article?.video_id) {
        return `/video/${article?.article_id}-${article?.video_id}.html`;
      }
    }
    return `/news/${article?.article_id}.html`;
  };

  const ArticleCard = ({ article, className = "" }) => {
    if (!article) return null;

    const type = getArticleType(article);

    return (
      <a
        href={getArticleUrl(article)}
        className={`group relative ${className}`}
      >
        <div className="grid grid-cols-[100px_1fr] gap-x-[10px]">
          <div className="relative h-[76px]">
            <LazyImage
              src={article?.image}
              width={100}
              height={76}
              className="rounded-[10px] overflow-hidden shrink-0"
            />
            {(article?.is_hot || article?.important) && (
              <LazyImage
                src="/images/hot_icon.png"
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
            <p className="line-clamp-2 leading-[20px] group-hover:text-pri-color">{article?.title}</p>
            <div className="flex items-center justify-between text-[12px] leading-[17px]">
              <p className="truncate bg-white py-[4px] text-pri-color text-center rounded-[8px] text-[12px] px-[12px]">
                來源：{article?.source || "網友提供"}
              </p>
              <div className="flex items-center gap-x-[4px]">
                <div className="h-[17px] w-[17px]">
                  <LazyImage
                    src="/images/calendar-icon.png"
                    width={17}
                    height={17}
                  />
                </div>
                <p className="truncate text-[12px]">
                  {changeDateFormat(article?.updated_at || article?.published_at, "yyyy-MM-dd")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  };

  // Find prev and next articles based on mode
  const prevArticle = data.find((article) => article.mode === "prev");
  const nextArticle = data.find((article) => article.mode === "next");

  return (
    <div className="bg-border-color pb-[20px] rounded-[10px] overflow-hidden mt-[20px]">
      <div className="flex justify-between text-[12px] pt-[1px] px-[1px]">
        {prevArticle ? (
          <a
            href={getArticleUrl(prevArticle)}
            className="bg-white rounded-tl-[10px] rounded-br-[10px] text-pri-color py-[4px] px-[12px]"
          >
            上一篇
          </a>
        ) : (
          <div></div>
        )}
        {nextArticle ? (
          <a
            href={getArticleUrl(nextArticle)}
            className="bg-white rounded-bl-[10px] rounded-tr-[10px] text-pri-color py-[4px] px-[12px]"
          >
            下一篇
          </a>
        ) : (
          <div></div>
        )}
      </div>

      <div className="flex items-center px-[20px] mt-[20px]">
        <div className="flex-1">{prevArticle && <ArticleCard article={prevArticle} />}</div>
        { <div className="h-[76px] w-[1px] bg-pri-color mx-[20px]"></div>}
        <div className="flex-1">{nextArticle && <ArticleCard article={nextArticle} />}</div>
      </div>
    </div>
  );
}
