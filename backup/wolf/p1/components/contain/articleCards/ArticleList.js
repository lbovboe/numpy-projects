import React from "react";
import ArticleImage from "./ArticleImage";
import ArticleImageSmall from "./ArticleImageSmall";
export default function ArticleList({ data, type = "news", layout = "column" }) {
  return (
    <>
      <div
        className={`grid  ${
          layout === "column" ? "grid-cols-3 min12:grid-cols-4 gap-[20px]" : "gap-[12px] grid-cols-1 min12:grid-cols-2"
        }`}
      >
        {data?.length > 0 &&
          data?.map((news, index) => {
            return (
              <React.Fragment key={index}>
                {layout === "column" ? (
                  <ArticleImage
                    data={news}
                    type={type}
                    layout={layout}
                  />
                ) : (
                  <ArticleImageSmall
                    data={news}
                    type={type}
                    layout={layout}
                  />
                )}
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}
