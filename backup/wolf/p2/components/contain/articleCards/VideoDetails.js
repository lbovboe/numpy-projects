import React, { useEffect, useState } from "react";
import { changeDateFormat, getMatchCls, getMatchStr } from "../../../public/scripts/publicFunction";
import LazyImage from "../../tools/lazy_image";
import ArticleSlider from "./ArticleSlider";
export default function VideoDetails({ data }) {
  const dataCard = data?.data_card;
  const [sliderData, setSliderData] = useState([]);
  useEffect(() => {
    if (dataCard?.related_video) {
      const index = dataCard?.related_video.findIndex((video) => video.ID === dataCard?.video_details?.ID);
      const slider = [];
      if (index > 0) {
        const prev = dataCard?.related_video[index - 1];
        slider.push({
          mode: "prev",
          title: prev.title,
          article_id: prev.article_id,
          video_id: prev.ID,
          image: prev.image,
          important: dataCard?.match?.important || "false",
          source: prev.source,
          published_at: prev.created_at,
        });
      }
      if (index < dataCard?.related_video.length - 1) {
        const next = dataCard?.related_video[index + 1];
        slider.push({
          mode: "next",
          title: next.title,
          article_id: next.article_id,
          video_id: next.ID,
          image: next.image,
          important: dataCard?.match?.important || "false",
          source: next.source,
          published_at: next.created_at,
        });
      }
      setSliderData(slider);
    }
  }, [dataCard]);
  return (
    data && (
      <>
        <div className="bg-white rounded-[10px] p-[20px] mt-[30px]">
          <div className="flex flex-col gap-y-[12px]">
            <div className="text-[20px] leading-[40px] line-clamp-2">{dataCard?.video_details?.title}</div>

            <div className="flex items-center gap-x-[15px] text-[12px] justify-center">
              <p className="truncate bg-border-color py-[4px] text-pri-color text-center rounded-[8px] text-[12px] px-[12px]">
                來源： {dataCard.source || "網友提供"}
              </p>
              <div className="flex items-center gap-x-[4px] leading-[17px]">
                <div className="h-[17px] w-[17px]">
                  <LazyImage src={"/images/calendar-icon.png"} width={17} height={17}></LazyImage>
                </div>
                <p className="truncate text-[12px]">{changeDateFormat(dataCard.updated_at, "yyyy-MM-dd")}</p>
              </div>
            </div>
          </div>
          <hr className="border-border-color mt-[20px] mb-[30px]" />
          <div className="mx-auto w-[650px] mt-[20px]">
            <a
              className="block relative h-[487px] hover:brightness-50 rounded-[5px] overflow-hidden"
              href={dataCard?.video_details?.link}
              target="_blank"
            >
              <svg width={40} height={40} className={`absolute inset-0 m-auto fill-white group-hover:fill-sec-color`}>
                <use href="#play-icon"></use>
              </svg>
              <LazyImage src={dataCard.image} width={650} height={487} alt="" className="rounded-[5px] overflow-hidden" />
            </a>
          </div>

          {dataCard?.match && (
            <a
              href={`/${dataCard.type}/${dataCard.match?.ID}.html`}
              className="mt-[20px] mx-auto w-[750px] max12:w-full relative group grid grid-cols-[6.5fr_110px_3.5fr] items-center rounded-[10px] border border-solid border-border-color hover:border-pri-color"
            >
              {(() => {
                const m = dataCard.match;
                const state = getMatchCls(m.state);
                const homeWin = m.home_score > m.away_score;
                const awayWin = m.home_score < m.away_score;
                const draw = state !== "prelive" && m.home_score == m.away_score;
                const hasOvertime = Boolean(m?.home_overtime_score || m?.away_overtime_score);
                const hasPenalty = Boolean(m?.home_penalty_score || m?.away_penalty_score);
                const roundCorners = !["zuqiu", "lanqiu"].includes(m.match_type);

                return (
                  <>
                    <div className="grid grid-cols-[0.9fr_1px_1fr] items-center gap-x-[30px] pl-[30px] pr-[20px] py-[15px]">
                      <div className="">
                        <div className="flex justify-between">
                          <p className="font-semibold truncate">{m?.competition?.name_abbr || m?.competition?.name}</p>
                          {m.important && <LazyImage src="/images/hot_icon.png" width={20} height={20} alt="hot" className="" />}
                        </div>
                        <div className="flex justify-between mt-[5px] whitespace-nowrap">
                          <p className={`${state === "live" ? "text-[#E32B2E]" : state === "prelive" ? "text-pri-color" : "text-[#888888]"}`}>
                            {getMatchStr(m.state)}
                          </p>
                          <p className="ml-[8px]">{changeDateFormat(m.time, "HH:mm MM-dd")}</p>
                        </div>
                      </div>
                      <div className="w-[1px] h-[53px] bg-border-color" />
                      <div>
                        <div className="flex gap-x-[10px]">
                          <p className="w-full truncate text-end"> {m?.home_team_name || m?.HomeTeam?.name}</p>
                          <LazyImage
                            src={m?.home_team_image || m?.HomeTeam?.icon}
                            height={24}
                            width={24}
                            className={`shrink-0 overflow-hidden ${roundCorners ? "rounded-[5px]" : ""}`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center h-full bg-border-color text-[16px] text-pri-color">
                      {state === "prelive" ? (
                        "–"
                      ) : (
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-[10px]">
                          <p className={`text-end ${homeWin || draw ? "" : ""}`}>{m.state === 0 ? "–" : m.home_score}</p>
                          <span>–</span>
                          <p className={`${awayWin || draw ? "" : ""}`}>{m.state === 0 ? "–" : m.away_score}</p>
                        </div>
                      )}
                      {hasPenalty && (
                        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 text-[12px]">
                          (點球&nbsp;
                          <span>{m.home_penalty_score}</span>-<span>{m.away_penalty_score}</span>)
                        </div>
                      )}
                      {hasOvertime && (
                        <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 text-[12px]">
                          (加時&nbsp;
                          <span>{m.home_overtime_score}</span>-<span>{m.away_overtime_score}</span>)
                        </div>
                      )}
                    </div>
                    <div className="pl-[20px] pr-[26px]">
                      <div className="flex gap-x-[10px]">
                        <LazyImage
                          src={m?.away_team_image || m?.AwayTeam?.icon}
                          height={24}
                          width={24}
                          className={`shrink-0 overflow-hidden ${roundCorners ? "rounded-[5px]" : ""}`}
                        />
                        <p className="w-full truncate">{m.away_team_name || m?.AwayTeam?.name}</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </a>
          )}
          <ArticleSlider data={sliderData}></ArticleSlider>
        </div>
      </>
    )
  );
}
