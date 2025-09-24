import Tdk from "/components/tdk";
import TextButton from "../../components/contain/sharedButtonCards/TextButton";
import { LogWriter, checkIsAliasLink } from "../../public/scripts/publicFunction";
import Frame from "../../components/tools/Frame";
import TextButtonList from "../../components/contain/sharedButtonCards/TextButtonList";
import LazyImage from "../../components/tools/lazy_image";

export default function ChannelDetail({ channelData, tdkData }) {
  const relatedChannels = [
    ...(channelData?.RelatedGroup?.Channels ?? []),
    ...(channelData?.RelatedGroup?.HighLights ?? []),
  ];

  return (
    <div className="">
      <Tdk data={tdkData}></Tdk>

      <div className="rounded-[10px] bg-white p-[20px] mt-[30px] flex flex-col justify-center items-center">
        <div className="flex justify-center gap-[15px] items-center">
          <LazyImage
            src={channelData?.icon}
            width={50}
            height={50}
            className="rounded-[10px] overflow-hidden shrink-0"
          ></LazyImage>
          <p className="leading-[28px] text-[20px] font-medium">{channelData.title}</p>
        </div>
        <div className="h-[1px] w-full bg-border-color my-[15px]"></div>
        <p className="leading-[28px] text-[16px]">{channelData.content}</p>
        <div className="mt-[20px]">
          <TextButton
            url={channelData.link}
            text="立即觀看"
            className="w-[157px] h-[36px]"
          ></TextButton>
        </div>
      </div>
      <div className="mt-[20px]">
        <Frame
          title="相關頻道"
          iconName="icon_channel"
        >
          <TextButtonList
            data={relatedChannels}
            type="channelRelated"
          ></TextButtonList>
        </Frame>
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
    LogWriter("/channel/" + channel_name, data1.status, processedData1.code || "apiError");
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  tdk.description =
    tdkrall.description && tdkrall.description.replace(/{{player.title}}/g, processedDataSim?.data?.list?.title);
  tdk.title = tdkrall.title && tdkrall.title.replace(/{{player.title}}/g, processedDataSim?.data?.list?.title);
  tdk.keywords = tdkrall.keywords && tdkrall.keywords.replace(/{{player.title}}/g, processedDataSim?.data?.list?.title);

  return {
    props: {
      channelData: processedData1?.data?.list || null,
      tdkData: tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      lastUpdate: processedData1?.data?.last_update || null,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
