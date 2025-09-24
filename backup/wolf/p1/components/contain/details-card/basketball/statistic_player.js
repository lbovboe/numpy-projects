import { tableBodyStyles, tableHeaderStylesLanqiu } from "../details_content";
import { useState } from "react";
import Button from "../../../tools/Button";
export default function StatisticPlayer({ data }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="">
      {data?.Statistic?.players && data?.Statistic?.players?.length > 0 && (
        <>
          <div className="flex items-center  gap-x-[10px] my-[15px]">
            <Button
              text={data?.HomeTeam?.name}
              isActive={activeTab === 0}
              isHover={true}
              onClick={() => setActiveTab(0)}
            />

            <Button
              text={data?.AwayTeam?.name}
              isActive={activeTab === 1}
              isHover={true}
              onClick={() => setActiveTab(1)}
            />
          </div>
          <div className="">
            <div className={`grid grid-cols-[140px_repeat(12,1fr)] gap-x-[10px] ${tableHeaderStylesLanqiu}`}>
              <p>球員</p>
              <p>位置</p>
              <p>時間</p>
              <p>投籃</p>
              <p>三分</p>
              <p>罰球</p>
              <p>籃板</p>
              <p>助攻</p>
              <p>犯規</p>
              <p>搶斷</p>
              <p>失誤</p>
              <p>蓋帽</p>
              <p>得分</p>
            </div>
            <div className="">
              {data?.Statistic?.players &&
                data?.Statistic?.players?.length > 0 &&
                data?.Statistic?.players?.[activeTab]?.list.map((v, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[140px_repeat(12,1fr)] gap-x-[10px] px-[15px] ${tableBodyStyles}`}
                  >
                    <p
                      className="truncate"
                      title={v?.name}
                    >
                      {v?.name}
                    </p>
                    <p>{v?.position || ""}</p>
                    <p>{v?.time || "0"}</p>
                    <p>{v?.shoot || "0"}</p>
                    <p>{v?.three_point || "0"}</p>
                    <p>{v?.penalty || "0"}</p>
                    <p>{v?.rebound || "0"}</p>
                    <p>{v?.assist || "0"}</p>
                    <p>{v?.foul || "0"}</p>
                    <p>{v?.steal || "0"}</p>
                    <p>{v?.mistake || "0"}</p>
                    <p>{v?.blocked_shot || "0"}</p>
                    <p>{v?.score || "0"}</p>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
