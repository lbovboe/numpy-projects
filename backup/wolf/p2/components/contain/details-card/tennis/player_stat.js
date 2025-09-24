import { tableBodyStyles, tableHeaderStyles } from "../details_content";

export default function PlayerStat({ data }) {
  const renderTable = (tableData, index) => (
    <div key={index} className="">
      <div
        className={`grid grid-cols-[140px_repeat(7,1fr)] gap-x-[10px] ${tableHeaderStyles} ${
          index > 0 ? "rounded-[10px]" : "rounded-b-[10px]"
        }`}
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
      <div className="text-center">
        {tableData?.List?.map((v, i) => {
          const tSgl =
            v?.Player?.t_sgl_score && v?.Player?.t_sgl_score?.split("-");
          const tDbl =
            v?.Player?.t_dbl_score && v?.Player?.t_dbl_score?.split("-");
          const sgl = v?.Player?.sgl_score && v?.Player?.sgl_score?.split("-");
          const dbl = v?.Player?.dbl_score && v?.Player?.dbl_score?.split("-");
          return (
            <div
              key={i}
              className={`grid grid-cols-[140px_repeat(7,1fr)] gap-x-[10px] ${tableBodyStyles} last:border-none`}
            >
              <p>{v?.name}</p>
              <p>{v?.rank}</p>
              <p>{v?.score}</p>
              <p>{v?.Match_count}</p>
              <p>
                {tSgl ? (
                  <>
                    <span>{tSgl[0]}</span>
                    <span>&nbsp;-&nbsp;</span>
                    <span>{tSgl[1]}</span>
                  </>
                ) : (
                  "-"
                )}
              </p>
              <p>
                {tDbl ? (
                  <>
                    <span>{tDbl[0]}</span>
                    <span>&nbsp;-&nbsp;</span>
                    <span>{tDbl[1]}</span>
                  </>
                ) : (
                  "-"
                )}
              </p>
              <p>
                {sgl ? (
                  <>
                    <span>{sgl[0]}</span>
                    <span>&nbsp;-&nbsp;</span>
                    <span>{sgl[1]}</span>
                  </>
                ) : (
                  "-"
                )}
              </p>
              <p>
                {dbl ? (
                  <>
                    <span>{dbl[0]}</span>
                    <span>&nbsp;-&nbsp;</span>
                    <span>{dbl[1]}</span>
                  </>
                ) : (
                  "-"
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {data && (
        <div className="text-[14px] rounded-[10px] overflow-hidden">
          {Array.isArray(data)
            ? data.map((tableData, index) => renderTable(tableData, index))
            : renderTable(data, 0)}
        </div>
      )}
    </>
  );
}
