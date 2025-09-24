import { tableBodyStyles, tableHeaderStyles } from "../details_content";

export default function TechStat({ data }) {
  return (
    <>
      {data && (
        <>
          <div className="text-[14px] rounded-[10px] border border-solid border-border-color overflow-hidden">
            <div
              className={`grid grid-cols-[330px_repeat(7,1fr)_1.5fr] gap-x-[20px] text-[12px] ${tableHeaderStyles}`}
            >
              <p>實時數據</p>
              <p>
                1<sup>st</sup>
              </p>
              <p>
                2<sup>nd</sup>
              </p>
              <p>
                3<sup>rd</sup>
              </p>
              <p>
                4<sup>th</sup>
              </p>
              <p>
                5<sup>th</sup>
              </p>
              <p>小分</p>
              <p>局分</p>
              <p className="">總分</p>
            </div>
            {data.map((val, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-[330px_repeat(7,1fr)_1.5fr] gap-x-[20px] ${tableBodyStyles} last:border-none`}
              >
                <div className="flex justify-center">
                  {val?.side.split(",").map((ele, i) => (
                    <p key={i}>&nbsp;{i> 0 && "/"}&nbsp;{ele}</p>
                  ))}
                </div>
                <p>{val?.score_1}</p>
                <p>{val?.score_2}</p>
                <p>{val?.score_3}</p>
                <p>{val?.score_4}</p>
                <p>{val?.score_5}</p>
                <p>{val?.small_score}</p>
                <p>{val?.match_score}</p>
                <p className="">
                  {idx == 0 ? "分差: " : "總分: "} {val?.total}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
