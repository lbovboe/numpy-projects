import React from "react";
import Tdk from "../../components/tdk";
import LazyImage from "../../components/tools/lazy_image";
import Frame from "../../components/tools/Frame";
export default function (data) {
  const channelTypes = data.channel?.filter(
    (ele) => ele.title !== "推薦熱門頻道"
  );
  const hotChannels = data.channel.find((ele) => ele.title === "推薦熱門頻道");
  return (
    <>
      <Tdk data={data.tdkData} />
      <div className="flex flex-wrap gap-[20px]">
        <div className="w-full min12:max-w-[790px] space-y-[20px]">
          {channelTypes &&
            channelTypes.map((channelType, i) => (
              <React.Fragment key={i}>
                <Frame title={channelType.title}>
                  <div
                    className={`grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[12px] mt-[15px]`}
                  >
                    {channelType?.Channels &&
                      channelType?.Channels.map((channel, i) => (
                        <a
                          href={channel.url}
                          key={i}
                          target={channel.is_internal_link ? "_self" : "_blank"}
                          className="hover:text-sec-color text-center"
                        >
                          <span className="truncate">{channel.title}</span>
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
                熱門頻道
                <svg width={20} height={20} className={`fill-[#E32B2E]`}>
                  <use href="#icon-hot"></use>
                </svg>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-[12px]">
              {hotChannels?.Channels?.map((channel, i) => (
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
    </>
  );
}
export async function getStaticProps() {
  const [data1, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/general/channel/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        url: "/channel/",
        pattern: "/channel/",
      }),
    }),
  ]);
  const processedData1 = data1.status == 200 && (await data1.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      channel: processedData1.data.list || null,
      pageTitle: "全部頻道",
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: processedData1.data.last_update || null,
      navTitle: "全部頻道",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
