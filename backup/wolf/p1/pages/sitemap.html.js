import format from "date-fns/format";
import moment from "moment";

function changeDateFormat(dateStr, formatStr) {
  if (!dateStr) return "";
  if (formatStr == undefined || formatStr == null) formatStr = "yyyy-MM-dd";
  const outputFormat = "YYYY-MM-DDTHH:mm:ssZ";
  const formattedDate = moment(dateStr, "YYYY-MM-DD HH:mm:ss").utcOffset("+0800").format(outputFormat);
  const date = new Date(formattedDate);
  return format(date, formatStr);
}

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
<loc>/</loc>
<priority>1.000</priority>
</url>
<url>
<loc>/match/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/match/all/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/saishi/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/lanqiu/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zonghe/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/wangqiu/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/lanqiu/nba/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/lanqiu/cba/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/yingchao/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/xijia/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/dejia/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/yijia/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/fajia/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/ouzhoubei/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/yazhoubei/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/shijiebei/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/ouguan/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/zuqiu/zhongchao/</loc>
<priority>0.6000</priority>
</url>
<url>
<loc>/channel/</loc>
<priority>0.6000</priority>
</url>
     ${
       posts !== undefined &&
       posts !== null &&
       posts
         .map((v, i) => {
           return `
        <url>
            <loc>${`/${v.match_type}/${v.id}.html`}</loc>
            <lastmod>${changeDateFormat(v.time, "yyyy-MM-dd")}</lastmod>
            <priority>0.7000</priority>
        </url>
      `;
         })
         .join("")
     }
   </urlset>
 `;
}

function SiteMap() {}
export async function getServerSideProps({ res }) {
  const [matchData] = await Promise.all([
    fetch(process.env.API_DOMAIN + `/api/v1/match/all?lang=zh_HANT`, {
      method: "POST",
      headers: process.env.API_HEADER,
      body: new URLSearchParams({
        state: "complete",
        duration: 2,
        order: "desc",
      }),
    }),
  ]);
  const processedData1 = matchData.status == 200 && (await matchData.json());
  const sitemap = generateSiteMap(processedData1?.data?.list);
  res.setHeader("Content-Type", "text/html");
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}
export default SiteMap;
