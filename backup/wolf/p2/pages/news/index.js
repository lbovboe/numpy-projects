import React from "react";
import PageTDK from "../../components/tdk";
import PaginationBar from "../../components/tools/pagination";
import { LogWriter } from "../../public/scripts/publicFunction";
import NewsVideoNav from "../../components/header/NewsVideoNav";
import ArticleList from "../../components/contain/articleCards/ArticleList";

export default function LiveMatchTypeNews(data) {
  return (
    <React.Fragment>
      <PageTDK data={data.tdkData} />
      <div className="mt-[25px] rounded-[10px] p-[20px] bg-white">
        <NewsVideoNav topic="all"></NewsVideoNav>
        <hr className="border-border-color my-[15px]" />
        <>
          <ArticleList
            data={data.newsData?.list}
            imageNo={5}
            colNo={5}
          />

          <PaginationBar
            currentPage={data.newsData?.page}
            totalPage={data.newsData?.totalPage}
            url={`/news`}
          />
        </>
      </div>
    </React.Fragment>
  );
}

export async function getStaticProps({ params }) {
  const tname = "all";
  const pageNo = 1;

  const url1 = process.env.API_DOMAIN + `/api/v1/articles/${tname}/?lang=zh_HANT`;

  const [data1, videosData, tdkDatas] = await Promise.all([
    fetch(url1, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: "750",
        page: pageNo,
        pageSize: "15",
        navigate: 1,
        type: "text",
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
    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        url: "/news/",
        pattern: "/news/",
      }),
    }),
  ]);
  try {
    const processedData1 = data1.status == "200" && (await data1.json());
    const processedDatavideo = videosData.status == 200 && (await videosData.json());
    if (data1.status != 200 || processedData1.code == 50000) {
      LogWriter("/news/", data1.status, processedData1.code);
      return {
        revalidate: 60,
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
    return {
      props: {
        newsData: processedData1?.data || null,
        videoData: processedDatavideo?.data?.list || null,
        lastUpdate: processedData1?.data?.last_update || null,
        tdkData: tdkData?.data?.list?.Tdk || null,
        friendsData: tdkData?.data?.list?.friend_links || null,
        topicName: processedData1?.data?.topic || null,
        tname,
      },
      revalidate: Number(process.env.TIME_OUT_S),
    };
  } catch (error) {
    LogWriter("/news/", data1.status, error);
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
