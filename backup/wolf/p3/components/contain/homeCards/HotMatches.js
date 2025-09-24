import { useState } from "react";
import {
  getMatchStr,
  getMatchCls,
  recordStream,
  changeDateFormat,
} from "../../../public/scripts/publicFunction";
import LazyImage from "../../tools/lazy_image";
import React from "react";
import "swiper/swiper-bundle.min.css";
import FrameOptions from "../../tools/FrameOptions";
export default function HotMatches({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="">
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-[15px] bg-white rounded-[10px]">
        <FrameOptions
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          list={data.map((ele) => ele.title)}
        />
        <a
          href={
            data?.[activeIndex]?.topic_name == "all"
              ? `/all/`
              : `/` +
                data?.[activeIndex]?.match_type +
                `/` +
                data?.[activeIndex]?.topic_name +
                "/"
          }
          className="group flex items-center justify-center h-[36px] w-[98px] rounded-[10px] bg-pri-color hover:bg-sec-color text-white"
        >
          <p className="truncate">更多賽事</p>
          <svg
            width={11}
            height={10}
            className="fill-white stroke-white ml-[3px]"
          >
            <use href="#arrow-right"></use>
          </svg>
        </a>
      </div>
      <div className="mt-[15px] flex flex-col gap-y-[12px]">
        {data?.[activeIndex]?.matches &&
          data?.[activeIndex]?.matches.map((match_details, mIdx) =>
            getMatchCls(match_details?.state) == "end" ? (
              <a
                className=""
                target="_self"
                href={`/${match_details?.match_type}/${match_details?.id}.html`}
                data-id={match_details?.id}
                data-type={match_details?.match_type}
                key={mIdx}
              >
                <MatchDetails
                  key={mIdx}
                  match_details={match_details}
                  state={getMatchCls(match_details?.state)}
                  hasBorder={mIdx !== data?.[activeIndex]?.matches?.length - 1}
                />
              </a>
            ) : (
              <MatchDetails
                key={mIdx}
                match_details={match_details}
                state={getMatchCls(match_details?.state)}
                hasBorder={mIdx !== data?.[activeIndex]?.matches?.length - 1}
              />
            )
          )}
      </div>
    </div>
  );
}
export const getDetails = (match, state) => {
  const homeWin = match.home_score > match.away_score;
  const awayWin = match.home_score < match.away_score;
  const isDraw = state !== "prelive" && match.home_score === match.away_score;
  return (
    <div className="relative">
      <div className="grid grid-cols-[145px_1fr_84px] items-center text-[14px] whitespace-nowrap">
        <div className="flex flex-col justify-between gap-y-[10px] py-[20px] pr-[20px] border-r border-solid border-border-color">
          <div className="flex items-center justify-between">
            <p className="truncate max-w-[100px]">
              {match.competition_name || match?.competition?.name}
            </p>
            {match.important && (
              <svg width={20} height={20} className={`fill-[#E32B2E]`}>
                <use href="#icon-hot"></use>
              </svg>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p>
              {match?.time && changeDateFormat(match?.time, "yyyy-MM-dd HH:mm")}
            </p>
          </div>
        </div>
        <div className="relative flex flex-col gap-[12px] justify-between px-[20px] py-[15px]">
          <div className="absolute left-[55%] -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-x-[10px] text-[#888]">
            {match.overtime_session && (
              <p className="text-[#888]">{`加時 [${match.home_overtime_score} : ${match.away_overtime_score}]`}</p>
            )}
            {match.penalty_session && (
              <p className="text-[#888]">{`點球 [${match.home_penalty_score} : ${match.away_penalty_score}]`}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-[24px_1fr] gap-x-[6px] items-center">
              <LazyImage
                src={match.home_team_image || match?.HomeTeam?.icon}
                height={24}
                width={24}
                alt={match.home_team_name || match?.HomeTeam?.name}
              />
              <p className="text-end truncate leading-[20px] font-semibold max-w-[200px]">
                {match.home_team_name || match?.HomeTeam?.name}
              </p>
            </div>
            <p
              className={`text-end text-[16px] ${
                homeWin || isDraw ? "text-pri-color" : ""
              }`}
            >
              {state === "prelive" ? "-" : match.home_score}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-[24px_1fr] gap-x-[6px] items-center">
              <LazyImage
                src={match.away_team_image || match?.AwayTeam?.icon}
                height={24}
                width={24}
                alt={match.away_team_name || match?.AwayTeam?.name}
              />
              <p className="truncate leading-[20px] font-semibold max-w-[200px]">
                {match.away_team_name || match?.AwayTeam?.name}
              </p>
            </div>
            <p
              className={`text-end text-[16px] ${
                awayWin || isDraw ? "text-pri-color" : ""
              }`}
            >
              {state === "prelive" ? "-" : match.away_score}
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
            {getMatchStr(match.state)}
          </p>
        </div>
      </div>
    </div>
  );
};
const MatchDetails = ({ match_details: match, state }) => {
  return (
    <div className="grid grid-cols-[6.5fr_3.5fr] items-center rounded-[10px] border border-solid border-border-color px-[20px] hover:border-sec-color">
      {state === "end" ? (
        <>
          {getDetails(match, state)}
          <Streams match_details={match} />
        </>
      ) : (
        <>
          <a target="_self" href={`/${match?.match_type}/${match?.id}.html`}>
            {getDetails(match, state)}
          </a>
          <Streams match_details={match} />
        </>
      )}
    </div>
  );
};

const Streams = ({ match_details }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex items-center pl-[20px] border-l border-solid border-border-color h-full">
      {getMatchCls(match_details?.state) === "end" ? (
        <div
          className={`underline underline-offset-2 hover:text-sec-color cursor-pointer`}
        >
          集锦
        </div>
      ) : (
        <div className="flex items-center justify-between w-full gap-x-[10px]">
          <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[10px]">
            {match_details?.match_lives?.on_display &&
              match_details?.match_lives?.on_display.map((stream, i) => (
                <div
                  key={`${stream.ID}-${i}`}
                  className={`underline underline-offset-2 hover:text-sec-color cursor-pointer`}
                  onClick={() =>
                    recordStream(
                      stream.match_id,
                      stream.ID,
                      stream.link,
                      stream.match_type,
                      stream.vendor_id
                    )
                  }
                  title={stream.title}
                >
                  {stream.title}
                </div>
              ))}
            {match_details?.match_lives?.more &&
              match_details?.match_lives?.more.map((stream, i) => (
                <div
                  key={`${stream.ID}-${i}`}
                  className={`underline underline-offset-2 hover:text-sec-color cursor-pointer ${
                    showMore ? "" : "hidden"
                  }`}
                  onClick={() =>
                    recordStream(
                      stream.match_id,
                      stream.ID,
                      stream.link,
                      stream.match_type,
                      stream.vendor_id
                    )
                  }
                  title={stream.title}
                >
                  {stream.title}
                </div>
              ))}
          </div>

          {getMatchCls(match_details?.state) !== "end" &&
            match_details?.match_lives?.more &&
            match_details?.match_lives?.more?.length > 0 && (
              <div
                className={`group flex items-center gap-x-[5px] hover:text-sec-color cursor-pointer shrink-0`}
                onClick={() => setShowMore(!showMore)}
              >
                <p>{!showMore ? `更多` : `收起`}</p>
                <svg
                  width={12}
                  height={12}
                  className={`fill-text-color stroke-text-color group-hover:fill-sec-color group-hover:stroke-sec-color ${
                    showMore ? "rotate-180" : ""
                  }`}
                >
                  <use href="#icon-arrow-sm" />
                </svg>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
