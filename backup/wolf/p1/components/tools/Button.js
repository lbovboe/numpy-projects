export default function Button({
  text,
  onClick,
  padding = "px-[10px] py-[5px]",
  className = "",
  isActive = false,
  isHover = false,
  href,
}) {
  const buttonClasses = `${padding} ${className} rounded-[10px] ${
    isActive
      ? "bg-pri-color text-white"
      : `border border-solid border-border-color ${isHover ? "hover:text-sec-color hover:border-sec-color" : ""}`
  }`;

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onClick={onClick}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
    >
      {text}
    </button>
  );
}
