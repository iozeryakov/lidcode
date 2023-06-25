import { FC } from "react";
import { Page } from "./Page";
import { IInfoPages } from "../types/IInfo";

/**
 * Компонент для отображения нумерации страниц.
 *
 * @component
 * 
 * @param {IInfoPages} props - Свойства компонента.
 * @param {number} props.page - Текущая страница.
 * @param {number[]} props.CountList - Массив номеров страниц.
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setPage - Функция для установки текущей страницы.
 * @returns {JSX.Element} - Компонент для отображения нумерации страниц.
 */
export const Pages: FC<IInfoPages> = ({ page, CountList, setPage }: IInfoPages) => {
  return (
    <div className="flex flex-row justify-between items-center h-[74px]  w-full px-[10px] sx:px-5 sm:px-[30px] md:gap-[10px] md:px-5 l:gap-5 l:px-[30px]">
      {page === CountList[0] ? <div ></div> : <button id="back" type="button" className=" standart_text cursor-pointer  " onClick={() => setPage(prev => prev - 1)} >Назад</button>}

      <div className="flex flex-row items-center h-[74px] px-[10px] sx:px-5 sm:px-[30px] gap-1 md:px-5  l:px-[30px] ">

        {CountList.length !== 0 && <Page number={1} active={page === 1} onClick={() => setPage(1)} />}

        {page !== 1 && page !== 2 && page !== 3 && page !== 4 && page !== 5 && <div className="standart_text  px-[2px] sm:px-1 text-[#D7DAE0]">
          ...
        </div>}
        {CountList.filter((i) => ((i === page - 3 || i === page - 2 || i === page - 1 || i === page || i === page + 1 || i === page + 2 || i === page + 3) && (i !== 1) && (i !== CountList[CountList.length - 1]))).map(i =>
          <Page key={i} number={i} active={page === i} onClick={() => setPage(i)} />
        )}
        {page !== CountList[CountList.length - 1] && page !== CountList[CountList.length - 2] && page !== CountList[CountList.length - 3] && page !== CountList[CountList.length - 4] && page !== CountList[CountList.length - 5] && <div className="standart_text  px-[2px] sm:px-1 text-[#D7DAE0]">
          ...
        </div>}
        {(CountList[0] !== CountList[CountList.length - 1]) && <Page number={CountList[CountList.length - 1]} active={page === CountList[CountList.length - 1]} onClick={() => setPage(CountList[CountList.length - 1])} />}
      </div>
      {page === CountList[CountList.length - 1] ? <div ></div> : <button id="next" type="button" className=" standart_text cursor-pointer " onClick={() => setPage(prev => prev + 1)} >Вперед</button>}
    </div>
  );
};
