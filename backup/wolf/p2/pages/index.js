import queryString from "query-string";
import { useEffect, useState } from "react";
import PageTDK from "../components/tdk";
import { enc, AES } from "crypto-js";
import DaohangHeader from "../components/header/dh_header";
import HotMatches from "../components/contain/homeCards/HotMatches";
import HotSaishi from "../components/contain/homeCards/HotSaishi";
import HotProducts from "../components/contain/homeCards/HotProducts";
import DhArticles from "../components/contain/homeCards/DhArticles";
import LastUpdate from "../components/tools/last_update";
export default function Index(data) {
  const [dataCard, setDataCard] = useState(data.carddataA);
  const [triggerUpdate, setTriggerUpdate] = useState(null);

  useEffect(() => {
    if (data.locData && data.locationCheck) {
      const locData = JSON.parse(AES.decrypt(data.locData, process.env.ENCRYPT_KEY).toString(enc.Utf8));
      const isShow =
        locData.regions.includes(data.locationCheck.pos) || locData.ip.includes(data.locationCheck.ip) ? false : true;
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
  useEffect(() => {
    data.renderInjectComponent(<DaohangHeader data={data.keyworddata} />);
  }, []);
  return (
    <>
      <PageTDK data={data.tdkData} />
      <div className="flex flex-col gap-[20px] w-full mt-[25px]">
        <HotMatches data={dataCard} />
        <DhArticles
          data={data.newsData}
          title="熱門新聞"
          href="/news/"
          type="news"
          iconName="icon_news"
          imageNo={5}
          colNo={5}
        />
        <DhArticles
          data={data.videos}
          title="集錦錄像"
          href="/video/"
          type="video"
          iconName="icon_video"
          imageNo={5}
          colNo={5}
        />

        <HotSaishi data={data.saishi} />

        <HotProducts data={data.productdata} />
      </div>
    </>
  );
}
export async function getStaticProps() {
  const queryParams1 = queryString.stringify({ count: 8 });
  const url1 = process.env.API_DOMAIN + `/api/v1/daohang/matches?${queryParams1}&lang=zh_HANT&mode=group`;
  const queryParams2 = queryString.stringify({ count: 6 });
  const url2 = process.env.API_DOMAIN + `/api/v1/daohang/keywords?${queryParams2}&lang=zh_HANT`;
  const url3 = process.env.API_DOMAIN + `/api/v1/articles/all?lang=zh_HANT`;
  const url4 = process.env.API_DOMAIN + `/api/v1/daohang/products/?lang=zh_HANT`;
  const [data1, data2, data4, newsData, videosData, endMatches, saishiData, locData, tdkDatas] = await Promise.all([
    fetch(url1, {
      method: "GET",
      headers: process.env.API_HEADER,
    }),
    fetch(url2, {
      method: "GET",
      headers: process.env.API_HEADER,
    }),
    fetch(url4, {
      method: "GET",
      headers: process.env.API_HEADER,
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/articles/all/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 10,
        type: "text",
        important: 1,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/matchvideos/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 10,
        detailflag: 1,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/match/all/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        state: "complete",
        order: "desc",
        important: 1,
        limit: 10,
      }),
    }),

    fetch(process.env.API_DOMAIN + `/api/v1/competition/groupnew?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 14,
      }),
    }),
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
  const processedDatavideo = videosData.status == 200 && (await videosData.json());
  const end_matches = endMatches.status == 200 && (await endMatches.json());
  const saishi_data = saishiData.status == 200 && (await saishiData.json());

  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  const ncomA = JSON.parse(JSON.stringify(processedData1?.data?.list || null));
  const ncomB = JSON.parse(JSON.stringify(processedData1?.data?.list || null));
  if (ncomA !== undefined && ncomA !== null) {
    ncomA.forEach((v) => {
      if (v.matches !== undefined && v.matches !== null) {
        v.matches.forEach((v2) => {
          if (v2.match_lives?.more !== undefined && v2.match_lives?.more !== null) {
            v2.match_lives.more = v2.match_lives?.more.filter((item1) => {
              return false;
            });
          }
          if (v2.match_lives?.on_display !== undefined && v2.match_lives?.on_display !== null) {
            v2.match_lives.on_display = v2.match_lives?.on_display.filter((item1) => {
              return false;
            });
          }
          if (v2.match_lives?.all !== undefined && v2.match_lives?.all !== null) {
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
    AES.encrypt(JSON.stringify(processedDataLoc?.data?.list), process.env.ENCRYPT_KEY).toString();
  return {
    props: {
      carddataA: ncomA,
      carddata: ncomB,
      locData: encrypted || null,
      keyworddata: processedData2?.data?.list || null,
      productdata: processedData4?.data?.list || null,
      newsData: news_data?.data?.list || null,
      videos: processedDatavideo?.data?.list || null,
      endMatches: end_matches?.data?.list || null,
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      saishi: saishi_data?.data?.list || null,
      lastUpdate: processedData1?.data?.last_update || null,
      isNavDisplay: false,
      headerType: "dh",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
