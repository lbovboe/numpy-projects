import ShareLiveMatchTypeTopicNameIndex from "../../../components/share_page/ShareLiveMatchTypeTopicNameIndex";
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
      <ShareLiveMatchTypeTopicNameIndex data={data} />
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

  pageType = "index";
  const tdkBody =
    isAlias.isTdk == "Y"
      ? {
          url: isAlias.url,
          pattern: isAlias.url,
        }
      : {
          url: "/" + matchType + "/" + tname + "/playback/",
          pattern: `/${matchType}/[topic]/playback/`,
          topic: tname,
        };

  const [matchdata, hotMatches, newsdata, videosData, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/match/${tname}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        order: "desc",
        duration: 7,
        groupby: "time",
        state: "complete",
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/match/hot?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        order: "asc",
        limit: 6,
      }),
    }),
    fetch(process.env.API_DOMAIN + "/api/v1/topic/sidearticle/?lang=zh_HANT", {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        type: "text",
        topic: tname,
        matchtype: matchType,
        limit: 8,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/matchvideos?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        page: 1,
        pageSize: "8",
        topic:matchType
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(tdkBody),
    }),
  ]);
  let processedrankdata = "",
    shooter_data,
    assist_data;
  if (tname == "shijiebei") {
    const [rankdata, dataShooter, dataAssist] = await Promise.all([
      fetch(process.env.API_DOMAIN + `/api/v1/match/ranking/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          topic: tname,
          mode: "fullteam",
        }),
      }),
      fetch(
        `${process.env.API_DOMAIN}/api/v1/worldcup/ranking/shooter?lang=zh_HANT&limit=30`,
        {
          method: "GET",
          headers: process.env.API_HEADER,
        }
      ),
      fetch(
        `${process.env.API_DOMAIN}/api/v1/worldcup/ranking/assists?lang=zh_HANT&limit=30`,
        {
          method: "GET",
          headers: process.env.API_HEADER,
        }
      ),
    ]);
    processedrankdata = rankdata.status == 200 && (await rankdata.json());
    shooter_data = dataShooter.status == 200 && (await dataShooter.json());
    assist_data = dataAssist.status == 200 && (await dataAssist.json());
  } else {
    const [rankdata, dataShooter, dataAssist] = await Promise.all([
      fetch(process.env.API_DOMAIN + `/api/v1/match/ranking/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          topic: tname,
          mode: "fullteam",
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/match/ranking/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          topic: tname,
          ranking: 30,
          mode: "shooter",
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/match/ranking/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          topic: tname,
          ranking: 30,
          mode: "assist",
        }),
      }),
    ]);
    processedrankdata = rankdata.status == 200 && (await rankdata.json());
    if (matchType === "zuqiu") {
      shooter_data = dataShooter.status == 200 && (await dataShooter.json());
      assist_data = dataAssist.status == 200 && (await dataAssist.json());
    }
  }
  const processedmatchdata =
    matchdata.status == 200 && (await matchdata.json());
  if (matchdata.status != 200 || processedmatchdata.code == 50000) {
    LogWriter(
      "/" + matchType + "/" + tname,
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
  const hot_matches = hotMatches?.status == 200 && (await hotMatches?.json());
  const processednewsdata = newsdata.status == 200 && (await newsdata.json());
  const videos = videosData.status == 200 && await videosData.json();
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      matches: processedmatchdata?.data?.list || null,
      hotMatches: hot_matches?.data?.list || null,
      newsData: processednewsdata?.data?.list || null,
      videosData: videos?.data?.list || null,
      rankData: processedrankdata?.data?.list || null,
      shooterData: shooter_data?.data?.list || null,
      assistData: assist_data?.data?.list || null,
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      topic: processedmatchdata?.data?.topic || null,
      pageDescription: tdkData?.data?.list?.content || null,
      lastUpdate: processedmatchdata?.data?.last_update || null,
      pageType: pageType,
      topicName: tname,
      matchType: matchType,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
