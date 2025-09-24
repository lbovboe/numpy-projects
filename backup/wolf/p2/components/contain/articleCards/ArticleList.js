import Article from "./Article";
import ArticleImage from "./ArticleImage";
import ArticleImageSlider from "./ArticleImageSlider";
export default function ArticleList({ data, type = "news", isRow = false, imageNo, colNo = 1 }) {
  // Determine grid columns based on colNo
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 min12:grid-cols-2",
    3: "grid-cols-2 min12:grid-cols-3",
    4: "grid-cols-2 min12:grid-cols-4",
    5: "grid-cols-3 min12:grid-cols-5",
  };

  // Split data into image articles and regular articles
  const imageArticles = data?.slice(0, imageNo) || [];
  const regularArticles = data?.slice(imageNo) || [];

  return (
    <>
      {/* Image articles grid with 20px gap */}
      {!isRow && imageArticles.length > 0 && (
        <>
          <ArticleImageSlider
            type={type}
            data={imageArticles}
          ></ArticleImageSlider>
          <div className={`grid ${gridCols[colNo] || "grid-cols-1"} gap-[20px]`}>
            {regularArticles.map((ele, i) => (
              <div
                key={i}
                className="relative"
              >
                <ArticleImage
                  data={ele}
                  type={type}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {isRow && (
        <div className={`grid ${gridCols[colNo] || "grid-cols-1"} gap-[20px] `}>
          {data?.map((ele, i) => (
            <div
              key={i}
              className="relative"
            >
              <Article
                data={ele}
                type={type}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
