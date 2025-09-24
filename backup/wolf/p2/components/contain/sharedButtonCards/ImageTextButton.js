import LazyImage from "../../tools/lazy_image";

export default function ImageTextButton({ title, icon, url }) {
  return (
    <a
      href={url}
      target="_self"
      className="group flex justify-center items-center gap-[5px] pl-[6px] pr-[12px] py-[5px] rounded-[10px] bg-bg-color hover:text-white hover:bg-pri-color"
    >
      <div className="w-[37px] h-[37px] bg-white rounded-[10px] overflow-hidden shrink-0 flex items-center justify-center">
        <LazyImage
          src={icon}
          width={29}
          height={29}
          alt={title}
          className=""
        />
      </div>
      <p className="w-full text-center truncate leading-[20px] font-medium">{title}</p>
    </a>
  );
}
