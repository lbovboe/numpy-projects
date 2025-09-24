import ShareLiveMatchTypeTopicNameIndex from "../../components/share_page/ShareLiveMatchTypeTopicNameIndex";
import PageTDK from "../../components/tdk";
import {
  LogWriter,
  checkIsAliasLink,
  pageTypeVerify,
} from "../../public/scripts/publicFunction";

export default function LiveMatchTypeTopic(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      <ShareLiveMatchTypeTopicNameIndex data={data} />
    </>
  );
}

export async function getStaticProps({ params }) {
  var pageType = "";

  const tname = "wangqiu";
  const mtype = "wangqiu";
  if (mtype == "404") {
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

  const [matchdata, hotMatches, newsdata, rankdata, tdkDatas] =
    await Promise.all([
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
      fetch(
        process.env.API_DOMAIN + "/api/v1/topic/sidearticle/?lang=zh_HANT",
        {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            type: "text",
            topic: tname,
            matchtype: mtype,
            limit: 8,
          }),
        }
      ),
      fetch(process.env.API_DOMAIN + `/api/v1/match/ranking/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          topic: tname,
          mode: "team",
          ranking: 10,
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          url: "/wangqiu/playback/",
          pattern: "/wangqiu/playback/",
         
        }),
      }),
    ]);

  const processedmatchdata =
    matchdata.status == 200 && (await matchdata.json());
  if (matchdata.status != 200 || processedmatchdata.code == 50000) {
    LogWriter(
      "/" + mtype + "/",
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
  const processednewsdata = newsdata.status == 200 && (await newsdata.json());
  const processedrankdata = rankdata.status == 200 && (await rankdata.json());
  const hot_matches = hotMatches.status == 200 && (await hotMatches.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      matches: processedmatchdata?.data?.list || null,
      newsData: processednewsdata?.data?.list || null,
      rankData: processedrankdata?.data?.list || null,
      hotMatches: hot_matches?.data?.list || null,
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      topic: processedmatchdata?.data?.topic || null,
      pageDescription: tdkData?.data?.list?.content || null,
      topicName: tname,
      matchType: mtype,
      lastUpdate: processedmatchdata?.data?.last_update || null,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
