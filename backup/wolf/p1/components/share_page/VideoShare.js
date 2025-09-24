import React from "react";
import VideoNav from "../header/VideoNav";
import ArticleImageSmall from "../contain/articleCards/ArticleImageSmall";
import Frame from "../tools/Frame";

export default function VideoShare({ data, url = "/video" }) {
  return (
    <Frame
      title={
        data.tagName && data.tagName !== "all"
          ? `${data.topic}集錦錄像`
          : "集錦錄像"
      }
    >
      <VideoNav />
      <div className="grid grid-cols-2 gap-[12px] mt-[15px]">
        {data?.videosData?.map((v, i) => (
          <ArticleImageSmall key={i} data={v} type="video" />
        ))}
      </div>
    </Frame>
  );
}
