import React from "react";
import Tdk from "../../components/tdk";
import LazyImage from "../../components/tools/lazy_image";
import LastUpdate from "../../components/tools/last_update";
import Frame from "../../components/tools/Frame";
import ImageTextButtonList from "../../components/contain/sharedButtonCards/ImageTextButtonList";
import TextButtonList from "../../components/contain/sharedButtonCards/TextButtonList";
export default function (data) {
  const channelTypes = data.channel;
  const recommendedChannels = channelTypes?.find((type) => type.title === "推薦熱門頻道");
  const otherChannels = channelTypes?.filter((type) => type.title !== "推薦熱門頻道");

  return (
    <>
      <Tdk data={data.tdkData} />
      <div className={`mt-[30px] max12:px-[20px]`}>
        {recommendedChannels && (
          <Frame
            title="推薦熱門頻道"
            iconName="icon_channel_hot"
          >
            <ImageTextButtonList data={recommendedChannels?.Channels}></ImageTextButtonList>
          </Frame>
        )}
        <div className="mt-[30px] space-y-[25px]">
          {otherChannels?.map((channelType, i) => (
            <Frame
              key={i}
              title={channelType.title}
              iconName="icon_channel"
            >
              <TextButtonList data={channelType.Channels}></TextButtonList>
            </Frame>
          ))}
        </div>
      </div>
      <LastUpdate lastUpdate={data.lastUpdate} />
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
      lastUpdate: processedData1?.data?.last_update || null,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
