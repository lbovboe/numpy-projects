import { tableHeaderStyles } from "../details_content";
import React, { useState } from "react";
import Jersey from "./jersey";
import LazyImage from "../../../tools/lazy_image";
import { getEventIcon } from "../../../../public/scripts/publicFunction";

function breakUpFormation(val) {
  const number = Number(val);
  const digits = number.toString().split("");
  const separatedNumber = digits.join("-");
  return separatedNumber;
}

export default function LineUpTable({ data }) {
  const homeLineUp = data?.home_lineup;
  const awayLineUp = data?.away_lineup;
  let parsedLineUp = [];
  if (homeLineUp?.data && awayLineUp?.data) {
    let index = 0;
    for (const { LineUp } of homeLineUp.data) {
      for (const player of LineUp) {
        if (!parsedLineUp[index]) {
          parsedLineUp[index] = [];
        }
        parsedLineUp[index][0] = player;
        index += 1;
      }
    }
    index = 0;
    for (const { LineUp } of awayLineUp.data) {
      for (const player of LineUp) {
        if (!parsedLineUp[index]) {
          parsedLineUp[index] = [];
        }
        parsedLineUp[index][1] = player;
        index += 1;
      }
    }
  }
  let parsedBenchData = [],
    parsedInjuries = [];
  if (data?.home_bench && data?.away_bench) {
    let index = 0;
    for (const player of data?.home_bench) {
      if (!parsedBenchData[index]) {
        parsedBenchData[index] = [];
      }
      parsedBenchData[index][0] = player;
      index += 1;
    }
    index = 0;
    for (const player of data?.away_bench) {
      if (!parsedBenchData[index]) {
        parsedBenchData[index] = [];
      }
      parsedBenchData[index][1] = player;
      index += 1;
    }
  }
  if (data?.home_injuries || data?.away_injuries) {
   
    let index = 0;
    for (const player of data?.home_injuries) {
      if (!parsedInjuries[index]) {
        parsedInjuries[index] = [];
      }
      parsedInjuries[index][0] = player;
      index += 1;
    }
    index = 0;
    for (const player of data?.away_injuries) {
      if (!parsedInjuries[index]) {
        parsedInjuries[index] = [];
      }
      parsedInjuries[index][1] = player;
      index += 1;
    }
  }
  return (
    data && (
      <div className="">
        {(homeLineUp || awayLineUp || parsedInjuries || parsedBenchData) && (
          <>
            <>
              {parsedLineUp.length > 0 && (
                <div className={`grid grid-cols-[2fr_1fr_2fr] items-center ${tableHeaderStyles}`}>
                  <p className="text-start">{homeLineUp?.data && breakUpFormation(homeLineUp?.formation)}</p>
                  <p className="text-center text-[12px]">首發陣容</p>
                  <p className="text-end">{awayLineUp?.data && breakUpFormation(awayLineUp?.formation)}</p>
                </div>
              )}
              <div>
                {parsedLineUp.length > 0 &&
                  parsedLineUp.map(([home, away], i) => (
                    <div
                      key={i}
                      className="grid grid-cols-2 items-center border-b border-solid border-border-color last:border-none whitespace-nowrap h-[47px]"
                    >
                      <div className="flex items-center justify-between pl-[20px]">
                        <div className="flex items-center gap-[8px] text-[12px] ">
                          {home?.events &&
                            home?.events.map(
                              (val, idx) =>
                                val?.type !== "n" && (
                                  <div
                                    className="flex flex-col items-center gap-y-[2px]"
                                    key={idx}
                                  >
                                    <LazyImage
                                      src={getEventIcon(val?.type)}
                                      alt={val?.topic}
                                      width={15}
                                      height={15}
                                    />
                                    <p>{`${val?.time}'`}</p>
                                  </div>
                                )
                            )}
                        </div>
                        <div className="group flex items-center gap-x-[10px] justify-end pr-[10%] hover:text-sec-color">
                          <p className="text-[#7B00C7] group-hover:text-inherit">{home?.role_cn}</p>
                          <p className="">{home?.name}</p>
                          <Jersey
                            number={home?.number}
                            side="home"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between flex-row-reverse pr-[20px]">
                        <div className="flex items-center gap-[8px] text-[12px] ">
                          {away?.events &&
                            away?.events.map(
                              (val, idx) =>
                                val?.type !== "n" && (
                                  <div
                                    className="flex flex-col items-center gap-y-[2px]"
                                    key={idx}
                                  >
                                    <LazyImage
                                      src={getEventIcon(val?.type)}
                                      alt={val?.topic}
                                      width={15}
                                      height={15}
                                    />
                                    <p>{`${val?.time}'`}</p>
                                  </div>
                                )
                            )}
                        </div>
                        <div className="group flex items-center gap-x-[10px] justify-end flex-row-reverse pl-[10%] hover:text-sec-color">
                          <p className="text-[#C71800] group-hover:text-inherit">{away?.role_cn}</p>
                          <p className="">{away?.name}</p>
                          <Jersey
                            number={away?.number}
                            side="away"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {parsedBenchData.length > 0 && (
                <>
                  <div>
                    <div className={`grid ${tableHeaderStyles} text-[12px] rounded-[10px]`}>替補陣容</div>
                    {parsedBenchData.length > 0 &&
                      parsedBenchData.map(([home, away], i) => (
                        <div
                          key={i}
                          className="group grid grid-cols-2 items-center border-b border-solid border-border-color last:border-none text-center whitespace-nowrap h-[47px]"
                        >
                          <div className="flex items-center justify-between pl-[20px]">
                            <div className="flex items-center gap-[8px] text-[12px] ">
                              {home?.events &&
                                home?.events.map(
                                  (val, idx) =>
                                    val?.type !== "n" && (
                                      <div
                                        className="flex flex-col items-center gap-y-[2px]"
                                        key={idx}
                                      >
                                        <LazyImage
                                          src={getEventIcon(val?.type)}
                                          alt={val?.topic}
                                          width={15}
                                          height={15}
                                        />
                                        <p>{`${val?.time}'`}</p>
                                      </div>
                                    )
                                )}
                            </div>
                            <div className="group flex items-center gap-x-[10px] justify-end pr-[10%] hover:text-sec-color">
                              <p className="text-[#7B00C7] group-hover:text-inherit">{home?.role_cn}</p>
                              <p className="">{home?.name}</p>
                              <Jersey
                                number={home?.number}
                                side="home"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between flex-row-reverse pr-[20px]">
                            <div className="flex items-center gap-[8px] text-[12px] ">
                              {away?.events &&
                                away?.events.map(
                                  (val, idx) =>
                                    val?.type !== "n" && (
                                      <div
                                        className="flex flex-col items-center gap-y-[2px]"
                                        key={idx}
                                      >
                                        <LazyImage
                                          src={getEventIcon(val?.type)}
                                          alt={val?.topic}
                                          width={15}
                                          height={15}
                                        />
                                        <p>{`${val?.time}'`}</p>
                                      </div>
                                    )
                                )}
                            </div>
                            <div className="group flex items-center gap-x-[10px] justify-end flex-row-reverse pl-[10%] hover:text-sec-color">
                              <p className="text-[#C71800] group-hover:text-inherit">{away?.role_cn}</p>
                              <p className="">{away?.name}</p>
                              <Jersey
                                number={away?.number}
                                side="away"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
              {parsedInjuries?.length > 0 && (
                <div>
                  <div
                    className={`grid ${tableHeaderStyles} text-[12px] ${
                      parsedLineUp.length > 0 ? "rounded-[10px]" : ""
                    } `}
                  >
                    傷停訊息
                  </div>
                  {parsedInjuries.length > 0 &&
                    parsedInjuries.map(([home, away], i) => (
                      <div
                        key={i}
                        className="group grid grid-cols-2 items-center border-b border-solid border-border-color last:border-none text-center whitespace-nowrap h-[47px]"
                      >
                        <div className="flex justify-between items-center h-full">
                          {home && (
                            <>
                              <p className={`ml-[15px] ${home?.yellow_color ? "text-[#DFBA10]" : "text-[#D72027]"}`}>
                                {home?.reason}
                              </p>
                              <div className="flex items-center gap-x-[10px] justify-end pr-[10%] hover:text-sec-color">
                                <p className="text-[#888]">{home?.role_cn}</p>
                                <p className="">{home?.name}</p>
                                <Jersey
                                  number={home?.player_number}
                                  side="home"
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex justify-between items-center flex-row-reverse">
                          {away && (
                            <>
                              <p className={`mr-[15px] ${away?.yellow_color ? "text-[#DFBA10]" : "text-[#D72027]"}`}>
                                {away?.reason}
                              </p>
                              <div className="flex items-center gap-x-[10px] justify-end flex-row-reverse pl-[10%] hover:text-sec-color">
                                <p className="text-[#888]">{away?.role_cn}</p>
                                <p className="">{away?.name}</p>
                                <Jersey
                                  number={away?.player_number}
                                  side="away"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          </>
        )}
      </div>
    )
  );
}
