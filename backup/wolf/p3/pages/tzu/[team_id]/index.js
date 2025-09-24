import PageTDK from "/components/tdk";
import {
  LogWriter,
  checkIsAliasLink,
} from "../../../public/scripts/publicFunction";
import React from "react";
import TeamMatchShare from "../../../components/share_page/TeamMatchShare";

export default function MatchPage(data) {
  return (
    <React.Fragment>
      <PageTDK data={data.tdkData} />
      <TeamMatchShare data={data} />
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
  const matchType = "zuqiu";
  const isAlias = checkIsAliasLink(params.team_id);
  const teamId = isAlias.val;
  const tdkBody =
    isAlias.isTdk == "Y"
      ? { url: isAlias.url, pattern: isAlias.url }
      : {
          url: "/tzu/" + teamId + "/",
          pattern: "/tzu/[id]/",
          id: teamId,
        };
  const otherType =
    matchType === "zuqiu"
      ? "lanqiu"
      : matchType === "lanqiu"
      ? "zuqiu"
      : matchType === "wangqiu"
      ? "all"
      : matchType;
  const [activeData, completedMatches, activeDataTdk, newsData, tdkDatas] =
    await Promise.all([
      fetch(process.env.API_DOMAIN + `/api/v1/match/team?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          state: "active",
          duration: 7,
          order: "asc",
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
          duration: 3,
          order: "desc",
          // groupby: "time",
          matchtype: matchType,
          team: teamId,
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/match/team`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          state: "active",
          duration: 7,
          order: "asc",
          groupby: "time",
          matchtype: matchType,
          team: teamId,
        }),
      }),
      fetch(
        process.env.API_DOMAIN + `/api/v1/articles/all?lang=zh_HANT`,
        {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            limit: "500",
            page: 1,
            pageSize: "12",
            type: "text",
            navigate: 1,
          }),
        }
      ),
      fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams(tdkBody),
      }),
    ]);
  const active_matches = activeData.status == 200 && (await activeData.json());
  if (activeData.status != 200 || active_matches.code == 50000) {
    LogWriter("/tzu/" + teamId + "/", activeData.status, active_matches.code);
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const active_matchesTdk =
    activeDataTdk.status == 200 && (await activeDataTdk.json());
  const end_match =
    completedMatches.status == 200 && (await completedMatches.json());
  const news_data = newsData.status == 200 && (await newsData.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  const tdkRall = {};
  tdkRall.title = tdkData?.data?.list?.Tdk.title.replace(
    /{{topic.title}}/g,
    active_matchesTdk?.data?.topic
  );
  tdkRall.description = tdkData?.data?.list?.Tdk.description.replace(
    /{{topic.title}}/g,
    active_matchesTdk?.data?.topic
  );
  tdkRall.keywords = tdkData?.data?.list?.Tdk.keywords.replace(
    /{{topic.title}}/g,
    active_matchesTdk?.data?.topic
  );
  tdkRall.friend_links = tdkData?.data?.list?.friend_links;
  return {
    props: {
      matches: active_matches.data?.list || null,
      newsData: news_data?.data?.list || null,
      completedMatches: end_match.data?.list || null,
      matchType: matchType,
      topic: active_matches.data?.topic + "隊",
      tdkData: tdkRall,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: active_matches?.data?.last_update || null,
      matchType: matchType || null,
      topicName: matchType,
      pageType: "team",
      teamId: teamId,
      otherType,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
