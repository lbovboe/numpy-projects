import React from "react";
import ArticleImage from "./ArticleImage";
import ArticleText from "./ArticleText";
export default function ArticleList({
  data,
  type = "news",
  layout = "column",
}) {
  return (
    <>
      <div
        className={`grid ${
          layout === "column"
            ? "grid-cols-3 min12:grid-cols-4 gap-[15px]"
            : "gap-[12px]"
        }`}
      >
        {data?.length > 0 &&
          data?.map((news, index) => {
            return (
              <React.Fragment key={index}>
                {layout === "column" ? (
                  <ArticleImage data={news} type={type} />
                ) : (
                  <ArticleText data={news} type={type} />
                )}
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}
