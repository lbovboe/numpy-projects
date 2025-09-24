import PageDescription from "../contain/page_description";
import { getBaseUrl } from "../../public/scripts/publicFunction";
import Frame from "../tools/Frame";
import RankingContainer from "../contain/RankingCards/RankingContainer";
import LastUpdate from "../tools/last_update";
import ArticleList from "../contain/articleCards/ArticleList";
import MatchContainer from "../contain/matchCards/MatchContainer";
import RecomMatches from "../contain/matchCards/RecomMatches";
import TopicNav from "../header/TopicNav";

export default function ShareLiveMatchTypeTopicNameIndex({ data }) {
  const baseUrl = getBaseUrl(data.matchType, data.topicName);
  return (
    <div className="mt-[20px]">
      <TopicNav baseUrl={baseUrl} />
      <div className="flex flex-wrap gap-[20px] w-full mt-[15px]">
        <div className="min12:max-w-[790px] w-full flex flex-col gap-[25px]">
          {data.matches && (
            <Frame title={`${data.topic}`}>
              <MatchContainer data={data.matches} />
            </Frame>
          )}
          <RecomMatches data={data.hotMatches} href={"/hot/"} />
        </div>
        <div className="min12:max-w-[390px] w-full flex flex-col gap-[25px]">
          {data?.newsData?.length > 0 && (
            <Frame title={data.topic + "新聞"}>
              <ArticleList data={data.newsData} layout="row" />
            </Frame>
          )}
          {data.matchType === "zonghe" && data?.videosData?.length > 0 && (
            <Frame title={"熱門集錦"}>
              <ArticleList data={data.videosData} layout="row" type="video" />
            </Frame>
          )}
          {!["dianjing", "aoyunhui", "dongaohui"].includes(data.topicName) && (
            <RankingContainer
              jifen={data.rankData}
              matchType={data.matchType}
              topicName={data.topicName}
              shooter={data.shooterData}
              assist={data.assistData}
            />
          )}
        </div>
      </div>
      {data.pageDescription && (
        <PageDescription desc={data.pageDescription} title={data.topic} />
      )}
      {/* <LastUpdate lastUpdate={data.lastUpdate} /> */}
    </div>
  );
}
