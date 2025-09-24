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
        <div className="grid grid-cols-[1fr_157px_1fr] items-center px-[6%] text-[16px] pt-[30px] pb-[10px]">
          <div className="flex items-center">
            <a
              {...leftHref}
              className={`flex gap-x-[8px] items-center hover:text-sec-color ${
                leftHref?.href ? "underline underline-offset-[3px]" : ""
              }`}
            >
              <LazyImage
                src={data?.HomeTeam?.icon}
                height={50}
                width={50}
                className={`shrink-0 overflow-hidden ${
                  roundCorners ? "rounded-[5px]" : ""
                }`}
              />
              <p className="truncate">{data?.HomeTeam?.name_abbr}</p>
            </a>
          </div>
          <div className="relative flex flex-col items-center justify-center h-full text-[26px]">
            <div className="absolute -top-[23px] flex gap-x-[5px] text-[14px] text-[#888]">
              {hasPenalty && (
                <div>
                  點球&nbsp;[
                  <span>{data.home_penalty_score}</span>&nbsp;:&nbsp;
                  <span>{data.away_penalty_score}</span>]
                </div>
              )}
              {hasOvertime && (
                <div>
                  加時&nbsp;[
                  <span>{data.home_overtime_score}</span>&nbsp;:&nbsp;
                  <span>{data.away_overtime_score}</span>]
                </div>
              )}
            </div>
            {state === "prelive" ? (
              "–"
            ) : (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-[20px]">
                <p
                  className={`text-center ${
                    homeWin || draw ? "text-pri-color" : ""
                  }`}
                >
                  {data.state === 0 ? "–" : data.home_score}
                </p>
                <span>:</span>
                <p
                  className={`text-center ${
                    awayWin || draw ? "text-pri-color" : ""
                  }`}
                >
                  {data.state === 0 ? "–" : data.away_score}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-end">
            <a
              {...rightHref}
              className={`flex items-center gap-[20px] hover:text-sec-color ${
                rightHref?.href ? "underline underline-offset-[3px]" : ""
              }`}
            >
              <p className="truncate">{data?.AwayTeam?.name_abbr}</p>
              <LazyImage
                src={data?.AwayTeam?.icon}
                height={50}
                width={50}
                className={`shrink-0 overflow-hidden ${
                  roundCorners ? "rounded-[5px]" : ""
                }`}
              />
            </a>
          </div>
        </div>
      </>
    );
  };
  const renderPlayerWangqiu = (data) => {
    return (
      <>
        <div className="grid grid-cols-[1fr_157px_1fr] items-center px-[6%] text-[16px] pt-[30px] pb-[10px]">
          <div className="flex flex-col gap-[10px] items-start">
            <div
              className={`flex gap-x-[20px] items-center hover:text-sec-color`}
            >
              <LazyImage
                src={data?.PlayerA1?.photo}
                height={50}
                width={50}
                className={`shrink-0 overflow-hidden ${
                  roundCorners ? "rounded-[10px]" : ""
                }`}
              />
              <p className="truncate">{data?.PlayerA1?.name_f}</p>
            </div>
            {!data.is_single && (
              <div
                className={`flex gap-x-[20px] items-center hover:text-sec-color`}
              >
                <LazyImage
                  src={data?.PlayerA2?.photo}
                  height={50}
                  width={50}
                  className={`shrink-0 overflow-hidden ${
                    roundCorners ? "rounded-[10px]" : ""
                  }`}
                />
                <p className="truncate">{data?.PlayerA2?.name_f}</p>
              </div>
            )}
          </div>
          <div className="relative flex flex-col items-center justify-center h-full text-[26px]">
            {state === "prelive" ? (
              "–"
            ) : (
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-[20px]">
                <p
                  className={`text-center ${
                    homeWin || draw ? "text-pri-color" : ""
                  }`}
                >
                  {data.state === 0 ? "–" : data.home_score}
                </p>
                <span>:</span>
                <p
                  className={`text-center ${
                    awayWin || draw ? "text-pri-color" : ""
                  }`}
                >
                  {data.state === 0 ? "–" : data.away_score}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[10px] items-end">
            <div
              className={`flex items-center gap-[10px] hover:text-sec-color`}
            >
              <p className="truncate">{data?.PlayerB1?.name_f}</p>
              <LazyImage
                src={data?.PlayerB1?.photo}
                height={50}
                width={50}
                className={`shrink-0 overflow-hidden ${
                  roundCorners ? "rounded-[10px]" : ""
                }`}
              />
            </div>
            {!data.is_single && (
              <div
                className={`flex gap-x-[8px] items-center hover:text-sec-color`}
              >
                <p className="truncate">{data?.PlayerB2?.name_f}</p>
                <LazyImage
                  src={data?.PlayerB2?.photo}
                  height={50}
                  width={50}
                  className={`shrink-0 overflow-hidden ${
                    roundCorners ? "rounded-[10px]" : ""
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="relative rounded-[10px] bg-white p-[20px]">
      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center gap-x-[6px]">
          <div className="flex flex-col items-center justify-between h-[16px]">
            <div className="w-[6px] h-[6px] rounded-full bg-pri-color" />
            <div className="w-[6px] h-[6px] rounded-full bg-sec-color" />
          </div>
          <a
            href={
              topicName
                ? getBaseUrl(matchType, topicName) + "/"
                : "/" + matchType + "/"
            }
            className="leading-[25px] text-[18px] underline underline-offset-2"
          >
            {data?.competition?.gb || data?.competition?.name_abbr}
          </a>
        </div>
        <p
          className={`text-[14px] text-center ${
            state === "live"
              ? "text-[#E32B2E]"
              : state === "prelive"
              ? "text-[#888888]"
              : ""
          }`}
        >
          {getMatchStr(data.state)}
        </p>
        <div className={`flex items-center justify-end gap-x-[6px]`}>
          <LazyImage
            src={`/images/icon_calendar.png`}
            width={20}
            height={20}
            alt=""
          />
          <h2 className="text-pri-color">
            {changeDateFormat(data.time, "yyyy-MM-dd HH:mm")}
          </h2>
        </div>
        <p className="text-center"></p>
      </div>
      <hr className="mt-[10px] border-border-color" />
      <div className="">
        {matchType === "wangqiu"
          ? renderPlayerWangqiu(data)
          : renderPlayerInfo(data)}
        {children}
      </div>
    </div>
  );
}
