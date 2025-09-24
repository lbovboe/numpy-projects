import { changeDateFormat } from "../../../public/scripts/publicFunction";
import LazyImage from "../../tools/lazy_image";
import NoDataFound from "../../tools/noDataFound";

export default function TransferTable({ data, size = "small" }) {
  return (
    <div className="border border-solid border-[#FBF7F2] mt-[20px] rounded-[5px] pb-[30px]">
      <div
        className={`grid grid-cols-[130px_180px_208px_22px_208px_140px_110px] max12:grid-cols-[1fr_1.5fr_1.7fr_0.2fr_1.7fr_1.2fr_1fr] rounded-t-[5px] leading-[17px] items-center text-[12px]  bg-[#F9F9F9] px-[20px] py-[6px] ${
          size == "small" ? "gap-x-[15px] max12:gap-x-[0px]" : " min12:gap-x-[20px]"
        }`}
      >
        <div>日期</div>
        <div>球員</div>
        <div>来自</div>
        <div></div>
        <div>转入</div>
        <div>交费</div>
        <div>交易类型</div>
      </div>
      {data ? (
        data.map((t, i) => (
          <div
            className={`grid grid-cols-[130px_180px_208px_22px_208px_140px_110px] max12:grid-cols-[1fr_1.5fr_1.7fr_0.2fr_1.7fr_1.2fr_1fr]  group px-[20px] ${
              size == "small" ? "gap-x-[15px] max12:gap-x-[0px]" : "min12:gap-x-[20px]"
            } h-[45px] items-center max12:justify-start text-[14px]${
              data?.length - 1 != i ? ` border-b border-solid border-[#EEEEEE] ` : ``
            } hover:text-sec-color leading-[20px] `}
            key={i}
          >
            <div className="truncate text-[14px]">{changeDateFormat(t.transfer_time, "yyyy年MM月dd日")}</div>
            <p className="truncate">{t.player_name}</p>
            <div className="flex items-center gap-x-[8px]">
              <LazyImage src={t.from_team_image} alt={t.from_team_chs} width={20} height={20} />
              <p className="truncate">{t.from_team_chs}</p>
            </div>
            <div>
              <svg width={20} height={20}>
                <use href="#transfer-icon" className="fill-[#282525] group-hover:fill-sec-color" />
              </svg>
            </div>
            <div className="flex items-center gap-x-[8px]">
              <LazyImage src={t.to_team_image} alt={t.to_team_chs} width={20} height={20} />
              <p className="truncate">{t.to_team_chs}</p>
            </div>
            <div>{t.money !== "未公開" ? `${t.money}` : "未公開"}</div>
            <div>{t.transfer_type_cn}</div>
          </div>
        ))
      ) : (
        <div className="mx-auto">
          <NoDataFound cHeight={"100px"} />
        </div>
      )}
    </div>
  );
}
