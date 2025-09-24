import PageTDK from "../../components/tdk";
import PaginationBar from "../../components/tools/pagination";
import TransferTable from "../../components/contain/TransferTable";
import { checkIsAliasLink, isNumeric } from "../../public/scripts/publicFunction";
import TransferNav from "../../components/contain/TransferNav";
import Frame from "../../components/tools/Frame";


export default function Transfer(data) {
  return (
    <div className="max12:px-[15px] mt-[25px]">
      <PageTDK data={data.tdkData} />
      <Frame
        title="轉會情報"
        iconName="icon_transfer"
      >
        <TransferTable
          data={data.transfer}
          nav={<TransferNav />}
        />
        <PaginationBar
          currentPage={data?.currentPage}
          totalPage={data?.totalPage}
          url="/transfer_soccer"
        />
      </Frame>
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
  const isAlias = checkIsAliasLink(params.page_no);
  const pageNo = isAlias?.val;
  if (!isNumeric(pageNo)) {
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const tdkBody =
    isAlias.isTdk == "Y"
      ? {
          url: isAlias.url,
          pattern: isAlias.url,
        }
      : {
          url: "/transfer_soccer/",
          pattern: "/transfer_soccer/",
        };
  const [transferHistory, tdkDatas] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/transferhistory/?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        limit: 1000,
        page: pageNo,
        pageSize: 20,
        topic: "zuqiu",
      }),
    }),

    fetch(process.env.API_DOMAIN + `/api/v1/basement/page`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams(tdkBody),
    }),
  ]);

  const transfer = transferHistory.status == 200 && (await transferHistory.json());
  const tdkData = tdkDatas.status == 200 && (await tdkDatas.json());
  return {
    props: {
      transfer: transfer.data?.list || null,
      lastUpdate: transfer.data.last_update || null,
      totalPage: transfer.data.totalPage || 0,
      currentPage: Number(pageNo),
      tdkData: tdkData?.data?.list?.Tdk || null,
      friendsData: tdkData?.data?.list?.friend_links || null,
    },
    revalidate: Number(process.env.TIME_OUT_S),
  };
}
