import MatchContainer from "../contain/matchCards/MatchContainer";
import React, { useState } from "react";
import LastUpdate from "../tools/last_update";
import NewsVideoMix from "../contain/articleCards/NewsVideoMix";
import { getBaseUrl } from "../../public/scripts/publicFunction";
import MatchSideContainer from "../contain/matchCards/MatchSideContainer";
import Frame from "../tools/Frame";

export default function TopicMatchShare({ data, children, title = "" }) {
  const baseUrl = getBaseUrl(data.matchType, data.topicName);
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
        <div className="min12:max-w-[790px] w-full flex flex-col gap-[20px]">
          <Frame
            title={`${data.topic}`}
            iconName={`icon_${
              data.topicName === "ufc" ? "ufc" : data.matchType
            }`}
            options={
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
            }
          >
            <MatchContainer data={matches} />
          </Frame>
        </div>
        <div className="min12:max-w-[390px] w-full flex flex-col gap-[20px]">
          <NewsVideoMix
            news={data.newsData}
            videos={data.videosData}
          />
          <MatchSideContainer
            data={data.hotMatches}
          />
        </div>
      </div>
      {/* <LastUpdate lastUpdate={data.lastUpdate} /> */}
    </div>
  );
}
