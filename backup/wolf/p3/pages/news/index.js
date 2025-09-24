import React from "react";
import PageTDK from "../../components/tdk";
import { LogWriter } from "../../public/scripts/publicFunction";
import NewsShare from "../../components/share_page/NewsShare";
import LastUpdate from "../../components/tools/last_update";
export default function NewsIndex(data) {
  return (
    <React.Fragment>
      <PageTDK data={data.tdkData} />
      <NewsShare data={data} />
    </React.Fragment>
  );
}

export async function getStaticProps({ params }) {
  const tname = "all";
  const pageNo = 1;

  const url1 =
  process.env.API_DOMAIN + `/api/v1/articles/${tname}/?lang=zh_HANT`;

  const [data1, tdkDatas] = await Promise.all([
    fetch(url1, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 600,
        page: pageNo,
        pageSize: 20,
        type: "text",
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
        newsData: processedData1?.data?.list || null,
        totalPage: processedData1?.data?.totalPage || null,
        currentPage: processedData1?.data?.page || null,
        tdkData: tdkData?.data?.list?.Tdk || null,
        friendsData: tdkData?.data?.list?.friend_links || null,
        topicName: processedData1?.data?.topic || null,
        lastUpdate: processedData1?.data?.last_update || null,
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
