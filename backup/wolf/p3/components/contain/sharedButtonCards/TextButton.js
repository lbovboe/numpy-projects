export default function TextButton({
  text,
  title,
  url,
  onClick,
  target,
  padding = "",
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
          isActive === true ? "text-sec-color" : ""
        } ${isHover === true ? "hover:text-sec-color" : ""}`}
      >
        {title || text}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${padding} ${className} rounded-[10px] font-medium truncate ${
        isActive === true ? "text-sec-color" : ""
      } ${isHover === true ? "hover:text-sec-color" : ""}`}
    >
      {text}
    </button>
  );
}
