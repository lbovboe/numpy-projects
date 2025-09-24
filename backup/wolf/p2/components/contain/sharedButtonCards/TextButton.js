export default function TextButton({
  text,
  title,
  url,
  onClick,
  target,
  padding = "px-[12px] py-[8px]",
  className = "",
  isActive = false,
  isHover = true,
}) {
  // If url is provided, render an anchor tag
  if (url) {
    return (
      <a
        href={url}
        target={target}
        className={`${padding} ${className} rounded-[10px] inline-block text-center font-medium truncate ${
          isActive === true ? "bg-pri-color text-white" : "bg-bg-color text-pri-color"
        } ${isHover === true ? "hover:bg-pri-color hover:text-white" : ""}`}
      >
        {title || text}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${padding} ${className} rounded-[10px] font-medium truncate ${
        isActive === true ? "bg-pri-color text-white" : "bg-bg-color text-pri-color"
      } ${isHover === true ? "hover:bg-pri-color hover:text-white" : ""}`}
    >
      {text}
    </button>
  );
}
