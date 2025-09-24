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
  const [activeIndex, setActiveIndex] = useState(0);
  const getTabsByType = (matchType) => {
    let tabs = [];
    let subTabs = [];
    switch (matchType) {
      case "zuqiu": {
        const hasMatchAna = checkHaveMatchAnalysis(
          data.analysis.match_analysis
        );
        if (hasMatchAna) {
          tabs.push(
            <Frame title="賽況分析" iconName="icon_pre_ana">
              <div className="rounded-[10px] overflow-hidden">
                <TableTeamHeader data={data.data_card} />
                <MatchAnaComponent data={data} />
              </div>
            </Frame>
          );
        }
        const hasBrief = data?.analysis?.brief_detail?.some(
          (item) => item.briefing?.length > 0 && item.suspended?.length > 0
        );
        const hasLineup =
          data?.line_up?.home_bench?.length > 0 ||
          data?.line_up?.away_bench?.length > 0 ||
          data?.line_up?.home_line_up?.length > 0 ||
          data?.line_up?.away_lineup?.length > 0;
        if (hasBrief) {
          subTabs.push(
            <MatchBrief
              briefDetails={data.analysis.brief_detail}
              data_card={data.data_card}
            />
          );
        }
        if (data.analysis?.analysis) {
          subTabs.push(<Analysis data={data.analysis?.analysis} />);
        }
        if (hasLineup || data.matchVideos?.length > 0) {
          subTabs.push(
            <div className="">
              <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px] w-max mb-[15px]">
                {["比賽陣容", "集錦錄像"].map((ele, i) => (
                  <button
                    key={i}
                    className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
                      activeIndex === i
                        ? "bg-bg-color text-pri-color"
                        : "text-white hover:bg-bg-color hover:text-pri-color"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  >
                    {ele}
                  </button>
                ))}
              </div>
              {activeIndex === 0 ? (
                <LineUpTable data={data.line_up} />
              ) : (
                <MatchVideos data={data.matchVideos} />
              )}
            </div>
          );
        }

        if (subTabs.length > 0) {
          tabs.push(
            <Frame
              title="比賽分析"
              iconName="icon_match_ana"
              className="pt-[20px] px-[20px] pb-[10px]"
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
            <Frame
              title="實時數據"
              iconName="icon_stats"
              className="pt-[20px] px-[20px] pb-[5px]"
            >
              <StatisticScore data={data.data_card} />
            </Frame>
          );
        }
        if (
          data.data_card?.Statistic?.stats?.length > 0 ||
          data.data_card?.Statistic?.players?.length > 0 ||
          data.matchVideos?.length > 0
        ) {
          tabs.push(
            <div className="rounded-[10px] bg-white">
              <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px] w-max mt-[20px] mx-[20px]">
                {["比賽詳情", "集錦錄像"].map((ele, i) => (
                  <button
                    key={i}
                    className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
                      activeIndex === i
                        ? "bg-bg-color text-pri-color"
                        : "text-white hover:bg-bg-color hover:text-pri-color"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  >
                    {ele}
                  </button>
                ))}
              </div>
              {activeIndex === 0 ? (
                <>
                  {data.data_card?.Statistic?.stats?.length > 0 && (
                    <Frame
                      title="球隊統計"
                      iconName="icon_pre_ana"
                      className="pt-[15px] px-[20px] pb-[5px]"
                    >
                      <StatisticStat data={data.data_card} />
                    </Frame>
                  )}
                  {data.data_card?.Statistic?.players?.length > 0 && (
                    <Frame
                      title="球員統計"
                      iconName="icon_player"
                      className="px-[20px] pb-[5px]"
                    >
                      <StatisticPlayer data={data.data_card} />
                    </Frame>
                  )}
                  {!Boolean(
                    data.data_card?.Statistic?.stats?.length ||
                      data.data_card?.Statistic?.players?.length
                  ) && <NoDataFound />}
                </>
              ) : (
                <MatchVideos data={data.matchVideos} />
              )}
            </div>
          );
        }

        break;
      }
      case "wangqiu": {
        if (data?.data_card?.TechStats?.length > 0) {
          tabs.push(
            <Frame
              title="實時數據"
              iconName="icon_stats"
              className="pt-[20px] px-[20px] pb-[5px]"
            >
              <TechStat data={data.data_card.TechStats} />
            </Frame>
          );
        }
        if (data?.data_card?.PlayerStats?.length > 0) {
          tabs.push(
            <Frame
              title="球員統計"
              iconName="icon_player"
              className="pt-[20px] px-[20px] pb-[5px]"
            >
              <PlayerStat data={data.data_card.PlayerStats} />
            </Frame>
          );
        }
        if (data.data_card?.PreMatchAnalysis || data.matchVideos?.length > 0) {
          tabs.push(
            <div className="rounded-[10px] bg-white">
              <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px] w-max mt-[20px] mx-[20px]">
                {["賽前分析", "集錦錄像"].map((ele, i) => (
                  <button
                    key={i}
                    className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
                      activeIndex === i
                        ? "bg-bg-color text-pri-color"
                        : "text-white hover:bg-bg-color hover:text-pri-color"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  >
                    {ele}
                  </button>
                ))}
              </div>
              <hr className="border-border-color my-[20px]" />
              {activeIndex === 0 ? (
                <>
                  {data.data_card?.PreMatchAnalysis ? (
                    <div className="px-[20px] pb-[5px]">
                      <PreMatchAnalysis
                        data_card={data.data_card}
                        data={data.data_card.PreMatchAnalysis}
                      />
                    </div>
                  ) : (
                    <NoDataFound />
                  )}
                </>
              ) : (
                <MatchVideos data={data.matchVideos} />
              )}
            </div>
          );
        }

        break;
      }
      default:
        data.matchVideos?.length > 0 && tabs.push(<MatchVideos data={data.matchVideos} />);
        break;
    }
    return tabs;
  };
  const tabs = getTabsByType(matchType);
  return (
    <>
      {tabs.length > 0 &&
        tabs.map((ele, i) => <React.Fragment key={i}>{ele}</React.Fragment>)}
    </>
  );
}

export const tableHeaderStyles =
  "bg-border-color items-center h-[34px] px-[15px] text-center whitespace-nowrap text-[12px]";

export const tableBodyStyles =
  "items-center py-[12px] px-[15px] border-b border-solid border-border-color last:border-none text-center whitespace-nowrap hover:text-pri-color";

const MatchVideos = ({ data }) => {
  return data?.length > 0 ? (
    <Frame title="集錦錄像" iconName="icon_video">
      <ArticleList
        data={data}
        type="video"
        isRow={true}
        colNo={2}
      />
    </Frame>
  ) : (
    <NoDataFound />
  );
};
