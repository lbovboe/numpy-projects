import { React } from "react";

export default function LeftRightChart({
  homeScore,
  awayScore,
  homeName,
  awayName,
  title,
}) {
  const getParsedScore = (score) => {
    if (!score) return 0;
    if (score == "-") {
      return 0;
    }
    score = score.replace("%", "");
    return Number(score);
  };
  const parsedHomeScore = getParsedScore(homeScore);
  const parsedAwayScore = getParsedScore(awayScore);
  const bothZero = !(parsedHomeScore || parsedAwayScore);
  const homePercent =
    (parsedHomeScore / (parsedHomeScore + parsedAwayScore)) * 100;
  const awayPercent =
    (parsedAwayScore / (parsedHomeScore + parsedAwayScore)) * 100;
  const homeColor = !bothZero ? '#818AB6' : "#E0E0E0";
  const awayColor = !bothZero ? "#D19F6C" : "#E0E0E0";

  return (
    <>
      <div className="grid grid-cols-3 items-center justify-between">
        <div
          title={`${homeName || ""} : ${homeScore}`}
          className="rounded-full w-full h-[4px]"
          style={{
            backgroundColor: "#E0E0E0",
            display: "grid",
            gridTemplateColumns: `${awayPercent}% ${homePercent}%`,
          }}
        >
          <div />
          <div
            title={`${homeName || ""} : ${homeScore}`}
            className="w-full rounded-full h-[4px]"
            style={{ backgroundColor: homeColor }}
          />
        </div>
        <div className="grid grid-cols-[50px_1fr_50px] items-center">
          <p className="text-end">{homeScore || "-"}</p>
          <p className="text-center">{title || ""}</p>
          <p className="text-start">{awayScore || "-"}</p>
        </div>
        <div
          title={`${homeName || ""} : ${homeScore}`}
          className="rounded-full w-full h-[4px]"
          style={{
            backgroundColor: "#E0E0E0",
            display: "grid",
            gridTemplateColumns: `${awayPercent}% ${homePercent}%`,
          }}
        >
          <div
            title={`${awayName || ""} : ${awayScore}`}
            className="w-full rounded-full h-[4px]"
            style={{ backgroundColor: awayColor }}
          />
        </div>
      </div>
    </>
  );
}
