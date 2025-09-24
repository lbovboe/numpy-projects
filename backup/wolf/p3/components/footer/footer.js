import LastUpdate from "../tools/last_update";

export default function Footer({ friendsData, lastUpdate }) {
  return (
    <div className="mt-[60px]">
      <div className="bg-bg-color pt-[30px] pb-[20px]">
        <div className="flex flex-col justify-center items-center max-w-[1200px] w-full mx-auto">
          <a
            href="/about/"
            className="group text-center text-pri-color hover:text-sec-color"
          >
            <div className="flex items-center justify-center rounded-[10px] w-[169px] py-[8px] border border-solid border-pri-color group-hover:border-sec-color">
              <svg
                width={40}
                height={40}
                className={`fill-pri-color group-hover:fill-sec-color`}
              >
                <use href="#icon-about"></use>
              </svg>
            </div>
            <p className="mt-[5px]">關於我們</p>
          </a>
          <div className="mt-[20px] flex flex-wrap gap-[12px]">
            友情鏈接:
            {friendsData &&
              friendsData.length > 0 &&
              friendsData.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  className="text-pri-color hover:text-sec-color"
                >
                  {item.title}
                </a>
              ))}
          </div>
          <p className="mt-[20px] text-center">
            測試網28 360°穩定高清無插件體育直播網站,
            免費提供足球直播、JRS直播、籃球直播、意甲直播、世界盃預選賽直播、英超直播、NBA直播、CBA直播,
            2022世界盃預選賽賽程, 中超直播, 法甲直播, 亞冠直播, 德甲直播等。
            360直播網所有直播源以及內容均來自互聯網包括：視頻直播信號、視頻錄像回放均由用戶收集上傳或從搜索引擎搜索整理獲得,
            360直播網自身不提供不存儲任何視頻直播信號、視頻內容等,如有侵犯您的權益請您通知我們,
            我們會在第壹時間處理, 謝謝！
          </p>
        </div>
      </div>
      <div className="bg-pri-color ">
        <div className="grid grid-cols-3 items-center h-[41px] max-w-[1200px] w-full mx-auto text-white">
          <div>{lastUpdate && <LastUpdate lastUpdate={lastUpdate} />}</div>
          <p className="text-center text-[12px]">
            Copyright &#169; 2025 测试网28. All Rights Reserved.
          </p>
          <div className="flex justify-end gap-[6px] text-[12px]">
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
            {/* <p className="underline underline-offset-2 hover:text-sec-color">
              辽ICP备2022006944号-1
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
