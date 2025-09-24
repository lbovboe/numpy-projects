import Frame from "../tools/Frame";
import LazyImage from "../tools/lazy_image";
import { useState } from "react";

const searchOptions = [
  {
    name: "百度",
    url: "https://www.baidu.com/s?wd=",
    icon: "icon_baidu",
  },
  {
    name: "Bing",
    url: "https://cn.bing.com/search?q=",
    icon: "icon_bing",
  },
  {
    name: "搜狗",
    url: "https://www.sogou.com/web?query=",
    icon: "icon_sogou",
  },
  {
    name: "神马",
    url: "https://m.sm.cn/s?q=",
    icon: "icon_shenma",
  },
  {
    name: "360",
    url: "https://www.so.com/s?q=",
    icon: "icon_360",
  },
];

export default function DaohangHeader({ data }) {
  const [optionIndex, setOptionIndex] = useState(0);

  const firstKeyword =
    data && data?.[0] && data[0].keywords ? data[0].keywords : "NBA 免费直播";
  const [input, setInput] = useState(firstKeyword);
  const [showSearchDropDown, setShowSearchDropDown] = useState(false);
  const handleSearchActive = (v) => {
    setShowSearchDropDown(v);
  };
  const handleOptionClick = (v) => {
    setOptionIndex(v);
    setShowSearchDropDown(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const href = searchOptions[optionIndex].url + input;
      if (window) window.open(href, "_blank");
    }
  };

  return (
    <div className="dh-header w-full rounded-[10px] bg-bg-color p-[20px]">
      <div className="grid grid-cols-[minmax(377px,1fr)_1fr] gap-[20px]">
        <div
          className={`grid grid-cols-[133px_1px_1fr_96px] h-[40px] ${
            showSearchDropDown ? "rounded-tl-[10px]" : "rounded-l-[10px]"
          }`}
        >
          <div
            className="relative flex items-center bg-white group border border-solid border-[#F3F4F7] rounded-l-[10px]"
            onMouseOver={() => handleSearchActive(true)}
            onMouseOut={() => handleSearchActive(false)}
          >
            <div
              className={`flex items-center justify-between pl-[15px] pr-[20px] relative z-[3] w-full`}
            >
              <div className="flex items-center">
                <LazyImage
                  src={`/images/${searchOptions[optionIndex].icon}.png`}
                  width={20}
                  height={20}
                  alt=""
                  className="shrink-0"
                />
                <p className="ml-[6px] group-hover:text-sec-color">
                  {searchOptions[optionIndex].name}
                </p>
              </div>
              <svg
                width={12}
                height={10}
                className={
                  "transition-all group-hover:rotate-[180deg] fill-text-color group-hover:fill-sec-color"
                }
              >
                <use href="#more-icon" />
              </svg>
            </div>
            <div
              className={`absolute z-[10] top-full w-full transition-all ease-in-out rounded-b-[8px] border border-solid border-border-color bg-white ${
                showSearchDropDown
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex flex-col gap-y-[12px] w-full p-[15px]">
                {searchOptions.map(({ name, icon }, i) => (
                  <button
                    key={i}
                    className={`flex gap-x-[6px] items-center hover:text-sec-color ${
                      searchOptions[optionIndex].name == name ? `` : ``
                    }`}
                    onClick={() => handleOptionClick(i)}
                  >
                    <LazyImage
                      src={`/images/${icon}.png`}
                      width={20}
                      height={20}
                      alt=""
                      className="shrink-0"
                    />
                    <p className="ml-[6px]">{name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[1px] h-full bg-border-color" />
          <input
            className="text-[#888] bg-white border-t border-b border-solid border-[#F3F4F7] focus:outline-none bg-transparent pl-[20px]"
            type="text"
            id="search"
            onChange={(e) => setInput(e.currentTarget.value)}
            defaultValue={firstKeyword}
            onKeyDown={handleKeyDown}
          />
          <a target="_blank" href={searchOptions[optionIndex].url + input}>
            <div className="flex items-center justify-center rounded-r-[10px] bg-pri-color hover:bg-sec-color w-full h-full text-white">
              點擊搜索
            </div>
          </a>
        </div>
        <div className="flex flex-wrap gap-x-[12px] gap-y-[6px] text-[12px]">
          {data &&
            data.map((keyword, i) => (
              <a
                key={i}
                target="_blank"
                href={searchOptions[optionIndex].url + keyword.keywords}
                className="underline hover:text-sec-color underline-offset-2"
              >
                {keyword?.keywords}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
