import Frame from "../../tools/Frame";
import { useEffect, useRef, useState } from "react";
import LazyImage from "../../tools/lazy_image";
import FrameOptions from "../../tools/FrameOptions";
import ArticleList from "../articleCards/ArticleList";
import { changeDateFormat, getMatchCls, getMatchStr } from "../../../public/scripts/publicFunction";
import ArticleImageSmall from "../articleCards/ArticleImageSmall";
export default function DhSjbCard({ rank, news, teams }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTeams, setSelectedTeams] = useState([0, 1, 2, 3, 4]);
  const [selectOpen, setSelectOpen] = useState(false);

  const selectRef = useRef(null);

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setSelectOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="rounded-[10px] border border-solid border-border-color p-[20px]">
        <Frame title="世界杯熱潮" className="" hrefTitle="更多足球比賽" href="/zuqiu/">
          <FrameOptions activeIndex={activeIndex} setActiveIndex={setActiveIndex} list={rank.map((ele) => ele.group + "組")} />
          <div className="mt-[15px]">
            <JifenContainer data={rank?.[activeIndex]?.ranking} group={rank?.[activeIndex]?.group + "組"} />
          </div>
        </Frame>
        <Frame title="新聞熱點" className="mt-[30px]">
          <ArticleList data={news} />
        </Frame>
        <div className="mt-[20px]">
          {/* select */}
          <div className="relative w-[50%]" ref={selectRef}>
            <div
              className={`relative z-[3] w-full h-[40px] flex justify-between items-center rounded-[10px] border border-solid pl-[12px] py-[10px] pr-[15px] cursor-pointer ${
                selectOpen ? "border-transparent bg-pri-color text-white" : "border-border-color"
              }`}
              onClick={() => setSelectOpen(!selectOpen)}
            >
              <span>選擇國家</span>
              <svg width={12} height={10} className={`transition-[transform] ${selectOpen ? "fill-white rotate-180" : ""}`}>
                <use href="#icon-arrow-down"></use>
              </svg>
            </div>
            {selectOpen && (
              <div className="absolute z-[2] left-0 top-0 grid grid-cols-2 gap-y-[12px] gap-x-[15px] pt-[52px] pb-[15px] px-[12px] w-full rounded-[10px] border border-solid border-border-color bg-white max-h-[580px] overflow-y-auto tinyScrollBar">
                {teams?.map((team, i) => {
                  const isSelected = selectedTeams.includes(i);
                  return (
                    <button
                      key={`sjb-c-${i}`}
                      className="group grid grid-cols-[16px_1fr] items-center gap-x-[5px] select-none"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedTeams(selectedTeams.filter((idx) => idx !== i));
                        } else {
                          setSelectedTeams([...selectedTeams, i]);
                        }
                      }}
                    >
                      <svg width={16} height={16} className={`fill-text-color group-hover:fill-sec-color`}>
                        <use href={isSelected ? "#icon-checkbox-checked" : "#icon-checkbox"}></use>
                      </svg>
                      <p className="truncate text-start group-hover:text-sec-color">{team.name}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="space-y-[20px] mt-[10px]">
            {selectedTeams?.sort()?.map((i) => {
              const team = teams?.[i];
              return (
                <div key={i}>
                  <div className="grid grid-cols-[40px_1fr] gap-x-[10px] items-center">
                    <LazyImage src={team.icon} width={40} height={40} />
                    <a
                      href={`/${team.match_type === "zuqiu" ? "tzu" : "tlq"}/${team.team_id}/`}
                      className="text-[22px] underline hover:text-sec-color w-max"
                    >
                      {team.name}
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-[12px] mt-[10px]">
                    {team?.matches?.map((m, i) => {
                      const state = getMatchCls(m.state);
                      const homeWin = m.home_score > m.away_score;
                      const awayWin = m.home_score < m.away_score;
                      const isDraw = state !== "prelive" && m.home_score === m.away_score;
                      return (
                        <a key={`mc-${i}`} className="" target="_self" href={`/${m?.match_type}/${m?.id}.html`}>
                          <div className="grid grid-cols-[7fr_1px_3fr] gap-x-[20px] items-center p-[20px] rounded-[10px] border border-solid border-border-color hover:border-sec-color text-[14px] whitespace-nowrap">
                            <div className="flex flex-col justify-between gap-y-[10px]">
                              <div className="flex items-center justify-between">
                                <div className="grid grid-cols-[30px_1fr] gap-x-[5px] items-center">
                                  <LazyImage
                                    src={m.home_team_image || m?.HomeTeam?.icon}
                                    height={30}
                                    width={30}
                                    alt={m.home_team_name || m?.HomeTeam?.name}
                                  />
                                  <p className="text-end truncate leading-[20px]">{m.home_team_name || m?.HomeTeam?.name}</p>
                                </div>
                                <p className={`text-end text-[18px] ${homeWin || isDraw ? "text-pri-color" : ""}`}>
                                  {state === "prelive" ? "-" : m.home_score}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="grid grid-cols-[30px_1fr] gap-x-[5px] items-center">
                                  <LazyImage
                                    src={m.away_team_image || m?.AwayTeam?.icon}
                                    height={30}
                                    width={30}
                                    alt={m.away_team_name || m?.AwayTeam?.name}
                                  />
                                  <p className="truncate leading-[20px]">{m.away_team_name || m?.AwayTeam?.name}</p>
                                </div>
                                <p className={`text-end text-[18px] ${awayWin || isDraw ? "text-pri-color" : ""}`}>
                                  {state === "prelive" ? "-" : m.away_score}
                                </p>
                              </div>
                            </div>
                            <div className="w-[1px] h-full bg-border-color" />
                            <div className="flex flex-col gap-y-[5px]">
                              <div className="truncate">{m.competition_name || m?.competition?.name}</div>
                              <div className="flex items-center justify-between">
                                <p>{m?.time && changeDateFormat(m?.time, "yyyy-MM-dd HH:mm")}</p>
                              </div>

                              <div className="flex items-center gap-x-[5px]">
                                <p className={`leading-[20px] ${state === "live" ? "text-[#E32B2E]" : state === "prelive" ? "text-pri-color" : ""}`}>
                                  {getMatchStr(m.state)}
                                </p>
                                {m.important && <LazyImage src="/images/hot-icon.png" width={20} height={20} alt="熱" />}
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                  <div className="mt-[12px] grid grid-cols-3 gap-[12px]">
                    {team?.news?.map((ele, i) => (
                      <ArticleImageSmall key={`new-c-${i}`} data={ele} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

const JifenContainer = ({ data, group, index = 0, type = "", isLast = false }) => {
  return (
    <div className={``}>
      <div
        className={`grid grid-cols-[24px_2fr_repeat(8,1fr)] min12:grid-cols-[24px_1fr_repeat(8,50px)] gap-x-[15px] min12:gap-x-[10px] rounded-[10px] bg-pri-color py-[7px] px-[10px] text-[12px] text-center whitespace-nowrap text-white`}
      >
        <p>{group || "排名"}</p>
        <p className="text-start">球隊</p>
        <p>場次</p>
        <p>勝</p>
        <p>平</p>
        <p>負</p>
        <p>進球</p>
        <p>失球</p>
        <p>淨勝球</p>
        <p>積分</p>
      </div>
      <div className="">
        {data?.map((v, i) => (
          <div
            key={i}
            className={`grid grid-cols-[24px_2fr_repeat(8,1fr)] min12:grid-cols-[24px_1fr_repeat(8,50px)] items-center gap-x-[15px] min12:gap-x-[10px] h-[44px] mx-[10px] border-b border-solid border-border-color text-center hover:text-sec-color`}
          >
            <Rank i={i} rank={v.rank} />
            <div className="grid grid-cols-[20px_1fr] gap-x-[8px] items-center">
              <LazyImage src={v.Team?.icon} width={20} height={20} alt={v.name} />
              <p className="truncate text-start">{v.Team?.name}</p>
            </div>
            <p>{v.matches}</p>
            <p>{v.wins}</p>
            <p>{v.draws}</p>
            <p>{v.losses}</p>
            <p>{v.goals_scored}</p>
            <p>{v.goals_against}</p>
            <p>{v.goals_scored - v.goals_against}</p>
            <p>{v.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function Rank({ i, rank }) {
  return (
    <div className="flex items-center justify-center">
      {i < 3 ? <LazyImage src={`/images/rank_${i + 1}.png`} width={20} height={20} alt="" /> : <span className="text-[12px]">{rank}</span>}
    </div>
  );
}
