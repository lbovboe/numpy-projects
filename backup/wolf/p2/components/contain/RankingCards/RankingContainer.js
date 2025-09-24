import { useEffect, useState } from "react";
import Frame from "../../tools/Frame";
import LazyImage from "../../tools/lazy_image";
import LanqiuJifen from "./LanqiuJifen";
import UFCRank from "./UFCRank";
import WangqiuRanking from "./WangqiuRanking";
import ZuqiuShooterAssist from "./ZuqiuShooterAssist";
import React from "react";

export default function RankingContainer({
  jifen,
  matchType,
  topicName,
  shooter,
  assist,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  let options = [];
  const mode = jifen?.mode || "empty";
  const subOptions = matchType === "zuqiu" ? getJifenSubOptions(mode) : [];
  switch (matchType) {
    case "zuqiu":
      options = [
        [
          "積分榜",
          mode === "league" ? (
            <JifenContainer data={jifen?.Data} />
          ) : mode === "empty" ? (
            <JifenContainer data={jifen?.[subIndex]?.list} />
          ) : mode === "cup" ? (
            <>
              {jifen?.Data?.[subIndex]?.List.map((group, i) => (
                <JifenContainer
                  key={i}
                  data={group?.List}
                  group={group?.group + "組"}
                />
              ))}
            </>
          ) : (
            <></>
          ),
        ],
        [
          "射手榜",
          <ZuqiuShooterAssist
            title={"射手榜"}
            data={shooter?.[0]?.ranking || shooter}
            mode="shooter"
          />,
        ],
        [
          "助攻榜",
          <ZuqiuShooterAssist
            title={"助攻榜"}
            data={assist?.[0]?.ranking || assist}
            mode="assist"
          />,
        ],
      ];
      break;
    case "lanqiu":
      options = jifen?.map((ele, i) => [
        jifen.length <= 1 ? "排行榜" : ele.Competition,
        <LanqiuJifen key={i} data={ele.Rankings} />,
      ]);
      break;
    case "wangqiu":
      options = jifen.map((ele, i) => [
        ele.rank_mode,
        <WangqiuRanking data={jifen} activeTab={i} />,
      ]);
      break;
    case "zonghe":
      if (topicName === "ufc") {
        return <UFCRank title={"排行榜"} data={jifen} />;
      }
    default:
      return;
  }

  useEffect(() => {
    setSubIndex(0);
  }, [activeIndex]);

  function getJifenSubOptions(mode) {
    switch (mode) {
      case "empty": //meizhiye
        return (
          <div className="flex items-center justify-end gap-x-[14px]">
            {jifen?.map((ele, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className="h-[18px] w-[1px] bg-pri-color rotate-[20deg]" />
                )}
                <button
                  className={`flex items-center gap-x-[5px] ${
                    subIndex === i ? "text-pri-color" : "hover:text-pri-color"
                  }`}
                  onClick={() => {
                    setSubIndex(i);
                  }}
                >
                  {ele.side}
                </button>
              </React.Fragment>
            ))}
          </div>
        );
      case "cup":
        return (
          <div className="flex items-center justify-end gap-x-[14px]">
            {jifen?.Data?.map((ele, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className="h-[18px] w-[1px] bg-pri-color rotate-[20deg]" />
                )}
                <button
                  className={`flex items-center gap-x-[5px] ${
                    subIndex === i ? "text-pri-color" : "hover:text-pri-color"
                  }`}
                  onClick={() => {
                    setSubIndex(i);
                  }}
                >
                  {ele.round}
                </button>
              </React.Fragment>
            ))}
          </div>
        );
      default:
        return [];
    }
  }
  return (
    <Frame
      title="排行榜"
      iconName="icon_ranking"
      className="pt-[20px] px-[20px] pb-[5px]"
    >
      {options?.length > 1 && (
        <div className="flex justify-between items-center">
          <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px] w-max mb-[15px]">
            {options.map(([name], i) => (
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
          {activeIndex === 0 && subOptions}
        </div>
      )}
      <div className="">{options?.[activeIndex]?.[1]}</div>
    </Frame>
  );
}
export const headerStyles =
  "rounded-[10px] gap-x-[15px] min12:gap-x-[10px] bg-border-color py-[7px] px-[10px] text-[12px] text-pri-color text-center whitespace-nowrap";
export const bodyStyles =
  "items-center gap-x-[15px] min12:gap-x-[10px] h-[44px] px-[10px] text-center hover:text-pri-color border-b border-solid border-border-color last:border-none";

export function Rank({ i, rank }) {
  return (
    <div className="flex items-center justify-center w-[20px] h-[20px]">
      {i < 3 ? (
        <LazyImage src={`/images/rank_${i + 1}.png`} />
      ) : (
        <p className={`text-12px]`}>{rank}</p>
      )}
    </div>
  );
}

const JifenContainer = ({ data, group }) => {
  return (
    <div className="">
      <div
        className={`grid grid-cols-[24px_2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] min12:grid-cols-[24px_1fr_50px_50px_50px_50px_50px_50px_50px_50px] ${headerStyles}`}
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
      <div className={`overflow-hidden`}>
        {data?.map((v, i) => (
          <div
            key={i}
            className={`grid grid-cols-[24px_2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] min12:grid-cols-[24px_1fr_50px_50px_50px_50px_50px_50px_50px_50px] ${bodyStyles}`}
          >
            <Rank i={i} rank={v.rank} />
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
