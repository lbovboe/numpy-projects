import LastUpdate from "../components/tools/last_update";
import PageTDK from "../components/tdk";
import Frame from "../components/tools/Frame";
import LazyImage from "../components/tools/lazy_image";
import { LogWriter } from "../public/scripts/publicFunction";
import React from "react";

export default function SaiShi(data) {
  return (
    <div className="">
      <PageTDK data={data.tdkData}></PageTDK>
      <>
        <div className="">
          <Frame title="推薦熱門賽事">
            <div className={`grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[12px] mt-[15px]`}>
              {data?.saishi &&
                data?.saishi?.map((ele, i) => {
                  return (
                    <a
                      href={ele.url}
                      target="_self"
                      key={i}
                      className="flex flex-col items-center justify-center gap-y-[5px] px-[20px] py-[7px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color"
                    >
                      <LazyImage src={ele.icon} alt={ele.name} width={40} height={40} className="rounded-[2px] overflow-hidden" />
                      <p className="text-center truncate">{ele.name}</p>
                    </a>
                  );
                })}
            </div>
          </Frame>
          <hr className="border-border-color my-[20px]" />
        </div>
        <div className="">
          {data.data &&
            data.data
              .filter((match) => match.title !== "推薦熱門賽事")
              .map((match, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <hr className="border-border-color my-[20px]" />}
                  <Frame title={match.title}>
                    <div className={`grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[12px] mt-[15px]`}>
                      {match.competitions &&
                        match.competitions.map((saishi) => (
                          <div key={saishi.ID} className={`w-full group`}>
                            <a
                              href={`/${saishi.match_type}/${saishi.topic_name}/`}
                              className="flex items-center justify-center gap-y-[5px] px-[20px] py-[7px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color"
                            >
                              <span className="text-center truncate">{saishi.name_abbr}</span>
                            </a>
                          </div>
                        ))}
                    </div>
                  </Frame>
                </React.Fragment>
              ))}
        </div>
      </>
    </div>
  );
}

export async function getStaticProps() {
  const [data1, competitionDatas, hotMatches, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/competition/all?lang=zh_HANT`, {
      method: "GET",
      headers: process.env.API_HEADER,
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/competition/groupnew?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
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
      body: new URLSearchParams({
        url: "/saishi/",
        pattern: "/saishi/",
      }),
    }),
  ]);
  const processedData1 = data1.status == 200 && (await data1.json());
  const hot_matches = hotMatches.status == 200 && (await hotMatches.json());
  if (data1.status != 200 || processedData1.code == 50000) {
    LogWriter("/saishi/", data1.status, processedData1.code || "apiError");
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const competitionData = competitionDatas.status == 200 && (await competitionDatas.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());

  return {
    props: {
      data: processedData1.data.list || null,
      saishi: competitionData?.data?.list || null,
      headerHotMatches: hot_matches?.data?.list || null,
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: processedData1.data?.last_update || null,
      isNavDisplay: true,
      navTitle: "全部赛事",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
