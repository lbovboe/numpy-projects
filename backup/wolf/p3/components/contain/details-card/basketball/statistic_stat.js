import LeftRightChart from "../../chart/LeftRightChart";
import { tableBodyStyles, tableHeaderStyles } from "../details_content";
import TableTeamHeader from "../football/table_team_header";

export default function StatisticStat({ data }) {
  return (
    <>
      {data?.Statistic?.stats && data?.Statistic?.stats?.length > 0 && (
        <div className="text-[14px] rounded-[10px] border border-solid border-border-color overflow-hidden">
          <TableTeamHeader data={data} type="lanqiu" />
          <div className="">
            <div className={`grid text-[12px] ${tableHeaderStyles}`}>
              數據
            </div>
            {data?.Statistic?.stats.map((val, idx) => (
              <div key={idx} className={`grid my-[15px] px-[15px]`}>
                <LeftRightChart
                  homeScore={val?.Home}
                  awayScore={val?.Away}
                  homeName={data?.HomeTeam?.name_abbr}
                  awayName={data?.AwayTeam?.name_abbr}
                  title={val?.Title}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
