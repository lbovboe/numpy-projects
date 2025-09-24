import PageTDK from "../../../components/tdk";
import {
  LogWriter,
  checkIsAliasLink,
  pageTypeVerify,
  tdkDate,
  getNewsTitle,
} from "../../../public/scripts/publicFunction";
import { enc, AES } from "crypto-js";
import ShareLiveMatchTypeTopicNameIndex from "../../../components/share_page/ShareLiveMatchTypeTopicNameIndex";
import ShareLiveMatchTypeTopicName from "../../../components/share_page/ShareLiveMatchTypeTopicName";

export default function LiveMatchTypeTopic(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      {data.pageType == "index" ? (
        <ShareLiveMatchTypeTopicNameIndex data={data} />
      ) : (
        <ShareLiveMatchTypeTopicName data={data} />
      )}
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
  } else {
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
    const [matchdata, newsdata, videosData, hotMatches, transfer, tdkDatas] = await Promise.all([
      fetch(process.env.API_DOMAIN + `/api/v1/match/${tname}?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          order: "desc",
          groupby: "time",
          duration: 7,
          state: "complete",
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
      fetch(process.env.API_DOMAIN + `/api/v1/matchvideos/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          topic: tname,
          limit: 8,
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/competition/match/recent/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          important: 1,
          limit: 6,
          topic: "all",
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/transferhistory/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 10,
          topic: tname,
          matchtype: matchType,
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
        fetch(`${process.env.API_DOMAIN}/api/v1/worldcup/ranking/shooter?lang=zh_HANT&limit=20`, {
          method: "GET",
          headers: process.env.API_HEADER,
        }),
        fetch(`${process.env.API_DOMAIN}/api/v1/worldcup/ranking/assists?lang=zh_HANT&limit=20`, {
          method: "GET",
          headers: process.env.API_HEADER,
        }),
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
            ranking: 20,
            mode: "shooter",
          }),
        }),
        fetch(process.env.API_DOMAIN + `/api/v1/match/ranking/?lang=zh_HANT`, {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            topic: tname,
            ranking: 20,
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
    const processedmatchdata = matchdata.status == 200 && (await matchdata.json());
    if (matchdata.status != 200 || processedmatchdata.code == 50000) {
      LogWriter("/" + matchType + "/" + tname, matchdata.status, processedmatchdata.code || "apiError");
      return {
        revalidate: 60,
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const processednewsdata = newsdata.status == 200 && (await newsdata.json());
    const videos = videosData.status == 200 && (await videosData.json());
    const hot_matches = hotMatches.status == 200 && (await hotMatches.json());
    const transferData = transfer.status == 200 && (await transfer.json());
    const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
    return {
      props: {
        matches: processedmatchdata?.data?.list || null,
        newsData: processednewsdata?.data?.list || null,
        transfer: transferData?.data?.list || null,
        rankData: processedrankdata?.data?.list || null,
        shooterData: shooter_data?.data?.list || null,
        assistData: assist_data?.data?.list || null,
        videosData: videos.data?.list || null,
        hotMatches: hot_matches.data?.list || null,
        tdkData: tdkData?.data?.list?.Tdk || null,
        friendsData: tdkData?.data?.list?.friend_links || null,
        topic: processedmatchdata?.data?.topic || null,
        pageDescription: tdkData?.data?.list?.content || null,
        lastUpdate: processedmatchdata?.data?.last_update || null,
        pageType: pageType,
        topicName: tname,
        matchType: matchType,
        navTitle: processedmatchdata?.data?.topic + "完赛",
        navTags: [
          ["/" + matchType + "/", getNewsTitle(matchType)],
          ["/" + matchType + "/" + tname + "/", processedmatchdata?.data?.topic],
        ],
      },
      revalidate: Number(process.env.TIME_OUT_S),
    };
  }
}
