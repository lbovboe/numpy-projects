import PageTDK from "/components/tdk";
import { LogWriter, getPageTitle } from "../../public/scripts/publicFunction";
import TopicMatchShare from "../../components/share_page/TopicMatchShare";

export default function MatchPage(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      <TopicMatchShare data={data} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const matchType = "wangqiu";
  const tname = "wangqiu";
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
  const hotType = ["lanqiu", "wangqiu"].includes(matchType)
    ? "zuqiu"
    : "lanqiu";
  const [
    activeData,
    completedMatches,
    newsData,
    videosData,
    hotMatches,
    tdkDatas,
  ] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/match/${tname}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(body),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/match/${tname}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(bodyEnd),
    }),
    fetch(process.env.API_DOMAIN + "/api/v1/topic/sidearticle/?lang=zh_HANT", {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        type: "text",
        topic: tname,
        matchtype: "all",
        limit: 10,
      }),
    }),
    fetch(process.env.API_DOMAIN + "/api/v1/matchvideos/?lang=zh_HANT", {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        topic: tname,
        matchtype: "all",
        limit: 10,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/match/${"all"}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        order: "asc",
        limit: 5,
        state: "active",
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        url: "/" + matchType + "/match/",
        pattern: "/[topic]/match",
        topic: matchType,
      }),
    }),
  ]);
  const active_matches = activeData.status == 200 && (await activeData.json());
  if (activeData.status != 200 || active_matches.code == 50000) {
    LogWriter("/" + matchType + "/", activeData.status, active_matches.code);
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const news_data = newsData.status == 200 && (await newsData.json());
  const end_match =
    completedMatches.status == 200 && (await completedMatches.json());
  const hot_matches = hotMatches?.status == 200 && (await hotMatches?.json());
  const videos = videosData?.status == 200 && (await videosData?.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      matches: active_matches.data?.list || null,
      newsData: news_data?.data?.list || null,
      completedMatches: end_match.data?.list || null,
      videosData: videos?.data?.list || null,
      topic: getPageTitle("match/" + matchType)
        ? getPageTitle("match/" + matchType)
        : active_matches.data.topic,
      hotMatches: hot_matches?.data?.list || null,
      tdkData: tdkData?.data?.list?.Tdk,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: active_matches?.data?.last_update || null,
      matchType: matchType || null,
      topicName: matchType,
      pageType: "topic",
      newsType: "all",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
