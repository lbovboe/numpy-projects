import Frame from "../tools/Frame";
import LazyImage from "../tools/lazy_image";
import { useState } from "react";

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
    <div className="dh-header w-full bg-white border border-solid border-border-color p-[20px] min-h-[110px] rounded-[5px]">
      <div className="flex flex-wrap min12:grid grid-cols-[500px_1fr] gap-[20px] max-w-[1200px] w-full mx-auto">
        <div className="flex flex-col min12:max-w-[500px] w-full">
          <div className="flex items-center w-full cursor-pointer group">
            {searchOptions.map(({ name }, i) => (
              <div
                key={name}
                className={`flex justify-center items-center rounded-t-[10px] w-[52px] pt-[8px] pb-[15px] -mb-[10px] ${
                  searchOptions[optionIndex].name == name
                    ? `bg-pri-color text-white`
                    : `hover:bg-sec-color hover:text-white`
                }`}
                onClick={() => handleOptionClick(i)}
              >
                {name}
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <div className=" flex items-center h-[40px] w-[500px] rounded-[5px] border border-solid border-border-color bg-white py-[10px] px-[12px]">
              <div className="flex gap-x-[20px] items-center w-full h-full">
                <input
                  className="text-[#888888] w-full border-none focus:outline-none"
                  type="text"
                  id="search"
                  onChange={(e) => setInput(e.currentTarget.value)}
                  defaultValue={firstKeyword}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <a href={searchOptions[optionIndex].url + input} target="_blank">
                <svg className="hover:fill-sec-color" width="16" height="16">
                  <use xlinkHref="#icon-search" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <Frame title="熱門搜索" titleSize="text-[14px]" className="">
          <div className="flex flex-wrap gap-x-[15px] gap-y-[6px] text-[12px]">
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
        </Frame>
      </div>
    </div>
  );
}
