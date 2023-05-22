import { FC, useState } from "react";
import { DropdownButton } from "./DropdownButton";
import { Link } from "react-router-dom";

interface Ip {
    name: string
}

export const DropdownItems: FC<Ip> = ({ name }: Ip) => {
    const [list1, setList1] = useState([{ id: 3, name: "Пример3" }, { id: 4, name: "Пример4" }, { id: 5, name: "Пример5" }])
    const [list2, setList2] = useState([{ id: 1, name: "Пример1" }, { id: 2, name: "Пример2" }])

    const add = (id: number) => {
        const elem = list1.find(i => i.id === id)
        if (elem) {
            setList2((prev) => [...prev, elem])
            setList1((prev) => prev.filter((i) => i.id !== id))
        }
    }
    const remove = (id: number) => {
        const elem = list2.find(i => i.id === id)
        if (elem) {
            setList1((prev) => [...prev, elem])
            setList2((prev) => prev.filter((i) => i.id !== id))
        }
    }

    return (
        <div className="flex flex-col  w-full pb-[5px]">
            <label className="standart_text font-normal font-roboto ">{name}</label>
            {list2.map(i => (
                <div key={i.id} className=" flex gap-[5px] items-center mb-[5px]">
                    <img
                        onClick={() => remove(i.id)}
                        src="/img/close.svg"
                        alt="close"
                        className=" cursor-pointer w-4 h-4 hover:w-[22px] hover:h-[22px] m-[5px] sx:w-[25px] sx:h-[25px] sx:hover:w-[27px] sx:hover:h-[27px] hover:m-[4px]"

                    />
                    <Link className="standart_text font-medium h-min w-min font-roboto px-[15px] py-1   border-[#D7DAE0] border-[3px] rounded-lg mt-[5px] outline-none flex items-center"
                        key={i.id}
                        to={"#"}>
                        {i.name}
                    </Link>
                </div>
            ))}
            {list1.length ? <DropdownButton list={list1} sel="Не выбранно" setSel={add} name="" /> : <></>}

        </div>

    );
};
