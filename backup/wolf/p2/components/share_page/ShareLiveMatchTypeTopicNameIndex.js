import PageDescription from "../contain/page_description";
import { getBaseUrl } from "../../public/scripts/publicFunction";
import Frame from "../tools/Frame";
import RankingContainer from "../contain/RankingCards/RankingContainer";
import MatchCard from "../contain/matchCards/MatchCard";
import LastUpdate from "../tools/last_update";
import ArticleList from "../contain/articleCards/ArticleList";
import MatchSideContainer from "../contain/matchCards/MatchSideContainer";

export default function ShareLiveMatchTypeTopicNameIndex({ data }) {
  const baseUrl = getBaseUrl(data.matchType, data.topicName);
  return (
    <div className="mt-[25px]">
      <div className="flex flex-wrap gap-[20px] w-full mt-[15px]">
        <div className="min12:max-w-[790px] w-full flex flex-col gap-[25px]">
          <Frame
            title={`${data.topic}`}
            iconName={`icon_${
              data.topicName === "ufc" ? "ufc" : data.matchType
            }`}
            href={baseUrl + "/match/"}
          >
            <MatchCard data={data.matches} />
          </Frame>
          {!["dianjing", "aoyunhui", "dongaohui"].includes(data.topicName) && (
            <RankingContainer
              jifen={data.rankData}
              matchType={data.matchType}
              topicName={data.topicName}
              shooter={data.shooterData}
              assist={data.assistData}
            />
          )}
          {data.pageDescription && (
            <PageDescription desc={data.pageDescription} title={data.topic} />
          )}
        </div>
        <div className="min12:max-w-[390px] w-full flex flex-col gap-[25px]">
          {data.newsData && (
            <Frame
              title={"熱門新聞"}
              href={baseUrl + "/news/"}
              iconName={"icon_news"}
            >
              <ArticleList data={data.newsData} isRow={true} />
            </Frame>
          )}
          <MatchSideContainer
            data={data.hotMatches}
            href={"/" + data.otherType + "/"}
          />
        </div>
      </div>
      {/* <LastUpdate lastUpdate={data.lastUpdate} /> */}
    </div>
  );
}
