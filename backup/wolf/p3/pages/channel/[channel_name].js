import Tdk from "/components/tdk";
import LazyImage from "../../components/tools/lazy_image";
import {
  LogWriter,
  checkIsAliasLink,
} from "../../public/scripts/publicFunction";
import LastUpdate from "../../components/tools/last_update";
import React from "react";
import Frame from "../../components/tools/Frame";
import ImageTextButton from "../../components/contain/sharedButtonCards/ImageTextButton";
import TextButton from "../../components/contain/sharedButtonCards/TextButton";

export default function ChannelDetail(data) {
  return (
    <div>
      <Tdk data={data?.tdkData}></Tdk>
      <div className="flex flex-wrap gap-[20px]">
        <div className="w-full min12:max-w-[790px] space-y-[20px]">
          <div className="rounded-[10px] border border-solid border-border-color p-[20px]">
            <div className="flex items-center gap-x-[10px]">
              <div className="">
                <LazyImage
                  src={data?.channelData?.icon}
                  width={40}
                  height={40}
                  alt=""
                  className="rounded-[5px] overflow-hidden shrink-0"
                />
              </div>
              <p className="text-[20px]">{data?.channelData?.title}</p>
            </div>
            <hr className="border-border-color mt-[10px]" />
            <div className="mt-[15px]">
              <p className="text-[14px] leading-[28px]">
                {data?.channelData?.content}
              </p>
              <a
                className="group flex flex-col justify-center items-center w-max mx-auto relative mt-[20px] hover:text-sec-color"
                href={data?.channelData.link}
                target="_blank"
              >
                <div className="flex items-center justify-center rounded-[10px] w-[169px] py-[8px] border border-solid border-pri-color group-hover:border-sec-color">
                  <svg
                    width={40}
                    height={40}
                    className={`fill-pri-color group-hover:fill-sec-color`}
                  >
                    <use href="#icon-play"></use>
                  </svg>
                </div>
                <p className="mt-[5px]">立即觀看</p>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full min12:max-w-[390px] space-y-[20px]">
          {data?.channelData?.RelatedGroup?.Channels?.length > 0 && (
            <Frame title="相關頻道" href="/channel/">
              <div className="grid grid-cols-2 gap-[12px]">
                {data?.channelData?.RelatedGroup?.Channels?.map(
                  (channel, i) => (
                    <TextButton
                      key={i}
                      url={`/channel/${channel.name}/`}
                      target={channel.is_internal_link ? "_self" : "_blank"}
                      icon={channel.icon}
                      title={channel.title}
                    />
                  )
                )}
              </div>
            </Frame>
          )}
        </div>
      </div>
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
  const isAlias = checkIsAliasLink(params.channel_name);
  const channel_name = isAlias.val;
  const tdkBody =
    isAlias.isTdk == "Y"
      ? {
          url: isAlias.url,
          pattern: isAlias.url,
        }
      : {
          url: "/channel/" + channel_name + "/",
          pattern: "/channel/[topic]/",
          topic: channel_name,
        };
  const [data1, dataSim, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/general/channel/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        topic: channel_name,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/general/channel/`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        topic: channel_name,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(tdkBody),
    }),
  ]);
  const processedData1 = data1.status == 200 && (await data1.json());
  const processedDataSim = dataSim.status == 200 && (await dataSim.json());

  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());

  const tdkrall = tdkData?.data?.list?.Tdk;
  const tdk = {};
  if (data1.status != 200 || processedData1.code == 50000) {
    LogWriter(
      "/channel/" + channel_name,
      data1.status,
      processedData1.code || "apiError"
    );
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  tdk.description =
    tdkrall.description &&
    tdkrall.description.replace(
      /{{player.title}}/g,
      processedDataSim?.data?.list?.title
    );
  tdk.title =
    tdkrall.title &&
    tdkrall.title.replace(
      /{{player.title}}/g,
      processedDataSim?.data?.list?.title
    );
  tdk.keywords =
    tdkrall.keywords &&
    tdkrall.keywords.replace(
      /{{player.title}}/g,
      processedDataSim?.data?.list?.title
    );

  return {
    props: {
      channelData: processedData1?.data?.list || null,
      tdkData: tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: processedData1.data.last_update || null,
      navTags: [["/channel/", "频道"]],
      navTitle: processedData1?.data?.list?.title || "",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
