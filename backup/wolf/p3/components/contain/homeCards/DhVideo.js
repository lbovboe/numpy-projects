import Frame from "../../tools/Frame";
import { useState } from "react";
import ArticleImage from "../articleCards/ArticleImage";

export default function DhVideo({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const topics = [
    ["zuqiu", "足球"],
    ["lanqiu", "籃球"],
    ["zonghe", "綜合"],
  ];

  const videos =
    data?.find((ele) => ele.match_type === topics[activeIndex][0])?.list || [];
  return (
    <>
      {data && data?.length > 0 && (
        <>
          <Frame
            title="集錦錄像"
            href={"/video/" + topics[activeIndex][0] + "/"}
          >
            <div className="flex gap-x-[15px] items-center justify-center rounded-[10px] border border-solid border-border-color h-[36px]">
              {topics.map(([type, name], i) => (
                <button
                  key={i}
                  className={`group flex items-center gap-x-[5px] ${
                    activeIndex === i
                      ? "text-sec-color"
                      : "text-pri-color hover:text-sec-color"
                  }`}
                  onClick={() => setActiveIndex(i)}
                >
                  <span>{name}</span>
                  <svg
                    className={`${
                      activeIndex === i
                        ? "fill-sec-color"
                        : "fill-pri-color group-hover:fill-sec-color"
                    } `}
                    width="19"
                    height="18"
                  >
                    <use xlinkHref={`#icon-${type}`} />
                  </svg>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-[15px] mt-[12px]">
              {videos?.map((ele,i) => (
                <ArticleImage key={i} data={ele} type={"video"} />
              ))}
            </div>
          </Frame>
        </>
      )}
    </>
  );
}
