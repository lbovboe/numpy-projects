import MatchContainer from "../contain/matchCards/MatchContainer";
import React, { useState } from "react";
import ChannelSideCard from "../contain/channelCards/ChannelSideCard";
import LastUpdate from "../tools/last_update";
import NewsVideoMix from "../contain/articleCards/NewsVideoMix";
import SaishiSideCard from "../contain/saishiCards/SaishiSideCard";
import MatchSubheader from "../header/MatchSubHeader";

export default function MatchTopicNameShare({ data, children, title = "" }) {
  const [matches, setMatches] = useState(data.matches);
  const [activeIndex, setActiveIndex] = useState(0);
  let newsHref = "";
  if (data?.pageType === "match") {
    newsHref =
      data?.matchType === "zuqiu"
        ? "/news/zuqiu/"
        : data?.matchType === "lanqiu"
        ? "/news/lanqiu/"
        : data?.matchType === "zonghe"
        ? "/news/zonghe/"
        : "/news/";
  }
  return (
    <div className="mt-[30px]">
      <div className="flex flex-wrap gap-[20px] w-full mt-[15px]">
        <div className="min12:max-w-[790px] w-full flex flex-col gap-[25px]">
          <div className={`rounded-[10px] p-[20px] bg-white`}>
            <div className="flex items-center justify-between">
              <MatchSubheader/>
              <div className="flex items-center justify-end gap-x-[14px]">
                {["未完賽事", "完成賽事"].map((name, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && (
                      <div className="h-[18px] w-[1px] bg-pri-color rotate-[20deg]" />
                    )}
                    <button
                      className={`flex items-center gap-x-[5px] text-pri-color ${
                        activeIndex === i ? "font-bold" : "hover:font-bold"
                      }`}
                      onClick={() => {
                        i === 0
                          ? setMatches(data.matches)
                          : setMatches(data.completedMatches);
                        setActiveIndex(i);
                      }}
                    >
                      {name}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <hr className="border-border-color my-[15px]" />
            <MatchContainer data={matches} />
          </div>
        </div>
        <div className="min12:max-w-[390px] w-full flex flex-col gap-[20px]">
          <NewsVideoMix
            href={newsHref}
            news={data.newsData}
            videos={data.videosData}
          />
          <SaishiSideCard data={data.hotSaishi} />
          <ChannelSideCard data={data.hotChannels} />
        </div>
      </div>
      {/* <LastUpdate lastUpdate={data.lastUpdate} /> */}
    </div>
  );
}
