import LeftRightChart from "../../chart/LeftRightChart";
import { tableBodyStyles, tableHeaderStyles } from "../details_content";
import TableTeamHeader from "../football/table_team_header";

export default function StatisticStat({ data }) {
  return (
    <div className="">
      {data?.Statistic?.stats && data?.Statistic?.stats?.length > 0 && (
        <div className="overflow-hidden">
          <TableTeamHeader data={data} type="lanqiu" />
          <div className="rounded-b-[10px]">
            <div className={`grid ${tableHeaderStyles} rounded-b-[10px] text-[12px]`}>數據</div>
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
    </div>
  );
}
