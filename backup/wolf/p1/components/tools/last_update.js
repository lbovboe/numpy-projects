import { changeDateFormat } from "../../public/scripts/publicFunction";

export default function LastUpdate({ lastUpdate }) {
  return (
    <div className="flex items-center w-max px-[12px] pt-[8px] pb-[18px] -mb-[12px] whitespace-nowrap bg-text-color rounded-t-[10px] text-white text-[12px]">
      <p>更新時間:</p>&nbsp;
      <time>{changeDateFormat(lastUpdate, "yyyy-MM-dd HH:mm:ss")}</time>
    </div>
  );
}
