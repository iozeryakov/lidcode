import { FC } from "react";
import { IInfoMainButton } from "../types/IInfo";
/**
 * Компонент основной кнопки.
 *
 * @component
 * 
 * @param {IInfoMainButton} props - Свойства компонента.
 * @param {string} [props.className=""] Дополнительный класс для кнопки.
 * @param {string} props.name Текст кнопки.
 * @param {() => void} props.click Обработчик клика по кнопке.
 * @returns {JSX.Element} - Компонент основной кнопки.
 */
export const MainButton: FC<IInfoMainButton> = ({ className = "", name, click }: IInfoMainButton) => {

    return (
        <button
            className={" overflow-hidden text-ellipsis shadow-[0px_0px_8px_rgb(215,218,224)]  py-[5px] m-[2px] px-[10px] hover:m-0  hover:py-[7px] hover:px-3 text-center w-full text-sm sx:text-base sm:text-lg   rounded font-roboto font-semibold md:text-xl cursor-pointer " + className}
            onClick={() => click()}
        >
            {name}
        </button>
    );
};
