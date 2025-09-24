import LastUpdate from "../components/tools/last_update";
import PageTDK from "../components/tdk";
import Frame from "../components/tools/Frame";
import ImageTextButtonList from "../components/contain/sharedButtonCards/ImageTextButtonList";
import TextButtonList from "../components/contain/sharedButtonCards/TextButtonList";
export default function Saishi(data) {
  return (
    <div>
      <PageTDK data={data.tdkData}></PageTDK>
      <div className={`mt-[30px] max12:px-[20px]`}>
        {data.hotSaishi && (
          <Frame
            title="推薦熱門賽事"
            iconName="icon_saishi_hot"
          >
            <ImageTextButtonList data={data.hotSaishi}></ImageTextButtonList>
          </Frame>
        )}
        <div className="mt-[25px] space-y-[25px]">
          {data.data &&
            data.data
              .filter((ele) => ele.title !== "推薦熱門賽事")
              .map((ele, index) => (
                <Frame
                  title={ele.title}
                  iconName="icon_recom_match"
                  key={index}
                >
                  <TextButtonList
                    data={ele.competitions}
                    type="saishi"
                  ></TextButtonList>
                </Frame>
              ))}
        </div>
      </div>
      <LastUpdate lastUpdate={data.lastUpdate} />
    </div>
  );
}

export async function getStaticProps() {
  const [data1, hotData, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/competition/all?lang=zh_HANT`, {
      method: "GET",
      headers: process.env.API_HEADER,
    }),
    fetch(process.env.API_DOMAIN + `/api/v1/competition/groupnew?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
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
  const hot_data = hotData.status == 200 && (await hotData.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());

  return {
    props: {
      data: processedData1.data.list || null,
      hotSaishi: hot_data?.data?.list || null,
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
      pageTitle: "全部賽事",
      lastUpdate: processedData1.data?.last_update || null,
      isNavDisplay: true,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
