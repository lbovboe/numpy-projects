import React from "react";
import LeftRightChart from "../../chart/LeftRightChart";
import { tableHeaderStyles } from "../details_content";
import LazyImage from "../../../tools/lazy_image";

export default function MatchAnaComponent(data) {
  return (
    data?.data?.analysis?.match_stats &&
    data.data.analysis.match_stats.map(
      (ele, i) =>
        ele?.attribute === "important" &&
        ele?.breakdown?.length > 0 && (
          <div
            key={i}
            className={` rounded-b-[10px]  ${i > 0 ? "mt-[20px]" : ""}`}
          >
            <div className={`grid grid-cols-[1fr_60px_1fr] text-[12px] ${tableHeaderStyles} rounded-b-[10px]`}>
              <div className="flex gap-x-[15px] items-center ">
                <div className="flex gap-[6px] items-center">
                  <LazyImage
                    alt="corner"
                    src={"/images/match_details/corner.png"}
                    width={20}
                    height={20}
                  />
                  <p>{data.data?.analysis?.match_analysis?.HomeCornerKick || "0"}</p>
                </div>
                <div className="flex gap-[6px] items-center">
                  <LazyImage
                    alt="red"
                    src={"/images/match_details/red.png"}
                    width={20}
                    height={20}
                  />
                  <p>{data.data?.analysis?.match_analysis?.HomeRedCard || "0"}</p>
                </div>
                <div className="flex gap-[6px] items-center">
                  <LazyImage
                    alt="yellow"
                    src={"/images/match_details/yellow.png"}
                    width={20}
                    height={20}
                  />
                  <p>{data.data?.analysis?.match_analysis?.HomeYellowCard || "0"}</p>
                </div>
              </div>
              <p className="text-[12px]">關鍵數據</p>
              <div className="flex gap-x-[15px] items-center flex-row-reverse justify-start">
                <div className="flex gap-[6px] items-center">
                  <LazyImage
                    alt="corner"
                    src={"/images/match_details/corner.png"}
                    width={20}
                    height={20}
                  />
                  <p>{data.data?.analysis?.match_analysis?.AwayCornerKick || "0"}</p>
                </div>
                <div className="flex gap-[6px] items-center">
                  <LazyImage
                    alt="red"
                    src={"/images/match_details/red.png"}
                    width={20}
                    height={20}
                  />
                  <p>{data.data?.analysis?.match_analysis?.AwayRedCard || "0"}</p>
                </div>
                <div className="flex gap-[6px] items-center">
                  <LazyImage
                    alt="yellow"
                    src={"/images/match_details/yellow.png"}
                    width={20}
                    height={20}
                  />
                  <p>{data.data?.analysis?.match_analysis?.AwayYellowCard || "0"}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-[15px] py-[15px] px-[20px] ">
              <LeftRightChart
                homeScore={data.data?.analysis?.match_analysis?.HomeControlTime}
                awayScore={data.data?.analysis?.match_analysis?.AwayControlTime}
                homeName={data.teamData?.HomeTeam?.name_abbr}
                awayName={data.teamData?.AwayTeam?.name_abbr}
                title={"控球率"}
              />

              <LeftRightChart
                homeScore={data.data?.analysis?.match_analysis?.HomeAttack}
                awayScore={data.data?.analysis?.match_analysis?.AwayAttack}
                homeName={data.teamData?.HomeTeam?.name_abbr}
                awayName={data.teamData?.AwayTeam?.name_abbr}
                title={"进攻"}
              />

              <LeftRightChart
                homeScore={data.data?.analysis?.match_analysis?.HomeDangerousAttack}
                awayScore={data.data?.analysis?.match_analysis?.AwayDangerousAttack}
                homeName={data.teamData?.HomeTeam?.name_abbr}
                awayName={data.teamData?.AwayTeam?.name_abbr}
                title={"危险进攻"}
              />

              <LeftRightChart
                homeScore={data.data?.analysis?.match_analysis?.HomeCorrectShoot || "0"}
                awayScore={data.data?.analysis?.match_analysis?.AwayCorrectShoot || "0"}
                homeName={data.teamData?.HomeTeam?.name_abbr}
                awayName={data.teamData?.AwayTeam?.name_abbr}
                title="射门 (射正)"
              />

              <LeftRightChart
                homeScore={data.data?.analysis?.match_analysis?.HomeMissShoot || "0"}
                awayScore={data.data?.analysis?.match_analysis?.AwayMissShoot || "0"}
                homeName={data.teamData?.HomeTeam?.name_abbr}
                awayName={data.teamData?.AwayTeam?.name_abbr}
                title="射偏球门"
              />
            </div>
          </div>
        )
    )
  );
}
