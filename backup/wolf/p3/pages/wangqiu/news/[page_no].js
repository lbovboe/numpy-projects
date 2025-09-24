import React, { useEffect } from "react";
import PageTDK from "../../../components/tdk";
import {
  LogWriter,
  checkIsAliasLink,
  isNumeric,
  pageTypeVerify,
  getBaseUrl,
} from "../../../public/scripts/publicFunction";
import PaginationBar from "../../../components/tools/pagination";
import LastUpdate from "../../../components/tools/last_update";
import Frame from "../../../components/tools/Frame";
import ArticleList from "../../../components/contain/articleCards/ArticleList";

export default function TopicNewsPage(data) {
  const baseUrl = getBaseUrl(data.mtype, data.tname);
  return (
    <React.Fragment>
      <PageTDK data={data.tdkData} />
      <Frame
        title={`${data.topic}新聞`}
        iconName={`icon_${data.topicName === "ufc" ? "ufc" : data.matchType}`}
      >
        <ArticleList data={data.newsData?.list} imageNo={5} colNo={5} />

        <PaginationBar
          currentPage={data.newsData?.page}
          totalPage={data.newsData?.totalPage}
          url={baseUrl + `/news`}
        />
      </Frame>
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
  const mtype = "wangqiu";
  const tname = "wangqiu";
  const isAlias = checkIsAliasLink(params.page_no);
  const pageNo = isAlias.val;
  const tdkBody =
    isAlias.isTdk == "Y"
      ? {
          url: isAlias.url,
          pattern: isAlias.url,
        }
      : {
          url: "/" + mtype + "/news/",
          pattern: "/[matchtype]/news/",
          matchtype: mtype,
          topic: tname,
        };
  if (!isNumeric(pageNo)) {
    LogWriter(`/wangqiu/news/${pageNo}`, "invalid page no", "invalid page no");
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
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
    const url1 =
      process.env.API_DOMAIN + `/api/v1/topic/mainarticles/?lang=zh_HANT`;

    const [data1, hotMatches, hotNews, tdkDatas] = await Promise.all([
      fetch(url1, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: "750",
          page: pageNo,
          pagesize: "15",
          type: "text",
          iscompetition: 1,
          topic: tname,
          matchtype: mtype,
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
      fetch(process.env.API_DOMAIN + `/api/v1/articles/hot/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 10,
          type: "text",
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams(tdkBody),
      }),
    ]);
    try {
      const processedData1 = data1.status == "200" && (await data1.json());
      if (data1.status != 200 || processedData1.code == 50000) {
        LogWriter("/wangqiu/news/" + pageNo, data1.status, processedData1.code);
        return {
          revalidate: 60,
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      const hot_matches = hotMatches.status == 200 && (await hotMatches.json());
      const hot_news = hotNews.status == 200 && (await hotNews.json());
      const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
      return {
        props: {
          newsData: processedData1?.data || null,
          hotMatches: hot_matches?.data?.list || null,
          hotNews: hot_news?.data?.list || null,
          tdkData: tdkData?.data?.list?.Tdk || null,
          friendsData: tdkData?.data?.list?.friend_links || null,
          topic: processedData1?.data?.topic || null,
          tname,
          mtype,
          lastUpdate: processedData1?.data?.last_update || null,
        },
        revalidate: Number(process.env.TIME_OUT_S),
      };
    } catch (error) {
      LogWriter("/wangqiu/news/" + pageNo, data1.status, error);
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
