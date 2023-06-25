import { FC } from "react";
import { IInfoLoading } from "../types/IInfo";

/**
 * Компонент для отображения состояния загрузки.
 *
 * @component
 * 
 * @param {IInfoLoading} props - Свойства компонента.
 * @param {boolean} props.loading - Флаг загрузки.
 * @param {boolean} props.error - Флаг ошибки загрузки.
 * @returns {JSX.Element} Компонент отображения состояния загрузки.
 */
export const Loading: FC<IInfoLoading> = ({ loading, error }: IInfoLoading) => {
    return (
        <div className="flex flex-row  h-[50px]  w-full border-b-[3px] border-[#F3F4F6]">
            <div className=" standart_text  whitespace-nowrap px-[10px] sx:px-5 sm:px-[30px] md:px-5  l:px-[30px] h-full justify-center  flex items-center w-full">
                {loading ? "Загрузка..." : error ? "Ошибка загрузки" : "Нет данных"}
            </div>
        </div>
    );
};
