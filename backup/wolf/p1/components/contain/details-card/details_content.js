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
import React from "react";
import Frame from "../../tools/Frame";
import ArticleList from "../articleCards/ArticleList";

export default function DetailsCard({ data, matchType }) {
  const getTabsByType = (matchType) => {
    let tabs = [];
    if (data?.matchVideos?.length > 0) {
      tabs.push(
        <Frame title="集錦錄像">
          <ArticleList
            data={data?.matchVideos}
            type="video"
            layout="row"
          />
        </Frame>
      );
    }
    switch (matchType) {
      case "zuqiu": {
        const hasLineup =
          data?.line_up?.away_injuries?.length > 0 ||
          data?.line_up?.home_injuries?.length > 0 ||
          data?.line_up?.home_bench?.length > 0 ||
          data?.line_up?.away_bench?.length > 0 ||
          data?.line_up?.home_line_up?.length > 0 ||
          data?.line_up?.away_lineup?.length > 0;
        const hasBrief = data?.analysis?.brief_detail?.some(
          (item) => item.briefing?.length > 0 && item.suspended?.length > 0
        );
        if (hasBrief || data?.analysis?.match_stats || hasLineup) {
          tabs.push(
            <Frame title="比賽分析">
              <div className="space-y-[20px]">
                <MatchBrief
                  briefDetails={data.analysis.brief_detail}
                  data_card={data.data_card}
                />

                <div>
                  {data?.analysis?.match_stats && (
                    <>
                      <TableTeamHeader data={data.data_card} />
                      <MatchAnaComponent data={data} />
                    </>
                  )}
                  {hasLineup && (
                    <LineUpTable
                      data={data.line_up}
                      teamData={data.data_card}
                    />
                  )}
                </div>
              </div>
            </Frame>
          );
        }

        break;
      }
      case "lanqiu": {
        if (data.data_card?.Statistic?.score) {
          tabs.push(
            <Frame
              title="實時數據"
              className={`${framePaddingBorderNone}`}
            >
              <StatisticScore data={data.data_card} />
            </Frame>
          );
        }
        if (data.data_card?.Statistic?.stats?.length > 0) {
          tabs.push(
            <Frame
              title="球隊統計"
              className={`${framePaddingBorderNone}`}
            >
              <StatisticStat data={data.data_card} />
            </Frame>
          );
        }
        if (data.data_card?.Statistic?.players?.length > 0) {
          tabs.push(
            <Frame
              title="球員統計"
              className={`${framePaddingBorderNone}`}
            >
              <StatisticPlayer data={data.data_card} />
            </Frame>
          );
        }
        break;
      }
      case "wangqiu": {
        if (data?.data_card?.TechStats?.length > 0) {
          tabs.push(
            <Frame
              title="技術統計"
              className={`${framePaddingBorderNone}`}
            >
              <TechStat data={data.data_card.TechStats} />
            </Frame>
          );
        }
        if (data?.data_card?.PlayerStats?.length > 0) {
          tabs.push(
            <Frame
              title="球員統計"
              className={`${framePaddingBorderNone}`}
            >
              <PlayerStat data={data.data_card.PlayerStats} />
            </Frame>
          );
        }
        if (
          data.data_card?.PreMatchAnalysis &&
          (data.data_card?.PreMatchAnalysis.AwayRecentMatch.length > 0 ||
            data.data_card?.PreMatchAnalysis.HomeRecentMatch.length > 0)
        ) {
          tabs.push(
            <Frame
              title="球隊統計"
              className={`${framePaddingBorderNone}`}
            >
              <PreMatchAnalysis
                data_card={data.data_card}
                data={data.data_card.PreMatchAnalysis}
              />
            </Frame>
          );
        }
        break;
      }
    }
    return tabs;
  };
  const tabs = getTabsByType(matchType);
  return <>{tabs.length > 0 && tabs.map((ele, i) => <React.Fragment key={i}>{ele}</React.Fragment>)}</>;
}

export const tableHeaderStyles = "bg-bg-color items-center h-[33px] px-[10px] text-center whitespace-nowrap";
export const framePaddingBorderNone =
  "rounded-[10px] border border-solid border-border-color px-[20px] pt-[20px] pb-[8px]";
export const tableHeaderStylesLanqiu =
  "bg-pri-color items-center h-[33px] px-[10px] text-center whitespace-nowrap rounded-[10px] text-white text-[12px]";

export const tableBodyStyles =
  "items-center py-[12px]  border-b border-solid border-border-color last:border-none text-center whitespace-nowrap hover:text-sec-color leading-[20px]";
