import { useState } from "react";
import Frame from "../../../tools/Frame";
import TableTeamHeader from "./table_team_header";

export default function MatchBrief({ briefDetails, data_card }) {
  return (
    briefDetails &&
    briefDetails.some(
      (bd) => bd.briefing?.length > 0 || bd.suspended?.length > 0
    ) && (
      <Frame title="比賽分析">
        <div className="rounded-[10px] border border-solid border-border-color overflow-hidden">
          <TableTeamHeader data={data_card} showVS={false} />
          <div className="grid grid-cols-2">
            <div className="border-r border-solid border-border-color">
              {briefDetails?.[0]?.suspended?.length > 0 && (
                <div className="border-b border-solid border-border-color p-[15px]">
                  <h3 className="text-pri-color text-[14px]">
                    (&nbsp;缺席&nbsp;)
                  </h3>
                  <p className="text-[14px] leading-[28px] mt-[5px]">
                    {briefDetails?.[0]?.suspended.map((s, index) => (
                      <span key={s.name}>
                        {`${s.name}（${s.reason}） ${
                          index === briefDetails?.[0]?.suspended?.length - 1
                            ? ""
                            : "，"
                        }`}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              {briefDetails?.[0]?.briefing?.map((b, i) => (
                <div
                  key={i}
                  className={`border-solid border-border-color p-[15px] ${
                    i > 0 ? "border-t" : ""
                  }`}
                >
                  <h3 className="text-pri-color">(&nbsp;{b.label}&nbsp;)</h3>
                  <p className="text-[14px] leading-[28px] mt-[5px]">
                    {b.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-solid border-border-color">
              {briefDetails?.[1]?.suspended?.length > 0 && (
                <div className="border-b border-solid border-border-color p-[15px]">
                  <h3 className="text-pri-color text-[14px]">
                    (&nbsp;缺席&nbsp;)
                  </h3>
                  <p className="text-[14px] leading-[28px] mt-[5px]">
                    {briefDetails?.[1]?.suspended.map((s, index) => (
                      <span key={s.name}>
                        {`${s.name}（${s.reason}） ${
                          index === briefDetails?.[0]?.suspended?.length - 1
                            ? ""
                            : "，"
                        }`}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              {briefDetails?.[1]?.briefing?.map((b, i) => (
                <div
                  key={i}
                  className={`border-solid border-border-color p-[15px] ${
                    i > 0 ? "border-t" : ""
                  }`}
                >
                  <h3 className="text-pri-color">(&nbsp;{b.label}&nbsp;)</h3>
                  <p className="text-[14px] leading-[28px] mt-[5px]">
                    {b.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Frame>
    )
  );
}
