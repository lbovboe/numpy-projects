import React, { useEffect } from "react";
import PageTDK from "../../../components/tdk";
import { getNewsTitle, LogWriter, pageTypeVerify } from "../../../public/scripts/publicFunction";
import Frame from "../../../components/tools/Frame";
import ArticleImageSmall from "../../../components/contain/articleCards/ArticleImageSmall";
export default function TopicNewsIndex(data) {
  return (
    <React.Fragment>
      <PageTDK data={data.tdkData} />
      <Frame title={data.topic + "新聞"}>
        <div className="grid grid-cols-2 gap-[12px]">
          {data?.newsData?.list.map((news, i) => (
            <ArticleImageSmall
              key={i}
              data={news}
            />
          ))}
        </div>
      </Frame>
    </React.Fragment>
  );
}

export async function getStaticProps({ params }) {
  const mtype = "wangqiu";
  const tname = "wangqiu";
  const pageNo = 1;
  if (pageTypeVerify(mtype) == "404") {
    // redirect to 404 page;
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const url1 = process.env.API_DOMAIN + `/api/v1/topic/mainarticles/?lang=zh_HANT`;

    const [data1, tdkDatas] = await Promise.all([
      fetch(url1, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: "600",
          page: pageNo,
          pagesize: "40",
          type: "text",
          iscompetition: 1,
          topic: tname,
          matchtype: mtype,
        }),
      }),

      fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          url: "/" + mtype + "/news/",
          pattern: "/[matchtype]/news/",
          matchtype: mtype,
          topic: tname,
        }),
      }),
    ]);
    try {
      const processedData1 = data1.status == "200" && (await data1.json());
      if (data1.status != 200 || processedData1.code == 50000) {
        LogWriter("/wangqiu/news/", data1.status, processedData1.code);
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
          tdkData: tdkData?.data?.list?.Tdk || null,
          friendsData: tdkData?.data?.list?.friend_links || null,
          topic: processedData1?.data?.topic || null,
          tname,
          mtype,
          navTitle: processedData1?.data?.topic + "新聞",
          navTags: [["/" + mtype + "/", getNewsTitle(mtype)]],
          lastUpdate: processedData1?.data?.last_update || null,
        },
        revalidate: Number(process.env.TIME_OUT_S),
      };
    } catch (error) {
      LogWriter("/wangqiu/news/", data1.status, error);
      return {
        revalidate: 60,
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
}
