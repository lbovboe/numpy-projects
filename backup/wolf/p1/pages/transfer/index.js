import PageTDK from "../../components/tdk";
import TransferTable from "../../components/contain/TransferTable";
import React, { useState } from "react";
import LastUpdate from "../../components/tools/last_update";
import FrameOptions from "../../components/tools/FrameOptions";
export default function Transfer(data) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <PageTDK data={data.tdkData} />

      <TransferTable
        data={activeIndex === 0 ? data?.transferZuqiu : data?.transferLanqiu}
      >
        <FrameOptions
          list={["足球", "籃球"]}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </TransferTable>
    </>
  );
}

export async function getStaticProps() {
  const [transferHistoryZuqiu, transferHistoryLanqiu, hotMatches, tdkDatas] =
    await Promise.all([
      fetch(process.env.API_DOMAIN + `/api/v1/transferhistory/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 1000,
          page: 1,
          pageSize: 50,
          topic: "zuqiu",
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/transferhistory/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          limit: 1000,
          page: 1,
          pageSize: 50,
          topic: "lanqiu",
        }),
      }),
      fetch(process.env.API_DOMAIN + `/api/v1/match/hot/?lang=zh_HANT`, {
        method: "POST",
        headers: process.env.API_HEADER,
        body: new URLSearchParams({
          duration: 2,
          order: "asc",
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
  const hot_matches = hotMatches.status == 200 && (await hotMatches.json());

  const transferZuqiu =
    transferHistoryZuqiu.status == 200 && (await transferHistoryZuqiu.json());
  const transferLanqiu =
    transferHistoryLanqiu.status == 200 && (await transferHistoryLanqiu.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      transferZuqiu: transferZuqiu.data?.list || null,
      transferLanqiu: transferLanqiu.data?.list || null,
      headerHotMatches: hot_matches?.data?.list || null,
      lastUpdate: transferLanqiu.data?.last_update || null,
      tdkData: tdkData?.data?.list?.Tdk || null,
      navTitle: "轉會情報",
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
