import ShareMatchTopicName from "../../../components/share_page/MatchTopicNameShare";
import PageTDK from "/components/tdk";
import { LogWriter, checkIsAliasLink, getNewsTitle } from "../../../public/scripts/publicFunction";
import React from "react";

export default function MatchPage(data) {
  return (
    <React.Fragment>
      <PageTDK data={data.tdkData} />
      <div className="">
        <ShareMatchTopicName data={data} />
      </div>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const matchType = "lanqiu";
  const isAlias = checkIsAliasLink(params.team_id);
  const teamId = isAlias.val;
  const tdkBody =
    isAlias.isTdk == "Y"
      ? { url: isAlias.url, pattern: isAlias.url }
      : {
          url: "/tlq/" + teamId + "/playback/",
          pattern: "/tlq/[id]/playback/",
          id: teamId,
        };
  const [completeDataTdk, completeData, newsData, hotChannels, saishiData, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/match/team`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        state: "complete",
        duration: 7,
        order: "desc",
        groupby: "time",
        matchtype: matchType,
        team: teamId,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/match/team?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        state: "complete",
        duration: 7,
        order: "desc",
        groupby: "time",
        matchtype: matchType,
        team: teamId,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/articles/${matchType}?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 8,
        type: "text",
      }),
    }),

    fetch(process.env.API_DOMAIN + `/api/v1/general/channel/`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({ hot: 1, limit: 6 }),
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
  const complete_matches = completeData.status == 200 && (await completeData.json());
  if (completeData.status != 200 || complete_matches.code == 50000) {
    LogWriter("/tlq/" + teamId + "/", completeData.status, complete_matches.code);
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const complete_matchesTdk = completeDataTdk.status == 200 && (await completeDataTdk.json());
  const news_data = newsData.status == 200 && (await newsData.json());
  const hot_channels = hotChannels.status == 200 && (await hotChannels.json());

  const saishiDataProcessed = saishiData.status == 200 && (await saishiData.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  const tdkRall = {};
  tdkRall.title = tdkData?.data?.list?.Tdk.title.replace(/{{topic.title}}/g, complete_matchesTdk?.data?.topic);
  tdkRall.description = tdkData?.data?.list?.Tdk.description.replace(
    /{{topic.title}}/g,
    complete_matchesTdk?.data?.topic
  );
  tdkRall.keywords = tdkData?.data?.list?.Tdk.keywords.replace(/{{topic.title}}/g, complete_matchesTdk?.data?.topic);
  tdkRall.friend_links = tdkData?.data?.list?.friend_links;
  return {
    props: {
      matches: complete_matches.data?.list || null,
      newsData: news_data?.data?.list || null,
      headerHotChannels: hot_channels?.data?.list || null,
      saishiData: saishiDataProcessed?.data?.list || null,
      matchType: matchType,
      topic: complete_matches.data?.topic + "隊",
      tdkData: tdkRall,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: complete_matches?.data?.last_update || null,
      matchType: matchType || null,
      topicName: matchType,
      navTitle: complete_matches?.data?.topic + "完赛",
      navTags: [
        ["/tlq/", getNewsTitle(matchType)+"队"],
        ["/tlq/" + teamId + "/", complete_matches?.data?.topic],
      ],
      pageType: "team",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
