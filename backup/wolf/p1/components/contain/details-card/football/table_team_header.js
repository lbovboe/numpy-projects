import LazyImage from "../../../tools/lazy_image";

export default function TableTeamHeader({ data, type }) {
  return (
    <>
      <div
        className={`grid grid-cols-[1fr_200px_1fr] items-center rounded-t-[10px] h-[46px] bg-pri-color text-white px-[10px] ${
          type === "lanqiu" ? "" : " "
        }`}
      >
        <div className="flex items-center gap-x-[10px] justify-start">
          <div className="rounded-[10px] flex items-center justify-center w-[30px] h-[30px] bg-white">
            <LazyImage src={data?.HomeTeam?.icon} width={20} height={20} />
          </div>
          <p className="">{data?.HomeTeam?.name}</p>
        </div>
        <p className="justify-self-center">VS</p>
        <div className="flex items-center gap-x-[10px] justify-end">
          <p className="">{data?.AwayTeam?.name}</p>
          <div className="rounded-[10px] flex items-center justify-center w-[30px] h-[30px] bg-white">
            <LazyImage width={20} height={20} src={data?.AwayTeam?.icon} alt={data?.AwayTeam?.name_abbr} />
          </div>
        </div>
      </div>
    </>
  );
}
