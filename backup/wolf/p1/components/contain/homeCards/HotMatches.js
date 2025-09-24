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
import { Swiper, SwiperSlide } from "swiper/react";
export default function HotMatches({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="">
      <div className="grid grid-cols-[1fr_auto] gap-x-[15px] bg-white rounded-[10px]">
        <Slider
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          list={data}
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
          className="group flex items-center justify-end gap-x-[5px] hover:text-sec-color"
        >
          <svg
            width={12}
            height={12}
            className="fill-text-color group-hover:fill-sec-color"
          >
            <use href="#icon-more"></use>
          </svg>
          <p className="truncate">更多{data?.[activeIndex]?.title}賽事</p>
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
export const getDetails = (match, state, hasStream = true, matchType) => {
  const homeWin = match.home_score > match.away_score;
  const awayWin = match.home_score < match.away_score;
  const isDraw = state !== "prelive" && match.home_score === match.away_score;
  return (
    <div className="relative">
      <div className="grid grid-cols-[1fr_1px_1.3fr] gap-x-[20px] items-center text-[14px] whitespace-nowrap">
        <div className="flex flex-col justify-between gap-y-[10px]">
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-[30px_1fr] gap-x-[5px] items-center">
              <LazyImage
                src={match.home_team_image || match?.HomeTeam?.icon}
                height={30}
                width={30}
                alt={match.home_team_name || match?.HomeTeam?.name}
              />
              <p className="text-end truncate leading-[20px]">
                {match.home_team_name || match?.HomeTeam?.name}
              </p>
            </div>
            <p
              className={`text-end text-[18px] ${
                homeWin || isDraw ? "text-pri-color" : ""
              }`}
            >
              {state === "prelive" ? "-" : match.home_score}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-[30px_1fr] gap-x-[5px] items-center">
              <LazyImage
                src={match.away_team_image || match?.AwayTeam?.icon}
                height={30}
                width={30}
                alt={match.away_team_name || match?.AwayTeam?.name}
              />
              <p className="truncate leading-[20px]">
                {match.away_team_name || match?.AwayTeam?.name}
              </p>
            </div>
            <p
              className={`text-end text-[18px] ${
                awayWin || isDraw ? "text-pri-color" : ""
              }`}
            >
              {state === "prelive" ? "-" : match.away_score}
            </p>
          </div>
        </div>
        <div className="w-[1px] h-full bg-border-color" />
        <div className="flex flex-col gap-y-[5px]">
          <div className="truncate">
            {match.competition_name || match?.competition?.name}
          </div>
          <div className="flex items-center justify-between">
            <p>
              {match?.time && changeDateFormat(match?.time, "yyyy-MM-dd HH:mm")}
            </p>
            <div className="flex gap-x-[10px]">
              {match.overtime_session && (
                <p className="text-[#888]">{`[加時 ${match.home_overtime_score}–${match.away_overtime_score}]`}</p>
              )}
              {match.penalty_session && (
                <p className="text-[#888]">{`[點球 ${match.home_penalty_score}–${match.away_penalty_score}]`}</p>
              )}
            </div>
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
              {getMatchStr(match.state)}
            </p>
            {match.important && (
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
    </div>
  );
};
const MatchDetails = ({ match_details: match, state }) => {
  return (
    <div className="grid grid-cols-[2fr_1fr] items-center rounded-[10px] border border-solid border-border-color p-[20px] hover:border-sec-color">
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
    <div className="flex items-center ml-[20px]">
      {getMatchCls(match_details?.state) === "end" ? (
        <div
          className={`underline underline-offset-2 hover:text-ter-color cursor-pointer`}
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
                className={`self-start flex items-center gap-x-[5px] group hover:text-sec-color cursor-pointer shrink-0`}
                onClick={() => setShowMore(!showMore)}
              >
                <svg
                  width={12}
                  height={12}
                  className={`fill-text-color group-hover:fill-sec-color ${
                    showMore ? "-rotate-90" : "rotate-90"
                  }`}
                >
                  <use href="#icon-more" />
                </svg>
                <p>{!showMore ? `展开` : `收起`}</p>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

function Slider({ list, activeIndex, setActiveIndex }) {
  return (
    <div className="overflow-hidden">
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        className="border-r border-solid border-text-color"
      >
        {list?.map((ele, i) => {
          return (
            <SwiperSlide key={i} className="cursor-pointer !w-fit">
              <div
                key={i}
                className="relative flex items-center whitespace-nowrap"
              >
                <div
                  onClick={() => setActiveIndex(i)}
                  className={`flex items-center px-[10px] h-[30px] rounded-[10px] border border-solid ${
                    i === activeIndex
                      ? "bg-pri-color text-white border-transparent"
                      : "hover:border-sec-color hover:text-sec-color border-border-color"
                  }`}
                >
                  {ele?.title}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
