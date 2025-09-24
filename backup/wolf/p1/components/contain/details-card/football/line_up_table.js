import { getEventIcon } from "../../../../public/scripts/publicFunction";
import LazyImage from "../../../tools/lazy_image";
import { tableHeaderStyles } from "../details_content";
import React from "react";

function breakUpFormation(val) {
  const number = Number(val);
  const digits = number.toString().split("");
  const separatedNumber = digits.join("-");
  return separatedNumber;
}

export default function LineUpTable({ data, teamData }) {
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
  if (data?.home_injuries && data?.away_injuries) {
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
      <div className=" rounded-b-[10px]">
        {(homeLineUp || awayLineUp) && (
          <>
            <div className={`grid grid-cols-[1fr_60px_1fr] items-center ${tableHeaderStyles} text-[12px] rounded-[10px]`}>
              <p className="text-start">{homeLineUp?.data && breakUpFormation(homeLineUp?.formation)}</p>
              <p className="text-center text-[12px] leading-[17px]">首發陣容</p>
              <p className="text-end">{awayLineUp?.data && breakUpFormation(awayLineUp?.formation)}</p>
            </div>
            <div className="">
              {parsedLineUp.length > 0 &&
                parsedLineUp.map(([home, away], i) => (
                  <div
                    key={i}
                    className="group grid grid-cols-2 items-center border-b border-solid border-border-color last:border-none whitespace-nowrap h-[47px] group px-[15px]"
                  >
                    <div className="flex justify-between items-center h-full pr-[74px]">
                      <div className="flex items-center gap-[8px] text-[12px] flex-row-reverse">
                        {home?.events &&
                          home?.events.map(
                            (val, idx) =>
                              getEventIcon(val?.type) !== "n" && (
                                <div className="flex flex-col items-center gap-y-[2px]" key={idx}>
                                  <LazyImage src={getEventIcon(val?.type)} alt={val?.topic} width={15} height={15} />
                                  <p>{`${val?.time}'`}</p>
                                </div>
                              )
                          )}
                      </div>
                      <div className="flex items-center gap-x-[5px]">
                        <p className="text-[#818AB6] ">{home?.role_cn}</p>
                        <p className="group-hover:text-sec-color">{home?.name}</p>
                        <div className="flex items-center justify-center bg-[#818AB6] rounded-[10px] h-[23px] w-[29px] text-white">
                          {home?.number}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pl-[74px]">
                      <div className="flex items-center gap-x-[5px]">
                        <div className="flex items-center justify-center bg-[#D19F6C] rounded-[10px] h-[23px] w-[29px] text-white">
                          {away?.number}
                        </div>
                        <p className="group-hover:text-sec-color">{away?.name}</p>
                        <p className="text-[#D19F6C] ">{away?.role_cn}</p>
                      </div>
                      <div className="flex items-center gap-[8px] text-[12px] flex-row-reverse">
                        {away?.events &&
                          away?.events.map(
                            (val, idx) =>
                              getEventIcon(val?.type) !== "n" && (
                                <div className="flex flex-col items-center gap-y-[2px]" key={idx}>
                                  <LazyImage src={getEventIcon(val?.type)} alt={val?.topic} width={15} height={15} />
                                  <p>{`${val?.time}'`}</p>
                                </div>
                              )
                          )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
        {parsedBenchData.length > 0 && (
          <>
            <div>
              <div className={`grid ${tableHeaderStyles} text-[12px] rounded-[10px]`}>替補陣容</div>
              <div className="">
                {parsedBenchData.length > 0 &&
                  parsedBenchData.map(([home, away], i) => (
                    <div
                      key={i}
                      className="group grid grid-cols-2 items-center border-b border-solid border-border-color last:border-none text-center whitespace-nowrap h-[47px] group px-[15px]"
                    >
                      <div className="flex items-center justify-end gap-x-[5px] pr-[74px]">
                        <p className="text-[#818AB6] ">{home?.role_cn || home?.position}</p>
                        <p className="group-hover:text-sec-color">{home?.name}</p>
                        <div className="flex items-center justify-center bg-[#818AB6] rounded-[10px] h-[23px] w-[29px] text-white">
                          {home?.number}
                        </div>
                      </div>
                      <div className="flex items-center gap-x-[5px] pl-[74px]">
                        <div className="flex items-center justify-center bg-[#D19F6C] rounded-[10px] h-[23px] w-[29px] text-white">
                          {away?.number}
                        </div>
                        <p className="group-hover:text-sec-color">{away?.name}</p>
                        <p className="text-[#D19F6C] ">{away?.role_cn || away?.position}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
        {parsedInjuries?.length > 0 && (
          <div>
            <div className={`grid ${tableHeaderStyles} text-[12px] rounded-[10px]`}>傷停訊息</div>
            <div className="">
              {parsedInjuries.length > 0 &&
                parsedInjuries.map(([home, away], i) => (
                  <div
                    key={i}
                    className="group grid grid-cols-2 items-center border-b border-solid border-border-color last:border-none text-center whitespace-nowra px-[15px] h-[47px] max12:px-[20px] group"
                  >
                    <div className="flex justify-between items-center h-full pr-[74px]">
                      {home && (
                        <>
                          <p className={`truncate ${home?.yellow_color ? "text-[#EEC21E]" : "text-[#E32B2E]"}`}>{home?.reason}</p>
                          <div className="flex items-center gap-x-[5px]">
                            <p className="truncate group-hover:text-sec-color">{home?.name}</p>
                            <div className="flex items-center justify-center bg-[#818AB6] rounded-[10px] h-[23px] w-[29px] text-white">
                              {home?.player_number}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex justify-between items-center pl-[74px] ">
                      {away && (
                        <>
                          <div className="flex items-center gap-x-[5px]">
                            <div className="flex items-center justify-center bg-[#D19F6C] rounded-[10px] h-[23px] w-[29px] text-white">
                              {away?.player_number}
                            </div>
                            <p className="truncate group-hover:text-sec-color">{away?.name}</p>
                          </div>

                          <p className={`truncate ${away?.yellow_color ? "text-[#EEC21E]" : "text-[#E32B2E]"}`}>{away?.reason}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    )
  );
}
