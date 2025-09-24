import LazyImage from "../components/tools/lazy_image";
import PageTDK from "../components/tdk";
import { LogWriter } from "../public/scripts/publicFunction";
export default function About() {
  const tdk = {
    title: "关于我们_newsite26",
    description: "关于我们_newsite26",
    keywords: "关于我们_newsite26",
  };
  return (
    <div>
      <PageTDK data={tdk} />
      <div className="relative rounded-[10px] border border-solid border-border-color overflow-hidden">
        
        <div className="grid grid-cols-[1fr_260px] gap-x-[40px] p-[40px]">
          <div>
            <div className="flex items-center gap-x-[10px]">
              <LazyImage
                src="/images/icon_about_1.png"
                width={40}
                height={40}
                alt=""
                className="shrink-0"
              />
              <h3 className="text-[22px]">關於我們</h3>
            </div>
            <p className="text-[14px] leading-[28px] mt-[14px]">
              测试网26是一個專注於體育直播的專業平台，主要提供高品質的足球直播、NBA直播、CBA直播以及足球比分直播等服務。無論您是足球愛好者還是籃球迷，我們都致力於為您提供最優質、最全面的直播內容。透過我們的平台，您可以隨時隨地觀看最新的賽事直播，享受高清畫質帶來的視覺盛宴。我們力求將五大聯賽以及其他精彩賽事的直播呈現給您，打造最完美的體育直播體驗。
            </p>
          </div>
          <LazyImage
            src="/images/about_1.png"
            width={"100%"}
            height={258}
            alt=""
          />
        </div>
        <hr className="mx-[20px] border-border-color" />
        <div className="grid grid-cols-[1fr_260px] gap-x-[40px] p-[40px]">
          <div>
            <div className="flex items-center gap-x-[10px]">
              <LazyImage
                src="/images/icon_about_2.png"
                width={40}
                height={40}
                alt=""
                className="shrink-0"
              />
              <h3 className="text-[22px]">免責聲明</h3>
            </div>
            <p className="text-[14px] leading-[28px] mt-[14px]">
              本站整理的導覽連結是由大型運動賽事平台和網友的補充上傳而來。主題旨在為運動愛好者提供一個搜尋、收藏、分享和匯集各大平台優質體育賽事資源的平台。如果用戶發現更穩定、更流暢的信號來源，歡迎透過郵件上傳相關鏈接，格式包括(當前頁面鏈接，信號來源名稱，比賽信號鏈接，上傳者名稱)。請注意，網友上傳的鏈接不得包含違法或違規內容，如有發現，請聯絡我們以進行刪除，謝謝。{" "}
            </p>
          </div>
          <LazyImage
            src="/images/about_2.png"
            width={"100%"}
            height={258}
            alt=""
          />
        </div>
        <div className="pb-[40px] px-[40px]">
          <a
            href="mailto:help.placeholder@outlook.com"
            className="flex items-center justify-center w-full h-[36px] rounded-[10px] border border-solid border-border-color hover:border-sec-color text-pri-color hover:text-sec-color"
          >
            <p className="underline leading-[20px]">
              help.placeholder@outlook.com
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  try {
    return {
      props: {
        navTitle: "關於我們",
      },
      revalidate: Number(process.env.TIME_OUT_S),
    };
  } catch (error) {
    LogWriter("/about/", "", error);
    return {
      revalidate: 60,
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
