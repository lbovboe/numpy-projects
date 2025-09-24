import TopicMatchShare from "../../../components/share_page/TopicMatchShare";
import PageTDK from "../../../components/tdk";
import {
  LogWriter,
  checkIsAliasLink,
  pageTypeVerify,
} from "../../../public/scripts/publicFunction";

export default function LiveMatchTypeTopic(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      <TopicMatchShare data={data} />
    </>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  var pageType = "";

  const isAlias = checkIsAliasLink(params.topic_name);
  const tname = isAlias.val;

  const matchType = pageTypeVerify(params.match_type);
  if (matchType == "404") {
    // redirect to 404 page;
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  pageType = "topic";
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
  const tdkBody =
    isAlias.isTdk == "Y"
      ? {
          url: isAlias.url,
          pattern: isAlias.url,
        }
      : {
          url: "/" + matchType + "/" + tname + "/",
          pattern: `/${matchType}/[topic]/`,
          matchtype: matchType,
          topic: tname,
        };
  const otherType =
    matchType === "zuqiu"
      ? "lanqiu"
      : matchType === "lanqiu"
      ? "zuqiu"
      : matchType === "wangqiu"
      ? "all"
      : matchType;
  const [
    matchdata,
    completedMatches,
    hotMatches,
    newsData,
    videosData,
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
    fetch(process.env.API_DOMAIN + `/api/v1/match/${otherType}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        order: "asc",
        limit: 5,
        state: "active",
      }),
    }),
    fetch(process.env.API_DOMAIN + "/api/v1/topic/sidearticle/?lang=zh_HANT", {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        type: "text",
        topic: tname,
        matchtype: matchType,
        limit: 10,
      }),
    }),
    fetch(process.env.API_DOMAIN + "/api/v1/matchvideos/?lang=zh_HANT", {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        topic: tname,
        matchtype: matchType,
        limit: 10,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(tdkBody),
    }),
  ]);
  const processedmatchdata =
    matchdata.status == 200 && (await matchdata.json());
  if (matchdata.status != 200 || processedmatchdata.code == 50000) {
    LogWriter(
      "/" + matchType + "/" + tname + "/match/",
      matchdata.status,
      processedmatchdata.code || "apiError"
    );
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
  const videos = videosData?.status == 200 && await videosData?.json();
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      matches: processedmatchdata?.data?.list || null,
      newsData: news_data?.data?.list || null,
      videosData:videos?.data?.list||null,
      completedMatches: end_match.data?.list || null,
      hotMatches: hot_matches?.data?.list || null,
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      topic: processedmatchdata?.data?.topic || null,
      pageDescription: tdkData?.data?.list?.content || null,
      lastUpdate: processedmatchdata?.data?.last_update || null,
      pageType: pageType,
      topicName: tname,
      matchType: matchType,
      otherType,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
