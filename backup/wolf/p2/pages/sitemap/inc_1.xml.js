import moment from "moment";

function getToday(strFormat = "YYYY-MM-DD") {
  return moment().format(strFormat);
}

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
        <loc>${`${process.env.DOMAIN_PC}`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}match/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}match/all/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}saishi/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}lanqiu/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zonghe/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}wangqiu/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}lanqiu/nba/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}lanqiu/cba/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/yingchao/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/xijia/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/dejia/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/yijia/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/fajia/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/ouzhoubei/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/yazhoubei/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/shijiebei/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/ouguan/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}zuqiu/zhongchao/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>${`${process.env.DOMAIN_PC}channel/`}</loc>
        <lastmod>${getToday()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>
   </urlset>
 `;
}

function SiteMap() {}
export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}
export default SiteMap;
