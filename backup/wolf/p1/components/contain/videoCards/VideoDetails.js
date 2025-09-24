import React from "react";
import {
  changeDateFormat,
  getMatchCls,
  getMatchStr,
  getNewsTitle,
} from "../../../public/scripts/publicFunction";
import LazyImage from "../../tools/lazy_image";
import LastUpdate from "../../tools/last_update";
import Frame from "../../tools/Frame";
import ArticleList from "../articleCards/ArticleList";
import { getDetails } from "../homeCards/HotMatches";
export default function VideoDetails({ data }) {
  const dataCard = data.data_card;

  return (
    data && (
      <div>
        <div className="rounded-[10px] border border-solid border-border-color p-[20px]">
          <h1 className="line-clamp-2 text-[22px]">
            {dataCard?.video_details?.title}
          </h1>
          <div className="flex items-center gap-x-[10px] mt-[10px]">
            <span className="text-pri-color">
              {getNewsTitle(dataCard.type)}
            </span>
            <span className="text-[#888]">
              {changeDateFormat(dataCard.updated_at, "yyyy-MM-dd HH:mm")}
            </span>
            <span className="text-[#888]">{dataCard.source || "網友提供"}</span>
          </div>
          <hr className="border-border-color mt-[15px] mb-[30px]" />
          <div className="mx-auto max-w-[650px] w-full mt-[30px]">
            <a
              className="group block relative h-[487px] rounded-[10px] overflow-hidden"
              href={dataCard?.video_details?.link}
              target="_blank"
            >
              <div className="absolute inset-0 m-auto w-[80px] h-[36px] rounded-[10px] flex items-center justify-center bg-white group-hover:text-sec-color">
                <p>立即觀看</p>
              </div>
              <LazyImage
                src={dataCard.image}
                width={"100%"}
                height={487}
                alt=""
                className="rounded-[5px] overflow-hidden"
              />
            </a>
          </div>
          {dataCard?.match && (
            <a
              target="_self"
              href={`/${dataCard.type}/${dataCard.match?.ID}.html`}
              className="block mt-[20px]"
            >
              <MatchCard m={dataCard.match} />
            </a>
          )}
        </div>
      </div>
    )
  );
}

const MatchCard = ({ m }) => {
  const state = getMatchCls(m.state);
  const homeWin = m.home_score > m.away_score;
  const awayWin = m.home_score < m.away_score;
  const isDraw = state !== "prelive" && m.home_score === m.away_score;
  return (
    <div className="group grid grid-cols-[6fr_1px_4fr] gap-x-[20px] items-center p-[20px] rounded-[10px] border border-solid border-border-color hover:border-sec-color text-[14px] whitespace-nowrap">
      <div className="relative flex flex-col justify-between gap-y-[10px]">
        <div className="absolute right-[80px] top-1/2 -translate-y-1/2 flex gap-x-[10px]">
          {m.overtime_session && (
            <p className="text-[#888]">{`[加時 ${m.home_overtime_score}–${m.away_overtime_score}]`}</p>
          )}
          {m.penalty_session && (
            <p className="text-[#888]">{`[點球 ${m.home_penalty_score}–${m.away_penalty_score}]`}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-[30px_1fr] gap-x-[5px] items-center">
            <LazyImage
              src={m.home_team_image || m?.HomeTeam?.icon}
              height={30}
              width={30}
              alt={m.home_team_name || m?.HomeTeam?.name}
            />
            <p className="text-end truncate leading-[20px]">
              {m.home_team_name || m?.HomeTeam?.name}
            </p>
          </div>
          <p
            className={`text-end text-[18px] ${
              homeWin || isDraw ? "text-pri-color" : ""
            }`}
          >
            {state === "prelive" ? "-" : m.home_score}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-[30px_1fr] gap-x-[5px] items-center">
            <LazyImage
              src={m.away_team_image || m?.AwayTeam?.icon}
              height={30}
              width={30}
              alt={m.away_team_name || m?.AwayTeam?.name}
            />
            <p className="truncate leading-[20px]">
              {m.away_team_name || m?.AwayTeam?.name}
            </p>
          </div>
          <p
            className={`text-end text-[18px] ${
              awayWin || isDraw ? "text-pri-color" : ""
            }`}
          >
            {state === "prelive" ? "-" : m.away_score}
          </p>
        </div>
      </div>
      <div className="w-[1px] h-full bg-border-color" />
      <div className="flex flex-col gap-y-[5px]">
        <div className="truncate">
          {m.competition_name || m?.competition?.name}
        </div>
        <div className="flex items-center justify-between">
          <p>{m?.time && changeDateFormat(m?.time, "yyyy-MM-dd HH:mm")}</p>
            <p className="underline underline-offset-2 group-hover:text-sec-color">視頻觀看</p>
        </div>

        <div className="flex items-center gap-x-[5px]">
          <p
            className={`leading-[20px] ${
              state === "live"
                ? "text-[#E32B2E]"
                : state === "prelive"
                ? "text-pri-color"
                : ""
            }`}
          >
            {getMatchStr(m.state)}
          </p>
          {m.important && (
            <LazyImage
              src="/images/hot-icon.png"
              width={20}
              height={20}
              alt="熱"
            />
          )}
        </div>
      </div>
    </div>
  );
};
