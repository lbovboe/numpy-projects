import { changeDateFormat, week } from "../../../public/scripts/publicFunction";
import NoDataFound from "../../tools/noDataFound";
import MatchCard from "./MatchCard";
export default function MatchContainer({ data, showDate = true }) {
  return (
    <div className="">
      {data ? (
        <>
          {data?.map((ele, i) => {
            return (
              <div
                key={i}
                className={`relative ${showDate ? "mt-[5px]" : ""}`}
              >
                {showDate && (
                  <div className="leading-[20px] px-[12px] pt-[8px] pb-[18px] rounded-t-[10px] bg-[#2F3035] text-white w-fit translate-y-[10px] z-[-1] relative">{`${changeDateFormat(
                    ele.Date,
                    "yyyy-MM-dd"
                  )} 星期${week(ele.Date)}`}</div>
                )}
                <div className={`${showDate ? "" : "mt-[12px]"} z-[2] relative`}>
                  <MatchCard data={ele.Matches} />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="rounded-[10px] bg-white my-[80px]">
          <NoDataFound cHeight={"400px"} />
        </div>
      )}
    </div>
  );
}
