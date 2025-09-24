import PaginationBar from "../../../components/tools/pagination";
import { LogWriter, checkIsAliasLink, getNewsTitle } from "../../../public/scripts/publicFunction";
import { isNumeric } from "../../../public/scripts/publicFunction";
import PageTDK from "../../../components/tdk";
import NewsVideoNav from "../../../components/header/NewsVideoNav";
import ArticleList from "../../../components/contain/articleCards/ArticleList";
export default function NewsTagPage(data) {
  return (
    <>
      <PageTDK data={data.tdkData} />

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
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export async function getStaticProps({ params }) {
  const tag = params.id;
  const isAlias = checkIsAliasLink(params.page_no);
  const pageNo = isAlias?.val;
  if (!isNumeric(pageNo)) {
    LogWriter(`/news/${tag}/${pageNo}`, "invalid page no", "invalid page no");
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
          url: "/news/" + tag + "/",
          pattern: "/news/[topic]/",
          topic: tag,
        };
  const url1 = process.env.API_DOMAIN + `/api/v1/articles/${tag}/?lang=zh_HANT`;
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
      body: new URLSearchParams(tdkBody),
    }),
  ]);
  try {
    const processedData1 = data1.status == "200" && (await data1.json());
    const processedDatavideo = videosData.status == 200 && (await videosData.json());
    if (data1.status != 200 || processedData1.code == 50000) {
      LogWriter("/news/" + tag + "/", data1.status, processedData1.code);
      return {
        revalidate: 60,
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    if (pageNo > processedData1?.data?.totalPage) {
      return {
        revalidate: Number(process.env.TIME_OUT_S),
        redirect: {
          destination: `/news/${tag}/${processedData1?.data?.totalPage}/`,
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
        topic: processedData1?.data?.topic || null,
        tagName: tag,
      },
      revalidate: Number(process.env.TIME_OUT_S),
    };
  } catch (error) {
    LogWriter("/news/" + tag + "/", data1.status, error);
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
