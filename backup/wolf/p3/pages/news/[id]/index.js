import Tdk from "../../../components/tdk";
import queryString from "query-string";
import { LogWriter, isNumeric, checkIsAliasLink, getNewsTitle } from "../../../public/scripts/publicFunction";
import VideoDetails from "../../../components/contain/videoCards/VideoDetails";
import NewsDetail from "../../../components/contain/newsCards/NewsDetail";
import NewsShare from "../../../components/share_page/NewsShare";
import LastUpdate from "../../../components/tools/last_update";
import React from "react";
import Frame from "../../../components/tools/Frame";
import ArticleList from "../../../components/contain/articleCards/ArticleList";
import RecomMatches from "../../../components/contain/matchCards/RecomMatches";
import ArticleImage from "../../../components/contain/articleCards/ArticleImage";

export default function NewsPage(data) {
  return (
    <>
      <Tdk data={data.tdkData}></Tdk>
      {data.pageType == "index" || data.pageType == "tag_name" ? (
        <NewsShare
          data={data}
          url={data.tagName !== "all" ? `/news/${data.tagName}` : `/news`}
        />
      ) : data.type == "1" ? (
        <div className="flex flex-wrap gap-[20px]">
          <div className="w-full min12:max-w-[790px] space-y-[20px]">
            <NewsDetail data={data} />
          </div>
          <div className="w-full min12:max-w-[390px] space-y-[20px]">
            {data?.recomNews?.length > 0 && (
              <Frame title={`相關新聞`}>
                <ArticleList
                  data={data.recomNews}
                  layout="row"
                />
              </Frame>
            )}
            {data?.recomVideos?.length > 0 && (
              <Frame title={`相關集錦`}>
                <ArticleList
                  data={data.recomVideos}
                  layout="row"
                  type="video"
                />
              </Frame>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-[20px]">
          <div className="w-full min12:max-w-[790px] space-y-[20px]">
            <VideoDetails data={data} />
            {data?.recomVideos?.length > 0 && (
              <Frame title={`集錦錄像推薦`}>
                <div className="grid grid-cols-2 gap-[15px] mt-[12px]">
                  {data.recomVideos?.map((ele, i) => (
                    <ArticleImage
                      key={i}
                      data={ele}
                      type={"video"}
                    />
                  ))}
                </div>
              </Frame>
            )}
            <RecomMatches
              data={data.hotMatches}
              href={"/hot/"}
            />
          </div>
          <div className="w-full min12:max-w-[390px] space-y-[20px]">
            {data?.data_card?.related_video?.length > 0 && (
              <Frame title={`相關集錦`}>
                <ArticleList
                  data={data?.data_card?.related_video}
                  layout="row"
                  type="video"
                />
              </Frame>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const isAlias = checkIsAliasLink(params.id);
  let nID = isAlias?.val;
  if (nID.includes(".html")) {
    nID = nID.replace(/\.html.*$/, "");
    let getparam = {};
    let tdkbody = {};
    let rId = nID;
    var isVideo = false;
    if (nID.includes("-")) {
      isVideo = true;
      var s = nID.split("-");
      var a = s[0];
      var b = s[1];
      getparam = { id: a, videoId: b };
      rId = a;
      tdkbody =
        isAlias.isTdk == "Y"
          ? {
              url: isAlias.url,
              pattern: isAlias.url,
            }
          : {
              url: "/video/" + nID + ".html",
              pattern: "/video/[id]-[id].html",
              id: a,
              subId: b,
            };
    } else {
      getparam = { id: nID };
      tdkbody =
        isAlias.isTdk == "Y"
          ? {
              url: isAlias.url,
              pattern: isAlias.url,
            }
          : {
              url: "/news/" + nID + ".html",
              pattern: "/news/[id].html",
              id: nID,
            };
    }
    const queryParams1 = queryString.stringify(getparam);
    const url1 = process.env.API_DOMAIN + `/api/v1/articles/getarticle?${queryParams1}&lang=zh_HANT`;

    const [data1, hotMatches, tdkNewsData, tdkDatas] = await Promise.all([
      // get method API
      fetch(url1, {
        method: "GET",
        headers: process.env.API_HEADER,
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/match/hot/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 10,
          order: "asc",
        }),
      }),

      fetch(process.env.API_DOMAIN + `/api/v1/articles/getarticle?${queryParams1}`, {
        method: "GET",
        headers: process.env.API_HEADER,
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams(tdkbody),
      }),
    ]);
    const processedData1 = data1.status == "200" && (await data1.json());
    const tdk_news_data = tdkNewsData.status == 200 && (await tdkNewsData.json());
    if (data1.status != 200 || processedData1.code == 50000) {
      LogWriter("/news/" + nID + ".html", data1.status, processedData1.code || "apiError");
      return {
        revalidate: 60,
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    const pageType = processedData1?.data?.list?.category || null;
    const newsType = processedData1?.data?.list?.type || "all";
    const hot_matches = hotMatches.status == 200 && (await hotMatches.json());
    const APIS_TO_CALL = [
      fetch(process.env.API_DOMAIN + `/api/v1/articles/${newsType}?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 10,
          type: "text",
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/matchvideos?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 10,
          topic: newsType,
        }),
      }),
    ];

    const [recomNews, recomVideos] = await Promise.all(APIS_TO_CALL);
    const recom_news = recomNews?.status == 200 && (await recomNews.json());
    const recom_videos = recomVideos?.status == 200 && (await recomVideos.json());
    const tdkRall = {};
    if (tdkDatas.status == 200) {
      const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
      tdkRall.title = tdkData?.data?.list?.Tdk.title.replace(
        /{{article.title}}/g,
        isVideo ? tdk_news_data?.data?.list?.video_details?.title : tdk_news_data?.data?.list?.title
      );
      tdkRall.description = tdkData?.data?.list?.Tdk.description.replace(
        /{{article.title}}/g,
        isVideo ? tdk_news_data?.data?.list?.video_details?.title : tdk_news_data?.data?.list?.title
      );
      tdkRall.keywords = tdkData?.data?.list?.Tdk.keywords.replace(
        /{{article.title}}/g,
        isVideo ? tdk_news_data?.data?.list?.video_details?.title : tdk_news_data?.data?.list?.title
      );
      tdkRall.friend_links = tdkData?.data?.list?.friend_links;
    }
    return {
      props: {
        data_card: processedData1?.data?.list || null,
        recomNews: recom_news?.data?.list || null,
        recomVideos: recom_videos?.data?.list || null,
        hotMatches: hot_matches?.data?.list || null,
        lastUpdate: processedData1?.data?.last_update || null,
        topic: processedData1?.data?.topic || null,
        type: pageType || null,
        newstype: newsType,
        tdkData: tdkRall || null,
        friendsData: tdkRall.friend_links || null,

        pageType: "details",
      },
      revalidate: Number(process.env.TIME_OUT_S),
    };
  } else {
    let page = 1;
    let tname = "all";
    let tdkbody = {};
    if (isNumeric(nID)) {
      page = nID;
      tdkbody = {
        url: `/news/`,
        pattern: "/news/",
      };
    } else {
      // LogWriter("/news/" + nID, "invalid page no", "invalid page no");
      // return {
      //   revalidate: 60,
      //   redirect: {
      //     destination: "/",
      //     permanent: false,
      //   },
      // };
      tname = nID;
      tdkbody = {
        url: `/news/${tname}/`,
        pattern: `/news/[topic]/`,
        topic: tname,
      };
    }
    const url1 = process.env.API_DOMAIN + `/api/v1/articles/${tname}/?lang=zh_HANT`;

    const [data1, tdkDatas] = await Promise.all([
      fetch(url1, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 600,
          page: page,
          pageSize: 20,
          type: "text",
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams(tdkbody),
      }),
    ]);
    const news_data = data1.status == "200" && (await data1.json());
    if (data1.status != 200 || news_data.code == 50000) {
      LogWriter("/news/" + nID + "/", data1.status, news_data.code || "apiError");
      return {
        revalidate: 60,
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
    const topicName = getNewsTitle(nID) || "";
    return {
      props: {
        newsData: news_data?.data?.list || null,
        totalPage: news_data?.data?.totalPage || null,
        currentPage: news_data?.data?.page || null,
        lastUpdate: news_data?.data?.last_update || null,
        topic: news_data?.data?.topic || null,
        tagName: tname || null,
        tdkData: tdkData?.data?.list?.Tdk || null,
        friendsData: tdkData.friend_links || null,
        pageType: "index",
        topicName,
        url: "/news",
      },
      revalidate: Number(process.env.TIME_OUT_S),
    };
  }
}
