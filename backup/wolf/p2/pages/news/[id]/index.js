import Tdk from "../../../components/tdk";
import PaginationBar from "../../../components/tools/pagination";
import queryString from "query-string";
import { LogWriter, isNumeric, checkIsAliasLink } from "../../../public/scripts/publicFunction";
import NewsVideoNav from "../../../components/header/NewsVideoNav";
import ArticleList from "../../../components/contain/articleCards/ArticleList";
import NewsDetail from "../../../components/contain/articleCards/NewsDetail";
export default function NewsPage(data) {
  return (
    <>
      <Tdk data={data.tdkData}></Tdk>
      {data.pageType == "index" ? (
        <div className="mt-[25px] rounded-[10px] p-[20px] bg-white">
          <NewsVideoNav topic={data?.tagName}></NewsVideoNav>
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
      ) : data.pageType == "tag_name" ? (
        <>
          <div className="mt-[25px] rounded-[10px] p-[20px] bg-white">
            <NewsVideoNav topic={data?.tagName}></NewsVideoNav>
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
                url={`/news/` + data?.tagName}
              />
            </>
          </div>
        </>
      ) : data.type == "1" ? (
        <>
          <NewsDetail data={data?.data_card} slider={data?.slider}/>
          {/* <div className="min12:max-w-[390px] w-full flex flex-col gap-[20px]">
              <DhArticles
                data={data?.recomNews}
                title="相關新聞"
                type="news"
                iconName="icon_radio"
              />
            </div> */}
        </>
      ) : (
        <>
          {/* <div className="mt-10">
            <VideoDetails videoInfo={data.data_card} />
            <VideoRelated videos={data.data_card?.related_video} type={data.data_card?.type} />
          </div> */}
        </>
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
      getparam = { id: a, videoId: b, slider: 1 };
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
      getparam = { id: nID, slider: 1 };
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
    const url1 = process.env.API_DOMAIN + `/api/v1/articles/getarticle?lang=zh_HANT`;
    const url2 = process.env.API_DOMAIN + `/api/v1/articles/recommend/?lang=zh_HANT`;
    const [data1, tdkNewsData, recomNews, tdkDatas] = await Promise.all([
      // get method API
      fetch(url1, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams(getparam),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/articles/getarticle?${queryParams1}`, {
        method: "GET",
        headers: process.env.API_HEADER,
      }),
      fetch(url2, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          id: rId,
          limit: 3,
          type: isVideo ? "video" : "text",
        }),
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
    const NewsType = processedData1?.data?.list?.type || "all";

    const [newsTag, hotMatches] = await Promise.all([
      fetch(process.env.API_DOMAIN + `/api/v1/general/hottags/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          matchtype: NewsType,
          limit: 15,
        }),
      }),
      processedData1?.data?.list?.category != 1
        ? fetch(process.env.API_DOMAIN + `/api/v1/match/${processedData1?.data?.match_type || "all"}/?lang=zh_HANT`, {
            method: "POST",
            headers: process.env.API_HEADER,
            body: new URLSearchParams({
              state: "complete",
              limit: 6,
              order: "desc",
            }),
          })
        : fetch(process.env.API_DOMAIN + `/api/v1/competition/match/recent/?lang=zh_HANT`, {
            method: "POST",
            headers: process.env.API_HEADER,
            body: new URLSearchParams({
              important: 1,
              topic: NewsType,
              matchtype: NewsType,
              limit: 6,
              order: "asc",
            }),
          }),
    ]);
    const newsTagData = newsTag.status == 200 && (await newsTag.json());
    const recom_news = recomNews.status == 200 && (await recomNews.json());
    const hot_matches = hotMatches.status == 200 && (await hotMatches.json());
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
        slider: processedData1?.data?.slider || null,
        lastUpdate: processedData1?.data?.last_update || null,
        newsTags: newsTagData?.data?.list || null,
        recomNews: recom_news.data?.list || null,
        hotMatches: hot_matches?.data?.list || null,
        topic: processedData1?.data?.topic || null,
        type: pageType || null,
        newstype: NewsType,
        tdkData: tdkRall || null,
        friendsData: tdkRall.friend_links || null,
        pageType: "details",
      },
      revalidate: Number(process.env.TIME_OUT_S),
    };
  } else {
    if (!isNumeric(nID)) {
      const tag = nID;
      const url1 = process.env.API_DOMAIN + `/api/v1/articles/${tag}/?lang=zh_HANT`;
      const [data1, videosData, tdkDatas] = await Promise.all([
        fetch(url1, {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            limit: "750",
            page: 1,
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
            url: "/news/" + tag + "/",
            pattern: "/news/[topic]/",
            topic: tag,
          }),
        }),
      ]);
      try {
        const processedData1 = data1.status == "200" && (await data1.json());
        const processedDatavideo = videosData.status == 200 && (await videosData.json());
        if (data1.status != 200 || processedData1.code == 50000) {
          LogWriter("/" + mtype + "/" + tname + "/news/" + pageNo, data1.status, processedData1.code);
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
            tdkData: tdkData?.data?.list?.Tdk || null,
            topic: processedData1?.data?.topic || null,
            lastUpdate: processedData1?.data?.last_update || null,
            pageType: "tag_name",
            tagName: tag,
          },
          revalidate: Number(process.env.TIME_OUT_S),
        };
      } catch (error) {
        LogWriter("/" + mtype + "/" + tname + "/news/" + pageNo, data1.status, error);
        return {
          revalidate: 60,
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    } else {
      const tname = "all";
      const tpage = nID;
      const url1 = process.env.API_DOMAIN + `/api/v1/articles/${tname}/?lang=zh_HANT`;

      const [data1, videosData, tdkDatas] = await Promise.all([
        fetch(url1, {
          method: "POST",
          headers: process.env.API_HEADER,
          body: new URLSearchParams({
            limit: "750",
            page: tpage,
            pageSize: "15",
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
      const news_data = data1.status == "200" && (await data1.json());
      const processedDatavideo = videosData.status == 200 && (await videosData.json());

      if (data1.status != 200 || news_data.code == 50000) {
        LogWriter("/news/" + tpage + "/", data1.status, news_data.code || "apiError");
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
      if (tdkData?.data?.list?.Tdk) {
        tdkrall.description = tdkData?.data?.list?.Tdk?.description.replace(/{{tagName}}/g, news_data?.data?.topic);
        tdkrall.keywords = tdkData?.data?.list?.Tdk?.keywords.replace(/{{tagName}}/g, news_data?.data?.topic);
        tdkrall.title = tdkData?.data?.list?.Tdk?.title.replace(/{{tagName}}/g, news_data?.data?.topic);
        tdkrall.friend_links = tdkData?.data?.list?.friend_links;
      }
      return {
        props: {
          newsData: news_data?.data || null,
          videoData: processedDatavideo?.data?.list || null,
          lastUpdate: news_data?.data?.last_update || null,
          topic: news_data?.data?.topic || null,
          totalPage: news_data?.data?.totalPage || null,
          currentPage: news_data?.data?.page || null,
          tagName: tname || null,
          tdkData: tdkrall || null,
          friendsData: tdkrall.friend_links || null,
          pageType: "index",
          url: "/news",
        },
        revalidate: Number(process.env.TIME_OUT_S),
      };
    }
  }
}
