import { React } from "react";

export default function LeftRightChart({
  homeScore,
  awayScore,
  homeName,
  awayName,
  title,
  leftColor = "#FF6600",
  rightColor = "#6AA319"
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
  const homeColor = !bothZero ? leftColor : "#F4f4f4";
  const awayColor = !bothZero ? rightColor : "#F4f4f4";

  return (
    <>
      <div className="grid grid-cols-3 items-center justify-between">
        <div
          title={`${homeName || ""} : ${homeScore}`}
          className="rounded-full w-full h-[4px]"
          style={{
            backgroundColor: "#F4f4f4",
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
            backgroundColor: "#F4f4f4",
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
