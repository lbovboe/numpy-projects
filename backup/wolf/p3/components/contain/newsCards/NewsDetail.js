import {
  changeDateFormat,
  getNewsTitle,
  getTeamAbbr,
} from "../../../public/scripts/publicFunction";

export default function NewsDetail({ data }) {
  const dataCard = data.data_card;
  const teamTags =
    dataCard?.tags?.reduce((acc, curr) => {
      if (
        curr?.details?.tag_type == 3 &&
        ["lanqiu", "zuqiu"].includes(curr?.details?.match_type)
      ) {
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
      if (curr?.details?.tag_type == 2) {
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
            <span className="text-pri-color">
              {getNewsTitle(dataCard.type)}
            </span>
            <span className="text-[#888]">
              {changeDateFormat(dataCard.updated_at, "yyyy-MM-dd HH:mm")}
            </span>
            <span className="text-[#888]">{dataCard.source || "網友提供"}</span>
          </div>
          <hr className="border-border-color mt-[15px] mb-[30px]" />
          <div
            className="articles_text !pt-0 mt-[30px] mx-auto"
            dangerouslySetInnerHTML={{ __html: dataCard?.content }}
          />
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
                      <div
                        key={index}
                        className={`text-[#888]`}
                      >
                        {tags?.details?.title}
                      </div>
                    </a>
                  )
              )}
          </div>
        </div>
      </div>
    )
  );
}
