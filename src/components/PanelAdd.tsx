import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
export const PanelAdd: FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-row justify-between items-center h-[60px]    px-[10px] sx:px-5 sm:px-[30px] md:gap-[10px] md:px-5 l:gap-5 l:px-[30px] w-full border-b-[3px] border-[#F3F4F6]">
      <Link to={"../" + location.pathname.split("/").slice(0, 3).join("/")} className=" standart_text cursor-pointer" >Назад</Link>
      <input value="Сохранить" type="submit" className=" standart_text cursor-pointer" />
    </div>
  );
};
