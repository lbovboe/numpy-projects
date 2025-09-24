import PageTDK from "../../components/tdk";
import React from "react";
import { LogWriter } from "../../public/scripts/publicFunction";
import ArticleList from "../../components/contain/articleCards/ArticleList";
import NewsVideoNav from "../../components/header/NewsVideoNav";
import PaginationBar from "../../components/tools/pagination";
export default function Video(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      <div className="mt-[25px] rounded-[10px] p-[20px] bg-white">
        <NewsVideoNav topic="all" type='video' activeIndex={1}></NewsVideoNav>
        <hr className="border-border-color my-[15px]" />
        <>
          <ArticleList
            data={data.videosData}
            imageNo={5}
            colNo={5}
            type="video"
          />

          <PaginationBar
            currentPage={data.currentPage}
            totalPage={data.totalPage}
            url={`/video`}
          />
        </>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const url1 = process.env.API_DOMAIN + `/api/v1/matchvideos?lang=zh_HANT`;
  const [data1, hotMatches, tdkDatas] = await Promise.all([
    fetch(url1, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 750,
        page: 1,
        pageSize: "15",
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/match/hot/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        duration: 2,
        order: "asc",
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        url: "/video/",
        pattern: "/video/",
      }),
    }),
  ]);
  const processedData1 = data1.status == "200" && (await data1.json());
  const hot_matches = hotMatches.status == 200 && (await hotMatches.json());

  if (data1.status != 200 || processedData1.code == 50000) {
    LogWriter("/video/" + 1 + "/", data1.status, processedData1.code || "apiError");
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  const tdkrall = {};
  tdkrall.description = tdkData?.data?.list?.Tdk.description.replace(/{{topic.title}}/g, processedData1?.data?.topic);
  tdkrall.keywords = tdkData?.data?.list?.Tdk.keywords.replace(/{{topic.title}}/g, processedData1?.data?.topic);
  tdkrall.title = tdkData?.data?.list?.Tdk.title.replace(/{{topic.title}}/g, processedData1?.data?.topic);
  tdkrall.friend_links = tdkData?.data?.list?.friend_links;
  return {
    props: {
      videosData: processedData1?.data?.list || null,
      lastUpdate: processedData1?.data?.last_update || null,
      totalPage: processedData1?.data?.totalPage || null,
      currentPage: processedData1?.data?.page || null,
      headerHotMatches: hot_matches?.data?.list || null,
      tdkData: tdkrall || null,
      friendsData: tdkrall.friend_links || null,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
