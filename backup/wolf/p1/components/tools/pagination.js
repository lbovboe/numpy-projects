import { React, useState, useEffect } from "react";

function getArray(currentPage, totalPages) {
  const result = [];
  const padding = 5;
  const ellipsis = "...";

  if (totalPages <= 11) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
    return result;
  }
  if (currentPage > totalPages) {
    for (let i = 1; i <= 11; i++) {
      result.push(i);
    }
    return result;
  }
  if (currentPage - padding <= 0 || currentPage <= 6) {
    for (let i = 1; i <= 8; i++) {
      result.push(i);
    }
    result.push(ellipsis, totalPages - 1, totalPages);
    return result;
  }
  if (currentPage == totalPages || currentPage + padding >= totalPages) {
    let str = totalPages - 8;
    result.push(1, 2, ellipsis);
    for (let i = 1; i <= 8; i++) {
      result.push(i + str);
    }
    return result;
  }

  result.push(1, 2, ellipsis);
  let str = currentPage - 3;
  for (let i = 1; i <= padding; i++) {
    result.push(i + str);
  }
  result.push(ellipsis, totalPages - 1, totalPages);
  return result;
}

export default function PaginationBar({ currentPage, totalPage, url }) {
  const [page, setPage] = useState(null);
  const [gridval, setgridval] = useState("repeat(13,36px)");
 
  useEffect(() => {
    if (totalPage !== undefined && totalPage !== null && totalPage !== 0) {
      currentPage = Number(currentPage);
      totalPage = Number(totalPage);
      var arr = getArray(currentPage, totalPage);
      if (totalPage < 11) {
        const ttl = totalPage + 2;
        setgridval(`repeat(${ttl},36px)`);
      }

      setPage(arr);
    }
  }, [totalPage]);
  const pgCls = `no-underline  h-[30px] w-[30px] text-[15px] bg-[#FAF8FF] flex justify-center items-center hover:text-[#fff] hover:bg-[#7254FC]`;
  return (
    <div className="flex items-center justify-center pagination_container">
      {page !== undefined && page != null && (
        <div className="pagination grid gap-x-[10px] grid-flow-col">
          {currentPage - 1 > 1 ? (
            <a className={`${pgCls} rounded-[4px_0_0_4px]`} href={`${url}/${currentPage - 1}/`}>
              <div className="pl-[3px]">
                <i className="w-[8px] h-[8px] block border-l-[2px] border-t-[2px] border-solid rotate-[-45deg] border-white"></i>
              </div>
            </a>
          ) : currentPage - 1 == 1 ? (
            <a className={`${pgCls} rounded-[4px_0_0_4px]`} href={url + "/"}>
              <div className="pl-[3px]">
                <i className="w-[8px] h-[8px] block border-l-[2px] border-t-[2px] border-solid rotate-[-45deg] border-white"></i>
              </div>
            </a>
          ) : (
            <a className={`${pgCls} rounded-[4px_0_0_4px] pointer-events-none`}>
              <div className="pl-[3px]">
                <i className="w-[8px] h-[8px] block border-l-[2px] border-t-[2px] border-solid rotate-[-45deg] border-[#8F8F9C]"></i>
              </div>
            </a>
          )}
          {page.map((val, idx) => {
            return val != "..." && currentPage != val ? (
              <a className={`${pgCls}`} key={`pagi-n-${idx}`} href={val == 1 ? url + "/" : url + "/" + val + "/"}>
                {val}
              </a>
            ) : (
              <p
                key={`pagi-n-${idx}`}
                className={`${currentPage == val ? "bg-pri-color text-white" : ""} no-underline  h-[30px] w-[30px] flex justify-center items-center`}
              >
                {val}
              </p>
            );
          })}
          {currentPage != totalPage ? (
            <a className={`${pgCls} rounded-[0_4px_4px_0]`} href={`${url}/${currentPage + 1}/`}>
              <div className="pr-[3px]">
                <i className="w-[8px] h-[8px] block border-r-[2px] border-t-[2px] border-solid rotate-[45deg] border-white"></i>
              </div>
            </a>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
