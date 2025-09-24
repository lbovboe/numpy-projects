import { changeDateFormat } from "../../public/scripts/publicFunction";
import LazyImage from "../tools/lazy_image";
import NoDataFound from "../tools/noDataFound";

export default function TransferTable({ data, nav }) {
  return (
    <>
      {nav}
      <div
        className={`grid grid-cols-[100px_1fr_1fr_20px_1fr_80px_80px] items-center justify-center gap-x-[20px] px-[15px] mt-[15px] rounded-[10px] bg-border-color h-[33px] text-[12px]`}
      >
        <div>日期</div>
        <div>球員</div>
        <div>来自</div>
        <div></div>
        <div>轉入</div>
        <div>交費</div>
        <div>交易類型</div>
      </div>
      <div>
        {data ? (
          data.map((t, i) => (
            <div
              className={`group grid grid-cols-[100px_1fr_1fr_20px_1fr_80px_80px] gap-x-[20px]
                        h-[44px] px-[15px] items-center justify-center text-[14px] ${
                          i === data.length - 1 ? "" : "border-b"
                        } border-solid border-[#f3f3f3]
                        hover:text-pri-color whitespace-nowrap leading-[20px]`}
              key={i}
            >
              <div className="truncate text-[14px]">{changeDateFormat(t.transfer_time, "yyyy-MM-dd")}</div>
              <p className="truncate">{t.player_name}</p>
              <div className="grid grid-cols-[20px_1fr] items-center gap-x-[8px]">
                <LazyImage
                  src={t.from_team_image}
                  alt={t.from_team_chs}
                  width={20}
                  height={20}
                  ImgClassName="shrink-0"
                />
                <p className="truncate">{t.from_team_chs}</p>
              </div>

              <div className="flex items-center justify-center">
                <svg className="group-hover:fill-pri-color" width="30" height="20">
                  <use href="#right-arrow"></use>
                </svg>
              </div>

              <div className="grid grid-cols-[20px_1fr] items-center gap-x-[8px]">
                <LazyImage src={t.to_team_image} alt={t.to_team_chs} width={20} height={20} ImgClassName="shrink-0" />
                <p className="truncate">{t.to_team_chs}</p>
              </div>
              <div>
                {t.money !== "未公開"
                  ? `${t.money?.replace(".00", "")}${t.match_type === "basketball" ? "" : ""}`
                  : "未公開"}
              </div>
              <div>{t.transfer_type_cn}</div>
            </div>
          ))
        ) : (
          <NoDataFound cHeight={"200px"} />
        )}
      </div>
    </>
  );
}
