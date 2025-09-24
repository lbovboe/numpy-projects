function generateSiteMap(posts) {
  return `${
       posts !== undefined &&
       posts !== null &&
       posts
         .map((v, i) => {
           return `${`${process.env.DOMAIN_PC}${v.match_type}/${v.id}.html`} \n`;
         })
         .join("")
     }
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
  res.setHeader("Content-Type", "text/plain");
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}
export default SiteMap;
