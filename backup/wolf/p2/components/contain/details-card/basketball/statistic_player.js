import { useState } from "react";
import LazyImage from "../../../tools/lazy_image";
import { tableBodyStyles, tableHeaderStyles } from "../details_content";

export default function StatisticPlayer({ data }) {
  return (
    <>
      {data?.Statistic?.players && data?.Statistic?.players?.length > 0 && (
        <div className="player_statistics">
          {data?.Statistic?.players?.map((ele, i) => (
            <div
              key={i}
              className={`text-[14px] rounded-[10px] overflow-hidden ${i > 0 ? "mt-[5px]" : ""}`}
            >
              <div className="py-[7px] text-center bg-pri-color text-white">
                <div className="grid grid-cols-[30px_1fr] items-center gap-x-[10px] w-max mx-auto">
                  <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[10px] overflow-hidden bg-white">
                    <LazyImage
                      src={
                        ele.side === "home"
                          ? data?.HomeTeam?.icon
                          : data?.AwayTeam?.icon
                      }
                      width={20}
                      height={20}
                    />
                  </div>
                  <p className="truncate">
                    {ele.side === "home"
                      ? data?.HomeTeam?.name
                      : data?.AwayTeam?.name}
                  </p>
                </div>
              </div>
              <div
                className={`grid grid-cols-[140px_repeat(12,1fr)] gap-x-[10px] rounded-b-[10px] ${tableHeaderStyles}`}
              >
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
              {ele?.list?.map((v, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[140px_repeat(12,1fr)] gap-x-[10px] ${tableBodyStyles}`}
                >
                  <p className="truncate" title={v?.name}>
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
          ))}
        </div>
      )}
    </>
  );
}
