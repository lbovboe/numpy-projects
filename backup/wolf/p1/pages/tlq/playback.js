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
  const [completeData, newsData,  saishiData, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/match/${matchType === "hot" ? "all" : matchType}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(bodyEnd),
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
        url: "/" + matchType + "/playback/",
        pattern: "/[topic]/playback/",
        topic: matchType,
      }),
    }),
  ]);
  const complete_matches = completeData.status == 200 && (await completeData.json());
  if (completeData.status != 200 || complete_matches.code == 50000) {
    LogWriter("/tlq/", completeData.status, complete_matches.code);
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
      matches: complete_matches.data?.list || null,
      newsData: news_data?.data?.list || null,
      saishiData: saishiDataProcessed?.data?.list || null,
      matchType: matchType,
      topic: getPageTitle("match/" + matchType) ? getPageTitle("match/" + matchType) : complete_matches.data.topic,
      tdkData: tdkData?.data?.list?.Tdk,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: complete_matches?.data?.last_update || null,
      matchType: matchType || null,
      topicName: matchType,
      navTitle:
        getNewsTitle(matchType) + "队完赛" ? getNewsTitle(matchType) + "队完赛" : complete_matches?.data?.topic + "队完赛",
      navTags: [["/" + matchType + "/", getNewsTitle(matchType)+"队"]],
      pageType: "team",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
