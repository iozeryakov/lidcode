import { FC } from "react";
import { Page } from "./Page";
export const Pages: FC = () => {
  const kek = () => {
    console.log("pages");
  }
  return (
    <div className="flex flex-row justify-between items-center h-[74px]  w-full px-[10px] sx:px-5 sm:px-[30px] md:gap-[10px] md:px-5 l:gap-5 l:px-[30px]">
      <button id="back" type="button" className=" standart_text cursor-pointer" onClick={() => kek()} >Назад</button>
      <div className="flex flex-row items-center h-[74px] px-[10px] sx:px-5 sm:px-[30px] gap-1 md:px-5  l:px-[30px]">
        <Page number="1" active />
        <Page number="2" />
        <Page number="3" />
        <Page number="4" />
        <Page number="5" />
        <Page number="6" />
        <Page number="7" />
        <Page number="8" />
        <Page number="9" />
        <div className="standart_text  px-[2px] sm:px-1 text-[#D7DAE0]">
          ...
        </div>
        <Page number="15" />
      </div>
      <button id="next" type="button" className=" standart_text cursor-pointer" onClick={() => kek()} >Вперед</button>
    </div>
  );
};
