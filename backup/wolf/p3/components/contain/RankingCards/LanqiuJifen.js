import LazyImage from "../../tools/lazy_image";
import { bodyStyles, headerStyles, Rank } from "./RankingContainer";

export default function LanqiuJifen({ data, title }) {
  return (
    data && (
      <div>
          <div className="rounded-[10px] overflow-hidden">
            <div
              className={`grid grid-cols-[24px_2fr_repeat(4,1fr)] min12:grid-cols-[24px_1fr_40px_40px_40px_40px] ${headerStyles}`}
            >
              <p>排名</p>
              <p className="text-start">球隊</p>
              <p>勝</p>
              <p>负</p>
              <p>勝率</p>
              <p>勝场差</p>
            </div>
            <div className="">
              {data.map((v, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[24px_2fr_repeat(4,1fr)] min12:grid-cols-[24px_1fr_40px_40px_40px_40px] ${bodyStyles}`}
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
                  <p>{v.wins}</p>
                  <p>{v.losses}</p>
                  <p>
                    {v?.matches
                      ? ((v.wins / v?.matches) * 100).toFixed(0)
                      : "0"}
                    %
                  </p>
                  <p>{v.score_difference}</p>
                </div>
              ))}
            </div>
          </div>
      </div>
    )
  );
}
