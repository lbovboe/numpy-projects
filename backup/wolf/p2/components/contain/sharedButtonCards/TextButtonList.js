import TextButton from "./TextButton";
export default function TextButtonList({ data, width = 157, type = "channel" }) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, minmax(${width}px, 1fr))`,
    gap: "10px",
    width: "100%",
    marginTop: "15px",
  };

  return (
    <div style={gridStyle}>
      {data &&
        data.map((item, i) => {
          let title = "";
          let url = "";
          let target = "_self";

          if (type === "channel") {
            title = item.title;
            url = item.url;
            target = item.is_internal_link ? "_self" : "_blank";
          } else if (type === "channelRelated") {
            title = item.title;
            url = `/channel/${item.name}/`;
          } else if (type === "saishi") {
            title = item.name_abbr;
            url = `/${item.match_type}/${item.topic_name}/`;
          } else {
            title = item.title || item.name_abbr;
          }

          return (
            <TextButton
              key={i}
              title={title}
              url={url}
              target={target}
            />
          );
        })}
    </div>
  );
}
