import React from "react";
import ShareLiveMatchTypeTopicNameIndex from "../../components/share_page/ShareLiveMatchTypeTopicNameIndex";
import PageTDK from "../../components/tdk";
import { LogWriter } from "../../public/scripts/publicFunction";
import queryString from "query-string";

export default function LiveMatchTypeTopic(data) {
  return (
    <React.Fragment>
      <PageTDK data={data.tdkData} />
      <ShareLiveMatchTypeTopicNameIndex data={data} />
    </React.Fragment>
  );
}

export async function getStaticProps({ params }) {
  const mtype = "wangqiu";
  const tname = "wangqiu";
  const queryParams1 = queryString.stringify({ count: 14 });

  const [matchdata, newsdata, rankdata, hotMatches, tdkDatas] =
    await Promise.all([
      fetch(
        process.env.API_DOMAIN +
          `/api/v1/competition/${mtype}?${queryParams1}&lang=zh_HANT`,
        {
          method: "GET",
          headers: process.env.API_HEADER,
        }
      ),
      fetch(
        process.env.API_DOMAIN + `/api/v1/topic/sidearticle/?lang=zh_HANT`,
        {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            type: "text",
            topic: tname,
            matchtype: "all",
            limit: 10,
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
      fetch(
        process.env.API_DOMAIN + `/api/v1/match/${"all"}?lang=zh_HANT`,
        {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            order: "asc",
            limit: 5,
            state: "active",
          }),
        }
      ),
      fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          url: "/wangqiu/",
          pattern: "/[matchtype]/",
          matchtype: "wangqiu",
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
      otherType:"all",
      lastUpdate: processedmatchdata?.data?.last_update || null,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
