import LazyImage from "/components/tools/lazy_image";
import { changeDateFormat, getMatchCls, getMatchStr } from "../../../public/scripts/publicFunction";

export default function MatchCard({ data }) {
  return (
    data && (
      <div className="space-y-[12px]">
        {data?.map((m, i) => {
          const state = getMatchCls(m.state);
          const homeWin = m.home_score > m.away_score;
          const awayWin = m.home_score < m.away_score;
          const isDraw = state !== "prelive" && m.home_score === m.away_score;
          return (
            <a
              href={`/${m.match_type}/${m.id}.html`}
              className="group bg-white relative rounded-[10px] border border-solid border-border-color p-[20px] hover:border-sec-color  grid grid-cols-[1.5fr_1px_1fr] gap-x-[20px] items-center text-[14px] whitespace-nowrap"
              key={i}
            >
              <div className="flex flex-col justify-between gap-y-[10px] relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-[20px] ">
                    <div className="grid grid-cols-[30px_1fr] gap-x-[5px] items-center">
                      <LazyImage
                        src={m.home_team_image || m.photo_a1}
                        height={30}
                        width={30}
                        alt={m.home_team_name || m.player_a1}
                        className="rounded-[10px] overflow-hidden"
                      />
                      <p className="text-start truncate leading-[20px] w-[140px]">
                        {m?.home_team_name || m?.HomeTeam?.name || m.player_a1}
                      </p>
                    </div>
                    {!m.is_single && m.match_type === "wangqiu" && (
                      <div className="grid grid-cols-[30px_1fr] gap-x-[5px] justify-start items-center">
                        <LazyImage
                          src={m.photo_a2}
                          height={30}
                          width={30}
                          alt={m.player_a2}
                          className="rounded-[10px] overflow-hidden"
                        />
                        <p className="truncate leading-[20px w-[140px]">{m.player_a2}</p>
                      </div>
                    )}
                  </div>
                  <p className={`text-[18px] ${homeWin || isDraw ? "text-pri-color" : ""}`}>
                    {state === "prelive" ? "-" : m?.home_score}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-[20px]">
                    <div className="grid grid-cols-[30px_1fr] gap-x-[5px] items-center">
                      <LazyImage
                        src={m?.away_team_image || m?.photo_b1}
                        height={30}
                        width={30}
                        alt={m?.away_team_name || m.player_b1}
                        className="rounded-[10px] overflow-hidden"
                      />
                      <p className="truncate leading-[20px] w-[140px]">
                        {m?.away_team_name || m?.AwayTeam?.name || m.player_b1}
                      </p>
                    </div>
                    {!m.is_single && m.match_type === "wangqiu" && (
                      <div className="grid grid-cols-[1fr_30px] gap-x-[5px] items-center">
                        <LazyImage
                          src={m.photo_b2}
                          height={30}
                          width={30}
                          alt={m.player_b2}
                          className="rounded-[10px] overflow-hidden"
                        />
                        <p className="truncate leading-[20px] w-[140px]">{m.player_b2}</p>
                      </div>
                    )}
                  </div>
                  <p className={`text-[18px] ${awayWin || isDraw ? "text-pri-color" : ""}`}>
                    {state === "prelive" ? "-" : m?.away_score}
                  </p>
                </div>
                <div className="flex gap-x-[10px] absolute right-[50px] top-[50%] translate-y-[-10px]">
                  {m?.overtime_session && (
                    <p className="text-[#888]">{`[加時 ${m?.home_overtime_score}–${m?.away_overtime_score}]`}</p>
                  )}
                  {m?.penalty_session && (
                    <p className="text-[#888]">{`[點球 ${m?.home_penalty_score}–${m?.away_penalty_score}]`}</p>
                  )}
                </div>
              </div>
              <div className="w-[1px] h-full bg-border-color " />
              <div className="flex flex-col gap-y-[5px] leading-[20px]">
                <div className="truncate">{m.match_type === "wangqiu" ? m.match_name : m.competition_name}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <p>{m?.time && changeDateFormat(m?.time, "yyyy-MM-dd HH:mm")}</p>
                    <p className="underline underline-offset-2 group-hover:text-sec-color">視頻觀看</p>
                  </div>
                </div>

                <div className="flex items-center gap-x-[5px]">
                  <p
                    className={`leading-[20px] ${
                      state === "live" ? "text-[#E32B2E]" : state === "prelive" ? "text-[#D19F6C]" : ""
                    }`}
                  >
                    {getMatchStr(m?.state)}
                  </p>
                  {m?.important && (
                    <LazyImage
                      src="/images/hot-icon.png"
                      width={20}
                      height={20}
                      alt="熱"
                    />
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    )
  );
}
