import LastUpdate from "../components/tools/last_update";
import PageTDK from "../components/tdk";
import Frame from "../components/tools/Frame";
import LazyImage from "../components/tools/lazy_image";
import { LogWriter } from "../public/scripts/publicFunction";
import React from "react";
import ImageTextButton from "../components/contain/sharedButtonCards/ImageTextButton";

export default function SaiShi(data) {
  return (
    <div className="">
      <PageTDK data={data.tdkData}></PageTDK>
      <div className="flex flex-wrap gap-[20px]">
        <div className="w-full min12:max-w-[790px] space-y-[20px]">
          {data.data &&
            data.data
              .filter((match) => match.title !== "推薦熱門賽事")
              .map((match, i) => (
                <React.Fragment key={i}>
                  <Frame title={match.title}>
                    <div
                      className={`grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[12px] mt-[15px]`}
                    >
                      {match.competitions &&
                        match.competitions.map((saishi, i) => (
                          <a
                            key={i}
                            href={`/${saishi.match_type}/${saishi.topic_name}/`}
                            className="hover:text-sec-color text-center"
                          >
                            <span className="truncate">{saishi.name_abbr}</span>
                          </a>
                        ))}
                    </div>
                  </Frame>
                </React.Fragment>
              ))}
        </div>
        <div className="w-full min12:max-w-[390px] space-y-[20px]">
          <Frame
            title={
              <div className="flex items-center gap-[2px]">
                熱門賽事
                <svg width={20} height={20} className={`fill-[#E32B2E]`}>
                  <use href="#icon-hot"></use>
                </svg>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-[12px]">
              {data?.saishi &&
                data?.saishi?.map((ele, i) => {
                  return (
                    <ImageTextButton
                      key={i}
                      url={ele.url}
                      icon={ele.icon}
                      title={ele.name}
                    />
                  );
                })}
            </div>
          </Frame>
          <Frame
            title={
              <div className="flex items-center gap-[2px]">
                熱門頻道
                <svg width={20} height={20} className={`fill-[#E32B2E]`}>
                  <use href="#icon-hot"></use>
                </svg>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-[12px]">
              {data.hotChannels?.Channels?.map((channel, i) => (
                <a
                  href={channel.url}
                  key={i}
                  target={channel.is_internal_link ? "_self" : "_blank"}
                  className="group flex flex-col items-center justify-center gap-y-[5px] hover:text-sec-color"
                >
                  <div className="flex items-center justify-center w-full px-[20px] py-[8px] rounded-[10px] border border-solid border-border-color group-hover:border-sec-color">
                    <LazyImage
                      src={channel.icon}
                      alt={channel.name}
                      width={40}
                      height={40}
                      className="rounded-[5px] overflow-hidden"
                    />
                  </div>
                  <p className="truncate text-center w-full">{channel.title}</p>
                </a>
              ))}
            </div>
          </Frame>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const [data1, competitionDatas, hotChannels, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/competition/all?lang=zh_HANT`, {
      method: "GET",
      headers: process.env.API_HEADER,
    }),
    fetch(
      process.env.API_DOMAIN + `/api/v1/competition/groupnew?lang=zh_HANT`,
      {
        method: "POST",
        headers: process.env.API_HEADER,
      }
    ),
    fetch(process.env.API_DOMAIN + `/api/v1/general/channel/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        hot: 1,
        limit: 20,
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
  const competitionData =
    competitionDatas.status == 200 && (await competitionDatas.json());
  const hot_channels = hotChannels.status == 200 && (await hotChannels.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());

  return {
    props: {
      data: processedData1.data.list || null,
      saishi: competitionData?.data?.list || null,
      hotChannels: hot_channels?.data?.list || null,
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: processedData1.data?.last_update || null,
      isNavDisplay: true,
      navTitle: "全部赛事",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
