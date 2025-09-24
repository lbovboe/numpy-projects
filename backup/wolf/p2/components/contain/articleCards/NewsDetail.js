import { changeDateFormat } from "../../../public/scripts/publicFunction";
import ArticleSlider from "./ArticleSlider";
import LazyImage from "../../tools/lazy_image";
export default function NewsDetail({ data, slider }) {
  return (
    <>
      <style>
        {`
        .tysp_article_text p {
            font-size: 16px;
            text-align: left;
            margin-top: 20px;
            margin-bottom: 20px;
            line-height:28px;
        }
        .tysp_article_text img{
            max-width: 650px;
            width: 100%;
            height: auto;
            border-radius: 10px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    `}
      </style>
      <div className="bg-white rounded-[10px] p-[20px] mt-[30px]">
        <>
          <div className="flex flex-col gap-y-[12px]">
            <div className="text-[20px] leading-[40px] line-clamp-2">{data?.title}</div>
            <div className="flex items-center gap-x-[15px] text-[12px] justify-center">
              <p className="truncate bg-border-color py-[4px] text-pri-color text-center rounded-[8px] text-[12px] px-[12px]">
                來源：{data.source || "網友提供"}
              </p>
              <div className="flex items-center gap-x-[4px] leading-[17px]">
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
          <hr className="border-border-color my-[15px]" />
          <div
            className="tysp_article_text "
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
          <div className="flex flex-wrap gap-[12px]">
            {data?.tags &&
              data?.tags?.map((tags, index) => (
                <a
                  key={index}
                  // href={`/news/tag/${tags?.details?.name}/`}
                >
                  <div
                    key={index}
                    className="rounded-[10px] bg-border-color px-[12px] py-[4px] text-pri-color"
                  >
                    {tags?.details?.title}
                  </div>
                </a>
              ))}
          </div>
        </>

        <ArticleSlider data={slider}></ArticleSlider>
      </div>
    </>
  );
}
