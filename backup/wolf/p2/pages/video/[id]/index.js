import queryString from "query-string";
import PageTDK from "../../../components/tdk";
import { checkIsAliasLink, getNewsTitle, isNumeric, LogWriter } from "../../../public/scripts/publicFunction";
import VideoDetails from "../../../components/contain/articleCards/VideoDetails";
import React from "react";
import NewsVideoNav from "../../../components/header/NewsVideoNav";
import ArticleList from "../../../components/contain/articleCards/ArticleList";
import PaginationBar from "../../../components/tools/pagination";
export default function VideoContent(data) {
  return (
    <div className="">
      <PageTDK data={data.tdkData} />
      {data.pageType == "index" ? (
        <>
          <div className="mt-[25px] rounded-[10px] p-[20px] bg-white">
            <NewsVideoNav topic={data.tagName} type="video" activeIndex={1}></NewsVideoNav>
            <hr className="border-border-color my-[15px]" />
            <>
              <ArticleList data={data.videosData} imageNo={5} colNo={5} type="video" />

              <PaginationBar
                currentPage={data.currentPage}
                totalPage={data.totalPage}
                url={data.tagName === "all" ? "/video" : `/video/${data.tagName}`}
              />
            </>
          </div>
        </>
      ) : (
        <VideoDetails data={data} />
      )}
    </div>
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
  const id = isAlias.val;

  if (id.includes(".html")) {
    let newsId = id.replace(/\.html.*$/, "");
    let getparam = {};
    let getparamNew = {};
    let tdkbody = {};
    let rId = newsId;
    let isVideo = false;
    if (newsId.includes("-")) {
      isVideo = true;
      var s = newsId.split("-");
      var a = s[0];
      var b = s[1];
      getparam = { id: a, videoId: b };
      getparamNew = { id: a, video_id: b };
      rId = a;
      tdkbody =
        isAlias.isTdk == "Y"
          ? { url: isAlias.url, pattern: isAlias.url }
          : {
              url: "/video/" + newsId + ".html",
              pattern: "/video/[id]-[id].html",
              id: a,
              subId: b,
            };
    } else {
      getparam = { id: newsId };
      tdkbody =
        isAlias.isTdk == "Y"
          ? { url: isAlias.url, pattern: isAlias.url }
          : {
              url: "/video/" + newsId + ".html",
              pattern: "/video/[id].html",
              id: newsId,
            };
    }
    const queryParams1 = queryString.stringify(getparam);
    const url1 = process.env.API_DOMAIN + `/api/v1/articles/getarticle?lang=zh_HANT`;
    const url2 = process.env.API_DOMAIN + `/api/v1/articles/recommend/?lang=zh_HANT`;
    const [data1, hotMatches, recomVideos, tdkVideoDetails, tdkDatas] = await Promise.all([
      fetch(url1, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams(getparamNew),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/match/hot/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          duration: 2,
          order: "asc",
        }),
      }),
      fetch(url2, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          id: rId,
          limit: 6,
          type: isVideo ? "video" : "text",
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
    const hot_matches = hotMatches.status == 200 && (await hotMatches.json());

    if (data1.status != 200 || processedData1.code == 50000) {
      LogWriter("/video/" + id, data1.status, processedData1.code || "apiError");
      return {
        revalidate: 60,
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const recom_videos = recomVideos?.status == 200 && (await recomVideos.json());
    const tdk_video_details = tdkVideoDetails.status == 200 && (await tdkVideoDetails.json());
    const tdkRall = {};
    if (tdkDatas.status == 200) {
      const tdkData = await tdkDatas.json();
      tdkRall.title = tdkData?.data?.list?.Tdk.title.replace(/{{article.title}}/g, tdk_video_details?.data?.list?.video_details?.title);
      tdkRall.description = tdkData?.data?.list?.Tdk.description.replace(/{{article.title}}/g, tdk_video_details?.data?.list?.video_details?.title);
      tdkRall.keywords = tdkData?.data?.list?.Tdk.keywords.replace(/{{article.title}}/g, tdk_video_details?.data?.list?.video_details?.title);
      tdkRall.friend_links = tdkData?.data?.list?.friend_links;
    }
    return {
      props: {
        data_card: processedData1?.data?.list || null,
        headerHotMatches: hot_matches?.data?.list || null,
        lastUpdate: processedData1?.data?.last_update || null,
        recomVideos: recom_videos?.data?.list || null,
        tdkData: tdkRall || null,
        friendsData: tdkRall?.friend_links || null,
        pageType: "details",
      },
      revalidate: Number(process.env.TIME_OUT_S),
    };
  } else {
    let page = 1;
    let tname = "all";
    let tdkbody = {};
    if (isNumeric(id)) {
      page = id;
      tdkbody = {
        url: `/video/`,
        pattern: "/video/",
      };
    } else {
      tname = id;
      tdkbody = {
        url: `/video/${tname}/`,
        pattern: `/video/[topic]/`,
        topic: tname,
      };
    }
    const url1 = process.env.API_DOMAIN + `/api/v1/matchvideos?lang=zh_HANT`;

    const [data1, hotMatches, tdkDatas] = await Promise.all([
      fetch(url1, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 750,
          page: id,
          topic: tname,
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
        body: new URLSearchParams(tdkbody),
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
    if (id > processedData1?.data?.totalPage) {
      return {
        revalidate: 60,
        redirect: {
          destination: `/video/${processedData1?.data?.totalPage}/`,
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
        totalPage: processedData1?.data?.totalPage || null,
        currentPage: processedData1?.data?.page || null,
        topic: processedData1?.data?.topic || getNewsTitle(tname) || null,
        tagName: tname || null,
        lastUpdate: processedData1?.data?.last_update || null,
        headerHotMatches: hot_matches?.data?.list || null,
        tdkData: tdkrall || null,
        friendsData: tdkrall.friend_links || null,
        pageType: "index",
      },
      revalidate: Number(process.env.TIME_OUT_S),
    };
  }
}
