import { tableBodyStyles, tableHeaderStylesLanqiu } from "../details_content";

export default function TechStat({ data }) {
  return (
    <>
      {data && (
        <div className="trounded-[10px]">
          <div
            className={`grid grid-cols-[200px_repeat(8,56px)] max12:grid-cols-[50px_repeat(8,1fr)] gap-x-[10px] ${tableHeaderStylesLanqiu} px-[10px]`}
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
          <div className="">
            {data.map((val, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-[200px_repeat(8,56px)] max12:grid-cols-[50px_repeat(8,1fr)] gap-x-[10px] ${tableBodyStyles} last:border-none px-[10px]`}
              >
                <div>
                  {val?.side?.split(",").map((item, i) => (
                    <div key={i}>{item}</div>
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
        </div>
      )}
    </>
  );
}
