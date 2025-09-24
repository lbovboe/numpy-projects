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
        const isDraw = state !== "prelive" && m.home_score == m.away_score;

        const roundCorners = !["zuqiu", "lanqiu"].includes(m.match_type);
        return (
          <a
            key={i}
            href={`/${m.match_type}/${m.id}.html`}
            className="relative block"
          >
            <div className="grid grid-cols-[164px_1fr_84px] items-center rounded-[10px] border border-solid border-border-color hover:border-sec-color text-[14px] whitespace-nowrap ">
              <div className="flex flex-col justify-between gap-y-[10px] p-[20px] border-r border-solid border-border-color">
                <div className="flex items-center justify-between">
                  <p className="truncate max-w-[100px]">
                    {m.competition_name || m?.competition?.name}
                  </p>
                  {m.important && (
                    <svg width={20} height={20} className={`fill-[#E32B2E]`}>
                      <use href="#icon-hot"></use>
                    </svg>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p>
                    {m?.time && changeDateFormat(m?.time, "yyyy-MM-dd HH:mm")}
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col gap-y-[12px] justify-between px-[20px] py-[15px]">
                <div className="absolute left-[55%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-x-[10px] text-[#888]">
                  {m.overtime_session && (
                    <p className="text-[#888]">{`加時 [${m.home_overtime_score} : ${m.away_overtime_score}]`}</p>
                  )}
                  {m.penalty_session && (
                    <p className="text-[#888]">{`點球 [${m.home_penalty_score} : ${m.away_penalty_score}]`}</p>
                  )}
                </div>
                <div className="flex items-center justify-between gap-x-[120px]">
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
                <div className="flex items-center justify-between gap-x-[120px]">
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
                    className={`text-end text-[16px] ${
                      awayWin || isDraw ? "text-pri-color" : ""
                    }`}
                  >
                    {state === "prelive" ? "-" : m.away_score}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center border-l border-solid border-border-color h-full">
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
            </div>
          </a>
        );
      })}
    </div>
  ) : (
    <NoDataFound cHeight={"300px"} />
  );
}
