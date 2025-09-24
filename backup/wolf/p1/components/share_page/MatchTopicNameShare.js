import LastUpdate from "../tools/last_update";
import { useState } from "react";
import MatchSubheader from "../header/MatchSubHeader";
import MatchSideSubHeader from "../header/MatchSideSubHeader";
import MatchContainer from "../contain/matchCards/MatchContainer";
import ArticleList from "../contain/articleCards/ArticleList";
import Frame from "../tools/Frame";
import SaishiSideCard from "../contain/SaishiSideCard";
export default function MatchTopicNameShare({ data }) {
  const [isComplete, setIsComplete] = useState(false);
  const matchData = data?.matches;
  return (
    <>
      <div className="flex gap-x-[20px] flex-wrap ">
        <div className="w-[790px] max12:w-full">
          <div className="">
            {data?.pageType === "index" ? (
              <>
                <MatchSubheader />
              </>
            ) : data?.pageType === "team" ? (
              // <p className="text-[18px]">{data?.topic}比賽</p>
              <></>
            ) : (
              <p className="text-[18px]">{data?.topic}比賽</p>
            )}
            <div className="flex justify-between items-center">
              <MatchSideSubHeader />
            </div>
          </div>
          <div className="space-y-[20px]">
            <MatchContainer data={matchData} />
            {data.newsData?.length > 0 && (
              <Frame
                title={`${data.topic}新聞`}
                href={data?.matchType !== "all" && data?.matchType !== "hot" ? `/news/${data?.matchType}/` : "/news/"}
              >
                <ArticleList
                  data={data.newsData}
                  layout="row"
                />
              </Frame>
            )}
            <SaishiSideCard data={data.saishiData} />
          </div>
        </div>
      </div>
    </>
  );
}
