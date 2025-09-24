import { useState } from "react";

export default function Pagination({ currentPage, totalPage, url }) {
  const [pageNo, setPageNo] = useState(currentPage);
  const leftHref = {};
  const rightHref = {};
  if (currentPage - 1 == 1) {
    leftHref.href = url + "/";
  } else if (currentPage > 1) {
    leftHref.href = `${url}/${currentPage - 1}`;
  }
  if (currentPage < totalPage) {
    rightHref.href = `${url}/${currentPage + 1}`;
  }

  const numbersOnlyRegex = /^[1-9]\d*$/;
  const handleEnter = (pageNo) => {
    if (pageNo.match(numbersOnlyRegex)) {
      if (pageNo == 1) {
        window.open(`${url}/`, "_self");
      } else if (pageNo <= totalPage) {
        window.open(`${url}/${pageNo}/`, "_self");
      }
    }
  };

  return (
    <div className="flex items-center justify-center py-[10px] h-[44px] mt-[30px] rounded-[10px] border border-solid border-border-color max-w-full w-max mx-auto">
      <div className="flex gap-x-[15px] items-center px-[15px] h-full">
        <a
          href={url + "/"}
          className={`group flex justify-center items-center h-[27px] rounded-[5px]  ${
            currentPage == 1
              ? "text-[#AAA] pointer-events-none"
              : "hover:text-pri-color"
          }`}
        >
          首頁
        </a>
        <div className="w-[1px] h-full bg-border-color" />
        <a
          {...leftHref}
          className={`flex items-center gap-x-[5px] group ${
            currentPage == 1
              ? "fill-[#888] text-[#888] pointer-events-none"
              : "fill-[#1e1e1e] hover:fill-pri-color hover:text-pri-color"
          }`}
        >
          <svg width={12} height={12} className="rotate-180">
            <use href="#icon-arrow-solid" />
          </svg>
          <span>上一頁</span>
        </a>
        <div className="w-[1px] h-full bg-border-color" />
        <div className="flex items-center gap-x-[8px]">
          <input
            type="numeric"
            className="rounded-[8px] w-[70px] h-[26px] bg-border-color text-center text-[13px] font-bold focus:outline-none"
            value={pageNo}
            onChange={(e) => setPageNo(e.target.value)}
            onKeyDown={(e) => {
              const keycode = e.keyCode || e.which; //WORKAROUND FOR ANDROID KEYBOARD
              if (e.code == "13" || e.code === "Enter" || keycode == 13) {
                handleEnter(e.target.value);
              }
            }}
          />
          <p className="">&nbsp; / 共 {totalPage || 1} 頁</p>
        </div>
        <div className="w-[1px] h-full bg-border-color" />
        <a
          {...rightHref}
          className={`flex items-center gap-x-[5px] ${
            currentPage == totalPage || totalPage === 0
              ? "fill-[#888] text-[#888] pointer-events-none"
              : "fill-[#1e1e1e] hover:fill-pri-color hover:text-pri-color"
          }`}
        >
          <span>下一頁</span>
          <svg width={12} height={12} className={""}>
            <use href="#icon-arrow-solid" />
          </svg>
        </a>
        <div className="w-[1px] h-full bg-border-color" />
        <a
          href={url + "/" + totalPage + "/"}
          className={`group flex justify-center items-center h-[27px] rounded-[5px]  ${
            currentPage == totalPage || totalPage === 0
              ? "text-[#AAA] pointer-events-none"
              : "hover:text-pri-color"
          }`}
        >
          末頁
        </a>
      </div>
    </div>
  );
}
