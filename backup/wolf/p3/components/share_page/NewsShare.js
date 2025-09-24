import React from "react";
import PaginationBar from "../tools/pagination";
import NewsNav from "../header/NewsNav";
import Frame from "../tools/Frame";
import ArticleImage from "../contain/articleCards/ArticleImage";

export default function NewsShare({ data, url = "/news" }) {
  return (
    <Frame
      title={
        data.tagName && data.tagName !== "all"
          ? `${data.topic}新聞`
          : "全部新聞"
      }
      options={<NewsNav />}
    >
      <div className="grid grid-cols-4 gap-[15px] mt-[15px]">
        {data?.newsData?.map((news, i) => (
          <ArticleImage key={i} data={news} />
        ))}
      </div>
      <PaginationBar
        url={url}
        currentPage={data.currentPage}
        totalPage={data.totalPage}
      />
    </Frame>
  );
}
