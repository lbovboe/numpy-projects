import Frame from "../components/tools/Frame";
import LazyImage from "../components/tools/lazy_image";
import PageTDK from "../components/tdk";
export default function About() {
  const tdk = {
    title: "关于我们_newsite27",
    description: "关于我们_newsite27",
    keywords: "关于我们_newsite27",
  };
  return (
    <div className="space-y-[20px] mt-[20px]">
      <PageTDK data={tdk} />
      <Frame
        title="關於我們"
        iconName="icon_about1"
      >
        <div className="flex flex-col gap-[20px] justify-center items-center">
          <LazyImage src={"/images/about_top.png"}></LazyImage>
          <div>
            测试网27
            是一個專注於體育直播的專業平台，主要提供高品質的足球直播、NBA直播、CBA直播以及足球比分直播等服務。無論您是足球愛好者還是籃球迷，我們都致力於為您提供最優質、最全面的直播內容。透過我們的平台，您可以隨時隨地觀看最新的賽事直播，享受高清畫質帶來的視覺盛宴。我們力求將五大聯賽以及其他精彩賽事的直播呈現給您，打造最完美的體育直播體驗。
          </div>
        </div>
      </Frame>
      <Frame
        title="免責聲明"
        iconName="icon_about2"
      >
        <div className="flex flex-col gap-[20px] justify-center items-center">
          <LazyImage src={"/images/about_bottom.png"}></LazyImage>
          <div>
            本站整理的導覽連結是由大型運動賽事平台和網友的補充上傳而來。主題旨在為運動愛好者提供一個搜尋、收藏、分享和匯集各大平台優質體育賽事資源的平台。如果用戶發現更穩定、更流暢的信號來源，歡迎透過郵件上傳相關鏈接，格式包括(當前頁面鏈接，信號來源名稱，比賽信號鏈接，上傳者名稱)。請注意，網友上傳的鏈接不得包含違法或違規內容，如有發現，請聯絡我們以進行刪除，謝謝。{" "}
          </div>
          <div className="rounded-[10px] bg-bg-color py-[8px] px-[12px] leading-[20px]">
            help.placeholder@outlook.com
          </div>
        </div>
      </Frame>
    </div>
  );
}
