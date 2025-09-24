import React from "react";
import Tdk from "../../components/tdk";
import LazyImage from "../../components/tools/lazy_image";
import Frame from "../../components/tools/Frame";
export default function (data) {
  const channelTypes = data.channel;
  return (
    <>
      <Tdk data={data.tdkData} />
      <div className="flex flex-col">
        {channelTypes &&
          channelTypes.map((channelType, i) => (
            <React.Fragment key={i}>
              {i > 0 && <hr className="border-border-color my-[20px]" />}
              <Frame title={channelType.title}>
                <div
                  className={`grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] gap-[12px] mt-[15px]`}
                >
                  {channelType?.Channels &&
                    channelType?.Channels.map((channel, i) =>
                      channelType.title === "推薦熱門頻道" ? (
                        <a
                          href={channel.url}
                          key={i}
                          target={channel.is_internal_link ? "_self" : "_blank"}
                          className="flex flex-col items-center justify-center gap-y-[5px] px-[20px] py-[7px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color"
                        >
                          <LazyImage
                            src={channel.icon}
                            alt={channel.name}
                            width={40}
                            height={40}
                            className="rounded-[2px] overflow-hidden"
                          />
                          <p className="truncate text-center">
                            {channel.title}
                          </p>
                        </a>
                      ) : (
                        <a
                          href={channel.url}
                          key={i}
                          target={channel.is_internal_link ? "_self" : "_blank"}
                          className="flex items-center justify-center gap-y-[5px] px-[20px] py-[7px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color"
                        >
                          <span className="truncate">{channel.title}</span>
                        </a>
                      )
                    )}
                </div>
              </Frame>
            </React.Fragment>
          ))}
      </div>
    </>
  );
}
export async function getStaticProps() {
  const [data1,  tdkDatas] = await Promise.all([
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
      navTitle:"全部頻道"
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
