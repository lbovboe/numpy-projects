import ImageTextButton from "./ImageTextButton";

export default function ImageTextButtonList({ data, width = 157 }) {
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
        data.map((item, i) => (
          <ImageTextButton
            key={i}
            title={item.title || item.name}
            icon={item.icon}
            url={item.url}
          />
        ))}
    </div>
  );
}
