import StatisticPlayer from "./basketball/statistic_player";
import StatisticScore from "./basketball/statistic_score";
import StatisticStat from "./basketball/statistic_stat";
import LineUpTable from "./football/line_up_table";
import MatchBrief from "./football/match_brief";
import MatchAnaComponent from "./football/match_ana_component";
import PlayerStat from "./tennis/player_stat";
import PreMatchAnalysis from "./tennis/pre_match_analysis";
import TechStat from "./tennis/tech_stat";
import TableTeamHeader from "./football/table_team_header";
import React, { useState } from "react";
import Analysis from "./football/analysis";
import Frame from "../../tools/Frame";
import ArticleList from "../articleCards/ArticleList";
import NoDataFound from "../../tools/noDataFound";

function checkHaveMatchAnalysis(matchAnalysis) {
  const keys = [
    "HomeControlTime",
    "AwayControlTime",
    "HomeAttack",
    "AwayAttack",
    "HomeDangerousAttack",
    "AwayDangerousAttack",
    "HomeCorrectShoot",
    "AwayCorrectShoot",
    "HomeMissShoot",
    "AwayMissShoot",
  ];
  return keys.some((key) => matchAnalysis?.[key] && matchAnalysis[key] != 0);
}

export default function DetailsCard({ data, matchType }) {
  const getTabsByType = (matchType) => {
    let tabs = [];
    let subTabs = [];
    switch (matchType) {
      case "zuqiu": {
        const hasBrief = data?.analysis?.brief_detail?.some(
          (item) => item.briefing?.length > 0 && item.suspended?.length > 0
        );

        const hasLineup =
          data?.line_up?.away_injuries?.length > 0 ||
          data?.line_up?.home_injuries?.length > 0 ||
          data?.line_up?.home_bench?.length > 0 ||
          data?.line_up?.away_bench?.length > 0 ||
          data?.line_up?.home_line_up?.length > 0 ||
          data?.line_up?.away_lineup?.length > 0;

        if (hasBrief) {
          tabs.push(
            <MatchBrief
              briefDetails={data.analysis.brief_detail}
              data_card={data.data_card}
            />
          );
        }
        const hasMatchAna = checkHaveMatchAnalysis(data.analysis.match_analysis);
        if (hasMatchAna) {
          tabs.push(
            <Frame title="關鍵數據">
              <div className="rounded-[10px] border border-solid border-border-color overflow-hidden">
                <TableTeamHeader data={data.data_card} />
                <MatchAnaComponent data={data} />
              </div>
            </Frame>
          );
        }
        if (hasLineup) {
          tabs.push(
            <Frame title="比賽陣容">
              <div className="rounded-[10px] border border-solid border-border-color overflow-hidden">
                <TableTeamHeader data={data.data_card} />
                <LineUpTable data={data.line_up} />
              </div>
            </Frame>
          );
        }

        if (subTabs.length > 0) {
          tabs.push(
            <Frame
              title="比賽分析"
              iconName="icon_match_ana"
              className="pt-[20px] px-[20px] pb-[5px]"
            >
              {subTabs.map((ele, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <hr className="border-border-color my-[20px]" />}
                  {ele}
                </React.Fragment>
              ))}
            </Frame>
          );
        }
        break;
      }
      case "lanqiu": {
        if (data.data_card?.Statistic?.score) {
          tabs.push(
            <Frame title="實時數據">
              <StatisticScore data={data.data_card} />
            </Frame>
          );
        }
        tabs.push(
          <>
            {data.data_card?.Statistic?.stats?.length > 0 && (
              <Frame title="球隊統計">
                <StatisticStat data={data.data_card} />
              </Frame>
            )}
            {data.data_card?.Statistic?.players?.length > 0 && (
              <Frame title="球員統計">
                <StatisticPlayer data={data.data_card} />
              </Frame>
            )}
          </>
        );

        break;
      }
      case "wangqiu": {
        if (data?.data_card?.PlayerStats?.length > 0) {
          tabs.push(
            <Frame title="球員統計">
              <PlayerStat data={data.data_card.PlayerStats} />
            </Frame>
          );
        }
        if (data?.data_card?.TechStats?.length > 0) {
          tabs.push(
            <Frame title="技術統計">
              <TechStat data={data.data_card.TechStats} />
            </Frame>
          );
        }
        tabs.push(
          <>
            {data.data_card?.PreMatchAnalysis && (
              <Frame title="近期戰績">
                <PreMatchAnalysis
                  data_card={data.data_card}
                  data={data.data_card.PreMatchAnalysis}
                />
              </Frame>
            )}
          </>
        );

        break;
      }
      default:
        break;
    }
    return tabs;
  };
  const tabs = getTabsByType(matchType);
  return <>{tabs.length > 0 && tabs.map((ele, i) => <React.Fragment key={i}>{ele}</React.Fragment>)}</>;
}

export const tableHeaderStyles = "bg-bg-color items-center h-[34px] px-[15px] text-center whitespace-nowrap";

export const tableBodyStyles =
  "items-center py-[12px] px-[15px] border-b border-solid border-border-color last:border-none text-center whitespace-nowrap hover:text-sec-color";
