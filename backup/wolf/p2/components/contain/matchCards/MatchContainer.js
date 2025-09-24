import { changeDateFormat, week } from "../../../public/scripts/publicFunction";
import LazyImage from "../../tools/lazy_image";
import NoDataFound from "../../tools/noDataFound";
import MatchCard from "./MatchCard";

export default function MatchContainer({ data, showDate = true }) {
  return (
    <div className="space-y-[20px]">
      {data ? (
        <>
          {data?.map((ele, i) => {
            return (
              <div key={i} className="">
                {showDate && (
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center gap-x-[8px] rounded-[10px] bg-pri-color pl-[8px] pr-[6px] h-[40px] text-[14px]`}
                    >
                      <div className="flex items-center justify-center rounded-full w-[18px] h-[18px]">
                        <LazyImage
                          src={`/images/icon_date.png`}
                          width={16}
                          height={16}
                          alt=""
                        />
                      </div>
                      <div className="rounded-[8px] bg-bg-color px-[12px] py-[4px]">
                        <h2 className="text-pri-color font-semibold">
                          {changeDateFormat(ele.Date)} 星期{week(ele.Date)}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-[15px]">
                  <MatchCard data={ele.Matches} />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="">
          <NoDataFound cHeight={"400px"} IHeight={100} Iwidth={100} />
        </div>
      )}
    </div>
  );
}
