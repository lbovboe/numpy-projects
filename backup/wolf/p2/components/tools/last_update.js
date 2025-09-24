import { changeDateFormat } from "../../public/scripts/publicFunction";

export default function LastUpdate({ lastUpdate }) {
  return (
    <div className="leading-[20px] flex justify-center items-center text-[14px] text-white gap-x-[5px]">
      <p className="truncate">更新時間: </p>
      <time className="truncate">{changeDateFormat(lastUpdate, "yyyy-MM-dd HH:mm:ss")}</time>
    </div>
  );
}
