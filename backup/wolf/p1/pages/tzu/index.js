import ShareMatchTopicName from "../../components/share_page/MatchTopicNameShare";
import PageTDK from "/components/tdk";
import { LogWriter, getPageTitle, getNewsTitle } from "../../public/scripts/publicFunction";
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
  const matchType = "zuqiu";
  const body = {
    order: "asc",
    groupby: "time",
    duration: 7,
    state: "active",
  };

  const [activeData, newsData, saishiData, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/match/${matchType}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(body),
    }),

    fetch(process.env.API_DOMAIN + `/api/v1/articles/${matchType === "hot" ? "all" : matchType}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 8,
        type: "text",
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/competition/all?lang=zh_HANT`, {
      method: "GET",
      headers: process.env.API_HEADER,
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
    LogWriter("/tzu/", activeData.status, active_matches.code);
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
      matches: active_matches.data?.list || null,
      newsData: news_data?.data?.list || null,
      saishiData: saishiDataProcessed?.data?.list || null,
      matchType: matchType,
      topic: getPageTitle("match/" + matchType) ? getPageTitle("match/" + matchType) : active_matches.data.topic,
      tdkData: tdkData?.data?.list?.Tdk,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: active_matches?.data?.last_update || null,
      matchType: matchType || null,
      topicName: matchType,
      navTitle: getNewsTitle(matchType) ? getNewsTitle(matchType) + "队" : active_matches?.data?.topic + "队",
      pageType: "team",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
