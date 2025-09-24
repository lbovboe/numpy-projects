import LazyImage from "../../../tools/lazy_image";

export default function TableTeamHeader({ data, type, showVS = true }) {
  return (
    <>
      <div
        className={`grid grid-cols-[1fr_30px_1fr] items-center h-[44px] px-[15px] bg-pri-color text-white ${
          type === "lanqiu" ? "" : " "
        }`}
      >
        <div className="grid grid-cols-[30px_1fr] items-center gap-x-[10px]">
          <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[10px] overflow-hidden bg-white">
            <LazyImage src={data?.HomeTeam?.icon} width={20} height={20} />
          </div>
          <p className="truncate">{data?.HomeTeam?.name}</p>
        </div>
        <p className="justify-self-center">{showVS ? "VS" : ""}</p>
        <div className="grid grid-cols-[1fr_30px] items-center gap-x-[7px]">
          <p className="text-end">{data?.AwayTeam?.name}</p>
          <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[10px] overflow-hidden bg-white">
            <LazyImage src={data?.AwayTeam?.icon} width={20} height={20} />
          </div>
        </div>
      </div>
    </>
  );
}
