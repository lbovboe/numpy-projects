import LazyImage from "/components/tools/lazy_image";
import {
  changeDateFormat,
  getBaseUrl,
  getMatchCls,
  getMatchStr,
  getTeamAbbr,
} from "../../../public/scripts/publicFunction";
export default function TopContentCard({ data, matchType, topicName }) {
  const hasOvertime = Boolean(data?.home_overtime_score || data?.away_overtime_score);
  const hasPenalty = Boolean(data?.home_penalty_score || data?.away_penalty_score);
  const state = getMatchCls(data.state);
  const homeWin = data.home_score > data.away_score;
  const awayWin = data.home_score < data.away_score;
  const isDraw = state !== "prelive" && data.home_score === data.away_score;
  const getHref = (matchType, topicName) => {
    if (matchType !== "zonghe") {
      return topicName ? `${getBaseUrl(matchType, topicName)}/` : `/${matchType}/`;
    }

    return topicName === "ufc" || topicName === "dianjing" ? `${getBaseUrl(matchType, topicName)}/` : `/${matchType}/`;
  };

  const renderPlayerInfo = (data) => {
    const teamAbbr = getTeamAbbr(matchType);
    const leftHref = matchType !== "zonghe" ? { href: `/${teamAbbr}/${data?.HomeTeam?.ID}/` } : {};
    const rightHref = matchType !== "zonghe" ? { href: `/${teamAbbr}/${data?.AwayTeam?.ID}/` } : {};
    return (
      <div className="border border-solid border-border-color rounded-[10px] px-[20px]">
        <div className="grid w-full grid-cols-3">
          <div className="h-[5px] rounded-bl-[5px] bg-[#2F3035]"></div>
          <div className="h-[5px]  bg-[#D19F6C]"></div>
          <div className="h-[5px] rounded-br-[5px] bg-[#E0E0E0]"></div>
        </div>
        <div className="my-[30px]">
          <div className="grid grid-cols-[1fr_150px_1fr] leading-[20px]">
            <p>{changeDateFormat(data?.time, "yyyy-MM-dd HH:mm")}</p>
            <a
              href={getHref(matchType, topicName)}
              className="text-center underline underline-offset-2 hover:text-sec-color"
            >
              {data?.competition?.name_abbr}
            </a>
            <div className="flex items-center gap-x-[5px] justify-end">
              {(hasOvertime || hasPenalty) && (
                <div className="text-sec-color flex items-center gap-x-[8px] pr-[5px]">
                  {data?.overtime_session && (
                    <p className="text-[#888]">{`[加時 ${data?.home_overtime_score}–${data?.away_overtime_score}]`}</p>
                  )}
                  {data?.penalty_session && (
                    <p className="text-[#888]">{`[點球 ${data?.home_penalty_score}–${data?.away_penalty_score}]`}</p>
                  )}
                </div>
              )}

              <p
                className={`leading-[20px]  ${
                  state === "live" ? "text-[#EA4A50]" : state === "prelive" ? "text-pri-color" : "text-[#2F3035]"
                }`}
              >
                {getMatchStr(data.state)}
              </p>
              {data?.important && (
                <LazyImage
                  src="/images/hot-icon.png"
                  width={20}
                  height={20}
                  alt="熱"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-[1fr_150px_1fr] px-[150px] max12:px-[60px] items-center mt-[30px]">
            <div className="flex items-center gap-x-[10px]">
              <a
                {...leftHref}
                className={`hover:text-sec-color ${leftHref?.href ? "underline underline-offset-[3px]" : ""}`}
              >
                <p className="text-[16px] text-end truncate">{data?.HomeTeam?.name_abbr}</p>
              </a>
              <LazyImage
                width={40}
                height={40}
                src={data?.HomeTeam?.icon}
                alt={data?.HomeTeam?.name_abbr}
                className={` ${topicName === "ufc" ? "rounded-[5px] overflow-hidden" : "rounded-[10px]"}`}
              />
            </div>

            <div className="grid grid-cols-[1fr_50px_1fr] justify-center gap-[5px] text-[24px]">
              <p className={`text-end ${homeWin || isDraw ? "text-pri-color" : ""}`}>
                {state === "prelive" ? "" : data.home_score}
              </p>
              <p className="text-center">-</p>
              <p className={`text-start ${awayWin || isDraw ? "text-pri-color" : ""}`}>
                {state === "prelive" ? "" : data.away_score}
              </p>
            </div>

            <div className="flex items-center gap-x-[10px] justify-end">
              <LazyImage
                width={40}
                height={40}
                src={data?.AwayTeam?.icon}
                alt={data?.AwayTeam?.name_abbr}
                className={` ${topicName === "ufc" ? "rounded-[5px] overflow-hidden" : "rounded-[10px]"}`}
              />
              <a
                {...rightHref}
                className={`hover:text-sec-color ${rightHref?.href ? "underline underline-offset-[3px]" : ""}`}
              >
                <p className="text-[16px] truncate">{data?.AwayTeam?.name_abbr}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderPlayerWangqiu = (data) => {
    return (
      <div className="border border-solid border-border-color rounded-[10px] px-[20px]">
        <div className="grid w-full grid-cols-3">
          <div className="h-[5px] rounded-bl-[5px] bg-[#2F3035]"></div>
          <div className="h-[5px]  bg-[#D19F6C]"></div>
          <div className="h-[5px] rounded-br-[5px] bg-[#E0E0E0]"></div>
        </div>
        <div className="my-[30px]">
          <div className="grid grid-cols-[1fr_150px_1fr] leading-[20px]">
            <p>{changeDateFormat(data?.time, "yyyy-MM-dd HH:mm")}</p>
            <a
              href={topicName ? getBaseUrl(matchType, topicName) + "/" : "/" + matchType + "/"}
              className="text-center underline underline-offset-2 hover:text-sec-color"
            >
              {data?.competition?.gb}
            </a>
            <div className="flex items-center gap-x-[5px] justify-end">
              <p
                className={`leading-[20px]  ${
                  state === "live" ? "text-[#EA4A50]" : state === "prelive" ? "text-pri-color" : "text-[#2F3035]"
                }`}
              >
                {getMatchStr(data.state)}
              </p>
              {data?.important && (
                <LazyImage
                  src="/images/hot-icon.png"
                  width={20}
                  height={20}
                  alt="熱"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-[1fr_150px_1fr] max12:px-[60px] items-center mt-[30px]">
            <div className="flex items-center justify-end gap-x-[10px]">
              <div className="flex items-center gap-x-[10px]">
                <div className={`hover:text-sec-color `}>
                  <p className="text-[16px] w-[95px] text-end">{data?.PlayerA1?.name_f}</p>
                </div>
                <LazyImage
                  width={40}
                  height={40}
                  src={data?.PlayerA1?.photo}
                  alt={data?.PlayerA1?.name_f}
                  className={`rounded-[10px] overflow-hidden shrink-0`}
                />
              </div>
              {!data?.is_single && (
                <div className="flex items-center gap-x-[10px]">
                  <div className={`hover:text-sec-color`}>
                    <p className="text-[16px] w-[95px] text-end">{data?.PlayerA2?.name_f}</p>
                  </div>
                  <LazyImage
                    width={40}
                    height={40}
                    src={data?.PlayerA2?.photo}
                    alt={data?.PlayerA2?.name_f}
                    className={`overflow-hidden rounded-[10px] shrink-0`}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-[1fr_50px_1fr] justify-center gap-[5px] text-[24px]">
              <p className={`text-end ${homeWin || isDraw ? "text-pri-color" : ""}`}>
                {state === "prelive" ? "" : data.home_score}
              </p>
              <p className="text-center">-</p>
              <p className={`text-start ${awayWin || isDraw ? "text-pri-color" : ""}`}>
                {state === "prelive" ? "" : data.away_score}
              </p>
            </div>

            <div className="flex items-center gap-x-[10px]">
              <div className="flex items-center gap-x-[10px] justify-end">
                <LazyImage
                  width={40}
                  height={40}
                  src={data?.PlayerB1?.photo}
                  alt={data?.PlayerB1?.name_f}
                  className={`rounded-[10px] overflow-hidden shrink-0`}
                />
                <div className={`hover:text-sec-color`}>
                  <p className="text-[16px] w-[95px]">{data?.PlayerB1?.name_f}</p>
                </div>
              </div>
              {!data.is_single && (
                <div className="flex items-center gap-x-[10px] justify-end">
                  <LazyImage
                    width={40}
                    height={40}
                    src={data?.PlayerB2?.photo}
                    alt={data?.PlayerB2?.name_f}
                    className={`overflow-hidden rounded-[10px] shrink-0`}
                  />
                  <div className={`hover:text-sec-color `}>
                    <p className="text-[16px] w-[95px]">{data?.PlayerB2?.name_f}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return <div className="">{matchType === "wangqiu" ? renderPlayerWangqiu(data) : renderPlayerInfo(data)}</div>;
}
