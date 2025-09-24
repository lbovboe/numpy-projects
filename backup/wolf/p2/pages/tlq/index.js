import ShareMatchTopicName from "../../components/share_page/MatchTopicNameShare";
import PageTDK from "/components/tdk";
import { LogWriter, getPageTitle } from "../../public/scripts/publicFunction";

export default function MatchPage(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      <div className="">
        <ShareMatchTopicName data={data} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const matchType = "lanqiu";
  const body = {
    order: "asc",
    groupby: "time",
    duration: 7,
    state: "active",
  };
  const bodyEnd = {
    order: "desc",
    groupby: "time",
    duration: 7,
    state: "complete",
  };
  const [activeData, completedMatches, newsData,videosData, hotSaishi, hotChannels, tdkDatas] =
    await Promise.all([
      fetch(
        process.env.API_DOMAIN + `/api/v1/match/${matchType}?lang=zh_HANT`,
        {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams(body),
        }
      ),
      fetch(
        process.env.API_DOMAIN + `/api/v1/match/${matchType}?lang=zh_HANT`,
        {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams(bodyEnd),
        }
      ),
      fetch(
        process.env.API_DOMAIN + `/api/v1/articles/${matchType}?lang=zh_HANT`,
        {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            limit: 10,
            type: "text",
          }),
        }
      ),
      fetch(
        process.env.API_DOMAIN + "/api/v1/matchvideos/?lang=zh_HANT",
        {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            topic: matchType,
            matchtype: matchType,
            limit: 10,
          }),
        } 
      ),
      fetch(
        process.env.API_DOMAIN + `/api/v1/competition/groupnew?lang=zh_HANT`,
        {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            limit: 10,
          }),
        }
      ),
      fetch(process.env.API_DOMAIN + `/api/v1/general/channel/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          hot: 1,
          limit: 8,
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          url: "/" + matchType + "/",
          pattern: "/[topic]/",
          topic: matchType,
        }),
      }),
    ]);
  const active_matches = activeData.status == 200 && (await activeData.json());
  if (activeData.status != 200 || active_matches.code == 50000) {
    LogWriter("/tlq/", activeData.status, active_matches.code);
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const news_data = newsData.status == 200 && (await newsData.json());
  const videos = videosData?.status == 200 && await videosData.json();
  const end_match =
  completedMatches.status == 200 && (await completedMatches.json());
const hot_channels = hotChannels.status == 200 && (await hotChannels.json());
const hot_saishi = hotSaishi.status == 200 && (await hotSaishi.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      matches: active_matches.data?.list || null,
      newsData: news_data?.data?.list || null,
      videosData: videos?.data?.list || null,
      completedMatches: end_match.data?.list || null,
      hotChannels: hot_channels?.data?.list || null,
      hotSaishi: hot_saishi?.data?.list || null,
      matchType: matchType,
      topic: getPageTitle("match/" + matchType)
        ? getPageTitle("match/" + matchType)
        : active_matches.data.topic,
      tdkData: tdkData?.data?.list?.Tdk,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: active_matches?.data?.last_update || null,
      matchType: matchType || null,
      topicName: matchType,
      pageType: "match",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
