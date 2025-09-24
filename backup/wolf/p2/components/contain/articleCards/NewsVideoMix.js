import { useState } from "react";
import ArticleList from "./ArticleList";

export default function NewsVideoMix({ news, videos, href = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    (news?.length > 0 || videos.length > 0) && (
      <div className={`rounded-[10px] p-[20px] bg-white`}>
        <div className="flex items-center justify-between">
          <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px]">
            {["熱門新聞", "集錦錄像"].map((ele, i) => (
              <button
                key={i}
                className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
                  activeIndex === i
                    ? "bg-bg-color text-pri-color"
                    : "text-white hover:bg-bg-color hover:text-pri-color"
                }`}
                onClick={() => setActiveIndex(i)}
              >
                {ele}
              </button>
            ))}
          </div>
          <div>
            {href && (
              <a
                href={activeIndex === 1 ? "/video/" :href}
                className="group flex items-center place-self-end gap-[5px]"
              >
                <p className="text-pri-color leading-[20px] group-hover:font-bold">
                  更多
                </p>
                <div className="flex items-center justify-center rounded-full w-[14px] h-[14px] border border-solid border-pri-color group-hover:bg-pri-color fill-pri-color group-hover:fill-white">
                  <svg width={20} height={20} className="">
                    <use href="#icon-arrow"></use>
                  </svg>
                </div>
              </a>
            )}
          </div>
        </div>
        <hr className="border-border-color my-[15px]" />
        <div className={`relative`}>
          <div className={`${activeIndex === 0 ? "" : "hidden"}`}>
            <ArticleList data={news} isRow={true}/>
          </div>
          <div className={`${activeIndex === 1 ? "" : "hidden"}`}>
            <ArticleList data={videos} type="video" isRow={true}/>
          </div>
        </div>
      </div>
    )
  );
}
