import Frame from "../tools/Frame";
import LastUpdate from "../tools/last_update";
import NoDataFound from "../tools/noDataFound";

export default function Footer({ friendsData, lastUpdate }) {
  return (
    <div className="mt-[20px] mb-[10px]">
      <div className="max-w-[1200px] w-full mx-auto">
        <Frame title={`友情鏈接`}>
          {friendsData && friendsData.length > 0 ? (
            <div className="mt-[15px] grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-[12px]">
              {friendsData.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="w-full flex items-center justify-center px-[20px] py-[8px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color truncate"
                >
                  {item.title}
                </a>
              ))}
            </div>
          ) : (
            <NoDataFound />
          )}
        </Frame>
        <div className="relative mt-[30px]">
          {lastUpdate && <LastUpdate lastUpdate={lastUpdate} />}
          <div className="bg-white rounded-[10px] border border-solid border-border-color p-[20px]">
            <div className="grid grid-cols-[3fr_1px_1fr] items-center gap-x-[20px] text-[12px]">
              <p className="leading-[24px]">
                測試網26
                360°穩定高清無插件體育直播網站,免費提供足球直播、JRS直播、籃球直播、意甲直播、世界盃預選賽直播、英超直播、NBA直播、CBA直播,2022世界盃預選賽賽程,中超直播,法甲直播,亞冠直播,德甲直播等。
                360直播網所有直播源以及內容均來自互聯網包括：視頻直播信號、視頻錄像回放均由用戶收集上傳或從搜索引擎搜索整理獲得,360直播網自身不提供不存儲任何視頻直播信號、視頻內容等,如有侵犯您的權益請您通知我們,我們會在第壹時間處理,謝謝！
              </p>
              <div className="w-[1px] h-full bg-border-color" />
              <div className="leading-[20px]">
                <p className="">
                  Copyright &#169; 2024 测试网26. All Rights Reserved.
                </p>
                <div className="flex flex-wrap gap-[10px]">
                  <a
                    href="/about/"
                    className="underline underline-offset-2 hover:text-sec-color"
                  >
                    關於我們
                  </a>
                  <a
                    href="/sitemap.html"
                    title="html地图"
                    className="underline underline-offset-2 hover:text-sec-color"
                  >
                    html地图
                  </a>
                  <a
                    href="/sitemap/inc_1.xml"
                    title="xml地图"
                    className="underline underline-offset-2 hover:text-sec-color"
                  >
                    xml地图
                  </a>
                </div>
                {/* <p className="underline underline-offset-2 mt-[2px] hover:text-sec-color">
                  辽ICP备2022006944号-1
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
