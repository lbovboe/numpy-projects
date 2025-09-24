import React from "react";
import LeftRightChart from "../../chart/LeftRightChart";
import { tableBodyStyles, tableHeaderStyles } from "../details_content";
import LazyImage from "../../../tools/lazy_image";

export default function MatchAnaComponent(data) {
  const titleLookup = {
    important: "關鍵數據",
    attack: "進攻",
    passing: "传控",
    defend: "防守",
  };
  return (
    <div>
      <div className={`grid grid-cols-3 rounded-b-[10px] ${tableHeaderStyles}`}>
        <div className="flex gap-x-[15px] items-center">
          <div className="flex gap-[5px] items-center">
            <LazyImage
              alt="corner"
              src={"/images/match_details/corner.png"}
              width={16}
              height={16}
            />
            <p>{data.data?.analysis?.match_analysis?.HomeCornerKick || "0"}</p>
          </div>
          <div className="flex gap-[5px] items-center">
            <LazyImage
              alt="red"
              src={"/images/match_details/red.png"}
              width={16}
              height={16}
            />
            <p>{data.data?.analysis?.match_analysis?.HomeRedCard || "0"}</p>
          </div>
          <div className="flex gap-[5px] items-center">
            <LazyImage
              alt="yellow"
              src={"/images/match_details/yellow.png"}
              width={16}
              height={16}
            />
            <p>{data.data?.analysis?.match_analysis?.HomeYellowCard || "0"}</p>
          </div>
        </div>
        <p>關鍵數據</p>
        <div className="flex gap-x-[15px] items-center flex-row-reverse">
          <div className="flex gap-[5px] items-center">
            <LazyImage
              alt="corner"
              src={"/images/match_details/corner.png"}
              width={16}
              height={16}
            />
            <p>{data.data?.analysis?.match_analysis?.AwayCornerKick || "0"}</p>
          </div>
          <div className="flex gap-[5px] items-center">
            <LazyImage
              alt="red"
              src={"/images/match_details/red.png"}
              width={16}
              height={16}
            />
            <p>{data.data?.analysis?.match_analysis?.AwayRedCard || "0"}</p>
          </div>
          <div className="flex gap-[5px] items-center">
            <LazyImage
              alt="yellow"
              src={"/images/match_details/yellow.png"}
              width={16}
              height={16}
            />
            <p>{data.data?.analysis?.match_analysis?.AwayYellowCard || "0"}</p>
          </div>
        </div>
      </div>
      <div className="mt-[15px] px-[15px]">
        <LeftRightChart
          homeScore={
            data.data?.analysis?.match_analysis?.HomeControlTime || "0"
          }
          awayScore={
            data.data?.analysis?.match_analysis?.AwayControlTime || "0"
          }
          homeName={data.teamData?.HomeTeam?.name_abbr}
          awayName={data.teamData?.AwayTeam?.name_abbr}
          title={"控球率"}
        />
      </div>
      <div className="mt-[15px] px-[15px]">
        <LeftRightChart
          homeScore={data.data?.analysis?.match_analysis?.HomeAttack || "0"}
          awayScore={data.data?.analysis?.match_analysis?.AwayAttack || "0"}
          homeName={data.teamData?.HomeTeam?.name_abbr}
          awayName={data.teamData?.AwayTeam?.name_abbr}
          title={"進攻"}
        />
      </div>
      <div className="mt-[15px] px-[15px]">
        <LeftRightChart
          homeScore={
            data.data?.analysis?.match_analysis?.HomeDangerousAttack || "0"
          }
          awayScore={
            data.data?.analysis?.match_analysis?.AwayDangerousAttack || "0"
          }
          homeName={data.teamData?.HomeTeam?.name_abbr}
          awayName={data.teamData?.AwayTeam?.name_abbr}
          title={"危險進攻"}
        />
      </div>
      <div className="mt-[15px] px-[15px]">
        <LeftRightChart
          homeScore={
            data.data?.analysis?.match_analysis?.HomeCorrectShoot || "0"
          }
          awayScore={
            data.data?.analysis?.match_analysis?.AwayCorrectShoot || "0"
          }
          homeName={data.teamData?.HomeTeam?.name_abbr}
          awayName={data.teamData?.AwayTeam?.name_abbr}
          title="射正球門"
        />
      </div>
      <div className="mt-[15px] px-[15px]">
        <LeftRightChart
          homeScore={data.data?.analysis?.match_analysis?.HomeMissShoot || "0"}
          awayScore={data.data?.analysis?.match_analysis?.AwayMissShoot || "0"}
          homeName={data.teamData?.HomeTeam?.name_abbr}
          awayName={data.teamData?.AwayTeam?.name_abbr}
          title="射偏球門"
        />
      </div>
    </div>
  );
}
