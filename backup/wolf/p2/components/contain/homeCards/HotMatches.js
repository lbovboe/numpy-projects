import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import React from "react";
import { useState, useRef } from "react";
import { getMatchCls, changeDateFormat, getMatchStr, recordStream } from "../../../public/scripts/publicFunction";
import LazyImage from "../../tools/lazy_image";
import Frame from "../../tools/Frame";

export default function HotMatches({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <Frame
      title="熱門賽事"
      iconName="icon_match"
      isSwiper={true}
      options={
        <div className="flex items-center overflow-hidden pl-[20px] ">
          <Swiper
            spaceBetween={0}
            ref={swiperRef}
            slidesPerView={"auto"}
            className="!mr-0 !ml-0"
          >
            {data.map((v, i) => (
              <SwiperSlide
                key={i}
                className={`cursor-pointer !w-fit`}
              >
                <div
                  className={`h-[30px] rounded-[10px] flex items-center justify-center group text-pri-color `}
                  onClick={() => setActiveIndex(i)}
                >
                  <span className={`${activeIndex === i ? "font-semibold " : "hover:font-semibold"}`}>{v.title}</span>
                  {i !== data?.length - 1 && <span className="px-[14px]">/</span>}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      }
    >
      <div className="mt-[20px]">
        {data &&
          data?.map((v, i) => (
            <div
              key={`ml-t-${i}`}
              className={`space-y-[13px] ${activeIndex == i ? `` : `hidden`}`}
            >
              {v.group?.map((ele, i) => (
                <div
                  key={i}
                  className="space-y-[13px]"
                >
                  {ele.matches &&
                    ele.matches.map((match, i) => (
                      <Match
                        match={match}
                        key={i}
                      />
                    ))}
                </div>
              ))}
            </div>
          ))}
      </div>
      <div className="flex w-full justify-center mt-[20px]">
        <a
          href={
            data?.[activeIndex]?.match_type == "all"
              ? "/all/"
              : `/${data?.[activeIndex]?.match_type}/${data?.[activeIndex]?.topic_name}/`
          }
          className="group flex items-center justify-center h-[36px] bg-bg-color hover:bg-pri-color rounded-[10px] hover:text-white w-[157px]"
        >
          <p className="">{`更多${data?.[activeIndex]?.title}賽事`} </p>
        </a>
      </div>
    </Frame>
  );
}
export const Match = ({ match }) => {
  return (
    <a
      className="block rounded-[15px]"
      href={`/${match.match_type}/${match.id}.html`}
    >
      <MatchDetails match={match} />
    </a>
  );
};

const MatchDetails = ({ match: m }) => {
  const state = getMatchCls(m.state);
  const [isStreamsHovered, setIsStreamsHovered] = useState(false);

  return (
    <div
      className={`grid grid-cols-[2fr_1fr] items-center border border-solid border-border-color rounded-[10px] bg-white ${
        !isStreamsHovered ? "hover:border-pri-color" : ""
      }`}
    >
      <div className="group cursor-pointer">{getDetails(m)}</div>
      <div
        className="z-10"
        onMouseEnter={() => setIsStreamsHovered(true)}
        onMouseLeave={() => setIsStreamsHovered(false)}
      >
        <Streams match_details={m} />
      </div>
    </div>
  );
};

const getDetails = (m) => {
  const state = getMatchCls(m.state);
  const homeWin = parseInt(m.home_score) > parseInt(m.away_score);
  const awayWin = parseInt(m.home_score) < parseInt(m.away_score);
  const draw = state !== "prelive" && m.home_score == m.away_score;
  const roundCorners = !["zuqiu", "lanqiu"].includes(m.match_type);

  return (
    <div className="relative group grid grid-cols-[1fr_3fr_1px]">
      <div className="flex flex-col justify-center py-[19px]">
        <div className="border-r border-solid  border-border-color px-[30px] flex flex-col justify-center  h-[53px] gap-[5px]">
          <div className="flex justify-between leading-[20px] ">
            <p className="truncate font-semibold">{m.match_name || m.competition_name}</p>
            {m.important && (
              <LazyImage
                src="/images/hot_icon.png"
                width={20}
                height={20}
                alt="hot"
                className=""
              />
            )}
          </div>
          <div className="flex justify-between mt-[5px] whitespace-nowrap leading-[20px]">
            <p
              className={`${
                state === "live" ? "text-[#E32B2E]" : state === "prelive" ? "text-pri-color" : "text-[#888888]"
              }`}
            >
              {getMatchStr(m.state)}
            </p>
            <p className="ml-[8px]">{changeDateFormat(m.time, "HH:mm MM-dd")}</p>
          </div>
        </div>
      </div>
      <div className="relative grid grid-cols-[1fr_100px_1fr] items-center gap-x-[10px]  px-[30px]">
        <div className="flex leading-[24px] items-center justify-center gap-x-[10px]">
          <p className="truncate w-[140px] max12:w-[60px] text-right group-hover:text-pri-color">
            {m.home_team_name || m.player_a1}
          </p>
          <div className="flex justify-center ">
            <LazyImage
              src={m.home_team_image || m.photo_a1}
              height={24}
              width={24}
              className={`shrink-0 overflow-hidden ${roundCorners ? "rounded-[10px]" : ""}`}
            />
          </div>
        </div>
        <div className="flex items-center justify-center  bg-border-color h-full text-[16px] text-[#325253]">
          {state === "prelive" ? (
            "–"
          ) : (
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-[10px]">
              <p className={`text-end ${homeWin || draw ? "" : ""}`}>{m.state === 0 ? "–" : m.home_score}</p>
              <span>–</span>
              <p className={`${awayWin || draw ? "" : ""}`}>{m.state === 0 ? "–" : m.away_score}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center leading-[24px] gap-x-[10px]">
          <div className="flex justify-center gap-x-[10px]">
            <LazyImage
              src={m.away_team_image || m.photo_b1}
              height={24}
              width={24}
              className={`shrink-0 overflow-hidden ${roundCorners ? "rounded-[10px]" : ""}`}
            />
          </div>
          <p className="truncate group-hover:text-pri-color w-[140px] max12:w-[60px]">
            {m.away_team_name || m.player_b1}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="h-[53px] w-[1px] bg-border-color"></div>
      </div>
    </div>
  );
};
const Streams = ({ match_details }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex items-center px-[30px]">
      {getMatchCls(match_details?.state) === "end" ? (
        <div className={`underline underline-offset-2 hover:text-pri-color cursor-pointer`}>集锦</div>
      ) : (
        <div className="flex  justify-between items-center w-full gap-[10px] leading-[20px]">
          <div className="flex flex-wrap items-center h-full gap-x-[10px] gap-y-[6px]">
            {match_details?.match_lives?.on_display &&
              match_details?.match_lives?.on_display.map((stream, i) => (
                <div
                  key={`${stream.ID}-${i}`}
                  className={`underline underline-offset-2 hover:no-underline cursor-pointer`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    recordStream(stream.match_id, stream.ID, stream.link, stream.match_type, stream.vendor_id);
                  }}
                  title={stream.title}
                >
                  {stream.title}
                </div>
              ))}
            {match_details?.match_lives?.more &&
              match_details?.match_lives?.more.map((stream, i) => (
                <div
                  key={`${stream.ID}-${i}`}
                  className={`underline underline-offset-2 hover:no-underline cursor-pointer ${
                    showMore ? "" : "hidden"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    recordStream(stream.match_id, stream.ID, stream.link, stream.match_type, stream.vendor_id);
                  }}
                  title={stream.title}
                >
                  {stream.title}
                </div>
              ))}
          </div>

          <div>
            {getMatchCls(match_details?.state) !== "end" &&
              match_details?.match_lives?.more &&
              match_details?.match_lives?.more?.length > 0 && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMore(!showMore);
                  }}
                  className="flex items-center justify-center group rounded-full w-[12px] h-[12px] border border-solid border-pri-color hover:bg-pri-color fill-pri-color hover:fill-white cursor-pointer"
                >
                  <svg
                    width={12}
                    height={12}
                    className={`${showMore ? "-rotate-90" : "rotate-90"} group-hover:fill-white]`}
                  >
                    <use href="#icon-arrow"></use>
                  </svg>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};
