import LazyImage from "/components/tools/lazy_image";
import {
  changeDateFormat,
  getBaseUrl,
  getMatchCls,
  getMatchStr,
  getTeamAbbr,
} from "../../../public/scripts/publicFunction";

export default function TopContentCard({
  data,
  matchType,
  topicName,
  children,
}) {
  const hasOvertime = Boolean(
    data?.home_overtime_score || data?.away_overtime_score
  );
  const hasPenalty = Boolean(
    data?.home_penalty_score || data?.away_penalty_score
  );
  const state = getMatchCls(data.state);
  const homeWin = data.home_score > data.away_score;
  const awayWin = data.home_score < data.away_score;
  const draw = state !== "prelive" && data.home_score === data.away_score;
  const roundCorners = !["zuqiu", "lanqiu"].includes(data.match_type);

  const renderPlayerInfo = (data) => {
    const teamAbbr = getTeamAbbr(matchType);
    const leftHref =
      matchType !== "zonghe"
        ? { href: `/${teamAbbr}/${data?.HomeTeam?.ID}/` }
        : {};
    const rightHref =
      matchType !== "zonghe"
        ? { href: `/${teamAbbr}/${data?.AwayTeam?.ID}/` }
        : {};
    return (
      <>
        <div className="grid grid-cols-[1fr_157px_1fr] gap-x-[10%] items-center text-[16px]">
          <div className="flex justify-end items-center">
            <a
              {...leftHref}
              className={`flex gap-x-[8px] items-center hover:text-pri-color ${
                leftHref?.href ? "underline underline-offset-[3px]" : ""
              }`}
            >
              <p className="truncate">{data?.HomeTeam?.name_abbr}</p>
              <LazyImage
                src={data?.HomeTeam?.icon}
                height={50}
                width={50}
                className={`shrink-0 overflow-hidden ${
                  roundCorners ? "rounded-[5px]" : ""
                }`}
              />
            </a>
          </div>
          <div className="relative flex flex-col items-center justify-center h-full py-[20px] bg-border-color text-[24px] text-pri-color">
            {state === "prelive" ? (
              "–"
            ) : (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-[10px]">
                <p className={`text-end ${homeWin || draw ? "" : ""}`}>
                  {data.state === 0 ? "–" : data.home_score}
                </p>
                <span>–</span>
                <p className={`${awayWin || draw ? "" : ""}`}>
                  {data.state === 0 ? "–" : data.away_score}
                </p>
              </div>
            )}
            <p
              className={`text-[14px] mt-[10px] ${
                state === "live"
                  ? "text-[#E32B2E]"
                  : state === "prelive"
                  ? "text-pri-color"
                  : "text-[#888888]"
              }`}
            >
              {getMatchStr(data.state)}
            </p>
          </div>
          <div className="flex items-center">
            <a
              {...rightHref}
              className={`flex items-center gap-[10px] hover:text-pri-color ${
                rightHref?.href ? "underline underline-offset-[3px]" : ""
              }`}
            >
              <LazyImage
                src={data?.AwayTeam?.icon}
                height={50}
                width={50}
                className={`shrink-0 overflow-hidden ${
                  roundCorners ? "rounded-[5px]" : ""
                }`}
              />
              <p className="truncate">{data?.AwayTeam?.name_abbr}</p>
            </a>
          </div>
        </div>
      </>
    );
  };
  const renderPlayerWangqiu = (data) => {
    return (
      <>
        <div className="grid grid-cols-[1fr_157px_1fr] gap-x-[10%] items-center text-[16px]">
          <div className="flex gap-[20px] justify-end items-center">
            <div
              className={`flex gap-x-[8px] items-center hover:text-pri-color`}
            >
              <p className="truncate">{data?.PlayerA1?.name_f}</p>
              <LazyImage
                src={data?.PlayerA1?.photo}
                height={50}
                width={50}
                className={`shrink-0 overflow-hidden ${
                  roundCorners ? "rounded-[10px]" : ""
                }`}
              />
            </div>
            {!data.is_single && (
              <div
                className={`flex gap-x-[8px] items-center hover:text-pri-color`}
              >
                <p className="truncate">{data?.PlayerA2?.name_f}</p>
                <LazyImage
                  src={data?.PlayerA2?.photo}
                  height={50}
                  width={50}
                  className={`shrink-0 overflow-hidden ${
                    roundCorners ? "rounded-[10px]" : ""
                  }`}
                />
              </div>
            )}
          </div>
          <div className="relative flex flex-col items-center justify-center h-full py-[20px] bg-border-color text-[24px] text-pri-color">
            {state === "prelive" ? (
              "–"
            ) : (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-[10px]">
                <p className={`text-end ${homeWin || draw ? "" : ""}`}>
                  {data.state === 0 ? "–" : data.home_score}
                </p>
                <span>–</span>
                <p className={`${awayWin || draw ? "" : ""}`}>
                  {data.state === 0 ? "–" : data.away_score}
                </p>
              </div>
            )}
            <p
              className={`text-[14px] mt-[10px] ${
                state === "live"
                  ? "text-[#E32B2E]"
                  : state === "prelive"
                  ? "text-pri-color"
                  : "text-[#888888]"
              }`}
            >
              {getMatchStr(data.state)}
            </p>
          </div>
          <div className="flex gap-[20px] items-center">
            <div
              className={`flex items-center gap-[10px] hover:text-pri-color`}
            >
              <LazyImage
                src={data?.PlayerB1?.photo}
                height={50}
                width={50}
                className={`shrink-0 overflow-hidden ${
                  roundCorners ? "rounded-[10px]" : ""
                }`}
              />
              <p className="truncate">{data?.PlayerB1?.name_f}</p>
            </div>
            {!data.is_single && (
              <div
                className={`flex gap-x-[8px] items-center hover:text-pri-color`}
              >
                <LazyImage
                  src={data?.PlayerB2?.photo}
                  height={50}
                  width={50}
                  className={`shrink-0 overflow-hidden ${
                    roundCorners ? "rounded-[10px]" : ""
                  }`}
                />
                <p className="truncate">{data?.PlayerB2?.name_f}</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="relative rounded-[10px] bg-pri-color p-[20px]">
      <div className="grid grid-cols-3 text-white">
        <p className="">{changeDateFormat(data.time, "yyyy-MM-dd HH:mm")}</p>
        <a
          href={
            topicName
              ? getBaseUrl(matchType, topicName) + "/"
              : "/" + matchType + "/"
          }
          className="block z-[1] underline underline-offset-2 text-center text-white hover:text-bg-color w-max mx-auto"
        >
          {data?.competition?.gb || data?.competition?.name_abbr}
        </a>
        <div className="flex gap-x-[5px] justify-end">
          {hasPenalty && (
            <div>
              (點球&nbsp;
              <span>{data.home_penalty_score}</span>-
              <span>{data.away_penalty_score}</span>)
            </div>
          )}
          {hasOvertime && (
            <div>
              (加時&nbsp;
              <span>{data.home_overtime_score}</span>-
              <span>{data.away_overtime_score}</span>)
            </div>
          )}
        </div>
      </div>
      <div className="rounded-[10px] mt-[15px] bg-white">
        {matchType === "wangqiu"
          ? renderPlayerWangqiu(data)
          : renderPlayerInfo(data)}
        {children}
      </div>
    </div>
  );
}
