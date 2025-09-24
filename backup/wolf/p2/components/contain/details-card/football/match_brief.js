import { useState } from "react";

export default function MatchBrief({ briefDetails, data_card }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    briefDetails &&
    briefDetails.some(
      (bd) => bd.briefing?.length > 0 || bd.suspended?.length > 0
    ) && (
      <div className="mb-[15px]">
        <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px] w-max">
          {briefDetails.map((bd, i) => (
            <div key={i} className="flex items-center gap-x-[10px]">
              <button
                className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
                  activeTab === i
                    ? "bg-bg-color text-pri-color"
                    : "text-white hover:bg-bg-color hover:text-pri-color"
                }`}
                onClick={() => setActiveTab(i)}
              >
                {bd.team_name}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-[15px]">
          {briefDetails &&
            briefDetails?.map((bd, i) => (
              <div
                className=""
                key={`team-${bd.team_name}`}
                style={{ display: `${activeTab === i ? "block" : "none"}` }}
              >
                {bd.briefing &&
                  bd.briefing.map((b, i) => (
                    <div
                      key={`${b.label}-${i}`}
                      className="grid grid-cols-[32px_1fr] gap-x-[20px] mt-[15px]"
                    >
                      <h3 className="text-pri-color text-[16px]">{b.label}</h3>
                      <p className="text-[14px] leading-[26px]">{b.content}</p>
                    </div>
                  ))}
                {bd.suspended && bd.suspended.length > 0 && (
                  <div className="grid grid-cols-[32px_1fr] gap-x-[20px] mt-[15px]">
                    <h3 className="text-pri-color text-[16px]">缺席</h3>
                    <p className="text-[14px] leading-[26px]">
                      {bd.suspended.map((s, index) => (
                        <span key={s.name}>
                          {`${s.name}（${s.reason}） ${
                            index === bd.suspended.length - 1 ? "" : "，"
                          }`}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    )
  );
}
