import { useState } from "react";
import { changeDateFormat } from "../../../../public/scripts/publicFunction";
import LazyImage from "../../../tools/lazy_image";
import { tableBodyStyles, tableHeaderStyles } from "../details_content";

export default function PreMatchAnalysis({ data, data_card }) {
  const [subTab, setSubTab] = useState(0);
  const topic = subTab === 0 ? "HomeRecentMatch" : "AwayRecentMatch";
  return (
    data?.[topic] &&
    data?.[topic]?.length > 0 && (
      <div className="">
        <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px] w-max">
          <button
            onClick={() => setSubTab(0)}
            className={`flex flex-col items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
              subTab === 0
                ? "bg-bg-color text-pri-color"
                : "text-white hover:bg-bg-color hover:text-pri-color"
            }`}
          >
            <p>{data_card?.PlayerA1?.name_j}</p>
            <p>
              {!data_card?.is_single && (
                <span>{data_card?.PlayerA2?.name_j}</span>
              )}
            </p>
          </button>
          <button
            onClick={() => setSubTab(1)}
            className={`flex flex-col items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
              subTab === 1
                ? "bg-bg-color text-pri-color"
                : "text-white hover:bg-bg-color hover:text-pri-color"
            }`}
          >
            <p>{data_card?.PlayerB1?.name_j}</p>
            <p>
              {!data_card?.is_single && (
                <span>{data_card?.PlayerB2?.name_j}</span>
              )}
            </p>
          </button>
        </div>

        <div className="mt-[15px] rounded-[10px] overflow-hidden">
          <div
            className={`grid grid-cols-[180px_80px_1fr_1fr_1fr_180px_1fr] gap-x-[10px] rounded-b-[10px] ${tableHeaderStyles}`}
          >
            <p>球員</p>
            <p>日期</p>
            <p>賽事</p>
            <p>場地</p>
            <p>輪次</p>
            <p>對陣</p>
            <p>比分結果</p>
          </div>
          <div className="text-center">
            {data?.[topic]?.map((val, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-[180px_80px_1fr_1fr_1fr_180px_1fr] gap-x-[10px] ${tableBodyStyles} last:border-none`}
              >
                <div>
                  <p className="truncate">{`${val?.player_a1}`}</p>
                  {val?.player_a2 && (
                    <p className="truncate">{val?.player_a2}</p>
                  )}
                </div>
                <p>{val?.time && changeDateFormat(val?.time, "yyyy-MM-dd")}</p>
                <p>{val?.kind}</p>
                <p>{val?.floor}</p>
                <p>{val?.round}</p>
                <div>
                  <p className="truncate">{`${val?.player_b1}`}</p>
                  {val?.player_b2 && (
                    <p className="truncate">{val?.player_b2}</p>
                  )}
                </div>
                <p>
                  <span>{val?.a_score ?? "–"}</span>
                  &nbsp;&nbsp;-&nbsp;&nbsp;
                  <span>{val?.b_score ?? "–"}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
