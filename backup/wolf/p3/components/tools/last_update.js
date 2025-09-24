import { changeDateFormat } from "../../public/scripts/publicFunction";

export default function LastUpdate({ lastUpdate }) {
  return (
    <div className="flex text-[12px]">
      <p>更新時間:</p>&nbsp;
      <time>{changeDateFormat(lastUpdate, "yyyy-MM-dd HH:mm:ss")}</time>
    </div>
  );
}
