import { useState } from "react";
import { tableBodyStyles, tableHeaderStyles } from "../details_content";
import { changeDateFormat } from "../../../../public/scripts/publicFunction";

export default function Analysis({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    data && (
      <>
        <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px] w-max">
          {data.map((ele, i) => (
            <button
              key={i}
              className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
                activeIndex === i
                  ? "bg-bg-color text-pri-color"
                  : "text-white hover:bg-bg-color hover:text-pri-color"
              }`}
              onClick={() => setActiveIndex(i)}
            >
              {ele.topic}
            </button>
          ))}
        </div>
        <div className="text-[14px] mt-[15px]">
          <div className="flex justify-center items-center h-[34px] rounded-t-[10px] bg-pri-color text-white">
            {data?.[activeIndex]?.topic}
          </div>
          <div
            className={`grid grid-cols-[1fr_1fr_1fr_1fr_1.3fr] gap-x-[10px] rounded-b-[10px] ${tableHeaderStyles}`}
          >
            <p>日期</p>
            <p>赛事</p>
            <p>主隊</p>
            <p>比分</p>
            <p>客队</p>
          </div>
          <div>
            {data?.[activeIndex]?.list?.map((val, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-[1fr_1fr_1fr_1fr_1.3fr] gap-x-[10px] ${tableBodyStyles} last:pb-0`}
              >
                <p>{changeDateFormat(val.time)}</p>
                <p>{val.competition.name_abbr}</p>
                <p>{val.HomeTeam.name_abbr}</p>
                <p>
                  {val?.home_score} - {val?.away_score}
                </p>
                <p>{val.AwayTeam.name_abbr}</p>
                <p>{val?.overtime_one}</p>
                <p>{val?.overtime_two}</p>
                <p>{val?.overtime_three}</p>
                <p>{val?.over_time_four}</p>
                <p>{val?.total}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
}
