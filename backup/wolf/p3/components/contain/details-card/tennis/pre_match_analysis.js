import { changeDateFormat } from "../../../../public/scripts/publicFunction";
import LazyImage from "../../../tools/lazy_image";
import { tableBodyStyles, tableHeaderStyles } from "../details_content";

export default function PreMatchAnalysis({ data, data_card }) {
  return (
    (data?.HomeRecentMatch?.length > 0 ||
      data?.AwayRecentMatch?.length > 0) && (
      <div className="">
        {data?.HomeRecentMatch?.length > 0 && (
          <div className="mt-[15px] rounded-[10px] border border-solid border-border-color overflow-hidden">
            <div className="flex justify-center items-center gap-x-[10px] bg-pri-color h-[46px] text-white">
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[5px] bg-white overflow-hidden">
                <LazyImage
                  src={data_card?.PlayerA1?.photo}
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <p>{data_card?.PlayerA1?.name_j}</p>
              {!data_card?.is_single && (
                <>
                  <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[5px] bg-white overflow-hidden">
                    <LazyImage
                      src={data_card?.PlayerA2?.photo}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                  <p>
                    <span>{data_card?.PlayerA2?.name_j}</span>
                  </p>
                </>
              )}
            </div>
            <div
              className={`grid grid-cols-[300px_80px_1fr_1fr_1fr_300px_1fr] gap-x-[10px] text-[12px] ${tableHeaderStyles}`}
            >
              <p>球員</p>
              <p>日期</p>
              <p>賽事</p>
              <p>場地</p>
              <p>輪次</p>
              <p>對陣</p>
              <p>比分結果</p>
            </div>
            <div className="text-center">
              {data?.HomeRecentMatch?.map((val, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-[300px_80px_1fr_1fr_1fr_300px_1fr] gap-x-[10px] ${tableBodyStyles} last:border-none`}
                >
                  <div className="flex justify-center">
                    <p className="truncate">{`${val?.player_a1}`}</p>
                    {val?.player_a2 && (
                      <p className="truncate">&nbsp;/&nbsp;{val?.player_a2}</p>
                    )}
                  </div>
                  <p>
                    {val?.time && changeDateFormat(val?.time, "yyyy-MM-dd")}
                  </p>
                  <p>{val?.kind}</p>
                  <p>{val?.floor}</p>
                  <p>{val?.round}</p>
                  <div className="flex justify-center">
                    <p className="truncate">{`${val?.player_b1}`}</p>
                    {val?.player_b2 && (
                      <p className="truncate">&nbsp;/&nbsp;{val?.player_b2}</p>
                    )}
                  </div>
                  <p>
                    <span>{val?.a_score ?? "–"}</span>
                    &nbsp;&nbsp;:&nbsp;&nbsp;
                    <span>{val?.b_score ?? "–"}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data?.AwayRecentMatch?.length > 0 && (
          <div className="mt-[15px] rounded-[10px] border border-solid border-border-color overflow-hidden">
            <div className="flex justify-center items-center gap-x-[10px] bg-pri-color h-[46px] text-white">
              <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[5px] bg-white overflow-hidden">
                <LazyImage
                  src={data_card?.PlayerB1?.photo}
                  width={20}
                  height={20}
                  alt=""
                />
              </div>
              <p>{data_card?.PlayerB1?.name_j}</p>
              {!data_card?.is_single && (
                <>
                  <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[5px] bg-white overflow-hidden">
                    <LazyImage
                      src={data_card?.PlayerB2?.photo}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </div>
                  <p>
                    <span>{data_card?.PlayerB2?.name_j}</span>
                  </p>
                </>
              )}
            </div>
            <div
              className={`grid grid-cols-[300px_80px_1fr_1fr_1fr_300px_1fr] gap-x-[10px] text-[12px] ${tableHeaderStyles}`}
            >
              <p>球員</p>
              <p>日期</p>
              <p>賽事</p>
              <p>場地</p>
              <p>輪次</p>
              <p>對陣</p>
              <p>比分結果</p>
            </div>
            <div className="text-center">
              {data?.AwayRecentMatch?.map((val, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-[300px_80px_1fr_1fr_1fr_300px_1fr] gap-x-[10px] ${tableBodyStyles} last:border-none`}
                >
                  <div className="flex justify-center">
                    <p className="truncate">{`${val?.player_a1}`}</p>
                    {val?.player_a2 && (
                      <p className="truncate">&nbsp;/&nbsp;{val?.player_a2}</p>
                    )}
                  </div>
                  <p>
                    {val?.time && changeDateFormat(val?.time, "yyyy-MM-dd")}
                  </p>
                  <p>{val?.kind}</p>
                  <p>{val?.floor}</p>
                  <p>{val?.round}</p>
                  <div className="flex justify-center">
                    <p className="truncate">{`${val?.player_b1}`}</p>
                    {val?.player_b2 && (
                      <p className="truncate">&nbsp;/&nbsp;{val?.player_b2}</p>
                    )}
                  </div>
                  <p>
                    <span>{val?.a_score ?? "–"}</span>
                    &nbsp;&nbsp;:&nbsp;&nbsp;
                    <span>{val?.b_score ?? "–"}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  );
}
