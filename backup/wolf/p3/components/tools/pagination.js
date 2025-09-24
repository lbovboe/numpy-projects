import { useState } from "react";

export default function Pagination({ currentPage, totalPage, url }) {
  const [pageNo, setPageNo] = useState(currentPage);
  const leftHref = {};
  const rightHref = {};
  if (currentPage - 1 == 1) {
    leftHref.href = url + "/";
  } else if (currentPage > 1) {
    leftHref.href = `${url}/${currentPage - 1}/`;
  }
  if (currentPage < totalPage) {
    rightHref.href = `${url}/${currentPage + 1}/`;
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
    <div className="flex items-center justify-center mt-[20px] w-max mx-auto">
      <div className="flex gap-x-[15px] items-center">
        <a
          href={url + "/"}
          className={`group flex justify-center items-center h-[27px] rounded-[5px]  ${
            currentPage == 1
              ? "text-[#AAAA] pointer-events-none"
              : "text-pri-color hover:text-sec-color"
          }`}
        >
          首頁
        </a>
        <div className="w-[1px] h-[22px] bg-border-color" />
        <a
          {...leftHref}
          className={`group flex items-center gap-x-[6px] ${
            currentPage == 1
              ? "text-[#AAAA] pointer-events-none"
              : "text-pri-color hover:text-sec-color"
          }`}
        >
          <div
            className={`flex items-center justify-center rounded-[5px] w-[18px] h-[18px] rotate-180 ${
              currentPage == 1
                ? "bg-[#AAAA]"
                : "bg-pri-color group-hover:bg-sec-color"
            }`}
          >
            <svg
              width={10}
              height={10}
              className="fill-white stroke-white pl-[1px]"
            >
              <use href="#arrow-right"></use>
            </svg>
          </div>
          <span>上一頁</span>
        </a>
        <div className="w-[1px] h-[22px] bg-border-color" />
        <div className="flex items-center gap-x-[8px]">
          <input
            type="numeric"
            className="rounded-[8px] w-[60px] h-[28px] bg-border-color text-center text-[14px] focus:outline-none"
            value={pageNo}
            onChange={(e) => setPageNo(e.target.value)}
            onKeyDown={(e) => {
              const keycode = e.keyCode || e.which; //WORKAROUND FOR ANDROID KEYBOARD
              if (e.code == "13" || e.code === "Enter" || keycode == 13) {
                handleEnter(e.target.value);
              }
            }}
          />
          <p className="">&nbsp; / 共 {totalPage} 頁</p>
        </div>
        <div className="w-[1px] h-[22px] bg-border-color" />
        <a
          {...rightHref}
          className={`group flex items-center gap-x-[6px] ${
            currentPage == totalPage
              ? "text-[#AAAA] pointer-events-none"
              : "text-pri-color hover:text-sec-color"
          }`}
        >
          <span>下一頁</span>
          <div
            className={`flex items-center justify-center rounded-[5px] w-[18px] h-[18px] ${
              currentPage >= totalPage
                ? "bg-[#AAAA]"
                : "bg-pri-color group-hover:bg-sec-color"
            }`}
          >
            <svg
              width={10}
              height={10}
              className="fill-white stroke-white pl-[1px]"
            >
              <use href="#arrow-right"></use>
            </svg>
          </div>
        </a>
        <div className="w-[1px] h-[22px] bg-border-color" />
        <a
          href={url + "/" + totalPage + "/"}
          className={`group flex justify-center items-center ${
            currentPage >= totalPage
              ? "text-[#AAAA] pointer-events-none"
              : "text-pri-color hover:text-sec-color"
          }`}
        >
          末頁
        </a>
      </div>
    </div>
  );
}
