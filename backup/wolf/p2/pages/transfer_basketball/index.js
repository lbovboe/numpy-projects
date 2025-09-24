import PageTDK from "../../components/tdk";
import PaginationBar from "../../components/tools/pagination";
import TransferTable from "../../components/contain/TransferTable";
import TransferNav from "../../components/contain/TransferNav";

import Frame from "../../components/tools/Frame";

export default function Transfer(data) {
  return (
    <div className="max12:px-[15px] mt-[25px]">
      <PageTDK data={data.tdkData} />
      <Frame title="轉會情報" iconName="icon_transfer">
        <TransferTable data={data.transfer} nav={<TransferNav />} />
        <PaginationBar currentPage={data?.currentPage} totalPage={data?.totalPage} url="/transfer_basketball" />
      </Frame>
    </div>
  );
}

export async function getStaticProps() {
  const [transferHistory, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/transferhistory/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 1000,
        page: 1,
        pageSize: 20,
        topic: "lanqiu",
      }),
    }),

    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        url: "/transfer_basketball/",
        pattern: "/transfer_basketball/",
      }),
    }),
  ]);
  const transfer = transferHistory.status == 200 && (await transferHistory.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      transfer: transfer?.data?.list || null,
      lastUpdate: transfer?.data?.last_update || null,
      totalPage: transfer?.data?.totalPage || 0,
      currentPage: 1,
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
