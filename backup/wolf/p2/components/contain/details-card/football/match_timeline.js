import { tableBodyStyles, tableHeaderStyles } from "../details_content";
import LazyImage from "../../../tools/lazy_image";
import { getEventIcon } from "../../../../public/scripts/publicFunction";

export default function MatchTimeline({ data }) {
  return (
    <>
      <div
        className={`grid items-center ${tableHeaderStyles} text-[12px] rounded-[10px]`}
      >
        即時賽況
      </div>
      {data && (
        <>
          <div className="mt-[20px]">
            <div className="relative overflow-hidden">
              <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full bg-[#E4EEEC] z-0" />
              <div className="relative z-[1]">
                <div className="grid grid-cols-[1fr_55px_1fr] gap-x-[15px] items-center">
                  <div></div>
                  <p className="flex items-center justify-center w-full h-[30px] rounded-[50px] bg-sec-color text-white">
                    开始
                  </p>
                  <div></div>
                </div>
                {data &&
                  data.map((val, idx) => (
                    <div
                      key={idx}
                      className="mt-[70px] [&:nth-child(2)]:mt-[20px]"
                    >
                      <div className="grid grid-cols-[1fr_45px_1fr] gap-x-[15px] items-center">
                        <div>
                          {val?.Home?.length > 0 && (
                            <div className="flex flex-wrap gap-x-[15px] gap-y-[8px] rounded-[10px] bg-border-color px-[15px] py-[8px]">
                              {val?.Home?.map((v, i) => (
                                <div
                                  className="grid grid-cols-[1fr_14px] gap-x-[3px] items-center"
                                  key={i}
                                >
                                  {getEventIcon(v?.type) != "n" && (
                                    <>
                                      <p>{v?.player_name}</p>
                                      <LazyImage
                                        alt={v?.topic || "event"}
                                        src={getEventIcon(v?.type)}
                                        width={14}
                                        height={14}
                                      />
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-center w-full h-[36px] rounded-[10px] bg-bg-color">
                          <p>{`${val?.time}'`}</p>
                        </div>
                        <div>
                          {val?.Away?.length > 0 && (
                            <div className="flex flex-wrap gap-x-[15px] gap-y-[8px] rounded-[10px] bg-border-color px-[15px] py-[8px]">
                              {val?.Away?.map((v, i) => (
                                <div
                                  className="grid grid-cols-[1fr_14px] gap-x-[3px] items-center"
                                  key={`right-eve-${idx}-${i}`}
                                >
                                  {getEventIcon(v?.type) != "n" && (
                                    <>
                                      <p>{v?.player_name}</p>
                                      <LazyImage
                                        alt={v?.topic || "event"}
                                        src={getEventIcon(v?.type)}
                                        width={14}
                                        height={14}
                                      />
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="grid grid-cols-[1fr_55px_1fr] gap-x-[15px] items-center mt-[24px]">
                  <div></div>
                  <p className="flex items-center justify-center w-full h-[30px] rounded-[50px] bg-sec-color text-white">
                    结束
                  </p>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-wrap justify-center gap-x-[50px] gap-y-[20px] items-center mt-[25px] whitespace-nowrap">
        {[
          ["上場", "upTime"],
          ["下場", "downTime"],
          ["進球", "goals"],
          ["进球不算", "goalnot"],
          ["點球", "penaltyGoals"],
          ["點球不進", "missedPenaltyGoals"],
          ["烏龍球", "wulongball"],
          ["黃牌", "yellow"],
          ["紅牌", "red"],
          ["紅黃兩變", "redyellow"],
          ["助攻", "assist"],
        ].map(([name, iconName], i) => (
          <div
            key={i}
            className="flex flex-col justify-center items-center w-[60px] gap-[3px]"
          >
            <LazyImage
              alt={name}
              src={`/images/match_details/${iconName}.png`}
              width={20}
              height={20}
            />
            <p className="w-full text-center">{name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
