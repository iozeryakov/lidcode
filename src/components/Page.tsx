import { FC } from "react";
import { IInfoPage } from "../types/IInfo";
export const Page: FC<IInfoPage> = ({ number, active, onClick }: IInfoPage) => {
  return (
    <div
      onClick={() => onClick()}
      className={
        active
          ? "standart_text cursor-pointer px-[2px] sm:px-1 "
          : "standart_text cursor-pointer px-[2px] sm:px-1 text-[#D7DAE0] transition-colors ease-in duration-200 hover:text-black"
      }
    >
      {number}
    </div>
  );
};
