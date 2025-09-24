import {
  changeDateFormat,
  getMatchCls,
  getMatchStr,
} from "../../../public/scripts/publicFunction";
import Frame from "../../tools/Frame";
import LazyImage from "../../tools/lazy_image";
export default function RecomMatches({
  data,
  title = "熱門比賽",
  href,
  layout = "grid-cols-2",
}) {
  return (
    data?.length > 0 && (
      <Frame title={title} href={href}>
        <div className={`grid gap-[15px] ${layout}`}>
          {data.map((m, i) => {
            const state = getMatchCls(m?.state);
            const homeWin = m.home_score > m.away_score;
            const awayWin = m.home_score < m.away_score;
            const isDraw = state !== "prelive" && m.home_score == m.away_score;

            return (
              <div key={i} className="">
                <a
                  href={`/${m.match_type}/${m.id}.html`}
                  className={`group block rounded-[10px] border border-solid border-border-color hover:border-sec-color`}
                >
                  <div className="flex justify-between items-center p-[10px]">
                    <div className="flex items-center gap-x-[6px]">
                      <p className="truncate">
                        {changeDateFormat(m.time, "MM-dd HH:mm")}
                      </p>
                      <p className="truncate text-center">
                        {m.match_name || m.competition_name}
                      </p>
                      {m.important && (
                        <svg
                          width={20}
                          height={20}
                          className={`fill-[#E32B2E]`}
                        >
                          <use href="#icon-hot"></use>
                        </svg>
                      )}
                    </div>
                    <p
                      className={`leading-[20px] ${
                        state === "live"
                          ? "text-[#E32B2E]"
                          : state === "prelive"
                          ? "text-[#888]"
                          : ""
                      }`}
                    >
                      {getMatchStr(m.state)}
                    </p>
                  </div>
                  <div className="relative flex flex-col gap-y-[10px] justify-between border-t border-solid border-border-color p-[10px]">
                    <div className="absolute left-[55%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-[16px] text-[#888]">
                      {m.overtime_session && (
                        <p className="text-[#888]">{`加時 [${m.home_overtime_score} : ${m.away_overtime_score}]`}</p>
                      )}
                      {m.penalty_session && (
                        <p className="text-[#888]">{`點球 [${m.home_penalty_score} : ${m.away_penalty_score}]`}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-x-[25px]">
                      <div className="grid grid-cols-2 gap-x-[20px] w-full">
                        <div className="grid grid-cols-[24px_1fr] gap-x-[6px] items-center">
                          <LazyImage
                            src={m.home_team_image || m.photo_a1}
                            height={24}
                            width={24}
                            className="rounded-[5px] overflow-hidden"
                          />
                          <p className="truncate leading-[20px] font-semibold w-full">
                            {m.home_team_name || m.player_a1}
                          </p>
                        </div>
                        {!m.is_single && m.match_type === "wangqiu" && (
                          <div className="grid grid-cols-[24px_1fr] gap-x-[6px] items-center">
                            <LazyImage
                              src={m.photo_a2}
                              height={24}
                              width={24}
                              className="rounded-[5px] overflow-hidden"
                            />
                            <p className="truncate leading-[20px] font-semibold w-full">
                              {m.player_a2}
                            </p>
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-end text-[16px] ${
                          homeWin || isDraw ? "text-pri-color" : ""
                        }`}
                      >
                        {state === "prelive" ? "-" : m.home_score}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-x-[25px]">
                      <div className="grid grid-cols-2 gap-x-[20px] w-full">
                        <div className="grid grid-cols-[24px_1fr] gap-x-[6px] items-center">
                          <LazyImage
                            src={m.away_team_image || m.photo_b1}
                            height={24}
                            width={24}
                            className="rounded-[5px] overflow-hidden"
                          />
                          <p className="truncate leading-[20px] font-semibold w-full">
                            {m.away_team_name || m.player_b1}
                          </p>
                        </div>
                        {!m.is_single && m.match_type === "wangqiu" && (
                          <div className="grid grid-cols-[24px_1fr] gap-x-[6px] items-center">
                            <LazyImage
                              src={m.photo_b2}
                              height={24}
                              width={24}
                              className="rounded-[5px] overflow-hidden"
                            />
                            <p className="truncate leading-[20px] font-semibold w-full">
                              {m.player_b2}
                            </p>
                          </div>
                        )}
                      </div>
                      <p
                        className={`text-end ${
                          awayWin || isDraw ? "text-pri-color" : ""
                        }`}
                      >
                        {state === "prelive" ? "-" : m.away_score}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </Frame>
    )
  );
}
