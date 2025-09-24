import Frame from "../../tools/Frame";
import TransferList from "../TransferList";
import { useState } from "react";
import LazyImage from "../../tools/lazy_image";
import { changeDateFormat } from "../../../public/scripts/publicFunction";
export default function DhTransfer({
  transferZuqiu,
  transferLanqiu,
  href1 = "/transfer_soccer/",
  href2 = "/transfer_basketball/",
}) {
  const [isZuqiu, setIsZuqiu] = useState(true);

  const data = isZuqiu ? transferZuqiu : transferLanqiu;
  const href = isZuqiu ? href1 : href2;

  return (
    data && (
      <Frame title="轉會情報" href={href}>
        <>
          <div className="flex justify-center gap-[12px]">
            <button
              className={`px-4 py-2  ${isZuqiu ? "text-pri-color border border-solid border-pri-color rounded-[10px]" : "rounded-[10px] border border-solid border-border-color"}`}
              onClick={() => setIsZuqiu(true)}
            >
              足球
            </button>
            <button
              className={`px-4 py-2  ${!isZuqiu ? "text-pri-color border border-solid border-pri-color rounded-[10px]" : "rounded-[10px] border border-solid border-border-color"}`}
              onClick={() => setIsZuqiu(false)}
            >
              篮球
            </button>
          </div>
          <div className="space-y-[12px] mt-[15px]">
            {data.map((t, i) => (
              <div
                key={i}
                className={`grid grid-cols-[7fr_13fr] gap-[15px] rounded-[10px] border border-solid border-border-color p-[15px] hover:border-pri-color`}
              >
                <div className="flex items-center justify-center gap-x-[5px] bg-border-color rounded-[10px] w-full h-full">
                  <LazyImage src={"/images/person.png"} alt={""} width={20} height={20} className="shrink-0" />
                  <span> {t.player_name}</span>
                </div>
                <div className="">
                  <div className="grid grid-cols-[1fr_80px_1fr] items-center">
                    <div className="grid grid-cols-[1fr_24px] gap-x-[5px]">
                      <p className="truncate text-end">{t.from_team_chs}</p>
                      <LazyImage
                        src={t.from_team_image}
                        alt={t.from_team_chs}
                        width={24}
                        height={24}
                        className="shrink-0"
                      />
                    </div>
                    <svg width={12} height={14} className="mx-auto">
                      <use href="#more-icon"></use>
                    </svg>
                    <div className="grid grid-cols-[24px_1fr] gap-x-[5px]">
                      <LazyImage
                        src={t.to_team_image}
                        alt={t.to_team_chs}
                        width={24}
                        height={24}
                        className="shrink-0"
                      />
                      <p className="truncate">{t.to_team_chs}</p>
                    </div>
                  </div>
                  <hr className="border-border-color my-[15px]" />
                  <div className="flex justify-center gap-[30px] text-[#888]">
                    <p className="truncate">
                      <span className="mr-[5px]">日期:</span>
                      {changeDateFormat(t.transfer_time, "yyyy-MM-dd")}
                    </p>
                    <p className="truncate">
                      <span className="mr-[5px]">交費:</span>
                      {t.money !== "未公開" ? `${t.money}` : "未公開"}
                    </p>
                    <p className="truncate">
                      <span className="mr-[5px]">交易類型: </span>
                      {t.transfer_type_cn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </Frame>
    )
  );
}
