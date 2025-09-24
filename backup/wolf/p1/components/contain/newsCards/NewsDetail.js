import { changeDateFormat, getNewsTitle, getTeamAbbr } from "../../../public/scripts/publicFunction";

export default function NewsDetail({ data }) {
  const dataCard = data.data_card;
  const teamTags =
    dataCard?.tags?.reduce((acc, curr) => {
      if (curr?.details?.tag_type == 3 && ["lanqiu", "zuqiu"].includes(curr?.details?.match_type)) {
        acc.push({
          id: curr?.details?.team_id,
          name: curr?.details?.title,
          match_type: curr?.details?.match_type,
        });
      }
      return acc;
    }, []) || [];
  const compTags =
    dataCard?.tags?.reduce((acc, curr) => {
      if (curr?.details?.tag_type == 2 && ["lanqiu", "zuqiu"].includes(curr?.details?.match_type)) {
        acc.push({
          name: curr?.details?.name,
          title: curr?.details?.title,
          match_type: curr?.details?.match_type,
        });
      }
      return acc;
    }, []) || [];
  return (
    data && (
      <div>
        <div className="rounded-[10px] border border-solid border-border-color p-[20px]">
          <h1 className="line-clamp-2 text-[22px]">{dataCard?.title}</h1>
          <div className="flex items-center gap-x-[10px] mt-[10px]">
            <span className="text-pri-color">{getNewsTitle(dataCard.type)}</span>
            <span className="text-[#888]">{changeDateFormat(dataCard.updated_at, "yyyy-MM-dd HH:mm")}</span>
            <span className="text-[#888]">{dataCard.source || "網友提供"}</span>
          </div>
          <hr className="border-border-color mt-[15px] mb-[30px]" />
          <div className="articles_text !pt-0 mt-[30px] mx-auto" dangerouslySetInnerHTML={{ __html: dataCard?.content }} />
          <div className="flex flex-wrap items-center gap-x-[10px] w-full mt-[20px] text-[14px]">
            {dataCard?.tags &&
              dataCard?.tags?.map(
                (tags, index) =>
                  tags &&
                  tags?.details?.name &&
                  tags?.details?.title && (
                    <a
                      key={index}
                      //  href={`/news/${tags?.details?.name}/`}
                    >
                      <div key={index} className={`rounded-[10px] border border-solid border-border-color px-[12px] py-[7px] text-[#888]`}>
                        {tags?.details?.title}
                      </div>
                    </a>
                  )
              )}
          </div>
          {(teamTags?.length > 0 || compTags?.length > 0) && ["zuqiu", "lanqiu"].includes(data?.data_card?.type) && (
            <div className="mt-[20px]">
              <div className="flex flex-wrap gap-[10px]">
                {teamTags?.length > 0 && (
                  <>
                    <span>更多{getNewsTitle(dataCard.type)}球隊比賽:</span>
                    {teamTags?.map(({ id, name, match_type }, i) => (
                      <a key={i} href={`/${getTeamAbbr(match_type)}/${id}/`} className="underline underline-offset-2 hover:text-sec-color">
                        {name}比賽
                      </a>
                    ))}
                  </>
                )}
                {compTags?.length > 0 && (
                  <>
                    <span className="ml-[6px]">
                      更多
                      {getNewsTitle(dataCard.type)}
                      賽事:
                    </span>
                    {compTags?.map(({ title, name, match_type }, i) => (
                      <a key={i} href={`/${match_type || dataCard.type}/${name}/`} className="underline underline-offset-2 hover:text-sec-color">
                        {title}比賽
                      </a>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
