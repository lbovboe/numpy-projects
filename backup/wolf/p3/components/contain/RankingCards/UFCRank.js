import React, { useState } from "react";
import LazyImage from "../../tools/lazy_image";
import { bodyStyles, headerStyles, Rank } from "./RankingContainer";
import Frame from "../../tools/Frame";
import FrameOptions from "../../tools/FrameOptions";

export default function UFCRank({ data, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  return (
    data && (
      <div>
        <Frame
          title={title}
          options={
            <div className="flex">
              {["男子", "女子"].map((name, i) => (
                <div
                  key={i}
                  className={`${
                    i > 0
                      ? "border-l border-solid border-border-color pl-[20px]"
                      : "pr-[20px]"
                  }`}
                >
                  <button
                    className={`${
                      activeIndex === i
                        ? "text-sec-color"
                        : "text-pri-color hover:text-sec-color"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  >
                    {name}
                  </button>
                </div>
              ))}
            </div>
          }
        >
          <FrameOptions
            className="py-[4px]"
            list={data?.[activeIndex]?.List?.map((ele) => ele.type_name)}
            activeIndex={subIndex}
            setActiveIndex={setSubIndex}
          />
          <div
            className={`rounded-[10px] border border-solid border-border-color mt-[12px] overflow-hidden`}
          >
            <div className={`${headerStyles}`}>
              {data?.[activeIndex]?.List?.[subIndex]?.type_name}
            </div>
            <div className="">
              {data?.[activeIndex]?.List?.[subIndex]?.Players.map((ele, i) =>
                i === 0 ? (
                  <div
                    key={i}
                    className="grid grid-cols-[50px_1px_1fr] gap-x-[20px] p-[12px] border-b border-solid border-border-color"
                  >
                    <LazyImage
                      src={ele.image}
                      width={50}
                      height={50}
                      alt={""}
                      className="rounded-[10px] overflow-hidden"
                    />
                    <div className="h-full w-[1px] bg-border-color" />
                    <div>
                      <p className="text-[16px]">{ele.name_cn}</p>
                      <div className="flex items-center gap-x-[6px] mt-[6px]">
                        <LazyImage
                          src={"/images/rank_0.png"}
                          width={20}
                          height={20}
                          alt={""}
                        />
                        <span className="text-pri-color">冠军</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    className={`group grid grid-cols-[20px_1fr] ${bodyStyles}`}
                  >
                    <Rank i={i - 1} rank={i} />
                    <p className="text-[14px] truncate w-full text-start leading-[20px]">
                      {ele.name_cn}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </Frame>
      </div>
    )
  );
}
