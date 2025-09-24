import {
  getMatchCls,
  recordStream,
} from "../../../public/scripts/publicFunction";
import LazyImage from "../../tools/lazy_image";

export default function StreamCard({ data }) {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-[12px] mt-[15px]">
        {data &&
        getMatchCls(data.state) !== "end" &&
        data.MatchLives &&
        data?.MatchLives?.length > 0 ? (
          data?.MatchLives.map((val, i) => (
            <button
              className="flex flex-col items-center justify-center w-[183px] h-[55px] rounded-[10px] bg-pri-color text-white hover:bg-sec-color"
              key={i}
              onClick={() =>
                recordStream(
                  val?.match_id,
                  val?.ID,
                  val?.link,
                  val?.match_type,
                  val?.vendor_id
                )
              }
            >
              <p className="font-semibold">{val?.title}</p>
              <p className="text-[12px] mt-[2px]">{`来源: ${val?.name}`}</p>
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-[183px] h-[55px] rounded-[10px] bg-white text-[#888]">
            待網友上傳
          </div>
        )}
      </div>
      <div className="leading-[26px] mt-[15px] text-center">
        本站提供的導航鏈接收集整理自各大體育賽事平臺及網友補充上傳。旨在為運動愛好者在各大平台尋找、收集、分享、聚集優質運動賽事資源。如果用戶發現更穩定更流暢的信號源，歡迎通過郵件上傳相關鏈接，格式為（當前頁面鏈接、信號源名稱、比賽信號鏈接、上傳者名稱），網友上傳的鏈接必須不包含非法或違規內容。{" "}
        <p>
          上傳郵件：
          <a
            href="mailto:websiteemplaceholder@outlook.com"
            className="text-pri-color hover:text-sec-color underline"
          >
            websiteemplaceholder@outlook.com
          </a>
        </p>
      </div>
    </>
  );
}
