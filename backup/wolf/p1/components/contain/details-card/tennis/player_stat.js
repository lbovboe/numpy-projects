import { tableBodyStyles, tableHeaderStylesLanqiu } from "../details_content";

export default function PlayerStat({ data }) {
  const renderTable = (tableData, index) => (
    <div key={index} className="">
      <div
        className={`grid grid-cols-[120px_repeat(7,1fr)] max12:grid-cols-[50px_repeat(7,1fr)] gap-x-[10px] ${tableHeaderStylesLanqiu}`}
      >
        <p>球員</p>
        <p>名次</p>
        <p>總積分</p>
        <p>參賽次数</p>
        <p>今年單打成績</p>
        <p>今年雙打成績</p>
        <p>生涯單打成績</p>
        <p>生涯雙打成績</p>
      </div>
      <div className="text-center px-[10px]">
        {tableData?.List?.map((v, i) => (
          <div
            key={i}
            className={`grid grid-cols-[120px_repeat(7,1fr)] max12:grid-cols-[50px_repeat(7,1fr)] gap-x-[10px] ${tableBodyStyles} last:border-none`}
          >
            <p>{v?.name}</p>
            <p>{v?.rank}</p>
            <p>{v?.score}</p>
            <p>{v?.Match_count}</p>
            <p>{v?.Player?.t_sgl_score?.replace("-", " - ") || "-"}</p>
            <p>{v?.Player?.t_dbl_score?.replace("-", " - ") || "-"}</p>
            <p>{v?.Player?.sgl_score?.replace("-", " - ") || "-"}</p>
            <p>{v?.Player?.dbl_score?.replace("-", " - ") || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="">
      {data && (
        <div className="rounded-[10px]  ">
          {Array.isArray(data)
            ? data.map((tableData, index) => renderTable(tableData, index))
            : renderTable(data, 0)}
        </div>
      )}
    </div>
  );
}
