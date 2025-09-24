import queryString from "query-string";
import { useEffect, useState } from "react";
import DaohangHeader from "../components/header/dh_header";
import PageTDK from "../components/tdk";
import HotMatches from "../components/contain/homeCards/HotMatches";
import ArticleList from "../components/contain/articleCards/ArticleList";
import HotSaishi from "../components/contain/homeCards/HotSaishi";
import HotProducts from "../components/contain/homeCards/HotProducts";
import { enc, AES } from "crypto-js";
import Frame from "../components/tools/Frame";
import DhChannels from "../components/contain/homeCards/DhChannels";
import DhSjbCard from "../components/contain/homeCards/DhSjbCard";

export default function Index(data) {
  const [dataCard, setDataCard] = useState(data.carddataA);
  const [triggerUpdate, setTriggerUpdate] = useState(null);

  useEffect(() => {
    if (data.locData && data.locationCheck) {
      const locData = JSON.parse(
        AES.decrypt(data.locData, process.env.ENCRYPT_KEY).toString(enc.Utf8)
      );
      const isShow =
        locData.regions.includes(data.locationCheck.pos) ||
        locData.ip.includes(data.locationCheck.ip)
          ? false
          : true;
      data.carddata &&
        data.carddata.forEach((v) => {
          v.matches &&
            v.matches.forEach((v2) => {
              v2.match_lives.all =
                v2?.match_lives?.all &&
                v2?.match_lives?.all.filter((item1) => {
                  return isShow || item1.vendor_id === 5;
                });
              v2.match_lives.more =
                v2?.match_lives?.more &&
                v2?.match_lives?.more.filter((item1) => {
                  return isShow || item1.vendor_id === 5;
                });
              v2.match_lives.on_display =
                v2?.match_lives?.on_display &&
                v2?.match_lives?.on_display.filter((item1) => {
                  return isShow || item1.vendor_id === 5;
                });
            });
        });
      setDataCard(data.carddata);
      setTriggerUpdate("Y");
    }
  }, [data]);

  return (
    <>
      <PageTDK data={data.tdkData} />
      <div className="space-y-[20px] mt-[30px]">
        <DaohangHeader data={data.keyworddata} />
        <HotMatches data={dataCard} />
        {data?.newsData?.length > 0 && (
          <div>
            <Frame title={`熱門新聞`} href={"/news/"}>
              <ArticleList data={data.newsData} />
            </Frame>
          </div>
        )}
        <DhSjbCard rank={data.sjbRank} news={data.sjbNews} teams={data.sjbTeams}/>
        {data?.channels?.length > 0 && <DhChannels data={data.channels} />}
        {data.saishi && data.saishi?.length > 0 && (
          <HotSaishi data={data.saishi} />
        )}
        {data.productdata && data.productdata?.length > 0 && (
          <HotProducts data={data.productdata} />
        )}
      </div>
    </>
  );
}
export async function getStaticProps() {
  const [
    data1,
    data2,
    data4,
    newsData,
    saishiData,
    channelsData,
    sjbRank,
    sjbNews,
    sjbTeams,
    locData,
    tdkDatas,
  ] = await Promise.all([
    fetch(
      process.env.API_DOMAIN +
        `/api/v1/daohang/matches?${queryString.stringify({
          count: 8,
        })}&lang=zh_HANT`,
      {
        method: "GET",
        headers: process.env.API_HEADER,
      }
    ),
    fetch(
      process.env.API_DOMAIN +
        `/api/v1/daohang/keywords?${queryString.stringify({
          count: 6,
        })}&lang=zh_HANT`,
      {
        method: "GET",
        headers: process.env.API_HEADER,
      }
    ),
    fetch(process.env.API_DOMAIN + `/api/v1/daohang/products/?lang=zh_HANT`, {
      method: "GET",
      headers: process.env.API_HEADER,
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/articles/all?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 8,
        type: "text",
      }),
    }),
    fetch(
      process.env.API_DOMAIN + `/api/v1/competition/groupnew?lang=zh_HANT`,
      {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({}),
      }
    ),
    fetch(process.env.API_DOMAIN + `/api/v1/general/channel/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
    }),
    fetch(
      process.env.API_DOMAIN + `/api/v1/worldcup/ranking/team/?lang=zh_HANT`,
      {
        method: "GET",
        headers: process.env.API_HEADER,
      }
    ),
    fetch(process.env.API_DOMAIN + "/api/v1/topic/sidearticle/?lang=zh_HANT", {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        type: "text",
        topic: "shijiebei",
        matchtype: "zuqiu",
        limit: 8,
      }),
    }),
    fetch(
      process.env.API_DOMAIN + `/api/v1/competition/teamandnews/?lang=zh_HANT`,
      {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          topic: "shijiebei",
          limit: 4,
          news_limit: 3,
        }),
      }
    ),
    fetch(process.env.API_DOMAIN + `/api/v1/checker/accesspolicy`, {
      method: "POST",
      headers: process.env.API_HEADER,
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        url: "/",
        pattern: "/",
      }),
    }),
  ]);
  const processedData1 = data1.status == 200 && (await data1.json());
  const processedData2 = data2.status == 200 && (await data2.json());
  const processedData4 = data4.status == 200 && (await data4.json());
  const processedDataLoc = locData.status == 200 && (await locData.json());
  const news_data = newsData.status == 200 && (await newsData.json());
  const saishi_data = saishiData.status == 200 && (await saishiData.json());
  const channels = channelsData.status == 200 && (await channelsData.json());
  const sjb_rank = sjbRank.status == 200 && (await sjbRank.json());
  const sjb_news = sjbNews.status == 200 && (await sjbNews.json());
  const sjb_teams = sjbTeams.status == 200 && (await sjbTeams.json());

  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  const ncomA = JSON.parse(JSON.stringify(processedData1?.data?.list || null));
  const ncomB = JSON.parse(JSON.stringify(processedData1?.data?.list || null));
  if (ncomA !== undefined && ncomA !== null) {
    ncomA.forEach((v) => {
      if (v.matches !== undefined && v.matches !== null) {
        v.matches.forEach((v2) => {
          if (
            v2.match_lives?.more !== undefined &&
            v2.match_lives?.more !== null
          ) {
            v2.match_lives.more = v2.match_lives?.more.filter((item1) => {
              return false;
            });
          }
          if (
            v2.match_lives?.on_display !== undefined &&
            v2.match_lives?.on_display !== null
          ) {
            v2.match_lives.on_display = v2.match_lives?.on_display.filter(
              (item1) => {
                return false;
              }
            );
          }
          if (
            v2.match_lives?.all !== undefined &&
            v2.match_lives?.all !== null
          ) {
            v2.match_lives.all = v2.match_lives?.all.filter((item1) => {
              return false;
            });
          }
        });
      }
    });
  }
  const encrypted =
    processedDataLoc?.data?.list &&
    AES.encrypt(
      JSON.stringify(processedDataLoc?.data?.list),
      process.env.ENCRYPT_KEY
    ).toString();
  return {
    props: {
      carddataA: ncomA,
      carddata: ncomB,
      locData: encrypted || null,
      keyworddata: processedData2?.data?.list || null,
      productdata: processedData4?.data?.list || null,
      newsData: news_data?.data?.list || null,
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      saishi: saishi_data?.data?.list || null,
      channels: channels?.data?.list || null,
      sjbRank: sjb_rank?.data?.list || null,
      sjbNews: sjb_news?.data?.list || null,
      sjbTeams: sjb_teams?.data?.list || null,
      last_update: processedData1?.data?.last_update || null,
      isNavDisplay: false,
      headerType: "dh",
      isIndexPage:true
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
