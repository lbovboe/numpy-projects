import React from "react";
import PageTDK from "../../../../components/tdk";
import Frame from "../../../../components/tools/Frame";
import { checkIsAliasLink, getBaseUrl, LogWriter, pageTypeVerify, getNewsTitle } from "../../../../public/scripts/publicFunction";
import ArticleImageSmall from "../../../../components/contain/articleCards/ArticleImageSmall";
export default function TopicNewsIndex(data) {
  return (
    <React.Fragment>
      <PageTDK data={data.tdkData} />
      <Frame title={data.topic + "新聞"}>
        <div className="grid grid-cols-2 gap-[12px]">
          {data?.newsData?.list.map((news, i) => (
            <ArticleImageSmall key={i} data={news} />
          ))}
        </div>
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
  const isAlias = checkIsAliasLink(params.topic_name);
  const tname = isAlias.val;
  const matchType = pageTypeVerify(params.match_type);
  const tdkBody =
    isAlias.isTdk == "Y"
      ? { url: isAlias.url, pattern: isAlias.url }
      : {
          url: `/${matchType}/${tname}/news/`,
          pattern: `/${matchType}/[topic]/news/`,
          matchtype: matchType,
          topic: tname,
        };
  if (matchType == "404") {
    // redirect to 404 page;
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const pageNo = 1;
  const url1 = process.env.API_DOMAIN + `/api/v1/topic/mainarticles/?lang=zh_HANT`;
  const [data1, tdkDatas] = await Promise.all([
    fetch(url1, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 600,
        page: pageNo,
        pagesize: 40,
        type: "text",
        iscompetition: 1,
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
  try {
    const processedData1 = data1.status == "200" && (await data1.json());
    if (data1.status != 200 || processedData1.code == 50000) {
      LogWriter(`/${matchType}/${tname}/`, data1.status, processedData1.code);
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
        topicName: processedData1?.data?.topic || null,
        lastUpdate: processedData1?.data?.last_update || null,
        topicName: tname,
        matchType: matchType,
        topic: processedData1?.data?.topic || null,
        navTitle: processedData1?.data?.topic + "新聞",
        navTags: [
          ["/" + matchType + "/", getNewsTitle(matchType)],
          ["/" + matchType + "/" + tname + "/", processedData1?.data?.topic],
        ],
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
