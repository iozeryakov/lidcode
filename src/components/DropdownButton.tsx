import { FC, useEffect, useRef, useState } from "react";
import { IInfoDropdownButton } from "../types/IInfo";

/**
 * Компонент выпадающей кнопки.
 *
 * @component
 * 
 * @param {IInfoDropdownButton} props - Свойства компонента.
 * @param {string} props.name - Название кнопки.
 * @param {string} props.sel - Выбранное значение кнопки.
 * @param {IInfoList[]} props.list - Список значений для выбора.
 * @param {React.Dispatch<React.SetStateAction<string>> | ((id: string) => void)} props.setSel - Функция для установки выбранного значения.
 * @param {string} props.id - Идентификатор компонента.
 * @returns {JSX.Element} Компонент выпадающей кнопки.
 */
export const DropdownButton: FC<IInfoDropdownButton> = ({ name, sel, list, setSel, id }: IInfoDropdownButton) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [active, setActive] = useState(false)

    useEffect(() => {
        /**
         * Обработчик клика вне компонента кнопки.
         *
         * @param {MouseEvent} e - Объект события клика.
         */
        const handleClick = (e: MouseEvent) => {
            if (e.target !== buttonRef.current) {
                setActive(false)
            }
        }
        document.addEventListener("click", handleClick)
        /**
         * Очистка слушателя событий при размонтировании компонента.
         */
        return () => { document.removeEventListener("click", handleClick) }
    }, [buttonRef])


    return (
        <div className="flex flex-col  w-full pb-[5px]">
            <label className="standart_text font-normal font-roboto">{name}</label>
            <div className="block relative">
                <button id={id} type="button" ref={buttonRef} className={active ? "text-ellipsis max-w-[250px] overflow-hidden whitespace-nowrap dropdown_button dropdown_button-top relative block text-left standart_text font-normal w-min font-roboto pr-[45px] pl-[30px] h-10 sm:h-[50px] border-[#D7DAE0] border-[3px] rounded-lg mt-[5px]" : " text-ellipsis max-w-[250px] overflow-hidden whitespace-nowrap dropdown_button  relative block text-left standart_text font-normal w-min font-roboto pr-[45px] pl-[30px] h-10 sm:h-[50px] border-[#D7DAE0] border-[3px] rounded-lg mt-[5px]"}
                    onClick={() => setActive(prev => !prev)} >
                    {sel}
                </button>
                <ul className={active ? " text-ellipsis max-w-[250px] overflow-hidden whitespace-nowrap border-[#D7DAE0] border-[2px] w-min rounded-lg m-[5px] max-h-[150px] bg-white overflow-y-auto  absolute z-10" : "hidden"} >
                    {list.map((i) => (
                        <li id={id + "_item_" + i.id}
                            className="text-ellipsis overflow-hidden whitespace-nowrap   standart_text font-normal font-roboto py-1 px-2  transition-colors ease-in duration-200 hover:bg-[#F3F4F6] cursor-pointer bg-white rounded-md"
                            onClick={() => setSel(i.id)}
                            key={i.id}>
                            {i.name}
                        </li>))}
                </ul>
            </div>
        </div >

    );
};
