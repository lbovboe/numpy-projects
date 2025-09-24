import { useRouter } from "next/router";
import LazyImage from "../tools/lazy_image";
import PaginationBar from "../tools/pagination";
import { changeDateFormat } from "../../public/scripts/publicFunction";
import LastUpdate from "../tools/last_update";
import Frame from "../tools/Frame";

export default function TransferPage({ data, url }) {
  return (
    <>
      <div className="">
        <Frame title={"轉會情報"} options={<Nav />}>
          <div className="mt-[15px]">
            {data.transfer && (
              <div className="border border-solid border-border-color overflow-hidden rounded-[10px]">
                <div
                  className={`grid grid-cols-[100px_1fr_1fr_20px_1fr_150px_110px] gap-x-[15px] items-center py-[7px] bg-bg-color px-[15px] text-[12px]`}
                >
                  <div>日期</div>
                  <div>球員</div>
                  <div>来自</div>
                  <div></div>
                  <div>轉入</div>
                  <div>交費</div>
                  <div>交易類型</div>
                </div>
                <div>
                  {data.transfer?.map((t, i) => (
                    <div
                      className={`group grid grid-cols-[100px_1fr_1fr_20px_1fr_150px_110px] gap-x-[15px] items-center h-[44px] px-[15px] border-b border-solid border-border-color last:border-none text-[14px] hover:text-sec-color`}
                      key={i}
                    >
                      <div className="truncate">
                        {changeDateFormat(t.transfer_time, "yyyy-MM-dd")}
                      </div>
                      <p className="truncate">{t.player_name}</p>
                      <div className="flex items-center gap-x-[8px]">
                        <LazyImage
                          src={t.from_team_image}
                          alt={t.from_team_chs}
                          width={20}
                          height={20}
                        />
                        <p className="truncate">{t.from_team_chs}</p>
                      </div>
                      <div
                        className={`flex items-center justify-center rounded-[5px] w-[18px] h-[18px] bg-border-color group-hover:bg-sec-color`}
                      >
                        <svg
                          width={10}
                          height={10}
                          className="fill-text-color stroke-text-color group-hover:fill-white group-hover:stroke-white pl-[1px]"
                        >
                          <use href="#arrow-right"></use>
                        </svg>
                      </div>
                      <div className="flex items-center gap-x-[8px]">
                        <LazyImage
                          src={t.to_team_image}
                          alt={t.to_team_chs}
                          width={20}
                          height={20}
                        />
                        <p className="truncate">{t.to_team_chs}</p>
                      </div>
                      <div>
                        {t.money !== "未公開" ? `${t.money}` : "未公開"}
                      </div>
                      <div>{t.transfer_type_cn}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <section className="">
              <PaginationBar
                currentPage={data?.currentPage}
                totalPage={data?.totalPage}
                url={url}
              />
            </section>
          </div>
        </Frame>
      </div>
    </>
  );
}

const Nav = () => {
  const router = useRouter();

  const isActiveTab = (href, path) => {
    return path.includes(href);
  };
  const items = [
    ["足球", "/transfer_soccer/", "zuqiu"],
    ["籃球", "/transfer_basketball/", "lanqiu"],
  ];

  return (
    <div className="flex items-center justify-end gap-x-[12px]">
      {items.map(([title, href, icon], i) => (
        <div key={i}>
          <a
            href={href}
            className={`group flex items-center gap-x-[5px] ${
              isActiveTab(href, router.asPath)
                ? "text-sec-color"
                : "text-pri-color hover:text-sec-color"
            }`}
          >
            <span>{title}</span>
            <svg
              className={`${
                isActiveTab(href, router.asPath)
                  ? "fill-sec-color"
                  : "fill-pri-color group-hover:fill-sec-color"
              } `}
              width="19"
              height="18"
            >
              <use xlinkHref={`#icon-${icon}`} />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};
