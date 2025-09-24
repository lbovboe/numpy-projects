import { useState } from "react";
import Button from "../../../tools/Button";
export default function MatchBrief({ briefDetails, data_card }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    briefDetails &&
    briefDetails.some((bd) => bd.briefing?.length > 0 || bd.suspended?.length > 0) && (
      <div className="">
        <div className="flex items-center gap-x-[10px] text-[14px] my-[15px]">
          {briefDetails.map((bd, i) => (
            <Button
              text={bd.team_name}
              key={i}
              isActive={activeTab === i}
              isHover={true}
              onClick={() => setActiveTab(i)}
            />
          ))}
        </div>
        <div className="">
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
                      className="mt-[15px]"
                    >
                      <h3 className="text-pri-color text-[16px]"> {b.label}</h3>
                      <p className="text-[14px] leading-[28px] mt-[4px]">{b.content}</p>
                    </div>
                  ))}
                {bd.suspended && bd.suspended.length > 0 && (
                  <div className="mt-[15px]">
                    <h3 className="text-pri-color text-[16px]">缺席</h3>
                    <p className="text-[14px] leading-[28px] mt-[4px]">
                      {bd.suspended.map((s, index) => (
                        <span key={s.name}>
                          {`${s.name}（${s.reason}） ${index === bd.suspended.length - 1 ? "" : "，"}`}
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
