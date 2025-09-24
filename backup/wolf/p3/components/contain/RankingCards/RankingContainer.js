import { useState } from "react";
import Frame from "../../tools/Frame";
import LazyImage from "../../tools/lazy_image";
import LanqiuJifen from "./LanqiuJifen";
import UFCRank from "./UFCRank";
import WangqiuRanking from "./WangqiuRanking";
import ZuqiuShooterAssist from "./ZuqiuShooterAssist";
import React from "react";
import FrameOptions from "../../tools/FrameOptions";

export default function RankingContainer({
  jifen,
  matchType,
  topicName,
  shooter,
  assist,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  let options = [];
  switch (matchType) {
    case "zuqiu":
      options = [...getZuqiuJifenOptions(jifen?.mode || "empty")];
      if (shooter) {
        options.push([
          "射手榜",
          <ZuqiuShooterAssist
            title={"射手榜"}
            data={shooter?.[0]?.ranking || shooter}
            mode="shooter"
          />,
        ]);
      }
      if (assist) {
        options.push([
          "助攻榜",
          <ZuqiuShooterAssist
            title={"助攻榜"}
            data={assist?.[0]?.ranking || assist}
            mode="assist"
          />,
        ]);
      }

      break;
    case "lanqiu":
      options =
        jifen?.map((ele, i) => [
          jifen.length <= 1 ? "排行榜" : ele.Competition,
          <LanqiuJifen key={i} data={ele.Rankings} />,
        ]) || [];
      break;
    case "wangqiu":
      options =
        jifen?.map((ele, i) => [
          ele.rank_mode,
          <WangqiuRanking data={jifen} activeTab={i} />,
        ]) || [];
      break;
    case "zonghe":
      if (topicName === "ufc") {
        return <UFCRank title={"排行榜"} data={jifen} />;
      }
  }

  function getZuqiuJifenOptions(mode) {
    switch (mode) {
      case "league":
        return [["積分榜", <JifenContainer data={jifen.Data} />]];
      case "empty":
        return (
          jifen?.map((ele, i) => [
            `積分榜 (${ele.side})`,
            <JifenContainer data={jifen?.[i]?.list} />,
          ]) || []
        );
      case "cup":
        return (
          jifen?.Data?.map((ele, i) => [
            `積分榜 (${ele.round})`,
            jifen?.Data?.[i]?.List.map((group, i) => (
              <JifenContainer
                key={i}
                data={group?.List}
                group={group?.group + "組"}
              />
            )),
          ]) || []
        );
    }
  }
  return (
    <Frame title="排行榜" iconName="icon_ranking">
      {options?.length > 1 && (
        <FrameOptions
          className="py-[4px]"
          list={options.map((ele) => ele[0])}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
      <div className="mt-[12px] rounded-[10px] border border-solid border-border-color overflow-hidden">
        {options?.[activeIndex]?.[1]}
      </div>
    </Frame>
  );
}
export const headerStyles =
  "gap-x-[15px] min12:gap-x-[10px] bg-pri-color py-[7px] px-[10px] text-[12px] text-white text-center whitespace-nowrap";
export const bodyStyles =
  "items-center gap-x-[15px] min12:gap-x-[10px] h-[44px] px-[10px] text-center hover:text-sec-color border-b border-solid border-border-color last:border-none";

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
        className={`grid grid-cols-[24px_2fr_1fr_1fr_1fr_1fr] min12:grid-cols-[24px_1fr_28px_60px_42px_28px] ${headerStyles}`}
      >
        <p>{group || "排名"}</p>
        <p className="text-start">球隊</p>
        <p>場次</p>
        <p>勝/平/負</p>
        <p>進/失</p>
        <p>積分</p>
      </div>
      <div className={`overflow-hidden`}>
        {data?.map((v, i) => (
          <div
            key={i}
            className={`grid grid-cols-[24px_2fr_1fr_1fr_1fr_1fr] min12:grid-cols-[24px_1fr_28px_60px_42px_28px] ${bodyStyles}`}
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
            <p>
              {v.wins}/{v.draws}/{v.losses}
            </p>
            <p>
              {v.goals_scored}/{v.goals_against}
            </p>
            <p>{v.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
