import MatchTopicNameShare from "../../components/share_page/MatchTopicNameShare";
import PageTDK from "/components/tdk";
import { LogWriter, getNewsTitle, checkIsAliasLink } from "../../public/scripts/publicFunction";
export default function MatchPage(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      <div className="">
        <MatchTopicNameShare data={data} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

const allowedTopics = ["lanqiu", "zuqiu", "zonghe", "all", "hot", "match", "playback"];

export async function getStaticProps({ params }) {
  const isAlias = checkIsAliasLink(params.match_type);
  let matchType = isAlias?.val;
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
    matchlives: 1,
  };
  const bodyEnd = {
    order: "desc",
    groupby: "time",
    duration: 7,
    state: "complete",
  };
  const newsBody = {
    limit: 8,
    type: "text",
  };
  if (matchType === "hot") {
    bodyEnd.important = 1;
    body.important = 1;
    newsBody.important = 1;
  }
  if (matchType === "match") {
    matchType = "all";
  }

  const type = matchType == "hot" ? "all" : matchType;
  const [activeData, newsData, saishiData, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/match/${matchType}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(body),
    }),

    fetch(process.env.API_DOMAIN + `/api/v1/articles/${type}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(newsBody),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/competition/all?lang=zh_HANT`, {
      method: "GET",
      headers: process.env.API_HEADER,
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
  const saishiDataProcessed = saishiData.status == 200 && (await saishiData.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      matches: active_matches?.data?.list || null,
      newsData: news_data?.data?.list || null,
      saishiData: saishiDataProcessed?.data?.list || null,
      topic: getNewsTitle(matchType) ? getNewsTitle(matchType) : active_matches?.data?.topic,
      tdkData: tdkData?.data?.list?.Tdk,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: active_matches?.data?.last_update || null,
      matchType: matchType || null,
      topicName: matchType,
      pageType: "index",
      newsType: type,
      navTitle:
        getNewsTitle(matchType) + "比賽" ? getNewsTitle(matchType) + "比賽" : active_matches?.data?.topic + "比賽",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
