import LazyImage from "/components/tools/lazy_image";
import {
  changeDateFormat,
  getMatchCls,
  getMatchStr,
} from "../../../public/scripts/publicFunction";
import NoDataFound from "../../tools/noDataFound";

export default function MatchCard({ data }) {
  return data ? (
    <div className="space-y-[12px]">
      {data?.map((m, i) => {
        const state = getMatchCls(m.state);
        const homeWin = m.home_score > m.away_score;
        const awayWin = m.home_score < m.away_score;
        const draw = state !== "prelive" && m.home_score == m.away_score;

        const hasOvertime = Boolean(
          m?.home_overtime_score || m?.away_overtime_score
        );
        const hasPenalty = Boolean(
          m?.home_penalty_score || m?.away_penalty_score
        );
        const roundCorners = !["zuqiu", "lanqiu"].includes(m.match_type);
        return (
          <a
            key={i}
            href={`/${m.match_type}/${m.id}.html`}
            className="relative group grid grid-cols-[6.5fr_110px_3.5fr] items-center rounded-[10px] border border-solid border-border-color hover:border-pri-color"
          >
            <div className="grid grid-cols-[0.9fr_1px_1fr] items-center gap-x-[30px] pl-[30px] pr-[20px] py-[15px]">
              <div className="">
                <div className="flex justify-between">
                  <p className="truncate font-semibold">
                    {m.match_name || m.competition_name}
                  </p>
                  {m.important && (
                    <LazyImage
                      src="/images/hot_icon.png"
                      width={20}
                      height={20}
                      alt="hot"
                      className=""
                    />
                  )}
                </div>
                <div className="flex justify-between mt-[5px] whitespace-nowrap">
                  <p
                    className={`${
                      state === "live"
                        ? "text-[#E32B2E]"
                        : state === "prelive"
                        ? "text-pri-color"
                        : "text-[#888888]"
                    }`}
                  >
                    {getMatchStr(m.state)}
                  </p>
                  <p className="ml-[8px]">
                    {changeDateFormat(m.time, "HH:mm MM-dd")}
                  </p>
                </div>
              </div>
              <div className="w-[1px] h-[53px] bg-border-color" />
              <div>
                <div className="flex gap-x-[10px]">
                  <p className="truncate w-full text-end">
                    {m.home_team_name || m.player_a1}
                  </p>
                  <LazyImage
                    src={m.home_team_image || m.photo_a1}
                    height={24}
                    width={24}
                    className={`shrink-0 overflow-hidden ${
                      roundCorners ? "rounded-[5px]" : ""
                    }`}
                  />
                </div>
                {!m.is_single && m.match_type === "wangqiu" && (
                  <div className="flex gap-x-[10px] mt-[5px]">
                    <p className="truncate w-full text-end">{m.player_a2}</p>
                    <LazyImage
                      src={m.photo_a2}
                      height={24}
                      width={24}
                      className={`shrink-0 overflow-hidden ${
                        roundCorners ? "rounded-[5px]" : ""
                      }`}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="relative flex items-center justify-center h-full bg-border-color text-[16px] text-pri-color">
              {state === "prelive" ? (
                "–"
              ) : (
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-[10px]">
                  <p className={`text-end ${homeWin || draw ? "" : ""}`}>
                    {m.state === 0 ? "–" : m.home_score}
                  </p>
                  <span>–</span>
                  <p className={`${awayWin || draw ? "" : ""}`}>
                    {m.state === 0 ? "–" : m.away_score}
                  </p>
                </div>
              )}
              {hasPenalty && (
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 text-[12px] whitespace-nowrap">
                  (點球&nbsp;
                  <span>{m.home_penalty_score}</span>-
                  <span>{m.away_penalty_score}</span>)
                </div>
              )}
              {hasOvertime && (
                <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 text-[12px] whitespace-nowrap">
                  (加時&nbsp;
                  <span>{m.home_overtime_score}</span>-
                  <span>{m.away_overtime_score}</span>)
                </div>
              )}
            </div>
            <div className="pl-[20px] pr-[26px]">
              <div className="flex gap-x-[10px]">
                <LazyImage
                  src={m.away_team_image || m.photo_b1}
                  height={24}
                  width={24}
                  className={`shrink-0 overflow-hidden ${
                    roundCorners ? "rounded-[5px]" : ""
                  }`}
                />
                <p className="truncate w-full">
                  {m.away_team_name || m.player_b1}
                </p>
              </div>
              {!m.is_single && m.match_type === "wangqiu" && (
                <div className="flex gap-x-[10px] mt-[5px]">
                  <LazyImage
                    src={m.photo_b2}
                    height={24}
                    width={24}
                    className={`shrink-0 overflow-hidden ${
                      roundCorners ? "rounded-[5px]" : ""
                    }`}
                  />
                  <p className="truncate w-full">{m.player_b2}</p>
                </div>
              )}
            </div>
          </a>
        );
      })}
    </div>
  ) : (
    <NoDataFound cHeight={"300px"} />
  );
}
