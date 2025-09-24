import {
  changeDateFormat,
  getMatchCls,
  getMatchStr,
} from "../../../public/scripts/publicFunction";
import Frame from "../../tools/Frame";
import LazyImage from "../../tools/lazy_image";
export default function MatchSideContainer({ data, href }) {
  return (
    data && <Frame title="賽事推薦" href={href} iconName="icon_recom_match">
      <div className="flex flex-col gap-[15px]">
        {
          data.map((match, i) => {
            const state = getMatchCls(match?.state);
            const roundCorners = !["zuqiu", "lanqiu"].includes(
              match.match_type
            );

            return (
              <div key={i} className="">
                <a
                  href={`/${match.match_type}/${match.id}.html`}
                  className={`group block px-[10px] rounded-[10px] border border-solid border-border-color hover:border-pri-color`}
                >
                  <div className="flex items-center justify-between py-[10px] border-b border-solid border-border-color">
                    <div className="flex gap-x-[8px]">
                      <p
                        className={`${
                          state === "live"
                            ? "text-[#E32B2E]"
                            : state === "prelive"
                            ? "text-pri-color"
                            : "text-[#888888]"
                        }`}
                      >
                        {getMatchStr(match.state)}
                      </p>
                      <p className="truncate">
                        {changeDateFormat(match.time, "HH:mm MM-dd")}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-[5px]">
                      <p className="truncate text-center group-hover:text-pri-color">
                        {match.match_name || match.competition_name}
                      </p>
                      {match.important && (
                        <LazyImage
                          src="/images/hot_icon.png"
                          width={20}
                          height={20}
                          alt="hot"
                          className=""
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr_94px_1fr] items-center">
                    <div className="min-w-0 pr-[10px]">
                      <div className="flex gap-x-[5px] items-center">
                        <p className="truncate w-full text-end">
                          {match.home_team_name || match.player_a1}
                        </p>
                        <LazyImage
                          src={match.home_team_image || match.photo_a1}
                          height={24}
                          width={24}
                          className={`shrink-0 overflow-hidden ${
                            roundCorners ? "rounded-[5px]" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center h-[80px] bg-border-color text-[14px] text-pri-color">
                      {state === "prelive" ? (
                        "–"
                      ) : (
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-[10px]">
                          <p
                            className={`text-end`}
                          >
                            {match.state === 0 ? "–" : match.home_score}
                          </p>
                          <span>–</span>
                          <p className={``}>
                            {match.state === 0 ? "–" : match.away_score}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 pl-[10px]">
                      <div className="flex gap-x-[5px] items-center">
                        <LazyImage
                          src={match.away_team_image || match.photo_b1}
                          height={24}
                          width={24}
                          className={`shrink-0 overflow-hidden ${
                            roundCorners ? "rounded-[5px]" : ""
                          }`}
                        />
                        <p className="truncate w-full">
                          {match.away_team_name || match.player_b1}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
      </div>
    </Frame>
  );
}
