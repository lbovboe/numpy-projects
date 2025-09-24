import LazyImage from "/components/tools/lazy_image";
import { changeDateFormat, getMatchCls, getMatchStr } from "../../../public/scripts/publicFunction";
export default function MatchCardSmall({ data }) {
  return (
    data && (
      <div className="flex flex-col gap-[12px]">
        {data?.map((m, i) => {
          const state = getMatchCls(m.state);
          const homeWin = m.home_score > m.away_score;
          const awayWin = m.home_score < m.away_score;
          const isDraw = state !== "prelive" && m.home_score === m.away_score;
          const topChildren = (
            <div className="grid grid-cols-[1fr_130px_1fr] leading-[20px]">
              <div className="flex items-center gap-x-[5px]">
                <p>{m?.time && changeDateFormat(m?.time, "yyyy-MM-dd HH:mm")}</p>
                {m?.important && (
                  <LazyImage
                    src="/images/hot-icon.png"
                    width={20}
                    height={20}
                    alt="熱"
                  />
                )}
              </div>
              <p className=" text-center">{m?.competition_name || m?.competition?.name}</p>
              <div className="flex items-center gap-x-[8px] justify-end">
                {(m?.overtime_session || m?.penalty_session) && (
                  <div className="text-sec-color flex items-center gap-x-[8px]">
                    {m?.overtime_session && (
                      <p>
                        加时 ({m?.home_overtime_score}&nbsp;:&nbsp;
                        {m?.away_overtime_score})
                      </p>
                    )}
                    {m?.penalty_session && (
                      <p>
                        点球 ({m?.home_penalty_score}&nbsp;:&nbsp;
                        {m?.away_penalty_score})
                      </p>
                    )}
                  </div>
                )}
                <p
                  className={`leading-[20px]  ${
                    state === "live" ? "text-[#F01010]" : state === "prelive" ? "text-pri-color" : "text-sec-color"
                  }`}
                >
                  ({getMatchStr(m?.state)})
                </p>
              </div>
            </div>
          );

          const btmChildren = (
            <div className="grid grid-cols-[1fr_100px_1fr] items-center">
              <div className="flex items-center gap-x-[10px]">
                <LazyImage
                  src={m.home_team_image || m.photo_a1}
                  height={24}
                  width={24}
                  alt={m.home_team_name || m.player_a1}
                  className={` rounded-[10px] overflow-hidden`}
                />
                <div className={`hover:text-sec-color " : ""}`}>
                  <p className="text-[16px] text-end truncate">{m?.home_team_name || m?.HomeTeam?.name}</p>
                </div>
              </div>

              <div className="flex items-center bg-bg-color gap-x-[8px]   py-[3px] px-[30px] h-fit w-full rounded-[20px] justify-center">
                <p className={`${homeWin || isDraw ? "text-pri-color" : ""}`}>
                  {state === "prelive" ? "-" : m.home_score}
                </p>
                <p>:</p>
                <p className={`${awayWin || isDraw ? "text-pri-color" : ""}`}>
                  {state === "prelive" ? "-" : m.away_score}
                </p>
              </div>

              <div className="flex items-center gap-x-[10px] justify-end">
                <div className={`hover:text-sec-color " : ""}`}>
                  <p className="text-[16px] truncate">{m?.away_team_name || m?.AwayTeam?.name}</p>
                </div>
                <LazyImage
                  src={m?.away_team_image || m?.AwayTeam?.icon}
                  height={24}
                  width={24}
                  alt={m?.away_team_name || m?.AwayTeam?.name}
                  className={`rounded-[10px] overflow-hidden`}
                />
              </div>
            </div>
          );
          return (
            <a
              key={i}
              href={`/${m.match_type}/${m.id}.html`}
              className=""
            >
              {topChildren}
              {btmChildren}
            </a>
          );
        })}
      </div>
    )
  );
}
