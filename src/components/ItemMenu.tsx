import { FC } from "react";
import { Link } from "react-router-dom";
import { IInfoItemMenu } from "../types/IInfo";
export const ItemMenu: FC<IInfoItemMenu> = ({
  src,
  alt,
  active = false,
  to, id
}: IInfoItemMenu) => {
  return (
    <li>
      <Link
        id={id}
        className={
          active
            ? "flex flex-row items-center justify-start cursor-pointer h-10 sm:h-[50px]  bg-[#F3F4F6] md:bg-white md:rounded-lg"
            : "flex flex-row items-center justify-start cursor-pointer h-10 sm:h-[50px]  hover:bg-[rgba(243,244,246,0.6)] md:hover:bg-[rgba(255,255,255,0.6)] transition-colors ease-in duration-200 md:rounded-lg"
        }
        to={to}
      >
        <div className="px-[15px] sx:px-[30px]">
          <img className="w-[30px] h-[30px]" src={src} alt={alt} />
        </div>
        <p className="text-lg font-semibold">{alt}</p>
      </Link>
    </li>
  );
};
