import React from "react";
import PaginationBar from "../tools/pagination";
import NewsNav from "../header/NewsNav";
import Frame from "../tools/Frame";
import ArticleImageSmall from "../contain/articleCards/ArticleImageSmall";

export default function NewsShare({ data, url = "/news" }) {
  return (
    <Frame
      title={
        data.tagName && data.tagName !== "all"
          ? `${data.topic}新聞`
          : "熱門新聞"
      }
    >
      <NewsNav />
      <div className="grid grid-cols-2 gap-[12px] mt-[15px]">
        {data?.newsData?.map((news, i) => (
          <ArticleImageSmall key={i} data={news} />
        ))}
      </div>
    </Frame>
  );
}
