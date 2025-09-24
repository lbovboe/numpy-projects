import LazyImage from "../../tools/lazy_image";
import LanqiuJifen from "./LanqiuJifen";
import UFCRank from "./UFCRank";
import WangqiuRanking from "./WangqiuRanking";
import ZuqiuJifen from "./ZuqiuJifen";
import ZuqiuShooterAssist from "./ZuqiuShooterAssist";


export default function RankingContainer({ jifen, matchType, topicName, shooter, assist }) {

  switch (matchType) {
    case "zuqiu":
      return (
        <>
          {jifen && (
            <ZuqiuJifen
              title={"積分榜"}
              data={jifen}
              mode={jifen.mode || "empty"}
            />
          )}
          <div className="grid grid-cols-2 gap-x-[20px] max12:grid-cols-1">
            <div>
              <ZuqiuShooterAssist
                title={"射手榜"}
                data={shooter?.[0]?.ranking || shooter}
                mode="shooter"
              />
            </div>
            <ZuqiuShooterAssist
              title={"助攻榜"}
              data={assist?.[0]?.ranking || assist}
              mode="assist"
            />
          </div>
        </>
      );
    case "lanqiu":
      return (
        <div className="grid grid-flow-col auto-cols-fr gap-x-[20px] max12:grid-cols-1">
          {jifen?.map((ele, i) => (
            <LanqiuJifen
              key={i}
              title={ele.Competition === "CBA" ? "排行榜" : ele.Competition}
              data={ele.Rankings}
            />
          ))}
        </div>
      );
    case "wangqiu":
      return (
        <div className="">
          <WangqiuRanking data={jifen} />
        </div>
      );
    case "zonghe":
      if (topicName === "ufc") {
        return (
          <UFCRank
            title={"排行榜"}
            data={jifen}
          />
        );
      }
    default:
      return;
  }
}
export const headerStyles =
  "gap-x-[10px] min12:gap-x-[10px] bg-pri-color text-white py-[8px] px-[10px] text-[12px] rounded-[10px] text-center whitespace-nowrap h-[33px]";
export const bodyStyles =
  "items-center gap-x-[10px] min12:gap-x-[10px] h-[44px] px-[10px] border-b border-solid border-border-color last:border-none text-center hover:text-sec-color leading-[20px]";

export function Rank({ i, rank }) {
  return (
    <div className={`text-center h-[20px] w-[20px] text-[12px]`}>
      {i < 3 ? (
        <LazyImage
          src={`/images/rank_${i + 1}.png`}
          width={20}
          height={20}
          alt={i + 1}
        />
      ) : (
        rank
      )}
    </div>
  );
}
