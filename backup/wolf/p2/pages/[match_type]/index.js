import PageTDK from "/components/tdk";
import {
  LogWriter,
  getPageTitle,
  checkIsAliasLink,
} from "../../public/scripts/publicFunction";
import MatchTopicNameShare from "../../components/share_page/MatchTopicNameShare";

export default function MatchPage(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      <MatchTopicNameShare data={data}/>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

const allowedTopics = ["lanqiu", "zuqiu", "zonghe", "all", "hot", "playback"];
export async function getStaticProps({ params }) {
  const isAlias = checkIsAliasLink(params.match_type);
  const matchType = isAlias?.val;
  if (!allowedTopics.includes(matchType)) {
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const tdkBody =
    isAlias.isTdk == "Y"
      ? {
          url: isAlias.url,
          pattern: isAlias.url,
        }
      : {
          url: "/" + matchType + "/",
          pattern: "/[matchtype]/",
          topic: matchType,
        };
  const body = {
    order: "asc",
    groupby: "time",
    duration: 7,
    state: "active",
  };
  const endBody = {
    order: "desc",
    groupby: "time",
    duration: 7,
    state: "complete",
  };
  if (matchType === "hot") {
    body.important = 1;
    endBody.important = 1;
  }

  const type = ["hot", "playback"].includes(matchType) ? "all" : matchType;
  const [
    activeData,
    completedMatches,
    newsData,
    videosData,
    hotSaishi,
    hotChannels,
    tdkDatas,
  ] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/match/${type}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(body),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/match/${type}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(endBody),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/articles/${type}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 10,
        type: "text",
      }),
    }),
    fetch(process.env.API_DOMAIN + "/api/v1/matchvideos/?lang=zh_HANT", {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        topic: type,
        matchtype: type,
        limit: 10,
      }),
    }),
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
        limit: 6,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(tdkBody),
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
  const videos = videosData?.status == 200 && (await videosData.json());
  const end_match =
    completedMatches.status == 200 && (await completedMatches.json());
  const hot_saishi = hotSaishi.status == 200 && (await hotSaishi.json());
  const hot_channels = hotChannels.status == 200 && (await hotChannels.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      matches: active_matches.data?.list || null,
      newsData: news_data?.data?.list || null,
      videosData: videos?.data?.list || null,
      completedMatches: end_match.data?.list || null,
      hotSaishi: hot_saishi?.data?.list || null,
      hotChannels: hot_channels?.data?.list || null,
      topic: getPageTitle("match/" + matchType)
        ? getPageTitle("match/" + matchType)
        : active_matches.data.topic,
      tdkData: tdkData?.data?.list?.Tdk,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: active_matches?.data?.last_update || null,
      matchType: type || null,
      topicName: matchType,
      pageType: "match",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
