import { tableBodyStyles, tableHeaderStyles } from "../details_content";

export default function TechStat({ data }) {
  return (
    <>
      {data && (
        <>
          <div className="text-[14px] rounded-[10px] overflow-hidden">
            <div
              className={`grid grid-cols-[210px_repeat(7,1fr)_1.5fr] gap-x-[20px] rounded-b-[10px] ${tableHeaderStyles}`}
            >
              <p>球隊</p>
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
                className={`grid grid-cols-[210px_repeat(7,1fr)_1.5fr] gap-x-[20px] ${tableBodyStyles} last:border-none`}
              >
                <div>
                  {val?.side.split(",").map((ele, i) => (
                    <p key={i}>{ele}</p>
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
