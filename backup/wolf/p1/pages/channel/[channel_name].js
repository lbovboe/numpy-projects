import Tdk from "/components/tdk";
import LazyImage from "../../components/tools/lazy_image";
import {
  LogWriter,
  checkIsAliasLink,
} from "../../public/scripts/publicFunction";
import ChannelList from "../../components/contain/channel/ChannelList";
import LastUpdate from "../../components/tools/last_update";
import React from "react";
export default function ChannelDetail(data) {
  return (
    <div>
      <Tdk data={data?.tdkData}></Tdk>
      <div className="rounded-[10px] border border-solid border-border-color p-[20px]">
        <div className="flex items-center gap-x-[10px]">
          <div className="">
            <LazyImage
              src={data?.channelData?.icon}
              width={40}
              height={40}
              alt=""
              className="rounded-[2px] overflow-hidden shrink-0"
            />
          </div>
          <p className="text-[22px]">{data?.channelData?.title}</p>
        </div>
        <p className="mt-[10px] text-[14px] leading-[28px]">
          {data?.channelData?.content}
        </p>
        <hr className="border-border-color mt-[15px] mb-[30px]" />
        <a
          className="group block relative h-[487px] w-max mx-auto mt-[15px]"
          href={data?.channelData.link}
          target="_blank"
        >
          <div className="absolute inset-0 m-auto w-[80px] h-[36px] rounded-[10px] flex items-center justify-center bg-white group-hover:text-sec-color">
            <p>立即觀看</p>
          </div>
          <LazyImage
            src="/images/channelBg.png"
            width={600}
            height={487}
            alt=""
            className="rounded-[10px] overflow-hidden"
          />
        </a>
      </div>
      <div className="mt-[20px]">
        <ChannelList
          title="相關頻道"
          data={data?.channelData?.RelatedGroup?.Channels}
        />
      </div>
      <div className="mt-[20px]">
        <ChannelList
          title={"熱門頻道"}
          data={data?.hotChannel?.Channels}
          type="i"
        />
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
  const [data1, hotChannel, dataSim, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/general/channel/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        topic: channel_name,
      }),
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/general/channel/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        hot: 1,
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
  const processedHotChannel =
    hotChannel.status == 200 && (await hotChannel.json());

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
      hotChannel: processedHotChannel?.data?.list || null,
      tdkData: tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: processedData1.data.last_update || null,
      navTags: [["/channel/", "频道"]],
      navTitle: processedData1?.data?.list?.title || "",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
