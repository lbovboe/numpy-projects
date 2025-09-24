import PageTDK from "../../components/tdk";
import React from "react";
import { LogWriter } from "../../public/scripts/publicFunction";
import TransferPage from "../../components/share_page/TransferPage";

export default function TransferZq(data) {
  return (
    <div className="">
      <PageTDK data={data.tdkData} />
      <TransferPage data={data} url={"/transfer_soccer"} />
    </div>
  );
}

export async function getStaticProps() {
  const mtype = "zuqiu";
  const [transferHistory, tdkDatas] =
    await Promise.all([
      fetch(process.env.API_DOMAIN + `/api/v1/transferhistory/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 600,
          page: 1,
          pageSize: 20,
          topic: "zuqiu",
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          url: "/transfer_soccer/",
          pattern: "/transfer_soccer/",
        }),
      }),
    ]);
  const transfer =
    transferHistory.status == 200 && (await transferHistory.json());
  if (transferHistory.status != 200 || transfer.code == 50000) {
    LogWriter(
      "transfer_soccer",
      transferHistory.status,
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
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());

  return {
    props: {
      transfer: transfer.data?.list || null,
      totalPage: transfer.data.totalPage || 0,
      currentPage: 1,
      tdkData: tdkData?.data?.list?.Tdk || null,
      lastUpdate: transfer?.data?.last_update || null,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
