import { tableBodyStyles, tableHeaderStyles } from "../details_content";

export default function StatisticScore({ data }) {
  const checkScore = (val) => {
    if (val && Object.keys(val).length !== 0) return val;
    else return "-";
  };
  return (
    <>
      {data?.Statistic?.score && (
        <div className="text-[14px] rounded-[10px] border border-solid border-border-color overflow-hidden">
          <div className="flex justify-center items-center bg-pri-color text-white h-[36px]">
            交鋒歷史
          </div>
          <div
            className={`grid grid-cols-[150px_repeat(9,1fr)] gap-x-[10px] text-[12px] ${tableHeaderStyles}`}
          >
            <p>球隊</p>
            <p>
              1<sup>st</sup>
            </p>
            <p>
              2<sup>nd</sup>
            </p>
            <p>
              3<sup>rd</sup>
            </p>
            <p>
              4<sup>th</sup>
            </p>
            <p>加時1</p>
            <p>加時2</p>
            <p>加時3</p>
            <p>加時4</p>
            <p>總分</p>
          </div>
          <div>
            {data?.Statistic?.score &&
              data?.Statistic?.score.map((val, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-[150px_repeat(9,1fr)] gap-x-[10px] ${tableBodyStyles}`}
                >
                  <p>
                    {val?.side == "home"
                      ? data?.HomeTeam?.name
                      : data?.AwayTeam?.name}
                  </p>
                  <p>{checkScore(val?.first_quarter)}</p>
                  <p>{checkScore(val?.seocnd_quarter)}</p>
                  <p>{checkScore(val?.third_quarter)}</p>
                  <p>{checkScore(val?.forth_quarter)}</p>
                  <p>{checkScore(val?.overtime_one)}</p>
                  <p>{checkScore(val?.overtime_two)}</p>
                  <p>{checkScore(val?.overtime_three)}</p>
                  <p>{checkScore(val?.over_time_four)}</p>
                  <p>{checkScore(val?.total)}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
