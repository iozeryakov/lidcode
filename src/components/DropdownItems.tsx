import { FC, useContext } from "react";
import { DropdownButton } from "./DropdownButton";
import { Link } from "react-router-dom";
import { IInfoDropdownItems } from "../types/IInfo";
import { Context } from "..";


/**
 * Компонент выпадающей кнопки со списком выбранных элементов.
 *
 * @component
 * 
 * @param {IInfoDropdownItems} props - Свойства компонента.
 * @param {string} props.name - Название списка элементов.
 * @param {string} props.id - Идентификатор списка элементов.
 * @param {IInfoList[]} props.other - Список не выбранных элементов.
 * @param {IInfoList[]} props.event - Список выбранных элементов.
 * @param {React.Dispatch<React.SetStateAction<IInfoList[]>>} props.setEvent - Функция для установки списка выбранных элементов.
 * @param {React.Dispatch<React.SetStateAction<IInfoList[]>>} props.setOther - Функция для установки списка не выбранных элементов.
 * @param {number | undefined} props.maxT - Максимальное количество выбранных элементов.
 * @param {number | undefined} props.min - Минимальное количество участников в команде.
 * @param {number | undefined} props.max - Максимальное количество участников в команде.
 * @param {string} props.link - Ссылка для перехода при выборе элемента.
 * @returns {JSX.Element} - Компонент выпадающей кнопки со списком выбранных элементов.
 */
export const DropdownItems: FC<IInfoDropdownItems> = ({ name, id, other, event, setEvent, setOther, maxT, min, max, link }: IInfoDropdownItems) => {
    const { modal } = useContext(Context)
    /**
     * Функция для добавления выбранного элемента в список выбранных элементов.
     *
     * @param {string} id - Идентификатор выбранного элемента.
     */
    const add = (id: string) => {
        const elem = other.find(i => i.id === id)
        if (elem) {
            if (min && max) {
                if (Number(elem.count_participants) < min) {
                    modal.setIsVisible("Количество участников в команде меньше чем разрешено!", true)
                } else if (Number(elem.count_participants) > max) {
                    modal.setIsVisible("Количество участников в команде больше чем разрешено! ", true)
                } else {
                    setEvent((prev) => [...prev, elem])
                    setOther((prev) => prev.filter((i) => i.id !== id))
                }
            } else {
                setEvent((prev) => [...prev, elem])
                setOther((prev) => prev.filter((i) => i.id !== id))
            }

        }
    }
    /**
     * Функция для удаления выбранного элемента из списка выбранных элементов.
     *
     * @param {string} id - Идентификатор выбранного элемента.
     */
    const remove = (id: string) => {
        const elem = event.find(i => i.id === id)
        if (elem) {
            setOther((prev) => [...prev, elem])
            setEvent((prev) => prev.filter((i) => i.id !== id))
        }
    }

    return (
        <div className="flex flex-col  w-full pb-[5px]">
            <label className="standart_text font-normal font-roboto ">{name}</label>
            {event.length === 0 && other.length === 0 && <label className="standart_text  font-roboto font-bold ml-5">нет данных</label>}
            {event.sort((a, b) => b.forSorted - a.forSorted).map(i => (
                <div key={i.id} className=" flex gap-[5px] items-center mb-[5px]">
                    <img
                        onClick={() => remove(i.id)}
                        id={"close_" + id + "_" + i.id}
                        src="/img/close.svg"
                        alt="close"
                        className=" cursor-pointer w-4 h-4 hover:w-[22px] hover:h-[22px] m-[5px] sx:w-[25px] sx:h-[25px] sx:hover:w-[27px] sx:hover:h-[27px] hover:m-[4px]"

                    />
                    <Link className="text-ellipsis max-w-[250px] overflow-hidden whitespace-nowrap standart_text font-medium h-min w-min font-roboto px-[15px] py-1   border-[#D7DAE0] border-[3px] rounded-lg mt-[5px] outline-none flex items-center"
                        key={i.id}
                        id={"link_" + id + "_" + i.id}
                        to={"../" + link + "/" + i.id}>
                        <div className="text-ellipsis overflow-hidden"> {i.name}</div>

                    </Link>
                </div>
            ))}
            {other.length && (maxT ? event.length < maxT : true) ? <DropdownButton id={id} list={other.sort((a, b) => b.forSorted - a.forSorted)} sel="Не выбранно" setSel={add} name="" /> : <></>}

        </div>

    );
};
