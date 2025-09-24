import PageTDK from "../../../components/tdk";
import { LogWriter, checkIsAliasLink, pageTypeVerify, tdkDate, getNewsTitle } from "../../../public/scripts/publicFunction";
import { enc, AES } from "crypto-js";
import ShareLiveMatchTypeTopicNameIndex from "../../../components/share_page/ShareLiveMatchTypeTopicNameIndex";
import ShareLiveMatchTypeTopicName from "../../../components/share_page/ShareLiveMatchTypeTopicName";

export default function LiveMatchTypeTopic(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      {data.pageType == "index" ? <ShareLiveMatchTypeTopicNameIndex data={data} /> : <ShareLiveMatchTypeTopicName data={data} />}
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
    if (tname.includes(".html")) {
      pageType = "competition";

      const url1 = process.env.API_DOMAIN + `/api/v1/match/detail?lang=zh_HANT`;
      const matchId = tname.replace(/\.html.*$/, "");
      const [data1, data1Tdk, locData] = await Promise.all([
        fetch(url1, {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            id: matchId,
            matchtype: matchType,
          }),
        }),
        fetch(process.env.API_DOMAIN + `/api/v1/match/detail`, {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            id: matchId,
            matchtype: matchType,
          }),
        }),

        fetch(process.env.API_DOMAIN + `/api/v1/checker/accesspolicy`, {
          method: "POST",
          headers: process.env.API_HEADER,
        }),
      ]);
      const processedData1 = data1.status == "200" && (await data1.json());
      if (data1.status != 200 || processedData1.code == 50000) {
        LogWriter("/" + matchType + "/" + matchId, data1.status, processedData1.code || "apiError");
        return {
          revalidate: 60,
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      const processedDataLoc = locData.status == 200 && (await locData.json());
      const encrypted = processedDataLoc?.data?.list && AES.encrypt(JSON.stringify(processedDataLoc?.data?.list), process.env.ENCRYPT_KEY).toString();
      const processeddata1Tdk = data1Tdk.status == "200" && (await data1Tdk.json());
      const topicName = processedData1?.data?.competition?.topic_name || matchType;
      const urltdk = process.env.API_DOMAIN + `/api/v1/basement/page`;
      const tdkBody =
        isAlias.isTdk == "Y"
          ? {
              url: isAlias.url,
              pattern: isAlias.url,
            }
          : {
              url: "/" + matchType + "/" + matchId + ".html",
              pattern: "/[matchtype]/[id].html",
              matchtype: matchType,
              id: matchId,
            };
      const APIsToCall = [
        fetch(process.env.API_DOMAIN + `/api/v1/articles/${topicName}?lang=zh_HANT`, {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            matchId: matchId,
            type: "match",
          }),
        }),
        fetch(urltdk, {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams(tdkBody),
        }),
      ];
      if (matchType === "zuqiu") {
        APIsToCall.push(
          fetch(process.env.API_DOMAIN + `/api/v1/match/lineup/?lang=zh_HANT`, {
            method: "POST",
            headers: process.env.API_HEADER,
            body: new URLSearchParams({
              id: matchId,
              matchtype: matchType,
            }),
          })
        );
      }
      const [matchVideos, tdkData, data4] = await Promise.all(APIsToCall);
      const match_videos = matchVideos.status == "200" && (await matchVideos.json());
      const processedData4 = data4?.status == "200" && (await data4.json());
      const tdk_data = tdkData.status == "200" && (await tdkData.json());
      const tdkrall = tdk_data?.data?.list?.Tdk;
      const matchDetailsTdk = matchType === "zuqiu" ? processeddata1Tdk?.data?.list?.match_detail : processeddata1Tdk?.data?.list;
      const matchDetails = matchType === "zuqiu" ? processedData1?.data?.list?.match_detail : processedData1?.data?.list;
      const tdk = {};
      const competition = matchDetailsTdk.competition || processeddata1Tdk?.data?.competition;
      const competitionName =
        matchType == "wangqiu"
          ? competition.gb
          : processeddata1Tdk?.data?.list?.match_detail?.competition?.name_abbr || matchDetailsTdk?.competition?.name_abbr;
      const HomeName =
        matchType == "wangqiu"
          ? matchDetailsTdk.is_single
            ? matchDetailsTdk.PlayerA1.name_j
            : matchDetailsTdk.PlayerA1.name_j + "/" + matchDetailsTdk.PlayerA2.name_j
          : matchDetailsTdk?.HomeTeam?.name_abbr;
      const AwayName =
        matchType == "wangqiu"
          ? matchDetailsTdk.is_single
            ? matchDetailsTdk.PlayerB1.name_j
            : matchDetailsTdk.PlayerB1.name_j + "/" + matchDetailsTdk.PlayerB2.name_j
          : matchDetailsTdk?.AwayTeam?.name_abbr;

      tdk.description =
        tdkrall?.description &&
        tdkrall.description
          .replace(/{{match.date}}/g, matchDetailsTdk.time ? tdkDate(matchDetailsTdk.time, "MM-DD") : "")
          .replace(/{{match.competitionName}}/g, competitionName)
          .replace(/{{match.homeName}}/g, HomeName)
          .replace(/{{match.awayName}}/g, AwayName);
      tdk.keywords =
        tdkrall?.keywords &&
        tdkrall.keywords
          .replace(/{{match.date}}/g, matchDetailsTdk.time ? tdkDate(matchDetailsTdk.time, "MM-DD") : "")
          .replace(/{{match.competitionName}}/g, competitionName)
          .replace(/{{match.homeName}}/g, HomeName)
          .replace(/{{match.awayName}}/g, AwayName);
      tdk.title =
        tdkrall?.title &&
        tdkrall.title
          .replace(/{{match.date}}/g, matchDetailsTdk.time ? tdkDate(matchDetailsTdk.time, "MM-DD") : "")
          .replace(/{{match.competitionName}}/g, competitionName)
          .replace(/{{match.homeName}}/g, HomeName)
          .replace(/{{match.awayName}}/g, AwayName);
      const ncomA = JSON.parse(JSON.stringify(matchDetails || null));
      const ncomB = JSON.parse(JSON.stringify(matchDetails || null));
      if (ncomA?.MatchLives) {
        ncomA.MatchLives = ncomA.MatchLives.filter(() => {
          return false;
        });
      }
      return {
        props: {
          carddataA: ncomA,
          carddata: ncomB,
          locData: encrypted || null,
          data_card: matchDetails || null,
          analysis: processedData1?.data?.list || null,
          matchVideos: match_videos?.data?.list || null,
          line_up: processedData4?.data?.list || null,
          rankData: processedData4?.data?.list || null,
          tdkData: tdk || null,
          friendsData: tdk_data?.data?.list?.friend_links || null,
          pageType,
          matchType,
          topic: processedData1?.data?.topic || null,
          topicName: processedData1?.data?.competition?.topic_name || null,
          lastUpdate: processedData1?.data?.last_update || null,
          navTitle:
            matchType !== "wangqiu"
              ? `${matchDetails?.competition?.name_abbr} - ` + matchDetails?.HomeTeam?.name_abbr + " VS " + matchDetails?.AwayTeam?.name_abbr
              : `${matchDetails?.competition?.kind} - ` +
                matchDetails?.PlayerA1?.name_f +
                (!matchDetails?.is_single ? " / " + matchDetails?.PlayerA2?.name_f : "") +
                " VS " +
                matchDetails?.PlayerB1?.name_f +
                (!matchDetails?.is_single ? " / " + matchDetails?.PlayerB2?.name_f : ""),
          navTags:
            matchType !== "wangqiu"
              ? [
                  ["/" + matchType + "/", getNewsTitle(matchType)],
                  // [
                  //   "/" + matchType + "/" + processedData1?.data?.competition?.topic_name + "/",
                  //   processedData1?.data?.topic,
                  // ],
                ]
              : [["/" + matchType + "/", getNewsTitle(matchType)]],
        },
        revalidate: Number(process.env.TIME_OUT_S),
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
              url: "/" + matchType + "/" + tname + "/",
              pattern: `/${matchType}/[topic]/`,
              matchtype: matchType,
              topic: tname,
            };
      const [matchdata, newsdata, videosData, hotMatches, transfer, tdkDatas] = await Promise.all([
        fetch(process.env.API_DOMAIN + `/api/v1/match/${tname}?lang=zh_HANT`, {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            order: "asc",
            groupby: "time",
            duration: 7,
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
          fetch(`${process.env.API_DOMAIN}/api/v1/worldcup/ranking/shooter?lang=zh_HANT&limit=10`, {
            method: "GET",
            headers: process.env.API_HEADER,
          }),
          fetch(`${process.env.API_DOMAIN}/api/v1/worldcup/ranking/assists?lang=zh_HANT&limit=10`, {
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
              ranking: 10,
              mode: "shooter",
            }),
          }),
          fetch(process.env.API_DOMAIN + `/api/v1/match/ranking/?lang=zh_HANT`, {
            method: "POST",
            headers: process.env.API_HEADER,
            body: new URLSearchParams({
              topic: tname,
              ranking: 10,
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
          navTitle: processedmatchdata?.data?.topic,
          navTags: [["/" + matchType + "/", getNewsTitle(matchType)]],
        },
        revalidate: Number(process.env.TIME_OUT_S),
      };
    }
  }
}
