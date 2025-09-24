import LazyImage from "../tools/lazy_image";
import { useEffect, useRef, useState } from "react";

const searchOptions = [
  {
    name: "百度",
    url: "https://www.baidu.com/s?wd=",
  },
  {
    name: "Bing",
    url: "https://cn.bing.com/search?q=",
  },
  {
    name: "搜狗",
    url: "https://www.sogou.com/web?query=",
  },
  {
    name: "神马",
    url: "https://m.sm.cn/s?q=",
  },
  {
    name: "360",
    url: "https://www.so.com/s?q=",
  },
];

export default function DaohangHeader({ data }) {
  const [optionIndex, setOptionIndex] = useState(0);
  const [overflowItems, setOverflowItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const firstKeyword = data && data?.[0] && data[0].keywords ? data[0].keywords : "NBA 免费直播";
  const [input, setInput] = useState(firstKeyword);
  const [showHotOverflow, setShowHotOverflow] = useState(false);
  const [showHotMore, setShowHotMore] = useState(false);
  const [isHoveringFirstOption, setIsHoveringFirstOption] = useState(false);

  // This effect handles the visible and overflow items
  useEffect(() => {
    if (!data || data.length === 0) return;

    // Show only the first 6 items, rest go to overflow
    const visible = data.slice(0, 6);
    const overflow = data.slice(6);

    setVisibleItems(visible);
    setOverflowItems(overflow);
    setShowHotMore(overflow.length > 0);
  }, [data]);

  const handleOptionClick = (index) => {
    setOptionIndex(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const href = searchOptions[optionIndex].url + input;
      if (window) window.open(href, "_blank");
    }
  };

  return (
    <div className="w-full relative flex flex-col">
      {/* Search options row */}
      <div className="flex items-center relative">
        <div className="flex items-center gap-x-[28px]">
          {searchOptions.map(({ name }, i) => (
            <div
              key={name}
              className="relative cursor-pointer group"
              onClick={() => handleOptionClick(i)}
              onMouseEnter={() => i === 0 && setIsHoveringFirstOption(true)}
              onMouseLeave={() => i === 0 && setIsHoveringFirstOption(false)}
            >
              <p className={`text-white`}>{name}</p>
              <div
                className={`absolute bottom-[-15px] left-0 right-0 h-[4px] bg-white rounded-t-[10px] transition-all ${
                  optionIndex === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Search input row */}
      <div className="w-full max-w-[1200px] mt-[14px]">
        <div
          className={`flex items-center h-[44px] bg-white ${
            optionIndex === 0 || isHoveringFirstOption ? "rounded-b-[10px] rounded-tr-[10px]" : "rounded-[10px]"
          } px-[20px]`}
        >
          <input
            className="text-pri-color border-none focus:outline-none bg-transparent flex-grow"
            type="text"
            id="search"
            onChange={(e) => setInput(e.currentTarget.value)}
            defaultValue={firstKeyword}
            onKeyDown={handleKeyDown}
          />

          <a
            target="_blank"
            href={searchOptions[optionIndex].url + input}
          >
            <svg
              width={20}
              height={20}
              className="fill-sec-color cursor-pointer hover:fill-pri-color"
            >
              <use href="#search-icon" />
            </svg>
          </a>
        </div>
      </div>

      {/* Hot keywords row */}
      <div className="flex items-center justify-center gap-x-[15px] mt-[15px]">
        <div className="flex items-center gap-x-[10px] text-white">
          {visibleItems.map((keyword, i) => (
            <a
              key={i}
              target="_blank"
              href={searchOptions[optionIndex].url + keyword.keywords}
              className="underline underline-offset-2 hover:no-underline"
            >
              {keyword?.keywords}
            </a>
          ))}

          {showHotMore && (
            <div
              className="relative"
              onMouseOver={() => setShowHotOverflow(true)}
              onMouseOut={() => setShowHotOverflow(false)}
            >
              <button className="flex items-center gap-x-[5px] text-white">
                更多
                <svg
                  width={12}
                  height={12}
                  className={`transition-all fill-white ${showHotOverflow ? "rotate-180" : ""}`}
                >
                  <use href="#more-icon" />
                </svg>
              </button>

              <div
                className={`absolute z-[20] flex flex-col items-center top-full right-0 text-[#4A4D52] gap-[10px] p-[15px] w-[190px] rounded-b-[10px] bg-white shadow-[0_0_5px_0px_rgba(0,0,0,0.15)] text-[14px] ${
                  showHotOverflow ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {overflowItems.map((keyword, i) => (
                  <a
                    key={i}
                    target="_blank"
                    href={searchOptions[optionIndex].url + keyword.keywords}
                    className="hover:text-pri-color"
                  >
                    {keyword?.keywords}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
