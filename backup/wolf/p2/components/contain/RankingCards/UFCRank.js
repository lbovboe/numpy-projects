import React, { useState } from "react";
import LazyImage from "../../tools/lazy_image";
import { bodyStyles, headerStyles, Rank } from "./RankingContainer";
import Frame from "../../tools/Frame";

export default function UFCRank({ data, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    data && (
      <div>
        <Frame title={title} iconName="icon_ranking">
          <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px] w-max mb-[15px]">
            {["男子", "女子"].map((name, i) => (
              <button
                key={i}
                className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
                  activeIndex === i
                    ? "bg-bg-color text-pri-color"
                    : "text-white hover:bg-bg-color hover:text-pri-color"
                }`}
                onClick={() => setActiveIndex(i)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-y-[15px] mt-[15px]">
            {data?.[activeIndex]?.List?.map((ele, i) => (
              <div key={i}>
                <p className="rounded-[10px] bg-border-color px-[10px] py-[8px] text-[12px] text-pri-color">
                  {ele.type_name}
                </p>
                <div className="flex justify-between items-center rounded-[10px] border border-solid border-border-color hover:border-pri-color p-[15px] mt-[12px]">
                  <div className="flex items-center gap-x-[15px]">
                    <LazyImage
                      src={ele.Players[0].image}
                      width={50}
                      height={50}
                      alt=""
                      className="shrink-0 rounded-[5px] overflow-hidden"
                    />
                    <p className="text-[18px]">{ele.Players[0].name_cn}</p>
                  </div>
                  <div className="flex items-center gap-x-[10px]">
                    <LazyImage
                      src={"/images/icon_trophy.png"}
                      width={25}
                      height={25}
                      alt=""
                      className="shrink-0 rounded-[5px] overflow-hidden"
                    />
                    <span className="text-[18px]">冠軍</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 grid-flow-col grid-rows-5 gap-x-[18px] gap-y-[12px] mt-[15px]">
                  {ele.Players.map((v, i) => (
                    <React.Fragment key={i}>
                      {i == 0 ? (
                        <></>
                      ) : (
                        <div
                          className={`group grid grid-cols-[20px_1fr] items-center gap-x-[15px] min12:gap-x-[10px] hover:text-pri-color`}
                        >
                          <Rank i={i - 1} rank={i} />
                          <p className="text-[14px] truncate w-full leading-[20px]">
                            {v.name_cn}
                          </p>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Frame>
      </div>
    )
  );
}
