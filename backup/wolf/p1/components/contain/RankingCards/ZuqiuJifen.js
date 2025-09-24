import React, { useState } from "react";
import LazyImage from "../../tools/lazy_image";
import { bodyStyles, headerStyles, Rank } from "./RankingContainer";
import Frame from "../../tools/Frame";
import Button from "../../tools/Button";
import { framePaddingBorderNone } from "../details-card/details_content";
export default function ZuqiuJifen({ data, title, mode }) {
  const [activeTab, setActiveTab] = useState(0);
  switch (mode) {
    case "league":
      return (
        data?.Data?.length > 0 && (
          <Frame
            title="積分榜"
            className={`${framePaddingBorderNone}`}
          >
            <JifenContainer
              data={data.Data}
              title={title}
            />
          </Frame>
        )
      );

    case "empty":
      return (
        data && (
          <div>
            <Frame
              title="積分榜"
              className={`${framePaddingBorderNone}`}
            >
              <>
                <div className="flex gap-x-[12px] my-[15px]">
                  {data?.map((ele, i) => {
                    return (
                      <Button
                        text={ele.side}
                        key={i}
                        isActive={activeTab === i}
                        isHover={true}
                        onClick={() => setActiveTab(i)}
                      />
                    );
                  })}
                </div>
                <JifenContainer data={data?.[activeTab]?.list} />
              </>
            </Frame>
          </div>
        )
      );
    case "cup":
      return (
        data?.Data && (
          <div>
            <Frame
              title="積分榜"
              className={`${framePaddingBorderNone}`}
            >
              <div className="flex gap-x-[12px] my-[15px]">
                {data?.Data.map((ele, i) => {
                  return (
                    <Button
                      text={ele.round}
                      key={i}
                      className={activeTab === i ? "text-pri-color" : "hover:text-sec-color"}
                      onClick={() => setActiveTab(i)}
                    />
                  );
                })}
              </div>
              <>
                {data?.Data?.[activeTab]?.List.map((group, i) => (
                  <JifenContainer
                    key={i}
                    data={group?.List}
                    group={group?.group + "組"}
                    index={i}
                    type="cup"
                    isLast={i === data?.Data?.[activeTab]?.List.length - 1}
                  />
                ))}
              </>
            </Frame>
          </div>
        )
      );
    default:
      return;
  }
}

const JifenContainer = ({ data, group, index = 0, type = "", isLast = false }) => {
  return (
    <div
      className={`  ${
        index == 0 && type === "cup"
          ? "rounded-t-[10px]"
          : index == 0
          ? "rounded-[10px]"
          : isLast
          ? "rounded-b-[10px]"
          : ""
      }`}
    >
      <div
        className={`grid grid-cols-[24px_2fr_repeat(8,1fr)] min12:grid-cols-[24px_1fr_repeat(8,50px)] gap-x-[10px] min12:gap-x-[10px] bg-pri-color text-white py-[8px] px-[10px] text-[12px] leading-[17px] text-center whitespace-nowrap h-[33px] ${
          index == 0 && type === "cup" ? "rounded-[10px]" : "rounded-[10px]"
        }`}
      >
        <p>{group || "排名"}</p>
        <p className="text-start">球隊</p>
        <p>場次</p>
        <p>勝</p>
        <p>平</p>
        <p>負</p>
        <p>進球</p>
        <p>失球</p>
        <p>淨勝球</p>
        <p>積分</p>
      </div>
      <div className="">
        {data?.map((v, i) => (
          <div
            key={i}
            className={`grid grid-cols-[24px_2fr_repeat(8,1fr)] min12:grid-cols-[24px_1fr_repeat(8,50px)] ${bodyStyles}`}
          >
            <Rank
              i={i}
              rank={v.rank}
            />
            <div className="grid grid-cols-[20px_1fr] gap-x-[8px] items-center">
              <LazyImage
                src={v.Team?.icon}
                width={20}
                height={20}
                alt={v.name}
              />
              <p className="truncate text-start">{v.Team?.name}</p>
            </div>
            <p>{v.matches}</p>
            <p>{v.wins}</p>
            <p>{v.draws}</p>
            <p>{v.losses}</p>
            <p>{v.goals_scored}</p>
            <p>{v.goals_against}</p>
            <p>{v.goal_difference}</p>
            <p>{v.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
