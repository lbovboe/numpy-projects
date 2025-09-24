import React from "react";
import PageTDK from "../../../components/tdk";
import {
  LogWriter,
  checkIsAliasLink,
  isNumeric,
  getNewsTitle,
} from "../../../public/scripts/publicFunction";

import NewsShare from "../../../components/share_page/NewsShare";

export default function NewsIndex(data) {
  return (
    <React.Fragment>
      <PageTDK data={data.tdkData} />
      <>
        <NewsShare
          data={data}
          url={data.tagName ? `/news/${data.tagName}` : `/news`}
        />
      </>
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
  // const tname = "all";
  // const pageNo = 1;
  const tname = params.id;
  const isAlias = checkIsAliasLink(params.page_no);
  const pageNo = isAlias?.val;
  if (!isNumeric(pageNo)) {
    LogWriter(`/news/${tname}/${pageNo}`, "invalid page no", "invalid page no");
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const tdkBody =
    isAlias.isTdk == "Y"
      ? {
          url: isAlias.url,
          pattern: isAlias.url,
        }
      : {
          url: "/news/" + tname + "/",
          pattern: "/news/[topic]/",
          topic: tname,
        };

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
      body: new URLSearchParams(tdkBody),
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
    const titleName = getNewsTitle(tname) || "";
    return {
      props: {
        newsData: processedData1?.data?.list || null,
        totalPage: processedData1?.data?.totalPage || null,
        currentPage: processedData1?.data?.page || null,
        tdkData: tdkData?.data?.list?.Tdk || null,
        friendsData: tdkData?.data?.list?.friend_links || null,
        topicName: processedData1?.data?.topic || null,
        lastUpdate: processedData1?.data?.last_update || null,
        topic:titleName,
        tagName: tname,
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
