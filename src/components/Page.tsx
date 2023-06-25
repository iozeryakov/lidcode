import { FC } from "react";
import { IInfoPage } from "../types/IInfo";

/**
 * Компонент номера страницы.
 *
 * @component
 * 
 * @param {IInfoPage} props - Свойства компонента.
 * @param {number} props.number - Номер страницы.
 * @param {boolean | undefined} props.active - Флаг активности страницы.
 * @param {() => void} props.onClick - Обработчик клика на номер страницы.
 * @returns {JSX.Element} - Компонент номера страницы.
 */
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
