import Frame from "../../tools/Frame";
import ArticleList from "../articleCards/ArticleList";

export default function DhArticles({ data, title="", href, type , iconName="" , imageNo = 1 , colNo=1}) {
  return (
    data && (
      <Frame title={title} href={href} iconName={iconName}>
        <ArticleList data={data} type={type} imageNo={imageNo} colNo={colNo}/>
      </Frame>
    )
  );
}