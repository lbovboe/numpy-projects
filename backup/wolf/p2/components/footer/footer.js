import LazyImage from "../tools/lazy_image";
import LastUpdate from "../tools/last_update";
export default function Footer({ friendsData, lastUpdate }) {
  return (
    <div
      className={`mt-[60px] bg-pri-color py-[30px] pr-[30px] pl-[80px] flex max12:flex-wrap items-center  ${
        lastUpdate ? "gap-[42px]" : "gap-[55px]"
      }`}
    >
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex gap-x-[14px] items-center">
          <LazyImage
            src="/images/footer-icon.png"
            width={69}
            height={57}
            className="shrink-0"
          ></LazyImage>
          <p className="text-[24px] leading-[34px] truncate text-white">測試網27</p>
        </div>
        {lastUpdate && <LastUpdate lastUpdate={lastUpdate}></LastUpdate>}
      </div>
      <div className="bg-bg-color shadow-[2px_2px_10px_0px_rgba(32,58,59,0.20)] py-[15px] px-[30px] rounded-[10px]">
        {friendsData && friendsData.length > 0 && (
          <>
            <div className="flex flex-wrap gap-[10px] mb-[15px]">
              <p className="font-medium">友情链接:</p>
              {friendsData.map((item, index) => {
                return (
                  <a
                    className="underline underline-offset-2 hover:no-underline"
                    href={item?.link}
                    key={index}
                  >
                    {item.title}
                  </a>
                );
              })}
            </div>
          </>
        )}
        <p className="leading-[26px]">
          測試網27
          360°穩定高清無插件體育直播網站,免費提供足球直播、JRS直播、籃球直播、意甲直播、世界盃預選賽直播、英超直播、NBA直播、CBA直播,
          2022世界盃預選賽賽程,中超直播,法甲直播,亞冠直播,德甲直播等。
          測試網27所有直播源以及內容均來自互聯網包括：視頻直播信號、視頻錄像回放均由用戶收集上傳或從搜索引擎搜索整理獲得,
          測試網27自身不提供不存儲任何視頻直播信號、視頻內容等,如有侵犯您的權益請您通知我們,我們會在第壹時間處理,謝謝！
        </p>
        <div className="flex justify-between mt-[15px]">
          <a
            href="/about/"
            className="underline  underline-offset-2 hover:no-underline"
          >
            關於我們
          </a>
          <p className="leading-[20px]">Copyright &#169; 測試網27 版权所有 All Rights Reserved.</p>
          <div className="flex items-center gap-x-[10px]">
            {/* <a
              href="https://beian.miit.gov.cn"
              className=" underline  underline-offset-2 hover:no-underline"
              target="_blank"
            >
              鄂ICP备2024042170号-1
            </a> */}
            <a
              href="/sitemap/inc_1.xml"
              className="underline underline-offset-2 hover:no-underline"
              title="xml地图"
            >
              xml地图
            </a>
            <a
              href="/sitemap.html"
              className="underline underline-offset-2 hover:no-underline"
              title="html地图"
            >
              html地图
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
