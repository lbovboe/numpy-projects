import { changeDateFormat, week } from "../../../public/scripts/publicFunction";
import LazyImage from "../../tools/lazy_image";
import NoDataFound from "../../tools/noDataFound";
import MatchCard from "./MatchCard";

export default function MatchContainer({ data, showDate = true }) {
  return (
    <div className="space-y-[15px]">
      {data ? (
        <>
          {data?.map((ele, i) => {
            return (
              <div key={i} className="">
                {showDate && (
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-x-[6px]`}>
                      <LazyImage
                        src={`/images/icon_calendar.png`}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <h2 className="text-pri-color">
                        {changeDateFormat(ele.Date)} 星期{week(ele.Date)}
                      </h2>
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
