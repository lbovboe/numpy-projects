import PageTDK from "../../components/tdk";
import VideoShare from "../../components/share_page/VideoShare";
import React from "react";
import LastUpdate from "../../components/tools/last_update";
import { LogWriter } from "../../public/scripts/publicFunction";
export default function Video(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />
      <VideoShare data={data} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const url1 = process.env.API_DOMAIN + `/api/v1/matchvideos?lang=zh_HANT`;

  const [data1, tdkDatas] = await Promise.all([
    fetch(url1, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 600,
        page: 1,
        pageSize: "20",
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

  if (data1.status != 200 || processedData1.code == 50000) {
    LogWriter(
      "/video/" + 1 + "/",
      data1.status,
      processedData1.code || "apiError"
    );
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
  tdkrall.description = tdkData?.data?.list?.Tdk.description.replace(
    /{{topic.title}}/g,
    processedData1?.data?.topic
  );
  tdkrall.keywords = tdkData?.data?.list?.Tdk.keywords.replace(
    /{{topic.title}}/g,
    processedData1?.data?.topic
  );
  tdkrall.title = tdkData?.data?.list?.Tdk.title.replace(
    /{{topic.title}}/g,
    processedData1?.data?.topic
  );
  tdkrall.friend_links = tdkData?.data?.list?.friend_links;
  return {
    props: {
      videosData: processedData1?.data?.list || null,
      lastUpdate: processedData1?.data?.last_update || null,
      totalPage: processedData1?.data?.totalPage || null,
      currentPage: processedData1?.data?.page || null,
      tdkData: tdkrall || null,
      friendsData: tdkrall.friend_links || null,
      navTitle: "集锦錄像",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
