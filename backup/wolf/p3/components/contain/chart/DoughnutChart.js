import { React, useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({
  homeScore,
  awayScore,
  homeLab,
  awayLab,
  title1 = "",
  title2 = "",
}) {
  const defData = {
    labels: ["无数据"],
    datasets: [
      {
        data: [1],
        backgroundColor: ["#44445F"],
        borderColor: ["#44445F"],
        borderWidth: 1,
        hoverOffset: 2,
      },
    ],
  };
  const defOption = {
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            return label;
          },
        },
        backgroundColor: "rgba(1, 50, 129, 1)",
        padding: 10,
      },
    },
    animation: {
      duration: 2000,
    },
    aspectRatio: 1,
  };
  const [data, setData] = useState(defData);
  const [options, setOption] = useState(defOption);

  useEffect(() => {
    if (homeScore) {
      homeScore =
        typeof homeScore == "string"
          ? Number(homeScore.replace("%", ""))
          : homeScore;
      awayScore =
        typeof awayScore == "string"
          ? Number(awayScore.replace("%", ""))
          : awayScore;
      let bg_color = [];
      if (homeScore > awayScore) bg_color = ["#44445F", "#7F65FF"];
      else bg_color = ["#7F65FF", "#44445F"];
      setData({
        labels: [awayLab, homeLab],
        datasets: [
          {
            data: [awayScore, homeScore],
            backgroundColor: bg_color,
            borderColor: bg_color,
            borderWidth: 1,
            hoverOffset: 2,
          },
        ],
      });
      setOption({
        cutout: "80%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 10,
          },
        },
        animation: {},
        aspectRatio: 1,
      });
    }
  }, [homeScore]);

  return (
    <>
      <div className="chart_container text-[20px]">
        <p className="cleft text-right">{homeScore || "-"}</p>
        <div className="circleChart relative">
          <div
            className={`absolute left-[calc(50%_-_20px)] leading-normal text-center z-[1] ${
              title2 ? "top-[calc(50%_-_30px)]" : "top-[calc(50%_-_15px)]"
            }`}
          >
            <p>{title1}</p>
            <p>{title2}</p>
          </div>
          <Doughnut data={data} options={options} />
        </div>
        <p className="cright">{awayScore || "-"}</p>
      </div>
    </>
  );
}
