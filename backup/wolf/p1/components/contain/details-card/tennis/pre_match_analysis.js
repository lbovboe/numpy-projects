import { changeDateFormat } from "../../../../public/scripts/publicFunction";
import { tableBodyStyles, tableHeaderStylesLanqiu } from "../details_content";
import Button from "../../../tools/Button";
import { useState } from "react";
export default function PreMatchAnalysis({ data, data_card }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    data && (
      <>
        {
          <div className="">
            <div className="flex gap-2 my-[15px]">
              {data?.HomeRecentMatch?.length > 0 && (
                <Button
                  text={
                    data_card?.PlayerA1?.name_j + (!data_card?.is_single ? " / " + data_card?.PlayerA2?.name_j : "")
                  }
                  isActive={activeTab === 0}
                  isHover={true}
                  onClick={() => setActiveTab(0)}
                />
              )}
              {data?.AwayRecentMatch?.length > 0 && (
                <Button
                  text={
                    data_card?.PlayerB1?.name_j + (!data_card?.is_single ? " / " + data_card?.PlayerB2?.name_j : "")
                  }
                  isActive={activeTab === 1}
                  isHover={true}
                  onClick={() => setActiveTab(1)}
                />
              )}
            </div>

            {activeTab === 0 && data?.HomeRecentMatch?.length > 0 && (
              <div className="">
                <div className="">
                  <div
                    className={`grid grid-cols-[150px_90px_1fr_1fr_1fr_150px_1fr] max12:grid-cols-[100px_1fr_1fr_1fr_1fr_100px_1fr] gap-x-[20px] ${tableHeaderStylesLanqiu}`}
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
                    {data?.HomeRecentMatch?.map((val, idx) => (
                      <div
                        key={idx}
                        className={`grid grid-cols-[150px_90px_1fr_1fr_1fr_150px_1fr] max12:grid-cols-[100px_1fr_1fr_1fr_1fr_100px_1fr] gap-x-[20px] ${tableBodyStyles} last:border-none px-[10px]`}
                      >
                        <div className="">
                          <p>{`${val?.player_a1}`}</p>
                          {val?.player_a2 && <p>{val?.player_a2}</p>}
                        </div>
                        <p>{val?.time && changeDateFormat(val?.time, "yyyy-MM-dd")}</p>
                        <p>{val?.kind}</p>
                        <p>{val?.floor}</p>
                        <p>{val?.round}</p>
                        <div className="">
                          <p>{val?.player_b1}</p>
                          {val?.player_b2 && <p>{val?.player_b2}</p>}
                        </div>
                        <p>
                          {val?.a_score ?? "–"}&nbsp;&nbsp;-&nbsp;&nbsp;
                          {val?.b_score ?? "–"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 1 && data?.AwayRecentMatch?.length > 0 && (
              <div className="">
                <div
                  className={`grid grid-cols-[150px_90px_1fr_1fr_1fr_150px_1fr] max12:grid-cols-[100px_1fr_1fr_1fr_1fr_100px_1fr] gap-x-[20px] ${tableHeaderStylesLanqiu}`}
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
                  {data?.AwayRecentMatch?.map((val, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-[150px_90px_1fr_1fr_1fr_150px_1fr] max12:grid-cols-[100px_1fr_1fr_1fr_1fr_100px_1fr] gap-x-[20px] ${tableBodyStyles} last:border-none px-[15px]`}
                    >
                      <div className="">
                        <p>{`${val?.player_a1}`}</p>
                        {val?.player_a2 && <p>{val?.player_a2}</p>}
                      </div>
                      <p>{val?.time && changeDateFormat(val?.time, "yyyy-MM-dd")}</p>
                      <p>{val?.kind}</p>
                      <p>{val?.floor}</p>
                      <p>{val?.round}</p>
                      <div className="">
                        <p>{val?.player_b1}</p>
                        {val?.player_b2 && <p>{val?.player_b2}</p>}
                      </div>
                      <p>
                        {val?.a_score ?? "–"}&nbsp;&nbsp;-&nbsp;&nbsp;
                        {val?.b_score ?? "–"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        }
      </>
    )
  );
}
