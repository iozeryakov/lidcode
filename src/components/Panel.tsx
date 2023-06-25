import { FC } from "react";
import { IInfoPanel } from "../types/IInfo";
import { Link, useLocation } from "react-router-dom";

/**
 * Компонент для отображения панели действий.
 *
 * @component
 * 
 * @param {IInfoPanel} props - Свойства компонента.
 * @param {boolean} props.selectAll - Флаг выбора всех элементов.
 * @param {(checked: boolean) => void} props.select - Функция для выбора элементов.
 * @param {() => void} props.remove - Функция для удаления элементов.
 * @returns {JSX.Element} - Компонент для отображения панели действий.
 */
export const Panel: FC<IInfoPanel> = ({ selectAll, select, remove }: IInfoPanel) => {
  const location = useLocation();


  return (
    <div className="flex flex-row justify-start items-center h-[60px]  w-full border-b-[3px] border-[#F3F4F6]">
      <div className="flex flex-row border-r-[3px] border-[#F3F4F6]  h-full items-center px-[10px] sx:px-5 sm:px-[30px]  gap-[10px] sm:gap-5 md:gap-[10px] md:px-5 l:gap-5 l:px-[30px]">
        <label className="standart_text whitespace-nowrap ">Выделить все</label>
        <input
          type="checkbox"
          id="all_check"
          checked={selectAll}
          onChange={(e) => select(e.target.checked)}
          className=" h-4 w-4 sx:h-5 sx:w-5"
        />
      </div>
      <div className="flex flex-row justify-between items-center w-full px-[10px] sx:px-5 sm:px-[30px] md:gap-[10px] md:px-5 l:gap-5 l:px-[30px]">
        <button type="button" className=" standart_text cursor-pointer" onClick={() => remove()} id="remove" >Удалить</button>
        <Link to={location.pathname + "/new"} className=" standart_text cursor-pointer" id="add" >Добавить</Link>
      </div>
    </div>
  );
};
