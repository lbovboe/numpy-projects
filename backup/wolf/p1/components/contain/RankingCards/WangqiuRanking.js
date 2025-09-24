import LazyImage from "../../tools/lazy_image";
import { headerStyles, Rank } from "./RankingContainer";
import Frame from "../../tools/Frame";
import Button from "../../tools/Button";
import { useState } from "react";
import { framePaddingBorderNone } from "../details-card/details_content";
export default function WangqiuRanking({ data }) {
  const [activeTab, setActiveTab] = useState(0);
  const options = data?.map((ele) => ele.rank_mode);
  return (
    <div>
      <Frame
        title={data[activeTab]?.rank_mode + "排行榜"}
        className={`${framePaddingBorderNone}`}
      >
        <div className="flex gap-x-[10px] my-[15px]">
          {options.map((option, i) => (
            <Button
              text={option}
              key={i}
              isActive={activeTab === i}
              isHover={true}
              onClick={() => setActiveTab(i)}
            />
          ))}
        </div>

        <div className="">
          <div
            className={`grid grid-cols-[24px_2fr_repeat(3,1fr)] min12:grid-cols-[24px_1fr_50px_50px_50px] ${headerStyles}`}
          >
            <p>排名</p>
            <p className="text-start">姓名</p>
            <p>積分</p>
            <p>參賽數量</p>
            <p>排名變化</p>
          </div>
          <div className="">
            {data[activeTab]?.ranking.map((v, i) => (
              <div
                key={i}
                className={`grid grid-cols-[24px_2fr_repeat(3,1fr)] min12:grid-cols-[24px_1fr_50px_50px_50px] items-center gap-x-[15px] min12:gap-x-[10px] h-[44px] p-[10px] border-b border-solid border-border-color last:border-none text-center hover:text-sec-color`}
              >
                <Rank
                  i={i}
                  rank={v.rank}
                />
                <div className="grid grid-cols-[20px_1fr] gap-x-[8px] items-center">
                  <LazyImage
                    src={v.Player?.photo}
                    width={20}
                    height={20}
                    alt={v.name}
                    className="rounded-[10px] overflow-hidden"
                  />
                  <p className="truncate text-start">{v.Player?.name_j}</p>
                </div>
                <p>{v.score}</p>
                <p>{v.Match_count}</p>
                <div className={`flex justify-center ${wqRankClass(v.rank, v.old_rank)}`}>
                  <svg
                    width={50}
                    height={20}
                  >
                    <use href="#wq-rank-arrow" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    </div>
  );
}

const wqRankClass = (rank, oldRank) => {
  if (rank > oldRank) {
    return "fill-[#05AF0B] rotate-90";
  } else if (rank < oldRank) {
    return "fill-[#F61111] -rotate-90";
  } else {
    return "fill-[#FFC527]";
  }
};
