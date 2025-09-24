import LazyImage from "../../tools/lazy_image";

export default function ImageTextButton({
  title,
  icon,
  url,
  target = "_self",
}) {
  return (
    <a
      href={url}
      target={target}
      className="group flex flex-col items-center justify-center gap-y-[5px] hover:text-sec-color"
    >
      <div className="flex items-center justify-center w-full px-[20px] py-[8px] rounded-[10px] border border-solid border-border-color group-hover:border-sec-color">
        <LazyImage
          src={icon}
          alt={""}
          width={40}
          height={40}
          className="rounded-[5px] overflow-hidden"
        />
      </div>
      <p className="truncate text-center w-full">{title}</p>
    </a>
  );
}
