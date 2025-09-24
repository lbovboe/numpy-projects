import LazyImage from "../../tools/lazy_image";
import { bodyStyles, headerStyles, Rank } from "./RankingContainer";

export default function ZuqiuShooterAssist({ data, title, mode = "shooter" }) {
  return (
    data && (
      <div>
        <div className="rounded-[10px] overflow-hidden">
          <div
            className={`grid grid-cols-[24px_2fr_2fr_1fr] min12:grid-cols-[24px_1fr_1.5fr_57px] ${headerStyles}`}
          >
            <p>排名</p>
            <p className="text-start">球員</p>
            <p className="text-start">球隊</p>
            <p>{mode === "shooter" ? "進球(點球)" : "助攻數"}</p>
          </div>
          <div className="">
            {data.map((v, i) => (
              <div
                key={i}
                className={`grid grid-cols-[24px_2fr_2fr_1fr] min12:grid-cols-[24px_1fr_1.5fr_57px] ${bodyStyles}`}
              >
                <Rank i={i} rank={i + 1} />
                <p className="truncate text-start">
                  {v.Player?.name || v.PlayerName}
                </p>
                <div className="grid grid-cols-[20px_1fr] gap-x-[8px] items-center">
                  <LazyImage
                    src={v.Team?.icon || v.TeamIcon}
                    width={20}
                    height={20}
                    alt={v.Team?.name_abbr || v.Team}
                  />
                  <p className="truncate text-start">
                    {v.Team?.name_abbr || v.Team}
                  </p>
                </div>
                <p>
                  {mode == "shooter" ? (
                    <>
                      {v.Goals || v.goals}&nbsp;
                      {<>({v.Penalties || v.penalties || 0})</>}
                    </>
                  ) : (
                    v.Assists || v.assists || 0
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
