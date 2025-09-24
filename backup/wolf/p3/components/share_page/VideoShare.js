import React from "react";
import VideoNav from "../header/VideoNav";
import Frame from "../tools/Frame";
import ArticleImage from "../contain/articleCards/ArticleImage";
import PaginationBar from "../tools/pagination";

export default function VideoShare({ data, url = "/video" }) {
  return (
    <Frame
      title={
        data.tagName && data.tagName !== "all"
          ? `${data.topic}集錦錄像`
          : "集錦錄像"
      }
      options={<VideoNav />}
    >
      <div className="grid grid-cols-4 gap-[15px] mt-[15px]">
        {data?.videosData?.map((news, i) => (
          <ArticleImage key={i} data={news} type="video" />
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
